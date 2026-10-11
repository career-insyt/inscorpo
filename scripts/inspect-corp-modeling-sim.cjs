const fs = require('fs');
const content = fs.readFileSync('app/(dashboard)/learn/[pathSlug]/[courseSlug]/[lessonSlug]/page.tsx', 'utf8');

const idx = content.indexOf('corporate-modeling');
console.log('Index:', idx);
if (idx !== -1) {
  console.log(content.substring(idx - 50, idx + 800));
}
