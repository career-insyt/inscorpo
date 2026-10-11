const fs = require('fs');
const content = fs.readFileSync('lib/data/courses.ts', 'utf8');
const start = content.indexOf('slug: "video-ai-production"');
console.log(content.substring(start - 20, start + 1500));
