const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const coursesCode = fs.readFileSync(path.join(__dirname, '../lib/data/courses.ts'), 'utf8');

// Transpile courses.ts to JS
const transpileResult = ts.transpileModule(coursesCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});

// Run in a fresh context
const vm = require('vm');
const context = {
  exports: {},
  module: { exports: {} },
  require: () => ({})
};
vm.createContext(context);
try {
  vm.runInContext(transpileResult.outputText, context);
} catch (e) {
  console.error("Transpile execution error:", e.message);
}

const modExports = context.exports || context.module.exports;
console.log("Exported keys from courses.ts:", Object.keys(modExports));

const ALL_PATHS = modExports.ALL_PATHS || {};
let allCourses = [];

for (const [pKey, pVal] of Object.entries(ALL_PATHS)) {
  if (pVal && Array.isArray(pVal.courses)) {
    for (const c of pVal.courses) {
      allCourses.push({ pathKey: pKey, ...c });
    }
  }
}

console.log(`\nFound ${allCourses.length} courses across ${Object.keys(ALL_PATHS).length} learning paths:\n`);
for (const c of allCourses) {
  let lessonSlugs = [];
  if (Array.isArray(c.modules)) {
    for (const m of c.modules) {
      if (Array.isArray(m.lessons)) {
        for (const l of m.lessons) {
          lessonSlugs.push(l.slug);
        }
      }
    }
  }
  console.log(`📘 [${c.slug}] "${c.title}"`);
  console.log(`   Path: ${c.pathSlug || c.pathKey} | Advertised: ${c.lessons} | Modules: ${c.modules ? c.modules.length : 0} | Total Lessons: ${lessonSlugs.length}`);
}
