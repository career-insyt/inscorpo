# APEX CONSUMER GOODS LTD. — ENTERPRISE BI SIMULATION & 6-HOUR PRACTICAL
## Official Executive Briefing & Technical Assessment Guidelines
**Product**: INSYT Corporate  
**Accreditation**: INSYT Enterprise Business Intelligence Certified Analyst (CEBI)  
**Standard Alignment**: Microsoft PL-300 Domain Competencies & Kimball Group Dimensional Standards  

---

### 1. Executive Context & Business Problem
Apex Consumer Goods Ltd. is a leading FMCG conglomerate distributing packaged foods, beverages, dairy, and personal care brands across four strategic sales territories: North Zone, Dhaka Metro, Chittagong Port, and South/East Zone.

Over the past two quarters, executive leadership noted an alarming divergence in corporate performance:
* **Gross sales volume increased by 6.0%**.
* **Corporate operating margin collapsed by 18.0%** (falling from a budgeted 24.5% to 14.1%).
* Operating cash flow has turned negative in regional distribution depots.

Executive leadership suspects uncontrolled trade discount leakage, distributor penalty gaming, and adverse product category mix shifts. You have been retained as Lead Corporate BI Analyst to investigate the root causes across 4.8 million transaction records, construct a production Star Schema, implement explicit DAX measures, build a 3-tiered executive decision cockpit, and deliver a 2-page investment memo with 3 concrete operational recommendations.

---

### 2. Analytical Data Architecture (PostgreSQL DW)
* `fmcg_orders_header`: 1,400,000 order header records.
* `fmcg_orders_detail`: 4,800,000 order transaction line items.
* `dim_products`: 1,200 unique SKUs across 4 primary commercial categories.
* `dim_distributors`: 450 distributor partners across General Wholesale, Modern Trade, and E-Commerce.
* `dim_regions`: 4 operational geographic zones.
* `dim_calendar`: Contiguous daily dates from 2025-01-01 to 2026-12-31.
* `dim_monthly_targets`: 192 monthly revenue and margin targets by zone.

---

### 3. The 6-Hour Timed Practical Challenge Milestones
1. **Hour 0:00 - 1:15 (Stage 1 — SQL Extraction Pipeline)**:
   Connect to read-only PostgreSQL replica, profile transaction distributions, filter cancelled/returned orders, construct multi-stage CTEs, and create the analytical view `vw_commercial_sales_cube`.
2. **Hour 1:15 - 2:00 (Stage 2 — Power Query Ingestion & Validation)**:
   Ingest view via Power BI Desktop, enforce 64-bit integer and currency data types, audit query folding push-down, and generate a contiguous fiscal date table.
3. **Hour 2:00 - 3:00 (Stage 3 — Kimball Dimensional Star Schema)**:
   Configure 1:N single-direction relationships, integer surrogate keys, link monthly target bridges safely, and eliminate circular filter paths.
4. **Hour 3:00 - 4:15 (Stage 4 — Core & Advanced DAX Engineering)**:
   Author explicit measures: `[Total Gross Sales]`, `[Total Trade Spend]`, `[Operating Margin %]`, `[YoY Revenue Growth]`, and distributor ranking iterators (`RANKX`).
5. **Hour 4:15 - 5:15 (Stage 5 — 3-Tiered Executive Decision Cockpit)**:
   Build Executive Overview, Commercial Diagnostics (PVM waterfall), and SKU/Distributor Drill-Through with accessible contrast and dynamic slicers.
6. **Hour 5:15 - 6:00 (Stage 6 — Executive Memo & Boardroom Defense)**:
   Draft 2-page C-suite memo (`Apex_Executive_Memo.pdf`) and record 7-minute oral presentation defending 3 operational interventions.

---

### 4. Scoring Rubric (100 Points Total, 75% Passing Standard)
* **Enterprise SQL Pipeline & Data Hygiene (20 Pts)**: Grain validation, clean joins, absence of duplicate rows, and performant CTEs.
* **Dimensional Architecture & Star Schema (20 Pts)**: 1:N single-direction relationships, surrogate keys, contiguous date dimension, correct monthly target grain.
* **DAX Mathematical Precision & Filter Context (20 Pts)**: Explicit measures, correct CALCULATE filter transitions, Time Intelligence logic, safe divide handling.
* **Visual Hierarchy & Report Usability (20 Pts)**: Cognitive visual structure, 3-tier reporting architecture, dynamic slicers, drill-through diagnostics, accessible styling.
* **Commercial Insight & Executive Framing (20 Pts)**: Evidence-based root cause identification, variance decomposition, 3 concrete operational recommendations, executive presentation.
