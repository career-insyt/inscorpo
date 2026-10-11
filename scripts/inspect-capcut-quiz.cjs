const fs = require('fs');

const capcutContent = fs.readFileSync('lib/data/capcut-master-academy.ts', 'utf8');
const start = capcutContent.indexOf('export const CAPCUT_MODULES: CapCutModule[] = [');
const end = capcutContent.indexOf('export function getCapCutModuleBySlug');
const jsonSlice = capcutContent.substring(start + 'export const CAPCUT_MODULES: CapCutModule[] = '.length, end).trim();
const cleaned = jsonSlice.replace(/;\s*$/, '');
const modules = eval(`(${cleaned})`);

const withQuiz = modules.filter(m => m.quiz);
console.log('Modules with quiz:', withQuiz.length);
if (withQuiz.length > 0) {
  console.log('Sample quiz:', withQuiz[0].quiz);
}
const withNotes = modules.filter(m => m.notes);
console.log('Modules with notes:', withNotes.length);
console.log('Sample notes length:', withNotes[0]?.notes?.length);
