const fs = require('fs');

const coursesContent = fs.readFileSync('lib/data/courses.ts', 'utf8');
const courseModules = JSON.parse(fs.readFileSync('scripts/capcut-course-modules.json', 'utf8'));

// Format modules array as TypeScript
let tsModules = 'modules: [\n';
courseModules.forEach((m, idx) => {
  tsModules += `          {\n`;
  tsModules += `            title: ${JSON.stringify(m.title)},\n`;
  tsModules += `            description: ${JSON.stringify(m.description)},\n`;
  tsModules += `            duration: ${JSON.stringify(m.duration)},\n`;
  tsModules += `            exercisesCount: ${m.exercisesCount},\n`;
  tsModules += `            lessons: [\n`;
  m.lessons.forEach(l => {
    tsModules += `              { slug: ${JSON.stringify(l.slug)}, title: ${JSON.stringify(l.title)}, duration: ${JSON.stringify(l.duration)}, type: ${JSON.stringify(l.type)}, xp: ${l.xp} },\n`;
  });
  tsModules += `            ]\n`;
  tsModules += `          }${idx < courseModules.length - 1 ? ',' : ''}\n`;
});
tsModules += `        ]`;

const target = `          rubric: [
            "Pacing and retention hook within first 3 seconds",
            "Audio normalization and clean voiceover integration",
            "Consistent brand color grading and typography hierarchy",
            "Seamless multi-camera and B-roll transitions"
          ]
        }`;

if (!coursesContent.includes(target)) {
  console.error('Target not found in courses.ts!');
  process.exit(1);
}

const replacement = `${target},
        ${tsModules}`;

const updated = coursesContent.replace(target, replacement);
fs.writeFileSync('lib/data/courses.ts', updated, 'utf8');
console.log('Successfully injected 36 lessons across 8 modules into video-ai-production in courses.ts!');
