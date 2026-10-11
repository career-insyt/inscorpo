const fs = require('fs');

const capcutContent = fs.readFileSync('lib/data/capcut-master-academy.ts', 'utf8');
const start = capcutContent.indexOf('export const CAPCUT_MODULES: CapCutModule[] = [');
const end = capcutContent.indexOf('export function getCapCutModuleBySlug');
const jsonSlice = capcutContent.substring(start + 'export const CAPCUT_MODULES: CapCutModule[] = '.length, end).trim();
const cleaned = jsonSlice.replace(/;\s*$/, '');
const modules = eval(`(${cleaned})`);

console.log('Generating capcut-lessons-adapter.ts with', modules.length, 'modules...');

let code = `import { LessonDetail } from "./lessons";

export const CAPCUT_LESSON_DETAILS: Record<string, LessonDetail> = {
`;

modules.forEach(m => {
  const notes = `### ${m.title}

#### Objective & Learning Framework
${m.objective}

#### Core Curriculum Breakdown
${m.lessons.map(l => `* ${l}`).join('\n')}

#### Practical Application Exercise
${m.exercise}

#### CapCut Academy Assignment
${m.assignment}
`;

  code += `  "${m.slug}": {
    slug: "${m.slug}",
    title: "${m.title}",
    xpReward: ${m.xpReward || 100},
    duration: "${m.duration || '45m'}",
    videoUrl: "${m.youtubeId ? `https://www.youtube.com/watch?v=${m.youtubeId}` : 'https://www.w3schools.com/html/mov_bbb.mp4'}",
    notes: ${JSON.stringify(notes)},
    quiz: {
      question: ${JSON.stringify(m.quiz.question)},
      options: ${JSON.stringify(m.quiz.options)},
      correctIdx: ${m.quiz.correctIdx},
      explanation: ${JSON.stringify(m.quiz.explanation)}
    },
    hasSimulator: "tool-matrix"
  },
`;
});

code += `};
`;

fs.writeFileSync('lib/data/capcut-lessons-adapter.ts', code, 'utf8');
console.log('Successfully wrote lib/data/capcut-lessons-adapter.ts!');

// Now build the modules array for courses.ts
const stageMap = {};
modules.forEach(m => {
  if (!stageMap[m.stageNumber]) {
    stageMap[m.stageNumber] = {
      title: `${m.stageNumber}: ${m.stageTitle}`,
      stageId: m.stageId,
      description: `Master ${m.stageTitle.toLowerCase()} workflows: ${m.objective.slice(0, 150)}...`,
      duration: "4h 15m",
      exercisesCount: 0,
      lessons: []
    };
  }
  stageMap[m.stageNumber].exercisesCount++;
  stageMap[m.stageNumber].lessons.push({
    slug: m.slug,
    title: m.title,
    duration: m.duration || "45m",
    type: m.id % 4 === 0 ? "assessment" : m.id % 3 === 0 ? "simulation" : "video",
    xp: m.xpReward || 100
  });
});

const courseModules = Object.values(stageMap);
fs.writeFileSync('scripts/capcut-course-modules.json', JSON.stringify(courseModules, null, 2), 'utf8');
console.log('Generated course modules JSON for courses.ts! Stages count:', courseModules.length);
