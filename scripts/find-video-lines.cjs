const fs = require('fs');
const content = fs.readFileSync('lib/data/courses.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('slug: "video-ai-production"')) {
    console.log(`Line ${idx + 1}: ${line}`);
    console.log(lines.slice(idx, idx + 25).join('\n'));
  }
});
