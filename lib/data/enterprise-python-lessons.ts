import { LessonDetail } from "./lessons";

export const ENTERPRISE_PYTHON_LESSONS: Record<string, LessonDetail> = {
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: Python Foundations for Business Data
  // ═══════════════════════════════════════════════════════════════
  "py-1-1-corporate-productivity": {
    slug: "py-1-1-corporate-productivity",
    title: "1.1 Python as a Corporate Productivity Tool",
    xpReward: 60,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Python as a Corporate Productivity Tool

#### Workplace Problem
In corporate environments (such as FMCG supply chains, commercial banks, and conglomerates), analysts spend 15 to 20 hours each week repeating identical spreadsheet operations: copying data from ERP downloads, stripping whitespace, fixing broken date formats, and emailing consolidated summaries. When file schemas change or volumes exceed 200,000 rows, Excel slows down or crashes silently. Python transforms this manual chore into an audited, deterministic 5-second script.

#### Measurable Objectives
1. Explain the operational difference between manual spreadsheet manipulation and reproducible programmatic workflows.
2. Set up a modern Python 3.12+ execution environment using virtual environments (\`venv\`) and VS Code.
3. Construct an end-to-end input-processing-validation-output script that automates a daily invoice audit.

#### Corporate Scenario: Unilever Bangladesh Distributor Invoice Check
Every morning at 08:30 AM, regional sales managers receive an unformatted transaction dump from 32 distributor depots across Chittagong, Dhaka, and Sylhet. If invoices contain missing tax IDs or negative net amounts, finance must quarantine them before ERP posting.

\`\`\`python
# File: daily_invoice_audit.py
"""
Daily Distributor Invoice Audit
Validates raw ERP batch dumps before clearing distributor accounts.
"""

def audit_invoice_record(invoice_id: str, amount_bdt: float, tax_registered: bool) -> dict:
    status = "CLEARED"
    rejection_reason = None
    
    if amount_bdt <= 0:
        status = "REJECTED"
        rejection_reason = "Non-positive invoice amount"
    elif not tax_registered and amount_bdt > 50_000:
        status = "FLAGGED_FOR_AUDIT"
        rejection_reason = "Unregistered vendor exceeding BDT 50,000 withholding threshold"
        
    return {
        "invoice_id": invoice_id,
        "amount_bdt": amount_bdt,
        "status": status,
        "reason": rejection_reason
    }

# Batch test
raw_invoices = [
    ("INV-2026-001", 124500.00, True),
    ("INV-2026-002", -540.00, True),
    ("INV-2026-003", 87000.00, False),
    ("INV-2026-004", 12500.00, False),
]

audit_results = [audit_invoice_record(inv, amt, tax) for inv, amt, tax in raw_invoices]

for result in audit_results:
    print(f"[{result['status']}] {result['invoice_id']}: ৳{result['amount_bdt']:,.2f} -> {result['reason'] or 'OK'}")
\`\`\`

#### Expected Output
\`\`\`text
[CLEARED] INV-2026-001: ৳124,500.00 -> OK
[REJECTED] INV-2026-002: ৳-540.00 -> Non-positive invoice amount
[FLAGGED_FOR_AUDIT] INV-2026-003: ৳87,000.00 -> Unregistered vendor exceeding BDT 50,000 withholding threshold
[CLEARED] INV-2026-004: ৳12,500.00 -> OK
\`\`\`

#### Common Mistakes & Debugging
* **Running global pip:** Installing dependencies globally without a virtual environment (\`python -m venv .venv\`) creates package collision headaches between different client projects.
* **Hardcoded Absolute Paths:** Using \`C:\\Users\\john\\Desktop\\data.csv\` breaks when running on a colleague's laptop or scheduled task runner. Always use relative paths with \`pathlib\`.

#### Practice Task
Modify the audit function to flag any invoice exceeding BDT 500,000 as requiring "CFO_DIRECT_SIGN_OFF", regardless of tax registration status.`,
    quiz: {
      question: "Why is a reproducible Python script preferred over manual Excel VLOOKUP and copy-paste routines in corporate audit workflows?",
      options: [
        "Python automatically increases computer screen brightness",
        "Python workflows provide deterministic audit trails, handle large row volumes without crashing, and execute identically every time without human error",
        "Excel has been completely discontinued by corporate enterprises",
        "Python scripts do not require any input data files"
      ],
      correctIdx: 1,
      explanation: "Deterministic code execution guarantees that business rules are applied consistently without copy-paste mistakes, cell corruption, or formula drag errors."
    },
    hasSimulator: "python-analytics"
  },

  "py-1-2-types-collections": {
    slug: "py-1-2-types-collections",
    title: "1.2 Types, Collections, and Transaction Records",
    xpReward: 65,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Types, Collections, and Transaction Records

#### Workplace Problem
Corporate ERP feeds export raw data as text strings, leading zeros in bank accounts (\`"004128510"\`) get converted to numbers and corrupted (\`4128510\`) by Excel, and duplicate vendor IDs create payment double-counts. Analysts must understand Python primitive types (\`str\`, \`int\`, \`float\`, \`bool\`) and data structures (\`list\`, \`dict\`, \`set\`, \`tuple\`) to represent business records safely.

#### Measurable Objectives
1. Prevent silent truncation of corporate identifiers like routing codes, tax identification numbers (TIN), and bank account numbers.
2. Represent multi-attribute transaction batches as structured dictionaries.
3. Use sets to perform instant O(1) deduplication and set difference reconciliations.

#### Corporate Scenario: Square Pharmaceuticals Vendor Payment Batch
An Accounts Payable clerk prepares a batch payout for packaging material suppliers. Three duplicate bills were submitted accidentally by depot dispatchers.

\`\`\`python
# Vendor payment reconciliation
batch_records = [
    {"ref": "TXN-901", "vendor": "Apex Packaging Ltd", "account": "0024881029", "bdt": 450000.0},
    {"ref": "TXN-902", "vendor": "Meghna Paper Mill", "account": "0011928374", "bdt": 182000.0},
    {"ref": "TXN-901", "vendor": "Apex Packaging Ltd", "account": "0024881029", "bdt": 450000.0}, # Duplicate!
    {"ref": "TXN-903", "vendor": "Karnaphuli Cartons", "account": "0099482711", "bdt": 95000.0},
]

seen_refs = set()
unique_payouts = []
duplicate_payouts = []

for txn in batch_records:
    ref_id = txn["ref"]
    if ref_id in seen_refs:
        duplicate_payouts.append(txn)
    else:
        seen_refs.add(ref_id)
        unique_payouts.append(txn)

total_cleared_bdt = sum(t["bdt"] for t in unique_payouts)
print(f"Total Unique Payouts: {len(unique_payouts)} records, Total BDT: ৳{total_cleared_bdt:,.2f}")
print(f"Duplicates Intercepted: {len(duplicate_payouts)} records (Saved: ৳{sum(t['bdt'] for t in duplicate_payouts):,.2f})")
\`\`\`

#### Expected Output
\`\`\`text
Total Unique Payouts: 3 records, Total BDT: ৳727,000.00
Duplicates Intercepted: 1 records (Saved: ৳450,000.00)
\`\`\`

#### Common Mistakes
* **Treating Account Numbers as Integers:** Writing \`int("0024881029")\` yields \`24881029\`, permanently destroying the leading zeros required by Bangladesh Bank BEFTN/RTGS clearing networks.
* **Modifying a List While Iterating:** Deleting elements from a list while looping over it causes skipped records. Always create a new filtered list or use comprehensions.`,
    quiz: {
      question: "Why should bank account numbers, tax IDs, and national ID numbers always be stored as string (`str`) rather than integer (`int`) in Python?",
      options: [
        "Integers take up more memory than strings in Python 3",
        "Strings preserve critical leading zeros and prevent silent arithmetic alteration during bank clearing",
        "Python cannot perform comparisons between integers",
        "Banks only accept lowercase letters in their APIs"
      ],
      correctIdx: 1,
      explanation: "Numeric conversion strips leading zeros (e.g., '0041' becomes 41). Keeping IDs as strings preserves formatting and guarantees accurate electronic fund routing."
    },
    hasSimulator: "python-analytics"
  },

  "py-1-3-cleaning-text": {
    slug: "py-1-3-cleaning-text",
    title: "1.3 Cleaning Inconsistent Business Text",
    xpReward: 65,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Cleaning Inconsistent Business Text

#### Workplace Problem
Human-entered data contains trailing spaces (\`"PRAN Foods   "\`), inconsistent capitalizations (\`"pran foods"\`, \`"PRAN FOODS LTD."\`), and messy punctuation. When analysts attempt to join ERP sales with warehouse inventory, these string discrepancies cause lookups to fail silently or generate phantom zero balances.

#### Measurable Objectives
1. Master whitespace stripping with \`.strip()\`, \`.lstrip()\`, and \`.rstrip()\`.
2. Standardize casing using \`.upper()\`, \`.lower()\`, and \`.title()\`.
3. Apply regular expressions (\`re\` module) to extract invoice dates, PO numbers, and currency values from unstructured remarks.

#### Corporate Scenario: Biman Bangladesh Procurement Remarks
A procurement extract contains messy notes where PO numbers and amounts are buried inside human-typed strings.

\`\`\`python
import re

raw_remarks = [
    "  Vendor: AKIJ MOTORS LTD. ; PO ref: PO-88412 ; Paid: BDT 450,000  ",
    "Vendor: akij motors ; po ref: PO-88419 ; paid: 120000/=",
    "Vendor:  Akij Motors Ltd ; PO# PO-88430 ; Paid: Tk 85,000.50 ",
]

cleaned_records = []
for entry in raw_remarks:
    # 1. Normalize vendor name
    vendor_match = re.search(r"Vendor:\s*([^;]+)", entry, re.IGNORECASE)
    raw_vendor = vendor_match.group(1).strip() if vendor_match else "UNKNOWN"
    
    # Strip corporate suffixes for grouping
    normalized_vendor = re.sub(r"(?i)\s+ltd\.?$", "", raw_vendor).title()
    
    # 2. Extract PO Number
    po_match = re.search(r"PO[-#\s]*ref:?\s*([A-Z0-9-]+)", entry, re.IGNORECASE)
    po_num = po_match.group(1).upper() if po_match else "N/A"
    
    # 3. Extract Amount
    amt_match = re.search(r"(?:BDT|Tk|Paid:)\s*([0-9,]+(?:\.[0-9]{2})?)", entry, re.IGNORECASE)
    amt_str = amt_match.group(1).replace(",", "") if amt_match else "0"
    amt_float = float(amt_str)
    
    cleaned_records.append({
        "vendor": normalized_vendor,
        "po_number": po_num,
        "amount_bdt": amt_float
    })

for rec in cleaned_records:
    print(f"Vendor: {rec['vendor']:<15} | PO: {rec['po_number']:<10} | ৳{rec['amount_bdt']:>10,.2f}")
\`\`\`

#### Expected Output
\`\`\`text
Vendor: Akij Motors     | PO: PO-88412   | ৳450,000.00
Vendor: Akij Motors     | PO: PO-88419   | ৳120,000.00
Vendor: Akij Motors     | PO: PO-88430   | ৳ 85,000.50
\`\`\`

#### Debugging Exercise
If an analyst executes \`amount = float("1,45,000/=".replace("/=", ""))\`, Python raises a \`ValueError: could not convert string to float: '1,45,000'\` because commas must also be stripped via \`.replace(",", "")\` prior to numeric cast.`,
    quiz: {
      question: "Which Python method safely removes invisible leading and trailing whitespace tabs or newlines from user input text?",
      options: [
        ".cut()",
        ".strip()",
        ".delete_spaces()",
        ".sanitize()"
      ],
      correctIdx: 1,
      explanation: "The `.strip()` string method removes whitespace characters (spaces, tabs '\\t', newlines '\\n') from both ends of a string."
    },
    hasSimulator: "python-analytics"
  },

  "py-1-4-mapping-validation": {
    slug: "py-1-4-mapping-validation",
    title: "1.4 Dictionary Mapping and Payment Validation",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Dictionary Mapping and Payment Validation

#### Workplace Problem
When integrating legacy billing records with ERP general ledgers, subsidiary codes (e.g., \`"DHK-01"\`, \`"CTG-04"\`) must be mapped to corporate cost center codes. In Excel, a broken \`VLOOKUP\` creates \`#N/A\` that breaks downstream sum calculations. In Python, dictionary lookup mappings with fallback defaults or strict validation prevent silent ledger corruption.

#### Measurable Objectives
1. Build dictionary lookup tables with O(1) retrieval performance.
2. Apply \`.get(key, default)\` to handle missing mapping keys gracefully.
3. Generate reconciliation audit statistics comparing total input records with mapped and unmapped totals.

#### Corporate Lab: Raw Vendor Payments Validation
Normalize \`raw_vendor_payments.txt\` containing inconsistent delimiters and missing bank branch routing codes.

\`\`\`python
# Cost center dictionary lookup
BRANCH_ROUTING_MAP = {
    "DHK-MAIN": {"code": "010271101", "name": "Dhaka Main Principal Branch"},
    "CTG-AGR":  {"code": "020150992", "name": "Agrabad Commercial Branch, Chittagong"},
    "SYL-ZIN":  {"code": "030192844", "name": "Zindabazar Branch, Sylhet"},
    "RAJ-SHA":  {"code": "040182733", "name": "Shaheb Bazar Branch, Rajshahi"},
}

incoming_transactions = [
    {"txn_id": "TXN-101", "branch_alias": "DHK-MAIN", "amount": 250000.0},
    {"txn_id": "TXN-102", "branch_alias": "CTG-AGR",  "amount": 180000.0},
    {"txn_id": "TXN-103", "branch_alias": "UNKNOWN-01", "amount": 95000.0}, # Missing mapping!
    {"txn_id": "TXN-104", "branch_alias": "SYL-ZIN",  "amount": 320000.0},
]

valid_disbursements = []
quarantined_items = []

for item in incoming_transactions:
    alias = item["branch_alias"]
    routing = BRANCH_ROUTING_MAP.get(alias)
    
    if routing:
        item["routing_code"] = routing["code"]
        item["branch_name"] = routing["name"]
        valid_disbursements.append(item)
    else:
        item["error"] = f"Unmapped Branch Alias '{alias}'"
        quarantined_items.append(item)

print(f"Validated Payouts: {len(valid_disbursements)} (BDT {sum(x['amount'] for x in valid_disbursements):,.2f})")
print(f"Quarantined Records: {len(quarantined_items)} (BDT {sum(x['amount'] for x in quarantined_items):,.2f})")
\`\`\`

#### Expected Output
\`\`\`text
Validated Payouts: 3 (BDT 750,000.00)
Quarantined Records: 1 (BDT 95,000.00)
\`\`\`

#### Module 1 Deliverable
Create a Python script that ingests \`raw_vendor_payments.txt\`, validates branch codes, normalizes vendor strings, and outputs a clean CSV of cleared payments alongside an audit log of rejected records with control totals.`,
    quiz: {
      question: "What is the primary advantage of `dict.get(key, default)` over direct indexing `dict[key]` when performing code lookups?",
      options: [
        "It runs 100 times faster in CPU benchmarks",
        "It prevents unhandled KeyError exceptions by returning a designated default value or None if the key does not exist",
        "It automatically adds the missing key to the dictionary",
        "It encrypts the dictionary values in memory"
      ],
      correctIdx: 1,
      explanation: "Direct indexing `dict[key]` raises a KeyError if the key is missing, crashing your pipeline. `.get()` allows defensive error trapping."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: File Systems, Functions & Error Handling
  // ═══════════════════════════════════════════════════════════════
  "py-2-1-paths-pathlib": {
    slug: "py-2-1-paths-pathlib",
    title: "2.1 Corporate File Systems and Reliable Paths",
    duration: "60m",
    xpReward: 70,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Corporate File Systems and Reliable Paths

#### Workplace Problem
Analysts often write Python scripts using Windows backslash paths like \`"C:\\Users\\Finance\\data.csv"\`. When shared with teammates using macOS or uploaded to a Linux server or Docker container, backslashes trigger escape sequence syntax errors (e.g. \`\\U\` or \`\\t\`). The modern standard is Python's \`pathlib.Path\`.

#### Measurable Objectives
1. Build cross-platform filesystem paths using \`pathlib.Path\`.
2. Determine script anchor directories dynamically using \`Path(__file__).resolve().parent\`.
3. Check for file and folder existence before initiating processing.

#### Code Example
\`\`\`python
from pathlib import Path

# Resolve base project directory dynamically
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
OUTPUT_DIR = BASE_DIR / "reports"

# Ensure output directory exists
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

target_file = DATA_DIR / "quarterly_sales.csv"

if not target_file.exists():
    raise FileNotFoundError(f"Missing mandatory input file: {target_file.name} in {DATA_DIR}")

print(f"Input file verified: {target_file.stat().st_size} bytes")
\`\`\`

#### Key Takeaways
Always construct paths using the \`/\` operator on \`Path\` objects. It automatically translates to Windows \`\\\` or POSIX \`/\` depending on the host OS.`,
    quiz: {
      question: "Which standard library module is the modern best practice for cross-platform filesystem paths in Python 3.12+?",
      options: ["os.path", "pathlib", "sys.filesystem", "filelib"],
      correctIdx: 1,
      explanation: "pathlib provides an object-oriented, clean, cross-platform interface that replaces legacy string-based os.path operations."
    },
    hasSimulator: "python-analytics"
  },

  "py-2-2-file-discovery": {
    slug: "py-2-2-file-discovery",
    title: "2.2 Discovering and Consolidating Business Files",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Discovering and Consolidating Business Files

#### Workplace Problem
In large corporations, monthly sales reports are stored inside deeply nested folder hierarchies: \`2025/Q1/Dhaka/January_Sales.csv\`. Manually clicking through dozens of folders is slow and error-prone. Using \`Path.glob()\` or \`Path.rglob()\`, Python can discover hundreds of files in milliseconds.

#### Measurable Objectives
1. Use \`.glob()\` and \`.rglob()\` with pattern matching (e.g. \`"**/*_sales.csv"\`).
2. Filter files by naming patterns, date stamps, and extensions.
3. Validate that expected files from all expected periods/depots are present.

#### Code Walkthrough
\`\`\`python
from pathlib import Path

DATA_ROOT = Path("data/distributor_reports")
expected_quarters = {"Q1", "Q2", "Q3", "Q4"}

# Recursive discovery of all CSV files
discovered_files = list(DATA_ROOT.rglob("*.csv"))
print(f"Discovered {len(discovered_files)} CSV files across all regional folders.")

# Parse metadata from path structure: .../Region/Quarter/file.csv
file_inventory = []
for p in discovered_files:
    file_inventory.append({
        "path": p,
        "region": p.parent.parent.name,
        "quarter": p.parent.name,
        "filename": p.name,
        "size_kb": round(p.stat().st_size / 1024, 2)
    })

print(f"Sample discovered file: {file_inventory[0] if file_inventory else 'None'}")
\`\`\`

#### Independent Task
Write a script that scans a folder containing 48 quarterly files, generates a completeness report listing any missing quarters by region, and alerts management if any file size is 0 bytes.`,
    quiz: {
      question: "What is the difference between Path.glob('*.csv') and Path.rglob('*.csv')?",
      options: [
        "glob only works on Windows while rglob works on Linux",
        "glob searches only the immediate directory, while rglob searches recursively through all subdirectories",
        "rglob only finds read-only files",
        "glob is deprecated in Python 3.12"
      ],
      correctIdx: 1,
      explanation: "rglob ('recursive glob') recursively searches through all subdirectories and child folders, whereas glob only scans the specified directory level."
    },
    hasSimulator: "python-analytics"
  },

  "py-2-3-functions-documentation": {
    slug: "py-2-3-functions-documentation",
    title: "2.3 Functions, Documentation, and Reusable Logic",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Functions, Documentation, and Reusable Logic

#### Workplace Problem
Scripts written as a single 300-line continuous file are impossible to maintain, debug, or hand off to colleagues. Breaking data transformations into single-responsibility functions with type hints and docstrings enables testing and reuse across company reporting pipelines.

#### Measurable Objectives
1. Define functions with explicit type hints (\`int\`, \`float\`, \`str\`, \`list[dict]\`).
2. Write standardized Google/Sphinx style docstrings detailing parameters and return values.
3. Decouple input ingestion, business logic computation, and file saving into distinct functions.

#### Code Architecture
\`\`\`python
def calculate_distributor_incentive(
    achieved_sales_bdt: float,
    target_sales_bdt: float,
    collection_days: int
) -> tuple[float, float, str]:
    """Calculate commercial tier incentive and bonus multiplier.

    Parameters:
        achieved_sales_bdt (float): Actual net revenue delivered in BDT.
        target_sales_bdt (float): Monthly agreed sales quota in BDT.
        collection_days (int): Accounts receivable DSO collection velocity.

    Returns:
        tuple[float, float, str]:
            - payout_bdt (float): Final calculated incentive payment.
            - achievement_pct (float): Achievement percentage against quota.
            - tier_status (str): Tier rating ('GOLD', 'SILVER', 'INELIGIBLE').
    """
    if target_sales_bdt <= 0:
        raise ValueError("Target quota must be strictly positive.")

    achievement_pct = round((achieved_sales_bdt / target_sales_bdt) * 100, 2)
    
    if achievement_pct >= 110 and collection_days <= 30:
        tier = "GOLD"
        rate = 0.035 # 3.5% incentive
    elif achievement_pct >= 100:
        tier = "SILVER"
        rate = 0.020 # 2.0% incentive
    else:
        tier = "INELIGIBLE"
        rate = 0.0

    payout_bdt = round(achieved_sales_bdt * rate, 2)
    return payout_bdt, achievement_pct, tier
\`\`\`

#### Code Walkthrough
Type hints prevent subtle type errors (like passing string \`"100"\` instead of number \`100\`), while clear docstrings ensure any analyst inheriting your project understands parameter assumptions immediately.`,
    quiz: {
      question: "Why should corporate data processing scripts be organized into modular, single-responsibility functions?",
      options: [
        "Because Python requires every script to have at least 10 functions to compile",
        "Functions allow individual transformation steps to be tested, documented, reused, and audited without duplicating code",
        "Functions automatically increase execution speed by 500%",
        "It prevents Excel from opening the script"
      ],
      correctIdx: 1,
      explanation: "Modular functions isolate business logic, making scripts easier to maintain, unit-test, and update when corporate policies change."
    },
    hasSimulator: "python-analytics"
  },

  "py-2-4-defensive-processing": {
    slug: "py-2-4-defensive-processing",
    title: "2.4 Defensive File Processing",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Defensive File Processing

#### Workplace Problem
If a script processing 100 regional files crashes on file #47 due to an unexpected empty line or corrupted encoding, the entire pipeline stops. Analysts either catch every exception broadly (which hides severe bugs) or let the script fail catastrophically. Defensive file processing catches predictable exceptions, logs errors, and quarantines bad files while continuing the batch.

#### Measurable Objectives
1. Implement \`try / except / finally\` blocks targeting specific exceptions (\`FileNotFoundError\`, \`PermissionError\`, \`UnicodeDecodeError\`, \`ValueError\`).
2. Move processed files to an \`archive/\` directory and corrupt files to \`quarantine/\`.
3. Generate execution summary reports documenting success vs failure rates.

\`\`\`python
from pathlib import Path
import csv

def process_single_csv(file_path: Path) -> dict:
    valid_rows = []
    try:
        with open(file_path, mode="r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row_num, row in enumerate(reader, start=1):
                try:
                    amount = float(row["Amount"].replace(",", ""))
                    valid_rows.append({"row": row_num, "amount": amount})
                except (ValueError, KeyError) as e:
                    print(f"Row {row_num} in {file_path.name} skipped: {e}")
                    
        return {"status": "SUCCESS", "rows_processed": len(valid_rows), "file": file_path.name}
    except UnicodeDecodeError:
        return {"status": "CORRUPT_ENCODING", "error": "Not UTF-8/ANSI", "file": file_path.name}
    except PermissionError:
        return {"status": "LOCKED", "error": "File open in another application", "file": file_path.name}
\`\`\`

#### Module 2 Lab
Build a directory scanner that discovers 48 quarterly CSV files across nested depot folders, processes valid records, logs file locks and corrupt encodings, and archives processed files cleanly.`,
    quiz: {
      question: "Why is catching broad exceptions like `except Exception:` discouraged in corporate batch scripts without proper logging?",
      options: [
        "It slows down computer processor clock cycles",
        "It silently masks critical bugs like system exit signals, typing errors, or permission failures, preventing accurate diagnosis",
        "Python 3.12 syntax prohibits except Exception",
        "It deletes the input data file automatically"
      ],
      correctIdx: 1,
      explanation: "Catching broad exceptions without logging masks genuine programmer bugs, file permission errors, and syntax defects, creating a false impression of success."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: Tabular Data Mastery with pandas
  // ═══════════════════════════════════════════════════════════════
  "py-3-1-inspecting-files": {
    slug: "py-3-1-inspecting-files",
    title: "3.1 Inspecting Messy Corporate Files",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Inspecting Messy Corporate Files

#### Workplace Problem
Real corporate spreadsheets almost never start on cell A1. They feature 4 rows of title banners (\`"CONFIDENTIAL - MANAGEMENT REPORT"\`), merged cells, irregular blank lines, and trailing totals. Calling \`pd.read_excel('report.xlsx')\` naively imports header banners as data rows and breaks every column name.

#### Measurable Objectives
1. Use \`skiprows\`, \`header\`, \`usecols\`, and \`sheet_name\` in \`pd.read_excel\` and \`pd.read_csv\`.
2. Inspect DataFrame architecture with \`.info()\`, \`.shape\`, \`.dtypes\`, and \`.head()\`.
3. Detect irregular encoding (\`utf-8\`, \`utf-8-sig\`, \`latin1\`, \`cp1252\`).

#### Code Walkthrough
\`\`\`python
import pandas as pd

# Inspect a corporate sheet that starts at row 5 with merged title banners
df_raw = pd.read_excel(
    "workforce_master.xlsx",
    sheet_name="Active_Headcount",
    skiprows=4,              # Skip first 4 rows of executive banners
    usecols="B:H",           # Read only populated columns
    engine="openpyxl"
)

print(f"Dataset Dimensions: {df_raw.shape[0]} rows x {df_raw.shape[1]} columns")
print("\n--- Column Types & Missingness ---")
df_raw.info()
\`\`\`

#### Key Takeaway
Always inspect the raw shape and column names before applying transformations. Never assume an ERP export matches the standard schema without programmatically verifying column presence.`,
    quiz: {
      question: "Which parameter in pd.read_excel allows you to bypass metadata headers, executive banners, and merged title rows at the top of a spreadsheet?",
      options: ["bypass_top", "skiprows", "drop_headers", "ignore_banner"],
      correctIdx: 1,
      explanation: "The `skiprows` parameter specifies the number of rows to skip at the top of the file before reading headers and table data."
    },
    hasSimulator: "python-analytics"
  },

  "py-3-2-types-dates-nulls": {
    slug: "py-3-2-types-dates-nulls",
    title: "3.2 Data Types, Dates, and Missing Values",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Data Types, Dates, and Missing Values

#### Workplace Problem
Corporate datasets frequently feature mixed date representations: \`"2026/03/15"\`, \`"15-Mar-2026"\`, \`"03/15/26"\`. Additionally, currency columns frequently contain commas and symbols (\`"৳ 1,45,000 /="\`), causing pandas to assign them the \`object\` (string) type. Numeric aggregations then silently fail or concatenate strings instead of summing.

#### Measurable Objectives
1. Convert strings to numeric data types using \`pd.to_numeric()\` with \`errors='coerce'\`.
2. Parse multi-format dates with \`pd.to_datetime(..., format='mixed')\`.
3. Handle missing values appropriately (\`.isna()\`, \`.fillna()\`, \`.dropna()\`) without corrupting totals.

#### Corporate Code Walkthrough
\`\`\`python
import pandas as pd
import numpy as np

data = {
    "emp_id": ["E-101", "E-102", "E-103", "E-104"],
    "join_date": ["2026-01-15", "15/02/2026", "2026.03.01", None],
    "raw_salary": ["৳ 125,000", "85000", "N/A", "1,10,000 /="],
    "division": ["Dhaka", "Chittagong", None, "Dhaka"]
}

df = pd.DataFrame(data)

# 1. Clean and convert salary to numeric float
df["salary_bdt"] = (
    df["raw_salary"]
    .astype(str)
    .str.replace(r"[^\d.]", "", regex=True)
)
df["salary_bdt"] = pd.to_numeric(df["salary_bdt"], errors="coerce")

# 2. Standardize dates
df["clean_join_date"] = pd.to_datetime(df["join_date"], format="mixed", errors="coerce")

# 3. Explicit imputation strategy
df["division"] = df["division"].fillna("Unassigned")

print(df[["emp_id", "salary_bdt", "clean_join_date", "division"]])
\`\`\`

#### Control Total Reconciliation
Always verify that \`df['salary_bdt'].sum()\` accounts for every non-null record before and after type transformation.`,
    quiz: {
      question: "When converting dirty currency strings with pd.to_numeric, what does setting errors='coerce' do when encountering invalid text?",
      options: [
        "Raises an unrecoverable ValueError",
        "Converts invalid entries to NaN (Not a Number) without crashing",
        "Converts invalid entries to zero automatically",
        "Deletes the entire column"
      ],
      correctIdx: 1,
      explanation: "Setting `errors='coerce'` converts unparseable strings into `NaN`, allowing you to inspect, count, and handle exceptions cleanly."
    },
    hasSimulator: "python-analytics"
  },

  "py-3-3-cleaning-integrity": {
    slug: "py-3-3-cleaning-integrity",
    title: "3.3 Data Cleaning Without Corrupting Totals",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Data Cleaning Without Corrupting Totals

#### Workplace Problem
Analysts often drop missing rows using \`df.dropna()\` indiscriminately. If a column with 10% missing entries is dropped without review, the total reported revenue decreases by millions of BDT, producing inaccurate management reporting. Corporate data engineering requires control totals: reconciling total row counts and currency sums before and after cleaning.

#### Measurable Objectives
1. Implement programmatic assertion tests on financial control totals.
2. Track row attrition at every transformation stage with an audit dataframe.
3. Validate schema constraints (unique keys, non-null mandatory fields, numeric bounds).

#### Code Example
\`\`\`python
import pandas as pd

def clean_payroll_batch(df_raw: pd.DataFrame) -> tuple[pd.DataFrame, dict]:
    pre_count = len(df_raw)
    pre_sum = df_raw["gross_pay"].sum()
    
    # 1. Filter out zero/negative salaries
    valid_mask = (df_raw["gross_pay"] > 0) & (df_raw["employee_id"].notna())
    df_clean = df_raw[valid_mask].copy()
    
    post_count = len(df_clean)
    post_sum = df_clean["gross_pay"].sum()
    
    reconciliation = {
        "pre_records": pre_count,
        "post_records": post_count,
        "dropped_records": pre_count - post_count,
        "pre_total_bdt": pre_sum,
        "post_total_bdt": post_sum,
        "variance_bdt": pre_sum - post_sum,
    }
    
    return df_clean, reconciliation
\`\`\`

#### Key Takeaway
Never deliver a cleaned dataset without an accompanying reconciliation audit statement detailing every dropped row and dollar variance.`,
    quiz: {
      question: "What is a 'control total' in corporate data engineering?",
      options: [
        "The total size of the Python script in megabytes",
        "A benchmark sum (e.g. Total Revenue or Gross Payroll) computed before and after transformations to mathematically prove no records were silently lost or doubled",
        "The total number of CPUs running the script",
        "A password used to encrypt Excel files"
      ],
      correctIdx: 1,
      explanation: "A control total proves data integrity by comparing key financial totals before and after pipeline transformations to verify zero unintended loss."
    },
    hasSimulator: "python-analytics"
  },

  "py-3-4-cleaning-pipeline": {
    slug: "py-3-4-cleaning-pipeline",
    title: "3.4 A Repeatable Data-Cleaning Pipeline",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### A Repeatable Data-Cleaning Pipeline

#### Workplace Problem
Analysts often clean files by typing commands interactively into a Jupyter notebook cell-by-cell. When the next month's report arrives with slightly different formatting, the notebook cannot be rerun smoothly. A corporate data-cleaning pipeline must be structured as a reusable Python class or chain of pure functions that takes raw files, validates schemas, cleans data, and exports production deliverables.

#### Measurable Objectives
1. Structure data transformations using method chaining or modular functional pipelines.
2. Generate automated validation logs and quarantine exception files.
3. Export cleaned deliverables to standard formats (\`.csv\`, \`.parquet\`, \`.xlsx\`).

#### Module 3 Lab: Workforce Master Cleaning
Normalize \`workforce_master.xlsx\` containing irregular headers, title banners, mixed date formats, and negative salaries. Generate a clean dataset along with a comprehensive audit report detailing rejected records and reconciled totals.`,
    quiz: {
      question: "Why should data cleaning pipelines be automated in production scripts rather than performed manually in spreadsheets each month?",
      options: [
        "To eliminate human error, guarantee repeatable auditability, and reduce multi-hour manual processing to seconds",
        "Because manual spreadsheets take up more internet bandwidth",
        "Because Python doesn't require hard drive space",
        "To prevent other departments from seeing company data"
      ],
      correctIdx: 0,
      explanation: "Automated pipelines execute identical logic every month, eliminating copy-paste errors, formula mistakes, and hours of repetitive manual toil."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: Relational Merges, Grouping & Reshaping
  // ═══════════════════════════════════════════════════════════════
  "py-4-1-relational-joins": {
    slug: "py-4-1-relational-joins",
    title: "4.1 Joins and Business Relationships",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Joins and Business Relationships

#### Workplace Problem
In enterprise reporting, data rarely lives in one table. Invoices must be joined with customer master tables, product price books, and regional discount matrices. In Excel, multi-column \`XLOOKUP\` or \`INDEX/MATCH\` across 200,000 rows freezes the computer. In pandas, relational merges execute in fractions of a second using \`pd.merge()\`.

#### Measurable Objectives
1. Understand the 4 core relational join types: \`inner\`, \`left\`, \`right\`, and \`outer\`.
2. Map foreign key relationships across transaction and dimension tables.
3. Use \`indicator=True\` to audit merge completeness.

#### Code Example
\`\`\`python
import pandas as pd

invoices = pd.DataFrame({
    "inv_id": ["INV-01", "INV-02", "INV-03"],
    "customer_code": ["CUST-10", "CUST-20", "CUST-99"], # CUST-99 is an orphan key!
    "amount_bdt": [50000, 75000, 32000]
})

customers = pd.DataFrame({
    "customer_code": ["CUST-10", "CUST-20", "CUST-30"],
    "customer_name": ["Apex Footwear", "Square Pharma", "Beximco Ltd"],
    "tier": ["Platinum", "Gold", "Silver"]
})

# Left join with merge indicator
merged = pd.merge(
    invoices,
    customers,
    on="customer_code",
    how="left",
    indicator=True
)

print(merged[["inv_id", "customer_code", "customer_name", "amount_bdt", "_merge"]])
\`\`\`

#### Expected Output
\`\`\`text
   inv_id customer_code  customer_name  amount_bdt      _merge
0  INV-01       CUST-10  Apex Footwear       50000        both
1  INV-02       CUST-20  Square Pharma       75000        both
2  INV-03       CUST-99            NaN       32000   left_only
\`\`\`

#### Key Takeaway
Orphan keys (\`left_only\`) reveal transactions that reference missing customer or product master records. Always inspect the merge indicator to identify broken master data.`,
    quiz: {
      question: "What does setting indicator=True in pd.merge() provide to the analyst?",
      options: [
        "It colors the dataframe rows green and red",
        "It adds a special '_merge' column showing whether each record came from 'both', 'left_only', or 'right_only'",
        "It automatically deletes unmapped rows",
        "It computes the total sum of all columns"
      ],
      correctIdx: 1,
      explanation: "The `_merge` indicator column explicitly flags whether each record matched in both tables or was orphan in left/right, enabling robust join audits."
    },
    hasSimulator: "python-analytics"
  },

  "py-4-2-keys-multiplication": {
    slug: "py-4-2-keys-multiplication",
    title: "4.2 Detecting Broken Keys and Merge Multiplication",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Detecting Broken Keys and Merge Multiplication

#### Workplace Problem
The most dangerous error in relational joins is **Cartesian row multiplication**. If a dimension table contains duplicate keys (e.g., two entries for \`"PROD-01"\` due to differing packaging dates), a \`left\` join on that key duplicates the invoice line, silently doubling the recorded revenue!

#### Measurable Objectives
1. Check join key uniqueness prior to merging using \`df['key'].is_unique\`.
2. Compare before-and-after row counts to verify no unwanted expansion occurred.
3. Use \`validate='one_to_many'\` or \`validate='many_to_one'\` in \`pd.merge()\`.

\`\`\`python
import pandas as pd

# Check for duplicate join keys
if not products["product_code"].is_unique:
    dup_keys = products[products["product_code"].duplicated(keep=False)]
    raise ValueError(f"CRITICAL: Duplicate keys detected in product dimension:\n{dup_keys}")

# Safe merge with validation parameter
df_joined = pd.merge(
    invoices,
    products,
    on="product_code",
    how="left",
    validate="many_to_one" # Asserts right table has unique keys!
)
\`\`\`

If \`validate="many_to_one"\` encounters duplicate keys in the right table, pandas immediately raises a \`MergeError\`, preventing corrupted financial figures.`,
    quiz: {
      question: "What happens when you use validate='many_to_one' in pd.merge() and the right table contains duplicate keys?",
      options: [
        "pandas silently deletes the duplicates",
        "pandas raises a MergeError immediately, stopping execution before financial figures get corrupted",
        "pandas converts all numbers to strings",
        "The computer shuts down"
      ],
      correctIdx: 1,
      explanation: "Using validate='many_to_one' enforces strict relational integrity and throws a MergeError if the right table contains duplicate keys."
    },
    hasSimulator: "python-analytics"
  },

  "py-4-3-grouped-analysis": {
    slug: "py-4-3-grouped-analysis",
    title: "4.3 Grouped Analysis and Business KPIs",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Grouped Analysis and Business KPIs

#### Workplace Problem
Corporate management requires summaries by region, division, customer category, and fiscal period. In Excel, Pivot Tables require manual refreshing and cannot be easily scripted into automated pipelines. Using \`df.groupby().agg()\`, Python computes multi-metric business KPIs reliably.

#### Measurable Objectives
1. Group by single and multiple dimensions.
2. Apply customized aggregations: \`sum\`, \`mean\`, \`count\`, \`nunique\`, \`std\`.
3. Compute weighted average pricing and margin percentages across divisions.

\`\`\`python
import pandas as pd

# Multi-metric corporate group aggregation
kpi_summary = df.groupby(["region", "product_category"]).agg(
    total_sales_bdt=("net_revenue", "sum"),
    order_count=("order_id", "count"),
    unique_customers=("customer_id", "nunique"),
    avg_order_value_bdt=("net_revenue", "mean"),
    gross_margin_pct=("margin_bdt", lambda x: (x.sum() / df.loc[x.index, "net_revenue"].sum()) * 100)
).reset_index()

# Sort by highest revenue
kpi_summary = kpi_summary.sort_values(by="total_sales_bdt", ascending=False)
\`\`\`

#### Key Takeaway
Named aggregation in pandas (\`new_col_name=('source_col', 'agg_func')\`) produces clean, flat column headers ready for board presentations.`,
    quiz: {
      question: "Which pandas method produces clean, single-level column headers during grouped aggregations?",
      options: [
        "Named aggregation syntax: agg(new_name=('col', 'func'))",
        "df.drop_levels()",
        "df.flatten()",
        "pd.clean_headers()"
      ],
      correctIdx: 0,
      explanation: "Named aggregation allows you to explicitly assign clean output column names directly during the .agg() call, avoiding messy multi-index headers."
    },
    hasSimulator: "python-analytics"
  },

  "py-4-4-pivoting-reshaping": {
    slug: "py-4-4-pivoting-reshaping",
    title: "4.4 Pivoting, Reshaping, and Commercial Reconciliation",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Pivoting, Reshaping, and Commercial Reconciliation

#### Workplace Problem
Financial budget models are often formatted as "wide" tables with months across columns (\`Jan\`, \`Feb\`, \`Mar\`), while transactional databases store records "tall" (\`Date\`, \`Amount\`). Comparing actuals to budget requires reshaping with \`melt()\` and \`pivot_table()\`.

#### Measurable Objectives
1. Convert wide matrices to normalized tall datasets using \`pd.melt()\`.
2. Build multi-dimensional summary grids with \`pd.pivot_table()\`.
3. Compute actual-vs-budget variance and variance percentage.

#### Module 4 Lab: Commercial Invoice Reconciliation
Reconcile \`commercial_invoices.csv\` (250,000-row transaction ledger) against \`discount_matrix.xlsx\`. Detect pricing deviations, broken join keys, and quantify commercial margin leakage across distributor depots.`,
    quiz: {
      question: "Which pandas function converts a wide monthly spreadsheet (with Jan, Feb, Mar as separate columns) into a tall normalized table suitable for database ingestion?",
      options: ["pd.melt()", "pd.widen()", "pd.stack_columns()", "pd.transpose()"],
      correctIdx: 0,
      explanation: "`pd.melt()` unpivots wide columns into key-value pairs (Attribute and Value columns), creating clean tall datasets for relational analysis."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: Advanced Excel Automation
  // ═══════════════════════════════════════════════════════════════
  "py-5-1-excel-delivery-layer": {
    slug: "py-5-1-excel-delivery-layer",
    title: "5.1 Excel as the Corporate Delivery Layer",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Excel as the Corporate Delivery Layer

#### Workplace Problem
Even if your Python script runs flawlessly in 2 seconds, business executives, CFOs, and board members do not read terminal logs or raw CSVs. They expect polished, branded Excel workbooks with formatted numbers, frozen header panes, auto-fit column widths, and visible variance flags.

#### Measurable Objectives
1. Understand when to use \`openpyxl\` (updating existing templates) vs \`XlsxWriter\` (generating new workbooks with high-speed formatting).
2. Avoid destroying pre-existing formulas, cover pages, and corporate logos in existing templates.
3. Compare \`df.to_excel()\` limitations with professional programmatic formatting.`,
    quiz: {
      question: "When should an analyst choose openpyxl over XlsxWriter in a corporate automation workflow?",
      options: [
        "When creating 1 million blank rows from scratch",
        "When modifying or injecting numbers into an existing branded Excel template without destroying existing sheets, logos, or formulas",
        "When openpyxl is 10 times faster than XlsxWriter",
        "openpyxl cannot write to Excel files"
      ],
      correctIdx: 1,
      explanation: "openpyxl can open, read, edit, and save existing .xlsx files, making it the ideal choice for updating pre-built corporate reporting templates."
    },
    hasSimulator: "python-analytics"
  },

  "py-5-2-openpyxl-templates": {
    slug: "py-5-2-openpyxl-templates",
    title: "5.2 Updating Existing Templates with openpyxl",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Updating Existing Templates with openpyxl

#### Workplace Problem
Finance teams spend hours re-typing numbers into monthly executive reporting templates. Modifying existing workbooks with pandas overwrites the entire workbook and destroys formulas and formatting. With \`openpyxl\`, Python opens the template, writes data only to designated cells, and preserves everything else.

#### Measurable Objectives
1. Load workbooks with \`load_workbook('template.xlsx')\`.
2. Target specific cells by coordinate (\`sheet['C12'] = value\`) or row/column index.
3. Apply cell number formatting (\`#,##0\`, \`0.0%\`, \`৳ #,##0.00\`).

\`\`\`python
import openpyxl
from openpyxl.styles import PatternFill, Font

wb = openpyxl.load_workbook("monthly_financial_template.xlsx")
ws = wb["P&L_Summary"]

# Populate YTD Actuals into specific cells
ws["D10"] = 145000000.0  # Revenue
ws["D10"].number_format = '"৳ "#,##0'

ws["D11"] = 82000000.0   # COGS
ws["D11"].number_format = '"৳ "#,##0'

# Save as new dated deliverable (Never overwrite master template!)
wb.save("P&L_Report_March_2026_Final.xlsx")
\`\`\`

#### Golden Rule
Never overwrite the master corporate template. Always save to a newly dated output path!`,
    quiz: {
      question: "What is the golden rule when updating corporate reporting templates programmatically?",
      options: [
        "Always overwrite the original master file immediately",
        "Never overwrite the master template file; always save the populated workbook under a new, timestamped filename",
        "Convert the file to .txt format first",
        "Delete all formulas before saving"
      ],
      correctIdx: 1,
      explanation: "Preserving the original master template ensures that if data errors occur, the template remains uncorrupted for future runs."
    },
    hasSimulator: "python-analytics"
  },

  "py-5-3-xlsxwriter-styling": {
    slug: "py-5-3-xlsxwriter-styling",
    title: "5.3 Generating Styled Workbooks with XlsxWriter",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Generating Styled Workbooks with XlsxWriter

#### Workplace Problem
When generating new 10-sheet corporate workbooks from raw data, \`XlsxWriter\` provides lightning-fast execution and comprehensive control over fonts, fills, borders, frozen panes, and conditional formatting.

#### Measurable Objectives
1. Integrate pandas with XlsxWriter via \`pd.ExcelWriter(..., engine='xlsxwriter')\`.
2. Define reusable format dictionaries for headers, currency, and percentages.
3. Freeze top panes and set dynamic column widths based on maximum string lengths.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "Division": ["Dhaka Commercial", "Chittagong Port", "Sylhet Regional"],
    "Budget_BDT": [45000000, 32000000, 18000000],
    "Actual_BDT": [48500000, 29800000, 19200000],
})
df["Variance_Pct"] = (df["Actual_BDT"] - df["Budget_BDT"]) / df["Budget_BDT"]

with pd.ExcelWriter("Division_Performance.xlsx", engine="xlsxwriter") as writer:
    df.to_excel(writer, sheet_name="Summary", index=False, startrow=3)
    workbook = writer.book
    worksheet = writer.sheets["Summary"]
    
    # Formats
    header_fmt = workbook.add_format({"bold": True, "bg_color": "#1E3A8A", "font_color": "white", "border": 1})
    currency_fmt = workbook.add_format({"num_format": '"৳ "#,##0', "border": 1})
    pct_fmt = workbook.add_format({"num_format": "0.0%", "border": 1})
    
    # Apply column formats & auto-fit
    worksheet.set_column("A:A", 22)
    worksheet.set_column("B:C", 18, currency_fmt)
    worksheet.set_column("D:D", 14, pct_fmt)
    worksheet.freeze_panes(4, 0) # Freeze top rows
\`\`\``,
    quiz: {
      question: "Which XlsxWriter worksheet method locks the top header rows in place while scrolling down large datasets?",
      options: ["worksheet.freeze_panes(row, col)", "worksheet.lock_headers()", "worksheet.pin_top()", "worksheet.scroll_lock()"],
      correctIdx: 0,
      explanation: "worksheet.freeze_panes(row, col) locks designated rows and columns so headers remain visible when scrolling through data."
    },
    hasSimulator: "python-analytics"
  },

  "py-5-4-financial-reporting-validation": {
    slug: "py-5-4-financial-reporting-validation",
    title: "5.4 Financial Reporting and Output Validation",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Financial Reporting and Output Validation

#### Workplace Problem
Delivering a spreadsheet with \`#DIV/0!\`, \`#REF!\`, or \`#VALUE!\` errors to an executive destroys credibility. In financial reporting, negative numbers must use accounting format \`(৳ 1,200)\`, zeros should show as dashes \`-\`, and balance sheet checks must evaluate to zero.

#### Measurable Objectives
1. Implement accounting number formats: \`_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)\`.
2. Add Excel dynamic formulas (\`=SUM(C4:C20)\`) programmatically.
3. Validate workbook output integrity before distribution.

#### Module 5 Lab: Board Reporting Workbook
Populate \`board_reporting_template.xlsx\` using trial balance extracts. Generate a multi-tab deliverable featuring executive summaries, division drill-downs, and automated variance analysis flags.`,
    quiz: {
      question: "In institutional corporate finance, how should zero values be displayed on executive financial statements?",
      options: [
        "As the word 'ZERO'",
        "As a clean hyphen/dash '-' according to standard accounting number formats",
        "As blank empty white space",
        "As a red exclamation point"
      ],
      correctIdx: 1,
      explanation: "Standard accounting number format formats zeros as hyphens ('-'), making statements scannable without visual clutter."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 6: Relational Databases & SQL Integration
  // ═══════════════════════════════════════════════════════════════
  "py-6-1-sql-vs-python": {
    slug: "py-6-1-sql-vs-python",
    title: "6.1 SQL and Python Have Different Jobs",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### SQL and Python Have Different Jobs

#### Workplace Problem
Many analysts either try to do everything in SQL (complex text parsing, formatting Excel files) or everything in Python (downloading 50 million raw transaction rows into local RAM just to filter one date). This results in memory crashes and slow execution. The professional standard is **Query Push-down**: let the SQL database filter, join, and aggregate massive data on the server; let Python handle cross-system reconciliation, advanced modeling, and formatted reporting.

#### Measurable Objectives
1. Identify when to push computation to SQL vs execute in Python.
2. Formulate push-down queries that return only relevant aggregated records.
3. Quantify memory and network transfer savings.`,
    quiz: {
      question: "What is 'Query Push-Down' in enterprise data analytics?",
      options: [
        "Writing SQL queries on paper first",
        "Pushing filtering, joins, and aggregations to the database engine so only necessary aggregated results are transferred to Python memory",
        "Deleting the database after each query",
        "Using Python exclusively without any database"
      ],
      correctIdx: 1,
      explanation: "Query push-down leverages high-performance database indexing to process gigabytes of data on the server and return only the needed summary rows to Python."
    },
    hasSimulator: "python-analytics"
  },

  "py-6-2-sql-extraction": {
    slug: "py-6-2-sql-extraction",
    title: "6.2 Extracting Corporate Data with SQL",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Extracting Corporate Data with SQL

#### Workplace Problem
Analysts often write basic \`SELECT * FROM orders\` queries that pull unnecessary columns and historical rows. Real corporate queries require parameterized filters, multi-table joins, date truncation, and window functions to compute period-over-period growth.

#### Measurable Objectives
1. Construct multi-table joins with proper indexing.
2. Apply window functions (\`ROW_NUMBER()\`, \`SUM() OVER (...)\`) in database queries.
3. Optimize queries for fast execution.

\`\`\`sql
-- Enterprise SQL Extraction Example
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) AS sales_month,
        c.region,
        p.category,
        SUM(o.net_amount_bdt) AS total_revenue_bdt,
        COUNT(DISTINCT o.order_id) AS order_volume
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN products p ON o.product_id = p.product_id
    WHERE o.order_status = 'COMPLETED'
      AND o.order_date >= '2025-01-01'
    GROUP BY 1, 2, 3
)
SELECT * FROM monthly_sales;
\`\`\``,
    quiz: {
      question: "Why should analysts avoid 'SELECT *' queries when extracting data from enterprise production databases?",
      options: [
        "SQL doesn't support the asterisk character in 2026",
        "It transfers unnecessary columns across the corporate network, wastes memory, and breaks pipelines if table schemas change",
        "It locks the database permanently",
        "It prints the entire database to the office printer"
      ],
      correctIdx: 1,
      explanation: "Specifying explicit column names conserves bandwidth, minimizes RAM usage in Python, and protects pipelines against unexpected new columns."
    },
    hasSimulator: "python-analytics"
  },

  "py-6-3-sqlalchemy-pandas": {
    slug: "py-6-3-sqlalchemy-pandas",
    title: "6.3 Connecting Python to a Database",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Connecting Python to a Database

#### Workplace Problem
Hardcoding database passwords in scripts and using raw string concatenation (\`f"WHERE date = '{user_date}'"\`) creates major security vulnerabilities (SQL injection) and leaks credentials to Git repositories. Professional analytics uses SQLAlchemy connection pooling and parameterized queries with environment variables.

#### Measurable Objectives
1. Create secure connection engines using SQLAlchemy (\`create_engine\`).
2. Read queries directly into DataFrames with \`pd.read_sql(query, con, params={...})\`.
3. Load credentials securely from environment variables.

\`\`\`python
import os
from sqlalchemy import create_engine, text
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("ENTERPRISE_DATABASE_URL", "sqlite:///corporate_data.db")
engine = create_engine(DB_URL)

query = text("""
    SELECT depot_id, SUM(sales_bdt) AS depot_revenue
    FROM depot_sales
    WHERE fiscal_year = :year AND audit_status = :status
    GROUP BY depot_id
""")

# Parameterized query execution
df_depot = pd.read_sql(query, con=engine, params={"year": 2026, "status": "APPROVED"})
print(df_depot.head())
\`\`\``,
    quiz: {
      question: "Why must database queries always be parameterized rather than built using Python f-strings?",
      options: [
        "f-strings do not work with SQL syntax",
        "Parameterized queries prevent SQL injection security attacks and allow the database to cache query execution plans",
        "Parameterized queries make the script run in parallel",
        "SQLAlchemy only accepts parameter dictionaries"
      ],
      correctIdx: 1,
      explanation: "Parameterized queries protect against malicious SQL injection and enable the database engine to reuse compiled query execution plans."
    },
    hasSimulator: "python-analytics"
  },

  "py-6-4-duckdb-local-analytics": {
    slug: "py-6-4-duckdb-local-analytics",
    title: "6.4 DuckDB and Efficient Local Analytics",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### DuckDB and Efficient Local Analytics

#### Workplace Problem
Analysts often need to query 10 GB of historical CSV or Parquet files stored locally on their laptops. Loading them into pandas crashes with \`MemoryError\`. DuckDB acts as an in-process columnar SQL database that queries CSV and Parquet files directly from disk in seconds without loading them fully into RAM.

#### Measurable Objectives
1. Query CSV and Parquet files directly using DuckDB SQL.
2. Combine DuckDB high-speed querying with pandas DataFrame exports.
3. Execute analytical aggregations across multi-gigabyte datasets locally.

\`\`\`python
import duckdb

# Query a 2GB CSV file directly from disk without loading into RAM
query = """
    SELECT 
        region, 
        COUNT(*) AS total_orders, 
        SUM(amount_bdt) AS total_revenue
    FROM 'data/massive_transactions_2025.csv'
    WHERE amount_bdt > 1000
    GROUP BY region
    ORDER BY total_revenue DESC
"""

df_summary = duckdb.query(query).to_df()
print(df_summary)
\`\`\`

#### Module 6 Lab
Build an extraction pipeline querying order and product tables across SQLite and DuckDB, validate control totals against financial statements, and output a clean analytical dataset.`,
    quiz: {
      question: "What makes DuckDB particularly powerful for local analytics on corporate analysts' laptops?",
      options: [
        "It replaces the laptop operating system",
        "It executes columnar SQL queries directly against raw CSV and Parquet files on disk without loading full datasets into RAM",
        "It connects directly to satellites",
        "It only supports Python 2"
      ],
      correctIdx: 1,
      explanation: "DuckDB is an in-process analytical engine that queries large disk files using vectorized streaming, avoiding memory limits on local machines."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 7: Consuming REST APIs & Cloud Feeds
  // ═══════════════════════════════════════════════════════════════
  "py-7-1-api-fundamentals": {
    slug: "py-7-1-api-fundamentals",
    title: "7.1 API Fundamentals for Analysts",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### API Fundamentals for Analysts

#### Workplace Problem
Modern business data lives in cloud services: Salesforce CRM, Jira, Zendesk, payment gateways (bKash, SSLCommerz), and cloud logistics portals. Instead of waiting for weekly IT data dumps, analysts can fetch real-time operational feeds programmatically via REST APIs.

#### Measurable Objectives
1. Understand HTTP requests: Methods (\`GET\`, \`POST\`), Headers, Status Codes (\`200\`, \`401\`, \`404\`, \`429\`, \`500\`).
2. Make requests using Python's \`requests\` library with proper timeouts.
3. Parse JSON payloads into Python dictionaries.`,
    quiz: {
      question: "What HTTP status code indicates that your API request was throttled due to exceeding rate limits?",
      options: ["200 OK", "401 Unauthorized", "429 Too Many Requests", "500 Internal Server Error"],
      correctIdx: 2,
      explanation: "HTTP 429 Too Many Requests signifies that you have hit the API rate limit and must back off before making further requests."
    },
    hasSimulator: "python-analytics"
  },

  "py-7-2-auth-security": {
    slug: "py-7-2-auth-security",
    title: "7.2 Authentication and Secure Requests",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Authentication and Secure Requests

#### Workplace Problem
Exposing API keys in Python scripts published to GitHub or shared via email is a severe corporate security breach. Analysts must handle API tokens using environment variables, authorization headers, and timeout policies.

#### Measurable Objectives
1. Pass Bearer tokens securely in HTTP headers.
2. Load credentials safely with \`python-dotenv\`.
3. Always supply timeout thresholds to prevent hung execution.

\`\`\`python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("LOGISTICS_API_TOKEN")
if not API_KEY:
    raise ValueError("Missing mandatory LOGISTICS_API_TOKEN in environment.")

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Accept": "application/json"
}

# Always enforce explicit timeouts!
response = requests.get(
    "https://api.corporate-logistics.local/v1/shipments",
    headers=headers,
    timeout=(3.05, 27) # (connect timeout, read timeout)
)
response.raise_for_status()
data = response.json()
\`\`\``,
    quiz: {
      question: "Why should every requests.get() call include an explicit timeout parameter?",
      options: [
        "To speed up the internet connection",
        "Without an explicit timeout, your script can hang indefinitely if the remote server drops the connection, freezing unattended pipelines",
        "Python requires timeouts to compile",
        "To decrease server electricity usage"
      ],
      correctIdx: 1,
      explanation: "By default, requests has no timeout. If a remote server hangs or drops packets, your script will wait forever, stalling automated jobs."
    },
    hasSimulator: "python-analytics"
  },

  "py-7-3-pagination-rate-limits": {
    slug: "py-7-3-pagination-rate-limits",
    title: "7.3 Pagination, Rate Limits, and Resilient Retrieval",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Pagination, Rate Limits, and Resilient Retrieval

#### Workplace Problem
Cloud APIs never return 50,000 records in a single request. They return paginated chunks of 100 records using offsets or cursors. If your script does not loop through pagination cursors, you silently drop 99% of company data! Furthermore, making too many requests too quickly triggers rate limit errors (HTTP 429).

#### Measurable Objectives
1. Implement cursor-based and page-based pagination loops.
2. Apply exponential backoff with \`time.sleep()\` on HTTP 429 responses.
3. Track and verify total extracted records.

\`\`\`python
import time
import requests

all_tickets = []
cursor = None

while True:
    params = {"limit": 100}
    if cursor:
        params["cursor"] = cursor
        
    resp = requests.get("https://api.helpdesk.mock/tickets", params=params, timeout=10)
    
    if resp.status_code == 429:
        retry_after = int(resp.headers.get("Retry-After", 5))
        print(f"Rate limited. Backing off for {retry_after}s...")
        time.sleep(retry_after)
        continue
        
    resp.raise_for_status()
    payload = resp.json()
    
    records = payload.get("data", [])
    all_tickets.extend(records)
    
    cursor = payload.get("next_cursor")
    if not cursor or not records:
        break # Completed all pages
        
print(f"Successfully retrieved all {len(all_tickets)} paginated records.")
\`\`\``,
    quiz: {
      question: "What is the primary indicator that an API pagination loop has reached the final page?",
      options: [
        "The computer beeps three times",
        "The response returns an empty record list or the 'next_cursor' field is null/absent",
        "The API token expires automatically",
        "The HTTP status code changes to 404"
      ],
      correctIdx: 1,
      explanation: "Pagination loops terminate when the API returns an empty record list or when the response payload's next_cursor/next_page attribute is null."
    },
    hasSimulator: "python-analytics"
  },

  "py-7-4-flattening-json": {
    slug: "py-7-4-flattening-json",
    title: "7.4 Flattening JSON into Business Tables",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Flattening JSON into Business Tables

#### Workplace Problem
API payloads contain nested JSON structures: \`{"customer": {"address": {"city": "Dhaka"}}, "items": [...]}\`. Passing this directly to \`pd.DataFrame(data)\` leaves dictionary objects trapped in single cells. Analysts must use \`pd.json_normalize()\` to unpack nested records into clean tabular columns.

#### Measurable Objectives
1. Unpack nested dictionaries with \`pd.json_normalize()\`.
2. Extract sub-arrays with \`record_path\` and \`meta\` parameters.
3. Validate and export cleaned API tables.

\`\`\`python
import pandas as pd

raw_api_payload = [
    {
        "ticket_id": "T-901",
        "customer": {"name": "Rahim Textile", "region": "Narayanganj"},
        "resolution": {"status": "CLOSED", "duration_hrs": 4.5}
    },
    {
        "ticket_id": "T-902",
        "customer": {"name": "Meghna Feeds", "region": "Gazipur"},
        "resolution": {"status": "OPEN", "duration_hrs": None}
    }
]

df_flat = pd.json_normalize(raw_api_payload)
print(df_flat.columns.tolist())
# Output: ['ticket_id', 'customer.name', 'customer.region', 'resolution.status', 'resolution.duration_hrs']
\`\`\`

#### Module 7 Lab
Build a synchronization pipeline that connects to a mock Helpdesk API, handles cursor pagination and rate limits, flattens nested ticket payloads into a clean tabular DataFrame, and validates extraction completeness.`,
    quiz: {
      question: "Which pandas function unpacks nested semi-structured JSON objects into flattened relational tabular columns?",
      options: ["pd.json_normalize()", "pd.flatten()", "pd.unpack_dict()", "pd.split_json()"],
      correctIdx: 0,
      explanation: "`pd.json_normalize()` recursively expands nested dictionary keys into dot-notated column names, creating clean tabular structures."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 8: Script Hardening, Logging & Scheduling
  // ═══════════════════════════════════════════════════════════════
  "py-8-1-enterprise-logging": {
    slug: "py-8-1-enterprise-logging",
    title: "8.1 Logging Instead of Debugging with print Statements",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Logging Instead of Debugging with print Statements

#### Workplace Problem
Analysts debug scripts using \`print("here")\` or \`print(df.head())\`. When scripts run unattended at 03:00 AM on a scheduler or cloud server, \`print\` outputs vanish into the void. When an error occurs, nobody knows when it broke, which file caused it, or how many rows were processed. Enterprise scripts use Python's built-in \`logging\` module.

#### Measurable Objectives
1. Configure \`logging\` handlers for both console output and persistent file logs.
2. Apply standard log severity levels: \`DEBUG\`, \`INFO\`, \`WARNING\`, \`ERROR\`, \`CRITICAL\`.
3. Format log entries with timestamps, function names, and execution metrics.

\`\`\`python
import logging
from pathlib import Path

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s (%(funcName)s:%(lineno)d): %(message)s",
    handlers=[
        logging.FileHandler(LOG_DIR / "daily_automation.log", encoding="utf-8"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("InvoicePipeline")

logger.info("Pipeline initialized. Scanning depot folder...")
logger.warning("Depot 'CTG-02' reported 15 duplicate invoices. Quarantining records.")
logger.error("Database connection failed. Retrying in 10s...")
\`\`\``,
    quiz: {
      question: "Why is the logging module preferred over print() statements in corporate automated scripts?",
      options: [
        "print() is deprecated in Python 3.12",
        "logging writes structured records with timestamps and severity levels to disk log files, allowing post-run forensics on unattended jobs",
        "logging prevents all errors from happening",
        "print() cannot output text to screens"
      ],
      correctIdx: 1,
      explanation: "logging persists timestamped execution trails to disk files, enabling engineers to audit unattended scheduled jobs and diagnose failures."
    },
    hasSimulator: "python-analytics"
  },

  "py-8-2-config-credentials": {
    slug: "py-8-2-config-credentials",
    title: "8.2 Configuration and Credential Management",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Configuration and Credential Management

#### Workplace Problem
Separating environment secrets from operational configuration is a core 12-factor application standard. Hardcoding paths and credentials in code means code must be modified every time a path moves or a password changes.

#### Measurable Objectives
1. Separate configuration (JSON/YAML) from secrets (\`.env\`).
2. Add \`.env\` to \`.gitignore\` to prevent credential leaks.
3. Provide robust default fallbacks for local development.`,
    quiz: {
      question: "Which file should ALWAYS be listed in your repository's .gitignore file to prevent leaking company passwords and database tokens?",
      options: ["main.py", "requirements.txt", ".env", "README.md"],
      correctIdx: 2,
      explanation: "The `.env` file holds sensitive environment secrets (API keys, database passwords) and must never be committed to source control."
    },
    hasSimulator: "python-analytics"
  },

  "py-8-3-validation-recovery": {
    slug: "py-8-3-validation-recovery",
    title: "8.3 Validation, Failures, and Recovery",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Validation, Failures, and Recovery

#### Workplace Problem
When an input file schema changes unexpectedly (e.g. ERP changed column \`"Invoice_Date"\` to \`"BillDate"\`), a brittle script crashes midway through processing. A hardened script validates schema contracts upfront, fails fast with descriptive alerts, and triggers notification emails.

#### Measurable Objectives
1. Implement schema validation checks for mandatory columns.
2. Send automated email alerts with \`smtplib\` upon job failure.
3. Maintain quarantine logs for auditability.`,
    quiz: {
      question: "What is 'fail-fast' validation in corporate pipeline engineering?",
      options: [
        "Turning off the computer when an error occurs",
        "Validating schemas and inputs upfront at the very start of the script, immediately halting execution with clear diagnostic errors before corrupt data touches production systems",
        "Running queries with no timeout",
        "Skipping all validation steps"
      ],
      correctIdx: 1,
      explanation: "Fail-fast validation verifies schema contracts and mandatory files upfront, preventing corrupted data from entering databases or downstream reports."
    },
    hasSimulator: "python-analytics"
  },

  "py-8-4-scheduling-monitoring": {
    slug: "py-8-4-scheduling-monitoring",
    title: "8.4 Scheduling and Operational Monitoring",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Scheduling and Operational Monitoring

#### Workplace Problem
Automating reports requires scripts to execute unattended on a recurring schedule. On Windows corporate workstations, **Windows Task Scheduler** triggers jobs; on Linux servers, **cron** handles orchestration. Understanding virtual environment activation and exit status codes is essential for unattended reliability.

#### Measurable Objectives
1. Configure Windows Task Scheduler actions using batch wrapper files (\`.bat\`).
2. Manage Python environment activation in scheduled tasks.
3. Configure exit codes (\`sys.exit(0)\` on success, \`sys.exit(1)\` on failure) so task schedulers record job status accurately.

#### Module 8 Lab
Harden a daily reporting script to monitor an unstable data-drop folder, validate schemas, record structured logs, quarantine malformed files, and send notification alerts upon exception.`,
    quiz: {
      question: "Why should scheduled Python scripts terminate with explicit sys.exit(0) on success and sys.exit(1) on failure?",
      options: [
        "To tell Windows Task Scheduler or cron whether the job succeeded or failed so alert monitoring systems can trigger",
        "To turn off the computer",
        "Python scripts cannot terminate without sys.exit",
        "To delete temporary log files"
      ],
      correctIdx: 0,
      explanation: "Operating system task schedulers check the process return code (0 = success, non-zero = error) to log execution health and trigger alerts."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 9: Business Intelligence Integration
  // ═══════════════════════════════════════════════════════════════
  "py-9-1-exploratory-analysis": {
    slug: "py-9-1-exploratory-analysis",
    title: "9.1 Exploratory Analysis Before Reporting",
    xpReward: 70,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Exploratory Analysis Before Reporting

#### Workplace Problem
Before presenting KPI charts to executives, analysts must perform exploratory data analysis (EDA) to detect outliers, skewed distributions, and anomalous spikes that might indicate data corruption rather than real commercial trends.

#### Measurable Objectives
1. Compute descriptive statistics (\`describe()\`, interquartile ranges, standard deviations).
2. Detect outliers using statistical bounds.
3. Generate exploratory distribution visualizations using \`matplotlib\` and \`seaborn\`.`,
    quiz: {
      question: "Why must exploratory analysis precede executive KPI dashboard generation?",
      options: [
        "To make the code look longer",
        "To discover data errors, extreme outliers, and distribution anomalies before flawed figures reach executive decision-makers",
        "Because matplotlib cannot plot data without describe()",
        "It is required by the tax authorities"
      ],
      correctIdx: 1,
      explanation: "Exploratory analysis catches data entry errors, system glitches, and skewed distributions before they contaminate executive reports."
    },
    hasSimulator: "python-analytics"
  },

  "py-9-2-kpi-tables": {
    slug: "py-9-2-kpi-tables",
    title: "9.2 Building Business-Ready KPI Tables",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Building Business-Ready KPI Tables

#### Workplace Problem
Dashboards require well-defined, mathematically unambiguous metric tables. Metrics like Customer Acquisition Cost (CAC), Churn Rate, and EBITDA Margin must have strict formulas and definitions to avoid organizational confusion.

#### Measurable Objectives
1. Define formal mathematical formulations for commercial KPIs.
2. Build reusable aggregation tables optimized for Power BI and Excel consumption.
3. Reconcile component metrics against audited general ledgers.`,
    quiz: {
      question: "What is essential when designing corporate KPI tables for downstream executive dashboards?",
      options: [
        "Using as many decimal places as possible",
        "Documenting mathematically unambiguous metric formulas and reconciling totals against audited general ledgers",
        "Hiding all negative numbers",
        "Using random column names"
      ],
      correctIdx: 1,
      explanation: "Documented definitions and reconciled figures prevent conflicting interpretations and ensure leadership trust in dashboard metrics."
    },
    hasSimulator: "python-analytics"
  },

  "py-9-3-bi-integration": {
    slug: "py-9-3-bi-integration",
    title: "9.3 Python, Excel, and Power BI Integration",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Python, Excel, and Power BI Integration

#### Workplace Problem
Power BI is fantastic for interactive visual dashboards, but complex data cleaning and multi-source API integration inside Power Query can become slow and difficult to maintain. Using Python as the data preparation layer that feeds clean, pre-calculated Star Schema tables into Power BI combines the best of both worlds.

#### Measurable Objectives
1. Understand the architecture of using Python as the upstream ETL engine feeding Power BI.
2. Export optimized Parquet feeds for high-speed Power BI ingestion.
3. Evaluate Python in Excel features where supported.`,
    quiz: {
      question: "Why is exporting clean pre-calculated Parquet or CSV feeds from Python into Power BI often preferred over doing heavy data transformations inside Power Query?",
      options: [
        "Power BI cannot open Excel files",
        "Python handles complex data scraping, API pagination, and validation much faster, leaving Power BI to focus on high-speed dashboard visualization",
        "Parquet files can only be created by Microsoft",
        "Power Query is completely discontinued"
      ],
      correctIdx: 1,
      explanation: "Decoupling data engineering (Python) from visualization (Power BI) produces faster refresh times and cleaner, more maintainable data models."
    },
    hasSimulator: "python-analytics"
  },

  "py-9-4-management-recommendations": {
    slug: "py-9-4-management-recommendations",
    title: "9.4 From Analysis to Management Recommendations",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### From Analysis to Management Recommendations

#### Workplace Problem
Analysts often deliver 50-slide decks filled with raw charts and numbers without telling executives what actions to take. Leadership cares about 4 core questions:
1. **What happened?** (Fact)
2. **Why did it happen?** (Root Cause)
3. **What matters financially or operationally?** (Impact in BDT)
4. **What should management do next?** (Actionable Recommendation)

#### Measurable Objectives
1. Structure business findings using the Pyramid Principle.
2. Quantify financial and operational trade-offs.
3. Write concise, one-page executive memos accompanying technical code deliverables.

#### Module 9 Lab
Analyze a multi-year commercial subscription and billing dataset. Build an automated data pipeline, generate BI-ready feeds, and author an executive memo with evidence-backed commercial recommendations.`,
    quiz: {
      question: "Which four questions must every executive analytical memo answer?",
      options: [
        "Who wrote the code, what IDE was used, what version of Python, and how many lines of code",
        "What happened, Why did it happen, What matters financially/operationally, and What should management do next",
        "How much does the server cost, what is the IP address, who has admin rights, and when is the next holiday",
        "None of the above"
      ],
      correctIdx: 1,
      explanation: "Executives require clear business synthesis: the observed facts, root causes, quantified financial stakes, and specific actionable recommendations."
    },
    hasSimulator: "python-analytics"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 10: Job Simulation Capstone & Recruiter Test
  // ═══════════════════════════════════════════════════════════════
  "py-10-1-deconstructing-assignment": {
    slug: "py-10-1-deconstructing-assignment",
    title: "10.1 Deconstructing an Enterprise Assignment",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Deconstructing an Enterprise Assignment

#### Workplace Problem
When candidates take a timed technical interview or receive a real corporate project, the brief is deliberately ambiguous: incomplete data dictionaries, irregular schemas, multiple conflicting files, and tight deadlines. Candidates fail when they rush into writing code without scoping the pipeline architecture, input dependencies, and output criteria.

#### Measurable Objectives
1. Deconstruct an unstructured corporate business brief into input-transformation-output specifications.
2. Inventory input data files and document schema assumptions.
3. Plan data reconciliation control totals before writing code.`,
    quiz: {
      question: "What is the critical first step before writing code in a timed enterprise analytics challenge?",
      options: [
        "Install 50 new third-party libraries",
        "Deconstruct the business brief, inventory input files, establish control totals, and outline the pipeline architecture",
        "Send an email asking for the solution",
        "Start writing complex classes immediately"
      ],
      correctIdx: 1,
      explanation: "Careful deconstruction prevents architectural rework and ensures you build exactly what the business brief requires."
    },
    hasSimulator: "python-analytics"
  },

  "py-10-2-pipeline-design": {
    slug: "py-10-2-pipeline-design",
    title: "10.2 Designing the Pipeline",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Designing the Pipeline

#### Workplace Problem
Enterprise analytics pipelines combine multiple data sources: SQL databases, Excel spreadsheets, REST APIs, and legacy CSV exports. Designing an end-to-end architecture with isolated staging, normalization, reconciliation, and delivery layers ensures that failure in one component does not corrupt the entire system.

#### Measurable Objectives
1. Map data lineage from source extraction to final executive deliverable.
2. Design staging schemas and intermediate validation checkpoints.
3. Ensure reproducible execution with zero manual intervention.`,
    quiz: {
      question: "Why should analytical pipelines maintain separated staging, normalization, and delivery layers?",
      options: [
        "To make file storage more expensive",
        "To isolate failures, allow auditing at each transformation checkpoint, and prevent dirty source data from contaminating outputs",
        "Python requires 3 folders to run",
        "It prevents Excel from opening files"
      ],
      correctIdx: 1,
      explanation: "Layered architecture isolates raw, staged, and delivery states, making data pipelines auditable, testable, and resilient."
    },
    hasSimulator: "python-analytics"
  },

  "py-10-3-building-verifying": {
    slug: "py-10-3-building-verifying",
    title: "10.3 Building and Verifying the Reporting Solution",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Building and Verifying the Reporting Solution

#### Workplace Problem
Building the pipeline is only half the battle. In an enterprise assessment, interviewers and senior managers will inspect your code quality, test coverage, logging records, and output formatting. If totals don't balance to the cent, the candidate fails regardless of how sophisticated the code appears.

#### Measurable Objectives
1. Implement end-to-end mathematical reconciliation checks.
2. Generate professional, styled Excel workbooks using XlsxWriter/openpyxl.
3. Write clean, PEP 8 compliant code with descriptive docstrings and structured logs.`,
    quiz: {
      question: "What causes immediate disqualification in corporate technical analytics assessments?",
      options: [
        "Using VS Code instead of PyCharm",
        "Fabricated output numbers, unhandled exceptions, silent data loss, and hardcoded passwords",
        "Having fewer than 500 lines of code",
        "Writing detailed comments"
      ],
      correctIdx: 1,
      explanation: "Mathematical inconsistencies, exposed secrets, unhandled crashes, and fabricated figures breach corporate data governance."
    },
    hasSimulator: "python-analytics"
  },

  "py-10-4-defending-analysis": {
    slug: "py-10-4-defending-analysis",
    title: "10.4 Defending the Analysis and Recommendation",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Defending the Analysis and Recommendation

#### Workplace Problem
In recruiter technical interviews and C-suite presentations, analysts must defend their architectural choices and business recommendations against skeptical questions:
* *"Why did you choose an inner join here instead of a left join?"*
* *"What is your confidence interval on this revenue projection?"*
* *"How does your pipeline handle missing distributor submissions?"*

#### Measurable Objectives
1. Present a 5-minute technical code walkthrough explaining architectural decisions.
2. Defend assumptions and trade-offs before senior interviewers.
3. Deliver a concise 2-page executive business memo.

#### Final Simulation Capstone
Complete the final 3-hour recruiter practical assessment. Ingest multi-source messy data (ERP SQL + 15 distributor workbooks + mock logistics API), reconcile commercial transactions, generate a formatted Excel deliverable, and produce an executive briefing memo.`,
    quiz: {
      question: "How should an analyst defend an analytical model or pipeline choice when questioned by executive leaders?",
      options: [
        "Argue defensively and blame the IT department for bad data",
        "Transparently explain design trade-offs, cite control total reconciliation results, address limitations, and present evidence-backed business implications",
        "Refuse to answer questions until the meeting ends",
        "Change all numbers on the spot without verification"
      ],
      correctIdx: 1,
      explanation: "Executive defense requires grounded technical transparency: explaining trade-offs, proving data reconciliation, and focusing on business outcomes."
    },
    hasSimulator: "python-analytics"
  }
};
