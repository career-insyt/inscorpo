const fs = require('fs');
const content = fs.readFileSync('lib/data/capcut-master-academy.ts', 'utf8');
console.log('capcut first 500 chars:');
console.log(content.substring(0, 500));
console.log('capcut exports:');
const exportedNames = [...content.matchAll(/export\s+(const|interface|type|class|function)\s+([A-Za-z0-9_]+)/g)].map(m => m[2]);
console.log(exportedNames);
