const fs = require('fs');
const content = fs.readFileSync('lib/data/enterprise-bi-lessons.ts', 'utf8');
const start = content.indexOf('"bi-9-2-variance-decomposition-reasoning":');
const end = content.indexOf('"bi-9-3-management-memos-briefings":');
console.log(content.substring(start, end));
