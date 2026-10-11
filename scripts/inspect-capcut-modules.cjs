const fs = require('fs');
const content = fs.readFileSync('lib/data/capcut-master-academy.ts', 'utf8');
const start = content.indexOf('export const CAPCUT_MODULES: CapCutModule[] = [');
console.log(content.substring(start, start + 1200));
