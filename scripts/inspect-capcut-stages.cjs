const fs = require('fs');
const content = fs.readFileSync('lib/data/capcut-master-academy.ts', 'utf8');

// Extract stages and modules
const stagesMatch = content.match(/export const CAPCUT_STAGES: CapCutStage\[\] = (\[[\s\S]*?\]);/);
let stages = [];
if (stagesMatch) {
  try {
    stages = eval(stagesMatch[1]);
  } catch (e) {
    console.log('Eval error:', e.message);
  }
}
console.log('CAPCUT_STAGES count:', stages.length);
stages.forEach(s => {
  console.log(`Stage ${s.id}: ${s.title} (${s.subtitle}) - ${s.moduleCount} modules, ${s.totalHours}h`);
});

const modulesMatch = [...content.matchAll(/\{\s*"id":\s*(\d+),\s*"slug":\s*"([^"]+)",[\s\S]*?"stageId":\s*(\d+),[\s\S]*?"title":\s*"([^"]+)",[\s\S]*?"duration":\s*"([^"]+)"/g)];
console.log('Total modules matched in capcut-master-academy.ts:', modulesMatch.length);
console.log('First 5 modules:');
modulesMatch.slice(0, 5).forEach(m => {
  console.log(`  [Mod ${m[1]}] ${m[2]} (Stage ${m[3]}): "${m[4]}" (${m[5]})`);
});
