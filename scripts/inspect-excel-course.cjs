const fs = require('fs');

const coursesContent = fs.readFileSync('lib/data/courses.ts', 'utf8');
const modelingContent = fs.readFileSync('lib/data/corporate-modeling-lessons.ts', 'utf8');

// Extract lessons from courses.ts for corporate-financial-commercial-modeling-excel
const start = coursesContent.indexOf('slug: "corporate-financial-commercial-modeling-excel"');
const end = coursesContent.indexOf('ENTERPRISE_BI_COURSE');
const courseSlice = coursesContent.substring(start, end);

const courseSlugs = [...courseSlice.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]).filter(s => s !== 'corporate-financial-commercial-modeling-excel');
console.log('Total lesson slugs in courses.ts for Excel modeling:', courseSlugs.length);

const authoredSlugs = [...modelingContent.matchAll(/"([^"]+)":\s*\{[\s\S]*?slug:\s*"([^"]+)"/g)].map(m => m[2]);
console.log('Total authored slugs in corporate-modeling-lessons.ts:', authoredSlugs.length);

// Compare
const missingInAuthored = courseSlugs.filter(s => !authoredSlugs.includes(s));
const missingInCourse = authoredSlugs.filter(s => !courseSlugs.includes(s));

console.log('Slugs in courses.ts but NOT in corporate-modeling-lessons.ts:', missingInAuthored);
console.log('Slugs in corporate-modeling-lessons.ts but NOT in courses.ts:', missingInCourse);
