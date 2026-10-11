const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');

console.log("=== INSYT CATALOGUE COMPREHENSIVE INTEGRITY AUDIT ===");

function loadTsModule(relativePath, mockImports = {}) {
  const filePath = path.join(__dirname, relativePath);
  const code = fs.readFileSync(filePath, 'utf8');
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });
  
  const context = {
    exports: {},
    module: { exports: {} },
    require: (id) => {
      // Check mockImports
      for (const [key, val] of Object.entries(mockImports)) {
        if (id.includes(key)) return val;
      }
      return {};
    },
    console
  };
  vm.createContext(context);
  vm.runInContext(res.outputText, context);
  return context.exports || context.module.exports;
}

// Load submodules of lessons
console.log("1. Loading lesson data modules...");
const corpModeling = loadTsModule('../lib/data/corporate-modeling-lessons.ts');
const entPython = loadTsModule('../lib/data/enterprise-python-lessons.ts');
const entAutomation = loadTsModule('../lib/data/enterprise-automation-lessons.ts');
const entBI = loadTsModule('../lib/data/enterprise-bi-lessons.ts');
const mtoMastery = loadTsModule('../lib/data/mto-mastery-lessons.ts');
const corpWorkplace = loadTsModule('../lib/data/corporate-workplace-lessons.ts');
const capcutAdapter = loadTsModule('../lib/data/capcut-lessons-adapter.ts', {
  'capcut-master-academy': loadTsModule('../lib/data/capcut-master-academy.ts')
});

const lessonsMod = loadTsModule('../lib/data/lessons.ts', {
  'corporate-modeling-lessons': corpModeling,
  'enterprise-python-lessons': entPython,
  'enterprise-automation-lessons': entAutomation,
  'enterprise-bi-lessons': entBI,
  'mto-mastery-lessons': mtoMastery,
  'capcut-lessons-adapter': capcutAdapter,
  'corporate-workplace-lessons': corpWorkplace
});

const DYNAMIC_LESSONS = lessonsMod.DYNAMIC_LESSONS || {};
const totalDynamicCount = Object.keys(DYNAMIC_LESSONS).length;
console.log(`✅ Loaded DYNAMIC_LESSONS with ${totalDynamicCount} registered lessons.`);

// Load courses.ts
console.log("2. Loading courses curriculum...");
const coursesMod = loadTsModule('../lib/data/courses.ts');
const ALL_PATHS = coursesMod.ALL_PATHS || {};

const allCoursesMap = new Map();
for (const [pKey, pVal] of Object.entries(ALL_PATHS)) {
  if (pVal && Array.isArray(pVal.courses)) {
    for (const c of pVal.courses) {
      if (!allCoursesMap.has(c.slug)) {
        allCoursesMap.set(c.slug, { pathKey: pKey, ...c });
      }
    }
  }
}

console.log(`✅ Loaded ${allCoursesMap.size} unique courses across learning paths.`);

// Audit each course
console.log("\n3. Cross-referencing course lessons with DYNAMIC_LESSONS:");
let totalLessonsInCurriculum = 0;
let missingLessons = [];
let countMismatches = [];

for (const [slug, c] of allCoursesMap.entries()) {
  let courseSlugs = [];
  if (Array.isArray(c.modules)) {
    for (const m of c.modules) {
      if (Array.isArray(m.lessons)) {
        for (const l of m.lessons) {
          courseSlugs.push({ slug: l.slug, title: l.title, moduleTitle: m.title });
        }
      }
    }
  }
  totalLessonsInCurriculum += courseSlugs.length;
  
  let courseMissing = [];
  for (const item of courseSlugs) {
    if (!DYNAMIC_LESSONS[item.slug]) {
      courseMissing.push(item);
      missingLessons.push({ course: slug, ...item });
    }
  }
  
  console.log(`\n📚 [Course] "${c.title}" (${slug})`);
  console.log(`   Path: ${c.pathSlug || c.pathKey}`);
  console.log(`   Advertised Count: ${c.lessons} | Actual Slugs: ${courseSlugs.length}`);
  
  if (c.lessons !== courseSlugs.length) {
    countMismatches.push({ course: slug, advertised: c.lessons, actual: courseSlugs.length });
    console.log(`   ⚠️ Count Mismatch: Advertised ${c.lessons} vs Curriculum Slugs ${courseSlugs.length}`);
  }
  
  if (courseMissing.length > 0) {
    console.log(`   ❌ MISSING PAYLOADS (${courseMissing.length} lessons missing in DYNAMIC_LESSONS):`);
    for (const m of courseMissing) {
      console.log(`      - [${m.slug}] "${m.title}" (in ${m.moduleTitle})`);
    }
  } else {
    console.log(`   ✅ 100% of ${courseSlugs.length} lessons have valid DYNAMIC_LESSONS payloads!`);
  }
}

// 4. Physical downloads verification
console.log("\n4. Verifying downloadable resource files:");
const downloadsDir = path.join(__dirname, '../public/downloads');
const downloads = fs.readdirSync(downloadsDir);
console.log(`Found ${downloads.length} files in public/downloads/:`);
downloads.forEach(f => {
  const stat = fs.statSync(path.join(downloadsDir, f));
  console.log(`  📦 ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
});

// Summary
console.log("\n==============================================");
console.log(`COURSES AUDITED: ${allCoursesMap.size}`);
console.log(`TOTAL LESSONS IN CURRICULUM: ${totalLessonsInCurriculum}`);
console.log(`TOTAL MISSING LESSON PAYLOADS: ${missingLessons.length}`);
console.log(`TOTAL COUNT MISMATCHES: ${countMismatches.length}`);

if (missingLessons.length > 0) {
  console.log("\nDETAILED LIST OF MISSING LESSONS:");
  missingLessons.forEach(m => console.log(`[${m.course}] ${m.slug} -> "${m.title}"`));
}
