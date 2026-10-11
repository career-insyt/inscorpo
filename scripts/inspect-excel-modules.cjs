const fs = require('fs');

const coursesContent = fs.readFileSync('lib/data/courses.ts', 'utf8');
const modelingContent = fs.readFileSync('lib/data/corporate-modeling-lessons.ts', 'utf8');

const start = coursesContent.indexOf('slug: "corporate-financial-commercial-modeling-excel"');
const end = coursesContent.indexOf('ENTERPRISE_BI_COURSE', start);
const courseSlice = coursesContent.substring(start, end);

const lessonMatches = [...courseSlice.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map(m => m[1])
  .filter(s => s !== 'corporate-financial-commercial-modeling-excel');
console.log('Lessons inside modules of corporate-financial-commercial-modeling-excel in courses.ts:', lessonMatches.length);

const authoredKeys = [...modelingContent.matchAll(/"([a-z0-9-]+)":\s*\{\s*slug:\s*"([a-z0-9-]+)"/g)].map(m => m[1]);
console.log('Authored lesson keys in corporate-modeling-lessons.ts:', authoredKeys.length);

const missingFromAuthored = lessonMatches.filter(s => !authoredKeys.includes(s));
console.log('In courses.ts but MISSING in corporate-modeling-lessons.ts:', missingFromAuthored);

const missingFromCourse = authoredKeys.filter(s => !lessonMatches.includes(s));
console.log('In corporate-modeling-lessons.ts but NOT in courses.ts modules:', missingFromCourse);
