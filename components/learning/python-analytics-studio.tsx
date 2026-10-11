"use client";

import { useState, useEffect } from "react";
import {
  Terminal, Play, RotateCcw, Copy, Download, Check, AlertCircle,
  FileText, Table, HelpCircle, Code, ShieldCheck, Database,
  Keyboard, X, ExternalLink, Sparkles, Layers, ChevronRight
} from "lucide-react";

interface PythonAnalyticsStudioProps {
  lessonSlug: string;
  courseSlug: string;
}

interface PythonPreset {
  id: string;
  title: string;
  filename: string;
  desc: string;
  starterCode: string;
  sampleOutput: string;
}

const PYTHON_PRESETS: Record<string, PythonPreset> = {
  vendor_audit: {
    id: "vendor_audit",
    title: "1. Vendor Payment Normalization & Anomaly Filter",
    filename: "vendor_payment_audit.py",
    desc: "Ingests raw_vendor_payments.txt, strips erratic whitespace, validates routing numbers, and quarantines unmapped records.",
    starterCode: `import re

# Raw ERP Vendor Batch
raw_records = [
    "  Vendor: PRAN FOODS LTD ; Routing: 010271101 ; Amount: BDT 1,45,000 /=",
    "Vendor: square pharma ; Routing: 020150992 ; Amount: Tk 2,80,000.50",
    "  Vendor:  Beximco Ltd. ; Routing: 999999999 ; Amount: 95,000 /=", # Invalid routing!
    "Vendor: AKIJ MOTORS ; Routing: 010271101 ; Amount: -15,000 /=", # Negative amount!
]

BRANCH_NAMES = {
    "010271101": "Dhaka Main Principal Branch",
    "020150992": "Agrabad Commercial Branch, Chittagong",
}

cleared_payouts = []
quarantined_records = []

for line in raw_records:
    # 1. Normalize vendor name
    v_match = re.search(r"Vendor:\s*([^;]+)", line, re.IGNORECASE)
    vendor = v_match.group(1).strip().title() if v_match else "UNKNOWN"
    
    # 2. Extract routing code
    r_match = re.search(r"Routing:\s*([0-9]+)", line)
    routing = r_match.group(1).strip() if r_match else "000000000"
    
    # 3. Clean currency
    amt_match = re.search(r"Amount:\s*(?:BDT|Tk)?\s*([0-9,-]+(?:\.[0-9]{2})?)", line, re.IGNORECASE)
    amt_str = amt_match.group(1).replace(",", "").replace("/=", "").strip() if amt_match else "0"
    amount = float(amt_str)
    
    # Validation Rules
    if amount <= 0:
        quarantined_records.append({"vendor": vendor, "amount": amount, "reason": "Non-positive transaction amount"})
    elif routing not in BRANCH_NAMES:
        quarantined_records.append({"vendor": vendor, "amount": amount, "reason": f"Unrecognized routing code '{routing}'"})
    else:
        cleared_payouts.append({"vendor": vendor, "branch": BRANCH_NAMES[routing], "amount": amount})

print("=== BATCH AUDIT COMPLETE ===")
print(f"Cleared Payments: {len(cleared_payouts)} records | ৳{sum(x['amount'] for x in cleared_payouts):,.2f}")
print(f"Quarantined Records: {len(quarantined_records)} records | ৳{sum(x['amount'] for x in quarantined_records):,.2f}")
for q in quarantined_records:
    print(f"  [QUARANTINE] {q['vendor']}: ৳{q['amount']:,.2f} -> {q['reason']}")
`,
    sampleOutput: `=== BATCH AUDIT COMPLETE ===
Cleared Payments: 2 records | ৳425,000.50
Quarantined Records: 2 records | ৳80,000.00
  [QUARANTINE] Beximco Ltd.: ৳95,000.00 -> Unrecognized routing code '999999999'
  [QUARANTINE] Akij Motors: ৳-15,000.00 -> Non-positive transaction amount
[PROCESSED] 4 records in 18.4ms | Memory: 1.2 MB | Exit: 0 (SUCCESS)`
  },
  file_scanner: {
    id: "file_scanner",
    title: "2. Nested 48-Folder File Discovery & Completeness Audit",
    filename: "quarterly_depot_scanner.py",
    desc: "Recursively discovers distributor CSV files using pathlib.rglob(), flags missing quarters, and checks file sizes.",
    starterCode: `from pathlib import Path

# Simulated depot folder scan
mock_depot_files = [
    Path("data/distributor_reports/Dhaka/Q1/depot_01_sales.csv"),
    Path("data/distributor_reports/Dhaka/Q2/depot_01_sales.csv"),
    Path("data/distributor_reports/Chittagong/Q1/depot_02_sales.csv"),
    Path("data/distributor_reports/Sylhet/Q1/depot_03_sales.csv"),
    Path("data/distributor_reports/Sylhet/Q2/depot_03_sales.csv"),
]

expected_depots = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]
expected_quarters = ["Q1", "Q2"]

found_matrix = {}
for p in mock_depot_files:
    depot = p.parent.parent.name
    q = p.parent.name
    found_matrix.setdefault(depot, set()).add(q)

missing_alerts = []
for d in expected_depots:
    submitted_qs = found_matrix.get(d, set())
    for q in expected_quarters:
        if q not in submitted_qs:
            missing_alerts.append(f"MISSING SUBMISSION: {d} region for {q}")

print("=== DEPOT SUBMISSION AUDIT ===")
print(f"Total Discovered Files: {len(mock_depot_files)}")
print(f"Missing Submissions Detected: {len(missing_alerts)}")
for alert in missing_alerts:
    print(f"  [ALERT] {alert}")
`,
    sampleOutput: `=== DEPOT SUBMISSION AUDIT ===
Total Discovered Files: 5
Missing Submissions Detected: 3
  [ALERT] MISSING SUBMISSION: Chittagong region for Q2
  [ALERT] MISSING SUBMISSION: Rajshahi region for Q1
  [ALERT] MISSING SUBMISSION: Rajshahi region for Q2
[PROCESSED] Completeness: 62.5% | Scanner Runtime: 12.1ms | Exit: 0 (SUCCESS)`
  },
  relational_merge: {
    id: "relational_merge",
    title: "3. pandas Relational Join & Merge Multiplication Audit",
    filename: "commercial_reconciliation.py",
    desc: "Merges 250k commercial invoices with discount matrices, prevents Cartesian row multiplication, and flags margin leakage.",
    starterCode: `import pandas as pd

# 1. Commercial Invoices
invoices = pd.DataFrame({
    "invoice_id": ["INV-881", "INV-882", "INV-883", "INV-884"],
    "sku_code": ["SKU-10", "SKU-20", "SKU-30", "SKU-99"], # SKU-99 orphan!
    "volume_cartons": [120, 85, 200, 50],
    "billed_unit_price": [48.0, 52.0, 39.0, 45.0]
})

# 2. Master Price Book
price_book = pd.DataFrame({
    "sku_code": ["SKU-10", "SKU-20", "SKU-30"],
    "sku_name": ["Detergent 500g", "Soap Bar 125g", "Shampoo 200ml"],
    "list_price": [50.0, 50.0, 40.0],
    "approved_discount_pct": [0.05, 0.00, 0.02]
})

# Assert join key uniqueness on dimension table
assert price_book["sku_code"].is_unique, "Duplicate keys detected in dimension!"

# Execute merge with indicator
df_merged = pd.merge(invoices, price_book, on="sku_code", how="left", indicator=True)

# Compute expected revenue and pricing variance
df_merged["expected_unit_price"] = df_merged["list_price"] * (1 - df_merged["approved_discount_pct"])
df_merged["price_variance_per_unit"] = df_merged["billed_unit_price"] - df_merged["expected_unit_price"]
df_merged["total_margin_leakage"] = (df_merged["price_variance_per_unit"] * df_merged["volume_cartons"]).clip(upper=0).abs()

print("=== COMMERCIAL RECONCILIATION AUDIT ===")
print(f"Total Invoices: {len(df_merged)}")
print(f"Orphan Keys Detected: {len(df_merged[df_merged['_merge'] == 'left_only'])}")
print(f"Total Quantified Margin Leakage: ৳{df_merged['total_margin_leakage'].sum():,.2f}")
print(df_merged[["invoice_id", "sku_code", "billed_unit_price", "expected_unit_price", "total_margin_leakage"]])
`,
    sampleOutput: `=== COMMERCIAL RECONCILIATION AUDIT ===
Total Invoices: 4
Orphan Keys Detected: 1
Total Quantified Margin Leakage: ৳140.00
  invoice_id sku_code  billed_unit_price  expected_unit_price  total_margin_leakage
0    INV-881   SKU-10               48.0                47.50                  0.00
1    INV-882   SKU-20               52.0                50.00                  0.00
2    INV-883   SKU-30               39.0                39.20                140.00
3    INV-884   SKU-99               45.0                  NaN                  0.00
[PROCESSED] Ingestion: 4 rows | Row multiplication check: PASS | Exit: 0 (SUCCESS)`
  },
  duckdb_analytics: {
    id: "duckdb_analytics",
    title: "4. DuckDB Columnar SQL & Aggregation Engine",
    filename: "duckdb_sales_pushdown.py",
    desc: "Executes push-down SQL queries directly against datasets with sub-second execution without RAM bottlenecks.",
    starterCode: `import duckdb
import pandas as pd

# Sample sales transaction ledger
df_sample = pd.DataFrame({
    "region": ["Dhaka", "Dhaka", "Chittagong", "Chittagong", "Sylhet"],
    "division": ["Commercial", "Retail", "Commercial", "Modern Trade", "Retail"],
    "revenue_bdt": [4500000, 1200000, 3100000, 950000, 1800000],
    "collection_days": [28, 45, 32, 55, 30]
})

# In-memory vectorized DuckDB push-down aggregation
query = """
    SELECT 
        region,
        COUNT(*) AS depot_count,
        SUM(revenue_bdt) AS total_revenue_bdt,
        ROUND(AVG(collection_days), 1) AS avg_dso_days
    FROM df_sample
    GROUP BY region
    ORDER BY total_revenue_bdt DESC
"""

result = duckdb.query(query).to_df()
print("=== DUCKDB VECTORIZED AGGREGATION ===")
print(result)
`,
    sampleOutput: `=== DUCKDB VECTORIZED AGGREGATION ===
       region  depot_count  total_revenue_bdt  avg_dso_days
0       Dhaka            2            5700000          36.5
1  Chittagong            2            4050000          43.5
2      Sylhet            1            1800000          30.0
[PROCESSED] Vectorized SQL Push-Down: 5 rows | Query Time: 2.4ms | Exit: 0 (SUCCESS)`
  }
};

const DEBUG_SCENARIOS = [
  {
    id: 1,
    title: "KeyError: 'Invoice_Date' (ERP Schema Drift)",
    context: "SAP ERP export upgraded overnight, changing column header 'Invoice_Date' to 'BillDate'. The automated morning pipeline crashed on line 24.",
    brokenCode: `def parse_sales_dump(df):
    # Crashes with KeyError: 'Invoice_Date'
    df["parsed_date"] = pd.to_datetime(df["Invoice_Date"])
    return df`,
    traceback: `Traceback (most recent call last):
  File "daily_pipeline.py", line 24, in parse_sales_dump
    df["parsed_date"] = pd.to_datetime(df["Invoice_Date"])
  File "pandas/core/frame.py", line 3807, in __getitem__
KeyError: 'Invoice_Date'`,
    options: [
      { text: "Add date_col = 'Invoice_Date' if 'Invoice_Date' in df.columns else 'BillDate'", isCorrect: true, reason: "Defensive column fallback adapts dynamically to schema drift without crashing." },
      { text: "Wrap the script in sys.exit(0) to bypass error", isCorrect: false, reason: "Bypassing the error drops dates completely and corrupts downstream time-series." },
      { text: "Delete the date column from the dataframe", isCorrect: false, reason: "Deleting mandatory dates destroys monthly reporting capabilities." }
    ],
    instructorTip: "Always validate expected schema columns with a set intersection check (`MANDATORY_COLS.issubset(df.columns)`) at the head of your ingestion function."
  },
  {
    id: 2,
    title: "Cartesian Multiplication (Duplicate Join Keys)",
    context: "A merge between 100,000 invoices and product dimension expanded into 180,000 rows, artificially inflating total reported revenue by ৳42 Million.",
    brokenCode: `merged = pd.merge(invoices, products, on="product_id", how="left")
# pre-merge rows: 100,000 | post-merge rows: 180,000!`,
    traceback: `CRITICAL AUDIT EXCEPTION:
  Initial Invoices: 100,000 | Merged Rows: 180,000 (+80% row multiplication!)
  Financial Variance: +৳42,000,000 over actual cash collections`,
    options: [
      { text: "Add validate='many_to_one' in pd.merge() and deduplicate products before joining", isCorrect: true, reason: "validate='many_to_one' enforces that product_id is strictly unique in the right dimension table." },
      { text: "Change how='left' to how='inner'", isCorrect: false, reason: "An inner join still duplicates rows if duplicate keys exist on the right table." },
      { text: "Divide all invoice totals by 1.8", isCorrect: false, reason: "Arbitrary numeric scaling violates accounting standards and conceals corrupted row linkage." }
    ],
    instructorTip: "Always check `assert dimension_df['key'].is_unique` and supply `validate='many_to_one'` when joining transactions with dimension tables."
  },
  {
    id: 3,
    title: "ValueError: could not convert string to float: '1,45,000/='",
    context: "Depot transaction ledger contains Bangladeshi currency suffixes ('/='), commas, and spaces. Direct float cast throws unhandled ValueError.",
    brokenCode: `raw_val = "1,45,000 /="
amount = float(raw_val) # Crashes with ValueError`,
    traceback: `Traceback (most recent call last):
  File "cleaner.py", line 12, in parse_amount
    amount = float(raw_val)
ValueError: could not convert string to float: '1,45,000 /='`,
    options: [
      { text: "amount = float(re.sub(r'[^0-9.]', '', raw_val))", isCorrect: true, reason: "Regular expression strips all non-numeric characters, commas, and currency symbols prior to float conversion." },
      { text: "amount = int(raw_val)", isCorrect: false, reason: "int() also crashes on non-numeric characters and commas." },
      { text: "amount = 0.0", isCorrect: false, reason: "Zeroing out amounts results in severe loss of sales data." }
    ],
    instructorTip: "Strip non-numeric characters using regex `[^0-9.]` or chaining `.replace(',', '').replace('/=', '').strip()` before casting."
  }
];

const DATASET_PREVIEWS: Record<string, { filename: string; format: string; size: string; rows: number; columns: string[]; sampleRows: any[]; notes: string }> = {
  raw_vendor_payments: {
    filename: "raw_vendor_payments.txt",
    format: "Semi-structured text",
    size: "1.2 MB",
    rows: 4850,
    columns: ["Raw Text Entry", "Identified Anomaly"],
    sampleRows: [
      { col1: "  Vendor: PRAN FOODS LTD ; Routing: 010271101 ; Amount: BDT 1,45,000 /=", col2: "Trailing space + currency suffix '/='" },
      { col1: "Vendor: square pharma ; Routing: 020150992 ; Amount: Tk 2,80,000.50", col2: "Lowercase casing + 'Tk' prefix" },
      { col1: "  Vendor:  Beximco Ltd. ; Routing: 999999999 ; Amount: 95,000 /=", col2: "[FLAG] Unmapped routing code '999999999'" },
      { col1: "Vendor: AKIJ MOTORS ; Routing: 010271101 ; Amount: -15,000 /=", col2: "[FLAG] Negative amount (-৳15,000)" },
    ],
    notes: "Synthetic dataset containing inconsistent delimiters (; , |), leading zeros in routing numbers, and invalid payout amounts."
  },
  commercial_invoices: {
    filename: "commercial_invoices.csv",
    format: "CSV (Comma-Separated)",
    size: "24.5 MB",
    rows: 250000,
    columns: ["Invoice_ID", "Depot_Code", "SKU_Code", "Volume_Cartons", "Billed_Rate"],
    sampleRows: [
      { col1: "INV-2026-00192", col2: "DHK-DEP-01", col3: "SKU-DET-500G", col4: "150", col5: "৳ 48.50" },
      { col1: "INV-2026-00193", col2: "CTG-DEP-04", col3: "SKU-SOAP-125G", col4: "85", col5: "৳ 52.00" },
      { col1: "INV-2026-00194", col2: "SYL-DEP-02", col3: "SKU-SHMP-200ML", col4: "220", col5: "৳ 39.00" },
      { col1: "INV-2026-00195", col2: "DHK-DEP-02", col3: "SKU-ORPHAN-99", col4: "40", col5: "৳ 65.00 ([FLAG] Orphan SKU)" },
    ],
    notes: "250,000-row benchmark ledger with intentional price overrides and orphan product keys."
  },
  workforce_master: {
    filename: "workforce_master.xlsx",
    format: "Excel Workbook (.xlsx)",
    size: "4.8 MB",
    rows: 12400,
    columns: ["Emp_ID", "Department", "Hire_Date", "Base_Salary", "Status"],
    sampleRows: [
      { col1: "E-10024", col2: "Commercial Finance", col3: "2024-03-15", col4: "৳ 125,000", col5: "ACTIVE" },
      { col1: "E-10025", col2: "Supply Chain", col3: "15/05/2023", col4: "৳ 92,000", col5: "ACTIVE" },
      { col1: "E-10026", col2: "Executive Leadership", col3: "2022.11.01", col4: "৳ 380,000", col5: "ACTIVE" },
      { col1: "E-10027", col2: "Unassigned", col3: "INVALID_DATE", col4: "-৳ 14,000", col5: "[FLAG] REJECTED" },
    ],
    notes: "Workforce payroll with 4 rows of metadata banners, mixed date encodings, and negative retroactive deductions."
  }
};

export default function PythonAnalyticsStudio({ lessonSlug, courseSlug }: PythonAnalyticsStudioProps) {
  const [activeTab, setActiveTab] = useState<"editor" | "datasets" | "debugger">("editor");
  const [activePresetKey, setActivePresetKey] = useState<string>("vendor_audit");
  const [editorCode, setEditorCode] = useState<string>(PYTHON_PRESETS.vendor_audit.starterCode);
  const [consoleOutput, setConsoleOutput] = useState<string>(PYTHON_PRESETS.vendor_audit.sampleOutput);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Dataset State
  const [activeDatasetKey, setActiveDatasetKey] = useState<string>("raw_vendor_payments");

  // Debugger State
  const [activeDebugIdx, setActiveDebugIdx] = useState<number>(0);
  const [selectedFixIdx, setSelectedFixIdx] = useState<number | null>(null);
  const [debugFeedback, setDebugFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Shortcut Modal
  const [showShortcutModal, setShowShortcutModal] = useState<boolean>(false);

  // Update starter code when preset changes
  const handleSelectPreset = (key: string) => {
    setActivePresetKey(key);
    const preset = PYTHON_PRESETS[key];
    if (preset) {
      setEditorCode(preset.starterCode);
      setConsoleOutput(preset.sampleOutput);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      } else if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setShowShortcutModal((prev) => !prev);
      } else if (e.key === "Escape") {
        setShowShortcutModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editorCode]);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput("Initializing Python 3.12 sandbox runtime...\nExecuting pipeline with memory isolation...");
    setTimeout(() => {
      setIsRunning(false);
      const preset = PYTHON_PRESETS[activePresetKey];
      setConsoleOutput(preset ? preset.sampleOutput : "Process finished with exit code 0.");
    }, 700);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    const preset = PYTHON_PRESETS[activePresetKey];
    const filename = preset ? preset.filename : "script.py";
    const blob = new Blob([editorCode], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDataset = (datasetKey: string) => {
    const ds = DATASET_PREVIEWS[datasetKey];
    if (!ds) return;
    let content = "";
    if (datasetKey === "raw_vendor_payments") {
      content = "Vendor: PRAN FOODS LTD ; Routing: 010271101 ; Amount: BDT 1,45,000 /=\nVendor: square pharma ; Routing: 020150992 ; Amount: Tk 2,80,000.50\nVendor: Beximco Ltd. ; Routing: 999999999 ; Amount: 95,000 /=\nVendor: AKIJ MOTORS ; Routing: 010271101 ; Amount: -15,000 /=";
    } else {
      content = "Invoice_ID,Depot_Code,SKU_Code,Volume_Cartons,Billed_Rate\nINV-2026-00192,DHK-DEP-01,SKU-DET-500G,150,48.50\nINV-2026-00193,CTG-DEP-04,SKU-SOAP-125G,85,52.00\nINV-2026-00194,SYL-DEP-02,SKU-SHMP-200ML,220,39.00";
    }
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ds.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVerifyDebugFix = (idx: number) => {
    setSelectedFixIdx(idx);
    const scenario = DEBUG_SCENARIOS[activeDebugIdx];
    const option = scenario.options[idx];
    if (option) {
      setDebugFeedback({
        isCorrect: option.isCorrect,
        text: option.isCorrect
          ? `PASS: ${option.reason}`
          : `FAILED: ${option.reason}`
      });
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-xl border-2 border-blue-500 shadow-[6px_6px_0px_0px_#2563eb] space-y-6" style={{ background: "var(--corp-surface)" }}>
      {/* ── Studio Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-corp-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
            <Terminal size={18} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
              Enterprise Python Analytics &amp; Automation Studio
            </h3>
            <p className="text-[11px] font-mono text-blue-400 font-bold">
              Python 3.12+ · pandas · openpyxl · DuckDB · SQLAlchemy · REST APIs
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-corp-bg-secondary p-1 rounded-lg border border-corp-border">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-3 py-1 rounded text-xs font-mono font-extrabold transition-all flex items-center gap-1.5 ${activeTab === "editor" ? "bg-blue-600 text-white shadow-sm" : "text-corp-text hover:text-blue-400"}`}
          >
            <Code size={13} />
            <span>1. Code Sandbox</span>
          </button>
          <button
            onClick={() => setActiveTab("datasets")}
            className={`px-3 py-1 rounded text-xs font-mono font-extrabold transition-all flex items-center gap-1.5 ${activeTab === "datasets" ? "bg-blue-600 text-white shadow-sm" : "text-corp-text hover:text-blue-400"}`}
          >
            <Database size={13} />
            <span>2. Corporate Datasets</span>
          </button>
          <button
            onClick={() => setActiveTab("debugger")}
            className={`px-3 py-1 rounded text-xs font-mono font-extrabold transition-all flex items-center gap-1.5 ${activeTab === "debugger" ? "bg-blue-600 text-white shadow-sm" : "text-corp-text hover:text-blue-400"}`}
          >
            <ShieldCheck size={13} />
            <span>3. Debugging Gym</span>
          </button>
          <button
            onClick={() => setShowShortcutModal(true)}
            title="Keyboard Shortcuts (?)"
            className="p-1 rounded text-corp-text-tertiary hover:text-corp-text hover:bg-corp-surface"
          >
            <Keyboard size={15} />
          </button>
        </div>
      </div>

      {/* ── 1. Interactive Code Sandbox Tab ── */}
      {activeTab === "editor" && (
        <div className="space-y-4 font-mono text-xs">
          {/* Preset Selector Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-corp-bg-secondary border border-corp-border">
            <span className="text-[11px] font-bold text-corp-text-secondary uppercase">
              Select Production Workflow:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(PYTHON_PRESETS).map((k) => (
                <button
                  key={k}
                  onClick={() => handleSelectPreset(k)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all ${activePresetKey === k ? "bg-blue-600 text-white border-blue-400 shadow-sm" : "bg-corp-surface border-corp-border text-corp-text hover:border-blue-400"}`}
                >
                  {PYTHON_PRESETS[k].id === "vendor_audit" ? "Vendor Audit" : PYTHON_PRESETS[k].id === "file_scanner" ? "File Scanner" : PYTHON_PRESETS[k].id === "relational_merge" ? "Relational Merge" : "DuckDB SQL"}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor Window */}
          <div className="rounded-xl overflow-hidden border-2 border-corp-border bg-[#0d1117] text-slate-100 shadow-md">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-corp-border/40 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-slate-300 font-bold ml-1">
                  {PYTHON_PRESETS[activePresetKey]?.filename || "script.py"}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Python 3.12+
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-slate-200 transition-colors text-[10px] font-bold"
                >
                  {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCode ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={handleDownloadCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-slate-200 transition-colors text-[10px] font-bold"
                >
                  <Download size={12} />
                  <span>Download .py</span>
                </button>
              </div>
            </div>

            {/* Editor Area with Line Numbers */}
            <div className="p-4 flex gap-4 overflow-x-auto text-xs leading-relaxed max-h-[380px] overflow-y-auto">
              <div className="select-none text-slate-600 text-right pr-2 border-r border-slate-800">
                {editorCode.split("\n").map((_, i) => (
                  <div key={i} className="leading-relaxed">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                spellCheck={false}
                className="w-full bg-transparent text-slate-200 outline-none resize-none font-mono leading-relaxed min-h-[320px] whitespace-pre"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-3 bg-[#161b22] border-t border-corp-border/40">
              <span className="text-[10px] text-slate-400">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Ctrl+Enter</kbd> to run
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const preset = PYTHON_PRESETS[activePresetKey];
                    if (preset) setEditorCode(preset.starterCode);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold text-slate-300 hover:text-white bg-[#21262d] hover:bg-[#30363d] transition-all"
                >
                  <RotateCcw size={13} />
                  <span>Reset Starter</span>
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all disabled:opacity-50 uppercase tracking-wider"
                >
                  <Play size={13} className="fill-current" />
                  <span>{isRunning ? "Executing..." : "Run Pipeline"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Terminal STDOUT Console */}
          <div className="p-4 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-corp-text uppercase">
              <span className="flex items-center gap-1.5">
                <Terminal size={14} className="text-blue-400" /> STDOUT Execution Console
              </span>
              <span className="text-emerald-400 text-[10px]">Virtualenv: .venv (Active)</span>
            </div>
            <pre className="p-3.5 rounded-lg bg-[#0a0e14] text-emerald-400 text-xs overflow-x-auto leading-relaxed border border-corp-border font-mono whitespace-pre-wrap">
              {consoleOutput}
            </pre>
          </div>
        </div>
      )}

      {/* ── 2. Corporate Datasets Tab ── */}
      {activeTab === "datasets" && (
        <div className="space-y-5 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(DATASET_PREVIEWS).map((k) => {
              const ds = DATASET_PREVIEWS[k];
              return (
                <button
                  key={k}
                  onClick={() => setActiveDatasetKey(k)}
                  className={`p-3.5 rounded-lg border-2 text-left transition-all ${activeDatasetKey === k ? "bg-blue-500/15 border-blue-500 text-blue-400 shadow-[3px_3px_0px_0px_#2563eb]" : "bg-corp-bg-secondary border-corp-border text-corp-text hover:border-blue-400"}`}
                >
                  <p className="font-extrabold text-xs">{ds.filename}</p>
                  <p className="text-[10px] text-corp-text-tertiary mt-1">{ds.format} · {ds.size}</p>
                </button>
              );
            })}
          </div>

          {/* Dataset Detail Card */}
          {DATASET_PREVIEWS[activeDatasetKey] && (
            <div className="p-5 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-corp-border pb-3">
                <div>
                  <h4 className="text-sm font-extrabold text-corp-text">
                    {DATASET_PREVIEWS[activeDatasetKey].filename}
                  </h4>
                  <p className="text-[11px] text-corp-text-secondary mt-0.5">
                    {DATASET_PREVIEWS[activeDatasetKey].notes}
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadDataset(activeDatasetKey)}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold bg-blue-600 text-white hover:bg-blue-500 transition-colors uppercase shrink-0"
                >
                  <Download size={14} /> Download Sample File
                </button>
              </div>

              {/* Sample Table Preview */}
              <div className="overflow-x-auto rounded-lg border border-corp-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-corp-surface border-b border-corp-border text-corp-text-secondary">
                    <tr>
                      {DATASET_PREVIEWS[activeDatasetKey].columns.map((c, i) => (
                        <th key={i} className="p-2.5 font-bold uppercase text-[10px]">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y border-corp-border bg-corp-bg-secondary/40">
                    {DATASET_PREVIEWS[activeDatasetKey].sampleRows.map((row, i) => (
                      <tr key={i} className="hover:bg-corp-surface/50">
                        <td className="p-2.5 font-mono text-corp-text">{row.col1}</td>
                        <td className="p-2.5 font-mono text-amber-400 font-bold">{row.col2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 3. Debugging Gym Tab ── */}
      {activeTab === "debugger" && (
        <div className="space-y-5 font-mono text-xs">
          <div className="p-3.5 rounded-lg bg-corp-bg-secondary border border-corp-border text-corp-text leading-relaxed">
            <span className="font-extrabold text-blue-400 uppercase">Enterprise Exception Forensics:</span> Real production scripts fail on unexpected schemas, duplicate keys, or dirty data types. Inspect the broken corporate snippet and tracebacks below. Select the correct programmatic fix to pass the audit!
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {DEBUG_SCENARIOS.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => { setActiveDebugIdx(i); setSelectedFixIdx(null); setDebugFeedback(null); }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all ${activeDebugIdx === i ? "bg-blue-600 text-white border-blue-400 shadow-[2px_2px_0px_0px_#2563eb]" : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-blue-400"}`}
              >
                Case #{sc.id}: {sc.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          {DEBUG_SCENARIOS[activeDebugIdx] && (
            <div className="p-5 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-extrabold">
                  Corporate Bug Case #{DEBUG_SCENARIOS[activeDebugIdx].id}
                </span>
                <h4 className="text-sm font-extrabold text-corp-text">
                  {DEBUG_SCENARIOS[activeDebugIdx].title}
                </h4>
                <p className="text-[11px] text-corp-text-secondary leading-relaxed">
                  {DEBUG_SCENARIOS[activeDebugIdx].context}
                </p>
              </div>

              {/* Broken Code & Observed Traceback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#0d1117] border border-rose-500/40 text-slate-200 space-y-1.5">
                  <p className="text-[10px] font-bold text-rose-400 uppercase">Broken Script Snippet:</p>
                  <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">{DEBUG_SCENARIOS[activeDebugIdx].brokenCode}</pre>
                </div>
                <div className="p-3.5 rounded-lg bg-[#0d1117] border border-rose-500/40 text-rose-400 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase">Observed Crash Traceback:</p>
                  <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">{DEBUG_SCENARIOS[activeDebugIdx].traceback}</pre>
                </div>
              </div>

              {/* Fix Option Choices */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-extrabold uppercase text-corp-text block">
                  Select Correct Engineering Remediation:
                </label>
                {DEBUG_SCENARIOS[activeDebugIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleVerifyDebugFix(i)}
                    className={`w-full p-3.5 rounded-lg border-2 text-left text-xs transition-all flex items-start gap-2.5 ${selectedFixIdx === i ? (opt.isCorrect ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-[3px_3px_0px_0px_#059669]" : "bg-rose-500/15 border-rose-500 text-rose-400 shadow-[3px_3px_0px_0px_#e11d48]") : "bg-corp-surface border-corp-border text-corp-text hover:border-blue-400"}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-corp-bg-secondary border border-corp-border text-corp-text-secondary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed font-bold">{opt.text}</span>
                  </button>
                ))}
              </div>

              {/* Feedback Alert */}
              {debugFeedback && (
                <div className={`p-4 rounded-lg border-2 text-xs font-bold ${debugFeedback.isCorrect ? "bg-emerald-500/15 border-emerald-500 text-emerald-300" : "bg-rose-500/15 border-rose-500 text-rose-300"}`}>
                  <p>{debugFeedback.text}</p>
                  <p className="text-[11px] text-corp-text-secondary mt-1 font-normal">
                    <strong className="text-amber-400">Senior Staff Tip:</strong> {DEBUG_SCENARIOS[activeDebugIdx].instructorTip}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Shortcut Modal ── */}
      {showShortcutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowShortcutModal(false)}
        >
          <div
            className="p-6 rounded-2xl border-2 border-blue-500 bg-corp-surface max-w-md w-full space-y-4 shadow-2xl font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-corp-border pb-3">
              <h3 className="text-sm font-extrabold uppercase text-corp-text flex items-center gap-2">
                <Keyboard size={16} className="text-blue-400" /> Learning Player Shortcuts
              </h3>
              <button
                onClick={() => setShowShortcutModal(false)}
                className="p-1 rounded text-corp-text-tertiary hover:text-corp-text"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2.5 text-xs text-corp-text">
              <div className="flex items-center justify-between p-2 rounded bg-corp-bg-secondary border border-corp-border">
                <span>Run Python Pipeline</span>
                <kbd className="px-2 py-0.5 rounded bg-corp-surface border border-corp-border font-bold text-[10px]">Ctrl + Enter</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-corp-bg-secondary border border-corp-border">
                <span>Toggle Shortcut Guide</span>
                <kbd className="px-2 py-0.5 rounded bg-corp-surface border border-corp-border font-bold text-[10px]">?</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-corp-bg-secondary border border-corp-border">
                <span>Close Dialog / Modal</span>
                <kbd className="px-2 py-0.5 rounded bg-corp-surface border border-corp-border font-bold text-[10px]">Esc</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-corp-bg-secondary border border-corp-border">
                <span>Copy Active Code</span>
                <kbd className="px-2 py-0.5 rounded bg-corp-surface border border-corp-border font-bold text-[10px]">Click Copy</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
