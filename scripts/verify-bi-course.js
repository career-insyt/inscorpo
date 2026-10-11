const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("🚀 VERIFYING ENTERPRISE BUSINESS INTELLIGENCE: POWER BI & SQL COURSE");
console.log("==========================================================================\n");

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Check enterprise-bi-lessons.ts
// ─────────────────────────────────────────────────────────────────────────────
const lessonsFilePath = path.join(__dirname, '../lib/data/enterprise-bi-lessons.ts');
assert(fs.existsSync(lessonsFilePath), "enterprise-bi-lessons.ts exists in lib/data/");

const lessonsFile = fs.readFileSync(lessonsFilePath, 'utf8');

// Count lesson slugs defined in ENTERPRISE_BI_LESSONS
const lessonMatches = lessonsFile.match(/"bi-\d+-\d+-[^"]+":/g) || [];
assert(lessonMatches.length === 48, `All 48 instructional lessons authored (Found: ${lessonMatches.length})`);

// Verify all 12 modules are covered with exactly 4 lessons each
for (let m = 1; m <= 12; m++) {
  const modLessons = lessonMatches.filter(slug => slug.startsWith(`"bi-${m}-`));
  assert(modLessons.length === 4, `Module ${m} contains exactly 4 authored lessons (Found: ${modLessons.length})`);
}

// Check curriculum substance across modules
assert(lessonsFile.includes("Metric Tree") && lessonsFile.includes("Pipeline"), "Module 1 contains KPI metric trees & BI lifecycle");
assert(lessonsFile.includes("GROUP BY") && lessonsFile.includes("HAVING"), "Module 2 contains Enterprise SQL aggregations & null handling");
assert(lessonsFile.includes("ROW_NUMBER") && lessonsFile.includes("LAG") && lessonsFile.includes("WITH "), "Module 3 contains Window functions & CTEs");
assert(lessonsFile.includes("Query Folding") && lessonsFile.includes("Power Query"), "Module 4 contains Power Query M-code & query folding audit");
assert(lessonsFile.includes("Star Schema") && lessonsFile.includes("Surrogate") && lessonsFile.includes("1-to-many"), "Module 5 contains Kimball dimensional modeling & star schemas");
assert(lessonsFile.includes("CALCULATE") && lessonsFile.includes("REMOVEFILTERS") && lessonsFile.includes("Filter Context"), "Module 6 contains Core DAX & filter context transitions");
assert(lessonsFile.includes("SAMEPERIODLASTYEAR") && lessonsFile.includes("SUMX") && lessonsFile.includes("Time Intelligence"), "Module 7 contains Advanced commercial DAX & Time Intelligence");
assert(lessonsFile.includes("Visual Hierarchy") && lessonsFile.includes("Drill-Through"), "Module 8 contains Dashboard UX & cognitive visual hierarchy");
assert(lessonsFile.includes("Price-Volume-Mix") && lessonsFile.includes("PVM") && lessonsFile.includes("Executive"), "Module 9 contains Variance decomposition & executive memos");
assert(lessonsFile.includes("USERPRINCIPALNAME") && lessonsFile.includes("RLS") && lessonsFile.includes("Gateway"), "Module 10 contains Row-Level Security & gateway governance");
assert(lessonsFile.includes("AI-Assisted") && lessonsFile.includes("Hallucinations"), "Module 11 contains AI-assisted SQL/DAX auditing");
assert(lessonsFile.includes("Apex Consumer Goods") && lessonsFile.includes("Boardroom Defense") && lessonsFile.includes("Career Passport"), "Module 12 contains Capstone execution & boardroom defense");

// Check interactive studio configuration
assert(lessonsFile.includes('hasSimulator: "bi-powerbi-sql"'), "Lessons configure bi-powerbi-sql interactive studio");

// ─────────────────────────────────────────────────────────────────────────────
// 2. Check lessons.ts export merge
// ─────────────────────────────────────────────────────────────────────────────
const mainLessonsFile = fs.readFileSync(path.join(__dirname, '../lib/data/lessons.ts'), 'utf8');
assert(mainLessonsFile.includes("ENTERPRISE_BI_LESSONS"), "ENTERPRISE_BI_LESSONS imported and merged into DYNAMIC_LESSONS");
assert(mainLessonsFile.includes('"bi-powerbi-sql"'), "LessonDetail hasSimulator union includes 'bi-powerbi-sql'");

// ─────────────────────────────────────────────────────────────────────────────
// 3. Check courses.ts
// ─────────────────────────────────────────────────────────────────────────────
const coursesFile = fs.readFileSync(path.join(__dirname, '../lib/data/courses.ts'), 'utf8');
assert(coursesFile.includes("enterprise-business-intelligence-power-bi-sql-corporate-analysts"), "Primary course slug registered in courses.ts");
assert(coursesFile.includes("Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts"), "Official course title registered");
assert(coursesFile.includes("hours: 120"), "120 total learning hours configured");
assert(coursesFile.includes("lessons: 48"), "48 lessons configured in course metadata");
assert(coursesFile.includes("priceBdt: 5500"), "Proposed Tier 1 pricing BDT 5,500 present");
assert(coursesFile.includes("priceBdt: 14500"), "Proposed Tier 2 pricing BDT 14,500 present");
assert(coursesFile.includes("priceBdt: 28000"), "Proposed Tier 3 pricing BDT 28,000 present");
assert(coursesFile.includes("FMCG Trade Spend & Distributor Pacing"), "Portfolio Project 1 (FMCG Trade Spend, 1.8M rows) registered");
assert(coursesFile.includes("Telecom Cohort Retention & ARPU Analysis"), "Portfolio Project 2 (Telecom Cohort Retention, 850k rows) registered");
assert(coursesFile.includes("Mobile Financial Services Liquidity & Agent Risk"), "Portfolio Project 3 (MFS Liquidity, 3.2M rows) registered");
assert(coursesFile.includes("Retail Supply Chain Health & Working Capital"), "Portfolio Project 4 (Retail Supply Chain) registered");
assert(coursesFile.includes("Apex Consumer Goods Ltd. — Enterprise BI Simulation"), "Apex Consumer Goods enterprise simulation registered");
assert(coursesFile.includes("Apex Consumer Goods Ltd. — Enterprise BI Simulation & 6-Hour Job-Ready Challenge"), "6-Hour Job-Ready Practical Challenge registered");
assert(coursesFile.includes("Enterprise SQL Pipeline & Data Hygiene (20%)"), "5-dimension 100-point evaluation rubric registered");
assert(coursesFile.includes("Certified Enterprise Business Intelligence Analyst (CEBI)"), "Official CEBI credential designation configured");
assert(coursesFile.includes("business-intelligence-analyst"), "Dedicated learning path business-intelligence-analyst registered in ALL_PATHS");
assert(coursesFile.includes("enterprise-business-intelligence-powerbi-sql"), "Backward-compatible slug alias handled in getCourseBySlug");

// Check slug synchronization between courses.ts and enterprise-bi-lessons.ts
const coursesLessonSlugs = (coursesFile.match(/slug: "(bi-\d+-\d+-[^"]+)"/g) || []).map(s => s.replace(/slug: "|"/g, ''));
const lessonsSlugs = (lessonsFile.match(/"(bi-\d+-\d+-[^"]+)":/g) || []).map(s => s.replace(/"|:/g, ''));

assert(coursesLessonSlugs.length === 48, `courses.ts contains 48 lesson slugs (Found: ${coursesLessonSlugs.length})`);
assert(lessonsSlugs.length === 48, `enterprise-bi-lessons.ts contains 48 lesson slugs (Found: ${lessonsSlugs.length})`);

let mismatchCount = 0;
coursesLessonSlugs.forEach((cSlug, i) => {
  if (lessonsSlugs[i] !== cSlug) {
    mismatchCount++;
    console.log(`  ⚠️ Mismatch at index ${i}: courses.ts="${cSlug}" vs lessons="${lessonsSlugs[i]}"`);
  }
});
assert(mismatchCount === 0, `All 48 lesson slugs in courses.ts match enterprise-bi-lessons.ts (Mismatches: ${mismatchCount})`);

// ─────────────────────────────────────────────────────────────────────────────
// 4. Check BIPowerBISqlStudio Component
// ─────────────────────────────────────────────────────────────────────────────
const studioFilePath = path.join(__dirname, '../components/learning/bi-powerbi-sql-studio.tsx');
assert(fs.existsSync(studioFilePath), "bi-powerbi-sql-studio.tsx exists in components/learning/");

const studioFile = fs.readFileSync(studioFilePath, 'utf8');
assert(studioFile.includes("SQL_PRESETS"), "SQL query sandbox presets configured (PVM, Window functions, CTEs, Joins)");
assert(studioFile.includes("EXPLAIN Execution Plan"), "EXPLAIN query plan inspector implemented");
assert(studioFile.includes("Interactive Evaluation Context Simulator"), "DAX filter context visualizer implemented");
assert(studioFile.includes("Kimball Star Schema Semantic Model"), "Star Schema ERD explorer implemented");
assert(studioFile.includes("Power Query M-Engine & Query Folding Inspector"), "Power Query applied steps and query folding auditor implemented");
assert(studioFile.includes("Dashboard Heuristic Audit & 6-Hour Job-Ready Challenge"), "Dashboard redesign critique and 6-hour practical rubric implemented");
assert(studioFile.includes("Keyboard Shortcuts"), "Keyboard shortcuts guide dialog implemented");

// ─────────────────────────────────────────────────────────────────────────────
// 5. Check Lesson Player Integration
// ─────────────────────────────────────────────────────────────────────────────
const lessonPlayerFile = fs.readFileSync(path.join(__dirname, '../app/(dashboard)/learn/[pathSlug]/[courseSlug]/[lessonSlug]/page.tsx'), 'utf8');
assert(lessonPlayerFile.includes("BIPowerBISqlStudio"), "BIPowerBISqlStudio imported in lesson player page");
assert(lessonPlayerFile.includes('lesson.hasSimulator === "bi-powerbi-sql"'), "Simulator routes to BIPowerBISqlStudio on bi-powerbi-sql");
assert(lessonPlayerFile.includes("courseSlug.includes(\"business-intelligence\")"), "BI course detection routes to BIPowerBISqlStudio");
assert(lessonPlayerFile.includes(".sql"), "SQL starter file download support implemented in lesson player");

// ─────────────────────────────────────────────────────────────────────────────
// 6. Check /learn Catalogue & Search Command Palette
// ─────────────────────────────────────────────────────────────────────────────
const learnHubFile = fs.readFileSync(path.join(__dirname, '../app/(dashboard)/learn/page.tsx'), 'utf8');
assert(learnHubFile.includes("enterprise-business-intelligence-power-bi-sql-corporate-analysts"), "BI course slug registered in learn/page.tsx flagship courses");
assert(learnHubFile.includes("Apex Consumer Goods Enterprise Simulation & 6-Hour Challenge"), "Flagship course features Apex Consumer Goods 6-hour challenge");

const searchFile = fs.readFileSync(path.join(__dirname, '../components/layout/search-command-palette.tsx'), 'utf8');
assert(searchFile.includes("course-powerbi-sql"), "Power BI & SQL course registered in Search Command Palette");
assert(searchFile.includes("12-Week, 120-Hour Enterprise BI Apprenticeship"), "Rich 120-hour metadata registered in search palette");

// ─────────────────────────────────────────────────────────────────────────────
// 7. Check Downloadable Resources
// ─────────────────────────────────────────────────────────────────────────────
const starterSqlPath = path.join(__dirname, '../public/downloads/insyt-bi-capstone-starter.sql');
assert(fs.existsSync(starterSqlPath), "public/downloads/insyt-bi-capstone-starter.sql exists");
const starterSql = fs.readFileSync(starterSqlPath, 'utf8');
assert(starterSql.includes("fmcg_orders_header") && starterSql.includes("fmcg_orders_detail"), "Starter SQL script contains production tables for orders header and detail");
assert(starterSql.includes("vw_commercial_sales_cube"), "Starter SQL script contains reusable analytical view vw_commercial_sales_cube");

const briefPath = path.join(__dirname, '../public/downloads/insyt-bi-capstone-brief.md');
assert(fs.existsSync(briefPath), "public/downloads/insyt-bi-capstone-brief.md exists with capstone specifications");

console.log("\n==========================================================================");
console.log(`📊 VERIFICATION SUMMARY: ${passed} / ${total} TESTS PASSED (${((passed/total)*100).toFixed(1)}%)`);
console.log("==========================================================================");

if (passed === total) {
  console.log("🎉 ALL ENTERPRISE BUSINESS INTELLIGENCE COURSE REQUIREMENTS FULLY VERIFIED!\n");
  process.exit(0);
} else {
  console.error("⚠️ SOME CHECKS FAILED. PLEASE REVIEW LOGS ABOVE.\n");
  process.exit(1);
}
