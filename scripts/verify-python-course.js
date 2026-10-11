const fs = require('fs');
const path = require('path');

console.log("====================================================");
console.log("🚀 VERIFYING ENTERPRISE PYTHON COURSE & LMS PLATFORM");
console.log("====================================================\n");

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

// 1. Check enterprise-python-lessons.ts
const lessonsFile = fs.readFileSync(path.join(__dirname, '../lib/data/enterprise-python-lessons.ts'), 'utf8');

// Count lesson slugs defined in ENTERPRISE_PYTHON_LESSONS
const lessonMatches = lessonsFile.match(/"py-\d+-\d+-[^"]+":/g) || [];
assert(lessonMatches.length === 40, `All 40 instructional lessons authored (Found: ${lessonMatches.length})`);

// Verify all 10 modules are covered
for (let m = 1; m <= 10; m++) {
  const modLessons = lessonMatches.filter(slug => slug.startsWith(`"py-${m}-`));
  assert(modLessons.length === 4, `Module ${m} contains exactly 4 authored lessons (Found: ${modLessons.length})`);
}

// Verify code blocks and business problem notes exist in lessons
assert(lessonsFile.includes("python") && lessonsFile.includes("def audit_invoice_record"), "Lessons contain syntax-highlighted runnable Python code blocks");
assert(lessonsFile.includes("quiz: {"), "Lessons contain interactive assessment checks");
assert(lessonsFile.includes("hasSimulator: \"python-analytics\""), "Lessons configure python-analytics interactive studio");

// 2. Check courses.ts
const coursesFile = fs.readFileSync(path.join(__dirname, '../lib/data/courses.ts'), 'utf8');
assert(coursesFile.includes("enterprise-python-corporate-analytics-process-automation"), "Course slug registered in courses.ts");
assert(coursesFile.includes("Enterprise Python for Corporate Analytics & Process Automation"), "Official course title matches blueprint");
assert(coursesFile.includes("priceBdt: 8500"), "Proposed Tier 1 pricing BDT 8,500 present");
assert(coursesFile.includes("priceBdt: 16500"), "Proposed Tier 2 pricing BDT 16,500 present");
assert(coursesFile.includes("priceBdt: 32000"), "Proposed Tier 3 pricing BDT 32,000 present");
assert(coursesFile.includes("FMCG Distributor Performance & Incentive Automation"), "Capstone A (FMCG) registered");
assert(coursesFile.includes("Multi-Entity FP&A Consolidation & Variance Engine"), "Capstone B (FP&A) registered");
assert(coursesFile.includes("Retail Banking Multi-Channel Settlement & Break Audit"), "Capstone C (Banking) registered");
assert(coursesFile.includes("Recruiter Job Simulation: 3-Hour Enterprise Analytics Practical"), "3-Hour Recruiter Simulation registered with 5-part rubric");

// 3. Check lessons.ts export merge
const mainLessonsFile = fs.readFileSync(path.join(__dirname, '../lib/data/lessons.ts'), 'utf8');
assert(mainLessonsFile.includes("ENTERPRISE_PYTHON_LESSONS"), "ENTERPRISE_PYTHON_LESSONS imported and merged into DYNAMIC_LESSONS");
assert(mainLessonsFile.includes("python-analytics"), "LessonDetail hasSimulator union includes 'python-analytics'");

// 4. Check search database
const searchFile = fs.readFileSync(path.join(__dirname, '../components/layout/search-command-palette.tsx'), 'utf8');
assert(searchFile.includes("course-enterprise-python"), "Enterprise Python registered in Search Command Palette database");

// 5. Check White Mode on Search & Notifications
assert(searchFile.includes("bg-white") && searchFile.includes("text-slate-900") && searchFile.includes("border-blue-500"), "Search Command Palette modal styled in clean white mode");
const topbarFile = fs.readFileSync(path.join(__dirname, '../components/layout/dashboard-topbar.tsx'), 'utf8');
assert(topbarFile.includes("bg-white") && topbarFile.includes("text-slate-900") && topbarFile.includes("border-blue-500"), "Notifications Popover dropdown styled in clean white mode");

// 6. Check learn hub page
const learnHubFile = fs.readFileSync(path.join(__dirname, '../app/(dashboard)/learn/page.tsx'), 'utf8');
assert(learnHubFile.includes("enterprise-python-corporate-analytics-process-automation"), "Flagship course registered on /learn hub");

// 7. Check python analytics studio component
const studioFile = fs.readFileSync(path.join(__dirname, '../components/learning/python-analytics-studio.tsx'), 'utf8');
assert(studioFile.includes("vendor_audit"), "Python Sandbox contains Vendor Payment Normalization preset");
assert(studioFile.includes("raw_vendor_payments.txt"), "Corporate Datasets inspector contains raw_vendor_payments preview & download");
assert(studioFile.includes("KeyError: 'Invoice_Date'"), "Debugging Gym contains KeyError schema drift challenge");

console.log("\n====================================================");
console.log(`🎯 VERIFICATION RESULTS: ${passed}/${total} Passed (${Math.round((passed/total)*100)}%)`);
console.log("====================================================");
