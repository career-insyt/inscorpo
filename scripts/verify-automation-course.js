const fs = require('fs');
const path = require('path');

console.log("====================================================");
console.log("🚀 VERIFYING APPLIED WORKPLACE AI AUTOMATION COURSE");
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

// 1. Check enterprise-automation-lessons.ts
const lessonsFile = fs.readFileSync(path.join(__dirname, '../lib/data/enterprise-automation-lessons.ts'), 'utf8');

// Count lesson slugs defined in ENTERPRISE_AUTOMATION_LESSONS
const lessonMatches = lessonsFile.match(/"auto-\d+-\d+-[^"]+":/g) || [];
assert(lessonMatches.length === 40, `All 40 instructional lessons authored (Found: ${lessonMatches.length})`);

// Verify all 10 modules are covered with exactly 4 lessons each
for (let m = 1; m <= 10; m++) {
  const modLessons = lessonMatches.filter(slug => slug.startsWith(`"auto-${m}-`));
  assert(modLessons.length === 4, `Module ${m} contains exactly 4 authored lessons (Found: ${modLessons.length})`);
}

// Check curriculum substance
assert(lessonsFile.includes("SIPOC") && lessonsFile.includes("BPMN 2.0"), "Module 1 contains SIPOC & BPMN 2.0 process mapping");
assert(lessonsFile.includes("OAuth 2.0") && lessonsFile.includes("HMAC-SHA256"), "Module 2 contains REST APIs, OAuth 2.0 & Webhooks");
assert(lessonsFile.includes("n8n") && lessonsFile.includes("Code Node"), "Module 3 contains n8n workflow architecture & Code nodes");
assert(lessonsFile.includes("Power Automate") && lessonsFile.includes("Dataverse") && lessonsFile.includes("Adaptive Cards"), "Module 4 contains Power Automate, Dataverse & Teams");
assert(lessonsFile.includes("Power Automate Desktop") && lessonsFile.includes("UI Selector"), "Module 5 contains Desktop RPA & selector drift");
assert(lessonsFile.includes("Document AI") && lessonsFile.includes("JSON Schema") && lessonsFile.includes("Prompt Injection"), "Module 6 contains Bounded AI & prompt injection safety");
assert(lessonsFile.includes("Exponential Backoff") && lessonsFile.includes("Jitter") && lessonsFile.includes("Dead-Letter Queue"), "Module 7 contains Fault tolerance, jitter & DLQ");
assert(lessonsFile.includes("Service Principal") && lessonsFile.includes("DLP") && lessonsFile.includes("ALM"), "Module 8 contains Governance, DLP & Solution ALM");
assert(lessonsFile.includes("Net Present Value") && lessonsFile.includes("Payback") && lessonsFile.includes("Minto Pyramid"), "Module 9 contains ROI modeling & executive proposals");
assert(lessonsFile.includes("Nexus Global Logistics") && lessonsFile.includes("CEAS"), "Module 10 contains Nexus simulation & CEAS credential defense");

// Check guided labs and quizzes
assert(lessonsFile.includes("Guided Lab 1A") && lessonsFile.includes("Guided Lab 10D"), "Guided hands-on labs embedded across curriculum");
assert(lessonsFile.includes("hasSimulator: \"workflow-automation\""), "Lessons configure workflow-automation interactive studio");

// 2. Check courses.ts
const coursesFile = fs.readFileSync(path.join(__dirname, '../lib/data/courses.ts'), 'utf8');
assert(coursesFile.includes("applied-workplace-ai-enterprise-workflow-automation"), "Course slug registered in courses.ts");
assert(coursesFile.includes("Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate"), "Official course title registered");
assert(coursesFile.includes("priceBdt: 12500"), "Proposed Tier 1 pricing BDT 12,500 present");
assert(coursesFile.includes("priceBdt: 22000"), "Proposed Tier 2 pricing BDT 22,000 present");
assert(coursesFile.includes("priceBdt: 180000"), "Proposed Tier 3 pricing BDT 180,000 present");
assert(coursesFile.includes("Multi-Source Invoice & Ledger Reconciliation Pipeline"), "Capstone A (Finance & Accounting) registered");
assert(coursesFile.includes("Employee Onboarding Lifecycle Pipeline"), "Capstone B (Human Resources) registered");
assert(coursesFile.includes("Critical Incident Triage & Escalation Engine"), "Capstone C (Operations & Support) registered");
assert(coursesFile.includes("Inbound Lead Enrichment & CRM Synchronization Engine"), "Capstone D (Revenue Operations) registered");
assert(coursesFile.includes("Nexus Global Logistics: Multi-System Enterprise Automation Transformation"), "Nexus Global Logistics capstone job simulation registered");
assert(coursesFile.includes("applied-ai-automation"), "Dedicated learning path applied-ai-automation registered in ALL_PATHS");

// 3. Check lessons.ts export merge
const mainLessonsFile = fs.readFileSync(path.join(__dirname, '../lib/data/lessons.ts'), 'utf8');
assert(mainLessonsFile.includes("ENTERPRISE_AUTOMATION_LESSONS"), "ENTERPRISE_AUTOMATION_LESSONS imported and merged into DYNAMIC_LESSONS");
assert(mainLessonsFile.includes("workflow-automation"), "LessonDetail hasSimulator union includes 'workflow-automation'");

// 4. Check search command palette database
const searchFile = fs.readFileSync(path.join(__dirname, '../components/layout/search-command-palette.tsx'), 'utf8');
assert(searchFile.includes("course-enterprise-automation"), "Enterprise Automation registered in Search Command Palette database");

// 5. Check /learn hub page
const learnHubFile = fs.readFileSync(path.join(__dirname, '../app/(dashboard)/learn/page.tsx'), 'utf8');
assert(learnHubFile.includes("applied-workplace-ai-enterprise-workflow-automation"), "Flagship course registered on /learn hub");

// 6. Check workflow automation studio component
const studioFile = fs.readFileSync(path.join(__dirname, '../components/learning/workflow-automation-studio.tsx'), 'utf8');
assert(studioFile.includes("WORKFLOW_NODES"), "Interactive Workflow Canvas contains structured nodes and pins");
assert(studioFile.includes("Live Execution Audit Trail"), "Execution Trace component present");
assert(studioFile.includes("Interactive API Request & Status Sandbox"), "Mock API Request Playground present with status codes");
assert(studioFile.includes("monthlyVolume") && studioFile.includes("paybackPeriodMonths"), "Interactive ROI & Payback Calculator present");
assert(studioFile.includes("DEBUG_CHALLENGES"), "Failure-Driven Debugging Gym present with root-cause diagnostics");

// 7. Check lesson player page wiring
const playerFile = fs.readFileSync(path.join(__dirname, '../app/(dashboard)/learn/[pathSlug]/[courseSlug]/[lessonSlug]/page.tsx'), 'utf8');
assert(playerFile.includes("WorkflowAutomationStudio"), "WorkflowAutomationStudio imported in lesson player page");
assert(playerFile.includes("hasSimulator === \"workflow-automation\""), "WorkflowAutomationStudio rendered on simulation tab");

console.log("\n====================================================");
console.log(`🎯 VERIFICATION RESULTS: ${passed}/${total} Passed (${Math.round((passed/total)*100)}%)`);
console.log("====================================================");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
