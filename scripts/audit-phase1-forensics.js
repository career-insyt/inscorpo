const fs = require('fs');

console.log('=== PHASE 1 FORENSIC AUDIT ===');

// 1. Starter SQL
const sql = fs.readFileSync('public/downloads/insyt-bi-capstone-starter.sql', 'utf8');
console.log('1. SQL Starter:');
console.log('  - Has freight_absorption in detail table?', sql.includes('freight_absorption NUMERIC'));
console.log('  - Has freight_absorption in vw_commercial_sales_cube?', sql.includes('freight_absorption_bdt') || (sql.includes('freight_absorption') && sql.indexOf('vw_commercial_sales_cube') < sql.lastIndexOf('freight_absorption')));
console.log('  - Has ship_date in orders_header?', sql.includes('ship_date DATE'));
console.log('  - Has dim_monthly_targets?', sql.includes('CREATE TABLE dim_monthly_targets'));

// 2. BI Studio Margins
const studio = fs.readFileSync('components/learning/bi-powerbi-sql-studio.tsx', 'utf8');
console.log('2. BI Studio:');
const matches14 = [...studio.matchAll(/14\.2/g)];
const matches20 = [...studio.matchAll(/20\.8/g)];
console.log('  - 14.2 occurrences:', matches14.length);
console.log('  - 20.8 occurrences:', matches20.length);

// 3. Quiz security check
const biLessons = fs.readFileSync('lib/data/enterprise-bi-lessons.ts', 'utf8');
const quizIdxMatches = [...biLessons.matchAll(/correctIdx:\s*(\d+)/g)];
console.log('3. Quiz Security:');
console.log('  - correctIdx occurrences in client enterprise-bi-lessons:', quizIdxMatches.length);

// Check if any API route handles quiz submission
const apiRoutesExist = fs.existsSync('app/api');
console.log('  - app/api directory exists?', apiRoutesExist);
if (apiRoutesExist) {
  const routes = fs.readdirSync('app/api', { recursive: true });
  console.log('  - API routes:', routes);
}
