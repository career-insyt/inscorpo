"use client";

import { useState, useId } from "react";
import {
  Database, Play, RotateCcw, Copy, Download, Check, AlertCircle,
  FileSpreadsheet, Table, HelpCircle, Code, ShieldCheck,
  Keyboard, X, ExternalLink, Sparkles, Layers, ChevronRight,
  BarChart3, GitBranch, Filter, Eye, Cpu, Award, FileText, CheckCircle2
} from "lucide-react";

interface BIPowerBISqlStudioProps {
  lessonSlug: string;
  courseSlug: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SQL SANDBOX PRESETS
// ─────────────────────────────────────────────────────────────────────────────
interface SQLPreset {
  id: string;
  title: string;
  desc: string;
  engine: string;
  sql: string;
  columns: string[];
  rows: (string | number)[][];
  explainPlan: string[];
}

const SQL_PRESETS: Record<string, SQLPreset> = {
  pvm_margin_collapse: {
    id: "pvm_margin_collapse",
    title: "1. FMCG Margin Collapse & Price-Volume-Mix Diagnostic",
    desc: "Joins 4.8M order details with product dimension to isolate why North Zone gross margin collapsed 18% despite 6% volume growth.",
    engine: "PostgreSQL 16.2 / Push-Down",
    sql: `WITH regional_performance AS (
    SELECT 
        r.region_name,
        p.category_name,
        SUM(d.units_sold) AS total_units,
        SUM(d.units_sold * d.base_price) AS gross_sales_bdt,
        SUM(d.units_sold * d.trade_discount) AS trade_spend_bdt,
        SUM(d.units_sold * (d.base_price - d.cost_per_unit - d.trade_discount)) AS operating_margin_bdt,
        ROUND(
            (SUM(d.units_sold * (d.base_price - d.cost_per_unit - d.trade_discount)) / 
             NULLIF(SUM(d.units_sold * d.base_price), 0)) * 100, 2
        ) AS operating_margin_pct
    FROM fmcg_orders_detail d
    INNER JOIN fmcg_orders_header h ON d.order_id = h.order_id
    INNER JOIN dim_products p ON d.product_id = p.product_id
    INNER JOIN dim_regions r ON h.region_id = r.region_id
    WHERE h.order_status NOT IN ('CANCELLED', 'RETURNED')
      AND h.order_date >= '2026-01-01'
    GROUP BY r.region_name, p.category_name
)
SELECT 
    region_name,
    category_name,
    total_units,
    ROUND(gross_sales_bdt / 1000000, 2) AS gross_sales_m_bdt,
    ROUND(trade_spend_bdt / 1000000, 2) AS trade_spend_m_bdt,
    ROUND(operating_margin_bdt / 1000000, 2) AS operating_margin_m_bdt,
    operating_margin_pct
FROM regional_performance
ORDER BY gross_sales_bdt DESC;`,
    columns: ["region_name", "category_name", "total_units", "gross_sales_m_bdt", "trade_spend_m_bdt", "operating_margin_m_bdt", "operating_margin_pct"],
    rows: [
      ["North Zone", "Beverages & Dairy", 1850000, 92.50, 24.80, 11.20, 12.11],
      ["North Zone", "Packaged Foods", 1420000, 71.00, 18.20, 9.80, 13.80],
      ["Dhaka Metro", "Personal Care", 1120000, 67.20, 6.70, 24.10, 35.86],
      ["Dhaka Metro", "Beverages & Dairy", 980000, 49.00, 5.10, 16.50, 33.67],
      ["Chittagong Port", "Packaged Foods", 890000, 44.50, 7.20, 11.80, 26.52],
      ["South Zone", "Personal Care", 640000, 38.40, 5.80, 10.20, 26.56],
      ["East Zone", "Beverages & Dairy", 520000, 26.00, 4.10, 6.90, 26.54]
    ],
    explainPlan: [
      "HashAggregate (cost=14238.10..14245.30 rows=72 width=84)",
      "  Group Key: r.region_name, p.category_name",
      "  -> Hash Join (cost=2145.20..11890.45 rows=125000 width=52)",
      "        Hash Cond: (h.region_id = r.region_id)",
      "        -> Hash Join (cost=1980.10..10540.20 rows=125000 width=48)",
      "              Hash Cond: (d.product_id = p.product_id)",
      "              -> Hash Join (cost=1520.00..8940.10 rows=125000 width=40)",
      "                    Hash Cond: (d.order_id = h.order_id)",
      "                    -> Seq Scan on fmcg_orders_detail d (cost=0.00..5420.00 rows=4800000)",
      "                    -> Hash (cost=1120.00..1120.00 rows=1400000)",
      "                          -> Index Scan using idx_orders_header_status on fmcg_orders_header h",
      "                                Filter: (order_status <> ALL ('{CANCELLED,RETURNED}'::text[]))",
      "Planning Time: 2.14 ms | Execution Time: 48.62 ms | Status: Complete"
    ]
  },
  window_cohort_retention: {
    id: "window_cohort_retention",
    title: "2. Telecom Cohort Retention & LAG Period Pacing",
    desc: "Uses SQL window functions (OVER, PARTITION BY, LAG) over 850k records to calculate month-over-month subscriber retention and ARPU growth.",
    engine: "DuckDB In-Memory Columnar Engine",
    sql: `WITH subscriber_activity AS (
    SELECT 
        subscriber_id,
        DATE_TRUNC('month', acquisition_date) AS cohort_month,
        DATE_TRUNC('month', billing_date) AS activity_month,
        monthly_spend_bdt
    FROM telecom_subscriber_ledger
),
cohort_summary AS (
    SELECT 
        cohort_month,
        activity_month,
        COUNT(DISTINCT subscriber_id) AS active_subscribers,
        SUM(monthly_spend_bdt) AS total_revenue_bdt,
        ROUND(AVG(monthly_spend_bdt), 2) AS arpu_bdt
    FROM subscriber_activity
    GROUP BY cohort_month, activity_month
)
SELECT 
    cohort_month::DATE,
    activity_month::DATE,
    active_subscribers,
    LAG(active_subscribers, 1) OVER (
        PARTITION BY cohort_month 
        ORDER BY activity_month
    ) AS prior_month_subscribers,
    ROUND(
        (active_subscribers::FLOAT / 
         FIRST_VALUE(active_subscribers) OVER (
             PARTITION BY cohort_month 
             ORDER BY activity_month
         )) * 100, 1
    ) AS retention_rate_pct,
    arpu_bdt
FROM cohort_summary
ORDER BY cohort_month, activity_month;`,
    columns: ["cohort_month", "activity_month", "active_subscribers", "prior_month_subscribers", "retention_rate_pct", "arpu_bdt"],
    rows: [
      ["2026-01-01", "2026-01-01", 124000, "—", 100.0, 342.50],
      ["2026-01-01", "2026-02-01", 108500, 124000, 87.5, 355.20],
      ["2026-01-01", "2026-03-01", 96800, 108500, 78.1, 368.10],
      ["2026-02-01", "2026-02-01", 135000, "—", 100.0, 338.90],
      ["2026-02-01", "2026-03-01", 116100, 135000, 86.0, 351.40],
      ["2026-03-01", "2026-03-01", 142000, "—", 100.0, 345.00]
    ],
    explainPlan: [
      "Window (active_subscribers, LAG(), FIRST_VALUE())",
      "  -> Sort (cohort_month ASC, activity_month ASC)",
      "        -> HashAggregate (GROUP BY cohort_month, activity_month)",
      "              -> Projection (DATE_TRUNC(), monthly_spend_bdt)",
      "                    -> Parquet / DuckDB Columnar Scan on telecom_subscriber_ledger (850,000 rows)",
      "Execution Time: 12.4 ms | Memory: 18.2 MB | Push-Down: Enabled"
    ]
  },
  ledger_dedup_cte: {
    id: "ledger_dedup_cte",
    title: "3. MFS Transaction Deduplication & Reconciliation",
    desc: "Deduplicates 3.2M mobile financial ledger rows using ROW_NUMBER() over idempotency keys and reconciles settled control totals.",
    engine: "PostgreSQL 16.2 / Read Replica",
    sql: `WITH ranked_transactions AS (
    SELECT 
        tx_id,
        agent_id,
        channel,
        amount_bdt,
        tx_timestamp,
        ROW_NUMBER() OVER (
            PARTITION BY tx_id 
            ORDER BY sync_timestamp DESC
        ) AS row_rank
    FROM mfs_transaction_ledger
    WHERE tx_timestamp >= '2026-03-01'
),
quarantined_duplicates AS (
    SELECT * FROM ranked_transactions WHERE row_rank > 1
),
cleared_settlements AS (
    SELECT * FROM ranked_transactions WHERE row_rank = 1
)
SELECT 
    'CLEARED TRANSACTIONS' AS audit_status,
    COUNT(*) AS record_count,
    ROUND(SUM(amount_bdt) / 1000000, 2) AS total_settled_m_bdt
FROM cleared_settlements
UNION ALL
SELECT 
    'QUARANTINED DUPLICATES' AS audit_status,
    COUNT(*) AS record_count,
    ROUND(SUM(amount_bdt) / 1000000, 2) AS total_settled_m_bdt
FROM quarantined_duplicates;`,
    columns: ["audit_status", "record_count", "total_settled_m_bdt"],
    rows: [
      ["CLEARED TRANSACTIONS", 3184200, 4825.40],
      ["QUARANTINED DUPLICATES", 15800, 24.15]
    ],
    explainPlan: [
      "Append (cost=2410.00..5890.00 rows=2 width=40)",
      "  -> Aggregate (CLEARED)",
      "        -> Subquery Scan on ranked_transactions (Filter: row_rank = 1)",
      "              -> WindowAgg (ROW_NUMBER() OVER (PARTITION BY tx_id))",
      "                    -> Sort (tx_id, sync_timestamp DESC)",
      "                          -> Seq Scan on mfs_transaction_ledger (3,200,000 rows)",
      "Execution Time: 34.1 ms | Buffer Hits: 99.4% | Control Totals: Reconciled"
    ]
  },
  supply_chain_unmatched: {
    id: "supply_chain_unmatched",
    title: "4. Retail Supply Chain Multi-Table Orphan Key Audit",
    desc: "Performs diagnostic outer joins across 8 supply chain tables to catch unfulfilled purchase orders and orphaned shipment keys.",
    engine: "PostgreSQL 16.2 / Analytical DW",
    sql: `SELECT 
    po.po_number,
    po.supplier_id,
    po.order_date,
    po.total_order_bdt,
    s.shipment_id,
    s.delivery_status,
    inv.warehouse_id,
    CASE 
        WHEN s.shipment_id IS NULL THEN 'ORPHAN_PO_NO_SHIPMENT'
        WHEN inv.warehouse_id IS NULL THEN 'SHIPPED_NOT_STOCKED'
        ELSE 'RECONCILED'
    END AS supply_chain_flag
FROM purchase_order_headers po
LEFT JOIN shipments s ON po.po_number = s.po_number
LEFT JOIN warehouse_inventory_receipts inv ON s.shipment_id = inv.shipment_id
WHERE po.order_date >= CURRENT_DATE - INTERVAL '60 days'
  AND (s.shipment_id IS NULL OR inv.warehouse_id IS NULL)
ORDER BY po.total_order_bdt DESC
LIMIT 10;`,
    columns: ["po_number", "supplier_id", "order_date", "total_order_bdt", "shipment_id", "delivery_status", "warehouse_id", "supply_chain_flag"],
    rows: [
      ["PO-2026-8812", "SUP-401", "2026-02-14", 4250000, "—", "—", "—", "ORPHAN_PO_NO_SHIPMENT"],
      ["PO-2026-8845", "SUP-108", "2026-02-18", 3800000, "—", "—", "—", "ORPHAN_PO_NO_SHIPMENT"],
      ["PO-2026-9012", "SUP-220", "2026-02-22", 2950000, "SHP-4401", "IN_TRANSIT_DELAYED", "—", "SHIPPED_NOT_STOCKED"],
      ["PO-2026-9140", "SUP-312", "2026-03-01", 1850000, "—", "—", "—", "ORPHAN_PO_NO_SHIPMENT"],
      ["PO-2026-9205", "SUP-108", "2026-03-05", 1420000, "SHP-4512", "CUSTOMS_HOLD", "—", "SHIPPED_NOT_STOCKED"]
    ],
    explainPlan: [
      "Limit (cost=1420.00..1425.00 rows=5 width=68)",
      "  -> Sort (total_order_bdt DESC)",
      "        -> Hash Left Join (cost=450.00..1280.00 rows=480 width=68)",
      "              -> Hash Left Join (purchase_order_headers -> shipments)",
      "              -> Hash (warehouse_inventory_receipts)",
      "Execution Time: 8.9 ms | Unmatched Records Flagged: 48 | Financial Risk: ৳14.27M"
    ]
  }
};

export function BIPowerBISqlStudio({ lessonSlug, courseSlug }: BIPowerBISqlStudioProps) {
  const [activeTab, setActiveTab] = useState<"sql_sandbox" | "dax_context" | "star_schema" | "power_query" | "dashboard_critique">("sql_sandbox");
  const uniqueId = useId();

  // ── 1. SQL Sandbox State ──────────────────────────────────────────────────
  const [selectedPresetId, setSelectedPresetId] = useState<string>("pvm_margin_collapse");
  const [activeSql, setActiveSql] = useState<string>(SQL_PRESETS.pvm_margin_collapse.sql);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showExplain, setShowExplain] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);

  const currentPreset = SQL_PRESETS[selectedPresetId] || SQL_PRESETS.pvm_margin_collapse;

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    setActiveSql(SQL_PRESETS[id].sql);
    setShowExplain(false);
  };

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 380);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ── 2. DAX Filter Context Visualizer State ────────────────────────────────
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [contextMode, setContextMode] = useState<"filter" | "row">("filter");

  // Dynamic values based on slicer selection
  const rawBaseRevenue = 388.60;
  const regionFactors: Record<string, { rev: number; margin: number; tradeSpend: number; rows: number }> = {
    "All": { rev: 388.60, margin: 80.70, tradeSpend: 66.10, rows: 4800000 },
    "North Zone": { rev: 163.50, margin: 23.20, tradeSpend: 43.00, rows: 2150000 }, // 14.2% margin: (23.20 / 163.50) * 100
    "Dhaka Metro": { rev: 116.20, margin: 40.60, tradeSpend: 11.80, rows: 1420000 },
    "Chittagong Port": { rev: 64.50, margin: 15.20, tradeSpend: 8.10, rows: 790000 },
    "South/East Zone": { rev: 44.40, margin: 3.90, tradeSpend: 3.20, rows: 440000 }
  };

  const activeStats = regionFactors[selectedRegion] || regionFactors["All"];
  const marginPct = ((activeStats.margin / activeStats.rev) * 100).toFixed(1);
  const tradeSpendPct = ((activeStats.tradeSpend / activeStats.rev) * 100).toFixed(1);

  // ── 3. Star Schema Explorer State ─────────────────────────────────────────
  const [selectedModelTable, setSelectedModelTable] = useState<string>("fmcg_orders_detail");
  const [modelAuditTest, setModelAuditTest] = useState<string | null>(null);

  // ── 4. Power Query Applied Steps State ────────────────────────────────────
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(3); // Changed Type default

  const PQ_STEPS = [
    {
      step: "Source",
      mCode: `PostgreSQL.Database(#"ServerEndpoint", #"DatabaseName", [CreateNavigationProperties=false])`,
      folded: true,
      desc: "Connects to PostgreSQL read-replica using environment parameters (#ServerEndpoint, #DatabaseName) with connection pooling enabled.",
      preview: [
        { id: 101, sku: "SKU-BEV-01", date: "2026-03-01 09:14:00", units: "450", gross: "22500.00", disc: "4500.00" },
        { id: 102, sku: "SKU-FD-08", date: "2026-03-01 09:22:00", units: "120", gross: "9600.00", disc: "960.00" },
        { id: 103, sku: "SKU-PC-14", date: "2026-03-01 09:30:00", units: "600", gross: "36000.00", disc: "1800.00" }
      ]
    },
    {
      step: "Promoted Headers",
      mCode: `Table.PromoteHeaders(Source, [PromoteAllScalars=true])`,
      folded: true,
      desc: "Standardizes database column titles into first row schema fields.",
      preview: [
        { Order_ID: "101", SKU_Code: "SKU-BEV-01", Order_Date: "2026-03-01", Units_Sold: "450", Gross_BDT: "22500.00" },
        { Order_ID: "102", SKU_Code: "SKU-FD-08", Order_Date: "2026-03-01", Units_Sold: "120", Gross_BDT: "9600.00" },
        { Order_ID: "103", SKU_Code: "SKU-PC-14", Order_Date: "2026-03-01", Units_Sold: "600", Gross_BDT: "36000.00" }
      ]
    },
    {
      step: "Changed Type",
      mCode: `Table.TransformColumnTypes(PromotedHeaders, {{"Order_ID", Int64.Type}, {"Order_Date", type date}, {"Units_Sold", Int64.Type}, {"Gross_BDT", Currency.Type}})`,
      folded: true,
      desc: "Strict type enforcement: Dates to Date, Units to 64-bit Integer, Amounts to Currency.",
      preview: [
        { Order_ID: 101, SKU_Code: "SKU-BEV-01", Order_Date: "2026-03-01", Units_Sold: 450, Gross_BDT: 22500.00 },
        { Order_ID: 102, SKU_Code: "SKU-FD-08", Order_Date: "2026-03-01", Units_Sold: 120, Gross_BDT: 9600.00 },
        { Order_ID: 103, SKU_Code: "SKU-PC-14", Order_Date: "2026-03-01", Units_Sold: 600, Gross_BDT: 36000.00 }
      ]
    },
    {
      step: "Unpivoted Other Columns (Target Matrix)",
      mCode: `Table.UnpivotOtherColumns(ChangedType, {"Region_ID", "Category"}, "Month_Name", "Target_BDT")`,
      folded: false,
      desc: "[WARNING] FOLDING BROKEN: Transforms 12 horizontal month columns into a normalized vertical grain. Evaluated in VertiPaq local memory.",
      preview: [
        { Region_ID: 1, Category: "Beverages", Month_Name: "Jan-2026", Target_BDT: 28000000.00 },
        { Region_ID: 1, Category: "Beverages", Month_Name: "Feb-2026", Target_BDT: 29500000.00 },
        { Region_ID: 1, Category: "Beverages", Month_Name: "Mar-2026", Target_BDT: 31000000.00 }
      ]
    },
    {
      step: "Filtered Cancelled Orders",
      mCode: `Table.SelectRows(Unpivoted, each ([Order_Status] <> "CANCELLED" and [Order_Status] <> "RETURNED"))`,
      folded: true,
      desc: "Excludes non-revenue transactions to preserve reconciliation control totals.",
      preview: [
        { Order_ID: 101, SKU_Code: "SKU-BEV-01", Status: "DELIVERED", Units_Sold: 450, Gross_BDT: 22500.00 },
        { Order_ID: 103, SKU_Code: "SKU-PC-14", Status: "DELIVERED", Units_Sold: 600, Gross_BDT: 36000.00 }
      ]
    }
  ];

  // ── 5. Dashboard Critique State ───────────────────────────────────────────
  const [dashboardMode, setDashboardMode] = useState<"flawed" | "redesigned">("redesigned");

  return (
    <div className="rounded-xl border-2 border-corp-border bg-corp-surface shadow-[6px_6px_0px_0px_#0284c7] overflow-hidden">
      {/* ── STUDIO HEADER BANNER ───────────────────────────────────────────── */}
      <div className="p-4 md:p-6 border-b-2 border-corp-border bg-corp-bg-secondary flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_#0369a1]">
            <Database size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-extrabold font-mono uppercase text-corp-text">
                Enterprise Business Intelligence Studio
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-sky-500/15 border border-sky-400 text-sky-400 font-mono">
                PostgreSQL · Power BI · DAX
              </span>
            </div>
            <p className="text-xs text-corp-text-tertiary font-mono mt-0.5">
              Production Query Engine · DAX Filter Context Visualizer · Star Schema ERD · Power Query M-Code
            </p>
          </div>
        </div>

        {/* Global Toolbar Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowShortcuts(true)}
            className="px-2.5 py-1.5 rounded-md text-xs font-mono font-bold border border-corp-border bg-corp-surface text-corp-text hover:border-sky-400 transition-colors flex items-center gap-1.5"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard size={13} />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>
          <button
            onClick={() => handleCopy(activeSql)}
            className="px-2.5 py-1.5 rounded-md text-xs font-mono font-bold border border-corp-border bg-corp-surface text-corp-text hover:border-sky-400 transition-colors flex items-center gap-1.5"
          >
            {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copiedCode ? "Copied" : "Copy SQL"}</span>
          </button>
          <a
            href={`/downloads/insyt-bi-capstone-starter.sql`}
            download
            className="px-3 py-1.5 rounded-md text-xs font-mono font-extrabold bg-sky-600 text-white border border-sky-400 hover:bg-sky-500 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0369a1]"
          >
            <Download size={13} />
            <span>Export .SQL</span>
          </a>
        </div>
      </div>

      {/* ── TOP NAV STUDIO TABS ────────────────────────────────────────────── */}
      <div className="flex overflow-x-auto border-b-2 border-corp-border bg-corp-surface px-2 sm:px-4">
        {[
          { key: "sql_sandbox", label: "1. SQL Query Sandbox", icon: Database },
          { key: "dax_context", label: "2. DAX Filter Context", icon: Filter },
          { key: "star_schema", label: "3. Star Schema Model", icon: GitBranch },
          { key: "power_query", label: "4. Power Query ETL", icon: Layers },
          { key: "dashboard_critique", label: "5. Dashboard Heuristic Gym", icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-mono font-extrabold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? "border-sky-400 text-sky-400 bg-sky-500/10"
                  : "border-transparent text-corp-text-secondary hover:text-corp-text hover:bg-corp-bg-secondary"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: SQL QUERY SANDBOX & INSPECTOR ───────────────────────────── */}
      {activeTab === "sql_sandbox" && (
        <div className="p-4 md:p-6 space-y-5">
          {/* Preset Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold font-mono uppercase text-sky-400 block">
                Standard Analytical Extraction Presets:
              </span>
              <p className="text-xs text-corp-text font-bold">
                {currentPreset.title}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(SQL_PRESETS).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-extrabold border transition-all ${
                    selectedPresetId === p.id
                      ? "bg-sky-600 text-white border-sky-400 shadow-sm"
                      : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-sky-400"
                  }`}
                >
                  {p.title.split(".")[0]}. {p.id.split("_")[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-corp-bg-secondary border border-corp-border text-xs text-corp-text-secondary font-mono leading-relaxed">
            <span className="text-emerald-400 font-extrabold uppercase">Business Objective: </span>
            {currentPreset.desc}
          </div>

          {/* SQL Editor Area */}
          <div className="rounded-lg border-2 border-corp-border bg-[#0b101b] overflow-hidden">
            <div className="p-2.5 bg-[#121927] border-b border-corp-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-400 font-extrabold text-[11px] uppercase">{currentPreset.engine}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExplain(!showExplain)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                    showExplain
                      ? "bg-amber-500/20 text-amber-300 border-amber-400"
                      : "bg-[#1e293b] text-slate-300 border-slate-700 hover:border-slate-500"
                  }`}
                >
                  {showExplain ? "Hide EXPLAIN" : "Inspect EXPLAIN Plan"}
                </button>
                <button
                  onClick={handleRunQuery}
                  disabled={isExecuting}
                  className="px-3 py-1 rounded text-xs font-extrabold bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#047857]"
                >
                  {isExecuting ? <RotateCcw size={12} className="animate-spin" /> : <Play size={12} />}
                  <span>{isExecuting ? "Executing..." : "Run Query (Ctrl+Enter)"}</span>
                </button>
              </div>
            </div>

            {/* Code Textarea */}
            <div className="p-3">
              <textarea
                value={activeSql}
                onChange={(e) => setActiveSql(e.target.value)}
                rows={12}
                className="w-full bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-y selection:bg-sky-900"
                spellCheck={false}
              />
            </div>
          </div>

          {/* EXPLAIN Execution Plan Inspector */}
          {showExplain && (
            <div className="p-4 rounded-lg bg-amber-500/10 border-2 border-amber-500/40 text-amber-200 font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-2 font-extrabold uppercase">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Cpu size={14} /> Query Execution Plan (EXPLAIN ANALYZE)
                </span>
                <span className="text-[10px] text-amber-300 font-bold">PostgreSQL Cost Model Verified</span>
              </div>
              {currentPreset.explainPlan.map((line, idx) => (
                <div key={idx} className="text-[11px] font-mono text-amber-100/90 pl-1">
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Query Results Inspector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table size={14} className="text-sky-400" />
                <span className="text-xs font-mono font-extrabold uppercase text-corp-text">
                  Query Output Inspector ({currentPreset.rows.length} rows returned)
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                ✔ 0 Null Key Breaches · Grain Reconciled
              </span>
            </div>

            <div className="rounded-lg border-2 border-corp-border overflow-x-auto bg-corp-bg-secondary">
              <table className="w-full min-w-[640px] text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-corp-surface border-b-2 border-corp-border text-corp-text-secondary text-[11px] uppercase">
                    {currentPreset.columns.map((col, idx) => (
                      <th key={idx} className="p-2.5 font-extrabold border-r border-corp-border last:border-r-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-corp-border text-corp-text">
                  {currentPreset.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-corp-surface/50 transition-colors">
                      {row.map((val, cIdx) => (
                        <td key={cIdx} className="p-2.5 border-r border-corp-border last:border-r-0 whitespace-nowrap">
                          {typeof val === "number" ? (
                            <span className="font-semibold text-sky-400">
                              {val.toLocaleString()}
                            </span>
                          ) : (
                            String(val)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: DAX FILTER CONTEXT VISUALIZER ───────────────────────────── */}
      {activeTab === "dax_context" && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="p-4 rounded-xl border border-corp-border bg-corp-bg-secondary space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-corp-border pb-3">
              <div>
                <h3 className="text-xs font-extrabold font-mono uppercase text-sky-400">
                  Interactive Evaluation Context Simulator
                </h3>
                <p className="text-xs text-corp-text font-bold">
                  Toggle visual slicers to observe how CALCULATE, ALL, and SAMEPERIODLASTYEAR modify table filter contexts.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setContextMode("filter")}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    contextMode === "filter" ? "bg-sky-600 text-white border-sky-400" : "bg-corp-surface text-corp-text border-corp-border"
                  }`}
                >
                  Filter Context Mode
                </button>
                <button
                  onClick={() => setContextMode("row")}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    contextMode === "row" ? "bg-purple-600 text-white border-purple-400" : "bg-corp-surface text-corp-text border-corp-border"
                  }`}
                >
                  Row Context (Iterators)
                </button>
              </div>
            </div>

            {/* Slicers Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-extrabold font-mono uppercase text-corp-text-tertiary block mb-1">
                  Region Dimension Slicer:
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-2 rounded-lg bg-corp-surface border-2 border-corp-border text-xs font-mono text-corp-text focus:outline-none focus:border-sky-400"
                >
                  <option value="All">All Regions (4 Zones)</option>
                  <option value="North Zone">North Zone (Margin Collapse Territory)</option>
                  <option value="Dhaka Metro">Dhaka Metro (High Profitability)</option>
                  <option value="Chittagong Port">Chittagong Port (Commercial Hub)</option>
                  <option value="South/East Zone">South/East Zone (Pacing Growth)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-extrabold font-mono uppercase text-corp-text-tertiary block mb-1">
                  Category Slicer:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 rounded-lg bg-corp-surface border-2 border-corp-border text-xs font-mono text-corp-text focus:outline-none focus:border-sky-400"
                >
                  <option value="All">All Categories</option>
                  <option value="Beverages">Beverages & Dairy</option>
                  <option value="Foods">Packaged Foods</option>
                  <option value="PersonalCare">Personal Care</option>
                </select>
              </div>

              <div className="p-3 rounded-lg border border-corp-border bg-corp-surface flex flex-col justify-center">
                <span className="text-[10px] font-mono text-corp-text-tertiary uppercase">Detail Rows in Active Scope:</span>
                <span className="text-sm font-extrabold font-mono text-emerald-400">
                  {activeStats.rows.toLocaleString()} / 4,800,000 rows
                </span>
              </div>
            </div>
          </div>

          {/* 4 Computed DAX KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-1">
              <span className="text-[10px] font-mono font-extrabold uppercase text-corp-text-tertiary">[Total Gross Sales]</span>
              <p className="text-lg font-mono font-extrabold text-corp-text">৳ {activeStats.rev.toFixed(1)}M</p>
              <p className="text-[10px] font-mono text-sky-400">SUMX(fmcg_orders_detail, Units * Price)</p>
            </div>

            <div className="p-4 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-1">
              <span className="text-[10px] font-mono font-extrabold uppercase text-corp-text-tertiary">[Total Trade Spend]</span>
              <p className="text-lg font-mono font-extrabold text-amber-400">৳ {activeStats.tradeSpend.toFixed(1)}M ({tradeSpendPct}%)</p>
              <p className="text-[10px] font-mono text-amber-300">SUMX(detail, Units * TradeDiscount)</p>
            </div>

            <div className="p-4 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-1">
              <span className="text-[10px] font-mono font-extrabold uppercase text-corp-text-tertiary">[Operating Margin %]</span>
              <p className={`text-lg font-mono font-extrabold ${Number(marginPct) < 15 ? "text-rose-400" : "text-emerald-400"}`}>
                {marginPct}% {Number(marginPct) < 15 ? "⚠️ CRITICAL DROP" : "✔ STABLE"}
              </p>
              <p className="text-[10px] font-mono text-corp-text-secondary">DIVIDE([Net Margin], [Gross Sales], 0)</p>
            </div>

            <div className="p-4 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-1">
              <span className="text-[10px] font-mono font-extrabold uppercase text-corp-text-tertiary">[Sales All Regions] (CALCULATE)</span>
              <p className="text-lg font-mono font-extrabold text-purple-400">৳ {rawBaseRevenue.toFixed(1)}M</p>
              <p className="text-[10px] font-mono text-purple-300">CALCULATE([Sales], ALL(dim_regions))</p>
            </div>
          </div>

          {/* DAX Formula Line-by-Line Breakdown */}
          <div className="rounded-xl border-2 border-corp-border bg-[#0b101b] p-4 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-extrabold text-sky-400 flex items-center gap-1.5">
                <Code size={14} /> Production DAX Measure Definition
              </span>
              <span className="text-[10px] text-slate-400">Evaluation Context: {selectedRegion === "All" ? "No Slicer Filter" : `Active Filter: [Region = '${selectedRegion}']`}</span>
            </div>

            <div className="space-y-1 text-slate-300">
              <p><span className="text-purple-400 font-bold">Operating Margin %</span> = </p>
              <p className="pl-4"><span className="text-sky-400 font-bold">VAR</span> VisibleGrossSales = [Total Gross Sales]</p>
              <p className="pl-4"><span className="text-sky-400 font-bold">VAR</span> VisibleTradeSpend = [Total Trade Spend]</p>
              <p className="pl-4"><span className="text-sky-400 font-bold">VAR</span> VisibleCOGS = [Total Cost of Goods Sold]</p>
              <p className="pl-4"><span className="text-sky-400 font-bold">VAR</span> NetOperatingMargin = VisibleGrossSales - VisibleCOGS - VisibleTradeSpend</p>
              <p className="pl-4"><span className="text-sky-400 font-bold">RETURN</span></p>
              <p className="pl-8"><span className="text-emerald-400 font-bold">DIVIDE</span>(NetOperatingMargin, VisibleGrossSales, 0.00)</p>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <span className="text-amber-400 font-extrabold">Executive Context Insight: </span>
              In North Zone, trade spend increased to <strong>{tradeSpendPct}%</strong> of gross sales, which directly drove operating margin down to <strong>{marginPct}%</strong>. The grand total row in Power BI evaluates the whole model, not the visual average of the rows above.
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: STAR SCHEMA MODEL EXPLORER ──────────────────────────────── */}
      {activeTab === "star_schema" && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-corp-border pb-3">
            <div>
              <h3 className="text-xs font-extrabold font-mono uppercase text-sky-400">
                Kimball Star Schema Semantic Model (Apex Consumer Goods DW)
              </h3>
              <p className="text-xs text-corp-text font-bold">
                1:N Single-Direction Relationships · Integer Surrogate Keys · Target Grain Reconciliation
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setModelAuditTest(modelAuditTest === "orphan" ? null : "orphan")}
                className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                  modelAuditTest === "orphan" ? "bg-rose-600 text-white border-rose-400" : "bg-corp-bg-secondary text-corp-text border-corp-border"
                }`}
              >
                Audit Orphan Keys
              </button>
              <button
                onClick={() => setModelAuditTest(modelAuditTest === "many" ? null : "many")}
                className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                  modelAuditTest === "many" ? "bg-amber-600 text-white border-amber-400" : "bg-corp-bg-secondary text-corp-text border-corp-border"
                }`}
              >
                Test Many-to-Many Trap
              </button>
            </div>
          </div>

          {/* Model ERD Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* Dimension Column */}
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase text-corp-text-tertiary block">
                Dimensions (Descriptive Slicers)
              </span>

              {[
                { name: "dim_products", rows: "1,200 SKUs", pk: "product_id (PK)", cols: ["product_name", "category_name", "base_price", "brand"] },
                { name: "dim_distributors", rows: "450 Partners", pk: "distributor_id (PK)", cols: ["distributor_name", "tier", "channel", "territory"] },
                { name: "dim_regions", rows: "4 Zones", pk: "region_id (PK)", cols: ["region_name", "zone_director", "state_code"] },
                { name: "dim_calendar", rows: "1,096 Days", pk: "date_key (PK)", cols: ["full_date", "fiscal_year", "quarter", "month_name"] }
              ].map((table) => (
                <div
                  key={table.name}
                  onClick={() => setSelectedModelTable(table.name)}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedModelTable === table.name
                      ? "bg-sky-500/10 border-sky-400 shadow-sm"
                      : "bg-corp-bg-secondary border-corp-border hover:border-corp-text-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-corp-text">{table.name}</span>
                    <span className="text-[10px] text-sky-400 font-bold">{table.rows}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold mb-1">🔑 {table.pk}</div>
                  <div className="text-[10px] text-corp-text-secondary truncate">
                    {table.cols.join(", ")}
                  </div>
                </div>
              ))}
            </div>

            {/* Central Fact Column */}
            <div className="space-y-3 md:col-span-2">
              <span className="text-[10px] font-extrabold uppercase text-corp-text-tertiary block">
                Central Fact Tables (High-Frequency Transactions)
              </span>

              <div
                onClick={() => setSelectedModelTable("fmcg_orders_detail")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedModelTable === "fmcg_orders_detail"
                    ? "bg-sky-500/10 border-sky-400 shadow-md"
                    : "bg-corp-bg-secondary border-corp-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                    <span className="font-extrabold text-sm text-corp-text">fmcg_orders_detail</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-600 text-white">
                    Fact Grain: 1 Row Per Ordered SKU (4.8M Rows)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-2 border-t border-corp-border">
                  <div className="p-2 rounded bg-corp-surface border border-corp-border">
                    <span className="text-corp-text-tertiary block text-[9px]">FOREIGN KEYS</span>
                    <span className="text-sky-300 font-bold">order_id (FK)<br />product_id (FK)</span>
                  </div>
                  <div className="p-2 rounded bg-corp-surface border border-corp-border">
                    <span className="text-corp-text-tertiary block text-[9px]">DEGENERATE DIMS</span>
                    <span className="text-corp-text font-bold">sku_barcode<br />line_item_num</span>
                  </div>
                  <div className="p-2 rounded bg-corp-surface border border-corp-border">
                    <span className="text-corp-text-tertiary block text-[9px]">NUMERIC MEASURES</span>
                    <span className="text-emerald-400 font-bold">units_sold, gross_sales, trade_discount, cogs</span>
                  </div>
                </div>

                {/* Relationship Propagation Indicators */}
                <div className="mt-3 p-2.5 rounded bg-corp-surface border border-corp-border flex items-center justify-between text-[10px] text-corp-text-secondary">
                  <span>Relationship: 1-to-Many (1:*)</span>
                  <span>Cross-Filter: Single (Dimension → Fact)</span>
                  <span className="text-emerald-400 font-bold">✔ Bi-directional Trap Avoided</span>
                </div>
              </div>

              {/* Monthly Target Bridge Fact */}
              <div
                onClick={() => setSelectedModelTable("dim_monthly_targets")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedModelTable === "dim_monthly_targets"
                    ? "bg-sky-500/10 border-sky-400"
                    : "bg-corp-bg-secondary border-corp-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                    <span className="font-extrabold text-sm text-corp-text">dim_monthly_targets</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-600 text-white">
                    Grain: Monthly Zone Target (192 Rows)
                  </span>
                </div>
                <p className="text-[11px] text-corp-text-secondary">
                  ⚠️ Grain Mismatch Warning: Monthly targets link to <code>dim_regions</code> and <code>dim_calendar</code> at month level, NEVER directly to daily <code>fmcg_orders_detail</code> rows.
                </p>
              </div>

              {/* Diagnostic Test Feedback */}
              {modelAuditTest === "orphan" && (
                <div className="p-3.5 rounded-lg bg-emerald-500/15 border-2 border-emerald-500 text-emerald-300 text-xs space-y-1">
                  <p className="font-extrabold">✔ Foreign Key Integrity Verified:</p>
                  <p className="text-[11px]">All 4,800,000 detail rows resolve to valid primary keys in dim_products and dim_distributors. Zero phantom records detected.</p>
                </div>
              )}

              {modelAuditTest === "many" && (
                <div className="p-3.5 rounded-lg bg-amber-500/15 border-2 border-amber-500 text-amber-300 text-xs space-y-1">
                  <p className="font-extrabold">⚠️ Many-to-Many Relationship Trap Detected:</p>
                  <p className="text-[11px]">Do NOT set relationship between monthly targets and daily orders to bi-directional (*:*). This multiplies transaction values and corrupts executive totals.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: POWER QUERY APPLIED STEPS ───────────────────────────────── */}
      {activeTab === "power_query" && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-corp-border pb-3">
            <div>
              <h3 className="text-xs font-extrabold font-mono uppercase text-sky-400">
                Power Query M-Engine & Query Folding Inspector
              </h3>
              <p className="text-xs text-corp-text font-bold">
                Inspect sequential applied steps, verify column transformations, and audit push-down query folding.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500">
              Query Folding Audit: 80% Push-Down
            </span>
          </div>

          {/* Sequential Step Selector */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] font-extrabold uppercase text-corp-text-tertiary block">
              Applied Steps Sequence:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {PQ_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedStepIdx(idx)}
                  className={`p-2.5 rounded-lg border-2 text-left transition-all ${
                    selectedStepIdx === idx
                      ? "bg-sky-500/15 border-sky-400 text-sky-300"
                      : "bg-corp-bg-secondary border-corp-border text-corp-text hover:border-corp-text-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold">Step {idx + 1}</span>
                    <span className={`w-2 h-2 rounded-full ${step.folded ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                  </div>
                  <p className="font-extrabold truncate">{step.step}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Details & M-Code */}
          <div className="rounded-xl border-2 border-corp-border bg-[#0b101b] p-4 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-extrabold text-sky-400">
                Active Step: {PQ_STEPS[selectedStepIdx].step}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                PQ_STEPS[selectedStepIdx].folded
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500"
              }`}>
                {PQ_STEPS[selectedStepIdx].folded ? "✔ Folded to Database" : "⚠️ Folding Broken (In-Memory)"}
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#121927] border border-slate-800 text-slate-200">
              <code className="text-[11px] leading-relaxed block overflow-x-auto">
                {PQ_STEPS[selectedStepIdx].mCode}
              </code>
            </div>

            <p className="text-[11px] text-slate-400">
              {PQ_STEPS[selectedStepIdx].desc}
            </p>
          </div>

          {/* Transformed Data Preview */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold uppercase text-corp-text">
                Transformed Data Snapshot at Step {selectedStepIdx + 1}
              </span>
              <span className="text-[10px] text-corp-text-tertiary">3 Sample Preview Rows</span>
            </div>

            <div className="rounded-lg border-2 border-corp-border overflow-x-auto bg-corp-bg-secondary">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-corp-surface border-b-2 border-corp-border text-corp-text-secondary text-[11px] uppercase">
                    {Object.keys(PQ_STEPS[selectedStepIdx].preview[0]).map((key, i) => (
                      <th key={i} className="p-2.5 font-extrabold border-r border-corp-border last:border-r-0">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-corp-border text-corp-text">
                  {PQ_STEPS[selectedStepIdx].preview.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-corp-surface/50 transition-colors">
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="p-2.5 border-r border-corp-border last:border-r-0 whitespace-nowrap">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: DASHBOARD HEURISTIC CRITIQUE & 6-HOUR CHALLENGE ─────────── */}
      {activeTab === "dashboard_critique" && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-corp-border pb-3">
            <div>
              <h3 className="text-xs font-extrabold font-mono uppercase text-sky-400">
                Dashboard Heuristic Audit & 6-Hour Job-Ready Challenge
              </h3>
              <p className="text-xs text-corp-text font-bold">
                Learn cognitive visual ergonomics: compare flawed reports against executive decision cockpits.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDashboardMode("flawed")}
                className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                  dashboardMode === "flawed" ? "bg-rose-600 text-white border-rose-400" : "bg-corp-bg-secondary text-corp-text border-corp-border"
                }`}
              >
                1. Inspect Flawed Report
              </button>
              <button
                onClick={() => setDashboardMode("redesigned")}
                className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-all ${
                  dashboardMode === "redesigned" ? "bg-emerald-600 text-white border-emerald-400" : "bg-corp-bg-secondary text-corp-text border-corp-border"
                }`}
              >
                2. Executive Redesign
              </button>
            </div>
          </div>

          {/* Interactive Report View */}
          {dashboardMode === "flawed" ? (
            <div className="p-6 rounded-xl border-2 border-rose-500/50 bg-rose-500/5 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-rose-400 font-extrabold uppercase">
                <AlertCircle size={16} /> 🚨 Flawed Corporate Dashboard (10 Anti-Patterns Identified)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-corp-surface border-2 border-rose-500/30 space-y-2">
                  <span className="text-rose-400 font-extrabold block">❌ Anti-Pattern 1: 3D Rainbow Pie Chart</span>
                  <p className="text-[11px] text-corp-text-secondary leading-relaxed">
                    Uses 14 rainbow colors across 12 distributor regions. High cognitive load; impossible to compare similar wedges.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-corp-surface border-2 border-rose-500/30 space-y-2">
                  <span className="text-rose-400 font-extrabold block">❌ Anti-Pattern 2: Disconnected Slicers</span>
                  <p className="text-[11px] text-corp-text-secondary leading-relaxed">
                    Overloaded with 8 multi-select dropdowns without default hierarchy. Leads to blank reports and slow query performance.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-corp-surface border-2 border-rose-500/30 space-y-2">
                  <span className="text-rose-400 font-extrabold block">❌ Anti-Pattern 3: Vanity Metrics</span>
                  <p className="text-[11px] text-corp-text-secondary leading-relaxed">
                    Celebrates +6% gross volume in giant green font while completely hiding the -18% margin collapse and cash erosion.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold uppercase">
                  <CheckCircle2 size={16} /> ✔ Executive Commercial Cockpit (3-Tiered Architecture)
                </div>
                <span className="text-[10px] text-emerald-300 font-bold">Standard Fast Visual Hierarchy</span>
              </div>

              {/* 3-Tier Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-corp-surface border border-corp-border space-y-1.5">
                  <span className="text-sky-400 font-extrabold uppercase block text-[10px]">Tier 1: Executive KPI Banner</span>
                  <p className="text-base font-extrabold text-corp-text">৳ 388.6M Corporate Sales · 20.8% Blended Margin</p>
                  <p className="text-[10px] text-corp-text-tertiary">Variance bridge vs target with clear RAG alerts (North Zone degraded to 14.2%)</p>
                </div>
                <div className="p-4 rounded-lg bg-corp-surface border border-corp-border space-y-1.5">
                  <span className="text-purple-400 font-extrabold uppercase block text-[10px]">Tier 2: Commercial Diagnostics</span>
                  <p className="text-base font-extrabold text-corp-text">Price-Volume-Mix Breakdown</p>
                  <p className="text-[10px] text-corp-text-tertiary">Waterfall chart isolating North Zone 25% discount leakage</p>
                </div>
                <div className="p-4 rounded-lg bg-corp-surface border border-corp-border space-y-1.5">
                  <span className="text-emerald-400 font-extrabold uppercase block text-[10px]">Tier 3: Route & SKU Optimization</span>
                  <p className="text-base font-extrabold text-corp-text">Distributor Drill-Through</p>
                  <p className="text-[10px] text-corp-text-tertiary">One-click diagnostic to individual distributor penalties</p>
                </div>
              </div>
            </div>
          )}

          {/* 6-Hour Timed Practical Assessment Framework */}
          <div className="p-5 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-corp-border pb-3">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-sky-400" />
                <span className="text-sm font-extrabold text-corp-text uppercase">
                  Apex Consumer Goods 6-Hour Job-Ready Practical Assessment
                </span>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-600 text-white">
                100 Points Total · 75% Passing Standard
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
              {[
                { title: "1. SQL Extraction", pts: "20 Pts", desc: "Grain validation, clean CTEs, 0 duplicate rows" },
                { title: "2. Star Schema", pts: "20 Pts", desc: "1:N cardinality, surrogate keys, calendar dimension" },
                { title: "3. DAX Precision", pts: "20 Pts", desc: "Explicit measures, filter contexts, time intelligence" },
                { title: "4. Visual UX", pts: "20 Pts", desc: "3-tier hierarchy, drill-through, cognitive restraint" },
                { title: "5. Executive Memo", pts: "20 Pts", desc: "2-page briefing, 3 actionable operational decisions" }
              ].map((dim, i) => (
                <div key={i} className="p-3 rounded-lg bg-corp-surface border border-corp-border text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-corp-text text-[11px]">{dim.title}</span>
                    <span className="text-[10px] text-sky-400 font-bold">{dim.pts}</span>
                  </div>
                  <p className="text-[10px] text-corp-text-tertiary leading-tight">{dim.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
              <span className="text-corp-text-secondary">
                Artifacts verified in Career Passport: SQL Script (.sql), Star Schema (.pbix), Executive Memo (.md/.pdf), 7-Min Defense.
              </span>
              <a
                href="/downloads/insyt-bi-capstone-brief.pdf"
                className="self-start sm:self-auto text-sky-400 font-extrabold hover:underline flex items-center gap-1"
              >
                Download Capstone Simulation Pack <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── SHORTCUTS MODAL ────────────────────────────────────────────────── */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl border-2 border-corp-border bg-corp-surface p-6 shadow-2xl font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-corp-border pb-3">
              <span className="font-extrabold text-sm uppercase text-corp-text flex items-center gap-2">
                <Keyboard size={16} /> Keyboard Shortcuts
              </span>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-corp-text-tertiary hover:text-corp-text"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { key: "Ctrl + Enter", action: "Execute active SQL query" },
                { key: "Ctrl + S", action: "Save local editor buffer" },
                { key: "?", action: "Toggle this shortcut guide" },
                { key: "Esc", action: "Close modals or overlays" }
              ].map((sc, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-corp-bg-secondary border border-corp-border">
                  <kbd className="px-2 py-0.5 rounded bg-corp-surface border border-corp-border font-bold text-sky-400">
                    {sc.key}
                  </kbd>
                  <span className="text-corp-text">{sc.action}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowShortcuts(false)}
              className="w-full py-2 rounded-lg bg-sky-600 text-white font-extrabold uppercase text-xs"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
