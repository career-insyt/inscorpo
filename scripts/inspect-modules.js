const fs = require('fs');
const content = fs.readFileSync('lib/data/enterprise-bi-lessons.ts', 'utf8');
const matches = [...content.matchAll(/"(bi-\d+-\d+-[^"]+)":/g)].map(m => m[1]);
console.log('Total BI lesson slugs found:', matches.length);
matches.forEach((slug, idx) => {
  const modNum = Math.floor(idx / 4) + 1;
  const lNum = (idx % 4) + 1;
  console.log(`[Mod ${modNum}.${lNum}] ${slug}`);
});
