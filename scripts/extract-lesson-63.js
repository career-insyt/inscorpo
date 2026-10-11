const fs = require('fs');
const content = fs.readFileSync('lib/data/enterprise-bi-lessons.ts', 'utf8');
const start = content.indexOf('"bi-6-3-calculate-filter-modification":');
const end = content.indexOf('"bi-6-4-dax-debugging-validation":');
console.log(content.substring(start, end));
