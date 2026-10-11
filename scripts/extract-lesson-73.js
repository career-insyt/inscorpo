const fs = require('fs');
const content = fs.readFileSync('lib/data/enterprise-bi-lessons.ts', 'utf8');
const start = content.indexOf('"bi-7-3-advanced-commercial-measures":');
const end = content.indexOf('"bi-7-4-dax-performance-context-audit":');
console.log(content.substring(start, end));
