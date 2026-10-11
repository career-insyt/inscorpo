const fs = require('fs');

const capcutContent = fs.readFileSync('lib/data/capcut-master-academy.ts', 'utf8');

// Parse CAPCUT_MODULES array
const start = capcutContent.indexOf('export const CAPCUT_MODULES: CapCutModule[] = [');
const end = capcutContent.indexOf('export function getCapCutModuleBySlug');
const jsonSlice = capcutContent.substring(start + 'export const CAPCUT_MODULES: CapCutModule[] = '.length, end).trim();
// clean up trailing semicolon if any
const cleaned = jsonSlice.replace(/;\s*$/, '');
const modules = eval(`(${cleaned})`);

console.log('Successfully parsed modules count:', modules.length);

// Group by stage
const stages = {};
modules.forEach(m => {
  if (!stages[m.stageNumber]) {
    stages[m.stageNumber] = {
      title: `${m.stageNumber}: ${m.stageTitle}`,
      stageId: m.stageId,
      modules: []
    };
  }
  stages[m.stageNumber].modules.push(m);
});

console.log('Stages found:', Object.keys(stages));
Object.keys(stages).forEach(s => {
  console.log(`${s}: ${stages[s].title} (${stages[s].modules.length} modules)`);
});
