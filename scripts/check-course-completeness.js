const fs = require('fs');
const path = require('path');

// Let's inspect the lessons registered in DYNAMIC_LESSONS
const lessonsTs = fs.readFileSync(path.join(__dirname, '../lib/data/lessons.ts'), 'utf8');
const biLessonsTs = fs.readFileSync(path.join(__dirname, '../lib/data/enterprise-bi-lessons.ts'), 'utf8');
const autoLessonsTs = fs.readFileSync(path.join(__dirname, '../lib/data/enterprise-automation-lessons.ts'), 'utf8');
const pyLessonsTs = fs.readFileSync(path.join(__dirname, '../lib/data/enterprise-python-lessons.ts'), 'utf8');
const corpLessonsTs = fs.readFileSync(path.join(__dirname, '../lib/data/corporate-modeling-lessons.ts'), 'utf8');

// Also check courses.ts
const coursesTs = fs.readFileSync(path.join(__dirname, '../lib/data/courses.ts'), 'utf8');

console.log("=== COURSE COMPLETENESS ANALYSIS ===");

// 1. Enterprise BI
const biSlugs = (biLessonsTs.match(/"bi-\d+-\d+-[^"]+":/g) || []).length;
console.log(`1. Enterprise BI: ${biSlugs}/48 lessons authored in enterprise-bi-lessons.ts`);

// 2. Enterprise Automation
const autoSlugs = (autoLessonsTs.match(/"auto-\d+-\d+-[^"]+":/g) || []).length;
console.log(`2. Enterprise Automation: ${autoSlugs}/40 lessons authored in enterprise-automation-lessons.ts`);

// 3. Enterprise Python
const pySlugs = (pyLessonsTs.match(/"py-\d+-\d+-[^"]+":/g) || []).length;
console.log(`3. Enterprise Python: ${pySlugs}/40 lessons authored in enterprise-python-lessons.ts`);

// 4. Corporate Financial Modeling Excel
const corpSlugs = (corpLessonsTs.match(/["']([a-zA-Z0-9_-]+)["']:\s*\{[\s\S]*?slug:/g) || []).length;
console.log(`4. Corporate Modeling Excel: ~${corpSlugs} lessons authored in corporate-modeling-lessons.ts`);

// 5. MTO Fast Track
// Let's check what lessons exist for mto-recruitment-mastery
const mtoLessonsInCourses = (coursesTs.match(/slug:\s*"(quant-[^"]+|data-[^"]+|issue-[^"]+|profitability-[^"]+|assessment-[^"]+|star-[^"]+)"/g) || []);
console.log(`5. MTO Fast Track: ${mtoLessonsInCourses.length} lessons defined in courses.ts:`, mtoLessonsInCourses.map(s => s.replace(/slug:\s*"/, '').replace('"', '')));

// Check if MTO lessons exist in lessons.ts or mto-mastery-lessons.ts
const mtoLessonsTs = fs.existsSync(path.join(__dirname, '../lib/data/mto-mastery-lessons.ts'))
  ? fs.readFileSync(path.join(__dirname, '../lib/data/mto-mastery-lessons.ts'), 'utf8')
  : '';

for (const l of mtoLessonsInCourses) {
  const slug = l.replace(/slug:\s*"/, '').replace('"', '');
  const inLessons = lessonsTs.includes(`"${slug}":`) || mtoLessonsTs.includes(`"${slug}":`);
  console.log(`   - ${slug} in lessons catalog? ${inLessons}`);
}

// 6. Video AI Production
const videoLessonsInCourses = coursesTs.includes("timeline-assembly");
console.log(`6. Video AI Production: has timeline-assembly? ${videoLessonsInCourses}`);
console.log(`   - timeline-assembly in lessons.ts? ${lessonsTs.includes('"timeline-assembly":')}`);
