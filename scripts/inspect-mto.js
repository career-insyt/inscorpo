const fs = require('fs');

const coursesContent = fs.readFileSync('lib/data/courses.ts', 'utf8');
const mtoMatch = coursesContent.match(/slug:\s*"mto-recruitment-mastery"[\s\S]*?lessons:\s*\[([\s\S]*?)\]/);
if (mtoMatch) {
  console.log('MTO lessons array in courses.ts:\n', mtoMatch[1]);
} else {
  console.log('Could not find mto-recruitment-mastery in courses.ts');
}

const lessonsContent = fs.readFileSync('lib/data/lessons.ts', 'utf8');
console.log('Total lessons in lessons.ts:', (lessonsContent.match(/slug:\s*"[^"]+"/g) || []).length);
