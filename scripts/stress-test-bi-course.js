const fs = require('fs');
const path = require('path');

const biLessonsFile = path.join(__dirname, '../lib/data/enterprise-bi-lessons.ts');
const biContent = fs.readFileSync(biLessonsFile, 'utf8');

console.log("==========================================================================");
console.log("🔬 DEEP FORENSIC STRESS TEST: ENTERPRISE BI COURSE CONTENT & CODE AUDIT");
console.log("==========================================================================\n");

const defects = [];
const warnings = [];

// 1. Check all 48 lessons parsing and structure
const lessonBlocks = biContent.split(/\n\s*"bi-\d+-\d+-[^"]+":\s*\{/);
console.log(`Detected ${lessonBlocks.length - 1} lesson blocks in file.`);

if (lessonBlocks.length - 1 !== 48) {
  defects.push({
    severity: "CRITICAL",
    category: "Lesson Count",
    issue: `Expected exactly 48 lesson blocks, found ${lessonBlocks.length - 1}.`
  });
}

// Extract each lesson slug
const slugMatches = biContent.match(/"(bi-\d+-\d+-[^"]+)":\s*\{/g) || [];
const slugs = slugMatches.map(s => s.replace(/"/g, '').replace(':', '').replace('{', '').trim());

console.log(`Extracted ${slugs.length} unique slugs.`);

// Check for placeholder text across all lessons
const placeholderTerms = ["TODO", "TBD", "placeholder", "lorem ipsum", "fixme", "asdf", "foo", "bar", "temp"];
for (const term of placeholderTerms) {
  const regex = new RegExp(`\\b${term}\\b`, 'gi');
  const matches = biContent.match(regex);
  if (matches) {
    warnings.push({
      category: "Placeholder Scan",
      issue: `Found ${matches.length} occurrences of '${term}' in enterprise-bi-lessons.ts`
    });
  }
}

// Check every lesson's quiz, options, correctIdx, explanation, notes
slugs.forEach((slug, idx) => {
  // Find block for this slug
  const startIdx = biContent.indexOf(`"${slug}": {`);
  const nextSlug = slugs[idx + 1];
  const endIdx = nextSlug ? biContent.indexOf(`"${nextSlug}": {`) : biContent.length;
  const block = biContent.substring(startIdx, endIdx);

  // Check notes length
  const notesMatch = block.match(/notes:\s*`([\s\S]*?)`,\s*quiz:/);
  if (!notesMatch) {
    defects.push({
      severity: "HIGH",
      category: "Content Structure",
      lesson: slug,
      issue: `Notes template literal could not be cleanly parsed or is malformed.`
    });
  } else {
    const notesText = notesMatch[1];
    if (notesText.length < 500) {
      defects.push({
        severity: "MEDIUM",
        category: "Content Depth",
        lesson: slug,
        issue: `Notes content is suspiciously short (${notesText.length} characters).`
      });
    }

    // Check for essential sections
    if (!notesText.includes("###")) {
      warnings.push({ lesson: slug, issue: "Missing level-3 markdown heading (###)." });
    }
    if (!notesText.includes("####")) {
      warnings.push({ lesson: slug, issue: "Missing level-4 markdown heading (####)." });
    }
    if (!notesText.includes("Guided Exercise") && !notesText.includes("Deliverable") && !notesText.includes("Problem Set")) {
      warnings.push({ lesson: slug, issue: "Missing explicit Guided Exercise or Deliverable section." });
    }
  }

  // Check quiz
  const quizMatch = block.match(/quiz:\s*\{[\s\S]*?question:\s*"([^"]+)",[\s\S]*?options:\s*\[([\s\S]*?)\],[\s\S]*?correctIdx:\s*(\d+),[\s\S]*?explanation:\s*"([^"]+)"/);
  if (!quizMatch) {
    defects.push({
      severity: "CRITICAL",
      category: "Assessment Integrity",
      lesson: slug,
      issue: `Quiz object is malformed or missing required fields.`
    });
  } else {
    const question = quizMatch[1];
    const optionsRaw = quizMatch[2];
    const correctIdx = parseInt(quizMatch[3], 10);
    const explanation = quizMatch[4];

    // Count options
    const options = (optionsRaw.match(/"([^"]+)"/g) || []).map(o => o.replace(/"/g, ''));
    if (options.length < 4) {
      defects.push({
        severity: "MEDIUM",
        category: "Quiz Options",
        lesson: slug,
        issue: `Quiz has only ${options.length} options (standard is 4 options).`
      });
    }
    if (correctIdx < 0 || correctIdx >= options.length) {
      defects.push({
        severity: "CRITICAL",
        category: "Quiz Logic",
        lesson: slug,
        issue: `correctIdx (${correctIdx}) is out of bounds for ${options.length} options.`
      });
    }
    if (explanation.length < 20) {
      warnings.push({ lesson: slug, issue: `Quiz explanation is brief (${explanation.length} chars).` });
    }
  }

  // Check xpReward and duration
  const xpMatch = block.match(/xpReward:\s*(\d+)/);
  const durMatch = block.match(/duration:\s*"([^"]+)"/);
  if (!xpMatch) defects.push({ severity: "LOW", lesson: slug, issue: "Missing xpReward." });
  if (!durMatch) defects.push({ severity: "LOW", lesson: slug, issue: "Missing duration." });
});

// 2. Technical Code Block Audit (SQL, DAX, M)
console.log(`Audited ${slugs.length} lessons for schema, content, and quiz integrity.`);
console.log(`Defects found: ${defects.length}`);
console.log(`Warnings found: ${warnings.length}`);

// Let's print defects
if (defects.length > 0) {
  console.log("\n❌ DEFECTS DETECTED:");
  defects.forEach((d, i) => console.log(`  ${i + 1}. [${d.severity}] ${d.lesson || ''}: ${d.issue}`));
}

if (warnings.length > 0) {
  console.log("\n⚠️ WARNINGS DETECTED:");
  warnings.slice(0, 15).forEach((w, i) => console.log(`  ${i + 1}. ${w.lesson || w.category || ''}: ${w.issue}`));
  if (warnings.length > 15) console.log(`  ... and ${warnings.length - 15} more warnings.`);
}

// 3. Mathematical & SQL Consistency Audit
console.log("\n=== MATHEMATICAL & SQL FORMULA FORENSICS ===");

// Check SQL Starter script vs BI studio presets
const starterSql = fs.readFileSync(path.join(__dirname, '../public/downloads/insyt-bi-capstone-starter.sql'), 'utf8');

// Check operating margin formula in SQL view
if (starterSql.includes("d.base_price - d.cost_per_unit - d.trade_discount")) {
  console.log("  ℹ️ Starter SQL view calculates: Base_Price - Cost_Per_Unit - Trade_Discount.");
  if (starterSql.includes("freight_absorption NUMERIC") && !starterSql.includes("- d.freight_absorption")) {
    defects.push({
      severity: "LOGICAL/MATHEMATICAL",
      category: "P&L Reconciliation",
      issue: "freight_absorption column exists in fmcg_orders_detail table schema, but is omitted from operating margin calculation in vw_commercial_sales_cube."
    });
  }
}

// Check courses.ts for any gaps in other courses
console.log("\n=== PLATFORM-WIDE COURSE CATALOG FORENSICS ===");
const coursesTs = fs.readFileSync(path.join(__dirname, '../lib/data/courses.ts'), 'utf8');

// Check MTO recruitment course
if (coursesTs.includes("mto-recruitment-mastery")) {
  const mtoBlock = coursesTs.substring(coursesTs.indexOf("slug: \"mto-recruitment-mastery\""));
  const mtoLessons = (mtoBlock.match(/slug:\s*"([a-z0-9-]+)"/g) || []).map(s => s.replace(/slug:\s*"/, '').replace('"', ''));
  console.log(`  MTO Course has ${mtoLessons.length - 1} lessons listed in courses.ts`);
}

fs.writeFileSync(path.join(__dirname, 'stress-test-results.json'), JSON.stringify({ defects, warnings }, null, 2));
console.log("\nFull forensic output written to scripts/stress-test-results.json");
