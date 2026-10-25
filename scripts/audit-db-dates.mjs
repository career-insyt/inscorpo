import fs from 'fs';
import path from 'path';

const dbDir = path.join(process.cwd(), 'DB');
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.json'));

console.log('=== DATASET ANALYSIS OF DB FOLDER ===');
console.log(`Found ${files.length} JSON files in DB/`);

let totalRecords = 0;
const orgSet = new Set();
const allDates = [];

files.forEach(f => {
  try {
    const raw = fs.readFileSync(path.join(dbDir, f), 'utf-8');
    const data = JSON.parse(raw);
    let count = 0;

    if (Array.isArray(data)) {
      count = data.length;
      data.forEach(item => {
        if (item.organization || item.company) orgSet.add(item.organization || item.company);
        if (item.date_posted) allDates.push(item.date_posted);
        if (item.deadline) allDates.push(item.deadline);
      });
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.jobs)) {
        count = data.jobs.length;
        data.jobs.forEach(j => {
          if (j.organization || j.company) orgSet.add(j.organization || j.company);
          if (j.date_posted) allDates.push(j.date_posted);
          if (j.deadline) allDates.push(j.deadline);
        });
      } else if (Array.isArray(data.organizations)) {
        data.organizations.forEach(org => {
          orgSet.add(org.organization || org.acronym);
          if (Array.isArray(org.jobs)) {
            count += org.jobs.length;
            org.jobs.forEach(j => {
              if (j.applicationDeadline) allDates.push(j.applicationDeadline);
            });
          }
        });
      }
    }
    console.log(`- ${f}: ${count} records`);
    totalRecords += count;
  } catch (e) {
    console.log(`- ${f}: parse error (${e.message})`);
  }
});

console.log(`\nTotal Records across all DB JSON files: ${totalRecords}`);
console.log(`Distinct Organizations: ${orgSet.size}`);
console.log('Sample Orgs:', Array.from(orgSet).slice(0, 10));

// Inspect dates
console.log(`\nTotal date occurrences found: ${allDates.length}`);
const sampleDates = allDates.slice(0, 15);
console.log('Sample dates:', sampleDates);
