const fs = require('fs');
const path = require('path');

const coursesTs = fs.readFileSync(path.join(__dirname, '../lib/data/courses.ts'), 'utf8');

// Match ALL_PATHS keys and each course in it
console.log("=== ALL_PATHS DETAILED INSPECTION ===");

// Let's extract paths
const pathsSection = coursesTs.substring(coursesTs.indexOf('export const ALL_PATHS'));
const pathKeys = [];
const pathKeyRegex = /"([a-z0-9-]+)":\s*\{\s*slug:\s*"([a-z0-9-]+)",\s*title:\s*"([^"]+)"/g;
let m;
while ((m = pathKeyRegex.exec(pathsSection)) !== null) {
  pathKeys.push({ key: m[1], slug: m[2], title: m[3] });
}

console.log(`Found ${pathKeys.length} Learning Paths in ALL_PATHS:`);
pathKeys.forEach(p => console.log(`  📁 [${p.key}] "${p.title}"`));

// Now let's list every course defined in courses.ts
const courseRegex = /slug:\s*"([a-z0-9-]+)",[\s\S]*?title:\s*"([^"]+)"/g;
// We can find all course objects
console.log("\n=== ALL COURSES IDENTIFIED ===");

// Let's inspect the actual courses in courses.ts
const courseBlocks = coursesTs.match(/\{\s*slug:\s*"[a-z0-9-]+",\s*pathSlug:\s*"[a-z0-9-]+",\s*title:\s*"[^"]+"/g) || [];
console.log(`Found ${courseBlocks.length} explicit Course objects with pathSlug:`);
courseBlocks.forEach(b => console.log(`  📘 ${b.replace(/\s+/g, ' ')}`));

// Also check top-level exported course objects like ENTERPRISE_...
const topLevelExports = coursesTs.match(/export const ([A-Z_]+):\s*CourseItem/g) || [];
console.log("\nTop-level exported CourseItem constants:");
topLevelExports.forEach(e => console.log(`  ⭐ ${e}`));
