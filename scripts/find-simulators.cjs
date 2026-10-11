const fs = require('fs');
const content = fs.readFileSync('app/(dashboard)/learn/[pathSlug]/[courseSlug]/[lessonSlug]/page.tsx', 'utf8');

const matches = [...content.matchAll(/hasSimulator === "([^"]+)"/g)].map(m => m[1]);
console.log('Simulators matched in page.tsx:');
console.log([...new Set(matches)]);
