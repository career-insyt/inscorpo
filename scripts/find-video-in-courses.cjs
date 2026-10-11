const fs = require('fs');
const content = fs.readFileSync('lib/data/courses.ts', 'utf8');
const idx = content.indexOf('slug: "video-ai-production"');
console.log('Index:', idx);
const slice = content.substring(idx - 100, idx + 1000);
console.log(slice);
