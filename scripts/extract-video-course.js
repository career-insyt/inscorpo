const fs = require('fs');

const content = fs.readFileSync('lib/data/courses.ts', 'utf8');
const start = content.indexOf('slug: "video-ai-production"');
const end = content.indexOf('export const ENTERPRISE_PYTHON_COURSE');
console.log('--- video-ai-production in courses.ts ---');
console.log(content.substring(start, end));

console.log('--- capcut-master-academy.ts check ---');
const capcutExists = fs.existsSync('lib/data/capcut-master-academy.ts');
console.log('capcut-master-academy.ts exists?', capcutExists);
if (capcutExists) {
  const capcutContent = fs.readFileSync('lib/data/capcut-master-academy.ts', 'utf8');
  console.log('capcut file size:', capcutContent.length);
  const matches = [...capcutContent.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  console.log('Total slugs in capcut-master-academy.ts:', matches.length);
  console.log('Sample slugs:', matches.slice(0, 10));
}
