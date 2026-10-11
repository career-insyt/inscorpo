-- ═════════════════════════════════════════════════════════════════════════════
-- INSYT CORPORATE ENTERPRISE BUSINESS INTELLIGENCE
-- Flagship Apprenticeship: Power BI & SQL for Corporate Analysts
-- Master Database DDL & Synthetic Data Seed Script
-- Scenario: Apex Consumer Goods Ltd. — Enterprise Simulation DW
-- ═════════════════════════════════════════════════════════════════════════════

-- 1. CLEANUP PREVIOUS SCHEMAS IF EXISTS
DROP TABLE IF EXISTS fmcg_orders_detail CASCADE;
DROP TABLE IF EXISTS fmcg_orders_header CASCADE;
DROP TABLE IF EXISTS dim_monthly_targets CASCADE;
DROP TABLE IF EXISTS dim_products CASCADE;
DROP TABLE IF EXISTS dim_distributors CASCADE;
DROP TABLE IF EXISTS dim_regions CASCADE;
DROP TABLE IF EXISTS dim_calendar CASCADE;

-- 2. CREATE DIMENSION TABLES (STAR SCHEMA)

CREATE TABLE dim_regions (
    region_id INT PRIMARY KEY,
    region_name VARCHAR(50) NOT NULL,
    director_name VARCHAR(100),
    headquarters VARCHAR(50)
);

CREATE TABLE dim_distributors (
    distributor_id VARCHAR(20) PRIMARY KEY,
    distributor_name VARCHAR(150) NOT NULL,
    region_id INT REFERENCES dim_regions(region_id),
    channel VARCHAR(50) NOT NULL, -- 'Modern Trade', 'General Wholesale', 'E-Commerce'
    tier VARCHAR(20) NOT NULL,     -- 'Tier-1 Elite', 'Tier-2 Preferred', 'Tier-3 Standard'
    credit_limit_bdt NUMERIC(15, 2)
);

CREATE TABLE dim_products (
    product_id VARCHAR(20) PRIMARY KEY,
    sku_code VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    pack_size VARCHAR(30),
    base_price NUMERIC(10, 2) NOT NULL,
    cost_per_unit NUMERIC(10, 2) NOT NULL
);

CREATE TABLE dim_calendar (
    date_key DATE PRIMARY KEY,
    day_number INT,
    month_number INT,
    month_name VARCHAR(20),
    quarter_name VARCHAR(10),
    fiscal_year INT,
    is_weekend BOOLEAN
);

CREATE TABLE dim_monthly_targets (
    target_id SERIAL PRIMARY KEY,
    region_id INT REFERENCES dim_regions(region_id),
    fiscal_year INT NOT NULL,
    month_number INT NOT NULL,
    target_revenue_bdt NUMERIC(15, 2) NOT NULL,
    target_margin_pct NUMERIC(5, 2) NOT NULL
);

-- 3. CREATE FACT TABLES

CREATE TABLE fmcg_orders_header (
    order_id VARCHAR(30) PRIMARY KEY,
    order_date DATE REFERENCES dim_calendar(date_key),
    ship_date DATE,
    distributor_id VARCHAR(20) REFERENCES dim_distributors(distributor_id),
    region_id INT REFERENCES dim_regions(region_id),
    order_status VARCHAR(30) NOT NULL, -- 'DELIVERED', 'IN_TRANSIT', 'CANCELLED', 'RETURNED'
    payment_terms VARCHAR(30)
);

CREATE TABLE fmcg_orders_detail (
    detail_id BIGSERIAL PRIMARY KEY,
    order_id VARCHAR(30) REFERENCES fmcg_orders_header(order_id),
    product_id VARCHAR(20) REFERENCES dim_products(product_id),
    units_sold INT NOT NULL CHECK (units_sold > 0),
    base_price NUMERIC(10, 2) NOT NULL,
    trade_discount NUMERIC(10, 2) DEFAULT 0.00,
    cost_per_unit NUMERIC(10, 2) NOT NULL,
    freight_absorption NUMERIC(10, 2) DEFAULT 0.00
);

-- 4. PERFORMANCE INDEXING
CREATE INDEX idx_orders_header_date ON fmcg_orders_header(order_date);
CREATE INDEX idx_orders_header_region ON fmcg_orders_header(region_id);
CREATE INDEX idx_orders_header_status ON fmcg_orders_header(order_status);
CREATE INDEX idx_orders_detail_order ON fmcg_orders_detail(order_id);
CREATE INDEX idx_orders_detail_product ON fmcg_orders_detail(product_id);

-- 5. SEED INITIAL REFERENCE DATA

INSERT INTO dim_regions (region_id, region_name, director_name, headquarters) VALUES
(1, 'North Zone', 'Kabir Chowdhury', 'Bogra Commercial Center'),
(2, 'Dhaka Metro', 'Tasnim Ahmed', 'Tejgaon Industrial Area'),
(3, 'Chittagong Port', 'Mohsin Reza', 'Agrabad Commercial Area'),
(4, 'South/East Zone', 'Farhana Yasmin', 'Khulna Corporate Depot');

INSERT INTO dim_products (product_id, sku_code, product_name, category_name, pack_size, base_price, cost_per_unit) VALUES
('PROD-001', 'SKU-BEV-01', 'AquaPure Sparkling Spring 500ml', 'Beverages & Dairy', '24 x 500ml', 35.00, 18.20),
('PROD-002', 'SKU-BEV-02', 'LactoPlus Fortified Milk 1L', 'Beverages & Dairy', '12 x 1L', 95.00, 62.00),
('PROD-003', 'SKU-FD-01', 'NutriCrunch Whole Wheat Biscuit 200g', 'Packaged Foods', '30 x 200g', 45.00, 24.50),
('PROD-004', 'SKU-FD-02', 'GoldenHarvest Aromatic Basmati 5kg', 'Packaged Foods', '4 x 5kg', 650.00, 480.00),
('PROD-005', 'SKU-PC-01', 'SilkGlow Botanical Handwash 250ml', 'Personal Care', '24 x 250ml', 140.00, 68.00),
('PROD-006', 'SKU-PC-02', 'DentalShield Herbal Fluoride 150g', 'Personal Care', '48 x 150g', 110.00, 48.00);

INSERT INTO dim_distributors (distributor_id, distributor_name, region_id, channel, tier, credit_limit_bdt) VALUES
('DIST-NZ-01', 'Padma Agro Trading Corp', 1, 'General Wholesale', 'Tier-1 Elite', 15000000.00),
('DIST-NZ-02', 'Bogra Super Logistics', 1, 'General Wholesale', 'Tier-2 Preferred', 8500000.00),
('DIST-DM-01', 'Shwapno Mega Chain Ltd', 2, 'Modern Trade', 'Tier-1 Elite', 45000000.00),
('DIST-DM-02', 'Unimart Premium Outlets', 2, 'Modern Trade', 'Tier-1 Elite', 30000000.00),
('DIST-CTG-01', 'Karnaphuli Commercial Agency', 3, 'General Wholesale', 'Tier-1 Elite', 22000000.00),
('DIST-SZ-01', 'Sundarbans Distribution Depot', 4, 'General Wholesale', 'Tier-2 Preferred', 7500000.00);

-- Generate Contiguous Date Table (2025 to 2026)
INSERT INTO dim_calendar (date_key, day_number, month_number, month_name, quarter_name, fiscal_year, is_weekend)
SELECT 
    d::DATE AS date_key,
    EXTRACT(DAY FROM d)::INT,
    EXTRACT(MONTH FROM d)::INT,
    TO_CHAR(d, 'Mon'),
    'Q' || EXTRACT(QUARTER FROM d)::TEXT,
    EXTRACT(YEAR FROM d)::INT,
    EXTRACT(ISODOW FROM d) IN (5, 6) -- Bangladesh Fri/Sat Weekend
FROM GENERATE_SERIES('2025-01-01'::DATE, '2026-12-31'::DATE, '1 day'::INTERVAL) d;

-- Monthly Regional Targets
INSERT INTO dim_monthly_targets (region_id, fiscal_year, month_number, target_revenue_bdt, target_margin_pct) VALUES
(1, 2026, 1, 48000000.00, 24.50),
(1, 2026, 2, 52000000.00, 24.50),
(1, 2026, 3, 56000000.00, 25.00),
(2, 2026, 1, 65000000.00, 32.00),
(2, 2026, 2, 70000000.00, 32.50),
(2, 2026, 3, 75000000.00, 33.00),
(3, 2026, 1, 38000000.00, 28.00),
(4, 2026, 1, 28000000.00, 26.00);

-- 6. SAMPLE TRANSACTIONS (REPRESENTING THE 4.8M DATASET PATTERN)
INSERT INTO fmcg_orders_header (order_id, order_date, ship_date, distributor_id, region_id, order_status, payment_terms) VALUES
('ORD-2026-0001', '2026-01-05', '2026-01-06', 'DIST-NZ-01', 1, 'DELIVERED', 'Net 30'),
('ORD-2026-0002', '2026-01-08', '2026-01-09', 'DIST-NZ-02', 1, 'DELIVERED', 'Net 45'),
('ORD-2026-0003', '2026-01-12', '2026-01-13', 'DIST-DM-01', 2, 'DELIVERED', 'Net 15'),
('ORD-2026-0004', '2026-01-15', '2026-01-16', 'DIST-CTG-01', 3, 'DELIVERED', 'Net 30'),
('ORD-2026-0005', '2026-01-20', '2026-01-21', 'DIST-NZ-01', 1, 'CANCELLED', 'Net 30');

INSERT INTO fmcg_orders_detail (order_id, product_id, units_sold, base_price, trade_discount, cost_per_unit, freight_absorption) VALUES
('ORD-2026-0001', 'PROD-001', 12000, 35.00, 8.75, 18.20, 2.10), -- 25% discount in North Zone!
('ORD-2026-0001', 'PROD-002', 4500, 95.00, 23.75, 62.00, 4.50), -- 25% discount!
('ORD-2026-0002', 'PROD-003', 8000, 45.00, 9.00, 24.50, 1.80),  -- 20% discount
('ORD-2026-0003', 'PROD-005', 15000, 140.00, 7.00, 68.00, 0.00), -- 5% discount (High Margin Metro)
('ORD-2026-0003', 'PROD-006', 10000, 110.00, 5.50, 48.00, 0.00),
('ORD-2026-0004', 'PROD-004', 3500, 650.00, 65.00, 480.00, 12.00);

-- 7. REUSABLE ANALYTICAL VIEW (FOR POWER QUERY DIRECT INGESTION)
CREATE OR REPLACE VIEW vw_commercial_sales_cube AS
SELECT 
    d.detail_id,
    h.order_id,
    h.order_date,
    cal.fiscal_year,
    cal.quarter_name,
    cal.month_name,
    r.region_id,
    r.region_name,
    dist.distributor_id,
    dist.distributor_name,
    dist.channel,
    p.product_id,
    p.sku_code,
    p.product_name,
    p.category_name,
    d.units_sold,
    d.base_price,
    d.trade_discount,
    d.cost_per_unit,
    d.freight_absorption,
    -- Commercial P&L Financial Waterfall
    (d.units_sold * d.base_price) AS gross_revenue_bdt,
    (d.units_sold * d.trade_discount) AS trade_spend_bdt,
    (d.units_sold * (d.base_price - d.trade_discount)) AS net_revenue_bdt,
    (d.units_sold * d.cost_per_unit) AS cogs_bdt,
    (d.units_sold * (d.base_price - d.cost_per_unit - d.trade_discount)) AS gross_margin_bdt,
    (d.units_sold * d.freight_absorption) AS freight_absorption_bdt,
    (d.units_sold * (d.base_price - d.cost_per_unit - d.trade_discount - d.freight_absorption)) AS operating_margin_bdt,
    CASE 
        WHEN (d.units_sold * d.base_price) > 0 
        THEN ROUND(((d.base_price - d.cost_per_unit - d.trade_discount - d.freight_absorption) / d.base_price) * 100, 2)
        ELSE 0.00 
    END AS operating_margin_pct
FROM fmcg_orders_detail d
JOIN fmcg_orders_header h ON d.order_id = h.order_id
JOIN dim_calendar cal ON h.order_date = cal.date_key
JOIN dim_regions r ON h.region_id = r.region_id
JOIN dim_distributors dist ON h.distributor_id = dist.distributor_id
JOIN dim_products p ON d.product_id = p.product_id
WHERE h.order_status = 'DELIVERED';

-- ============================================================================
-- MODELING GOVERNANCE & GRAIN NOTES FOR POWER BI ANALYSTS:
-- 1. GRAIN INTEGRITY:
--    vw_commercial_sales_cube is at the grain of 1 row per order line item.
-- 2. TARGET GRAIN MISMATCH:
--    dim_monthly_targets is at monthly regional grain (region_id, fiscal_year, month_number).
--    Do NOT create a direct 1:N relationship from monthly targets to this transaction cube.
--    Instead, link both tables to dim_calendar and dim_regions in a Kimball multi-star schema,
--    and use DAX ISINSCOPE() to suppress target evaluation at distributor/product grains.
-- 3. ROLE-PLAYING DATE DIMENSIONS:
--    fmcg_orders_header contains both order_date and ship_date.
--    In Power BI, mark dim_calendar as Date Table on order_date, and use
--    USERELATIONSHIP(fmcg_orders_header[ship_date], dim_calendar[date_key]) for shipping analysis.
-- ============================================================================
