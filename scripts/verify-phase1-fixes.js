const fs = require('fs');
const assert = require('assert');

console.log('==========================================================================');
console.log('🧪 TESTING PHASE 1 FIXES: FINANCIAL CORRECTNESS & SECURITY');
console.log('==========================================================================');

let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
  }
}

// 1. Starter SQL Check
const sql = fs.readFileSync('public/downloads/insyt-bi-capstone-starter.sql', 'utf8');

test('Starter SQL contains freight_absorption in vw_commercial_sales_cube', () => {
  assert(sql.includes('(d.units_sold * d.freight_absorption) AS freight_absorption_bdt'));
});

test('Starter SQL subtracts freight_absorption from operating_margin_bdt', () => {
  assert(sql.includes('(d.units_sold * (d.base_price - d.cost_per_unit - d.trade_discount - d.freight_absorption)) AS operating_margin_bdt'));
});

test('Starter SQL subtracts freight_absorption from operating_margin_pct', () => {
  assert(sql.includes('((d.base_price - d.cost_per_unit - d.trade_discount - d.freight_absorption) / d.base_price)'));
});

test('Starter SQL includes net_revenue_bdt and gross_margin_bdt waterfall columns', () => {
  assert(sql.includes('(d.units_sold * (d.base_price - d.trade_discount)) AS net_revenue_bdt'));
  assert(sql.includes('(d.units_sold * (d.base_price - d.cost_per_unit - d.trade_discount)) AS gross_margin_bdt'));
});

test('Starter SQL contains Kimball Multi-Star grain mismatch governance notes', () => {
  assert(sql.includes('TARGET GRAIN MISMATCH:'));
  assert(sql.includes('ROLE-PLAYING DATE DIMENSIONS:'));
});

// 2. BI Studio Check
const studio = fs.readFileSync('components/learning/bi-powerbi-sql-studio.tsx', 'utf8');

test('BI Studio reconciles North Zone margin to exactly 14.2%', () => {
  assert(studio.includes('"North Zone": { rev: 163.50, margin: 23.20'));
  const marginPct = ((23.20 / 163.50) * 100).toFixed(1);
  assert.strictEqual(marginPct, '14.2');
});

test('BI Studio Tier 1 KPI Banner states 388.6M Corporate Sales with 20.8% Blended Margin', () => {
  assert(studio.includes('৳ 388.6M Corporate Sales · 20.8% Blended Margin'));
  assert(studio.includes('(North Zone degraded to 14.2%)'));
});

test('BI Studio Power Query step parameterizes PostgreSQL connection', () => {
  assert(studio.includes('PostgreSQL.Database(#"ServerEndpoint", #"DatabaseName"'));
});

test('BI Studio analytical tables have min-w-[640px] for mobile scroll accessibility', () => {
  assert(studio.includes('min-w-[640px]'));
});

// 3. Server-side assessment verification
const verifyRoute = fs.readFileSync('app/api/assessment/verify/route.ts', 'utf8');

test('app/api/assessment/verify/route.ts exists and enforces authoritative evaluation', () => {
  assert(verifyRoute.includes('export async function POST'));
  assert(verifyRoute.includes('selectedOption === lesson.quiz.correctIdx'));
  assert(verifyRoute.includes('verifiedAt: new Date().toISOString()'));
});

const lessonPlayer = fs.readFileSync('app/(dashboard)/learn/[pathSlug]/[courseSlug]/[lessonSlug]/page.tsx', 'utf8');

test('Lesson player calls /api/assessment/verify with loading state and server explanation', () => {
  assert(lessonPlayer.includes('fetch("/api/assessment/verify"'));
  assert(lessonPlayer.includes('isVerifyingQuiz'));
  assert(lessonPlayer.includes('Authoritatively Verifying with Career Passport...'));
});

// 4. Curriculum Hardening Check
const biLessons = fs.readFileSync('lib/data/enterprise-bi-lessons.ts', 'utf8');

test('Lesson 9.2 contains exact PVM algebraic formulas and reconciliation proof', () => {
  assert(biLessons.includes('Price Effect') && biLessons.includes('V_{1,i}'));
  assert(biLessons.includes('Volume Effect') && biLessons.includes('(Q_1 - Q_0)'));
  assert(biLessons.includes('Mix Effect') && biLessons.includes('(S_{1,i} - S_{0,i})'));
  assert(biLessons.includes('The bridge reconciles with exactly 0.00 unexplained residual error!'));
});

test('Lesson 7.3 contains robust semi-additive closing/opening balance DAX pattern', () => {
  assert(biLessons.includes('Ending Cash Balance (Robust)'));
  assert(biLessons.includes('Opening Cash Balance'));
  assert(biLessons.includes('The Weighted Aggregate Margin Law: Never Average Percentages'));
});

test('Lesson 5.2 contains Target Grain Mismatch and ISINSCOPE guard', () => {
  assert(biLessons.includes('Target Fact Grain Mismatch & Cartesian Inflation Prevention'));
  assert(biLessons.includes('ISINSCOPE(dim_products[sku_code])'));
});

test('Lesson 5.3 contains Role-Playing Date Dimensions and USERELATIONSHIP', () => {
  assert(biLessons.includes('Role-Playing Date Dimensions: Order Date vs Ship Date'));
  assert(biLessons.includes('USERELATIONSHIP(fmcg_orders_header[ship_date], dim_calendar[date_key])'));
});

test('Lesson 6.3 contains KEEPFILTERS filter intersection explanation', () => {
  assert(biLessons.includes('Overriding vs Intersecting Filters: \\`KEEPFILTERS()\\`'));
});

console.log('==========================================================================');
console.log(`📊 SUMMARY: ${passed} / ${total} TESTS PASSED (${((passed / total) * 100).toFixed(1)}%)`);
console.log('==========================================================================');

if (passed === total) {
  console.log('🎉 PHASE 1 VERIFICATION COMPLETE!');
  process.exit(0);
} else {
  process.exit(1);
}
