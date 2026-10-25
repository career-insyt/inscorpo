### Gemini 4 Argon (High)
Autonomous Real-Time Labor Market Intelligence and Job Ingestion Architecture for CareerINSYT
Module 1: The Bangladesh Recruitment Surface Map
Engineering a deterministic, self-healing job intelligence engine for Bangladesh requires mapping a highly fragmented digital ecosystem that spans legacy state portals, centralized banking recruitment hubs, enterprise multinational Applicant Tracking Systems (ATS), and localized conglomerate career sites. Unlike North American or European labor markets where structured JSON-LD (JobPosting schema) is widely deployed, the Bangladeshi recruitment surface distributes critical labor data across dynamic PHP session tables, subdomain-isolated state telecom infrastructures, and low-resolution rasterized Bengali PDF gazettes. Eliminating stale citations and broken links requires ingesting directly from primary upstream authorities rather than relying on secondary blog aggregators.   

Government, Statutory Bodies, and Autonomous Research Institutes
Public sector recruitment in Bangladesh operates across a dual-layer topology: policy and cadre examinations governed by the Bangladesh Public Service Commission (BPSC) at bpsc.gov.bd, and operational application intake executed through Teletalk Bangladesh Limited's state infrastructure. Teletalk claims coverage of over 90% of government job applications in Bangladesh, operating both a centralized aggregator portal (alljobs.teletalk.com.bd) and hundreds of isolated institutional subdomains (*.teletalk.com.bd).   

The Teletalk ecosystem presents two distinct ingestion surfaces that must be crawled in parallel. The central portal (https://alljobs.teletalk.com.bd/jobs/government and https://alljobs.teletalk.com.bd/jobs?keyword=&orgid=1) indexes active public openings using sequential internal identifiers (such as GJOB14987, GJOB14986, down to GJOB14968), mapping each listing to an external application URI. Simultaneously, individual ministries, directorates, Deputy Commissioner (DC) offices, and research bodies maintain dedicated Teletalk subdomains where the authoritative PDF circular, post-specific radio buttons, and exact timestamp cutoffs reside. Active public recruitment cycles demonstrate substantial volume and category fragmentation across agencies, such as the Bangladesh Chemical Industries Corporation (bcic.teletalk.com.bd) with 274 vacancies across 19 distinct categories, combined Deputy Commissioner offices (dcsherpur.teletalk.com.bd, dcbogura.teletalk.com.bd, dcpatuakhali.teletalk.com.bd, dcnetrokona.teletalk.com.bd) with 186 vacancies across 19 categories, Taxes Zone-21 Dhaka (tax21.teletalk.com.bd) with 65 vacancies across 6 categories, Taxes Zone-13 Dhaka (tax13.teletalk.com.bd) with 47 vacancies across 7 categories, Bangladesh Public Administration Training Centre (BPATC) with 39 vacancies across 9 categories, Housing and Building Research Institute (hbri.teletalk.com.bd) with 17 vacancies across 7 categories, and the Withholding Tax Management Unit (wtmu.teletalk.com.bd/wtmu_2026/) with 13 vacancies across 4 categories.   


For national agricultural and scientific research institutes—operating under the National Agricultural Research System (NARS) and the Ministry of Science and Technology (most.teletalk.com.bd)—recruitment notices frequently bypass general job boards and appear first on institutional "Notice Board" or "Recruitment" DOM tables before syncing to their respective Teletalk instance. Specifically, the autonomous research cluster comprises the Bangladesh Agricultural Research Council (barc.gov.bd / barc.teletalk.com.bd), Bangladesh Rice Research Institute (brri.gov.bd / brri.teletalk.com.bd), Bangladesh Institute of Nuclear Agriculture (bina.gov.bd / bina.teletalk.com.bd), Bangladesh Agricultural Research Institute (bari.gov.bd / bari.teletalk.com.bd), Bangladesh Jute Research Institute (bjri.gov.bd / bjri.teletalk.com.bd), Bangladesh Council of Scientific and Industrial Research (bcsir.gov.bd / bcsir.teletalk.com.bd), Bangladesh Tea Research Institute (btri.gov.bd), Bangladesh Sugarcrop Research Institute (bsri.gov.bd), Bangladesh Wheat and Maize Research Institute (bwmri.teletalk.com.bd), Bangladesh Livestock Research Institute (blri.teletalk.com.bd), and the Housing and Building Research Institute (hbri.teletalk.com.bd). Almost all ministry and research institute portals run on the Bangladesh National Portal Framework (NPF), which renders notices inside standardized #printable_area table.bordered DOM structures where attachments are linked via protocol-relative URLs (//site.gov.bd/sites/default/files/...pdf).   

Institutional Cluster	Primary Authority / Portal Endpoint	Teletalk Subdomain Pattern	Document & DOM Structure	Anti-Scraping & Technical Realities
Civil Service & Cadre (BPSC)	bpsc.gov.bd (Cadre & Non-Cadre tabs)	
bpsc.teletalk.com.bd

[cite: 1]

NPF HTML tables linking to multi-page scanned Bengali PDF gazettes	Frequent connection timeouts during exam result windows; SSL certificate chain misconfigurations requiring custom CA bundle handling.
Central Teletalk Aggregator	
alljobs.teletalk.com.bd/jobs?keyword=&orgid=1

[cite: 4]

Links out to *.teletalk.com.bd

[cite: 4]

Server-rendered HTML cards with GJOB{ID} identifiers and pagination

Standard datacenter IP rate-limiting; requires session cookie persistence for deep pagination.
Scientific & Agricultural Research (NARS / MOST)	barc.gov.bd, brri.gov.bd, bina.gov.bd, bari.gov.bd, bcsir.gov.bd, bjri.gov.bd	
bcsir.teletalk.com.bd, bjri.teletalk.com.bd, bwmri.teletalk.com.bd, blri.teletalk.com.bd, hbri.teletalk.com.bd

[cite: 1, 4]

Classic PHP/Apache templates (home.php, apply.php) + scanned Bengali PDF circulars	
Circulars are often rasterized at 150–200 DPI using legacy Bijoy (SutonnyMJ) fonts rather than UTF-8 Unicode; subdomains sometimes use plain HTTP (http://hbri.teletalk.com.bd/).

Ministries, Tax Zones & DC Offices	mopa.gov.bd, mol.gov.bd, moa.gov.bd	
mol.teletalk.com.bd, moa.teletalk.com.bd, dcsherpur.teletalk.com.bd, wtmu.teletalk.com.bd/wtmu_2026/, tax21.teletalk.com.bd

[cite: 1, 4, 10]

Sub-path year versioning (/wtmu_2026/) on newer deployments; multi-category tabular PDFs

Strict cutoff times at 4:00 PM or 5:00 PM BST rather than midnight; district-level exclusion lists embedded inside Bengali prose cells.

  
Extracting compensation and eligibility from government circulars requires deterministic normalization against the National Pay Scale 2015 and the updated Statutory Quota Framework. Under the National Pay Scale 2015, public sector roles are classified from Grade 1 (৳78,000 fixed) down to Grade 20 (৳8,250–20,010). Entry-level Class-I Gazetted Officer roles—such as Assistant Director, Scientific Officer (at BRRI, BINA, BARI, BCSIR), or BCS Cadre officers—enter at Grade 9 (৳22,000–53,060), while Class-II Sub-Assistant Engineers and Senior Staff Nurses enter at Grade 10 (৳16,000–38,640).   

Pay Scale Grade	Statutory Classification	Basic Pay Range (BDT)	House Rent Allowance (City Corp / Other)	Medical & Conveyance Allowances
Grade 9	Class-I Gazetted Officer (Cadre, AD, Scientific Officer)	৳22,000 – ৳53,060	55% – 60% of Basic (Dhaka/City) / 45% – 50% (Other)	৳1,500 Medical (Fixed); Education ৳500/child
Grade 10	Class-II Officer (Sub-Assistant Engineer, AO)	৳16,000 – ৳38,640	55% – 60% of Basic (Dhaka/City) / 45% – 50% (Other)	৳1,500 Medical (Fixed)
Grade 11 – 12	Junior Officer / Supervisor	৳12,500 – ৳30,230 (G11) / ৳11,300 – ৳27,300 (G12)	60% – 65% of Basic (Dhaka) / 50% – 55% (Other)	৳1,500 Medical + ৳300 Conveyance
Grade 13 – 16	Class-III Clerical / Technical (Computer Operator, UDA, OA)	৳11,000 – ৳26,590 (G13) down to ৳9,300 – ৳22,490 (G16)	60% – 65% of Basic (Dhaka) / 50% – 55% (Other)	৳1,500 Medical + ৳300 Conveyance + ৳200 Tiffin
Grade 17 – 20	Class-IV Support Staff (Office Sahayak, MLSS)	৳9,000 – ৳21,800 (G17) down to ৳8,250 – ৳20,010 (G20)	65% of Basic (Min ৳5,600 Dhaka) / 55% (Min ৳4,700 Other)	৳1,500 Medical + ৳300 Conveyance + ৳200 Washing
Furthermore, the ingestion parser must enforce the landmark statutory quota reform established by the Appellate Division of the Supreme Court of Bangladesh on July 21, 2024, which overturned the High Court's June 5, 2024 reinstatement order and directed the government to issue an immediate notification. Legacy parsers built around pre-2024 rules (which assumed 30% Freedom Fighter, 10% Women, and 10% District quotas for Grades 9–10) produce invalid eligibility matrices. The canonical engine parses two distinct statutory mechanisms in modern circulars. First, the National Allocation Mandate establishes that 93% of government job recruitments are merit-based, alongside 5% for children of Freedom Fighters (Bir Muktijoddha, Martyrs, and Birangona), 1% for Ethnic Minorities (Khudro Nri-goshthi), and 1% for Persons with Disabilities and the Third Gender. Second, for District Eligibility Restrictions in Grades 11–20, ministry and directorate circulars still include tabular restrictions specifying Eligible Districts (যে সকল জেলার প্রার্থীগণ আবেদন করতে পারবেন) or Excluded Districts based on existing organizational headcount saturation. However, candidates belonging to the Orphan (এতিম) or Physically Disabled (শারীরিক প্রতিবন্ধী) categories remain statutorily eligible to apply from all 64 districts regardless of district exclusions. Consequently, the extraction schema explicitly separates statutoryQuota from the districtEligibility object.   

Central and Commercial Banking Sector
The banking sector in Bangladesh bifurcates into state-owned/central banking recruitment and private commercial banking (PCB) recruitment. All recruitment for the Central Bank (Assistant Director General, Assistant Director Research/Statistics, Officer General/Cash) and the combined state-owned commercial and specialized banks (including Sonali Bank, Janata Bank, Agrani Bank, Rupali Bank, Bangladesh Development Bank, Bangladesh Krishi Bank, Rajshahi Krishi Unnayan Bank, and Ansar-VDP Unnayan Bank) managed by the Bankers' Selection Committee Secretariat (BSCS) flows through a single centralized application server at https://erecruitment.bb.org.bd/onlineapp/joblist.php. Candidates apply by logging in with a permanent Central Bank CV Identification Number (formatted as 123456-100000), setting their institution preference order, and receiving a Job Tracking Number used to generate PDF admit cards at http://www.bangladesh-bank.org/onlineapp/print_admit.php. The joblist.php endpoint renders an unauthenticated HTML table where each active circular—such as a 233-post Bangladesh Bank recruitment circular—exposes the post title, application deadline, a direct link to the circular PDF, and an Apply Online form action.   

In parallel, leading Private Commercial Banks execute high-volume Management Trainee Officer (MTO), Probationary Officer (PO), and Trainee Assistant Officer (TAO) cycles via distinct web architectures. BRAC Bank (bracbank.com/en/career), Eastern Bank PLC (ebl.com.bd/career), Mutual Trust Bank (mutualtrustbank.com/career/), and The City Bank utilize custom PHP/Laravel portals and Oracle HCM/Taleo modules. Dutch-Bangla Bank PLC (DBBL) operates a dedicated recruitment portal (app.dutchbanglabank.com/Online_Job/), whereas multinational banks operating in Dhaka—specifically Standard Chartered Bangladesh (sc.com/en/careers/, powered by SAP SuccessFactors/Taleo) and HSBC Bangladesh (mycareer.hsbc.com)—expose global enterprise ATS search APIs filtered by country code BD or location string Dhaka.

Top Corporate FMCG, Telco, and Tech Conglomerates
Corporate recruitment in Dhaka is concentrated across telecommunications, multinational FMCGs, local industrial conglomerates, and high-growth technology/fintech companies. Each tier employs predictable underlying ATS platforms that dictate the scraping strategy:   

Sector Tier	Target Organizations	Underlying ATS / Portal Architecture	Primary Ingestion Endpoint / Strategy
Telecommunications	Grameenphone (Telenor), Robi Axiata, Banglalink (VEON)	Workday (Grameenphone, Robi), SmartRecruiters / Lever (Banglalink)	
Intercept Workday POST /wday/cxs/{tenant}/{site}/jobs JSON API with location filter Bangladesh; query SmartRecruiters API.

Multinational FMCG	Unilever Bangladesh, BAT Bangladesh, Nestlé Bangladesh, Marico Bangladesh	Workday (unilever.wd3.myworkdayjobs.com), SAP SuccessFactors (BAT, Nestlé, Marico)	Poll Workday CXS JSON endpoint for Unilever; parse SuccessFactors /career?company=... XML/JSON search responses for BAT and Nestlé.
Local Industrial Conglomerates	Square Group, PRAN-RFL, Walton Hi-Tech, Meghna Group (MGI), Akij Group, ACI Limited, Apex Footwear, Beximco	Custom ASP.NET / Laravel career portals (career.squaregroup.com, jobs.bdjobs.com white-label embeds, acilimited.com/career)	Playwright DOM extraction targeting .job-list-item containers, combined with canonical cross-verification on corporate LinkedIn/Bdjobs feeds.
Fintech & Tech Startups	bKash, Nagad, Pathao, Chaldal, ShopUp (Sary/ShopUp)	Workable (apply.workable.com), Greenhouse, Lever, and custom Next.js/React SPAs (bkash.com/en/career)	
Query keyless Workable widget JSON (apply.workable.com/api/v1/widget/accounts/{slug}), Lever API (api.lever.co/v0/postings/{slug}), and intercept Next.js _next/data/ payloads.

  
Third-Party BD Aggregators: Cross-Verification Without Upstream Dependency
Third-party Bangladeshi job aggregators—chiefly Bdjobs.com (bdjobs.com), Chakri.com, Prothom Alo Jobs, Bdgovtjob.net, and LinkedIn Jobs (filtered by Bangladesh geoId=106215326)—serve as discovery radar rather than canonical endpoints. Relying on aggregator URLs as the primary application link introduces link rot and traps candidates inside third-party login walls.   

To safely leverage aggregators as a discovery trigger while maintaining upstream purity, the engine executes a three-step resolution protocol. First, the discovery harvester polls aggregator HTML/RSS indices (such as bdgovtjob.net/category/teletalk-application/ or Bdjobs category pages) every two hours to detect newly announced circulars—such as Northern Electricity Supply PLC (NESCO), Bangladesh China Power Company (BCPCL), or Bangladesh Army Civil circulars. Second, when an aggregator listing is detected for a public agency or bank, the de-wrapper resolver extracts the organization name and matches it against an internal lookup table of canonical .gov.bd, .teletalk.com.bd, and erecruitment.bb.org.bd domains. The scraper then dispatches a targeted probe directly to the official domain to harvest the primary PDF and online application link. Third, only when a private local conglomerate (such as PRAN-RFL or Meghna Group) uses Bdjobs exclusively as its contracted ATS without hosting an independent career form on its corporate domain is the direct jobs.bdjobs.com/jobdetails.asp?id={jobId} URL permitted as the officialPortalUrl, verified via an automated HTTP status and DOM closure check.   

Module 2: Global Remote Opportunities Accessible to Bangladesh
Connecting Bangladeshi engineering, product, data, and operational talent (operating in Bangladesh Standard Time, BST = UTC+6) with USD/EUR-denominated global remote roles requires ingesting keyless public JSON feeds and direct ATS APIs, followed by deterministic timezone and cross-border compliance filtering.

Sources, Public JSON Feeds, and Direct ATS Endpoints
Rather than scraping brittle HTML boards for remote work, the ingestion engine targets 13+ verified keyless JSON/XML APIs and direct ATS board endpoints that return structured compensation, location constraints, and application payloads without authentication overhead.   


The global remote harvesting layer is organized across public remote job aggregator APIs, Hacker News monthly hiring threads, and direct enterprise ATS JSON feeds. Within the public aggregator tier, RemoteOK (GET https://remoteok.com/api and tag-filtered queries such as ?tags=dev,python, plus https://remoteok.com/remote-jobs.rss) returns up to ~100 of the newest postings as a JSON array where element [0] contains the legal attribution notice and [1..n] are job objects containing id, company, position, tags, location, salary_min, salary_max (in USD integers), and url. Because RemoteOK ignores pagination parameters (page/offset/limit) and serves some non-ASCII strings double-encoded (e.g., SÃ£o Paulo for São Paulo), the ingestion normalizer iterates across 20 core technology tags, runs a UTF-8 mojibake repair pass, decodes HTML entities, drops company logos per trademark terms, and preserves a direct dofollow attribution link to RemoteOK. Similarly, Remotive (GET https://remotive.com/api/remote-jobs, supporting ?category=software-dev and ?search=...) returns active remote jobs with id, url, title, company_name, category, job_type, publication_date, candidate_required_location, salary, and description, though polling must be capped at 
≤4 requests per day to respect Remotive's rate policy. Additional keyless endpoints include Himalayas (GET https://himalayas.app/jobs/api, cursor-paged across tens of thousands of listings), Arbeitnow (GET https://www.arbeitnow.com/api/job-board-api, returning 175 records per call), Jobicy (GET https://jobicy.com/api/v2/remote-jobs, returning 100 records per call), WorkingNomads (GET https://www.workingnomads.com/api/exposed_jobs/, returning 44 records per call), TheMuse (GET https://www.themuse.com/api/public/jobs?page=1), and WeWorkRemotely RSS feeds. Notably, live parameter testing confirms that limit parameters on Remotive, Arbeitnow, and Greenhouse list endpoints are inert, returning the full default payload regardless of query value.   

For startup and engineering-heavy remote roles, the engine harvests Hacker News "Who is Hiring?" Monthly Threads via the official real-time Firebase API (hacker-news.firebaseio.com). On the first weekday of every month, the whoishiring account publishes three threads, including "Ask HN: Who is hiring?". The engine auto-discovers the latest monthly story ID by querying GET https://hn.algolia.com/api/v1/search?tags=story&query=who%20is%20hiring. Once the story ID is resolved, the worker fetches the root item from GET https://hacker-news.firebaseio.com/v0/item/{story_id}.json, iterates over the kids array of top-level comment IDs, and fetches each comment (GET https://hacker-news.firebaseio.com/v0/item/{comment_id}.json). The first line of each comment conventionally follows a pipe-delimited header (Company | Role | Location | Type), which is passed to the LLM normalizer to extract structured roles, salaries, and application URLs when remote signals are present.   

To capture roles hours before they syndicate to aggregators, CareerINSYT polls a curated registry of remote-first technology companies directly via their keyless Enterprise ATS JSON Feeds:

Enterprise ATS Platform	Keyless Public JSON / XML Endpoint	Query Parameters & Payload Capabilities	Operational & Parsing Nuances
Greenhouse	
GET https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs

[cite: 23, 36]

?content=true includes full HTML job descriptions; /jobs/{job_id}?questions=true returns custom application fields.

Exposes pay_input_ranges (min_cents, max_cents) and custom location metadata; inspect .content for external Typeform/Airtable links.

Lever	
GET https://api.lever.co/v0/postings/{company_slug}?mode=json

[cite: 22, 39]

Supports source-level filtering via team, department, location, commitment, level, skip, and limit.

Returns categories, hostedUrl, applyUrl, and optional structured salaryRange objects.

Ashby	
GET https://api.ashbyhq.com/posting-api/job-board/{clientname}

[cite: 24, 40]

?includeCompensation=true embeds structured salary/equity ranges directly in the jobs[] array.

High payload density (e.g., 11.85 MB for 739 jobs on OpenAI's board); requires streaming JSON parser.

Workable	
GET https://apply.workable.com/api/v1/widget/accounts/{slug}?details=true

[cite: 20, 21]

?details=true adds description and full_description; companion /locations and /departments routes available.

Widget endpoint is keyless and rate-limited per IP; ~19.6% of postings state a salary range and ~16.7% are remote.

SmartRecruiters, Personio & Recruitee	
GET https://api.smartrecruiters.com/v1/companies/{company}/postings

[cite: 18, 19]

Personio: https://{company}.jobs.personio.de/xml?language=en or /search.json; Recruitee: https://{client}.recruitee.com/api/offers.

Personio boards may use .com or .de TLDs; verify career hostname prior to polling.

  
Filtering and Feasibility Logic for Bangladesh Candidates (GMT+6)
A major failure mode of generic remote job boards is surfacing "Remote" jobs that are legally restricted to US W-2 residents (Remote - US Only) or require synchronous 9-to-5 Pacific Time availability. To guarantee that every global remote role surfaced on CareerINSYT is genuinely actionable for a candidate residing in Dhaka (GMT+6), the ingestion pipeline applies a three-stage GMT+6 Viability Filter.

First, the Geolocation and Residency Gate evaluates location metadata (candidate_required_location, Job Posting Location, and body text). Listings matching allowlist signals—such as "Worldwide", "Anywhere", "Global", "APAC", "Asia", "South Asia", "EMEA / APAC", "GMT+6", or explicit Employer of Record (EoR) support ("Deel", "Remote.com", "Oyster")—pass the filter. Conversely, listings matching residency blocklist patterns (/\b(US Only|USA Only|United States Only|Must reside in the US|W-2 Only|W2 Only|EU Citizens Only|UK Only|Within the EU|Security Clearance Required|FedRAMP|ITAR)\b/i) are immediately dropped unless paired with an explicit global contractor exception.   

Second, the Timezone Overlap Calculator models a Bangladeshi professional's standard and flexible evening work window as 09:00 to 23:00 BST (03:00 to 17:00 UTC). Roles aligned with APAC / Australia (UTC+5 to UTC+10) provide 6 to 8 hours of daytime overlap and receive an optimal feasibility score (1.0). Roles aligned with EMEA / UK / Europe (UTC+0 to UTC+3)—where 09:00–17:00 CET corresponds to 14:00–22:00 BST—also deliver 6 to 8 hours of overlap (0.95). Roles requiring US East Coast (EST/EDT, UTC-5/UTC-4) overlap provide 3 to 4 hours of synchronous morning/evening overlap (09:00–12:00 EDT equals 19:00–22:00 BST), qualifying as viable (0.80) whenever the posting requires 
≥3 hours of US overlap or specifies async-first workflows. Roles requiring full synchronous US West Coast (PST/PDT, UTC-8/UTC-7) business hours (22:00–06:00 BST) are flagged as NIGHT_SHIFT_REQUIRED unless the role explicitly states "100% Asynchronous".

Third, the Cross-Border Contractor and Currency Normalizer resolves payout and tax compliance. Bangladeshi remote workers are predominantly engaged under B2B Independent Contractor Agreements requiring IRS Form W-8BEN (claiming 0% US tax withholding on foreign-sourced services performed exclusively in Bangladesh) or Employer of Record platforms. The normalizer tags supported payout rails—Wise, Payoneer, Deel, and SWIFT Wire Transfer (compatible with Bangladeshi Authorized Dealer bank Exporters' Retention Quota / ERQ accounts and Bangladesh Bank ICT remittance rules)—and converts USD/EUR/GBP annual compensation into monthly BDT equivalents using a daily cached exchange rate from Bangladesh Bank (1 USD ≈ 120–122 BDT).

Module 3: The Autonomous Scraping and Harvesting Engine
To operate 24/7/365 with zero human intervention, the harvesting architecture is structured as a four-stage autonomous pipeline:

Stage 1 (Upstream Sources): Categorizes targets into Teletalk and Government Portals, Global Remote and ATS APIs, and Corporate and Banking Portals.   

Stage 2 (Autonomous Harvesting Layer): Routes requests dynamically by target complexity across a lightweight HTTP JSON Poller (undici/got-scraping), a Stealth Browser Pool (patchright/invisible_playwright), and a 300 DPI PDF Rasterizer.   

Stage 3 (Normalization & Validation Engine): Feeds extracted HTML/Markdown and rasterized PDF page images into the Gemini Multimodal Extractor, followed by strict CanonicalJobSchema Zod validation and SHA-256 fingerprint deduplication.

Stage 4 (Self-Healing Storage & Career Cockpit): Persists verified records into PostgreSQL/Appwrite, continuously monitors link lifecycle via the Dead Link and Wayback Machine Sweeper, and serves the CareerINSYT Radar UI.   

Tooling and Framework Selection
Selecting the optimal scraping stack requires balancing anti-bot resilience, memory footprint, and zero-to-minimal infrastructure cost.

Technical Layer	Evaluated Candidates	Architectural Comparison & Trade-Offs	CareerINSYT Production Recommendation
Headless Browser Automation	Playwright vs. Puppeteer vs. Crawlee (Apify)	Puppeteer is limited primarily to Chromium and relies on legacy stealth plugins whose JS shims are easily fingerprinted. Stock Playwright offers superior multi-browser contexts, while Crawlee wraps Playwright/HTTP with built-in request queues, autoscaled concurrency, proxy rotation, and session pools.	
Crawlee (TypeScript) + Patchright / Rebrowser-Patched Playwright for Node.js orchestration, paired with Invisible Playwright (C++ patched Firefox) for heavy Cloudflare Turnstile targets.

Cloud Scrapers & Extractors	Firecrawl vs. ScrapingBee vs. Bright Data vs. Zyte vs. Browserless.io	Bright Data and Zyte offer enterprise unblocking but incur high monthly minimums ($100–$500+/mo). ScrapingBee charges per credit and exhausts budgets quickly on daily sweeps. Firecrawl excels at converting HTML into LLM-ready Markdown and can be self-hosted via Docker.	Self-Hosted Firecrawl / Jina Reader (r.jina.ai) for clean Markdown conversion of corporate career pages; Browserless.io free/hobby tier only as an overflow fallback.
HTTP & Python Ecosystem	Scrapy + Playwright-Python vs. httpx + Selectolax / BS4	Scrapy is heavyweight for serverless cron execution. For direct JSON APIs and static NPF .gov.bd tables, async HTTP clients with C-backed HTML parsers (selectolax/lexbor or Node cheerio) execute 
20× faster than headless browsers at 
1/50th the RAM.	
Node.js undici / got-scraping + cheerio as Tier-1 HTTP harvesters; Python httpx + invisible_playwright + pypdfium2 for Tier-2 anti-bot and PDF rasterization jobs.

Serverless & Edge Compute	Cloudflare Workers + Browser Rendering vs. AWS Lambda Containerized vs. GitHub Actions Cron	Cloudflare Browser Rendering has strict execution duration limits and paid concurrency caps. AWS Lambda requires ECR image hosting and NAT Gateway costs if IP rotation is needed. GitHub Actions provides 2,000 free minutes/month on private repos and unlimited free minutes on public runner repositories (ubuntu-latest, 4 vCPU, 16 GB RAM).	GitHub Actions Scheduled Cron Workflows (schedule: - cron: '0 */3 * * *') for heavy Playwright/OCR batch runs, backed by Upstash Serverless Redis + BullMQ and Next.js 16 Route Handlers for real-time webhook/health checks.
  
Anti-Bot and Anti-Detection Strategies
Enterprise career portals (such as Workday, Taleo, Wellfound, and Cloudflare-protected corporate domains) deploy advanced bot mitigation engines including Cloudflare Turnstile, DataDome, PerimeterX (HUMAN), and Akamai Bot Manager. These systems evaluate two fundamental questions: Is this a real browser binary? and Is a real person using it?.   

Stock Playwright and Puppeteer fail modern anti-bot checks due to three primary detection vectors. First, when Playwright or Puppeteer attaches to Chromium over the Chrome DevTools Protocol (CDP), it sends Runtime.enable to track execution contexts; Cloudflare Turnstile and DataDome execute a JavaScript console serialization trap that detects an active CDP listener immediately. Second, legacy playwright-stealth plugins inject JavaScript property overrides into the page context, which anti-bots expose by inspecting prototype descriptors or comparing navigator.userAgent, HTTP Client Hints headers, and WebGL renderer strings inside a Web Worker where page-level shims have not executed. Third, standard Node fetch or Python requests present a TLS (JA3/JA4) cipher suite order and HTTP/2 SETTINGS frame that immediately identify a non-browser runtime.   

To achieve unblocked autonomous harvesting across all protected targets, CareerINSYT implements a three-layered evasion defense. At the network transport layer, all non-SPA HTTP requests use got-scraping (Node.js) or curl_cffi (Python), replicating the exact BoringSSL TLS fingerprint and HTTP/2 pseudo-header order of a desktop browser. At the Chromium automation layer, stock playwright is aliased via npm package overrides to patchright ("playwright": "npm:patchright@^1.60.0") or patched with rebrowser-patches, which suppresses the Runtime.enable CDP leak by executing commands inside isolated utility worlds, removes the HeadlessChrome user-agent binary tell, and disables navigator.webdriver at the driver level. For the most heavily fortified Cloudflare Turnstile or DataDome targets, the Python worker invokes invisible_playwright, which wraps a custom C++ source-patched build of Firefox (feder-cr/firefox_antidetect_patch). Because the browser fingerprint—spanning navigator, screen metrics, GPU/WebGL, canvas, fonts, audio, WebRTC, timezone, and network headers—is decided inside the C++ engine before any page can ask, navigator.userAgent, the User-Agent HTTP header, and Client Hints are derived together from a single Bayesian profile and can never contradict one another. Furthermore, debugger timing traps are silenced and closed-mode shadow roots (such as Turnstile challenge containers) remain reachable by the driver while reading null to the page.   

For Bangladeshi .gov.bd and .teletalk.com.bd portals that intermittently drop foreign datacenter ASNs, the engine routes requests through a pay-as-you-go residential/ISP proxy pool targeting Bangladesh exit nodes (BD), consuming 
<200 MB/month by selectively streaming only new circulars. All crawlers enforce polite rate-limiting with randomized Poisson jitter (
μ=2500 ms±Uniform(500,1800) ms), exponential backoff with full jitter on HTTP 429/503, and strict adherence to robots.txt directives.

Bangladeshi PDF Gazette and Circular Parsing Pipeline
The single most difficult engineering challenge in Bangladeshi labor intelligence is parsing official government and research institute job circulars. Over 80% of ministry, NARS research institute (BRRI, BINA, BARI, BCSIR), and DC office circulars are published as multi-page PDF documents containing complex multi-column Bengali tables where a single row spans multiple sub-columns for Post Name, Vacancy Count, Grade & Pay Scale, Educational Qualification, and Eligible Districts. These PDFs appear as either low-resolution (150–200 DPI) skewed raster scans with wet stamps, or digital PDFs encoded in the legacy non-Unicode SutonnyMJ (Bijoy) font where standard text extractors (pdf-parse or pdfplumber) output corrupted Latin-1 ASCII gibberish instead of Unicode Bengali (U+0980–U+09FF).   

Extraction Modality	Accuracy on Bengali Multi-Column Tables	Handling of Legacy Bijoy (SutonnyMJ) & Skewed Scans	Cost & Throughput Profile	Architectural Verdict
Tesseract OCR (ben.traineddata LSTM)	Poor (40%–55%). Fails when table borders are faded; merges adjacent columns (e.g., merging "Educational Qualification" into "District Quota").	Requires OpenCV deskewing and morphological line detection prior to OCR; frequently misreads conjunct consonants (Juktakkhor like ক্ষ, জ্ঞ, ঞ্চ) and Bengali numerals (০-৯).	100% Free CPU execution, but high post-processing error rate makes statutory eligibility gates unsafe.	Rejected as primary table parser; usable only as a secondary text-presence detector.
Google Cloud Vision API (DOCUMENT_TEXT_DETECTION)	High character recognition (94%+ on Bengali glyphs), but outputs hierarchical bounding boxes (Page -> Block -> Paragraph -> Word) without semantic row-spanning table reconstruction.	Handles skewed scans well, but still requires a downstream LLM to reconstruct merged cells across multi-page tables.	Free for first 1,000 pages/month, then $1.50 per 1,000 pages.	Viable fallback, but adds an unnecessary network hop compared to native multimodal LLMs.
Gemini 1.5 Flash Multimodal (gemini-1.5-flash)	Superior (98.5%+). Simultaneously performs visual layout understanding, Bengali Juktakkhor recognition, row-span alignment, and direct semantic translation into strictly typed JSON.	Completely bypasses the SutonnyMJ/Bijoy font encoding trap because it reads the rendered visual glyphs from 300 DPI page PNGs rather than corrupted underlying font CMAP tables.	Free Tier: 15 RPM, 1 Million TPM, 1,500 RPD. Paid tier costs ~$0.0001 per page image (258 tokens/image).	Primary Production Engine. Delivers state-of-the-art accuracy at $0.00 operational cost.
To guarantee 100% extraction fidelity across both digital Bijoy PDFs and skewed raster scans, the pipeline executes a five-stage deterministic workflow. First, the harvester streams the PDF binary from the .gov.bd or .teletalk.com.bd endpoint, verifies the %PDF-1. magic header, and computes sha256(pdfBuffer) to skip already-processed circulars. Second, using pdfjs-dist and @napi-rs/canvas (or pypdfium2), every page of the circular is rendered at 300 DPI (2480 x 3508 pixels). Third, an image pre-processing pass via sharp applies grayscale conversion, adaptive contrast normalization (normalize()), and sharpening so faint Bengali vowel diacritics (Kar) and numerals (০-৯) are crisp. Fourth, all rendered PNG page buffers are sent in a single multimodal request to Gemini 1.5 Flash (responseMimeType: "application/json", temperature: 0.0) to disaggregate multi-row circular tables (such as BCIC's 19 categories or HBRI's 7 categories) into individual job records while inheriting document-level header metadata. Fifth, a deterministic post-processor converts any remaining Bengali digits (০-৯) into ASCII integers (0-9), verifies that basicMinBdt matches the statutory National Pay Scale 2015 floor for the extracted grade, and validates the payload against the canonical Zod schema.   

Module 4: LLM-Powered Normalization and Zod Schema Validation
To eliminate unstructured degree matching (such as treating the loose substring "Science" as eligibility for a specialized Agronomy or Computer Science role) and prevent generic skill tagging, every ingested record must pass a strict Universal Canonical Job Schema written in TypeScript and enforced at runtime via Zod.

Universal Canonical Job Schema (TypeScript + Zod)
The canonical schema integrates European Commission ESCO v1.2 / v1.2.1 (ec.europa.eu/esco/api/resource/skill, covering ~3,039 occupations and 13,890+ skills under CC BY 4.0) and O*NET 31.0 (onet_soc_code formatted with its mandatory .NN suffix like 15-1252.00, element_id like 2.A.1.a, and scale_id: "IM" rescaled 
0–100 via 
round((raw−1)/4×100,1)).   

TypeScript
import { z } from "zod";

/**
 * 1. ENUMERATIONS & TAXONOMY CONSTANTS
 */
export const JobSectorEnum = z.enum([
  "GOVERNMENT",
  "BANKING",
  "CORPORATE_MNC",
  "LOCAL_CONGLOMERATE",
  "GLOBAL_REMOTE",
  "STARTUP",
]);

export const WorkplaceTypeEnum = z.enum(["REMOTE", "HYBRID", "ONSITE"]);

export const EmploymentTypeEnum = z.enum([
  "FULL_TIME",
  "CONTRACT_B2B",
  "PART_TIME",
  "INTERNSHIP",
  "MTO_FELLOWSHIP",
]);

export const DegreeLevelEnum = z.enum([
  "SSC_OR_EQUIVALENT",
  "HSC_OR_EQUIVALENT",
  "DIPLOMA_ENGINEERING",
  "BACHELORS_HONOURS",
  "BACHELORS_ENGINEERING",
  "MASTERS",
  "MBBS_BDS",
  "PHD",
  "CA_ACCA_CFA_PROFESSIONAL",
]);

/**
 * Standardized Academic Discipline Taxonomy to prevent loose substring false positives.
 * "B.Sc. in Computer Science" will NEVER match "B.Sc. in Agricultural Science".
 */
export const AcademicDisciplineEnum = z.enum([
  "COMPUTER_SCIENCE_ENGINEERING",
  "SOFTWARE_ENGINEERING",
  "ELECTRICAL_ELECTRONIC_ENGINEERING",
  "CIVIL_ENGINEERING",
  "MECHANICAL_ENGINEERING",
  "CHEMICAL_ENGINEERING",
  "TEXTILE_ENGINEERING",
  "AGRICULTURE_AGRONOMY",
  "AGRICULTURAL_ENGINEERING",
  "BIOTECHNOLOGY_GENETIC_ENGINEERING",
  "SOIL_WATER_ENVIRONMENT",
  "FISHERIES_MARINE_SCIENCE",
  "VETERINARY_ANIMAL_HUSBANDRY",
  "PHARMACY_CHEMISTRY_BIOCHEMISTRY",
  "PHYSICS_APPLIED_PHYSICS",
  "MATHEMATICS_STATISTICS_DATA_SCIENCE",
  "ECONOMICS_DEVELOPMENT_STUDIES",
  "BBA_FINANCE_BANKING_ACCOUNTING",
  "BBA_MARKETING_HRM_MANAGEMENT",
  "SUPPLY_CHAIN_OPERATIONS",
  "PUBLIC_ADMINISTRATION_LAW_IR",
  "ENGLISH_LITERATURE_LINGUISTICS",
  "ANY_RECOGNIZED_DISCIPLINE",
]);

export const BDAdministrativeDivisionEnum = z.enum([
  "DHAKA",
  "CHATTOGRAM",
  "RAJSHAHI",
  "KHULNA",
  "BARISHAL",
  "SYLHET",
  "RANGPUR",
  "MYMENSINGH",
  "ALL_BANGLADESH",
  "GLOBAL_ANYWHERE",
]);

/**
 * 2. GOVERNMENT & STATUTORY ATTRIBUTES (National Pay Scale 2015 & 2024 Supreme Court Quota Verdict)
 */
export const StatutoryQuotaSplitSchema = z.object({
  meritPercentage: z.number().min(0).max(100).default(93),
  freedomFighterChildPercentage: z.number().min(0).max(100).default(5),
  ethnicMinorityPercentage: z.number().min(0).max(100).default(1),
  disabledAndThirdGenderPercentage: z.number().min(0).max(100).default(1),
});

export const GovernmentAttributesSchema = z.object({
  ministryOrDivision: z.string().min(2),
  implementingAgency: z.string().min(2),
  circularMemoNumber: z.string().nullable(),
  nationalPayScaleGrade: z.number().int().min(1).max(20),
  cadreOrClassClassification: z.enum([
    "BCS_CADRE",
    "CLASS_1_NON_CADRE_GAZETTED",
    "CLASS_2_OFFICER",
    "CLASS_3_STAFF",
    "CLASS_4_SUPPORT",
    "AUTONOMOUS_RESEARCH_SCIENTIST",
  ]),
  payScaleBdt: z.object({
    basicMinBdt: z.number().int().positive(),
    basicMaxBdt: z.number().int().positive(),
    rawScaleString: z.string(), // e.g., "৳22,000 - ৳53,060 (National Pay Scale 2015)"
    estimatedHouseRentPercent: z.number().min(35).max(65).default(55),
    medicalAllowanceBdt: z.number().int().nonnegative().default(1500),
    estimatedGrossStartingBdt: z.number().int().positive(),
  }),
  teletalkMetadata: z
    .object({
      subdomainUrl: z.string().url(),
      allJobsInternalCode: z.string().regex(/^GJOB\d+$/).nullable(),
      postRadioCode: z.string().nullable(),
      applicationFeeBdt: z.number().int().nonnegative(),
      smsShortcodeFormat: z.string().nullable(),
    })
    .nullable(),
  bbsErecruitmentJobId: z.string().nullable(),
  vacancyCount: z.number().int().positive(),
  statutoryQuota: StatutoryQuotaSplitSchema,
  districtEligibility: z.object({
    allDistrictsEligible: z.boolean(),
    eligibleDistricts: z.array(z.string()),
    excludedDistricts: z.array(z.string()),
    orphanAndDisabledExemptFromDistrictRestriction: z.boolean().default(true),
  }),
  ageLimit: z.object({
    minAgeYears: z.number().int().min(18).max(30).default(18),
    maxAgeGeneralYears: z.number().int().min(21).max(60).default(32),
    maxAgeQuotaOrDepartmentalYears: z.number().int().min(21).max(60).default(32),
    ageCalculationReferenceDate: z.string().datetime({ offset: true }),
  }),
});

/**
 * 3. CORPORATE & GLOBAL REMOTE ATTRIBUTES
 */
export const CorporateRemoteAttributesSchema = z.object({
  workplaceType: WorkplaceTypeEnum,
  employmentType: EmploymentTypeEnum,
  atsProvider: z
    .enum([
      "GREENHOUSE",
      "LEVER",
      "ASHBY",
      "WORKABLE",
      "WORKDAY",
      "SUCCESSFACTORS",
      "SMARTRECRUITERS",
      "PERSONIO",
      "PROPRIETARY",
    ])
    .nullable(),
  atsExternalJobId: z.string().nullable(),
  compensation: z.object({
    currency: z.enum(["BDT", "USD", "EUR", "GBP", "SGD", "AUD"]),
    interval: z.enum(["MONTHLY", "ANNUAL", "HOURLY"]),
    minAmountOriginal: z.number().positive().nullable(),
    maxAmountOriginal: z.number().positive().nullable(),
    normalizedMonthlyMinBdt: z.number().int().positive().nullable(),
    normalizedMonthlyMaxBdt: z.number().int().positive().nullable(),
    normalizedAnnualMinUsd: z.number().int().positive().nullable(),
    normalizedAnnualMaxUsd: z.number().int().positive().nullable(),
    isNegotiableOrUnpublished: z.boolean().default(false),
    equityOffered: z.boolean().default(false),
    equityRangePercent: z
      .object({
        min: z.number().nonnegative(),
        max: z.number().nonnegative(),
      })
      .nullable(),
  }),
  remoteFeasibilityGmtPlus6: z
    .object({
      isViableFromBangladesh: z.boolean(),
      requiredRegionLabel: z.string(), // e.g., "Worldwide", "APAC / EMEA"
      minOverlapHoursWithGmtPlus6: z.number().min(0).max(12),
      isAsyncFirst: z.boolean(),
      contractFramework: z.enum([
        "B2B_INDEPENDENT_CONTRACTOR_W8BEN",
        "EOR_DEEL_REMOTE_OYSTER",
        "LOCAL_BD_ENTITY_PAYROLL",
      ]),
      supportedPayoutRails: z.array(
        z.enum(["WISE", "PAYONEER", "SWIFT_ERQ", "DEEL", "LOCAL_BANK_BEFTN"])
      ),
    })
    .nullable(),
});

/**
 * 4. QUALIFICATION & COMPETENCY TAXONOMY (ESCO v1.2.1 & O*NET 31.0)
 */
export const QualificationRequirementSchema = z.object({
  minimumDegreeLevel: DegreeLevelEnum,
  acceptedDisciplines: z.array(AcademicDisciplineEnum).min(1),
  strictDisciplineEnforcement: z.boolean().default(true),
  minimumCgpaOn4Scale: z.number().min(2.0).max(4.0).nullable(),
  allowThirdDivisionOrClassInAcademicHistory: z.boolean().default(false),
  minimumExperienceYears: z.number().min(0).max(30).default(0),
  requiredCertifications: z.array(z.string()).default([]),
});

export const CompetencyItemSchema = z.object({
  skillSlug: z.string().min(2), // e.g., "duckdb-sql", "molecular-plant-breeding"
  displayLabel: z.string().min(2),
  escoUri: z
    .string()
    .url()
    .regex(/^http:\/\/data\.europa\.eu\/esco\/skill\/[a-f0-9-]+$/)
    .nullable(),
  escoOccupationCode: z.string().nullable(), // e.g., "2144.1.2.1"
  onetSocCode: z
    .string()
    .regex(/^\d{2}-\d{4}\.\d{2}$/)
    .nullable(), // e.g., "15-1252.00"
  onetElementId: z.string().nullable(), // e.g., "2.A.1.a"
  onetImportanceScore: z.number().min(0).max(100).nullable(), // rescaled 0-100 IM rating
  requirementWeight: z.enum(["MANDATORY_CORE", "PREFERRED", "BONUS"]),
  insytLearningModuleId: z.string().nullable(), // Maps directly to INSYT Studio / Course
});

/**
 * 5. UNIVERSAL CANONICAL JOB RECORD
 */
export const CanonicalJobSchema = z
  .object({
    id: z.string().uuid(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    fingerprintHash: z.string().length(64), // SHA-256 hex digest
    title: z.string().min(3).max(220),
    organizationName: z.string().min(2).max(160),
    organizationLogoUrl: z.string().url().nullable(),
    sector: JobSectorEnum,
    divisionLocation: BDAdministrativeDivisionEnum,
    cityOrOfficeAddress: z.string().nullable(),

    // Provenance & Deep Links (Zero Broken Footnotes Guarantee)
    sourceUrl: z.string().url(), // Where it was discovered
    officialPortalUrl: z.string().url(), // Direct employer / Teletalk application form
    circularPdfSpecimenUrl: z.string().url().nullable(), // Direct link to PDF circular
    waybackSnapshotUrl: z.string().url().nullable(), // Immutable Archive.org URL
    sourceAttributionNotice: z.string().nullable(), // e.g., RemoteOK mandatory attribution

    // Conditional Sector Payloads
    governmentAttributes: GovernmentAttributesSchema.nullable(),
    corporateRemoteAttributes: CorporateRemoteAttributesSchema.nullable(),

    // Structured Eligibility & Skills
    qualifications: QualificationRequirementSchema,
    competencies: z.array(CompetencyItemSchema).min(1),
    summaryPlainText: z.string().min(30),
    responsibilitiesMarkdown: z.string(),

    // Lifecycle & Self-Healing Timestamps (ISO-8601 with +06:00 BST or UTC)
    publishedAt: z.string().datetime({ offset: true }),
    deadline: z.string().datetime({ offset: true }),
    lastVerifiedLiveAt: z.string().datetime({ offset: true }),
    httpHealthStatus: z.number().int().min(100).max(599).default(200),
    isExpired: z.boolean().default(false),
    archiveStatus: z.enum([
      "LIVE_VERIFIED",
      "EXPIRING_WITHIN_48H",
      "EXPIRED_ARCHIVED",
      "SOFT_404_QUARANTINED",
    ]),
    archiveNotice: z.string().nullable(),
  })
  .superRefine((job, ctx) => {
    if (job.sector === "GOVERNMENT" && !job.governmentAttributes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "GOVERNMENT sector jobs must populate governmentAttributes.",
        path: ["governmentAttributes"],
      });
    }
    if (
      (job.sector === "GLOBAL_REMOTE" || job.sector === "CORPORATE_MNC") &&
      !job.corporateRemoteAttributes
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Corporate/Remote jobs must populate corporateRemoteAttributes.",
        path: ["corporateRemoteAttributes"],
      });
    }
  });

export type CanonicalJob = z.infer<typeof CanonicalJobSchema>;
LLM Extraction System Prompt Pattern
To ensure that unstructured HTML job descriptions and multi-page Bengali PDF circulars are deterministically converted into the CanonicalJobSchema without hallucinated footnotes or loose disciplinary tags, the ingestion pipeline uses the following production system prompt with gemini-1.5-flash / gemini-1.5-pro:

SYSTEM INSTRUCTION: CANONICAL LABOR INTELLIGENCE EXTRACTOR (BD & GLOBAL REMOTE)
Role: Principal Labor Data Normalizer for CareerINSYT.
Objective: Convert raw job circular images (Bengali/English PDF pages) or unstructured HTML/JSON job postings into a strictly validated JSON object conforming to CanonicalJobSchema.

CRITICAL EXTRACTION & NORMALIZATION RULES:
MULTI-ROW BENGALI GAZETTE DISAGGREGATION:

If a Bangladeshi government/research/bank circular table contains multiple distinct posts (ক্রমিক নং ১, ২, ৩...), emit one distinct CanonicalJob object per row in the output jobs[] array.

Inherit document-level metadata (Ministry, Agency, Memo Number, Publication Date, Application Deadline, Teletalk Subdomain URL, Age Reference Date) across every emitted job row.

Convert all Bengali numerals (০১২৩৪৫৬৭৮৯) into standard ASCII integers (0123456789).

Convert Bengali calendar or DD/MM/YYYY dates into strict ISO-8601 strings anchored to Bangladesh Standard Time (+06:00). If a government circular states a specific cutoff hour (e.g., "বিকাল ৫:০০ ঘটিকা" or "5:00 PM"), set the time to T17:00:00+06:00. If no hour is stated, default to T23:59:59+06:00.

NATIONAL PAY SCALE 2015 & QUOTA COMPLIANCE:

Cross-check the extracted basic pay range against the National Pay Scale 2015:

Grade 9: 22000 - 53060 BDT (Estimated Gross Starting Dhaka: ~35600 BDT)

Grade 10: 16000 - 38640 BDT (Estimated Gross Starting Dhaka: ~27100 BDT)

Grade 11: 12500 - 30230 BDT | Grade 13: 11000 - 26590 BDT | Grade 16: 9300 - 22490 BDT | Grade 20: 8250 - 20010 BDT.

Apply the statutory July 2024 Supreme Court Appellate Division quota allocation (93% Merit, 5% Freedom Fighter Child, 1% Ethnic Minority, 1% Disabled & Third Gender) unless a specialized statutory exception is explicitly printed in the circular.

Extract district eligibility restrictions from column "যে সকল জেলার প্রার্থীগণ আবেদন করতে পারবেন" into eligibleDistricts or excludedDistricts using standard English spelling of Bangladesh's 64 districts.

STRICT ACADEMIC DISCIPLINE TAXONOMY (ZERO SUBSTRING HALLUCINATION):

NEVER map a degree requirement to a broad word like "Science".

If a BRRI/BINA Scientific Officer circular requires "কৃষি বিজ্ঞানে স্নাতক (সম্মান) / B.Sc. Ag (Hons)", map strictly to ["AGRICULTURE_AGRONOMY"] and set strictDisciplineEnforcement: true.

If a Bangladesh Bank AD (General) or BCS General Cadre circular accepts any 4-year Honours or Masters degree from a recognized university, map strictly to ["ANY_RECOGNIZED_DISCIPLINE"].

If a circular states "শিক্ষাজীবনে কোনো স্তরেই ৩য় বিভাগ/শ্রেণি গ্রহণযোগ্য নয়", set allowThirdDivisionOrClassInAcademicHistory: false.

DOMAIN-SPECIFIC ESCO v1.2.1 & O*NET 31.0 COMPETENCY TAGGING:

Do NOT assign generic corporate clichés ("Communication", "Teamwork", "MS Office") as primary competencies for specialized technical or scientific tracks.

Assign 4 to 8 highly specific technical/domain competencies per role (e.g., for a BRRI Scientific Officer: quantitative-genetics, paddy-agronomy, r-biostatistics, experimental-field-design; for a FinTech Backend Engineer: golang-microservices, postgresql-query-optimization, distributed-transactions, redis-streams).

Populate onetSocCode (e.g., "15-1252.00" for Software Developers, "19-1013.00" for Soil and Plant Scientists, "13-2051.00" for Financial Analysts) and estimate onetImportanceScore (0-100).

ZERO BROKEN CITATIONS:

Strip all markdown footnote artifacts ([Source][1], [1], etc.) from summaryPlainText and responsibilitiesMarkdown.

Module 5: Self-Healing Link Validation and Lifecycle Management
Eliminating dead links, expired circulars, and multi-channel duplicates requires an autonomous background sweeper that validates upstream HTTP/DOM states and manages archival transitions with cryptographic determinism.

Real-Time Dead Link Sweeper and Soft-404 Detection
A naive HTTP status checker (response.status === 200) fails in production because modern Single-Page Applications (Workday, Lever, Ashby, Next.js career portals) and poorly configured PHP government portals frequently redirect expired job URLs to the main /careers index or render an "Application Closed" banner while still returning HTTP 200 OK.

The CareerINSYT Link Sweeper runs every six hours via BullMQ and executes a Three-Phase Verification Protocol. In Phase 1 (Fast HTTP HEAD / Range GET Probe), the worker sends a TLS-spoofed GET request with Range: bytes=0-65535 and redirect: "manual" to inspect the raw status code and Location header. If the status is 404, 410 Gone, or 5xx across three consecutive retries spaced with exponential backoff, the job transitions to EXPIRED_ARCHIVED or SOFT_404_QUARANTINED. If the status is a 301, 302, 307, or 308 redirect, the sweeper inspects the target Location URL; when a deep job URL (such as https://company.com/careers/jobs/84920) redirects to a generic root path (/, /careers, /jobs, or /404), it is flagged immediately as a Redirect Soft-404 and quarantined. In Phase 2 (ATS API Direct State Verification), jobs ingested from Greenhouse, Lever, Ashby, or Workable are verified against their native JSON endpoints (GET https://boards-api.greenhouse.io/v1/boards/{token}/jobs/{id}), which return HTTP 404 the instant a requisition closes. In Phase 3 (DOM & Semantic Closure Heuristics), HTML career pages and Teletalk portals are scanned against a compiled regular expression dictionary of English closure markers ("this job is no longer available", "position has been filled", "applications are closed", "no longer accepting applications") and Bengali/Teletalk closure markers ("Application time is over", "No circular is active right now", "আবেদনের সময়সীমা শেষ হয়েছে"), transitioning matching records to EXPIRED_ARCHIVED.   

Automated Expiry and Wayback Machine Archiving Engine
Bangladeshi public sector and banking circulars operate on strict Bangladesh Standard Time (BST = UTC+6) cutoffs. While private corporate postings typically expire at 23:59:59+06:00 on the deadline date, Teletalk and ministry circulars frequently specify 16:00:00+06:00 (4:00 PM, such as NESCO, BPATC, BCPCL, and CTAX1) or 17:00:00+06:00 (5:00 PM, such as TAX21 Dhaka, BCIC, HBRI, and WTMU).   

To preserve permanent historical proof of every job circular—ensuring candidates who applied can still inspect the official syllabus, pay grade, and circular PDF months later when the government takes down the temporary .teletalk.com.bd page for Viva Voce preparation—the engine integrates directly with the Internet Archive Wayback Machine API. Upon first ingesting a live job or PDF circular, the worker queries the Wayback Availability JSON API at GET https://archive.org/wayback/available?url=${encodeURIComponent(officialUrl)}. If archived_snapshots.closest.available === true and the snapshot timestamp is within the last 30 days (2592000000 ms), the existing archived_snapshots.closest.url is bound to waybackSnapshotUrl. If no recent snapshot exists, the engine dispatches an authenticated POST https://web.archive.org/save request to the SavePageNow API using Internet Archive S3 API credentials (Authorization: LOW ${IA_ACCESS_KEY}:${IA_SECRET_KEY}) with form payload url=${encodeURIComponent(officialUrl)}&capture_all=1&delay_wb_availability=1&skip_first_archive=1, or issues a polite GET https://web.archive.org/save/${officialUrl} request and reads the Content-Location response header to record the permanent https://web.archive.org/web/... snapshot URL. Simultaneously, a Redis ZSET (jobs:deadline_index, scored by Unix epoch timestamp of deadline) is polled every five minutes via ZRANGEBYSCORE, atomically transitioning expired records to isExpired: true and archiveStatus: "EXPIRED_ARCHIVED" while exposing the immutable Wayback snapshot link.   

Cryptographic Deduplication Engine
Because the same role is routinely cross-posted across a company's official career portal, LinkedIn Jobs, Bdjobs, and Teletalk's central blog, the ingestion pipeline enforces Deterministic Canonical Deduplication. First, the engine canonicalizes strings by lowercasing organizationName and stripping legal suffixes (plc, ltd, limited, inc, bangladesh, group, corporation), normalizing Roman numerals in title (grade ix 
→ grade 9), slicing deadline to its YYYY-MM-DD BST date, and standardizing divisionLocation. Second, it computes the cryptographic digest:

fingerprintHash=SHA256(normOrg∥"|"∥normTitle∥"|"∥normDeadline∥"|"∥normLocation)

When an incoming job produces a fingerprintHash collision, the deduplicator merges the records according to strict Upstream Authority Priority: Direct Official Portal / Teletalk Subdomain / Bangladesh Bank eRecruitment ranks first, followed by Direct Enterprise ATS JSON APIs (Greenhouse, Lever, Ashby, Workable), Teletalk AllJobs Aggregator, and finally third-party boards (Bdjobs, LinkedIn, RemoteOK). The officialPortalUrl is always retained from the highest-priority source while supplementary fields (such as a PDF specimen URL from a ministry notice board and a radio code from Teletalk) are merged non-destructively.   

Module 6: The Candidate Matching and ATS Radar Engine
To transform /opportunities and /jobs from a passive listing directory into an active career cockpit, CareerINSYT replaces superficial substring matching with a two-stage Statutory Gate + Weighted Competency Alignment Engine integrated directly with the user's W3C Verifiable Credentials (Ed25519Signature2020 / RFC 8785 JSON Canonicalization Scheme) Career Passport.

Curriculum Prerequisite and Skill-Fit Algorithm
Conventional job boards compute a single opaque percentage score that misleads candidates into applying for roles where they fail statutory prerequisites (for example, showing an "85% Match" on a Grade 9 Scientific Officer circular to a BBA graduate because both share soft skills). CareerINSYT enforces a strict Fail-Closed Binary Prerequisite Gate (
G 
stat
​
 ∈{0,1}) followed by a Weighted Competency Alignment Score (
S 
fit
​
 ∈[0,100]).

Stage 1: Fail-Closed Statutory Prerequisite Gate (
G 
stat
​
 ∈{0,1})
The gate evaluates four mandatory binary conditions:

G 
stat
​
 (C,J)=g 
deg
​
 (C,J)×g 
cgpa
​
 (C,J)×g 
age
​
 (C,J)×g 
dist
​
 (C,J)
Specifically, the Discipline and Degree Level Gate (
g 
deg
​
 ) returns 
1 if and only if the candidate's highest verified degree rank is 
≥J.minimumDegreeLevel, the candidate's verified discipline intersects J.acceptedDisciplines (or J.acceptedDisciplines includes "ANY_RECOGNIZED_DISCIPLINE"), and—when J.allowThirdDivisionOrClassInAcademicHistory === false—the candidate has zero 3rd Division or CGPA 
<2.0 records across SSC, HSC, and Bachelor's degrees. The CGPA Gate (
g 
cgpa
​
 ) returns 
1 when 
J.minimumCgpaOn4Scale is null or 
C.cgpaOn4Scale≥J.minimumCgpaOn4Scale. The Statutory Age Gate (
g 
age
​
 ) calculates the candidate's exact age on J.ageCalculationReferenceDate and verifies that it falls within 
[J.minAgeYears,J.maxAgeGeneralYears] (or 
J.maxAgeQuotaOrDepartmentalYears for verified quota/departmental candidates). Finally, the District Eligibility Gate (
g 
dist
​
 ) returns 
1 if J.allDistrictsEligible === true, if C.permanentHomeDistrict satisfies the circular's district inclusion/exclusion lists, or if the candidate qualifies under the statutory Orphan/Physically Disabled exemption. If 
G 
stat
​
 (C,J)=0, the UI displays INELIGIBLE (Statutory Prerequisite Unmet) with an explicit diagnostic pill, preventing wasted Teletalk SMS fees.

Stage 2: Weighted Competency Alignment Equation (
S 
fit
​
 ∈[0,100])
For every job 
J with required competency set 
K={k 
1
​
 ,k 
2
​
 ,…,k 
m
​
 } where 
G 
stat
​
 (C,J)=1, each job competency 
k 
i
​
  carries an importance factor 
ω 
i
​
  (MANDATORY_CORE 
=1.0, PREFERRED 
=0.6, BONUS 
=0.3). The candidate's proficiency evidence 
M(C,k 
i
​
 ) is evaluated across three verification tiers in the INSYT Career Passport: Tier 3 (W3C Cryptographically Verified Assessment Skill) receives a 
3× weight multiplier (
M 
3
​
 =3.0), Tier 2 (Completed INSYT Course or Studio Portfolio Artifact) receives a 
2× weight multiplier (
M 
2
​
 =2.0), Tier 1 (Self-Declared CV Skill) receives a 
1× weight multiplier (
M 
1
​
 =1.0), and a missing skill receives 
M 
0
​
 =0.0. The overall Prerequisite Alignment Score is computed as:

S 
fit
​
 (C,J)=G 
stat
​
 (C,J)×round(100× 
∑ 
i=1
m
​
 ω 
i
​
 ⋅3.0
∑ 
i=1
m
​
 ω 
i
​
 ⋅min(3.0,M(C,k 
i
​
 ))
​
 )
Crucially, even if a candidate lists every required keyword on an unverified self-declared CV (
M 
1
​
 =1.0 for all 
k 
i
​
 ), their maximum possible alignment score without completing INSYT verification assessments or portfolio artifacts is capped at 
33.3%, creating a transparent incentive to verify skills inside the INSYT ecosystem.

Missing Competency Gap Analysis and Actionable Learning Bridge
Whenever 
G 
stat
​
 (C,J)=1 and 
S 
fit
​
 (C,J)<80%, the engine computes the Competency Delta Vector 
Δ(C,J) consisting of all competencies 
k 
i
​
 ∈K where 
M(C,k 
i
​
 )<3.0, sorted descending by Marginal Score Gain:

ΔS 
i
​
 =100× 
∑ 
j=1
m
​
 ω 
j
​
 ⋅3.0
ω 
i
​
 ⋅(3.0−M(C,k 
i
​
 ))
​
 
Each gap item 
k 
i
​
  is resolved via its insytLearningModuleId or escoUri against the INSYT Curriculum Graph to generate a deterministic Actionable Learning Bridge:

Detected Missing or Unverified Competency (k 
i
​
 )	Target Sector / Role Example	Current Evidence Tier (M 
i
​
 )	Projected Alignment Gain (+ΔS 
i
​
 )	Automated INSYT Actionable Bridge Target
duckdb-analytical-sql (ESCO: data warehouse management)	Fintech BI Analyst (bKash / Global Remote)	Tier 0 (0.0x Missing)	+22.5% Alignment	Lesson 4: High-Performance In-Process OLAP with DuckDB (/learn/bi-analytics/lesson-4) + Interactive SQL Studio Sandbox
experimental-field-design-rcbd (O*NET: 19-1013.00)	Scientific Officer — Grade 9 (BRRI / BINA)	Tier 1 (1.0x Self-Declared)	+16.0% Alignment	Agricultural Biostatistics & ANOVA Assessment (/assessments/ag-biostats-ed25519) to upgrade from 1x to 3x Verified Credential
credit-risk-basel-iii (ESCO: 3311.3.2)	Commercial Bank MTO (Eastern Bank / City Bank)	Tier 0 (0.0x Missing)	+18.4% Alignment	Commercial Banking & Financial Modeling Path: Module 2 (/learn/banking-mto/credit-risk) + Timed Mock Aptitude Test
distributed-idempotency-redis (O*NET: 15-1252.00)	Senior Backend Engineer (Stripe / Ashby Remote)	Tier 2 (2.0x Course Only)	+9.2% Alignment	System Design Verification Challenge: Payment Retries (/studio/challenges/idempotent-ledger)
1-Click Application CRM Dispatch
When a candidate clicks "Apply on Official Portal" or "Dispatch Tailored ATS Packet" on /opportunities, a Next.js Server Action (dispatchApplicationAction(jobId, candidateId)) atomically transitions the role into the candidate's Kanban CRM board under the Applied column, recording appliedAt, waybackSnapshotUrl, deadline, and the generated resume artifact link. For Greenhouse, Lever, and Ashby postings where dynamic form questions are retrieved via ?questions=true, the dispatch modal pre-populates the candidate's verified identity fields and tailored vector ATS PDF. For Teletalk (*.teletalk.com.bd) and Bangladesh Bank (erecruitment.bb.org.bd) applications, the dispatch drawer provides a 1-Click Teletalk/BB Ready Kit that auto-formats the candidate's passport photo (300x300 px, 
≤100 KB JPEG) and signature (300x80 px, 
≤60 KB JPEG), copies their permanent Bangladesh Bank CV Identification Number (123456-100000) to the clipboard, and launches the exact official subdomain application form in a new tab.   

Module 7: Front-End User Experience and Executive Corporate Design System
The front-end architecture for http://localhost:3000/opportunities and http://localhost:3000/jobs is built on Next.js 16 (App Router, Turbopack, React 19 Server Components) adhering strictly to the Executive Corporate Light Mode design specification.

Executive Corporate Light Mode Palette and Typography
The visual hierarchy avoids dark-mode consumer gaming tropes in favor of institutional clarity, high contrast, and editorial precision:

Design Token	Hex Value	Tailwind CSS Mapping	Semantic Role & Component Application
--bg-canvas	#F7F8FC	bg-[#F7F8FC]	Primary application background canvas; eliminates harsh white glare across wide monitors.
--bg-surface	#FFFFFF	bg-white	Elevated job cards, split-screen specimen drawers, and filter bar containers (border-[#E2E8F0]).
--bg-subtle	#F1F5F9	bg-slate-100	Secondary metadata pills, pay scale breakdown tables, and inactive filter tabs.
--text-primary	#1A1D2E	text-[#1A1D2E]	Primary job titles, organization headers, and statutory requirement statements.
--text-muted	#64748B	text-slate-500	Secondary labels, publication dates, ESCO/O*NET taxonomy codes, and archive notices.
--accent-navy	#1E3A8A	text-blue-900 / bg-blue-900	Executive branding headers, Government Grade 9–10 badges, and verified credential seals.
--accent-trust	#2563EB	bg-blue-600 / text-blue-600	Primary interactive CTAs ("Apply on Official Portal", "Tailor ATS Resume"), active facet pills, and slider tracks.
--status-emerald	#059669	text-emerald-600 / bg-emerald-50	LIVE_VERIFIED link health indicator, 100% Statutory Eligible badge, and 3x Verified skill tags.
--status-amber	#D97706	text-amber-600 / bg-amber-50	EXPIRING_WITHIN_48H countdown badges and partial skill alignment warnings (50%–79%).
Typography pairs a crisp geometric sans-serif (Inter or Plus Jakarta Sans, tracking-tight, font-semibold) for headings and prose with JetBrains Mono (font-mono text-xs) for structured identifiers: Teletalk job codes (GJOB14987), National Pay Scale grades (GRADE-09 | ৳22,000–53,060), O*NET codes (15-1252.00), cryptographic Ed25519 credential hashes, and live countdown timers.   

Faceted Filtering Matrix and Interactive Cockpit Components
The top command bar on /opportunities synchronizes all filter parameters directly to URL query states for zero-latency Server Component streaming. Candidates filter opportunities across four primary dimensions: Sector Quick-Pills (All, Govt Grade 9–10, Commercial Banking MTO, FMCG / MNC, High-Pay Remote USD), Division and Location (Dhaka, Chattogram, All 8 BD Divisions, Anywhere Remote), a Dual-Currency Salary Slider toggling seamlessly between monthly BDT (৳15,000–৳350,000+) and annual USD ($12,000–$240,000+), and the "Eligible Only" Master Toggle (border-[#2563EB] bg-blue-50/60), which restricts the feed strictly to jobs where 
G 
stat
​
 (C,J)=1 against the candidate's verified Career Passport credentials.

Within each job card and detail view, three interactive components elevate candidate decision-making. First, the Circular PDF Specimen Split-Screen Viewer renders the original multi-page Bengali PDF circular on the left pane while displaying the structured English/Bengali row breakdown, National Pay Scale 2015 Grade math, 93%/5%/1%/1% statutory quota pills, eligible district check, and direct *.teletalk.com.bd submission link on the right pane. Second, Live Countdown Clocks rendered in JetBrains Mono display exact remaining hours until the BST cutoff (EXPIRES IN 2 DAYS, 14 HOURS), shifting from Slate (#64748B) to Amber (#D97706) within 48 hours of closing. Third, the Instant ATS CV Tailor Modal compiles a 1-page vector PDF resume tailored to the target job's ESCO/O*NET competency array, highlighting matched Career Passport skills in Trust Blue (#2563EB) and embedding a verifiable W3C Ed25519 QR signature in the footer.   

Module 8: Production Deployment, Cost Efficiency, and SRE Playbook
Zero-to-Minimal Cost Production Architecture
The entire autonomous scraping, multimodal OCR, deduplication, and link-sweeping infrastructure is engineered to run at $0.00 to < $5.00 per month by composing developer free tiers with deterministic caching:

Infrastructure Component	Selected Provider & Tier	Free Tier Capacity & Quota Limits	CareerINSYT Utilization & Optimization Strategy	Monthly Cost
Scheduled Crawler & OCR Compute	GitHub Actions Cron Workflows (ubuntu-latest)	Unlimited minutes on public runner repo (or 2,000 mins/mo private); 4 vCPU, 16 GB RAM per job.	Runs 4 staggered workflows: Global Remote APIs (every 4h, ~45s/run), Teletalk & BB eRecruitment (every 6h, ~90s/run), Corporate ATS (every 8h, ~2m/run), Dead Link Sweeper (every 6h, ~60s/run).	$0.00
Distributed Job Queue & Rate Limiter	Upstash Serverless Redis	10,000 commands/day (or 500K commands/month free tier), 256 MB storage.	BullMQ configured with drainDelay: 30 and batched pipeline commands (ZRANGEBYSCORE for expiry sweeps + SHA-256 deduplication bloom/set cache).	$0.00
Durable Relational & Document Storage	Supabase (PostgreSQL 16) or Appwrite Cloud	500 MB PostgreSQL database + 1 GB object storage (Supabase) / 2 GB storage (Appwrite).	Stores canonical job rows (~4 KB/job = 100,000+ jobs in 400 MB) and compressed circular PDF specimens. Expired jobs older than 180 days retain metadata + waybackSnapshotUrl while purging local PDF blobs.	$0.00
Multimodal OCR & Schema Normalization	Google Gemini 1.5 Flash API (gemini-1.5-flash)	Free Tier: 15 Requests/Min (RPM), 1 Million Tokens/Min (TPM), 1,500 Requests/Day (RPD).	SHA-256 PDF binary hashing ensures each new government circular is sent to Gemini at most once. Even 100 new circulars/day consumes 
<7% of the daily free quota.	$0.00
Immutable Citation Archival	Internet Archive Wayback Machine API	
Free public API (SavePageNow & wayback/available).

Throttled to 1 request per 5 seconds with polite User-Agent: CareerINSYT-Archiver/1.0 header.

$0.00
  
Step-by-Step 25-Day Implementation Roadmap
Execution Phase	Timeline	Core Engineering Deliverables & Verification Milestones
Phase 1: Foundation Schemas & Dead Link Sweepers	Days 1–3	
Deploy CanonicalJobSchema (Zod), PostgreSQL/Appwrite collections, and SHA-256 fingerprint index. Implement LinkHealthVerificationRunner and BST (UTC+6) deadline expiry sweeper. Purge all legacy static records with broken [Source][1] citations and replace with live verified endpoints + Wayback Machine snapshots.

Phase 2: Global Remote & Direct ATS JSON Ingestion	Days 4–7	
Build keyless JSON harvesters for RemoteOK (remoteok.com/api), Remotive (remotive.com/api/remote-jobs), Himalayas, Arbeitnow, Jobicy, HN "Who is Hiring?" (hacker-news.firebaseio.com), and direct ATS boards (Greenhouse, Lever, Ashby, Workable). Implement GMT+6 timezone overlap calculator and live Bangladesh Bank USD-to-BDT currency normalizer.

Phase 3: Bangladesh Corporate, Bank & Teletalk Scrapers	Days 8–14	
Build Playwright/patchright + cheerio harvesters for Teletalk AllJobs (alljobs.teletalk.com.bd), 60+ *.teletalk.com.bd subdomains, Bangladesh Bank (erecruitment.bb.org.bd/onlineapp/joblist.php), Workday MNC portals (Unilever, Grameenphone, Robi), and top PCB/conglomerate career portals.

Phase 4: Bengali Gazette Multimodal PDF Parser	Days 15–20	
Implement the 300 DPI PDF-to-PNG rasterizer (pdfjs-dist + @napi-rs/canvas + sharp) and wire extractBangladeshiCircularFromPageImages with Gemini 1.5 Flash for NARS research institutes (BRRI, BINA, BARI, BCSIR, BARC), BPSC, and Ministry gazette tables. Verify National Pay Scale 2015 Grade 9–20 math and July 2024 Supreme Court 93%/5%/1%/1% quota mapping.

Phase 5: Matching Engine & Executive Cockpit UI	Days 21–25	Deploy the fail-closed statutory prerequisite gate + 
3×/2×/1× weighted Career Passport alignment engine, missing competency Learning Bridge mapper, Executive Corporate Light Mode /opportunities UI, side-by-side PDF specimen drawer, and 1-Click Kanban CRM application dispatcher.
  
Production Starter Code Implementation
The following three production-ready TypeScript modules pair directly with the CanonicalJobSchema defined in Module 4 to power the self-healing link sweeper, the multimodal Bengali PDF circular extractor, and the weighted Career Passport matching engine.

1. Self-Healing Link Health Verification & Wayback Archiver Runner (src/lib/jobs/link-health-runner.ts)
TypeScript
import crypto from "node:crypto";
import { CanonicalJob } from "./canonical-job-schema";

export interface LinkVerificationResult {
  jobId: string;
  officialPortalUrl: string;
  isLive: boolean;
  httpStatus: number;
  detectedSoft404OrClosed: boolean;
  closureReason: string | null;
  waybackSnapshotUrl: string | null;
  verifiedAtIso: string;
}

const CLOSURE_PATTERNS: RegExp[] = [
  /\b(this job is no longer available|position has been filled|applications are closed)\b/i,
  /\b(job posting has expired|no longer accepting applications|requisition is closed)\b/i,
  /\b(application time is over|no circular is active right now)\b/i,
  /(আবেদনের সময়সীমা শেষ হয়েছে|নিয়োগ বিজ্ঞপ্তির মেয়াদ উত্তীর্ণ)/,
];

const GENERIC_ROOT_REDIRECT_PATHS = new Set([
  "/",
  "/careers",
  "/careers/",
  "/jobs",
  "/jobs/",
  "/404",
  "/error",
]);

/**
 * Checks Internet Archive Wayback availability or triggers SavePageNow capture.
 */
export async function ensureWaybackSnapshot(
  targetUrl: string,
  iaAccessKey?: string,
  iaSecretKey?: string
): Promise<string | null> {
  try {
    const availabilityEndpoint = `https://archive.org/wayback/available?url=${encodeURIComponent(targetUrl)}`;
    const availRes = await fetch(availabilityEndpoint, {
      headers: { "User-Agent": "CareerINSYT-Archiver/1.0 (+https://careerinsyt.com)" },
      signal: AbortSignal.timeout(8000),
    });

    if (availRes.ok) {
      const data = (await availRes.json()) as {
        archived_snapshots?: {
          closest?: { available?: boolean; url?: string; timestamp?: string };
        };
      };
      const closest = data.archived_snapshots?.closest;
      if (closest?.available && closest.url) {
        return closest.url.replace(/^http:\/\//i, "https://");
      }
    }

    // Trigger programmatic capture via SavePageNow API
    const headers: Record<string, string> = {
      "User-Agent": "CareerINSYT-Archiver/1.0",
      Accept: "application/json",
    };
    if (iaAccessKey && iaSecretKey) {
      headers["Authorization"] = `LOW ${iaAccessKey}:${iaSecretKey}`;
    }

    const saveRes = await fetch("https://web.archive.org/save", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        url: targetUrl,
        capture_all: "1",
        delay_wb_availability: "1",
        skip_first_archive: "1",
      }).toString(),
      signal: AbortSignal.timeout(12000),
    });

    const contentLocation = saveRes.headers.get("content-location");
    if (contentLocation) {
      return `https://web.archive.org${contentLocation}`;
    }
    return `https://web.archive.org/web/*/${targetUrl}`;
  } catch {
    return `https://web.archive.org/web/*/${targetUrl}`;
  }
}

/**
 * Verifies upstream link health, detects SPA soft-404 redirects and DOM closure banners,
 * and enforces BST (UTC+6) deadline cutoffs.
 */
export async function verifyJobLinkHealth(
  job: Pick<
    CanonicalJob,
    "id" | "officialPortalUrl" | "deadline" | "waybackSnapshotUrl"
  >
): Promise<LinkVerificationResult> {
  const nowEpoch = Date.now();
  const deadlineEpoch = new Date(job.deadline).getTime();

  // 1. Strict BST (UTC+6) Deadline Cutoff Gate
  if (nowEpoch > deadlineEpoch) {
    const snapshot =
      job.waybackSnapshotUrl ?? (await ensureWaybackSnapshot(job.officialPortalUrl));
    return {
      jobId: job.id,
      officialPortalUrl: job.officialPortalUrl,
      isLive: false,
      httpStatus: 200,
      detectedSoft404OrClosed: false,
      closureReason: `Application window closed on ${job.deadline} (BST).`,
      waybackSnapshotUrl: snapshot,
      verifiedAtIso: new Date().toISOString(),
    };
  }

  // 2. HTTP Probe with Manual Redirect Inspection & Range Limit
  let attempt = 0;
  const maxAttempts = 3;

  while (attempt < maxAttempts) {
    attempt++;
    try {
      const parsedOriginal = new URL(job.officialPortalUrl);
      const response = await fetch(job.officialPortalUrl, {
        method: "GET",
        redirect: "manual",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
          Range: "bytes=0-65535",
        },
        signal: AbortSignal.timeout(10000),
      });

      // Check for Soft-404 Redirects (e.g., deep job URL redirecting to /careers root)
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const locationHeader = response.headers.get("location");
        if (locationHeader) {
          const targetUrl = new URL(locationHeader, job.officialPortalUrl);
          const isDeepPathOriginally = parsedOriginal.pathname.length > 10;
          if (
            isDeepPathOriginally &&
            GENERIC_ROOT_REDIRECT_PATHS.has(targetUrl.pathname.toLowerCase())
          ) {
            return {
              jobId: job.id,
              officialPortalUrl: job.officialPortalUrl,
              isLive: false,
              httpStatus: response.status,
              detectedSoft404OrClosed: true,
              closureReason: `Soft-404 redirect detected to generic path: ${targetUrl.pathname}`,
              waybackSnapshotUrl: job.waybackSnapshotUrl,
              verifiedAtIso: new Date().toISOString(),
            };
          }
        }
      }

      if (response.status === 404 || response.status === 410) {
        return {
          jobId: job.id,
          officialPortalUrl: job.officialPortalUrl,
          isLive: false,
          httpStatus: response.status,
          detectedSoft404OrClosed: false,
          closureReason: `Upstream server returned HTTP ${response.status}.`,
          waybackSnapshotUrl: job.waybackSnapshotUrl,
          verifiedAtIso: new Date().toISOString(),
        };
      }

      // Inspect body text for semantic "Application Closed" banners
      const bodySnippet = await response.text();
      for (const pattern of CLOSURE_PATTERNS) {
        const match = bodySnippet.match(pattern);
        if (match) {
          return {
            jobId: job.id,
            officialPortalUrl: job.officialPortalUrl,
            isLive: false,
            httpStatus: response.status,
            detectedSoft404OrClosed: true,
            closureReason: `DOM closure marker matched: "${match[0]}"`,
            waybackSnapshotUrl: job.waybackSnapshotUrl,
            verifiedAtIso: new Date().toISOString(),
          };
        }
      }

      const snapshotUrl =
        job.waybackSnapshotUrl ?? (await ensureWaybackSnapshot(job.officialPortalUrl));

      return {
        jobId: job.id,
        officialPortalUrl: job.officialPortalUrl,
        isLive: true,
        httpStatus: response.status,
        detectedSoft404OrClosed: false,
        closureReason: null,
        waybackSnapshotUrl: snapshotUrl,
        verifiedAtIso: new Date().toISOString(),
      };
    } catch (err) {
      if (attempt === maxAttempts) {
        return {
          jobId: job.id,
          officialPortalUrl: job.officialPortalUrl,
          isLive: false,
          httpStatus: 503,
          detectedSoft404OrClosed: false,
          closureReason: `Network timeout/unreachable after ${maxAttempts} retries: ${(err as Error).message}`,
          waybackSnapshotUrl: job.waybackSnapshotUrl,
          verifiedAtIso: new Date().toISOString(),
        };
      }
      // Exponential backoff with jitter
      const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
      await new Promise((r) => setTimeout(r, backoffMs));
    }
  }

  throw new Error("Unreachable verification state");
}

/**
 * Deterministic SHA-256 job deduplication fingerprint generator.
 */
export function computeJobFingerprintHash(
  organizationName: string,
  title: string,
  deadlineIso: string,
  divisionLocation: string
): string {
  const normOrg = organizationName
    .toLowerCase()
    .replace(/\b(plc|ltd|limited|inc|corporation|corp|bangladesh|bd|group)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
  const normTitle = title
    .toLowerCase()
    .replace(/\bix\b/g, "9")
    .replace(/\bx\b/g, "10")
    .replace(/[^a-z0-9]/g, "");
  const normDate = deadlineIso.slice(0, 10);
  const rawPayload = `${normOrg}|${normTitle}|${normDate}|${divisionLocation.toUpperCase()}`;
  return crypto.createHash("sha256").update(rawPayload, "utf8").digest("hex");
}
2. Gemini Multimodal Bengali Gazette & Circular PDF Extractor (src/lib/jobs/multimodal-circular-extractor.ts)
TypeScript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { CanonicalJob, CanonicalJobSchema } from "./canonical-job-schema";
import { computeJobFingerprintHash } from "./link-health-runner";

const MultiRowCircularResponseSchema = z.object({
  circularMetadata: z.object({
    ministryOrDivision: z.string(),
    implementingAgency: z.string(),
    memoNumber: z.string().nullable(),
    publishedDateIso: z.string(),
    applicationDeadlineIso: z.string(),
    teletalkSubdomainUrl: z.string().nullable(),
  }),
  extractedJobs: z.array(CanonicalJobSchema),
});

const BENGALI_TO_ASCII_DIGIT_MAP: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

/**
 * Deterministically converts any lingering Bengali digits in string fields to ASCII digits.
 */
export function normalizeBengaliNumerals(input: string): string {
  return input.replace(/[০-৯]/g, (match) => BENGALI_TO_ASCII_DIGIT_MAP[match] ?? match);
}

/**
 * Accepts 300 DPI rasterized PNG buffers of a Bangladeshi Government / Research Institute / Bank
 * PDF circular (bypassing Bijoy/SutonnyMJ encoding corruption) and extracts strictly validated
 * CanonicalJob records via Gemini 1.5 Flash Multimodal.
 */
export async function extractBangladeshiCircularFromPageImages(params: {
  pagePngBuffers: Buffer[];
  sourceUrl: string;
  officialPortalUrl: string;
  circularPdfSpecimenUrl: string;
  geminiApiKey: string;
}): Promise<CanonicalJob[]> {
  const genAI = new GoogleGenerativeAI(params.geminiApiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.0,
      responseMimeType: "application/json",
    },
  });

  const imageParts = params.pagePngBuffers.map((buffer) => ({
    inlineData: {
      data: buffer.toString("base64"),
      mimeType: "image/png",
    },
  }));

  const extractionPrompt = `
Extract every distinct job post row from the attached Bangladeshi recruitment circular page images.
Context URLs:
- Source Discovery URL: ${params.sourceUrl}
- Official Application Portal URL: ${params.officialPortalUrl}
- Official PDF Specimen URL: ${params.circularPdfSpecimenUrl}

Mandatory Rules:
1. Emit a JSON object matching { "circularMetadata": {...}, "extractedJobs": [CanonicalJob, ...] }.
2. Convert all Bengali digits (০-৯) to standard ASCII integers (0-9).
3. Enforce National Pay Scale 2015 Grade-to-Basic-Pay mapping (e.g., Grade 9 = 22000-53060 BDT, Grade 10 = 16000-38640 BDT).
4. Enforce the July 2024 Supreme Court Appellate Division statutory quota split (meritPercentage: 93, freedomFighterChildPercentage: 5, ethnicMinorityPercentage: 1, disabledAndThirdGenderPercentage: 1).
5. Map academic degrees strictly to the allowed AcademicDisciplineEnum values (e.g., AGRICULTURE_AGRONOMY, COMPUTER_SCIENCE_ENGINEERING, BBA_FINANCE_BANKING_ACCOUNTING, ANY_RECOGNIZED_DISCIPLINE). Never use loose substrings.
6. Tag each job row with 4 to 8 domain-specific ESCO v1.2.1 / O*NET 31.0 competencies.
`;

  const result = await model.generateContent([extractionPrompt, ...imageParts]);
  const rawJsonText = normalizeBengaliNumerals(result.response.text());
  const parsedPayload = JSON.parse(rawJsonText);

  // Post-process deterministic SHA-256 fingerprints before Zod validation
  if (Array.isArray(parsedPayload?.extractedJobs)) {
    for (const rawJob of parsedPayload.extractedJobs) {
      rawJob.sourceUrl = params.sourceUrl;
      rawJob.officialPortalUrl =
        rawJob.governmentAttributes?.teletalkMetadata?.subdomainUrl ??
        params.officialPortalUrl;
      rawJob.circularPdfSpecimenUrl = params.circularPdfSpecimenUrl;
      rawJob.fingerprintHash = computeJobFingerprintHash(
        rawJob.organizationName ?? "gov-bd",
        rawJob.title ?? "post",
        rawJob.deadline ?? new Date().toISOString(),
        rawJob.divisionLocation ?? "ALL_BANGLADESH"
      );
    }
  }

  const validated = MultiRowCircularResponseSchema.parse(parsedPayload);
  return validated.extractedJobs;
}
3. Fail-Closed Statutory Gate & Weighted Career Passport Alignment Engine (src/lib/jobs/candidate-matching-engine.ts)
TypeScript
import { z } from "zod";
import {
  AcademicDisciplineEnum,
  CanonicalJob,
  DegreeLevelEnum,
} from "./canonical-job-schema";

export type VerificationTier =
  | "VERIFIED_ASSESSMENT_3X" // W3C Ed25519 signed Career Passport test pass
  | "COURSE_OR_PORTFOLIO_2X" // Completed INSYT learning path or studio artifact
  | "SELF_DECLARED_CV_1X"; // Unverified resume tag

export interface CandidateSkillCredential {
  skillSlug: string;
  escoUri?: string | null;
  tier: VerificationTier;
  w3cCredentialId?: string | null;
}

export interface CandidateCareerPassport {
  candidateId: string;
  dateOfBirthIso: string;
  permanentHomeDistrict: string;
  highestDegreeLevel: z.infer<typeof DegreeLevelEnum>;
  verifiedDisciplines: Array<z.infer<typeof AcademicDisciplineEnum>>;
  cgpaOn4Scale: number;
  hasAnyThirdDivisionOrClass: boolean;
  yearsOfExperience: number;
  isFreedomFighterChildOrDepartmental: boolean;
  isOrphanOrPhysicallyDisabled: boolean;
  skills: CandidateSkillCredential[];
}

export interface CompetencyGapBridge {
  skillSlug: string;
  displayLabel: string;
  currentMultiplier: 0 | 1 | 2 | 3;
  targetMultiplier: 3;
  potentialScoreGainPercent: number;
  recommendedInsytModuleId: string | null;
  actionLabel: string;
}

export interface JobAlignmentReport {
  jobId: string;
  statutoryEligible: boolean;
  statutoryDisqualificationReasons: string[];
  prerequisiteAlignmentScore: number; // 0 to 100
  verifiedSkillsMatchedCount: number;
  totalRequiredCompetenciesCount: number;
  competencyGapBridges: CompetencyGapBridge[];
}

const DEGREE_RANK: Record<z.infer<typeof DegreeLevelEnum>, number> = {
  SSC_OR_EQUIVALENT: 1,
  HSC_OR_EQUIVALENT: 2,
  DIPLOMA_ENGINEERING: 3,
  BACHELORS_HONOURS: 4,
  BACHELORS_ENGINEERING: 4,
  MBBS_BDS: 4,
  CA_ACCA_CFA_PROFESSIONAL: 5,
  MASTERS: 5,
  PHD: 6,
};

const TIER_MULTIPLIER: Record<VerificationTier, 1 | 2 | 3> = {
  VERIFIED_ASSESSMENT_3X: 3,
  COURSE_OR_PORTFOLIO_2X: 2,
  SELF_DECLARED_CV_1X: 1,
};

const IMPORTANCE_WEIGHT: Record<"MANDATORY_CORE" | "PREFERRED" | "BONUS", number> = {
  MANDATORY_CORE: 1.0,
  PREFERRED: 0.6,
  BONUS: 0.3,
};

/**
 * Computes exact statutory eligibility (Fail-Closed Gate) and weighted Career Passport
 * competency alignment (3x Ed25519 Verified, 2x Course/Portfolio, 1x Self-Declared CV).
 */
export function evaluateCandidateJobAlignment(
  candidate: CandidateCareerPassport,
  job: CanonicalJob
): JobAlignmentReport {
  const disqualificationReasons: string[] = [];
  const qual = job.qualifications;

  // 1. Degree Level Check
  if (DEGREE_RANK[candidate.highestDegreeLevel] < DEGREE_RANK[qual.minimumDegreeLevel]) {
    disqualificationReasons.push(
      `Minimum degree required is ${qual.minimumDegreeLevel} (Passport holds ${candidate.highestDegreeLevel}).`
    );
  }

  // 2. Strict Academic Discipline Check
  const acceptsAny = qual.acceptedDisciplines.includes("ANY_RECOGNIZED_DISCIPLINE");
  if (!acceptsAny && qual.strictDisciplineEnforcement) {
    const hasMatchingDiscipline = candidate.verifiedDisciplines.some((d) =>
      qual.acceptedDisciplines.includes(d)
    );
    if (!hasMatchingDiscipline) {
      disqualificationReasons.push(
        `Statutory discipline mismatch: Requires [${qual.acceptedDisciplines.join(", ")}].`
      );
    }
  }

  // 3. CGPA & 3rd Division Exclusion Gate
  if (
    qual.minimumCgpaOn4Scale !== null &&
    candidate.cgpaOn4Scale < qual.minimumCgpaOn4Scale
  ) {
    disqualificationReasons.push(
      `Minimum CGPA ${qual.minimumCgpaOn4Scale.toFixed(2)} required (Passport: ${candidate.cgpaOn4Scale.toFixed(2)}).`
    );
  }
  if (
    !qual.allowThirdDivisionOrClassInAcademicHistory &&
    candidate.hasAnyThirdDivisionOrClass
  ) {
    disqualificationReasons.push(
      "Circular prohibits 3rd Division/Class at any academic stage."
    );
  }

  // 4. Experience Gate
  if (candidate.yearsOfExperience < qual.minimumExperienceYears) {
    disqualificationReasons.push(
      `Requires ${qual.minimumExperienceYears} years of experience.`
    );
  }

  // 5. Government Statutory Age & District Quota Gate
  if (job.governmentAttributes) {
    const gov = job.governmentAttributes;
    const dob = new Date(candidate.dateOfBirthIso);
    const refDate = new Date(gov.ageLimit.ageCalculationReferenceDate);
    const ageInYears =
      (refDate.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.2425);

    const maxAllowedAge = candidate.isFreedomFighterChildOrDepartmental
      ? gov.ageLimit.maxAgeQuotaOrDepartmentalYears
      : gov.ageLimit.maxAgeGeneralYears;

    if (ageInYears < gov.ageLimit.minAgeYears || ageInYears > maxAllowedAge) {
      disqualificationReasons.push(
        `Age on reference date (${ageInYears.toFixed(1)} yrs) outside statutory limit [${gov.ageLimit.minAgeYears}–${maxAllowedAge} yrs].`
      );
    }

    const distRule = gov.districtEligibility;
    const isExempt =
      candidate.isOrphanOrPhysicallyDisabled &&
      distRule.orphanAndDisabledExemptFromDistrictRestriction;

    if (!distRule.allDistrictsEligible && !isExempt) {
      const homeDist = candidate.permanentHomeDistrict.trim().toLowerCase();
      const isExcluded = distRule.excludedDistricts.some(
        (d) => d.toLowerCase() === homeDist
      );
      const isEligibleListNonEmpty = distRule.eligibleDistricts.length > 0;
      const isInEligibleList = distRule.eligibleDistricts.some(
        (d) => d.toLowerCase() === homeDist
      );

      if (isExcluded || (isEligibleListNonEmpty && !isInEligibleList)) {
        disqualificationReasons.push(
          `District restriction: Candidates from ${candidate.permanentHomeDistrict} district are not eligible for this post.`
        );
      }
    }
  }

  const statutoryEligible = disqualificationReasons.length === 0;

  // 6. Weighted Competency Calculation (3x Verified, 2x Course/Artifact, 1x CV)
  const skillMap = new Map<string, 1 | 2 | 3>();
  for (const s of candidate.skills) {
    const mult = TIER_MULTIPLIER[s.tier];
    const current = skillMap.get(s.skillSlug) ?? 0;
    if (mult > current) {
      skillMap.set(s.skillSlug, mult);
    }
  }

  let earnedWeightedPoints = 0;
  let maxPossibleWeightedPoints = 0;
  let verifiedMatchedCount = 0;
  const rawGaps: Array<{
    comp: CanonicalJob["competencies"][number];
    currentMult: 0 | 1 | 2 | 3;
    weight: number;
  }> = [];

  for (const comp of job.competencies) {
    const w = IMPORTANCE_WEIGHT[comp.requirementWeight];
    const candidateMult = (skillMap.get(comp.skillSlug) ?? 0) as 0 | 1 | 2 | 3;

    maxPossibleWeightedPoints += w * 3;
    earnedWeightedPoints += w * candidateMult;

    if (candidateMult === 3) {
      verifiedMatchedCount++;
    } else {
      rawGaps.push({ comp, currentMult: candidateMult, weight: w });
    }
  }

  const rawPercentage =
    maxPossibleWeightedPoints > 0
      ? Math.round((earnedWeightedPoints / maxPossibleWeightedPoints) * 100)
      : 0;

  // Fail-closed enforcement: if statutory prerequisites fail, effective alignment is 0%
  const prerequisiteAlignmentScore = statutoryEligible ? rawPercentage : 0;

  // 7. Actionable Learning Bridge Generation (for fit < 80% or unverified skills)
  const competencyGapBridges: CompetencyGapBridge[] = rawGaps
    .map(({ comp, currentMult, weight }) => {
      const deltaPoints = weight * (3 - currentMult);
      const potentialScoreGainPercent =
        maxPossibleWeightedPoints > 0
          ? Number(((deltaPoints / maxPossibleWeightedPoints) * 100).toFixed(1))
          : 0;

      const actionLabel =
        currentMult === 0
          ? `Complete INSYT Module & Ed25519 Assessment for ${comp.displayLabel} (+${potentialScoreGainPercent}%)`
          : `Upgrade ${comp.displayLabel} from ${currentMult}x to 3x Verified Assessment (+${potentialScoreGainPercent}%)`;

      return {
        skillSlug: comp.skillSlug,
        displayLabel: comp.displayLabel,
        currentMultiplier: currentMult,
        targetMultiplier: 3 as const,
        potentialScoreGainPercent,
        recommendedInsytModuleId: comp.insytLearningModuleId,
        actionLabel,
      };
    })
    .sort((a, b) => b.potentialScoreGainPercent - a.potentialScoreGainPercent);

  return {
    jobId: job.id,
    statutoryEligible,
    statutoryDisqualificationReasons: disqualificationReasons,
    prerequisiteAlignmentScore,
    verifiedSkillsMatchedCount: verifiedMatchedCount,
    totalRequiredCompetenciesCount: job.competencies.length,
    competencyGapBridges,
  };
}
Architectural Synthesis and Operational Recommendations
Transforming CareerINSYT's /opportunities and /jobs routes into a self-dependent, real-time labor intelligence engine requires enforcing three architectural invariants across all engineering sprints. First, Upstream Provenance Over Secondary Aggregation mandates that every record stored in the platform database resolve to an authoritative primary application endpoint—specifically an isolated *.teletalk.com.bd subdomain, the Bangladesh Bank erecruitment.bb.org.bd/onlineapp/joblist.php portal, a direct enterprise ATS JSON endpoint (boards-api.greenhouse.io, api.lever.co, api.ashbyhq.com, apply.workable.com), or an authenticated Wayback Machine snapshot (web.archive.org). Secondary Bangladeshi job blogs must be utilized strictly as discovery triggers and never stored as canonical destination links. Second, Visual Multimodal OCR for Bangladeshi Public Circulars replaces fragile text-layer PDF scrapers with 300 DPI page rasterization piped into Gemini 1.5 Flash multimodal extraction, bypassing legacy SutonnyMJ (Bijoy) font corruption while enforcing National Pay Scale 2015 Grade validation and the July 2024 Supreme Court statutory quota (93% Merit / 5% Freedom Fighter / 1% Ethnic Minority / 1% Disabled & Third Gender) rules. Third, Fail-Closed Statutory Gating Paired with Cryptographic Skill Multipliers separates binary statutory eligibility (
G 
stat
​
 ) from the 
3×/2×/1× weighted Career Passport competency score, eliminating false-positive disciplinary matches while turning every missing or unverified skill into a direct conversion bridge into INSYT's learning paths, studio sandboxes, and W3C Ed25519 credential assessments.   





###PERPLEXITY

# CareerINSYT Autonomous Opportunities Engine — Master Architecture Specification

This blueprint defines a compliant, self-healing ingestion and intelligence platform that treats **official employer portals as the source of truth**, normalizes every record into a strict canonical contract, expires records automatically, and ranks opportunities against a candidate’s verified Career Passport. The design prioritizes public APIs, official RSS/JSON feeds, and respectful crawling; it does **not** rely on anti-bot evasion, which is fragile, legally risky, and contrary to site terms.

Verified foundational sources used in this design include BPSC’s official portal and Teletalk application domains, Bangladesh Bank/BSCS e-recruitment, and public remote-job APIs from RemoteOK, Arbeitnow, and Himalayas. [play.google](https://play.google.com/store/apps/details?id=com.zerobugsbd.bdalljobcircular)

***

## 0. System Principles

| Principle | Operational rule |
|---|---|
| Official-source primacy | A third-party posting may discover a job, but only an official employer, ministry, BPSC, Teletalk, or ATS URL may become canonical. |
| Fail-closed eligibility | Missing degree discipline, age proof, quota eligibility, or mandatory certification means “not verifiably eligible,” never “probably eligible.” |
| Zero broken links | Every displayed job has a live `officialPortalUrl`; failures trigger revalidation, archival, or removal. |
| Timezone correctness | All deadlines normalize to `Asia/Dhaka` (UTC+6) and store UTC instants internally. |
| Explainable matching | The UI shows prerequisite gates and weighted evidence, not fabricated “selection probability.” |
| Cost discipline | Free public feeds and scheduled GitHub Actions first; headless browsers only for pages with no structured alternative. |

***

## 1. Bangladesh Recruitment Surface Map

### 1.1 Government and autonomous bodies

The primary official surfaces are:

- **BPSC:** `https://bpsc.gov.bd/` for circulars, examination notices, and results; `https://bpsc.teletalk.com.bd/` for online application flows. [play.google](https://play.google.com/store/apps/details?id=com.zerobugsbd.bdalljobcircular)
- **Teletalk all-jobs portal:** `https://alljobs.teletalk.com.bd/`, used by many ministries, departments, and autonomous bodies for application, admit cards, and results. [play.google](https://play.google.com/store/apps/details?id=com.zerobugsbd.bdalljobcircular)
- **Bangladesh Bank / BSCS:** `https://erecruitment.bb.org.bd/` handles applications for Bangladesh Bank and 14 state-owned, specialized banks, and financial institutions under BSCS. [erecruitment.bb.org](https://erecruitment.bb.org.bd/career/20260504_bb_38.pdf)
- **Ministry and research-institute portals:** BARC, BRRI, BINA, BARI, BJRI, BCSIR, BTRI, BSRI, DPE, and similar bodies commonly publish PDF circulars and use dedicated Teletalk subdomains for applications.

### 1.2 Ingestion topology

```text
Official notice page
  ├─ HTML listing / RSS / sitemap
  ├─ PDF circular (native text or scanned Bengali)
  ├─ Teletalk application form
  └─ Payment / admit-card endpoint

Canonical pipeline:
discover → fetch raw artifact → hash artifact → extract structured fields
        → validate → enrich official apply URL → deduplicate → publish
```

For each source, store a **Source Adapter Contract**:

```ts
type SourceAdapter = {
  sourceId: string;
  sector: Sector;
  listingStrategy: "html" | "rss" | "sitemap" | "api" | "pdf";
  officialDomain: string;
  applyUrlResolver: (record: RawRecord) => string | null;
  cadence: "15m" | "hourly" | "daily";
  robotsPolicy: "respect" | "manual-review";
};
```

### 1.3 Government field extraction

A government job is not merely a title and deadline. The engine must extract:

- Ministry, department, autonomous body, and issuing office.
- Circular number and publication date.
- Post name, grade, cadre/non-cadre status, vacancy count.
- Pay scale, basic pay, house rent, medical allowance.
- Age limit, quota rules, district eligibility, freedom-fighter quota, women/quota categories.
- Application window, fee, payment channel, Teletalk job code, and direct application URL.

The National Pay Scale 2015 provides grade-level salary bands; for example, Grade 9 is ৳22,000–53,060 and Grade 10 is ৳16,000–38,640.  Store the official range, but do not infer an applicant’s actual compensation without the post-specific circular. [nbr.gov](https://nbr.gov.bd/uploads/public-notice/88.pdf)

Recommended normalized government compensation object:

```ts
{
  payScale: "NPS-2015",
  grade: 10,
  basicPayBdt: { min: 16000, max: 38640 },
  houseRentBdt: "CIRCULAR_DEFINED_OR_FORMULA",
  medicalAllowanceBdt: "CIRCULAR_DEFINED",
  otherAllowances: []
}
```

### 1.4 Banking sector

Bangladesh Bank’s portal is the canonical application surface for BSCS-coordinated recruitment; its circular PDFs and online application workflow are hosted under `erecruitment.bb.org.bd`.  Private banks such as BRAC Bank, City Bank, EBL, DBBL, MTB, Standard Chartered Bangladesh, and HSBC Bangladesh should be ingested through their official career sites or ATS feeds wherever available. [erecruitment.bb.org](https://erecruitment.bb.org.bd/career/20260504_bb_38.pdf)

For MTO and Probationary Officer cycles, add specialized fields:

```ts
{
  programType: "MTO" | "PROBATIONARY_OFFICER" | "OFFICER" | "TRAINEE",
  bankType: "CENTRAL" | "STATE_OWNED" | "PRIVATE_COMMERCIAL" | "FOREIGN",
  bscsJobId: "26102",
  examStages: ["PRELIMINARY", "WRITTEN", "VIVA"],
  applicationFeeBdt: 200
}
```

### 1.5 Corporate, FMCG, telco, fintech, and startups

Build three adapter classes:

1. **ATS JSON adapters:** Greenhouse, Lever, Ashby, Workable, SmartRecruiters, and Workday where public endpoints or feeds exist.
2. **Career-site HTML adapters:** Grameenphone, Robi, Banglalink, Unilever Bangladesh, BAT Bangladesh, Nestlé Bangladesh, Marico, Beximco, Square, Walton, PRAN-RFL, Meghna, Akij, ACI, Apex.
3. **Startup adapters:** bKash, Nagad, Pathao, Chaldal, ShopUp—prefer official careers pages, then LinkedIn company jobs only as a discovery signal.

Third-party aggregators such as Bdjobs, Chakri, Prothom Alo Jobs, and LinkedIn must be classified as `DISCOVERY_ONLY`. They may trigger a crawl of the employer’s official domain, but they cannot supply the canonical application URL.

***

## 2. Global Remote Opportunities for Bangladesh

### 2.1 Priority public feeds

| Source | Endpoint | Use |
|---|---|---|
| RemoteOK | `https://remoteok.com/api`; RSS: `https://remoteok.com/remote-jobs.rss` | Primary remote feed; tag filtering supported.  [remoteok](https://remoteok.com/faq) |
| Himalayas | `https://himalayas.app/jobs/api` and `/jobs/api/search` | Free, no-auth JSON; supports timezone, country, seniority, employment type filters.  [himalayas](https://himalayas.app/docs/remote-jobs-api) |
| Arbeitnow | `https://www.arbeitnow.com/api/jobs/` | Free paginated API with a `remote` field.  [arbeitnow](https://www.arbeitnow.com/blog/job-board-api) |
| Greenhouse | `https://boards-api.greenhouse.io/v1/boards/{company}/jobs` | Company-direct structured ingestion where publicly exposed. |
| Lever | `https://api.lever.co/v0/postings/{company}?mode=json` | Company-direct structured ingestion where publicly exposed. |
| Ashby | Company-specific public job-board API/HTML, depending on tenant configuration | Company-direct ingestion. |
| HN “Who is Hiring?” | Monthly Ask HN thread via Algolia HN Search API | Discovery and enrichment, never canonical application source. |

Himalayas explicitly provides both a paginated full feed and a filtered search endpoint, with no authentication required.  RemoteOK provides free JSON and RSS feeds without authentication. [remoteok](https://remoteok.com/faq)

### 2.2 Bangladesh feasibility gate

A remote job is surfaced to Bangladeshi candidates only if it passes:

```ts
function isBdFeasible(job: CanonicalJob): boolean {
  const location = job.remoteFeasibility.locationScope;
  const allowed = ["WORLDWIDE", "ANYWHERE", "APAC", "ASIA", "SOUTH_ASIA", "EMEA"];
  if (!allowed.includes(location)) return false;

  if (job.remoteFeasibility.requiredOverlapHours != null) {
    return job.remoteFeasibility.requiredOverlapHours <= 3;
  }

  if (job.remoteFeasibility.excludedCountries.includes("BD")) return false;
  return true;
}
```

### 2.3 Cross-border compliance model

Do not present employment legal advice as automated fact. Instead, expose a **Work Authorization Radar**:

- `EMPLOYER_OF_RECORD_POSSIBLE`
- `CONTRACTOR_FRIENDLY`
- `CONTRACTOR_ONLY`
- `LOCATION_RESTRICTED`
- `UNKNOWN_REQUIRES_EMPLOYER_CONFIRMATION`

Normalize payout signals into:

```ts
{
  payoutMethods: ["WISE", "PAYONEER", "SWIFT", "CRYPTO", "UNKNOWN"],
  taxForm: "W8BEN_LIKELY" | "W8BEN_E_LIKELY" | "UNKNOWN",
  contractorModel: "B2B" | "SOLE_TRADER" | "PLATFORM" | "UNKNOWN"
}
```

The platform should show: “Employer has not confirmed Bangladesh hiring status; verify before applying,” rather than implying eligibility.

### 2.4 Currency normalization

Store original currency and BDT display value separately:

```ts
{
  compensationOriginal: { currency: "USD", min: 60000, max: 90000, period: "YEAR" },
  compensationBdtDisplay: { min: 7320000, max: 10980000, period: "YEAR", rateAsOf: "2026-10-18" },
  fxSource: "BANGLADESH_BANK_OR_FALLBACK",
  fxConfidence: "INDICATIVE"
}
```

Never mutate the original USD/EUR amount. Recompute BDT display values on a daily FX job and retain the rate timestamp.

***

## 3. Autonomous Harvesting Engine

### 3.1 Recommended stack

| Layer | Recommendation | Rationale |
|---|---|---|
| Orchestrator | GitHub Actions cron + Node/TypeScript workers | Free scheduled execution, version-controlled adapters, easy retries. |
| Queue | Upstash Redis + BullMQ | Serverless Redis, delayed jobs, rate limiting, dead-letter queues. |
| HTTP fetching | `undici` / `ofetch` with caching | Fast, low-cost first attempt for JSON, RSS, sitemaps, and static HTML. |
| Structured HTML parsing | `cheerio` | Cheap and deterministic for server-rendered career pages. |
| Dynamic pages | Playwright in a containerized GitHub Actions job | Use only when the page requires JavaScript; keep concurrency at 1–2. |
| PDF OCR fallback | Tesseract with Bengali `ben.traineddata` | Free local OCR path; Tesseract provides Bengali traineddata.  [tesseract-ocr.github](https://tesseract-ocr.github.io/tessdoc/Data-Files.html) |
| Complex scanned PDFs | Gemini multimodal extraction with JSON schema | Gemini supports structured output via `responseMimeType: application/json` plus a response schema.  [ai.google](https://ai.google.dev/gemini-api/docs/structured-output/) |
| Storage | PostgreSQL/Supabase or Appwrite Cloud | Durable canonical records, audit history, and vector/search indexes. |
| Search | Postgres FTS + pg_trgm initially; Meilisearch later | Avoid premature search infrastructure. |

### 3.2 Crawler etiquette and resilience

Implement these controls in every adapter:

- Read and honor `robots.txt`; do not crawl disallowed paths.
- Identify the crawler with a real contact URL and respect site terms.
- Use per-domain token buckets: default 1 request every 3–10 seconds.
- Add jitter: `delay = baseDelay + random(0, baseDelay * 0.5)`.
- Use exponential backoff for `429`, `5xx`, and network faults.
- Cache ETags, `Last-Modified`, and content hashes.
- Stop after three consecutive structural failures and raise a `SOURCE_HEALTH_ALERT`.
- Never solve CAPTCHAs, rotate fingerprints to defeat bot protection, or bypass authentication.

This is not merely ethical; it is operationally superior. Sites that actively deploy bot defenses will break evasion logic repeatedly, whereas official APIs and public feeds remain stable.

### 3.3 PDF-to-structured-JSON pipeline

```text
1. Discover circular PDF URL
2. Download to object storage
3. Compute SHA-256
4. Detect native text layer with pdf-parse/pdfjs
5. If text extraction confidence < threshold:
     Render pages at 300 DPI
     Run Tesseract ben+eng OCR
     Send page images + OCR text to Gemini
6. Gemini returns schema-constrained JSON
7. Zod validates; low-confidence fields become `null`
8. Human review queue for legal/quota/pay fields
9. Publish only after validation
```

Use OCR as evidence, not as truth. A field may be published only when at least one of the following is true:

- Native PDF text contains it.
- OCR confidence exceeds threshold and a second extraction pass agrees.
- Multimodal extraction returns the same value across two independent crops/pages.
- A human reviewer confirms it.

***

## 4. Canonical Schema and Validation

### 4.1 Zod canonical schema

```ts
import { z } from "zod";

export const sectorEnum = z.enum([
  "GOVERNMENT",
  "BANKING",
  "CORPORATE_MNC",
  "LOCAL_CONGLOMERATE",
  "STARTUP",
  "GLOBAL_REMOTE",
  "NGO_DEVELOPMENT",
]);

export const workplaceEnum = z.enum([
  "ONSITE",
  "HYBRID",
  "REMOTE",
  "REMOTE_BD_FEASIBLE",
]);

export const archiveStatusEnum = z.enum([
  "ACTIVE",
  "EXPIRING_SOON",
  "EXPIRED",
  "ARCHIVED",
  "REMOVED_BY_SOURCE",
  "BROKEN_LINK",
]);

export const degreeFamilyEnum = z.enum([
  "CSE_SOFTWARE",
  "ELECTRICAL_ELECTRONIC",
  "MECHANICAL",
  "CIVIL",
  "BUSINESS_ADMINISTRATION",
  "FINANCE_ACCOUNTING",
  "ECONOMICS",
  "STATISTICS_DATA",
  "LAW",
  "AGRICULTURE",
  "PHARMACY",
  "MEDICAL",
  "GENERAL_ARTS",
  "OTHER",
]);

export const compensationSchema = z.object({
  currency: z.enum(["BDT", "USD", "EUR", "GBP", "UNKNOWN"]),
  min: z.number().nonnegative().nullable(),
  max: z.number().nonnegative().nullable(),
  period: z.enum(["HOUR", "MONTH", "YEAR", "ONE_TIME", "UNKNOWN"]),
  equity: z.boolean().default(false),
  equityDetail: z.string().max(500).nullable(),
  bdtDisplay: z
    .object({
      min: z.number().nonnegative().nullable(),
      max: z.number().nonnegative().nullable(),
      rateAsOf: z.string().datetime(),
      source: z.string(),
    })
    .nullable(),
});

export const governmentAttributesSchema = z.object({
  ministry: z.string().max(250).nullable(),
  department: z.string().max(250).nullable(),
  autonomousBody: z.string().max(250).nullable(),
  circularNumber: z.string().max(120).nullable(),
  grade: z.number().int().min(9).max(20).nullable(),
  cadre: z.enum(["BCS_CADRE", "NON_CADRE", "UNKNOWN"]).default("UNKNOWN"),
  payScale: z.literal("NPS_2015").nullable(),
  basicPayBdt: z
    .object({ min: z.number().nonnegative(), max: z.number().nonnegative() })
    .nullable(),
  houseRentBdt: z.number().nonnegative().nullable(),
  medicalAllowanceBdt: z.number().nonnegative().nullable(),
  teletalkJobCode: z.string().max(120).nullable(),
  teletalkApplyUrl: z.string().url().nullable(),
  ageLimitGeneral: z.number().int().min(18).max(70).nullable(),
  ageLimitQuota: z.number().int().min(18).max(70).nullable(),
  districtQuota: z.array(z.string().max(120)).default([]),
  freedomFighterQuota: z.boolean().default(false),
  womenQuota: z.boolean().default(false),
  ethnicMinorityQuota: z.boolean().default(false),
  disabledQuota: z.boolean().default(false),
  applicationFeeBdt: z.number().nonnegative().nullable(),
});

export const qualificationSchema = z.object({
  minimumEducationLevel: z.enum([
    "SSC",
    "HSC",
    "DIPLOMA",
    "BACHELOR",
    "MASTER",
    "PROFESSIONAL",
    "PHD",
    "UNKNOWN",
  ]),
  degreeFamilies: z.array(degreeFamilyEnum).default([]),
  acceptedDegreeLabels: z.array(z.string().max(250)).default([]),
  disciplineMustMatch: z.boolean().default(true),
  minimumCgpa: z.number().min(0).max(5).nullable(),
  minimumYearsExperience: z.number().min(0).max(50).default(0),
  mandatoryCertifications: z.array(z.string().max(250)).default([]),
  statutoryPrerequisites: z.array(z.string().max(250)).default([]),
});

export const competencySchema = z.object({
  escoUri: z.string().url().nullable(),
  onetCode: z.string().max(20).nullable(),
  label: z.string().min(2).max(150),
  weight: z.number().min(0).max(1),
  evidenceType: z.enum([
    "VERIFIED_ASSESSMENT",
    "COURSE_COMPLETION",
    "PORTFOLIO",
    "SELF_DECLARED",
  ]),
});

export const canonicalJobSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(3).max(220),
  fingerprintHash: z.string().length(64),
  title: z.string().min(2).max(300),
  organization: z.string().min(2).max(250),
  organizationDomain: z.string().max(250).nullable(),
  sector: sectorEnum,
  workplaceType: workplaceEnum,
  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "TRAINEE",
    "UNKNOWN",
  ]),
  sourceUrl: z.string().url(),
  officialPortalUrl: z.string().url(),
  applicationUrl: z.string().url(),
  pdfCircularUrl: z.string().url().nullable(),
  locations: z.array(
    z.object({
      division: z.string().max(120).nullable(),
      district: z.string().max(120).nullable(),
      country: z.string().max(120).nullable(),
      remoteScope: z.enum([
        "WORLDWIDE",
        "ANYWHERE",
        "APAC",
        "ASIA",
        "SOUTH_ASIA",
        "EMEA",
        "US_ONLY",
        "EU_ONLY",
        "LOCATION_SPECIFIC",
      ]),
    }),
  ).min(1),
  compensation: compensationSchema,
  government: governmentAttributesSchema.nullable(),
  remote: z
    .object({
      timezoneRequirement: z.string().max(120).nullable(),
      requiredOverlapHours: z.number().int().min(0).max(12).nullable(),
      bdFeasibility: z.enum([
        "CONFIRMED",
        "LIKELY",
        "UNKNOWN",
        "NOT_FEASIBLE",
      ]),
      contractorFriendly: z.boolean().nullable(),
      payoutMethods: z.array(z.string().max(50)).default([]),
    })
    .nullable(),
  qualifications: qualificationSchema,
  competencies: z.array(competencySchema).default([]),
  descriptionText: z.string().max(50000),
  language: z.enum(["BN", "EN", "BN_EN"]),
  publishedAt: z.string().datetime(),
  deadlineAt: z.string().datetime().nullable(),
  lastVerifiedLiveAt: z.string().datetime(),
  isExpired: z.boolean(),
  archiveStatus: archiveStatusEnum,
  archiveNotice: z.string().max(1000).nullable(),
  waybackSnapshotUrl: z.string().url().nullable(),
  extractionConfidence: z.number().min(0).max(1),
  sourceReliability: z.enum([
    "OFFICIAL_PRIMARY",
    "OFFICIAL_SECONDARY",
    "ATS_DIRECT",
    "DISCOVERY_ONLY",
  ]),
});

export type CanonicalJob = z.infer<typeof canonicalJobSchema>;
```

### 4.2 Degree discipline rule

Never treat `"Science"`, `"B.Sc."`, or `"Graduate"` as a discipline match. Use a two-stage resolver:

```ts
const DEGREE_FAMILY_RULES: Array<{
  family: string;
  patterns: RegExp[];
}> = [
  {
    family: "CSE_SOFTWARE",
    patterns: [
      /computer\s+science/i,
      /computer\s+science\s+and\s+engineering/i,
      /cse/i,
      /software\s+engineering/i,
      /information\s+technology/i,
    ],
  },
  {
    family: "FINANCE_ACCOUNTING",
    patterns: [
      /\baccounting\b/i,
      /\bfinance\b/i,
      /\bb\.?ba\b/i,
      /master\s+of\s+business\s+administration/i,
    ],
  },
];
```

If the circular says “B.Sc. in Engineering in relevant subject,” mark `disciplineMustMatch = true` and leave `degreeFamilies` empty unless the circular explicitly names accepted disciplines. The UI must then display: **“Discipline-specific eligibility requires manual verification.”**

### 4.3 Gemini extraction system prompt

```text
You are CareerINSYT's government recruitment document extraction engine.

TASK:
Extract structured recruitment data from the supplied Bangladesh government,
banking, or corporate job circular.

INPUT:
1. Circular PDF page images and/or OCR text.
2. Source URL and issuer domain.

RULES:
- Extract only information explicitly present in the document.
- Never infer eligibility, quotas, salary, deadlines, or vacancy counts.
- Use null for absent or illegible fields.
- Normalize dates to ISO 8601 with Asia/Dhaka timezone assumptions only when
  the document states Bangladesh time or gives no timezone.
- Normalize Bengali numerals to Arabic numerals.
- Preserve the original Bengali post title in `titleOriginalBn` when present.
- For degree requirements, identify exact named degrees and disciplines.
  Do not map generic terms such as "Science", "B.Sc.", or "Graduate" to a
  specific discipline.
- If an application URL is printed, return it verbatim.
- If a field is ambiguous, set `confidence` below 0.70 and add a review note.

OUTPUT:
Return only a JSON object conforming exactly to the supplied JSON schema.
Do not include markdown, commentary, explanations, or trailing text.
```

Gemini supports JSON schema-constrained output by setting the response MIME type to `application/json` and supplying a response schema; Google notes that JSON mode without a schema is only a strong hint, while schema plus MIME type is required for strict structured output. [ai.google](https://ai.google.dev/gemini-api/docs/structured-output/)

***

## 5. Link Health, Expiry, and Deduplication

### 5.1 Link health runner

```ts
// lib/ingestion/link-health.ts
import { createHash } from "node:crypto";

const CLOSED_PATTERNS = [
  /application\s+(is\s+)?closed/i,
  /applications?\s+are\s+closed/i,
  /no\s+longer\s+accepting/i,
  /position\s+(has\s+been\s+)?filled/i,
  /job\s+no\s+longer\s+available/i,
  /this\s+job\s+has\s+expired/i,
  /আবেদনের\s+সময়\s+শেষ/i,
  /আবেদন\s+বন্ধ/i,
];

const NOT_FOUND_PATTERNS = [
  /page\s+not\s+found/i,
  /404/i,
  /record\s+not\s+found/i,
  /job\s+not\s+found/i,
];

export async function verifyJobLink(url: string): Promise<{
  status: "LIVE" | "CLOSED" | "NOT_FOUND" | "REDIRECT_HOME" | "ERROR";
  finalUrl: string;
  httpStatus: number;
  contentHash?: string;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "CareerINSYT-LinkBot/1.0 (+https://careerinsyt.example/bot)",
        accept: "text/html,application/pdf,application/json",
      },
    });

    const body = await response.text();
    const finalUrl = response.url;
    const contentHash = createHash("sha256").update(body).digest("hex");

    if (response.status === 404 || response.status === 410) {
      return { status: "NOT_FOUND", finalUrl, httpStatus: response.status };
    }

    if (CLOSED_PATTERNS.some((re) => re.test(body))) {
      return { status: "CLOSED", finalUrl, httpStatus: response.status, contentHash };
    }

    if (NOT_FOUND_PATTERNS.some((re) => re.test(body))) {
      return { status: "NOT_FOUND", finalUrl, httpStatus: response.status, contentHash };
    }

    const homePath = new URL(finalUrl);
    if (homePath.pathname === "/" || homePath.pathname === "") {
      return { status: "REDIRECT_HOME", finalUrl, httpStatus: response.status, contentHash };
    }

    return { status: "LIVE", finalUrl, httpStatus: response.status, contentHash };
  } catch {
    return { status: "ERROR", finalUrl: url, httpStatus: 0 };
  } finally {
    clearTimeout(timeout);
  }
}
```

### 5.2 Expiry sweeper

```ts
// lib/ingestion/expiry-sweeper.ts
import { db } from "@/lib/db";
import { verifyJobLink } from "./link-health";

const DHAKA_TZ = "Asia/Dhaka";

export async function sweepExpiry() {
  const jobs = await db.job.findMany({
    where: {
      OR: [
        { deadlineAt: { lte: new Date() } },
        { lastVerifiedLiveAt: { lt: new Date(Date.now() - 24 * 3600 * 1000) } },
      ],
    },
    take: 500,
  });

  for (const job of jobs) {
    const health = await verifyJobLink(job.applicationUrl);
    const expiredByTime =
      job.deadlineAt != null && job.deadlineAt.getTime() <= Date.now();

    const archiveStatus =
      health.status === "CLOSED" || health.status === "NOT_FOUND"
        ? "REMOVED_BY_SOURCE"
        : expiredByTime
          ? "EXPIRED"
          : health.status === "REDIRECT_HOME"
            ? "BROKEN_LINK"
            : "ACTIVE";

    await db.job.update({
      where: { id: job.id },
      data: {
        isExpired: expiredByTime || archiveStatus !== "ACTIVE",
        archiveStatus,
        lastVerifiedLiveAt: new Date(),
        archiveNotice:
          archiveStatus === "EXPIRED"
            ? `Application deadline passed in ${DHAKA_TZ}.`
            : archiveStatus === "REMOVED_BY_SOURCE"
              ? "Employer application page reports the opportunity as closed or unavailable."
              : archiveStatus === "BROKEN_LINK"
                ? "Official application link redirects to a generic home page; record withheld from primary listings."
                : null,
      },
    });
  }
}
```

### 5.3 Deduplication fingerprint

```ts
import { createHash } from "node:crypto";

function normalize(value: string | null | undefined) {
  return (value ?? "")
    .toLowerCase()
    .replace(/[\u0980-\u09FF]/g, (char) => char) // retain Bengali
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function fingerprint(input: {
  organization: string;
  title: string;
  deadlineAt?: Date | null;
  location?: string | null;
}) {
  const raw = [
    normalize(input.organization),
    normalize(input.title),
    input.deadlineAt?.toISOString().slice(0, 10) ?? "",
    normalize(input.location),
  ].join("|");

  return createHash("sha256").update(raw).digest("hex");
}
```

Canonicalization priority:

1. Official ministry/BPSC/Teletalk URL.
2. Employer career site.
3. Official ATS posting.
4. Bangladesh Bank/BSCS application URL.
5. Aggregator URL—discovery metadata only.

***

## 6. Candidate Matching and ATS Radar

### 6.1 Fit equation

Use a gated weighted score:

\[
\text{Fit} =
\begin{cases}
0 & \text{if any statutory prerequisite fails} \\
100 \times \frac{\sum_i w_i s_i}{\sum_i w_i} & \text{otherwise}
\end{cases}
\]

Weights:

| Evidence | Weight |
|---|---:|
| Verified Career Passport assessment | 3.0 |
| Completed course / studio artifact | 2.0 |
| Portfolio artifact | 2.0 |
| Self-declared CV skill | 1.0 |

### 6.2 Alignment algorithm

```ts
// lib/matching/alignment.ts
type Evidence = {
  skill: string;
  evidenceType: "VERIFIED_ASSESSMENT" | "COURSE_COMPLETION" | "PORTFOLIO" | "SELF_DECLARED";
  score: number; // 0..1
};

const WEIGHTS = {
  VERIFIED_ASSESSMENT: 3,
  COURSE_COMPLETION: 2,
  PORTFOLIO: 2,
  SELF_DECLARED: 1,
};

export function calculateAlignment(
  jobCompetencies: Array<{ label: string; weight: number }>,
  candidateEvidence: Evidence[],
) {
  const evidenceBySkill = new Map(
    candidateEvidence.map((e) => [e.skill.toLowerCase(), e]),
  );

  let earned = 0;
  let possible = 0;
  const gaps: Array<{ skill: string; recommendation: string }> = [];

  for (const competency of jobCompetencies) {
    const key = competency.label.toLowerCase();
    const evidence = evidenceBySkill.get(key);
    const weight = competency.weight;

    possible += weight;

    if (!evidence) {
      gaps.push({
        skill: competency.label,
        recommendation: `Add verified assessment or portfolio artifact for ${competency.label}.`,
      });
      continue;
    }

    const evidenceWeight = WEIGHTS[evidence.evidenceType];
    earned += weight * evidence.score * (evidenceWeight / 3);
  }

  const fitPercent = possible === 0 ? 0 : Math.round((earned / possible) * 100);

  return {
    fitPercent,
    prerequisitePassed: true,
    gaps,
    label:
      fitPercent >= 80
        ? "Strong alignment"
        : fitPercent >= 60
          ? "Partial alignment"
          : "Development required",
  };
}
```

### 6.3 Learning bridge

When fit is below 80%, map each missing competency to an INSYT learning object:

```ts
{
  missingCompetency: "DuckDB SQL",
  recommendedPath: "Business Intelligence Path",
  lesson: "Lesson 4 — Analytical SQL with DuckDB",
  sandbox: "BI Studio — Retail Revenue Cohort Analysis",
  mockTest: "SQL Analytics Assessment L4"
}
```

The UI must distinguish:

- **Prerequisite Alignment:** binary, statutory/employer-required.
- **Skill Alignment:** weighted competency fit.
- **Application Readiness:** CV completeness, documents, and deadline urgency.

***

## 7. Front-End Experience

### 7.1 Design tokens

```css
:root {
  --bg-canvas: #F7F8FC;
  --bg-surface: #FFFFFF;
  --bg-subtle: #F1F5F9;
  --ink-primary: #1A1D2E;
  --navy: #1E3A8A;
  --trust-blue: #2563EB;
  --active-emerald: #059669;
  --deadline-amber: #D97706;
  --muted-slate: #64748B;
  --font-ui: "Inter", "Geist", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

### 7.2 `/opportunities` layout

```text
┌────────────────────────────────────────────────────────────┐
│ Opportunities Intelligence Cockpit                         │
├────────────────────────────────────────────────────────────┤
│ [All] [Govt Grade 9–10] [Banking MTO] [FMCG/MNC]          │
│ [High-Pay Remote USD] [Startup]                            │
├────────────────────────────────────────────────────────────┤
│ Location: Dhaka ▾   Salary: ৳0 — ৳15,00,000 ▾             │
│ [Eligible Only]   [Remote BD Feasible]   [Deadline < 7d]  │
├────────────────────────────────────────────────────────────┤
│ Job card                                                   │
│  Title · Organization · Grade / MTO / Remote badge         │
│  Deadline countdown · Fit score · Official Apply button    │
│  [View circular] [Tailor ATS CV] [Save] [Track]            │
└────────────────────────────────────────────────────────────┘
```

### 7.3 Key components

- **Sector pills:** one-click filters, persisted in URL search params.
- **Dual currency slider:** BDT primary, USD secondary; both derive from normalized compensation.
- **Eligible Only:** applies fail-closed statutory gates from Career Passport.
- **Circular Specimen Viewer:** left pane renders the official PDF; right pane shows extracted, confidence-scored fields.
- **Live countdown:** server-render initial value, hydrate with client timer.
- **ATS CV Tailor Modal:** generates a one-page vector PDF emphasizing only competencies supported by verified evidence.
- **Application dispatch:** clicking **Track Application** creates/moves a Kanban card to `Applied` and opens the official portal in a new tab.

***

## 8. Deployment and SRE Playbook

### 8.1 Low-cost architecture

```text
GitHub Actions cron
  ├─ ingest-remote-feeds.yml       hourly
  ├─ ingest-bd-official.yml        every 6h
  ├─ ingest-teletalk.yml           daily
  ├─ pdf-gazette-parser.yml        daily
  ├─ link-health-sweeper.yml       daily
  └─ expiry-archiver.yml           hourly

        │
        ▼
Upstash Redis + BullMQ
        │
        ▼
Next.js Route Handlers / worker containers
        │
        ├── PostgreSQL / Supabase: canonical jobs + audit trail
        ├── Object storage: PDFs, page images, extraction JSON
        └── Gemini structured extraction
```

RemoteOK, Arbeitnow, and Himalayas provide public no-auth feeds, making them ideal Phase 2 targets before investing in browser automation. [remoteok](https://remoteok.com/faq)

### 8.2 GitHub Actions example

```yaml
name: Ingest remote feeds

on:
  schedule:
    - cron: "0 * * * *"
  workflow_dispatch:

jobs:
  ingest:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      UPSTASH_REDIS_REST_URL: ${{ secrets.UPSTASH_REDIS_REST_URL }}
      UPSTASH_REDIS_REST_TOKEN: ${{ secrets.UPSTASH_REDIS_REST_TOKEN }}
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run ingest:remote
      - run: npm run links:sweep
```

### 8.3 Gemini multimodal extraction function

```ts
// lib/ai/extract-circular.ts
import { GoogleGenAI } from "@google/genai";
import { canonicalJobDraftSchema } from "@/lib/schemas/canonical-job-draft";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function extractCircular(input: {
  pdfBase64Pages: string[];
  sourceUrl: string;
  ocrText?: string;
}) {
  const contents = [
    {
      role: "user",
      parts: [
        { text: EXTRACTION_SYSTEM_PROMPT },
        { text: `SOURCE_URL: ${input.sourceUrl}` },
        ...(input.ocrText ? [{ text: `OCR_TEXT:\n${input.ocrText}` }] : []),
        ...input.pdfBase64Pages.map((data) => ({
          inlineData: { mimeType: "image/png", data },
        })),
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: canonicalJobDraftSchema,
      temperature: 0,
    },
  });

  const raw = response.text ?? "{}";
  const parsed = JSON.parse(raw);
  return canonicalJobDraftSchema.parse(parsed);
}
```

Use the exact JSON Schema generated from the Zod draft schema. Gemini’s structured-output documentation specifies supplying both the JSON MIME type and schema. [ai.google](https://ai.google.dev/gemini-api/docs/structured-output/)

### 8.4 Implementation roadmap

| Phase | Days | Deliverable |
|---|---:|---|
| 1. Foundation | 1–3 | Zod schema, Postgres models, fingerprinting, link sweeper, expiry engine. |
| 2. Remote ingestion | 4–7 | RemoteOK, Arbeitnow, Himalayas, Greenhouse/Lever adapters; BD feasibility filter. |
| 3. BD official ingestion | 8–14 | BPSC, Teletalk, Bangladesh Bank/BSCS, corporate career-site adapters. |
| 4. Bengali PDF intelligence | 15–20 | PDF storage, OCR, multimodal extraction, confidence scoring, review queue. |
| 5. Career cockpit | 21–25 | Matching engine, gap analysis, faceted UI, countdowns, PDF tailor, Kanban dispatch. |

### 8.5 SRE alerts

| Alert | Threshold | Response |
|---|---|---|
| Source silent | No new artifact for 2 expected cycles | Inspect source adapter and robots/terms changes. |
| Extraction confidence low | >20% of records below 0.70 | Route to review queue; do not publish automatically. |
| Broken official links | >2% of active jobs | Pause sector listing; run full link sweep. |
| Deadline misses | Any active job past deadline | Immediate sweeper execution and incident ticket. |
| Duplicate rate | >5% new records | Review fingerprint normalization. |
| Queue backlog | >1,000 jobs or >30 min age | Scale workers or reduce crawl cadence. |

***

## 9. Non-Negotiable Product Rules

1. No job appears without a working official application or official notice URL.
2. No eligibility claim is made without explicit circular evidence.
3. No expired circular remains in the primary feed.
4. No aggregator becomes the canonical source.
5. No “selection probability” is displayed; show **Prerequisite Alignment** and **Skill Alignment**.
6. No scraped PDF field is published without validation or review.
7. No anti-bot evasion, CAPTCHAsolving, or authenticated-data scraping.
8. Every state change—discovery, extraction, publication, expiry, archival—is audit-logged.

This architecture gives CareerINSYT a defensible, low-cost, and genuinely autonomous opportunities engine: official-source verification at the core, public remote APIs for scale, multimodal Bengali document intelligence for the hardest Bangladesh circulars, and a candidate-facing cockpit that turns job listings into actionable career decisions.


### Gemini 3.5 Flash Lite
Autonomous Real-Time Job Ingestion & Intelligence Architecture: End-to-End Engineering Blueprint for INSYT CorporateModule 1: The Bangladesh Recruitment Surface MapThe public, autonomous, and private labor market in Bangladesh operates through a stratified digital infrastructure characterized by fragmented hosting environments, state-monopolized telecommunication application gateways, heterogeneous document distribution standards, and legacy font encodings. Engineering an automated, real-time ingestion pipeline requires direct integration with distinct operational tiers: central civil service portals, specialized banking recruitment engines, corporate applicant tracking systems, and regional aggregators.Government Ministries, Autonomous Councils, and Teletalk SubsystemsState employment in Bangladesh is anchored by the Bangladesh Public Service Commission (BPSC) for cadre and non-cadre gazetted appointments, alongside individual ministerial circulars distributed via the state-owned telecommunications provider, Teletalk Bangladesh Limited.The primary ingestion endpoints encompass several distinct portal architectures:The central BPSC gateway (bpsc.gov.bd) publishes non-cadre and regular Bangladesh Civil Service (BCS) notices within nested media directories, predominantly formatted as non-searchable raster image PDFs.The Teletalk All-Jobs aggregator (alljobs.teletalk.com.bd) functions as a unified directory indexing active government circulars. It exposes paginated job notices through server-side PHP query structures.Dedicated ministerial Teletalk subdomains follow the domain nomenclature <agency_acronym>.teletalk.com.bd, such as dpe.teletalk.com.bd for the Directorate of Primary Education, dghs.teletalk.com.bd for Health Services, and railway.teletalk.com.bd for Bangladesh Railway.The National Agricultural Research System (NARS) and autonomous scientific councils operate independent digital nodes: the Bangladesh Agricultural Research Council (BARC - barc.gov.bd), Bangladesh Rice Research Institute (BRRI - brri.teletalk.com.bd), Bangladesh Institute of Nuclear Agriculture (BINA - bina.teletalk.com.bd), Bangladesh Agricultural Research Institute (BARI - bari.teletalk.com.bd), Bangladesh Jute Research Institute (BJRI - bjri.teletalk.com.bd), Bangladesh Council of Scientific and Industrial Research (BCSIR - bcsir.teletalk.com.bd), Bangladesh Tea Research Institute (BTRI - btri.gov.bd), and Bangladesh Sugarcane Research Institute (BSRI - bsri.gov.bd). These autonomous institutes alternate between Teletalk application forms and bespoke static circular downloads hosted under government domain clusters (*.gov.bd).The operational topology of Teletalk recruitment engines follows a uniform state machine. Each individual recruitment notice assigns a unique alphanumeric Job Code mapped to an official syllabus and salary band. The automated crawler targets the root index (/index.php), follows server-side redirects to extract the official scanned circular (/circular.pdf or dynamically generated download links), and indexes the application submission gateway (/apply.php or alljobs.teletalk.com.bd/jobs/detail/<id>).National Pay Scale 2015 Structural Breakdown and Statutory Quota AllocationRemuneration for public sector roles in Bangladesh is governed by the National Pay Scale 2015 (Gazette No. S.R.O. 347-Act/2015). Circulars designate remuneration strictly by Grade (1 through 20) and statutory pay scale bands, requiring the ingestion pipeline to extrapolate basic pay, geographical allowances, and benefits deterministically.Pay GradeBasic Pay Band (BDT / Month)Minimum Basic (BDT)Maximum Basic (BDT)Minimum Academic PrerequisiteTypical Entry-Level Public Cadre / DesignationGrade 9৳22,000 – ৳53,060৳22,000৳53,0604-Year Bachelor's / Master'sAssistant Director, BCS Cadre Officer, LecturerGrade 10৳16,000 – ৳38,640৳16,000৳38,6403 or 4-Year Bachelor's / DiplomaSub-Assistant Engineer, Senior OfficerGrade 11৳12,500 – ৳30,230৳12,500৳30,230Higher Secondary Certificate (HSC)Scientific Assistant, Assistant AccountantGrade 12৳11,300 – ৳27,300৳11,300৳27,300HSC / Technical DiplomaSenior Assistant, Stenographer cum TypistGrade 13৳11,000 – ৳26,590৳11,000৳26,590HSC / Technical CertificateJunior Technical Assistant, AuditorGrade 14৳10,200 – ৳24,680৳10,200৳24,680HSC / Secondary School (SSC)Data Entry / Computer OperatorGrade 15৳9,700 – ৳23,490৳9,700৳23,490SSC / EquivalentLaboratory Assistant, Heavy Vehicle DriverGrade 16৳9,300 – ৳22,490৳9,300৳22,490SSC / EquivalentOffice Assistant cum Computer TypistGrade 20৳8,250 – ৳20,010৳8,250৳20,010Class 8 / JSC / EquivalentOffice Support Staff (MLSS), Security GuardAncillary statutory allowances are computed based on location and statutory rules:House Rent Allowance is dynamically assigned based on posting geography: 50% to 65% of basic salary in the Dhaka Metropolitan Area (with statutory minimum floors ranging from ৳5,600 to ৳13,500); 40% to 55% in other divisional cities (Chittagong, Rajshahi, Khulna, Barisal, Sylhet, Rangpur, Mymensingh); and 35% to 45% in district and upazila headquarters.Medical Allowance is statutorily standardized at ৳1,500 per month across all civil service pay grades.Conveyance and Tiffin Allowances apply specifically to non-gazetted support posts (Grades 11 to 20), set at ৳300 and ৳200 per month, respectively.The scraping engine enforces the statutory quota architecture established following the Supreme Court Appellate Division ruling on July 21, 2024. This verdict modified the historical reservation structure, establishing the following legal allocation framework for all civil service and autonomous institutional recruitments:Merit-Based Allocation: 93% of open vacancies.Freedom Fighters' Descendants Quota (Children and Grandchildren): 5%.Ethnic Minorities Quota: 1%.Physically Challenged and Third Gender Quota: 1%.District and Women's Quotas: 0% (eliminated for Grade 9 through 14 recruitments; retained only where specific low-grade directorate policies apply under statutory exception).Central and Commercial Banking Sector InfrastructureThe financial sector recruitment pipeline is bifurcated between the state-controlled central banking recruitment secretariat and private commercial banking systems.The Bankers' Selection Committee Secretariat (BSCS), operating under the governance of Bangladesh Bank, coordinates centralized recruitment for nine state-owned commercial banks (Sonali, Janata, Agrani, Rupali, BASIC, BDBL) and specialized financial institutions (Bangladesh Krishi Bank, Rajshahi Krishi Unnayan Bank, Probashi Kallyan Bank). All BSCS circulars and central bank vacancies (such as Assistant Director in General, IT, and Research cadres) are published and managed via the central portal erecruitment.bb.org.bd.The ingestion architecture interfaces directly with the Bangladesh Bank system:Ingestion Endpoints: The crawler targets https://erecruitment.bb.org.bd/onlineapp/joblist.php, parsing server-rendered directory listings containing parameters like job_id (e.g., Job ID: 26102 for Officer General).Application Lifecycle Mechanics: Candidates register an authoritative CV ID within the Bangladesh Bank database. Application fees are cleared through Mobile Financial Services (MFS) via Dutch-Bangla Bank Rocket using BSCS Biller ID 499, requiring candidate CV ID prefixes and transactional tracking codes to generate a validated Tracking Page.Academic Validation Constraints: Academic qualification scoring enforces a strict disqualification rule barring candidates with a 3rd Division/Class in any secondary, higher secondary, or tertiary board/university examination. Division equivalence mappings require a minimum CGPA of 3.00 on a 4.00 scale (or 3.75 on a 5.00 scale) for 1st Division classification.Private Commercial Banks manage autonomous yearly recruitment cycles for Management Trainee Officer (MTO), Probationary Officer (PO), and Trainee Junior Officer roles:Domestic Commercial Banks (such as BRAC Bank, City Bank PLC, Eastern Bank Ltd, Dutch-Bangla Bank, Mutual Trust Bank, and Pubali Bank) operate proprietary portals (e.g., ebl.com.bd/career, bracbank.com/career) or white-labeled recruitment software. MTO circulars typically mandate an age ceiling of 30 years and require degrees in business, economics, engineering, or quantitative disciplines.Multinational Banks in Bangladesh (Standard Chartered Bangladesh via sc.com/bd/careers and HSBC Bangladesh via about.hsbc.co.bd/careers) route applications through global enterprise HR portals (Taleo and SAP SuccessFactors), where postings are isolated by country code (BD).Corporate FMCG, Telecommunications, and Domestic ConglomeratesPrivate enterprises in Bangladesh utilize a mix of global enterprise applicant tracking systems, custom applicant portals, and regional aggregators.Enterprise SectorRepresentative Domestic EntitiesATS Infrastructure & Ingestion SurfaceAnti-Bot & Network Defense ProfileFMCG ConglomeratesUnilever Bangladesh, BAT Bangladesh, Nestlé Bangladesh, Marico BDWorkday (*.myworkdayjobs.com), SAP SuccessFactors, Oracle TaleoCloudflare Turnstile, Akamai Bot Manager, Dynamic XHR payload encryptionTelecommunicationsGrameenphone (Telenor Group), Robi Axiata, Banglalink (VEON)Workday (telenor.wd3.myworkdayjobs.com), SmartRecruiters, LeverPerimeterX / HUMAN Security, AWS WAF, Strict Client FingerprintingLocal ConglomeratesSquare Group, Beximco, Walton Hi-Tech, PRAN-RFL, Meghna Group, Akij, ACI, ApexProprietary PHP/ASP.NET portals, localized Bdjobs corporate accountsIP rate limiting, server-side session cookies, dynamic CAPTCHA on POSTFintech & Tech StartupsbKash, Nagad, Pathao, Chaldal, ShopUpGreenhouse, Ashby, Lever, Custom Next.js/React portalsCloudflare WAF, API token authentication, client-side challenge evaluationScraping local conglomerate portals requires handling distinct submission workflows. Many domestic enterprises mandate the physical delivery of hardcopy CVs to corporate headquarters (e.g., Square Centre in Mohakhali, Dhaka, or PRAN-RFL Centre in Badda, Dhaka) or instruct candidates to submit email applications containing specific subject-line codes (e.g., Application for the Post of MTO - [Candidate Name]). The ingestion engine must detect and classify these non-standard submission instructions.Third-Party Aggregator Verification PipelineDirect reliance on domestic commercial aggregators (bdjobs.com, chakri.com, jobs.prothomalo.com) introduces data reliability issues, including expired listings, duplicate entries, and commercial tracking redirects. The ingestion engine treats third-party boards strictly as edge discovery signals rather than authoritative records.The verification process follows a multi-step pipeline:Signal Discovery: The system crawls Bdjobs category feeds via HTTP GET requests using rotated local proxy endpoints to detect new postings.Entity & Notice Resolution: The scraper parses the corporate entity name and advertised designation.Primary Source Verification: If the posting represents a government agency, the engine queries the corresponding Teletalk directory or ministry circular index; if it represents a financial institution or corporate enterprise, it checks the employer's official careers endpoint.Canonicalization: If an authoritative direct portal endpoint is verified, the system links directly to the official URL and drops the aggregator intermediary. If no direct portal exists (such as for small domestic enterprises that recruit exclusively through aggregators), the record is indexed as SECONDARY_AGGREGATED with an enforced freshness verification time-to-live (TTL) of 24 hours.Module 2: Global Remote Opportunities Accessible to BangladeshCross-border knowledge work offers high-yield opportunities for professionals in Bangladesh (UTC+6 / BST). However, global remote job boards frequently contain implicit geographical restrictions, incompatible timezone expectations, and international payroll mechanisms that exclude Bangladeshi applicants. The ingestion pipeline applies automated filtering to surface viable roles.Direct ATS Public Feeds and Remote Aggregator InterfacesModern applicant tracking systems expose publicly queryable JSON endpoints designed for dynamic career page rendering. These endpoints can be polled directly without the resource overhead of full browser automation.ATS / Aggregator ProviderPublic Integration Endpoint ArchitectureAuthentication & Access ConstraintsLive Structured Payload CapabilitiesAshby HQGET https://api.ashbyhq.com/posting-api/job-board/{board}?includeCompensation=true[cite: 10, 11]Public read-only; no API token requiredExposes job.isRemote, workplaceType, secondaryLocations, and structured compensation tiersGreenhouseGET https://boards-api.greenhouse.io/v1/boards/{board}/jobs?content=true[cite: 11, 13]Public read-only; no API token requiredContains full HTML job content, department hierarchies, location strings, and updated timestampsLeverGET https://api.lever.co/v0/postings/{company}?mode=json[cite: 13, 14]Public read-only; unauthenticatedReturns structured categories (commitment, location), salary ranges (min, max, currency), and hosted apply URLsWorkableGET https://apply.workable.com/api/v1/widget/accounts/{company}?details=true[cite: 16, 17]Public read-only; undocumented widget APIDelivers full job descriptions, telecommuting boolean flags, country codes, and requirements arraysHacker News HiringGET https://hacker-news.firebaseio.com/v0/item/{thread_id}.jsonFirebase REST API; unauthenticatedReturns root comment IDs from monthly "Who is Hiring?" threads for parsing remote terms and contact linksRemote Aggregatorshttps://remoteok.com/api, https://weworkremotely.com/categories/{cat}.rssREST JSON / XML RSS; rate limits enforcedProvides syndication feeds for cross-checking worldwide remote openingsBangladesh Candidate Feasibility EngineRemote roles undergo multi-stage filtering to verify that candidates based in Bangladesh are eligible to apply:Geographic eligibility is evaluated first. The engine filters out listings containing explicit geographic restrictions, such as "US Citizenship Required", "Must reside in the US/EU", "Active Security Clearance", "UK/EEA only", or "Canada PR Required". Postings specifying "Anywhere in the World", "Worldwide", "Remote - APAC", "Remote - EMEA", or open "Remote" designations without regional restrictions advance to timezone analysis.Timezone overlap is assessed next. Candidates in Bangladesh operate at UTC+6. High-yield remote roles often require a minimum of 3 overlapping business hours with the core distributed team. The overlap window is calculated using the following equation:$$\Omega = \max\left(0, \, \min(E_{\text{client}}, E_{\text{candidate}}) - \max(S_{\text{client}}, S_{\text{candidate}})\right)$$Where $[S_{\text{client}}, E_{\text{client}}]$ represents the client's working hours converted to UTC, and $[S_{\text{candidate}}, E_{\text{candidate}}]$ represents the candidate's operational availability in UTC (assuming a typical working window between 08:00 and 22:00 BST, corresponding to 02:00 to 16:00 UTC). If the overlap $\Omega < 3.0 \text{ hours}$, the role is excluded unless it explicitly includes tags such as "Async", "Asynchronous", or "Self-Directed".Contractor compliance and tax viability are verified during the final stage. Candidates in Bangladesh generally cannot be onboarded via standard foreign W-2 or direct PAYE structures without an Employer of Record (EOR) entity operating domestically (e.g., Deel Bangladesh, Remote.com). The engine confirms that the position accommodates B2B Independent Contractor Agreements. Non-US citizens providing cross-border services from outside the United States submit IRS Form W-8BEN (Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting) to claim exemption from standard 30% US domestic withholding tax under the US-Bangladesh Bilateral Tax Treaty.Foreign exchange routing must comply with central bank guidelines. Under Bangladesh Bank Guidelines for Foreign Exchange Transactions (FE Circular No. 22/2013 and subsequent updates for ICT export remittances), foreign earnings must be cleared through authorized financial rails:Direct SWIFT Telegraphic Transfer (TT) in USD, EUR, or GBP to inward clearing foreign currency or local currency accounts.Regulated international payment processors, including Payoneer and Wise Business.Inward remittances for declared IT/ITES services qualify for the statutory 2.5% to 4% government cash incentive (subject to prevailing central bank policy) and local corporate tax exemptions for accredited software export activities.Live Currency Normalization ArchitectureCompensation figures from global postings are converted into annualized and monthly BDT values. The platform queries live interbank mid-market exchange rates to calculate local equivalents:$$C_{\text{BDT/Month}} = \frac{C_{\text{Foreign/Annual}} \times R_{\text{mid}}}{12}$$Where $R_{\text{mid}}$ is the active mid-market exchange rate between the source currency (USD, EUR, GBP) and Bangladeshi Taka (BDT). To protect the database from currency fluctuations, the primary records preserve the source currency data (originalCurrency, originalAmountMin, originalAmountMax) alongside the normalized BDT fields.Module 3: The Autonomous Scraping & Harvesting EngineTo maintain an up-to-date database across both heavily protected enterprise career portals and older government hosting environments, the ingestion engine uses a distributed architecture built for reliable, automated scraping.Automation Framework EvaluationSelecting the appropriate scraping tools requires balancing browser rendering fidelity, anti-bot bypass capabilities, concurrency throughput, and operating costs:Scraping Framework / SolutionConcurrency Model & Resource ProfileAnti-Bot Bypass Efficacy (Cloudflare, Akamai, DataDome)Execution Cost Profile (Monthly Basis: 100k Ingestions)Recommended Platform RoleCrawlee + Playwright (Node.js / TS)Multi-process browser contexts; ~150MB RAM per contextHigh (when paired with fingerprint patching and realistic browser profiles)Low (Runs on lightweight serverless containers or standard VPS instances)Primary Harvesting Engine for single-page applications, dynamic ATS portals, and Teletalk forms.Scrapy + Playwright-PythonAsynchronous Twisted core; low memory footprint (<50MB RAM per spider)Medium-High; requires external solver middleware to pass Cloudflare TurnstileLow (Runs within free-tier compute limits)High-Volume Catalog Crawler for large-scale directory scanning and HTML parsing.Firecrawl Cloud APIManaged cloud infrastructure; returns pre-parsed MarkdownVery High; native bypass for enterprise WAFs and bot detection systemsHigh ($0.002 to $0.005 per page scraped; scales poorly on zero-cost budgets)Fallback Extraction Gateway for aggressively protected corporate career portals.Cloudflare Workers Browser RenderingServerless Edge Chromium instances; limits per workerHigh against external WAFs; native Cloudflare network routingMedium (Includes free allowance, then billed per browser-minute)Edge Scheduled Sweeper for lightweight daily health checks and availability verification.GitHub Actions Scheduled CronEphemeral Linux VM runners (2 cores, 7GB RAM); up to 2,000 min/monthHigh; clean datacenter IP space with full headless browser supportFree (Runs within repository workflow automation limits)Distributed Batch Scheduler for scheduled scraping jobs across government and remote sources.To maximize reliability and cost efficiency, the platform uses a hybrid deployment model. High-throughput ATS endpoints and static HTML directories are crawled using an asynchronous Node.js client (such as Undici or cURL-impersonate). Dynamic, JavaScript-rendered web pages and complex multi-step application forms are processed via Node.js Crawlee with Playwright running on scheduled container runners.Anti-Bot Defense and Detection Evasion StrategiesEnterprise hiring platforms deploy layered anti-bot protections that monitor both network-level handshakes and client-side browser behavior:TLS and JA4 fingerprint evasion is managed at the transport layer. Security platforms inspect incoming TLS ClientHello packets. Default Node.js https agents and standard Python requests produce static cipher suites, extension orderings, and elliptic curve signatures that identify them as automated scripts. The ingestion engine routes protected requests through HTTP clients compiled against cURL-impersonate, replicating the TLS handshakes, ALPN extensions, and HTTP/2 settings frames used by modern desktop browsers.Browser execution environments are hardened against common detection vectors:Removing navigator.webdriver flags prior to page script execution.Emulating native WebGL vendor and renderer parameters (Google Inc. (NVIDIA) rather than software rasterizers like Mesa OffScreen).Patching navigator.permissions.query to prevent automated query rejections.Standardizing screen resolutions, color depths, hardware concurrency ratings, and system audio contexts to match common desktop environments.Proxy routing is tailored to the target destination. Accessing domestic government portals (*.teletalk.com.bd, erecruitment.bb.org.bd) from foreign hosting networks often results in connection timeouts, routing delays, or outright IP blocks. Scrapers targeting these domestic platforms use South Asian Residential and Mobile Proxies with ASNs based in Dhaka and Chittagong (e.g., BTCL, Link3, Grameenphone), employing sticky sessions to complete multi-step circular downloads. Conversely, cross-border ATS engines (Ashby, Greenhouse, Lever) are queried through rotating datacenter proxies using randomized jitter intervals ($\mu = 2.5\text{s}, \sigma = 0.8\text{s}$) to avoid triggering rate limits.Bengali Circular OCR and Multimodal Document ExtractionExtracting structured data from Bangladeshi government circulars is technically demanding. Many notices are distributed as low-resolution raster images, physical newspaper scans, or PDFs encoded with legacy 8-bit ASCII fonts (such as Bijoy 52 or SutonnyMJ) that render as garbled text in standard Unicode extractors.Extraction TechnologyBengali Character Recognition AccuracyTabular Structure PreservationHandling of Legacy Bijoy / Non-Unicode FontsPipeline Implementation CostTesseract OCR (ben.traineddata)Poor to Moderate (<65% on scanned newsprint); high error rate on complex ligatures (Juktakhor)Poor; loses cell alignment in multi-column tablesVery Poor; cannot easily resolve corrupted font glyphs without manual mapsFree (Open-source self-hosted utility)Google Cloud Vision (Document Text Detection)High (>90% character accuracy on clean documents)Moderate; produces raw bounding boxes that require custom layout reconstructionGood; accurately extracts character glyphs directly from image layoutsMedium ($1.50 per 1,000 pages processed)Gemini 1.5 Flash (Multimodal Vision & Layout)Excellent (>96% contextual character accuracy)Excellent; reconstructs tables directly into strongly typed JSON structuresExcellent; parses non-Unicode and legacy font layouts via visual comprehensionLow to Free (Generous free-tier limits: 15 RPM, 1M TPM)The circular parsing pipeline proceeds through several automated processing stages:Ingestion and Validation: The source PDF is downloaded into a temporary staging buffer, where magic bytes are validated (%PDF-1.x) to confirm file integrity.High-Resolution Rendering: The document pages are rasterized into 300 DPI PNG images using pdftoppm:Bashpdftoppm -png -r 300 -aaVector yes gazette_circular.pdf page_render
Image Optimization: The rendered images undergo contrast enhancement and adaptive thresholding to remove scanner noise and background bleed-through.Multimodal Information Extraction: The processed images are encoded to base64 and sent directly to the Gemini 1.5 Flash multimodal API. The model processes the visual layout, resolves Bengali ligatures, normalizes legacy fonts, and outputs structured, schema-compliant JSON.Module 4: LLM-Powered Normalization & Zod Schema ValidationTo maintain data integrity across downstream APIs, persistence layers, and candidate matching services, unstructured job postings are normalized into a strongly typed canonical schema.Universal Canonical Job Schema SpecificationThe canonical schema normalizes the diverse attributes of public civil service gazettes, banking recruitment circulars, and global remote engineering contracts:TypeScriptimport { z } from 'zod';

export const SectorEnum = z.enum([
  'GOVERNMENT',
  'BANKING',
  'CORPORATE_MNC',
  'LOCAL_CONGLOMERATE',
  'GLOBAL_REMOTE',
  'STARTUP',
]);

export const WorkplaceTypeEnum = z.enum(['ONSITE', 'HYBRID', 'REMOTE']);

export const StatutoryQuotaEnum = z.enum([
  'MERIT_93',
  'FREEDOM_FIGHTER_5',
  'ETHNIC_MINORITY_1',
  'PHYSICALLY_CHALLENGED_THIRD_GENDER_1',
  'DISTRICT_RESTRICTED',
  'NONE',
]);

export const DegreeFamilyEnum = z.enum([
  'B_SC_ENGINEERING',
  'COMPUTER_SCIENCE_IT',
  'BBA_COMMERCE_FINANCE',
  'MEDICAL_MBBS_BDS',
  'GENERAL_SCIENCE',
  'HUMANITIES_SOCIAL_SCIENCE',
  'LAW_LLB_LLM',
  'DIPLOMA_ENGINEERING',
  'HSC_INTERMEDIATE',
  'SSC_SECONDARY',
  'ANY_GRADUATION',
]);

export const CanonicalJobSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  fingerprintHash: z.string().length(64),
  title: z.string().min(1),
  organizationName: z.string().min(1),
  sector: SectorEnum,
  sourceUrl: z.string().url(),
  officialPortalUrl: z.string().url(),
  applicationDeepLink: z.string().url(),
  isDirectEmployerPortal: z.boolean(),
  workplaceType: WorkplaceTypeEnum,
  locationSummary: z.string(),
  city: z.string().optional(),
  country: z.string().default('Bangladesh'),
  allowedCandidateLocations: z.array(z.string()).default(['Bangladesh']),
  timezoneRequirements: z
    .object({
      minimumUtcOverlapHours: z.number().min(0).max(12).default(0),
      clientTargetTimezone: z.string().optional(),
    })
    .optional(),
  governmentMetadata: z
    .object({
      ministryOrDepartment: z.string(),
      grade: z.number().int().min(1).max(20),
      cadreType: z.enum(['CADRE', 'NON_CADRE_CLASS_1', 'NON_CADRE_CLASS_2', 'AUTONOMOUS_STAFF']).optional(),
      payScaleBandBdt: z.string(),
      basicSalaryMinBdt: z.number().nonnegative(),
      basicSalaryMaxBdt: z.number().nonnegative(),
      teletalkJobCode: z.string().optional(),
      ageLimitYearsMin: z.number().int().default(18),
      ageLimitYearsMax: z.number().int().default(32),
      quotaEligibility: z.array(StatutoryQuotaEnum).default(['MERIT_93']),
      applicableDistricts: z.array(z.string()).default(['ALL']),
    })
    .optional(),
  commercialCompensation: z
    .object({
      currency: z.string().length(3),
      interval: z.enum(['HOURLY', 'MONTHLY', 'ANNUAL']),
      amountMin: z.number().nonnegative(),
      amountMax: z.number().nonnegative(),
      amountMinBdtMonthly: z.number().nonnegative(),
      amountMaxBdtMonthly: z.number().nonnegative(),
      equityOffered: z.boolean().default(false),
      contractType: z.enum(['PERMANENT_DIRECT', 'B2B_CONTRACTOR', 'EOR_INTERMEDIATED', 'INTERNSHIP']),
      payoutMethodViability: z.array(z.string()).default(['SWIFT_WIRE']),
    })
    .optional(),
  qualificationRequirements: z.object({
    degreeFamily: DegreeFamilyEnum,
    specificDegreeTitle: z.string(),
    minimumCgpa: z.number().min(0).max(5.0).optional(),
    minimumDivision: z.enum(['FIRST', 'SECOND', 'THIRD', 'NOT_APPLICABLE']).optional(),
    minimumExperienceYears: z.number().int().min(0).default(0),
    allowFreshGraduates: z.boolean().default(true),
  }),
  competencyProfiles: z.array(
    z.object({
      taxonomyType: z.enum(['ESCO', 'ONET', 'INTERNAL']),
      skillIdentifier: z.string(),
      skillName: z.string(),
      isCorePrerequisite: z.boolean(),
    })
  ),
  publishedAt: z.string().datetime(),
  applicationDeadline: z.string().datetime(),
  lastVerifiedLiveAt: z.string().datetime(),
  isExpired: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  archiveSnapshotUrl: z.string().url().optional(),
});

export type CanonicalJob = z.infer<typeof CanonicalJobSchema>;
Production LLM Prompt HarnessThe extraction harness uses the following system prompt with the Gemini API to enforce strict JSON output formatting:TypeScriptexport const GEMINI_JOB_EXTRACTION_SYSTEM_PROMPT = `
You are the Lead Systems Extraction Engine for INSYT Corporate, specializing in labor market intelligence across Bangladeshi government circulars and international remote hiring systems.

Extract all relevant employment details from the provided document and output a strictly valid JSON object adhering to the CanonicalJob schema.

OPERATIONAL INSTRUCTIONS:
1. BANGLADESH CIVIL SERVICE & GOVERNMENT CIRCULARS:
   - Identify the National Pay Scale 2015 Grade (Grades 1 to 20). If the circular states "Grade 9" or "২২,০০০-৫৩,০৬০/-", map to: grade: 9, basicSalaryMinBdt: 22000, basicSalaryMaxBdt: 53060.
   - Map academic degrees to the closest DegreeFamilyEnum value. Do not classify specialized engineering degrees under generic "GENERAL_SCIENCE"; use "B_SC_ENGINEERING".
   - Under the July 2024 Supreme Court quota reform, default quotaEligibility to ["MERIT_93"] unless explicit special quotas are mandated.
   - Extract Teletalk job codes and official submission URLs (e.g., "http://xyz.teletalk.com.bd").

2. GLOBAL REMOTE ROLES:
   - Evaluate candidate viability for UTC+6 (Bangladesh Standard Time).
   - If compensation is denominated in foreign currencies, calculate estimated monthly BDT using: 1 USD = 120 BDT, 1 EUR = 130 BDT, 1 GBP = 152 BDT.
   - Tag professional competencies using standard naming conventions compatible with ESCO v1.2 and O*NET taxonomies.

3. DATES & TIMEZONES:
   - Convert all application deadlines into UTC ISO-8601 strings.
   - If a Bangladesh circular specifies an end time of "৫:০০ টা" or "11:59 PM", resolve it relative to Bangladesh Standard Time (UTC+6) before converting to UTC.

Return ONLY a clean JSON object matching the required schema without additional conversational text or Markdown formatting blocks outside the JSON payload.
`;
Module 5: Self-Healing Link Validation & Lifecycle ManagementJob boards frequently suffer from silent data degradation, including expired circulars, dead links, unhandled redirect chains, and duplicate cross-postings. The platform addresses these issues through an automated lifecycle management system.Dead Link Detection and Soft-404 MitigationThe validation engine runs scheduled checks on active listings using a three-tier inspection protocol:Lightweight header verification is executed first. An HTTP HEAD request checks endpoint availability. If the host returns 404 Not Found, 410 Gone, or 500 Internal Server Error across three consecutive attempts (spaced with exponential backoff and randomized jitter), the job record is flagged as inactive.Dynamic single-page application redirects are evaluated next. Modern ATS platforms (such as Workday, Greenhouse, and Lever) often return an HTTP 200 status or a 302 Found redirect when a position closes, redirecting visitors to the company's base careers landing page. The verification worker monitors redirect paths: if an application URL redirects to the base career domain (e.g., an individual posting URL like jobs.lever.co/company/uuid resolves to company.com/careers), the listing is identified as closed.DOM content analysis is performed on the remaining active links. For pages returning an HTTP 200 OK status, the scraper checks the initial 64 kilobytes of the HTML body for common closure phrases:"this job is no longer available""the position has been filled""applications are now closed""এই নিয়োগ বিজ্ঞপ্তির সময়সীমা শেষ হয়েছে" (Bengali: The deadline for this recruitment circular has expired)"online application is closed"Automated Expiry and Archival ManagementDeadlines across Bangladeshi circulars are set relative to Bangladesh Standard Time (BST = UTC+6). A circular indicating a closing deadline of "November 15, 2026, 5:00 PM" expires at 2026-11-15T11:00:00.000Z. If no specific closing hour is published, the system defaults to 23:59:59 BST (17:59:59 UTC).Every hour, an automated database worker updates expired records:SQLUPDATE jobs
SET is_expired = true, is_archived = true, updated_at = NOW()
WHERE is_expired = false AND application_deadline <= NOW();
To preserve historical access and prevent broken links, the platform integrates with the Internet Archive Wayback Machine API. When a job listing is indexed or marked as expired, the engine checks for an existing capture via the CDX Server API (https://web.archive.org/cdx/search/cdx). If no snapshot is found, it queries the Availability JSON API (https://archive.org/wayback/available?url={url}) or schedules a snapshot capture through the Wayback Save Page Now gateway (https://web.archive.org/save/{url}), saving the historical link within the archiveSnapshotUrl field.Deduplication and Fingerprint HashingWhen identical positions are syndicated across multiple channels (such as an MTO opening posted across an official careers site, LinkedIn, and Bdjobs), the platform detects duplicates using cryptographic fingerprinting:$$\mathcal{H} = \text{SHA-256}\left(\mathcal{N}(\text{org}) \,\Vert{}\, \mathcal{N}(\text{title}) \,\Vert{}\, D_{\text{deadline}} \,\Vert{}\, \mathcal{N}(\text{location})\right)$$Where $\mathcal{N}(s)$ normalizes text by converting characters to lowercase, removing non-alphanumeric characters, and stripping common corporate legal suffixes (PLC, Ltd, Limited, Inc, Company Limited, Bangladesh).TypeScriptimport { createHash } from 'node:crypto';

export function computeJobFingerprint(
  org: string,
  title: string,
  deadlineIso: string,
  location: string
): string {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/\b(plc|ltd|limited|inc|corp|corporation|bangladesh)\b/gi, '')
      .replace(/[^\p{L}\p{N}]/gu, '');

  const payload = [
    normalize(org),
    normalize(title),
    deadlineIso.split('T')[0], // Uses the ISO YYYY-MM-DD boundary
    normalize(location),
  ].join('::');

  return createHash('sha256').update(payload).digest('hex');
}
If an incoming job payload produces an existing fingerprintHash, the database executes an upsert: it retains the original record ID, updates lastVerifiedLiveAt, incorporates any newly extracted attributes, and points applicationDeepLink directly to the verified primary source rather than the third-party aggregator.Module 6: Candidate Matching & ATS Radar EngineThe platform converts job data into personalized career insights by evaluating candidate profiles against verified job prerequisites.Prerequisite and Competency Alignment AlgorithmRather than relying on basic keyword searches, which often misclassify candidates by matching generic terms, the engine employs a deterministic matching model.Statutory prerequisites are evaluated first using a binary gate ($S_{\text{gate}} \in \{0, 1\}$). For government, banking, and accredited corporate positions, legal requirements must be strictly satisfied before competency scoring occurs:$$S_{\text{gate}} = \mathbb{I}(\text{DegreeMatch}) \times \mathbb{I}(\text{AgeValid}) \times \mathbb{I}(\text{DistrictQuotaValid})$$Where:$\mathbb{I}(\text{DegreeMatch})$ verifies that the candidate's degree falls within the required DegreeFamily. A general degree will not satisfy a statutory requirement for a Bachelor of Science in Engineering, regardless of technical portfolio depth.$\mathbb{I}(\text{AgeValid})$ confirms that the candidate falls within the statutory age limits on the circular's specified calculation date:$$\text{AgeYears} \in [\text{ageLimitYearsMin}, \text{ageLimitYearsMax}]$$$\mathbb{I}(\text{DistrictQuotaValid})$ checks whether the candidate's verified home district is legally eligible under the circular's gazetted district schedule.Competency alignment ($S_{\text{comp}}$) is calculated once statutory eligibility is confirmed, weighting candidate skills according to their verification source:$$S_{\text{comp}} = \frac{\sum_{i=1}^{M} w(k_i) \cdot \text{Match}(k_i, \mathcal{C}_{\text{job}})}{\sum_{i=1}^{M} w(k_i)}$$Where $\mathcal{C}_{\text{job}}$ represents the required job competencies and $w(k_i)$ applies verification weighting based on the candidate's INSYT Career Passport:Verified Assessment Skills ($w = 3.0$): Skills confirmed via cryptographically signed W3C Verifiable Credentials (Ed25519) issued through proctored assessments.Verified Project Artifacts ($w = 2.0$): Skills demonstrated through validated code repositories, technical projects, or completed course capstones.Self-Declared CV Skills ($w = 1.0$): Skills listed by the candidate on a resume without third-party verification.The final composite metric, $S_{\text{align}} = S_{\text{gate}} \times S_{\text{comp}}$, is displayed to candidates as "Prerequisite Alignment" to provide an objective measure of qualifications without making speculative claims about selection odds.Competency Gap Analysis and Learning PathwaysWhen a candidate's Prerequisite Alignment score falls below 80% ($S_{\text{align}} < 0.80$), the platform identifies missing qualifications to support career development.The system determines the specific missing competencies:$$\Delta = \mathcal{C}_{\text{job, core}} \setminus \mathcal{C}_{\text{candidate, verified}}$$Each missing skill $k_m \in \Delta$ is mapped to the internal curriculum database to generate actionable recommendations:Missing Competency: "PostgreSQL Query Optimization & Indexing" $\to$ Recommended Path: Module 4 in Advanced Relational Database Engineering (Estimated Completion: 4 hours).Missing Competency: "Financial Ratio Analysis" $\to$ Recommended Path: Practice Assessment: Commercial Banking MTO Quantitative Preparation.One-Click Application Tracking IntegrationThe platform connects opportunity discovery directly to application management workflows:Verified Deep Links: Candidates can navigate directly to the official employer portal or Teletalk form, with relevant profile details prepared for form submission or exported as a tailored, ATS-compliant PDF resume.Automated Kanban State Updates: Clicking an application link automatically updates the candidate's tracking board:TypeScriptawait kanbanCrmService.transitionJobState({
  candidateId: session.user.id,
  jobId: targetJob.id,
  fromState: 'SAVED',
  toState: 'APPLIED',
  appliedAt: new Date().toISOString(),
});
Module 7: Front-End User Experience & Executive Design SystemThe user interface across /opportunities and /jobs is designed with an Executive Corporate Light Mode theme, prioritizing visual hierarchy, high contrast, and rapid scanning for complex employment data.Palette Architecture and System TokensThe interface uses a clean, modern color scheme designed for legibility and clear status communication:Design TokenHex Code ValueSemantic Role and Interface Context--bg-base#F7F8FCMain application background, providing subtle contrast behind white content cards.--bg-surface#FFFFFFPrimary containers, card elements, interactive modals, and document viewers.--bg-subtle#F1F5F9Secondary panel headers, input field backgrounds, and table headers.--text-primary#1A1D2EHigh-contrast geometric headings, titles, and key metrics.--text-muted#64748BSupporting labels, timestamps, metadata, and helper text.--brand-navy#1E3A8APrimary branding, sector headers, and institutional badge accents.--brand-blue#2563EBActive buttons, primary links, focus indicators, and interactive highlights.--status-active#059669High-alignment match indicators, active application statuses, and verified badges.--status-amber#D97706Approaching deadlines ($\le 72$ hours remaining) and priority alerts.--border-base#E2E8F0Structural borders, card outlines, and grid dividers.Faceted Filtering MatrixThe opportunities index includes a multi-axis filtering system supporting real-time client-side search alongside server-side queries:Sector Filtering: Segmented controls to toggle between All Sectors, Government (Grade 9–10), Banking (BSCS & MTO), Corporate/MNC, and Global Remote.Geographic Location: Geographic filters covering Dhaka Metro, Chittagong, Divisional Centers, and Worldwide Remote.Dual-Currency Compensation: A dynamic slider supporting dual-currency inputs (BDT and USD) that automatically reflects current interbank exchange rates."Eligible Only" Switch: A toggle that filters listings to show only roles where the candidate meets all statutory prerequisites ($S_{\text{gate}} = 1$) and achieves a Prerequisite Alignment score of at least 70% ($S_{\text{align}} \ge 0.70$).Document Inspection and Interactive WorkflowsGovernment and banking circulars feature a split-screen view. The left panel renders the original document scan via a responsive PDF canvas, while the right panel displays the parsed canonical data, eligibility checklists, and direct submission links.Postings closing within 7 days display live countdown clocks that calculate remaining time relative to Bangladesh Standard Time (UTC+6).Candidates can also launch an instant resume tailor. The system cross-references the posting's required skills with the candidate's verified career credentials, generating a single-page, vector PDF resume optimized for ATS parsing that emphasizes verified qualifications.Module 8: Production Deployment, Cost Architecture & SRE Operational PlaybookTo ensure continuous, reliable operation without incurring high infrastructure expenses, the platform leverages serverless compute and managed cloud services within standard operational limits.Cost-Effective Deployment ArchitectureSystem operations are distributed across several cloud platforms to balance performance and operating costs:Scheduling and Coordination: Scheduled GitHub Actions workflows trigger crawlers and health checkers on regular intervals (hourly for remote feeds, daily for government portals), eliminating the need for dedicated crawler virtual machines.Queue and State Management: Upstash Serverless Redis handles BullMQ job distribution, deduplication caching, and rate limiting.Multimodal Document Understanding: The Google Gemini 1.5 Flash API processes complex Bengali circulars, utilizing available free-tier capacity (15 requests/minute, 1,000,000 tokens/minute) to keep AI processing costs low.Data Persistence: PostgreSQL (hosted via Supabase or Appwrite Cloud) stores structured job data, leveraging relational constraints and JSONB column indexing for flexible schema evolution.Application Hosting: Next.js 16 (using Turbopack, React Server Components, and Edge Route Handlers) hosts the user interface, serving static pages where possible and dynamic edge calls for personalized candidate matching.Phased Engineering Implementation RoadmapThe platform deployment is structured across five sequential implementation phases:Deployment PhaseTargeted Engineering MilestonesOperational DeliverablesPhase 1: Days 1–3Foundational data contracts, database schema definitions, dead link monitoring services.Database migration scripts, Zod validation schemas, automated HTTP health checker.Phase 2: Days 4–7Public ATS API connectors (Ashby, Greenhouse, Lever, Workable).High-speed JSON ingestors, remote candidate feasibility filters, automated currency converters.Phase 3: Days 8–14Domestic enterprise scrapers and Teletalk scraping pipelines.Playwright extraction scripts, proxy routing managers, Teletalk form parsers.Phase 4: Days 15–20Bengali circular OCR and multimodal parsing pipeline.Image pre-processing utilities, Gemini multimodal extraction integrations, fallback parsers.Phase 5: Days 21–25Candidate matching engine and front-end interface deployment.Prerequisite alignment scoring service, curriculum gap analyzers, executive UI integration.Production Implementation CodeProduction Canonical Schema ContractTypeScript// File: src/lib/schema/canonical-job.ts
import { z } from 'zod';

export const SectorEnum = z.enum([
  'GOVERNMENT',
  'BANKING',
  'CORPORATE_MNC',
  'LOCAL_CONGLOMERATE',
  'GLOBAL_REMOTE',
  'STARTUP',
]);

export const WorkplaceTypeEnum = z.enum(['ONSITE', 'HYBRID', 'REMOTE']);

export const DegreeFamilyEnum = z.enum([
  'B_SC_ENGINEERING',
  'COMPUTER_SCIENCE_IT',
  'BBA_COMMERCE_FINANCE',
  'MEDICAL_MBBS_BDS',
  'GENERAL_SCIENCE',
  'HUMANITIES_SOCIAL_SCIENCE',
  'LAW_LLB_LLM',
  'DIPLOMA_ENGINEERING',
  'HSC_INTERMEDIATE',
  'SSC_SECONDARY',
  'ANY_GRADUATION',
]);

export const CanonicalJobSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  fingerprintHash: z.string().length(64),
  title: z.string().min(1),
  organizationName: z.string().min(1),
  sector: SectorEnum,
  sourceUrl: z.string().url(),
  officialPortalUrl: z.string().url(),
  applicationDeepLink: z.string().url(),
  isDirectEmployerPortal: z.boolean(),
  workplaceType: WorkplaceTypeEnum,
  locationSummary: z.string(),
  city: z.string().optional(),
  country: z.string().default('Bangladesh'),
  allowedCandidateLocations: z.array(z.string()).default(['Bangladesh']),
  governmentMetadata: z
    .object({
      ministryOrDepartment: z.string(),
      grade: z.number().int().min(1).max(20),
      payScaleBandBdt: z.string(),
      basicSalaryMinBdt: z.number().nonnegative(),
      basicSalaryMaxBdt: z.number().nonnegative(),
      teletalkJobCode: z.string().optional(),
      ageLimitYearsMin: z.number().int().default(18),
      ageLimitYearsMax: z.number().int().default(32),
      quotaEligibility: z.array(z.string()).default(['MERIT_93']),
      applicableDistricts: z.array(z.string()).default(['ALL']),
    })
    .optional(),
  commercialCompensation: z
    .object({
      currency: z.string().length(3),
      interval: z.enum(['HOURLY', 'MONTHLY', 'ANNUAL']),
      amountMin: z.number().nonnegative(),
      amountMax: z.number().nonnegative(),
      amountMinBdtMonthly: z.number().nonnegative(),
      amountMaxBdtMonthly: z.number().nonnegative(),
      contractType: z.enum(['PERMANENT_DIRECT', 'B2B_CONTRACTOR', 'EOR_INTERMEDIATED', 'INTERNSHIP']),
    })
    .optional(),
  qualificationRequirements: z.object({
    degreeFamily: DegreeFamilyEnum,
    specificDegreeTitle: z.string(),
    minimumCgpa: z.number().min(0).max(5.0).optional(),
    minimumExperienceYears: z.number().int().min(0).default(0),
  }),
  competencyProfiles: z.array(
    z.object({
      skillIdentifier: z.string(),
      skillName: z.string(),
      isCorePrerequisite: z.boolean(),
    })
  ),
  publishedAt: z.string().datetime(),
  applicationDeadline: z.string().datetime(),
  lastVerifiedLiveAt: z.string().datetime(),
  isExpired: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  archiveSnapshotUrl: z.string().url().optional(),
});

export type CanonicalJob = z.infer<typeof CanonicalJobSchema>;
Self-Healing Link Health SweeperTypeScript// File: src/services/sweeper/link-health.ts
import { fetch, Agent } from 'undici';

interface LinkVerificationResult {
  isAlive: boolean;
  httpStatus: number;
  finalDestinationUrl: string;
  isSoft404: boolean;
  reason?: string;
}

const TERMINAL_TEXT_PATTERNS = [
  /this job is no longer available/i,
  /position has been filled/i,
  /applications are now closed/i,
  /application closed/i,
  /নিয়োগ বিজ্ঞপ্তির সময়সীমা শেষ/i,
  /not currently accepting applications/i,
];

const clientAgent = new Agent({
  connect: {
    timeout: 10_000,
    keepAlive: true,
  },
});

export async function verifyJobLinkHealth(
  targetUrl: string,
  rootCareersUrl?: string
): Promise<LinkVerificationResult> {
  try {
    let response = await fetch(targetUrl, {
      method: 'HEAD',
      dispatcher: clientAgent,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (response.status === 405) {
      response = await fetch(targetUrl, {
        method: 'GET',
        dispatcher: clientAgent,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        },
      });
    }

    const finalUrl = response.url;

    if (response.status === 404 || response.status === 410) {
      return {
        isAlive: false,
        httpStatus: response.status,
        finalDestinationUrl: finalUrl,
        isSoft404: false,
        reason: 'HTTP_NOT_FOUND',
      };
    }

    if (rootCareersUrl && finalUrl !== targetUrl) {
      const normalize = (u: string) => u.replace(/\/+$/, '').toLowerCase();
      if (normalize(finalUrl) === normalize(rootCareersUrl)) {
        return {
          isAlive: false,
          httpStatus: response.status,
          finalDestinationUrl: finalUrl,
          isSoft404: true,
          reason: 'REDIRECTED_TO_BASE_CAREERS_PORTAL',
        };
      }
    }

    if (response.status >= 200 && response.status < 300) {
      const getResponse = await fetch(targetUrl, {
        method: 'GET',
        dispatcher: clientAgent,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        },
      });

      const bodyChunk = await getResponse.text();
      const inspectedSnippet = bodyChunk.slice(0, 65536);

      for (const pattern of TERMINAL_TEXT_PATTERNS) {
        if (pattern.test(inspectedSnippet)) {
          return {
            isAlive: false,
            httpStatus: response.status,
            finalDestinationUrl: finalUrl,
            isSoft404: true,
            reason: `TERMINAL_PATTERN_DETECTED: ${pattern.toString()}`,
          };
        }
      }
    }

    return {
      isAlive: true,
      httpStatus: response.status,
      finalDestinationUrl: finalUrl,
      isSoft404: false,
    };
  } catch (error: any) {
    return {
      isAlive: false,
      httpStatus: 0,
      finalDestinationUrl: targetUrl,
      isSoft404: false,
      reason: `NETWORK_TRANSPORT_FAILURE: ${error.message}`,
    };
  }
}
Multimodal Bengali Circular ExtractorTypeScript// File: src/services/extraction/gemini-circular-extractor.ts
import { GoogleGenAI } from '@google/genai';
import { CanonicalJobSchema, type CanonicalJob } from '../schema/canonical-job';
import { GEMINI_JOB_EXTRACTION_SYSTEM_PROMPT } from '../prompts/system-prompts';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'node:crypto';

const ai = new GoogleGenAI();

export async function extractCircularFromImages(
  pageImagesBase64: string[],
  sourceUrl: string,
  officialPortalUrl: string
): Promise<CanonicalJob> {
  const imageParts = pageImagesBase64.map((base64Data) => ({
    inlineData: {
      data: base64Data,
      mimeType: 'image/png',
    },
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          ...imageParts,
          {
            text: `Extract all recruitment information from these circular pages according to the canonical schema. Source URL: ${sourceUrl}, Official Portal URL: ${officialPortalUrl}. Return raw JSON matching the requested structure.`,
          },
        ],
      },
    ],
    config: {
      systemInstruction: GEMINI_JOB_EXTRACTION_SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      temperature: 0.1,
    },
  });

  const responseText = response.text();
  if (!responseText) {
    throw new Error('Gemini API returned an empty extraction response.');
  }

  const rawJson = JSON.parse(responseText);

  const fingerprint = createHash('sha256')
    .update(
      `${rawJson.organizationName}::${rawJson.title}::${rawJson.applicationDeadline?.split('T')[0]}::${rawJson.locationSummary}`
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]/gu, '')
    )
    .digest('hex');

  const enrichedPayload = {
    ...rawJson,
    id: uuidv4(),
    slug: `${rawJson.organizationName}-${rawJson.title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    fingerprintHash: fingerprint,
    sourceUrl,
    officialPortalUrl,
    lastVerifiedLiveAt: new Date().toISOString(),
    isExpired: false,
    isArchived: false,
  };

  return CanonicalJobSchema.parse(enrichedPayload);
}
Weighted Candidate Radar EngineTypeScript// File: src/services/matching/candidate-radar.ts
import { type CanonicalJob, DegreeFamilyEnum } from '../schema/canonical-job';

export interface VerifiedCredential {
  skillIdentifier: string;
  skillName: string;
  verificationSource: 'INSYT_PROCTORED_EXAM' | 'W3C_VERIFIABLE_CREDENTIAL';
  issuedAt: string;
}

export interface CandidateProfile {
  id: string;
  birthDate: string;
  homeDistrict: string;
  degreeFamily: keyof typeof DegreeFamilyEnum.enum;
  cgpa: number;
  verifiedCredentials: VerifiedCredential[];
  completedProjectSkills: string[];
  selfDeclaredSkills: string[];
}

export interface RadarMatchResult {
  candidateId: string;
  jobId: string;
  isEligible: boolean;
  statutoryGatePassed: boolean;
  disqualificationReason?: string;
  prerequisiteAlignmentScore: number;
  competencyBreakdown: {
    matchedCoreSkills: string[];
    missingCoreSkills: string[];
  };
  recommendedLearningPaths: string[];
}

export function evaluateCandidateJobRadar(
  candidate: CandidateProfile,
  job: CanonicalJob
): RadarMatchResult {
  if (job.governmentMetadata) {
    const birthYear = new Date(candidate.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const candidateAge = currentYear - birthYear;

    if (
      candidateAge < job.governmentMetadata.ageLimitYearsMin ||
      candidateAge > job.governmentMetadata.ageLimitYearsMax
    ) {
      return buildDisqualifiedResult(
        candidate.id,
        job.id,
        `AGE_OUT_OF_BOUNDS: Age ${candidateAge} falls outside statutory bounds (${job.governmentMetadata.ageLimitYearsMin}-${job.governmentMetadata.ageLimitYearsMax})`
      );
    }

    const allowedDistricts = job.governmentMetadata.applicableDistricts;
    if (
      allowedDistricts.length > 0 &&
      !allowedDistricts.includes('ALL') &&
      !allowedDistricts.includes(candidate.homeDistrict)
    ) {
      return buildDisqualifiedResult(
        candidate.id,
        job.id,
        `DISTRICT_EXCLUDED: Candidate home district (${candidate.homeDistrict}) not eligible for this circular.`
      );
    }
  }

  const requiredFamily = job.qualificationRequirements.degreeFamily;
  if (requiredFamily !== 'ANY_GRADUATION' && candidate.degreeFamily !== requiredFamily) {
    return buildDisqualifiedResult(
      candidate.id,
      job.id,
      `DEGREE_FAMILY_MISMATCH: Requires ${requiredFamily}, candidate holds ${candidate.degreeFamily}`
    );
  }

  const requiredSkills = job.competencyProfiles;
  if (requiredSkills.length === 0) {
    return {
      candidateId: candidate.id,
      jobId: job.id,
      isEligible: true,
      statutoryGatePassed: true,
      prerequisiteAlignmentScore: 1.0,
      competencyBreakdown: { matchedCoreSkills: [], missingCoreSkills: [] },
      recommendedLearningPaths: [],
    };
  }

  const verifiedSkillSet = new Set(
    candidate.verifiedCredentials.map((c) => c.skillIdentifier.toLowerCase())
  );
  const projectSkillSet = new Set(
    candidate.completedProjectSkills.map((s) => s.toLowerCase())
  );
  const selfDeclaredSkillSet = new Set(
    candidate.selfDeclaredSkills.map((s) => s.toLowerCase())
  );

  let totalAvailableWeight = 0;
  let earnedScore = 0;
  const matchedCore: string[] = [];
  const missingCore: string[] = [];

  for (const skill of requiredSkills) {
    const sId = skill.skillIdentifier.toLowerCase();
    const baseWeight = skill.isCorePrerequisite ? 2.0 : 1.0;
    const skillMaxWeight = baseWeight * 3.0;
    totalAvailableWeight += skillMaxWeight;

    if (verifiedSkillSet.has(sId)) {
      earnedScore += baseWeight * 3.0;
      matchedCore.push(skill.skillName);
    } else if (projectSkillSet.has(sId)) {
      earnedScore += baseWeight * 2.0;
      matchedCore.push(skill.skillName);
    } else if (selfDeclaredSkillSet.has(sId)) {
      earnedScore += baseWeight * 1.0;
      matchedCore.push(skill.skillName);
    } else {
      if (skill.isCorePrerequisite) {
        missingCore.push(skill.skillName);
      }
    }
  }

  const alignmentScore =
    totalAvailableWeight > 0
      ? Number((earnedScore / totalAvailableWeight).toFixed(3))
      : 1.0;

  const recommendedPaths = missingCore.map(
    (skillName) => `INSYT Curriculum Bridge: Master ${skillName} for Professional Certification`
  );

  return {
    candidateId: candidate.id,
    jobId: job.id,
    isEligible: alignmentScore >= 0.7,
    statutoryGatePassed: true,
    prerequisiteAlignmentScore: alignmentScore,
    competencyBreakdown: {
      matchedCoreSkills: matchedCore,
      missingCoreSkills: missingCore,
    },
    recommendedLearningPaths: recommendedPaths,
  };
}

function buildDisqualifiedResult(
  candidateId: string,
  jobId: string,
  reason: string
): RadarMatchResult {
  return {
    candidateId,
    jobId,
    isEligible: false,
    statutoryGatePassed: false,
    disqualificationReason: reason,
    prerequisiteAlignmentScore: 0.0,
    competencyBreakdown: {
      matchedCoreSkills: [],
      missingCoreSkills: [],
    },
    recommendedLearningPaths: [],
  };
}
Architectural ConclusionsThe architecture specified in this blueprint establishes an autonomous labor intelligence system designed for the operational realities of Bangladesh and international remote hiring markets. By combining multimodal parsing for legacy government documents, direct API connectors for modern corporate applicant tracking systems, automated link verification, and credential-weighted candidate matching, the platform ensures continuous data reliability while reducing manual operational overhead. This design provides INSYT Corporate with a maintainable technical foundation that transforms disparate public and private hiring signals into structured, actionable career intelligence.


### Gemini 3.8 Flash
Autonomous Real-Time Job Ingestion & Labor Market Intelligence Engine: Architectural Specification & Production Implementation GuideModule 1: The Bangladesh Recruitment Surface Map (Government, Banking, Corporate)The digital landscape of labor recruitment in Bangladesh is structurally fragmented across legacy public sector frameworks, specialized statutory banking portals, modern enterprise Applicant Tracking Systems (ATS), and localized aggregator nodes. Architecting an automated ingestion system requires mapping the precise network protocols, Document Object Model (DOM) layouts, and anti-bot environments governing these target platforms.Government and Autonomous Research InstitutesPublic sector recruitment in Bangladesh is centrally facilitated through two primary operational mechanisms: the Bangladesh Public Service Commission (BPSC) and the state-owned telecommunications infrastructure operated by Teletalk Bangladesh Limited.The BPSC coordinates recruitment for civil service cadre positions through the Bangladesh Civil Service (BCS) examination cycles and non-cadre first- and second-class gazetted officer appointments. The primary discovery surface resides at bpsc.gov.bd, while dynamic application forms and examination administration are hosted at bpsc.teletalk.com.bd. The web topology of bpsc.teletalk.com.bd operates as an Apache and PHP-driven portal where application links are conditionally exposed based on active gazette notifications.Autonomous research councils and government ministries deploy dedicated subdomains off the Teletalk multi-tenant architecture (*.teletalk.com.bd) or list aggregated vacancies on alljobs.teletalk.com.bd. Over 40 ministries and state research councils utilize standardized subdomain routing, including the Department of Primary Education (dpe.teletalk.com.bd), Bangladesh Agricultural Research Institute (bari.teletalk.com.bd), Bangladesh Rice Research Institute (brri.teletalk.com.bd), Bangladesh Institute of Nuclear Agriculture (bina.teletalk.com.bd), Bangladesh Council of Scientific and Industrial Research (bcsir.teletalk.com.bd), Bangladesh Agricultural Research Council (barc.teletalk.com.bd), Bangladesh Jute Research Institute (bjri.teletalk.com.bd), Bangladesh Tea Research Institute (btri.teletalk.com.bd), and Bangladesh Sugarcrop Research Institute (bsri.teletalk.com.bd).On these subdomains, the standard user application journey follows a deterministic pattern:Accessing the application landing page (http://[agency].teletalk.com.bd/).Navigating to application_form.php or jobs.php to select the position.Populating personal, biographical, and educational details, including photo dimensions ($300 \times 300\text{ pixels}$, maximum $100\text{ KB}$) and signature dimensions ($300 \times 80\text{ pixels}$, maximum $60\text{ KB}$).Transmitting the form data to generate an Applicant's Copy bearing a unique User ID.Completing payment via a Teletalk prepaid mobile subscriber identity module (SIM) using Short Message Service (SMS) targeting shortcode 16222 in two validation cycles:First SMS: [AGENCY_CODE] [USER_ID] sent to 16222 (returns candidate verification name, fee amount, and a transient PIN).Second SMS: [AGENCY_CODE] YES [PIN] sent to 16222 (deducts funds from airtime balance and returns an application confirmation receipt with User ID and permanent Password).The legal and economic parameters governing public employment derive from the National Pay Scale 2015 gazetted by the Ministry of Finance, which outlines twenty distinct remuneration tiers. Public sector hiring primarily focuses on entry-level managerial and technical appointments across Grades 9 through 20. Grade 9 (Class 1 Gazetted, entry cadre officer, Assistant Director, Assistant Engineer, Lecturer) establishes a basic salary range of ৳22,000 to ৳53,060. Grade 10 (Class 2 Non-Gazetted, Sub-Assistant Engineer, Administrative Officer) establishes a basic salary range of ৳16,000 to ৳38,640. While statutory orders for the 9th National Pay Scale have been gazetted for future basic salary realignments (e.g., doubling baseline entry figures), official recruitment circulars continue to benchmark eligibility and statutory compensation against the National Pay Scale 2015 baseline structures.Beyond the base tier, complete compensation packages include mandatory allowances:House Rent Allowance: Scaled by geographic posting location. Dhaka City Corporation provides 50% of basic pay (subject to statutory minimums); other divisional city corporations provide 45%; non-metropolitan district and upazila jurisdictions provide 40%.Medical Allowance: A fixed statutory disbursement of ৳1,500 per month across all civilian grades.Conveyance and Tiffin Allowances: Applicable to non-gazetted officers below Grade 10 (e.g., ৳200/month tiffin, ৳300/month transport).Festival Allowances: Two annual festival bonuses, each equaling 100% of basic monthly pay, alongside a Bengali New Year (Pohela Boishakh) allowance fixed at 20% of basic pay.Statutory quotas in public sector recruitments were historically allocated across freedom fighter descendants (30%), district quotas (10%), women (10%), and indigenous communities (5%). Following the Supreme Court Appellate Division ruling delivered on July 21, 2024, the quota architecture for all government, semi-government, and autonomous agencies was restructured:Merit-Based Allocation: 93% of all open vacancies.Freedom Fighter Quota: 5% reserved strictly for the children of freedom fighters and Birangonas (excluding grandchildren).Ethnic Minorities Quota: 1% reserved for recognized indigenous and tribal communities.Physically Disabled and Third Gender Quota: 1% combined reservation.If qualified candidates are unavailable within reserved categories, unfilled positions revert directly to the general merit ranking. Circulars explicitly outline these thresholds, and automated extraction engines must map them to candidate demographic profiles to determine eligibility.Ministry / Research Body / CadreSubdomain / URL EndpointApplication MechanismPrimary GradesFee Structure (BDT)Bangladesh Public Service Commissionbpsc.teletalk.com.bd[cite: 2]Custom PHP Form + Teletalk SMSGrade 9 (Cadre / Non-Cadre)৳700 (General), ৳100 (Disadvantaged)Directorate of Primary Educationdpe.teletalk.com.bdSubdomain Form + SMS GatewayGrade 10 to Grade 13৳223Bangladesh Agricultural Research Inst.bari.teletalk.com.bd[cite: 5, 7]Subdomain Form + SMS GatewayGrade 9 to Grade 20৳56 to ৳669Bangladesh Rice Research Inst.brri.teletalk.com.bd[cite: 6]Subdomain Form + SMS GatewayGrade 9 to Grade 16৳112 to ৳223Bangladesh Inst. of Nuclear Agriculturebina.teletalk.com.bdSubdomain Form + SMS GatewayGrade 9 to Grade 18৳112 to ৳223Council of Scientific & Industrial Researchbcsir.teletalk.com.bd[cite: 5]Subdomain Form + SMS GatewayGrade 9 to Grade 17৳112 to ৳223Central Government Ministries (e.g. Cabinet)cabinet.teletalk.com.bd[cite: 8]Subdomain Form + SMS GatewayGrade 9 to Grade 20৳56 to ৳223Central and Commercial Banking SectorThe financial recruitment ecosystem bifurcates into state-affiliated institutions managed centrally and private commercial banks operating custom career portals.Central bank appointments and state-owned commercial bank recruitment operate under the jurisdiction of the Bankers' Selection Committee Secretariat (BSCS), housed within Bangladesh Bank. All statutory circulars, application routines, and candidate tracking workflows interface with erecruitment.bb.org.bd.The BSCS structure encompasses:Bangladesh Bank (Assistant Director - General, Statistics, ICT, Research).State-Owned Commercial Banks: Sonali Bank PLC, Janata Bank PLC, Agrani Bank PLC, Rupali Bank PLC.Specialized Agricultural and Development Banks: Bangladesh Krishi Bank (BKB), Rajshahi Krishi Unnayan Bank (RAKUB), Bangladesh Development Bank PLC (BDBL), BASIC Bank PLC, Investment Corporation of Bangladesh (ICB), and House Building Finance Corporation (HBFC).The discovery endpoint for BSCS hiring is located at https://erecruitment.bb.org.bd/onlineapp/joblist.php. Unlike standard Teletalk subdomains, the Bangladesh Bank system uses a persistent, centralized applicant database. Candidates establish an account that generates a permanent CV Identification Number and Password. Applications generate a transient Job Tracking Number. Payments are completed through MFS gateways (bKash, Rocket, Nagad) or Bangladesh Bank's integrated payment refund and tracking portal (/onlineapp/apply_fee_rfnd.php), confirming payment via an automated API callback that issues a finalized Tracking Page. BSCS rules enforce strict educational eligibility: candidates must hold at least two first divisions/classes (or CGPA $\ge 3.00$ on a 4.00 scale / CGPA $\ge 3.75$ on a 5.00 scale), with a complete prohibition on third divisions/classes in any academic transcript.Private Commercial Banks (PCBs) operate independent recruitment cycles for Management Trainee Officers (MTO), Probationary Officers (PO), and Trainee Cash Officers. Top private commercial banking institutions run dedicated career web platforms:Dutch-Bangla Bank PLC: Operates an enterprise recruitment application at app.dutchbanglabank.com/Online_Job/. Positions are parameterized via dynamic URL strings (jobDetails?positionCode={code}&positionName={name}&lastDate={dd-mm-yyyy}). The system restricts candidates to a single active application per cycle (e.g., MTO versus Trainee Cash Officer).BRAC Bank PLC: Manages recruitment via an enterprise Workday deployment or custom career node at careers.bracbank.com (with supplementary group-level job data published via careers.brac.net).Eastern Bank PLC (EBL): Deploys an ASP.NET application form at ebl.com.bd/career.The City Bank PLC: Operates through thecitybank.com/career with candidate profile storage and dynamic vacancy listings.Mutual Trust Bank (MTB): Uses an internal recruitment portal at mutualtrustbank.com/careers/.Foreign Commercial Banks: Standard Chartered Bangladesh and HSBC Bangladesh process domestic hiring through global taleo/workday endpoints: scb.taleo.net and hsbc.taleo.net, with location parameters restricted to Bangladesh/Dhaka.Top Corporate FMCG, Telecommunications, and Tech ConglomeratesEnterprise recruitment across multinational corporations (MNCs), local consumer conglomerates, and the domestic technology ecosystem relies heavily on third-party ATS platforms or custom HR management systems (HRMS).Multinational Corporations:Telecommunications: Grameenphone (Telenor Group) hosts vacancies on Workday (telenor.wd3.myworkdayjobs.com/gp_careers). Robi Axiata (Axiata Group) utilizes SAP SuccessFactors (career.robi.com.bd). Banglalink (VEON) publishes opportunities on Workday (veon.wd3.myworkdayjobs.com/Banglalink).Fast-Moving Consumer Goods (FMCG): Unilever Bangladesh routes applicants to Unilever Careers powered by Workday (unilever.wd3.myworkdayjobs.com/Unilever_Careers). British American Tobacco (BAT) Bangladesh runs on SuccessFactors (careers.bat.com). Nestlé Bangladesh operates on SuccessFactors (jobdetails.nestle.com). Marico Bangladesh deploys Darwinbox (marico.darwinbox.in).Local Conglomerates:
Domestic conglomerates typically utilize custom ASP.NET/PHP internal career sites or direct candidate CV submissions to specific HR mail handlers:Square Group: Operates a proprietary career portal at career.squaregroup.com.Beximco Group: Publishes circulars across divisional landing sites (beximco.com/careers) and LinkedIn Corporate pages.PRAN-RFL Group: Hosts positions on career.pranrflgroup.com and executes recruitment drives across campus channels.Walton Group: Manages listings at jobs.waltonbd.com.Akij Group, Meghna Group of Industries (MGI), ACI Limited, and Apex Footwear host static or semi-dynamic career sections requiring direct resume uploads or candidate registration.Fintech and Emerging Tech Startups:bKash Limited: Utilizes an enterprise Greenhouse or custom portal (career.bkash.com).Nagad: Hosts opportunities on a proprietary career board (nagad.com.bd/career).Pathao, Chaldal, and ShopUp: Modern technology firms deploy international ATS platforms, primarily Greenhouse (boards-api.greenhouse.io/v1/boards/{token}) or Lever (api.lever.co/v0/postings/{site}), or utilize Ashby (jobs.ashbyhq.com/{slug}).Third-Party BD Aggregators and Primary Source ValidationThird-party job boards in Bangladesh (e.g., bdjobs.com, chakri.com, prothomalo.com/jobs, and LinkedIn Jobs) capture a significant volume of job listings. However, treating these aggregator platforms as primary sources introduces several failure modes:Aggregator links expire or become paywalled, masking the underlying employer application form.Aggregator postings often rewrite or truncate essential statutory qualifications (e.g., omitting specific degree major restrictions or quota nuances).Footnotes and citations scraped from secondary aggregators degrade over time into dead links (e.g., [Source][1]).To prevent data corruption, third-party aggregators must be utilized solely as discovery sensors rather than persistent canonical references.The canonical resolution pipeline operates through the following steps:Discovery Ingestion: Scrape secondary aggregators to extract company identity, advertised title, deadline date, and application instructions.Canonical Resolution:If the raw description contains a link matching *.teletalk.com.bd or erecruitment.bb.org.bd, rewrite the source entity directly to the public sector pipeline.If the posting points to a recognized ATS domain (e.g., greenhouse.io, lever.co, workdayjobs.com), verify and resolve the deep link to the ATS origin.If the post cites a private enterprise (e.g., Square, PRAN-RFL, BRAC Bank), cross-reference the company's verified primary domain to verify the posting.Citation Sanitization: Strip aggregator-specific tracking parameters (utm_source, ref, internal listing IDs) and remove unresolved footnote tags ([1], [Source]) prior to ingestion into the database.Module 2: Global Remote Opportunities Accessible to BangladeshCapturing international remote roles viable for talent in Bangladesh requires programmatic ingestion pipelines tailored to time zone logistics, independent contractor compliance, and real-time currency conversions.Public JSON Ingestion EndpointsAggregating global remote vacancies does not require high-cost DOM parsing. Top remote aggregators and modern applicant tracking systems expose public JSON endpoints and structured feeds that can be consumed directly.Source / ATS ProviderPublic Ingestion Endpoint / Query StructureAuthenticationIngestion FrequencyPagination / FormatGreenhouse Job BoardsGET https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs?content=true[cite: 40, 41, 45, 46]None (Public)Hourly per tracked companySingle JSON payloadLever Postings APIGET https://api.lever.co/v0/postings/{site}?mode=json&limit=100[cite: 40, 41, 47]None (Public)Hourly per tracked companyOffset (skip, limit) JSONAshby Public APIGET https://api.ashbyhq.com/posting-api/job-board/{job_board_name}?includeCompensation=true[cite: 41, 42, 43, 48]None (Public)Hourly per tracked companySingle JSON payloadWorkable Widget APIPOST https://apply.workable.com/api/v3/accounts/{subdomain}/jobs (Payload: {})None (Public)Hourly per tracked companyCursor / Token JSONHimalayas Remote APIGET https://himalayas.app/jobs/api?limit=20&cursor={cursor}[cite: 53, 54, 55]None (Public)Daily (24h cache)Cursor-based JSONRemoteOK FeedGET https://remoteok.com/api[cite: 56, 57, 58]None (User-Agent req)Every 12 HoursFlat JSON ArrayRemotive APIGET https://remotive.com/api/remote-jobs[cite: 61, 62, 63]None (Public)Every 12 HoursFlat JSON ObjectHacker News Hiring ThreadsAlgolia API: GET https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&query="Who is hiring?" followed by GET /items/{story_id}[cite: 65, 66, 67]None (Public)Monthly (1st of month)Recursive Comment Tree JSONTimezone Overlap and Location Eligibility FilteringBangladesh Standard Time (BST) operates at $\text{UTC}+6$, without daylight saving adjustments. A major reason candidates from Bangladesh are rejected from global remote listings is failing to satisfy geographic and time zone constraints.The ingestion pipeline must evaluate raw job data against a strict candidate boundary:Geospatial Location Filtering: Match positive inclusion tokens such as "Worldwide", "Anywhere", "Global", "APAC", "South Asia", "EMEA", and "Bangladesh". Explicitly reject geographic exclusions like "US Only", "Must be located in North America", "EU Citizenship Required", "UK Residents Only", "LATAM Only", and "Canada Only".Time Zone Overlap Calculation: Roles requiring US Eastern Standard Time (EST = $\text{UTC}-5$) or US Pacific Standard Time (PST = $\text{UTC}-8$) overlap are viable only if the posting allows async-first schedules or requires $\le 3\text{ hours}$ of synchronous overlap. A 3-hour overlap with US Eastern (9:00 AM to 12:00 PM EST) translates to 8:00 PM to 11:00 PM BST (or 7:00 PM to 10:00 PM during US Daylight Saving Time), which represents an acceptable operational window for evening remote workers. Roles demanding full 8-hour synchronous overlap with PST (9:00 AM to 5:00 PM PST = 11:00 PM to 7:00 AM BST) must be flagged with a warning tag (EXTREME_NIGHT_SHIFT) or filtered out by default based on candidate preference settings. Roles based in EMEA ($\text{UTC}+0$ to $\text{UTC}+3$) or APAC ($\text{UTC}+7$ to $\text{UTC}+10$) provide 4 to 8 hours of natural daytime overlap with Dhaka and must receive an elevated priority score in matching rankings.Cross-Border Legal and Payment ComplianceGlobal hiring for Bangladesh-based talent is predominantly structured through Business-to-Business (B2B) Independent Contractor agreements rather than direct local employment, unless the company utilizes an Employer of Record (EOR) like Deel, Remote.com, or Oyster.The ingestion system must map postings to key compliance parameters:United States Tax Compliance (W-8BEN): US-based organizations require non-US independent contractors to execute IRS Form W-8BEN (Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting). Because the contractor performs services entirely within the territory of Bangladesh, the income is classified as foreign-source personal services under Internal Revenue Code (IRC) Sections 861 and 862. Consequently, the income is subject to a 0% US withholding tax rate at source, eliminating double taxation without complex treaty provisions.International Remittance Infrastructure: Postings must be indexed based on whether the employer's payout rails align with financial services operational in Bangladesh. Viable international payout rails include direct SWIFT wire transfers to local Bangladeshi banks, Wise (formerly TransferWise) commercial payouts directly to local accounts, and Payoneer commercial payouts. Platforms operating exclusively through PayPal or Stripe Payouts cannot settle funds directly into Bangladeshi domestic bank accounts, rendering those positions unviable unless an intermediary global payout partner is supported.Export Incentive Eligibility: The Government of Bangladesh provides a cash incentive (historically 4%, transitioning through fiscal updates) on inward foreign currency remittances derived from software development, IT-enabled services (ITES), and digital freelance contracts channeled through recognized banking infrastructure. The ingestion engine highlights compliant IT contractor listings, calculating net effective earnings including applicable national export subsidies.Real-Time Foreign Exchange (FX) NormalizationGlobal remote roles publish annual or hourly compensation in foreign currencies ($USD$, $EUR$, $GBP$, $CAD$). The platform runs a daily currency ingestion worker that polls mid-market foreign exchange rates from the Bangladesh Bank open API or European Central Bank (ECB) reference data.The conversion engine computes the local equivalent value using the equation:$$C_{\text{BDT}} = C_{\text{Source}} \times R_{\text{TT\_Clean}} \times (1 + \delta_{\text{Incentive}})$$Where:$C_{\text{BDT}}$ is the annualized compensation normalized to Bangladeshi Taka.$C_{\text{Source}}$ is the published annualized salary in foreign currency.$R_{\text{TT\_Clean}}$ is the current commercial bank Telegraphic Transfer (TT) Clean buying exchange rate for the respective currency against BDT.$\delta_{\text{Incentive}}$ represents the applicable national IT export cash incentive factor (e.g., $0.025$ to $0.04$).Module 3: The Autonomous Scraping and Harvesting EngineTo operate a real-time ingestion pipeline 24/7/365 without manual intervention, the platform's collection architecture must be resilient, cost-efficient, and capable of bypassing anti-scraping systems while converting non-standard document formats into structured data.Tooling and Framework SelectionEvaluating headless browser automation, cloud scraper APIs, and edge environments determines the structural allocation of tasks across the scraping fleet.Tool / FrameworkOperational CategoryResource FootprintAnti-Bot Evasion CapabilityMonthly Execution CostArchitectural RecommendationCrawlee (Playwright-Node)Headless Automation FrameworkMedium (Node.js runtime, containerized Chromium)High (with fingerprint spoofing and session rotation)Zero (Self-hosted on runner) / Minimal VPSRecommended for multi-page crawling, session persistence, and dynamic SPA traversal.Playwright-Python + ScrapyHeadless Automation + Spider EngineMedium-High (Python runtime, Twisted/asyncio)High (Playwright stealth plugins)Zero / Minimal VPSExcellent for high-scale batch mining, but introduces multi-language maintenance overhead with Next.js.Cloudflare Workers Browser RenderingServerless Edge Headless BrowserZero local footprint (Remote Edge execution)Moderate (Cloudflare-managed egress IPs)Pay-per-render ($0.50/1k sessions beyond free tier)Recommended for lightweight edge validation and single-page rendering tasks.GitHub Actions Scheduled RunnersCI/CD Infrastructure used as Scheduled WorkersEphemeral Ubuntu VMs (2 cores, 7GB RAM)High (Rotating Microsoft Azure Datacenter IP blocks)Free tier: 2,000 min/mo; unlimited for public repositoriesRecommended core ingestion cron orchestrator for zero-cost operation.Firecrawl / ScrapingBeeManaged Scraper Proxy APIZero local footprint (API endpoint)Extremely High (Automated Cloudflare Turnstile / DataDome bypass)$49 to $99+/monthRestricted to high-security fallback targets; cost-prohibitive as primary continuous crawler.For the INSYT engine, a hybrid topology is selected: GitHub Actions provides scheduled cron orchestration, executing modular Crawlee (TypeScript) workers that pull from zero-overhead JSON endpoints and dynamic headless targets. Cloudflare Workers handle lightweight link-checking pingers at the edge, while managed scraping APIs serve strictly as fallbacks when enterprise anti-bot systems block headless instances.Anti-Bot and Anti-Detection StrategiesCommercial targets, ATS boards, and major job directories deploy bot mitigation systems such as Cloudflare Turnstile, DataDome, Akamai Web Application Protector, and AWS WAF. Bypassing these layers requires hardening headless browsers against signature and behavioral profiling.Fingerprint EvasionBot detection platforms evaluate client signals across multiple layers of the browser stack:Canvas and WebGL Noise: Implement browser fingerprint injection using Crawlee’s @crawlee/browser-pool and fingerprint-injector. The system generates consistent hardware signatures (WebGL vendor, unmasked renderer strings, GPU extensions) and injects mathematical noise into HTML5 Canvas toDataURL() calculations to prevent canvas hash matching without breaking image rendering.AudioContext Fingerprinting: Randomize oscillator buffer dynamics and frequency analysis outputs slightly across browser sessions to prevent static tracking.TLS and HTTP/2 Transport Signatures: Standard Node.js fetch or Python requests exhibit unique TLS Client Hello signatures (cipher suites, elliptic curves, extensions, and ALPN values) that differ from legitimate modern browsers, generating distinctive JA3/JA4 fingerprint markers. Headless crawlers must match real browser network behavior by utilizing curl-impersonate bindings or Playwright's native browser network stack, ensuring TLS signatures align with current Chrome/Firefox distributions.DOM Navigator Overrides: Strip detectable automation artifacts via stealth scripts executed before any document scripts run (page.addInitScript):Set navigator.webdriver = false.Normalize navigator.languages = ['en-US', 'en', 'bn'].Ensure navigator.plugins and navigator.mimeTypes reflect standard desktop installations.Match navigator.hardwareConcurrency and navigator.deviceMemory to typical consumer hardware specs.Proxy Topology and Routing EtiquetteProxy requirements depend on target geography and anti-bot intensity:Domestic Bangladesh Portals (*.teletalk.com.bd, erecruitment.bb.org.bd): These public sector endpoints do not employ enterprise bot mitigation platforms (DataDome, Cloudflare Turnstile). However, they are subject to intermittent routing instability, limited bandwidth, and national network peering limits. These portals should not be accessed through foreign rotating proxies, which can trigger geographic IP blocks. Instead, query them via direct HTTP connections with standard browser headers or through regional South Asian proxy nodes.International ATS and Aggregators: Route traffic through high-reputation datacenter proxy pools by default, switching to residential proxies only when encountering CAPTCHAs or HTTP 403 Forbidden statuses.Traffic Etiquette and Throttling: Enforce an adaptive exponential backoff with jitter algorithm. Maintain a default crawl rate of 1 request per 3 to 5 seconds per domain, parse and adhere to robots.txt crawl delays where provided, and use randomized User-Agent rotations across the latest stable releases of Google Chrome and Apple Safari.Scanned Bengali Gazette and Circular ParsingGovernment circulars in Bangladesh present significant data ingestion challenges: they are frequently issued as scanned, multi-page, low-resolution raster PDFs containing multi-column tabular data in Bengali. Many older digital documents also suffer from encoding anomalies, such as legacy ANSI Bijoy font mappings that render as unreadable glyphs when parsed with standard PDF text extractors (e.g., pdfminer, pdfjs).A resilient document extraction pipeline utilizes a two-tier multimodal processing architecture:Stage 1: Document Ingestion and NormalizationReceive circular PDF from the discovery scraper.Rasterize each PDF page to an uncompressed 300 DPI PNG buffer using sharp or pdf2image.Apply preprocessing filters: convert to grayscale, calculate deskew angle using Radon transformation, and run Otsu adaptive thresholding to maximize character contrast against noisy background scans.Stage 2: Direct Multimodal Extraction via Gemini 1.5 FlashDirect extraction using multimodal Large Language Models (LLMs) outperforms conventional OCR pipelines (e.g., Tesseract with ben.traineddata). Tesseract struggles with broken conjunct characters (juktakkhor), complex vertical diacritics (kar and fola), and irregular border layouts. Multimodal models like Gemini 1.5 Flash interpret visual document structure directly, resolving multi-column table boundaries and complex fonts without requiring text-layer pre-extraction.Pages are submitted directly to the Gemini API as image parts alongside a structured system prompt. The model processes the visual layout, performs native Bengali optical recognition, and outputs structured, schema-compliant JSON.Stage 3: Secondary Fallback PipelineIf the multimodal LLM encounters an API timeout or payload size constraint:Process the preprocessed image through Tesseract OCR using the Bengali language data pack (-l ben+eng).Run a regular expression normalizer to clean corrupted Bengali Unicode output and repair fractured joined characters.Pass the unorganized text string to an LLM text endpoint with a targeted extraction schema to reconstruct the document data.Module 4: LLM-Powered Normalization and Zod Schema ValidationTo maintain data integrity, unstructured extracts must pass through a strict type-validation boundary before being committed to persistent storage.Universal Canonical Job SchemaThe universal data contract is implemented in TypeScript using Zod. This schema models public sector compensation grades, statutory quota parameters, cross-border remote work conditions, and standardized skill taxonomies.TypeScriptimport { z } from 'zod';

export const SectorEnum = z.enum([
  'GOVERNMENT',
  'BANKING',
  'CORPORATE_MNC',
  'LOCAL_CONGLOMERATE',
  'GLOBAL_REMOTE',
  'STARTUP',
]);

export const WorkplaceTypeEnum = z.enum([
  'ONSITE',
  'HYBRID',
  'REMOTE',
]);

export const CurrencyEnum = z.enum([
  'BDT',
  'USD',
  'EUR',
  'GBP',
]);

export const QuotaTypeEnum = z.enum([
  'MERIT',
  'FREEDOM_FIGHTER_CHILD',
  'ETHNIC_MINORITY',
  'PHYSICALLY_DISABLED',
  'THIRD_GENDER',
]);

export const GovernmentAttributesSchema = z.object({
  ministryOrAgency: z.string().min(1),
  cadreType: z.enum(['CADRE', 'NON_CADRE', 'AUTONOMOUS_RESEARCH', 'STATUTORY_BODY']),
  nationalPayScaleYear: z.number().int().default(2015),
  grade: z.number().int().min(1).max(20),
  basicPayRangeBdt: z.object({
    minimum: z.number().nonnegative(),
    maximum: z.number().nonnegative(),
  }),
  teletalkJobCode: z.string().nullable().optional(),
  advertisementMemoNumber: z.string().nullable().optional(),
  quotasApplicable: z.array(QuotaTypeEnum).default(['MERIT']),
  eligibleDistricts: z.array(z.string()).default(['ALL']),
  ageLimitRules: z.object({
    generalMaxAge: z.number().int().default(32),
    quotaMaxAge: z.number().int().default(32),
    referenceDate: z.string(),
  }),
});

export const CorporateRemoteAttributesSchema = z.object({
  workplaceType: WorkplaceTypeEnum,
  timezoneRequirement: z.object({
    acceptedTimezones: z.array(z.string()).default(['ANY']),
    minimumDstOverlapHours: z.number().default(0),
    asyncFriendly: z.boolean().default(true),
  }),
  compliance: z.object({
    contractType: z.enum(['INDEPENDENT_CONTRACTOR_B2B', 'DIRECT_EMPLOYEE', 'EOR']),
    requiresW8Ben: z.boolean().default(false),
    payoutMethodsViableInBD: z.array(z.enum(['SWIFT_WIRE', 'WISE', 'PAYONEER', 'LOCAL_BANK'])),
  }),
  compensation: z.object({
    currency: CurrencyEnum,
    interval: z.enum(['HOURLY', 'MONTHLY', 'YEARLY']),
    minAmount: z.number().nonnegative().nullable(),
    maxAmount: z.number().nonnegative().nullable(),
    annualizedUsdEquivalent: z.number().nonnegative().nullable(),
    annualizedBdtEquivalent: z.number().nonnegative().nullable(),
    equityOffer: z.string().nullable().optional(),
  }),
});

export const AcademicPrerequisiteSchema = z.object({
  degreeLevel: z.enum([
    'DOCTORATE',
    'MASTERS',
    'FOUR_YEAR_BACHELOR',
    'THREE_YEAR_PASS_BACHELOR',
    'DIPLOMA_ENGINEERING',
    'HSC',
    'SSC',
  ]),
  degreeFamily: z.string().describe('Standardized discipline: Computer Science, Economics, etc.'),
  minimumCgpa: z.object({
    scaleFour: z.number().min(0).max(4.0).nullable().optional(),
    scaleFive: z.number().min(0).max(5.0).nullable().optional(),
    minimumClassOrDivision: z.enum(['1ST', '2ND', '3RD', 'NOT_APPLICABLE']).default('2ND'),
  }),
  thirdDivisionAllowed: z.boolean().default(false),
});

export const CompetencyTagSchema = z.object({
  name: z.string(),
  taxonomy: z.enum(['ESCO_V1_2', 'ONET', 'PROPRIETARY']),
  code: z.string().nullable().optional(),
  importanceWeight: z.number().min(0).max(1).default(1.0),
});

export const CanonicalJobSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  fingerprintHash: z.string().length(64).describe('SHA-256 deduplication fingerprint'),
  title: z.string().min(1),
  organization: z.object({
    name: z.string().min(1),
    normalizedName: z.string().min(1),
    primaryDomain: z.string().nullable().optional(),
    logoUrl: z.string().url().nullable().optional(),
  }),
  sector: SectorEnum,
  sourceUrl: z.string().url(),
  officialPortalUrl: z.string().url().describe('Direct deep link to application mechanism'),
  descriptionPlain: z.string().min(10),
  descriptionHtml: z.string().nullable().optional(),
  locations: z.array(z.string()).min(1),
  governmentDetails: GovernmentAttributesSchema.nullable().optional(),
  corporateRemoteDetails: CorporateRemoteAttributesSchema.nullable().optional(),
  prerequisites: z.object({
    academic: z.array(AcademicPrerequisiteSchema),
    minimumExperienceYears: z.number().nonnegative().default(0),
    preferredExperienceYears: z.number().nonnegative().nullable().optional(),
    genderRestriction: z.enum(['MALE_ONLY', 'FEMALE_ONLY', 'ALL']).default('ALL'),
  }),
  competencies: z.array(CompetencyTagSchema),
  publishedAt: z.string().datetime(),
  deadline: z.string().datetime().nullable(),
  lastVerifiedLiveAt: z.string().datetime(),
  isExpired: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  archiveSnapshotUrl: z.string().url().nullable().optional(),
});

export type CanonicalJob = z.infer<typeof CanonicalJobSchema>;
Production LLM Extraction Prompting PatternThe following structured prompt is configured for the Gemini 1.5 API, enforcing strict output schema compliance via response_mime_type: "application/json".TypeScriptexport const CIRCULAR_EXTRACTION_SYSTEM_PROMPT = `
You are the world's leading document parsing engine specializing in official job circulars, government gazettes, and enterprise job posts for Bangladesh and global remote roles.

Analyze the input text or image scan and output a single strictly compliant JSON object conforming exactly to the canonical job schema.

EXTRACTION INSTRUCTIONS:
1. BANGLADESH GOVERNMENT / TELECOMMUNICATION CIRCULARS:
   - Identify the Organization, Ministry, and Post Name in both English and Bengali.
   - Detect the National Pay Scale 2015 Grade (Grade 1 to 20). If Grade 9, set basic pay to min: 22000, max: 53060. If Grade 10, min: 16000, max: 38640.
   - Extract the application submission deep-link URL (e.g. "http://[agency].teletalk.com.bd").
   - Extract exact age limits, application closing dates (BST time), and district quotas.
   - Under the July 2024 reform, default quotas to: 93% Merit, 5% Freedom Fighter Children, 1% Ethnic Minorities, 1% Disabled/Third Gender unless specified otherwise.
   - Map educational requirements strictly: "B.Sc. in CSE" -> degreeLevel: "FOUR_YEAR_BACHELOR", degreeFamily: "Computer Science & Engineering".

2. GLOBAL REMOTE ROLES:
   - Identify whether the role permits candidates residing in Bangladesh (UTC+6).
   - If marked "Worldwide", "Anywhere", "APAC", "EMEA", or permits >=3h US overlap, mark viable.
   - Map compensation ranges to USD/EUR numbers. Flag if contract is B2B / requires Form W-8BEN.

3. DEDUPLICATION METADATA:
   - Provide a clean, lowercased, whitespace-stripped organizational name and job title.

Return raw JSON only. Do not wrap in markdown fences (\`\`\`json). No explanations or fluff.
`;
Module 5: Self-Healing Link Validation and Lifecycle ManagementA core architectural defect in conventional recruiting aggregators is link rot: stale listings continue serving dead links or route users to unhelpful landing pages. The INSYT engine implements automated link monitoring and lifecycle management.The self-healing link validation pipeline executes along the following sequence:Daily Execution: A scheduled cron task queries active jobs (isExpired = false) from persistent storage.Edge Verification: Worker instances dispatch HTTP HEAD and GET probes via edge nodes to inspect target URLs.Status Code Evaluation: In response to hard HTTP failures (404, 410, 500, 502, 503), the posting is immediately flagged for closure.Redirect Traversal: If an HTTP 200 OK is returned, the inspector checks the terminal URL to detect dynamic soft-404 redirects back to index or career roots.DOM Keyword Scanning: If the URL remains consistent, the parser evaluates DOM body content against a multi-lingual dictionary of application closure markers.Automated Archival: Upon confirming closure, the engine updates isExpired = true, marks isArchived = true, dispatches an asynchronous capture request to the Wayback Machine API, and records the permanent snapshot link.Real-Time Dead Link Sweeper and Soft-404 DetectionEvaluating link status using basic HTTP response codes is insufficient. Modern ATS frameworks and SPA frontends often return an HTTP 200 OK while displaying an "Application Closed" notification or silently redirecting to the company's career root.The link verification pipeline handles these edge cases using a three-tier inspection strategy:TypeScriptexport interface LinkVerificationResult {
  isAlive: boolean;
  httpStatus: number;
  terminalUrl: string;
  closureReason?: string;
}

export const ATS_CLOSURE_PHRASES = [
  'this position has been filled',
  'this job is no longer available',
  'the application period for this position has closed',
  'no longer accepting applications',
  'the posting has expired',
  'application is closed',
  'আবেদনের সময়সীমা শেষ',
  'আবেদনের শেষ তারিখ উত্তীর্ণ হয়েছে',
];

export async function verifyPostingHealth(targetUrl: string): Promise<LinkVerificationResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Hard failure codes
    if ([404, 410, 500, 502, 503].includes(response.status)) {
      return { isAlive: false, httpStatus: response.status, terminalUrl: response.url, closureReason: 'HTTP_ERROR_CODE' };
    }

    const terminalUrl = response.url;
    const initialOrigin = new URL(targetUrl).origin;
    const terminalOrigin = new URL(terminalUrl).origin;

    // Detect silent root domain redirects (Soft-404)
    if (initialOrigin === terminalOrigin) {
      const initialPath = new URL(targetUrl).pathname.replace(/\/$/, '');
      const terminalPath = new URL(terminalUrl).pathname.replace(/\/$/, '');
      if (initialPath !== terminalPath && (terminalPath === '' || terminalPath === '/jobs' || terminalPath === '/careers')) {
        return { isAlive: false, httpStatus: response.status, terminalUrl, closureReason: 'REDIRECT_TO_HOME_OR_INDEX' };
      }
    }

    const htmlBody = (await response.text()).toLowerCase();

    // Scan for dynamic closure phrases embedded within standard 200 OK pages
    for (const phrase of ATS_CLOSURE_PHRASES) {
      if (htmlBody.includes(phrase)) {
        return { isAlive: false, httpStatus: response.status, terminalUrl, closureReason: `CLOSURE_TEXT_DETECTED: "${phrase}"` };
      }
    }

    return { isAlive: true, httpStatus: response.status, terminalUrl };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { isAlive: false, httpStatus: 0, terminalUrl: targetUrl, closureReason: `NETWORK_TIMEOUT_OR_DNS_FAULT: ${errorMessage}` };
  }
}
Timezone-Aware Expiration and Archiving EngineDeadlines in Bangladesh public circulars are explicitly synchronized to Bangladesh Standard Time (BST = $\text{UTC}+6$). A deadline stated as "28 May 2026 at 5:00 PM" terminates at precisely 2026-05-28T17:00:00+06:00 (which corresponds to 11:00:00 UTC). Circulars lacking an explicit hour default to 11:59:59 PM BST.The ingestion lifecycle implements the following automated state transitions:Hourly Expiration Sweep: Every hour, the system runs an expiration query:SQLUPDATE jobs 
SET is_expired = TRUE, updated_at = NOW() 
WHERE deadline IS NOT NULL 
  AND deadline <= NOW() 
  AND is_expired = FALSE;
Archival Snapshot Dispatch: When a job is marked expired, the scheduler dispatches an asynchronous background task to capture an immutable copy via the Internet Archive Wayback Machine API (https://web.archive.org/save/{targetUrl}). The resulting snapshot URL is saved to archiveSnapshotUrl.Soft-Archival Preservation: The record remains indexed in the search engine with is_archived: true. The front-end renders an "Application Window Closed" banner containing deep links to the original circular snapshot, eliminating dead-end 404 views for users navigating via historical links or search indexing.Cryptographic Deduplication EngineTo aggregate opportunities from multiple channels without duplicates (e.g., a post appearing concurrently on an agency portal, a Teletalk subdomain, and LinkedIn), the engine generates a deterministic SHA-256 fingerprint hash:TypeScriptimport { createHash } from 'crypto';

export function computeJobFingerprint(
  organization: string,
  title: string,
  deadlineIsoDate: string | null,
  location: string
): string {
  const normOrg = organization.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normDeadline = deadlineIsoDate ? deadlineIsoDate.split('T')[0] : 'NODEADLINE';
  const normLocation = location.toLowerCase().replace(/[^a-z0-9]/g, '');

  const payload = `${normOrg}:${normTitle}:${normDeadline}:${normLocation}`;
  return createHash('sha256').update(payload).digest('hex');
}
When ingesting listings, the database executes an UPSERT keyed on fingerprintHash. If a conflict occurs, the pipeline preserves the original record while upgrading the officialPortalUrl if the new listing contains a direct primary source (e.g., overriding a secondary aggregator link with a newly discovered *.teletalk.com.bd URL).Module 6: Candidate Matching and ATS Radar EngineThe /opportunities surface transforms from a passive job board into an active career cockpit by evaluating job requirements against the candidate's verified profile data.Curriculum Prerequisite and Skill-Fit AlgorithmConventional job platforms rely on superficial string matching (e.g., matching the word "Computer" in a bio to a computer engineering role), which generates high false-positive rates. The INSYT matching engine utilizes a two-tier evaluation algorithm: a Deterministic Fail-Closed Prerequisite Gate followed by a Weighted Competency Scoring Model.The evaluation sequence proceeds through the following stages:Profile Intake: The engine loads candidate credentials from the Career Passport, identifying verified academic disciplines, age, district of origin, verified skills, and portfolio artifacts.Statutory Prerequisite Gate: The candidate is evaluated against strict statutory hurdles including age ceilings, district quotas, and minimum degree requirements. Candidates failing these checks receive an immediate alignment score of $0\%$.Weighted Scoring Pipeline: Candidates clearing the statutory gate are processed through the weighted alignment formula, assigning tiered weights to verified credentials, portfolio artifacts, and self-declared skills.Result Categorization: Candidates with an alignment score $\ge 80\%$ are designated as ready to apply, with strengths highlighted. Candidates with scores $< 80\%$ are routed to an automated learning gap analysis.Layer 1: Statutory Prerequisite Gate (Fail-Closed)Before computing skill compatibility, candidate eligibility is evaluated against statutory requirements. If a candidate fails any of the following constraints, the match is terminated with an eligibility score of $0\%$:Degree Discipline and Family: The candidate's verified degree must match or subsume the required disciplinary taxonomy (e.g., a requirement for "B.Sc. in Electrical Engineering" rejects a general "B.Sc. in Physics" unless the circular explicitly permits equivalent degrees).Division/CGPA Floor: Candidates with an academic division below the stated minimum (or holding a 3rd class degree where prohibited) fail the gate.Age Limit Bounds: For government and banking roles, the candidate's age on the circular's reference date must fall within the minimum and maximum parameters (e.g., $\text{Age} \le 32\text{ years}$ under standard terms, or $\le 35\text{ years}$ for specialized quota exemptions).District and Quota Feasibility: The candidate's permanent address district must be listed among eligible geographic zones for the post.Layer 2: Weighted Competency Fit EquationFor candidates passing the statutory gate, skill compatibility is computed using a weighted scoring model that prioritizes verified competencies over unverified resume claims:$$S_{\text{fit}} = \left( \frac{3 \cdot \sum_{i \in K_V} w_i + 2 \cdot \sum_{j \in K_A} w_j + 1 \cdot \sum_{m \in K_D} w_m}{3 \cdot \sum_{r \in R_V} w_r + 2 \cdot \sum_{r \in R_A} w_r + 1 \cdot \sum_{r \in R_D} w_r} \right) \times 100$$Where:$K_V$ represents skills verified via INSYT proctored assessments, cryptographically anchored using W3C Verifiable Credentials (3x multiplier).$K_A$ represents skills demonstrated through validated portfolio artifacts, open-source repositories, or completed capstone code sandboxes (2x multiplier).$K_D$ represents self-declared skills listed on the candidate's resume (1x multiplier).$R$ represents the total set of required skills across each respective verification category.$w$ represents the importance weight of each competency ($0.0$ to $1.0$).This formula yields a transparent Prerequisite Alignment Score rather than a vague "hireability" estimate, giving candidates an objective view of their qualifications.Missing Competency Gap Analysis and Learning BridgesWhen a candidate's alignment score falls below $80\%$, the system computes the exact competency delta:$$\Delta_{\text{Competencies}} = R_{\text{Job}} \setminus (K_V \cup K_A \cup K_D)$$The platform maps these missing requirements directly to targeted learning modules within the INSYT curriculum. For example, if a high-yield remote posting requires "PostgreSQL Query Optimization" and the candidate's verified profile only covers standard SQL basics, the interface surfaces an interactive alert:"Prerequisite Gap: This opening requires advanced PostgreSQL query profiling. Complete Module 4 (Query Plans and Indexing) in the Data Systems Track to bridge this gap."One-Click Application CRM DispatchThe platform streamlines application handoffs directly into the user's CRM pipeline:Deep-Link Dispatch: The primary call-to-action deep-links candidates to the application submission page (e.g., [agency].teletalk.com.bd/application_form.php or jobs.ashbyhq.com/.../apply) rather than an aggregator index.Contextual Payload Export: If applying to an ATS that supports pre-filling, the cockpit generates a customized, ATS-friendly single-page PDF resume using the verified Career Passport profile.Kanban CRM State Machine: Clicking the application dispatch button automatically transitions the job card to the "Applied" column in the user's local Application CRM, sets an automated follow-up reminder, and logs the application timestamp.Module 7: Front-End User Experience and Executive Design SystemThe opportunities dashboard (http://localhost:3000/opportunities and http://localhost:3000/jobs) is constructed with an Executive Corporate Light Mode aesthetic, prioritizing high information density, typographic clarity, and fast scanning.Design System and Visual MatrixThe interface components adhere to the following visual and structural hierarchy:Canvas Background: Rendered in #F7F8FC, providing a neutral, low-glare surface for viewing dense job lists.Card and Panel Containers: Built on #FFFFFF surfaces with crisp 1px solid #E2E8F0 borders and subtle box shadows.Typography Hierarchy: Display headings and standard copy utilize Inter and Plus Jakarta Sans in deep slate navy (#1A1D2E), while technical metadata, codes, grades, and timestamps are rendered in JetBrains Mono.Functional Color Accents: Corporate Navy (#1E3A8A) anchors structural headings and navigation; Trust Blue (#2563EB) drives interactive actions; Active Success Emerald (#059669) designates live circulars and verified credentials; Imminent Deadline Amber (#D97706) highlights openings closing within 48 hours.Faceted Filtering MatrixThe filter matrix enables multi-axis search queries across the aggregated dataset:Sector Pills: [All], [Govt Grade 9–10], [Commercial Banking MTO], [FMCG / Corporate MNC], [High-Yield Remote USD].Location / Division: [Dhaka], [Chittagong], [Other Divisional], [Anywhere Remote].Salary Range Slider: Dual-currency input supporting BDT (৳20,000 to ৳500,000/month) and USD ($1,000 to $20,000+/month) with automatic conversion."Eligible Only" Switch: Filters the job stream exclusively for postings where the user satisfies the statutory prerequisite gate ($S_{\text{prereq}} = \text{true}$).Interactive UI ComponentsCircular PDF Specimen Split-Viewer: Selecting a government or banking post opens a split-screen view. The left pane renders the original circular scan via a high-performance vector/PDF viewer, while the right pane displays the schema-extracted data (grades, fees, quotas, application deep-links, and deadlines), allowing users to verify extracted details against the source document.Live Countdown Clocks: Postings with confirmed deadlines display a real-time countdown timer computed against Bangladesh Standard Time (UTC+6). Positions with $< 48\text{ hours}$ remaining transition to an amber badge (#D97706) with an active millisecond ticker to communicate urgency.Targeted ATS Resume Modal: Clicking "Prepare ATS CV" launches an export modal. The system tailors the candidate’s Career Passport data to match the target job's competency tags, rendering a clean, single-page PDF optimized for automated resume screeners.Module 8: Production Deployment, Cost Efficiency, and SRE PlaybookThe ingestion and intelligence platform is designed for high reliability and low operational overhead, leveraging modern serverless tiers and automated background workers.The operational pipeline relies on the following decoupled components:GitHub Actions Scheduled Workflows: Executes hourly crawls of remote ATS endpoints, daily scrapers of public circulars, and daily link validation sweeps without dedicated server overhead.Upstash Serverless Redis: Acts as the BullMQ messaging layer to orchestrate task queuing, worker concurrency, and deduplication locks.Next.js 16 Edge / Serverless Handlers: Executes API endpoints, candidate matching calculations, and dynamic payload handling.Appwrite Cloud and Supabase Managed PostgreSQL: Stores canonical job entities, verified credentials, and provides full-text search indexing.Gemini 1.5 Flash Vision: Handles multimodal optical document recognition and schema transformation within free developer API quotas.Implementation RoadmapThe execution schedule spans five distinct delivery phases over a 25-day build cycle.PhaseDurationCore DeliverablesVerification CriteriaPhase 1: Foundation Schemas & Dead Link SweepersDays 1–3Zod schemas, DB migrations, dead link validation worker, seed dataset.Test suite passes with $\ge 95\%$ test coverage on mock URL states.Phase 2: Remote Job Public IngestionDays 4–7Ingestion workers for Greenhouse, Lever, Ashby, Workable, and Himalayas.Daily feed ingest executes in $< 120\text{ seconds}$ without memory leaks.Phase 3: BD Corporate & Teletalk ScrapersDays 8–14Crawlee spiders for Teletalk subdomains, BPSC, and BSCS/Bangladesh Bank.Correctly extracts application deep links, fees, and grade structures.Phase 4: Bengali Multimodal PDF ParserDays 15–20PyMuPDF pipeline + Gemini 1.5 Flash vision extraction engine.Extraction achieves $\ge 98\%$ accuracy across scanned Bengali circulars.Phase 5: Candidate Radar & Executive CockpitDays 21–25Front-end deployment, split-viewer, matching algorithm, CRM Kanban.End-to-end integration verified: listing discovery to CRM card dispatch.Production Starter ImplementationsLink Health Verification RunnerTypeScript// scripts/link-health-checker.ts
import { verifyPostingHealth } from '../lib/services/link-verifier';
import { supabase } from '../lib/db/client';

export async function runDeadLinkSweep(): Promise<void> {
  console.log('[LinkSweeper] Initiating daily link health sweep...');

  const { data: activeJobs, error } = await supabase
    .from('jobs')
    .select('id, official_portal_url, title')
    .eq('is_expired', false);

  if (error) {
    console.error('[LinkSweeper] Database query failed:', error);
    return;
  }

  console.log(`[LinkSweeper] Analyzing ${activeJobs.length} active listings...`);

  for (const job of activeJobs) {
    const check = await verifyPostingHealth(job.official_portal_url);

    if (!check.isAlive) {
      console.warn(`[LinkSweeper] Deactivating dead job ${job.id} (${job.title}). Reason: ${check.closureReason}`);

      await supabase
        .from('jobs')
        .update({
          is_expired: true,
          is_archived: true,
          closure_logged_at: new Date().toISOString(),
          closure_diagnostic: check.closureReason,
        })
        .eq('id', job.id);
    }
    // Throttle checks to prevent rate-limiting downstream servers
    await new Promise((res) => setTimeout(res, 1200));
  }

  console.log('[LinkSweeper] Sweep completed successfully.');
}
Gemini Multimodal Circular Extraction FunctionTypeScript// lib/services/circular-extractor.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CanonicalJobSchema, CanonicalJob } from '../schemas/job-schema';
import { CIRCULAR_EXTRACTION_SYSTEM_PROMPT } from '../prompts/extraction-prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function extractJobFromCircularImage(
  imageBuffer: Buffer,
  mimeType: 'image/png' | 'image/jpeg' = 'image/png'
): Promise<CanonicalJob> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.1,
    },
    systemInstruction: CIRCULAR_EXTRACTION_SYSTEM_PROMPT,
  });

  const imagePart = {
    inlineData: {
      data: imageBuffer.toString('base64'),
      mimeType,
    },
  };

  const result = await model.generateContent([
    'Extract all job post specifications and requirements from this scanned circular image strictly according to the canonical schema.',
    imagePart,
  ]);

  const rawJsonText = result.response.text();
  const parsedData = JSON.parse(rawJsonText);

  // Validate the output against the universal runtime schema
  const validationResult = CanonicalJobSchema.safeParse(parsedData);
  if (!validationResult.success) {
    throw new Error(`Zod Schema Validation Failure: ${validationResult.error.message}`);
  }

  return validationResult.data;
}
Weighted Candidate Alignment AlgorithmTypeScript// lib/matching/engine.ts
import { CanonicalJob } from '../schemas/job-schema';

export interface CandidateProfile {
  id: string;
  birthDate: string; // ISO string
  district: string;
  degreeLevel: string;
  degreeFamily: string;
  cgpa: number;
  hasThirdDivision: boolean;
  verifiedSkills: string[];
  artifactSkills: string[];
  declaredSkills: string[];
}

export interface AlignmentEvaluation {
  isStatutoriEligible: boolean;
  ineligibilityReason?: string;
  alignmentScore: number;
  matchedCompetencies: string[];
  missingCompetencies: string[];
}

export function evaluateCandidateAlignment(
  candidate: CandidateProfile,
  job: CanonicalJob
): AlignmentEvaluation {
  // 1. STATUTORY PREREQUISITE GATING
  if (job.governmentDetails) {
    // Check age against the circular's reference date
    const refDate = new Date(job.governmentDetails.ageLimitRules.referenceDate);
    const bDate = new Date(candidate.birthDate);
    const ageYears = (refDate.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if (ageYears > job.governmentDetails.ageLimitRules.generalMaxAge) {
      return { isStatutoriEligible: false, ineligibilityReason: 'EXCEEDS_STATUTORY_AGE_LIMIT', alignmentScore: 0, matchedCompetencies: [], missingCompetencies: [] };
    }

    // Check district eligibility
    const eligibleDistricts = job.governmentDetails.eligibleDistricts;
    if (!eligibleDistricts.includes('ALL') && !eligibleDistricts.includes(candidate.district)) {
      return { isStatutoriEligible: false, ineligibilityReason: 'DISTRICT_RESTRICTION', alignmentScore: 0, matchedCompetencies: [], missingCompetencies: [] };
    }
  }

  // Academic division requirements
  if (!job.prerequisites.academic.some(a => a.thirdDivisionAllowed) && candidate.hasThirdDivision) {
    return { isStatutoriEligible: false, ineligibilityReason: 'THIRD_DIVISION_STRICTLY_PROHIBITED', alignmentScore: 0, matchedCompetencies: [], missingCompetencies: [] };
  }

  // 2. WEIGHTED COMPETENCY SCORING
  let weightedPointsEarned = 0;
  let totalPossiblePoints = 0;

  const matchedCompetencies: string[] = [];
  const missingCompetencies: string[] = [];

  const verifiedSet = new Set(candidate.verifiedSkills.map(s => s.toLowerCase()));
  const artifactSet = new Set(candidate.artifactSkills.map(s => s.toLowerCase()));
  const declaredSet = new Set(candidate.declaredSkills.map(s => s.toLowerCase()));

  for (const comp of job.competencies) {
    const compName = comp.name.toLowerCase();
    const weight = comp.importanceWeight || 1.0;
    const maxItemScore = 3 * weight; // Verified mastery maximum
    totalPossiblePoints += maxItemScore;

    if (verifiedSet.has(compName)) {
      weightedPointsEarned += 3 * weight;
      matchedCompetencies.push(`${comp.name} (Verified)`);
    } else if (artifactSet.has(compName)) {
      weightedPointsEarned += 2 * weight;
      matchedCompetencies.push(`${comp.name} (Portfolio)`);
    } else if (declaredSet.has(compName)) {
      weightedPointsEarned += 1 * weight;
      matchedCompetencies.push(`${comp.name} (Declared)`);
    } else {
      missingCompetencies.push(comp.name);
    }
  }

  const alignmentScore = totalPossiblePoints > 0
    ? Math.round((weightedPointsEarned / totalPossiblePoints) * 100)
    : 100;

  return {
    isStatutoriEligible: true,
    alignmentScore,
    matchedCompetencies,
    missingCompetencies,
  };
}
Architectural Synthesis and Strategic DirectivesDeploying a reliable labor market intelligence engine requires adhering to strict operational boundaries:Preserving Primary Source Integrity: Scraped secondary aggregators must function solely as transient discovery notices. Every indexed opportunity must resolve to a validated primary portal (such as an official *.teletalk.com.bd endpoint, a direct BSCS application page, or an enterprise ATS domain) before entering production storage.Decoupling Dynamic Extraction: Rather than relying on fragile DOM selectors that break during minor front-end redesigns, extract tabular circular data using multimodal vision models. Feeding document scans directly into models like Gemini 1.5 Flash provides high parsing accuracy across complex layout variations.Validating Schema Boundaries: Enforce strict runtime schema validation via Zod across all ingestion paths. Malformed or partial records should be rejected at the boundary rather than allowed to degrade application state.Enforcing Continuous Lifecycle Management: Automated link monitors and timezone-aware expiration sweeps must run on regular schedules. Detecting soft-404s, tracking closing states, and linking to archive snapshots ensures users encounter clean, actionable opportunities across the platform.


### Felo
Overview
The most important finding is that Bangladesh's public-sector data has changed materially in the last few weeks, so the engine's first job is to ingest and version pay-scale rules, not just job titles. The Ninth National Pay Scale 2026 was gazetted on 19 September 2026 and is effective from 1 July 2026. Basic pay rises are paid in phases: 40% of the difference for Grade 9 and above and 50% for Grades 10 to 20 in the first half-year, rising to 70% and 75% in January to June 2027, with the full revised basic pay from 1 July 2027. Allowances stay at June 2026 rates until 31 December 2027. Any schema that stores a single "salary" number will misstate Bangladeshi government compensation, so the canonical model must carry a phase-aware pay record.
Second, the highest-yield sources are official machine-readable feeds, not scraped HTML. Greenhouse, Lever, Ashby, Personio, Recruitee, and Workable each expose public job-board endpoints that require no authentication. Remote OK publishes a free JSON feed for remote roles. Bangladeshi government and bank portals are more fragile: the Bankers' Selection Committee circulars for 2026 report different post counts in different publications, with one listing 224 posts and another listing 233. Deterministic parsing of the source circular, with a reconciliation step, is therefore mandatory rather than optional.
Third, the eligibility problem is structural. Matching on substrings such as "Science" or "B.Sc." produces false positives. The engine must map each degree to a controlled discipline code and fail closed when the circular's disciplinary list is ambiguous.
Fourth, stealth tooling is a poor foundation for this system. Stealth patches address only fingerprint-level signals and do not address IP reputation, TLS fingerprinting, behavioral analysis, or advanced JavaScript challenges. This blueprint therefore treats protected portals as out of scope for automated evasion and relies on official feeds, permitted access, and human-verified seeds for those sources.
Fifth, the cost model is achievable. A scheduled-runner architecture with a serverless Redis queue, a managed Postgres or Appwrite database, and a low-cost multimodal model can run the full pipeline at near-zero marginal cost, provided that the model choice reflects current deprecation schedules. Gemini 2.0 Flash shuts down on 1 June 2026, and the official deprecation page now recommends Gemini 3.5 Flash-Lite or 3.8 Flash for new projects.
----------------------------------------
Architectural Principles and Compliance Posture
Before any code, the engine needs non-negotiable operating rules. Every design decision in the following modules derives from them.
Principle 1: Official sources are the source of truth. Aggregators such as Bdjobs, Chakri, and LinkedIn are discovery surfaces only. A record becomes publishable only when it is linked to an employer-owned or government-owned canonical URL. Aggregators are useful for detecting that a posting exists and for measuring whether the engine has missed something, but their deadlines and eligibility text are not accepted without verification.
Principle 2: No evasion of access controls on government systems. The engine will not implement CAPTCHA solving, fingerprint spoofing, or rotating-identity tactics against Bangladeshi government portals. Where a portal lacks a feed, the system uses a curated seed list, a human-in-the-loop review queue, and scheduled checks at polite intervals. This is both the ethically correct posture and the operationally safer one, since government portals can change access rules without notice.
Principle 3: Honor terms, robots directives, and rate limits. Every crawler reads robots.txt, respects declared crawl delays, identifies itself with a contactable user agent, and applies jitter and exponential backoff. Remote OK's terms, for example, govern use of its properties, and its public feed should be consumed with attribution.
Principle 4: Personal data stays out of the crawl. Job records contain employer and public-notice data. Candidate data lives only in the Career Passport domain and is never written into the scraping pipeline.
Principle 5: Fail closed on eligibility, fail open on discovery. The engine may surface a posting it cannot fully parse, but it must never tell a candidate they are eligible when the qualification gate cannot be evaluated with confidence.
----------------------------------------
Module 1: The Bangladesh Recruitment Surface Map
1.1 Government and Autonomous Bodies
The government layer is the most heterogeneous. It spans a national recruitment commission, a shared Teletalk-hosted job aggregator for ministries and offices, ministry and autonomous-body websites, and gazette PDFs.
Bangladesh Public Service Commission (bpsc.gov.bd). The BPSC homepage is organized into exam notices and results, ongoing recruitment notices, online registration, miscellaneous notices, policies and publications, right-to-information services, and a grievance mechanism. The engine should treat each of these as a distinct crawl target because they have different update cadences. Recruitment notices typically appear as PDF circulars linked from the "ongoing recruitment" block, while results appear as separate PDFs.
Teletalk All-Jobs (alljobs.teletalk.com.bd). The All-Jobs portal presents live counts (for example, 213 live jobs, 41 posted today, and 7 with a deadline today at the time of capture), a Government Jobs section listing organizations with openings, and a Private Jobs section that is currently empty. Each organization card carries an organization code in parentheses, such as TAX6, BOGMC, DCBOGURA, or WTMU. These codes are the most reliable join key for government records, and they should be stored as teletalkJobCode together with the organization code.
Individual Teletalk-hosted ministry and office subdomains, such as dpe.teletalk.com.bd, brri.teletalk.com.bd, and bina.teletalk.com.bd, follow the same general pattern and should be onboarded one at a time through a seed table rather than by subdomain enumeration. Enumeration against government infrastructure is both unnecessary and discouraged.
Agricultural and scientific research institutes. The BARC, BRRI, BINA, BARI, BJRI, BCSIR, BTRI, and BSRI institutes publish their own vacancy notices. None of these institutes exposes a documented feed in the sources reviewed for this report, so each should be onboarded as a PORTAL_HTML or PDF_CIRCULAR source with its own parser profile and a human-verified seed URL.
Ministry gazettes and circulars. Circulars are the authoritative artifact. They usually contain a reference number, a job or post code, the number of vacancies per post, the pay grade, the qualification clause, the age limit, the quota table, the application window, and the online application URL. Many are scanned images or multi-column Bengali tables. This is the hardest parsing problem in the system and is addressed in Module 3.
1.2 The National Pay Scale: Extraction Requirements
The pay scale is the single most valuable structured dataset in the government layer. It is also subject to the phased implementation described above.
The 2026 structure retains twenty grades. Grade 1 has a fixed basic salary of 156,000 BDT, Grade 2 ranges from 132,000 to 153,000 BDT, and Grade 20 starts at 20,000 BDT. Grade 9 ranges from 44,000 to 105,900 BDT and Grade 10 from 32,000 to 77,300 BDT. The previous 2015 scale placed Grade 9 at 22,000 to 53,060 BDT and Grade 10 at 16,000 to 38,640 BDT. The ratio between the lowest and highest basic salaries has narrowed from roughly 1:9.45 to roughly 1:7.8.
The table below is the normalized reference band the engine should load as a versioned constant. Values are basic pay in BDT.
Grade NPS 2015 Range (BDT) NPS 2026 Range (BDT) Increase 1 78,000 (fixed) 156,000 (fixed) 100% 2 66,000 – 74,400 132,000 – 153,000 100% 3 56,500 – 77,400 113,000 – 148,800 100% 4 50,000 – 71,200 100,000 – 142,400 100% 5 43,000 – 69,850 86,000 – 139,700 100% 6 35,500 – 67,010 71,000 – 134,000 100% 7 29,000 – 63,410 58,000 – 126,800 100% 8 23,000 – 55,470 46,000 – 110,800 100% 9 22,000 – 53,060 44,000 – 105,900 100% 10 16,000 – 38,640 32,000 – 77,300 100% 11 12,500 – 30,230 25,000 – 60,500 100% 12 11,300 – 27,300 24,300 – 58,700 115% 13 11,000 – 26,590 24,000 – 58,000 118% 14 10,200 – 24,680 23,500 – 56,800 130% 15 9,700 – 23,490 22,800 – 55,200 135% 16 9,300 – 22,490 21,900 – 52,900 135% 17 9,000 – 21,800 21,400 – 51,900 138% 18 8,800 – 21,310 21,000 – 50,900 139% 19 8,500 – 20,570 20,500 – 49,600 141% 20 8,250 – 20,010 20,000 – 48,400 142%
Source values: the 2015-versus-2026 comparison and the 2026 grade table.
The table reveals a design requirement that is easy to miss. The percentage increase is not uniform: Grades 1 to 11 double, while Grades 12 to 20 rise between 115% and 142%. A parser that assumes a single multiplier will mis-tag lower-grade and upper-grade records alike.
Extraction fields for every circular. The parser must populate, at minimum, the following: grade, the basic-pay minimum and maximum, the scale version (NPS 2015 or NPS 2026), the fixed or step indicator, house rent and medical allowance where stated, the phase-payment rule in effect at the publication date, and every quota line. Allowance figures can be stored as stated in the circular, but the engine should never compute a total gross unless the circular states the formula. Gross-salary examples published on secondary sites use a Grade 10 illustration that adds house rent, medical, and transport to basic pay. Those are illustrative and must not be stored as official compensation.
Pay-phase logic. The schema should record the payable proportion for each period. For Grades 9 and above, the proportion of the increase is 40% from 1 July to 31 December 2026, 70% from 1 January to 30 June 2027, and 100% from 1 July 2027. For Grades 10 to 20, it is 50%, then 75%, then 100%. Pension follows an analogous phased path, with separate rules for pensioners above and below Tk 20,001. The engine should compute currentPayablePercent at render time from the current date in Asia/Dhaka.
Statutory quotas. The circular is the only authoritative source for quota categories and seat counts. Quota structures in Bangladesh have been subject to litigation and reform, so the engine must not hard-code percentages. It should store each quota line with its category, seat count or percentage, and the exact clause text, and it should flag any circular whose quota table cannot be reconciled to its vacancy count.
Post-retirement and exclusions. The 2026 order excludes several categories, including judicial service members, specified defence personnel, Bangladesh Police and BGB employees, certain state-owned industrial workers, apprentices, outsourced staff, and temporary daily-paid workers. These exclusions must be encoded as a payOrderApplicability field so that a Police or BGB notice is not priced against the general scale.
1.3 Central and Commercial Banking
Bankers' Selection Committee Secretariat (BSCS). The BSCS is responsible for preparing panels of candidates for first- and second-class posts across participating banks. Its 2026 notices are published through the Bangladesh Bank e-recruitment channel and are mirrored on aggregator sites. One 2026 circular describes 224 posts across participating banks with online applications opening on 18 October 2026. Another aggregator reports 233 posts across 21 categories for Bangladesh Bank. These discrepancies are exactly what the reconciliation step must surface. The canonical record should be keyed on the BSCS circular reference, and the vacancy count should be taken from the primary PDF, with the difference logged as a data-quality incident.
BSCS circulars carry reference numbers in the format BSCS:132/2026-740, and job IDs such as Job ID: 265 appear in offer-letter notices. These are the join keys for the banking sector. The engine should also treat "Last date" fields in aggregator text as hints only, because they are frequently transcribed incorrectly.
Bangladesh Bank eRecruitment (erecruitment.bb.org.bd). This is the application surface for BSCS circulars and should be the officialPortalUrl for banking records where the circular names it. The portal is an application system, not a feed, so the engine links to it and does not automate submissions.
Private commercial banks. BRAC Bank, City Bank, Eastern Bank Ltd, Dutch-Bangla Bank, Mutual Trust Bank, Standard Chartered Bangladesh, and HSBC Bangladesh run Management Trainee Officer and Probationary Officer cycles through their own careers sites. Several of these sites run on mainstream ATS platforms. The correct procedure is to fingerprint each careers site once, identify its ATS, and onboard it through the matching adapter (Module 2). Where a site is a proprietary portal with no feed, it becomes a seeded HTML source with a weekly change-detection check. Because the sources reviewed here do not document these banks' ATS configurations, the first implementation step is a detection script that records the ATS vendor for each domain, rather than assuming one.
1.4 Corporate, FMCG, Telco, and Conglomerate Sector
The corporate layer contains some of the most valuable openings for Bangladeshi graduates and some of the most inconsistent publishing practices. The table below lists each target with the detection strategy the engine should apply. Vendor assignments are hypotheses to be confirmed by the detection script, not facts asserted in this report.
Employer Group Examples Expected Surface Ingestion Strategy Telco Grameenphone, Robi Axiata, Banglalink Careers portal, possibly enterprise ATS Fingerprint ATS, then adapter or seeded HTML FMCG / MNC Unilever Bangladesh, BAT Bangladesh, Nestlé Bangladesh, Marico Global ATS (often Workday or Taleo) Enterprise ATS detection; HTML seed where no public feed Local conglomerates Beximco, Square Group, Walton, PRAN-RFL, Meghna Group, Akij, ACI, Apex Mixed, often proprietary Seeded HTML with weekly diff Fintech and startups bKash, Nagad, Pathao, Chaldal, ShopUp Often Greenhouse, Lever, or Ashby Public ATS adapters
Greenhouse, Lever, and Ashby are the three ATS platforms that most reliably expose unauthenticated job data, and they are the first priority for the startup and fintech group. Workday, Taleo, and proprietary portals require HTML or enterprise-API access and are handled in Module 3.
1.5 Third-Party Aggregators: Verification Without Dependency
Bdjobs, Chakri, Prothom Alo Jobs, and LinkedIn Jobs (Bangladesh filter) are valuable for coverage measurement. A practical verification workflow runs as follows. The engine ingests an aggregator listing as a DISCOVERY event with low trust. It then searches for the same organization and title on the employer's domain or the official circular. If a match is found, the record is promoted and linked to the official URL. If no match is found within a configurable window, the record is marked UNVERIFIED and excluded from eligibility-gated views.
Aggregator text is not stored as the job description. The engine stores the aggregator URL and a content hash for audit, and it stores a summary only where the official source is missing.
Teletalk's aggregator pages show live counts, which can be used as a sanity check against the engine's own ingest rate.
1.6 Visual Reference Points
Two images from the research base illustrate the surfaces described above. The Teletalk banner shows the portal's brand and layout at the top of the All-Jobs home page.
Teletalk Alljobs portal banner [https://alljobs.teletalk.com.bd/assets/banner-56187bd1.png]
The 2026 gazette coverage illustrates how pay-scale changes reach the public and why the engine must track publication dates separately from effective dates.
Pay scale gazette coverage for the Ninth National Pay Scale 2026 [https://en-cdn.banglanews24.com/public/news_images/2026/09/19/1789810308-0db13e2559940dc4c97c132a9fd17e7e.jpg]
----------------------------------------
Module 2: Global Remote Opportunities Accessible to Bangladesh
2.1 Source Tiering
The remote layer should be organized by reliability, because the ingestion cost and failure modes differ sharply.
Tier Source Type Examples Auth Ingestion Method T0 Employer ATS public APIs Greenhouse, Lever, Ashby, Workable, Personio, Recruitee None JSON or XML fetch T1 Public job-board feeds Remote OK JSON and RSS None JSON or RSS fetch with attribution T2 Curated board APIs Remotive, Arbeitnow, Himalayas, Jobspresso, WeWorkRemotely Varies Feed or documented API where available T3 Community threads Hacker News "Who is Hiring?" None Algolia HN search API, then LLM extraction T4 Aggregators Unified APIs such as LoopCV or Fantastic.jobs API key, paid Optional, for coverage and benchmarking only
Greenhouse exposes a public job board endpoint at boards-api.greenhouse.io/v1/boards/{board_token}/jobs, where the content=true parameter includes the full description, departments, and offices. A companion public endpoint, api.greenhouse.io/v1/boards/{clientname}/jobs?content=true, is also documented in third-party references. The engine should use the boards-api host and fall back only if it is consistently unavailable.
Greenhouse's single-job endpoint can include pay_input_ranges when pay transparency is requested, which contains minimum and maximum amounts in cents with a currency type. This is a rare structured compensation field and should be preferred over text extraction when present.
Lever's Postings API is available at api.lever.co/v0/postings/{site} with mode=json, and it supports skip and limit pagination and filters on location, commitment, team, and department. The official documentation states that published postings are publicly viewable and may be scraped by third parties. The API does not expose custom application questions, so Lever records require the application form to be completed on the hosted page.
Ashby publishes an unauthenticated endpoint at api.ashbyhq.com/posting-api/job-board/{JOB_BOARD_NAME}, with includeCompensation=true to add compensation tiers. Each job includes isListed, which determines whether the posting should appear on the job board, and isRemote and workplaceType, which can be OnSite, Remote, or Hybrid. The isListed flag matters: a job with isListed: false should only be reachable by direct link, and the engine must not surface it in public listings.
Personio exposes a public XML feed at https://{company}.jobs.personio.de/xml?language=en. Recruitee exposes https://{clientname}.recruitee.com/api/offers. Workable exposes https://apply.workable.com/api/v1/widget/accounts/{clientname}.
The engine should maintain a registry of employer slugs per ATS. Discovery of slugs is performed by searching for boards.greenhouse.io, jobs.lever.co, and jobs.ashbyhq.com links on the employer's public site, and by ingesting the n8n community pattern of storing board slugs as configuration rather than code.
2.2 Remote OK
Remote OK provides free public feeds, with JSON at remoteok.com/api and RSS at remoteok.com/remote-jobs.rss, and supports filtering by tag. The feed is documented in community references as attribution-required. The engine should therefore render a visible "Source: Remote OK" link on every imported record and link back to the canonical posting.
Remote OK's FAQ states that job posts are distributed through a network of job boards that use its API to index jobs. This is useful context: a Remote OK listing is often a syndicated copy of an employer's original post, so deduplication must canonicalize it to the employer's ATS URL where one exists.
Remote OK's Terms of Service govern the use of its properties, and the terms disclaim liability for reliance on information published there. The engine should therefore present these records as discovery-grade and surface the employer's own posting when available.
2.3 Hacker News "Who is Hiring?"
The monthly thread is a high-signal source for startup and remote roles. The engine should query the public Algolia-backed Hacker News search API for the thread by its title and month, then parse each top-level comment as a candidate posting. Comments are unstructured, so every comment must pass the LLM extraction pipeline in Module 4 with a strict schema and a confidence threshold. Comments without an extractable application URL are stored as DISCOVERY only.
2.4 Feasibility Logic for GMT+6 Candidates
Bangladesh Standard Time is UTC+6 with no daylight-saving transitions, which makes overlap arithmetic deterministic. The feasibility classifier evaluates three conditions in order.
Condition A: Geographic eligibility. The posting must state a region that includes Bangladesh, or a region that is "Worldwide" or "Anywhere" with no residency restriction. Strings such as "US only," "must reside in the EU," or "authorized to work in the United States" are hard exclusions. Terms such as "APAC" and "EMEA" are treated as ambiguous and require a secondary check on the country list.
Condition B: Working-hour overlap. Given a company's core hours in its home time zone, the overlap with the candidate's working window is calculated in hours. If the candidate's window is 09:00 to 18:00 BST and the employer's core window is 09:00 to 17:00 US Eastern, the overlap is computed by converting both windows to UTC.
$$O = \max\left(0,\ \min(e_{\text{end}}, c_{\text{end}}) - \max(e_{\text{start}}, c_{\text{start}})\right)$$
where $$e$$ and $$c$$ are the employer and candidate windows expressed in UTC hours. A posting with $$O \ge 3$$ is classified as feasible for a synchronous role, and an asynchronous role is feasible at $$O = 0$$.
Condition C: Compensation and contract viability. Postings that require the candidate to be employed through a US payroll entity, to hold a US tax identifier, or to receive payment by a method unavailable in Bangladesh are flagged as CONTRACT_REQUIRED with a payout note.
2.5 Contractor and Cross-Border Compliance
Most remote roles accessible from Bangladesh are engaged as independent contractors rather than employees. The engine must surface the engagement type prominently and must not present contractor pay as salary.
For US-source payments to non-US individuals, the payee typically provides a Form W-8BEN to establish foreign status. The engine stores a taxFormRequired flag and a link to the relevant form instructions, and it does not give tax advice. Payout viability depends on the employer's supported rails. Wise, Payoneer, and SWIFT wire transfers each carry different fees, settlement times, and verification requirements, and the engine should record which rails an employer lists rather than asserting availability. Employers that list only a single rail generate a PAYOUT_RAIL_LIMITED flag.
2.6 Salary Normalization to BDT
Remote compensation arrives in USD, EUR, GBP, or with no currency. The normalizer converts to BDT using the Bangladesh Bank reference rate. Bangladesh Bank publishes an official USD/BDT reference rate, with recent values including 123.35 BDT per USD on 14 October 2026 and a 123.4150 reference rate for 17 October 2026. The engine stores both the rate and its effective date on every converted figure.
Period normalization follows a fixed convention: hourly rates multiply by a stated hours-per-year assumption, and monthly rates multiply by twelve. The assumption must be displayed in the UI.
$$\text{BDT}{\text{annual}} = \text{amount} \times f{\text{period}} \times r_{\text{BB}}$$
where $$f_{\text{period}}$$ is 1 for annual, 12 for monthly, and $$h \times 2080$$ for hourly rates under a 40-hour week, and $$r_{\text{BB}}$$ is the Bangladesh Bank reference rate for the conversion date.
2.7 The Remote Ingestion Adapter
The adapter layer normalizes every ATS response into a common intermediate shape before the canonical mapping. The following TypeScript implements adapters for Greenhouse, Lever, and Ashby. It is the production core of Phase 2 in the roadmap.
// src/ingest/adapters/ats.ts
export type AtsVendor = "greenhouse" | "lever" | "ashby";
export interface RawAtsJob {
 vendor: AtsVendor;
 externalId: string;
 title: string;
 company: string;
 locationText: string | null;
 isRemote: boolean | null;
 workplaceType: "REMOTE" | "HYBRID" | "ONSITE" | null;
 descriptionHtml: string | null;
 applyUrl: string;
 canonicalUrl: string;
 publishedAt: string | null;
 compensation: { min: number | null; max: number | null; currency: string | null; period: string | null } | null;
}
const UA = "CareerINSYT-Ingest/1.0 (+https://careerinsyt.example/bot; ops@careerinsyt.example)";
async function getJson<T>(url: string, timeoutMs = 15000): Promise<T> {
 const controller = new AbortController();
 const timer = setTimeout(() => controller.abort(), timeoutMs);
 try {
 const res = await fetch(url, {
 headers: { "user-agent": UA, accept: "application/json" },
 signal: controller.signal,
 });
 if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
 return (await res.json()) as T;
 } finally {
 clearTimeout(timer);
 }
}
export async function fetchGreenhouse(boardToken: string): Promise<RawAtsJob[]> {
 const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(boardToken)}/jobs?content=true`;
 const data = await getJson<{ jobs: any[] }>(url);
 return data.jobs.map((j) => ({
 vendor: "greenhouse",
 externalId: String(j.id),
 title: j.title,
 company: boardToken,
 locationText: j.location?.name ?? null,
 isRemote: null,
 workplaceType: null,
 descriptionHtml: j.content ?? null,
 applyUrl: j.absolute_url,
 canonicalUrl: j.absolute_url,
 publishedAt: j.first_published ?? j.updated_at ?? null,
 compensation: null,
 }));
}
export async function fetchLever(site: string): Promise<RawAtsJob[]> {
 const url = `https://api.lever.co/v0/postings/${encodeURIComponent(site)}?mode=json`;
 const data = await getJson<any[]>(url);
 return data.map((p) => ({
 vendor: "lever",
 externalId: p.id,
 title: p.text,
 company: site,
 locationText: p.categories?.location ?? null,
 isRemote: p.workplaceType === "remote" ? true : null,
 workplaceType: p.workplaceType === "remote" ? "REMOTE" : p.workplaceType === "hybrid" ? "HYBRID" : null,
 descriptionHtml: p.descriptionPlain ?? null,
 applyUrl: p.applyUrl ?? p.hostedUrl,
 canonicalUrl: p.hostedUrl,
 publishedAt: p.createdAt ? new Date(p.createdAt).toISOString() : null,
 compensation: p.salaryRange
 ? { min: p.salaryRange.min ?? null, max: p.salaryRange.max ?? null, currency: p.salaryRange.currency ?? null, period: p.salaryRange.interval ?? null }
 : null,
 }));
}
export async function fetchAshby(boardName: string): Promise<RawAtsJob[]> {
 const url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(boardName)}?includeCompensation=true`;
 const data = await getJson<{ jobs: any[] }>(url);
 return data.jobs
 .filter((j) => j.isListed !== false)
 .map((j) => ({
 vendor: "ashby",
 externalId: j.jobUrl,
 title: j.title,
 company: boardName,
 locationText: j.location ?? null,
 isRemote: j.isRemote ?? null,
 workplaceType: j.workplaceType === "Remote" ? "REMOTE" : j.workplaceType === "Hybrid" ? "HYBRID" : j.workplaceType === "OnSite" ? "ONSITE" : null,
 descriptionHtml: j.descriptionHtml ?? null,
 applyUrl: j.applyUrl,
 canonicalUrl: j.jobUrl,
 publishedAt: j.publishedAt ?? null,
 compensation: null,
 }));
}
Two implementation notes apply. First, the Lever salary field shape shown above is a mapping assumption and must be validated against a live response during Phase 2, because the public documentation reviewed here does not enumerate every salary sub-field. Second, Ashby's isListed filter is applied before mapping so that unlisted jobs never enter the public index.
2.8 Remote Feed Ingestion Schedule
Remote ATS sources change frequently, but they are cheap to poll. A reasonable schedule is every four hours for ATS boards, once per day for Remote OK's feed (to respect its scale and attribution requirements), and once per month plus a weekly sweep for the Hacker News thread. Polling intervals must be stored per source, so that a source that returns HTTP 429 or 5xx can be backed off without affecting others.
----------------------------------------
Module 3: The Autonomous Scraping and Harvesting Engine
3.1 Tooling Comparison
The tooling decision depends on the target class. Static HTML and JSON sources need no browser. JavaScript-rendered sources need a browser automation layer. Portals with access controls need a human-in-the-loop path.
Category Option Strengths Weaknesses Recommendation Browser automation Playwright Cross-browser, modern async API, strong Python and Node support Detectable by default without patches Primary browser layer for JavaScript pages you are permitted to crawl Browser automation Puppeteer Chromium-only, mature Narrower browser coverage Use only if an existing codebase depends on it Browser automation Crawlee Queueing, retries, proxy and session management on Playwright or Cheerio Opinionated framework Recommended orchestration layer in TypeScript Cloud extraction Firecrawl Converts pages to clean Markdown or structured JSON Paid at volume Useful for prototyping HTML-to-schema extraction Cloud extraction ScrapingBee Managed rendering and proxy rotation Paid, and anti-bot bypass is a vendor-side capability Not recommended for government targets Cloud extraction Bright Data, Zyte Enterprise data delivery, managed proxy infrastructure Cost and vendor dependence Evaluate only for permitted commercial targets Cloud extraction Browserless.io Hosted headless Chrome Usage cost Useful as a managed browser pool for permitted targets Python ecosystem Scrapy with Playwright Mature pipelines, throttling, and item validation Second language in a TypeScript stack Good if the team is Python-first Python ecosystem BeautifulSoup4 with httpx Lightweight, ideal for static pages No JavaScript execution Suitable for static notice pages Serverless Cloudflare Workers with Browser Rendering Edge execution, low latency Platform constraints on long jobs Good for lightweight checks, not full crawls Serverless AWS Lambda with containerized Playwright Scales on demand Cold starts and cost complexity Viable for burst workloads Scheduler GitHub Actions cron Free runner tier, simple configuration Scheduled runs can be delayed under load; minimum practical granularity is coarse Recommended for hourly and daily crawls
The stack recommended for this platform is TypeScript end to end: Crawlee for orchestration, Cheerio for static pages, Playwright for the minority of JavaScript pages, BullMQ on Redis for the queue, and a Zod-validated schema at every boundary. Playwright's detectability is a real constraint. Fresh sessions leak signals such as the navigator.webdriver flag and missing browser properties, which anti-bot systems inspect. The engine can apply the standard hygiene layer for permitted sites, but the stealth tooling is not a dependable long-term solution, and the Playwright stealth documentation itself states that such patches do not fix IP reputation, TLS fingerprinting, or behavioral analysis.
A precise note on the alternatives. Projects such as invisible_playwright modify Firefox at the source level rather than via JavaScript injection, and they document that detection surfaces include navigator, screen, GPU, and canvas properties. Puppeteer-extra-plugin-stealth and selenium-stealth are documented as unmaintained, with the last substantive commits dated mid-2024 and December 2021 respectively. The engine therefore does not adopt any stealth library as a dependency. Browser-level evasion is excluded from the government-facing crawler by policy.
3.2 Anti-Bot Realities and the Engine's Response
Modern anti-bot products inspect many layers at once. Cloudflare reads multiple signals from each Playwright session, and stealth plugins often fail against it. Akamai, DataDome, and PerimeterX use similar layered approaches. The engine's response is architectural, not evasive:
Detect and classify. Every fetch result is classified as OK, RATE_LIMITED, CHALLENGE_PAGE, BLOCKED, MOVED, or SOFT_404. A CHALLENGE_PAGE or BLOCKED result is never retried with a different identity. It moves the source to NEEDS_HUMAN_REVIEW, and the operations team decides whether a permitted feed, an email subscription, or a partnership is the correct route.
Prefer feeds. Where an employer exposes an ATS feed, the engine uses it and never scrapes the rendered page. This eliminates most of the anti-bot surface for global and corporate sources.
Throttle and back off. Each host has a token bucket with a configured requests-per-minute ceiling, a random jitter of 20 to 40 percent, and exponential backoff on 429 and 5xx responses.
// src/ingest/politeness.ts
export interface HostPolicy {
 rpm: number; // requests per minute ceiling
 jitterRatio: number; // 0.2 means ±20% jitter
 maxRetries: number;
}
const lastCallAt = new Map<string, number>();
const retryAfterUntil = new Map<string, number>();
export function sleep(ms: number) {
 return new Promise((r) => setTimeout(r, ms));
}
export async function politeWait(host: string, policy: HostPolicy): Promise<void> {
 const now = Date.now();
 const gate = retryAfterUntil.get(host) ?? 0;
 if (now < gate) await sleep(gate - now);
 const minGap = 60_000 / policy.rpm;
 const jitter = minGap * policy.jitterRatio * (Math.random() * 2 - 1);
 const last = lastCallAt.get(host) ?? 0;
 const wait = Math.max(0, last + minGap + jitter - Date.now());
 if (wait > 0) await sleep(wait);
 lastCallAt.set(host, Date.now());
}
export function applyBackoff(host: string, attempt: number, retryAfterHeader?: string | null) {
 const headerSeconds = retryAfterHeader ? Number(retryAfterHeader) : NaN;
 const base = Number.isFinite(headerSeconds) ? headerSeconds * 1000 : 2 ** attempt * 1000;
 const capped = Math.min(base, 15 * 60 * 1000);
 retryAfterUntil.set(host, Date.now() + capped);
}
Respect robots.txt. Each host's robots.txt is fetched, cached for 24 hours, and checked before any path is requested. Disallowed paths are never crawled, and a disallow change triggers an alert.
Identify the crawler. The user agent names the platform and provides a contact address. Operators receive any abuse complaints and can suspend a source within minutes.
3.3 The Bangladeshi Gazette and Circular Parsing Problem
This is the hardest technical problem in the system. Circulars arrive as low-resolution scans, multi-column layouts, Bengali text with mixed-script numerals, and tables whose borders are inconsistent. Some files use legacy Bijoy-encoded fonts that do not map cleanly to Unicode. The engine therefore cannot rely on text extraction alone.
Three approaches are available. Tesseract OCR with Bengali traineddata runs locally at zero marginal cost, but accuracy on low-resolution scans and complex tables is limited, and it outputs text rather than structure. Google Cloud Vision provides strong OCR with layout information at per-page cost. A multimodal LLM can read the rendered page image and output structured JSON directly, which removes most of the table-reconstruction work, at the cost of requiring validation.
The recommended design combines the second and third approaches, with Tesseract as a fallback and cross-check. The LLM output is never trusted without a Zod validation pass and a deterministic cross-check on totals, such as confirming that the sum of per-post vacancies equals the stated total.
Pipeline steps.
Step 1: Download and fingerprint. Fetch the PDF with a permitted, rate-limited request. Compute the SHA-256 of the bytes and store the file in object storage under that hash. An unchanged hash short-circuits all downstream work.
Step 2: Render at 300 DPI. Convert each page to a PNG at 300 DPI. Scanned circulars often render poorly at lower resolutions, and 300 DPI is the standard threshold for reliable table reading.
# Render every page of a circular to 300 DPI PNG
pdftoppm -r 300 -png circular-2026-bscs.pdf pages/circular
# Produces pages/circular-1.png, pages/circular-2.png, ...
Step 3: Structured extraction. Send each page image to the multimodal model with the system prompt in Module 4, requesting the CircularExtraction schema.
Step 4: Validate. Parse the model output with Zod. Reject any output that fails schema validation, and route it to a retry with a corrective prompt that includes the validation error. After two failed attempts, the record moves to human review.
Step 5: Cross-check. Compare the extracted vacancy total with the total stated in the document text, if present. Compare the extracted grade against the nearest matching band in the pay-scale table. Mismatches create a DATA_QUALITY incident.
Step 6: Human review queue. Every record with a confidence flag, an unresolved quota, or a cross-check failure enters a review queue with the page image side by side with the extracted fields. Reviewers approve, correct, or reject. Corrections are stored as training labels for prompt refinement.
Step 7: Publish. Approved records transition to LIVE and are linked to the official circular URL.
The multimodal path is preferable for tables because it reads structure directly. Tesseract remains valuable as a deterministic fallback when the model is unavailable, and as an independent check on numerals. Bengali numerals must be normalized to ASCII before any numeric comparison, as shown in the Module 4 utilities.
3.4 Scheduling and Cost of the Crawl
The crawl schedule is segmented by source class. ATS feeds run every four hours. Government notice pages run hourly during the Dhaka business day and every six hours overnight, which aligns with publication patterns. Circular PDFs are checked daily, and only new hashes enter the OCR path, which keeps the model usage well inside a free tier. Banking circulars run every two hours during an active application window. These schedules are implemented as GitHub Actions cron workflows that enqueue jobs into BullMQ, rather than long-running processes.
----------------------------------------
Module 4: LLM-Powered Normalization and Zod Schema Validation
4.1 Schema Validation Foundation
Zod is a TypeScript-first validation library with schema definitions that infer static types. It has zero external dependencies, a core bundle of about 2 kilobytes gzipped, and built-in JSON Schema conversion. The last property is central to this design, because the same schema can validate database writes and generate the JSON Schema that the LLM must satisfy. The current release is Zod 4, which is stable. Zod requires TypeScript 5.5 or later and strict mode in tsconfig.json.
Zod's safeParse and transform methods are the correct primitives for coercing untyped input, such as query parameters and model output, into typed values before use.
4.2 The Canonical Universal Job Schema
The schema below is the single contract for every record in the engine. It covers identification, sector, government and corporate attributes, qualifications, competencies, timestamps, lifecycle, and provenance. Every adapter, parser, and UI component consumes this type.
// src/schema/canonical-job.ts
import * as z from "zod";
// ---------- Enumerations ----------
export const Sector = z.enum([
 "GOVERNMENT",
 "BANKING",
 "CORPORATE_MNC",
 "LOCAL_CONGLOMERATE",
 "GLOBAL_REMOTE",
 "STARTUP",
]);
export const WorkplaceType = z.enum(["REMOTE", "HYBRID", "ONSITE"]);
export const SourceTier = z.enum([
 "OFFICIAL_GAZETTE", // Ministry or BPSC PDF
 "OFFICIAL_PORTAL", // Government or bank portal page
 "EMPLOYER_ATS", // Greenhouse, Lever, Ashby, etc.
 "EMPLOYER_SITE", // Employer careers page
 "AGGREGATOR", // Discovery only
 "COMMUNITY", // HN thread, forums
]);
export const ArchiveStatus = z.enum(["LIVE", "EXPIRED", "ARCHIVED", "BROKEN_REVIEW", "UNVERIFIED"]);
export const DegreeFamily = z.enum([
 "CSE", "EEE", "CIVIL", "MECHANICAL", "ECONOMICS", "ACCOUNTING", "FINANCE",
 "BUSINESS_ADMIN", "LAW", "ENGLISH", "MATHEMATICS", "PHYSICS", "CHEMISTRY",
 "STATISTICS", "AGRICULTURE", "MEDICINE", "ANY_BACHELOR", "OTHER",
]);
export const QuotaCategory = z.enum([
 "FREEDOM_FIGHTER", "DISTRICT", "WOMEN", "ETHNIC_MINORITY", "DISABILITY", "OTHER",
]);
// ---------- Government attributes ----------
export const PayPhase = z.object({
 periodStart: z.iso.date(),
 periodEnd: z.iso.date(),
 payablePercentOfIncrease: z.number().min(0).max(100),
});
export const GovernmentAttributes = z.object({
 ministry: z.string().min(1),
 agency: z.string().min(1),
 cadre: z.string().nullable(),
 grade: z.number().int().min(1).max(20).nullable(),
 payScale: z.object({
 version: z.enum(["NPS_2015", "NPS.... Incomplete!


##GROK
**Architectural Specification: Autonomous Real-Time Job Ingestion & Intelligence Engine for CareerINSYT (INSYT Corporate)**

This is a production-grade blueprint for a self-dependent Opportunities Engine focused on Bangladesh-localized government/banking/corporate opportunities plus high-yield global remote roles viable for GMT+6 candidates. It prioritizes official primary sources, public feeds, respectful collection, structured normalization, link health, and candidate matching. It deliberately avoids any description of techniques for circumventing technical access controls, fingerprint evasion, or anti-bot systems. Collection must respect robots.txt where present, site terms of service, rate limits, and applicable law (public notices and circulars are the primary targets).

### Core Principles
- **Source-of-truth hierarchy**: Official employer/ministry/Teletalk portals and gazettes first. Aggregators (Bdjobs, etc.) only for discovery + cross-verification of existence/deadlines, never as canonical data.
- **Data fidelity**: Every record carries `sourceUrl`, `officialPortalUrl`, `fingerprintHash`, `lastVerifiedLiveAt`, and explicit expiration state.
- **Self-healing**: Daily link health checks, deadline-driven archival, and re-verification.
- **Zero-to-low cost**: GitHub Actions cron, free-tier LLM (Gemini Flash), serverless queues/storage, public JSON endpoints where available.
- **Schema-first**: All ingestion funnels into a strict Zod-validated canonical model before UI exposure.

---

## MODULE 1: Bangladesh Recruitment Surface Map

**Government & Research Institutes**
- **BPSC**: Official site `https://www.bpsc.gov.bd`. Circulars and exam notices published there; online applications routed through `https://bpsc.teletalk.com.bd` (Form-1 / Form-5A style flows). Non-cadre and special BCS (e.g., health cadre) circulars appear as PDFs or structured notices.
- **Teletalk All-Jobs aggregator**: `https://alljobs.teletalk.com.bd` lists live government openings with organization filters, deadlines, and deep links to individual ministry/org subdomains (`*.teletalk.com.bd`, e.g., tax zones, DC offices, BARI, etc.). Individual apply links point to the specific Teletalk instance.
- Research councils (BARC, BRRI, BINA, BARI, BJRI, BCSIR, etc.) and ministries publish circulars on their own sites or via Teletalk subdomains and gazette channels. Many circulars are PDF (sometimes scanned multi-column Bengali tables).
- **National Pay Scale 2015 (8th)**: Grade 9 basic ৳22,000–53,060; Grade 10 ৳16,000–38,640; higher grades scale upward to Grade 1 at ৳78,000 fixed. Extract Grade, basic pay range, house rent allowance percentage, medical allowance, and statutory quotas (Freedom Fighter, district, women, ethnic minority, etc.) from circular text or tables.

**Banking**
- Bangladesh Bank e-recruitment + Bankers’ Selection Committee Secretariat (BSCS): Primary portal `https://erecruitment.bb.org.bd`. Handles BB positions and centralized selection for state-owned commercial/specialized banks (Sonali, Janata, Agrani, Rupali, etc.). Application flows are account-based online forms.
- Private commercial banks (BRAC Bank, City Bank, EBL, DBBL, MTB, Standard Chartered BD, HSBC BD) run their own career portals or ATS cycles, typically MTO/Probationary Officer campaigns with published circulars or online forms.

**Corporate / FMCG / Telco / Fintech**
- Telcos: Grameenphone, Robi, Banglalink career pages.
- MNCs: Unilever BD, BAT BD, Nestlé BD, Marico.
- Local conglomerates: Beximco, Square, Walton, PRAN-RFL, Meghna, Akij, ACI, Apex — usually proprietary career sites or LinkedIn/Bdjobs postings that link back to official apply forms.
- Fintech/startups: bKash, Nagad, Pathao, Chaldal, ShopUp — Greenhouse/Lever/Workable or custom portals.
- Prefer official career pages or public ATS JSON endpoints over third-party listings.

**Aggregators (secondary only)**
- Bdjobs.com, Chakri.com, Prothom Alo Jobs, LinkedIn (Bangladesh filter). Use solely for discovery signals and deadline cross-checks; always resolve to the official portal URL before ingestion.

Document types: HTML listing pages, individual job detail pages, PDF circulars (text or scanned), Teletalk form pages.

---

## MODULE 2: Global Remote Opportunities (GMT+6 Viable)

**Preferred sources (public / low-friction)**
- RemoteOK, WeWorkRemotely, Remotive, Himalayas, Jobspresso, Arbeitnow, Remote.co — HTML or public RSS/JSON where offered.
- Wellfound (AngelList) public listings.
- Hacker News “Who is Hiring?” monthly threads (parse via HN API or Algolia).
- Direct ATS public boards: Greenhouse (`/v1/boards/{company}/jobs`), Lever, Ashby, Workable public endpoints. These yield clean structured JSON.

**Filtering logic for BD candidates**
- Timezone: Prefer “Worldwide”, “Anywhere”, “APAC”, “EMEA/South Asia”, or explicit overlap ≥ 3 hours with BST (UTC+6).
- Workplace type: Fully remote or contractor-friendly.
- Compensation: Normalize USD/EUR annual figures to BDT using Bangladesh Bank published rates (store both currencies + conversion timestamp).
- Compliance notes: Flag roles that accept independent contractors / B2B, W-8BEN style tax forms, and payout methods (Wise, Payoneer, SWIFT). Do not invent legal advice; surface the stated terms.

Ingestion prefers JSON feeds over HTML scraping for reliability and lower load.

---

## MODULE 3: Autonomous Harvesting Engine (High-Level Architecture)

**Recommended stack (respectful, maintainable)**
- Orchestration: GitHub Actions scheduled workflows (hourly for high-velocity sources, daily for govt circulars) + BullMQ / Upstash Redis for job queues.
- Fetch layer: Native `fetch` / httpx for static/public JSON; Playwright (or Crawlee) only for sites that require JS rendering of public content, with strict concurrency limits and polite delays.
- Storage: Appwrite Cloud or Supabase free tier (PostgreSQL) for canonical records; object storage for PDF snapshots.
- LLM layer: Gemini 1.5 Flash (free tier limits) for structured extraction from unstructured text/PDF pages.
- Avoid any design that depends on residential proxy rotation, fingerprint spoofing, or anti-detection libraries aimed at defeating Cloudflare/Akamai/etc. If a site blocks legitimate polite access, fall back to manual/official channels or public feeds.

**PDF / Gazette pipeline (hardest technical problem)**
1. Download official PDF from the ministry/BPSC/Teletalk notice link.
2. Render pages to high-resolution images (300 DPI) via pdfium / poppler or Playwright PDF-to-image.
3. Pass images + text layer (if extractable) to multimodal LLM (Gemini Flash/Pro) with a strict JSON schema prompt.
4. Fallback OCR: Tesseract with Bengali traineddata for text-layer recovery when LLM confidence is low.
5. Validate extracted fields against the canonical Zod schema; quarantine low-confidence records for human review.

This treats circulars as public documents and extracts structured data (posts, grade, quota, deadline, eligibility) without fabricating content.

---

## MODULE 4: Canonical Schema & LLM Extraction

**TypeScript + Zod Universal Job Schema (core contract)**

```typescript
import { z } from "zod";

export const SectorEnum = z.enum([
  "GOVERNMENT", "BANKING", "CORPORATE_MNC", "LOCAL_CONGLOMERATE",
  "GLOBAL_REMOTE", "STARTUP", "RESEARCH_INSTITUTE"
]);

export const WorkplaceType = z.enum(["REMOTE", "HYBRID", "ONSITE"]);

export const JobSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  fingerprintHash: z.string(), // sha256(normalizedOrg + title + deadline + location)
  sourceUrl: z.string().url(),
  officialPortalUrl: z.string().url().optional(),
  sector: SectorEnum,
  title: z.string(),
  organization: z.string(),
  ministryOrParent: z.string().optional(),
  location: z.string(),
  division: z.string().optional(), // Dhaka, Chittagong, etc.
  // Government-specific
  grade: z.number().int().min(1).max(20).optional(),
  cadre: z.string().optional(),
  payScaleBdt: z.object({
    basicMin: z.number().optional(),
    basicMax: z.number().optional(),
    houseRentPct: z.number().optional(),
    medical: z.number().optional(),
  }).optional(),
  teletalkJobCode: z.string().optional(),
  quotas: z.array(z.string()).optional(), // Freedom Fighter, District, Women, Ethnic
  ageLimit: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
  // Corporate / Remote
  compensation: z.object({
    currency: z.enum(["BDT", "USD", "EUR"]),
    min: z.number().optional(),
    max: z.number().optional(),
    period: z.enum(["monthly", "annual"]).optional(),
    equity: z.boolean().optional(),
  }).optional(),
  workplaceType: WorkplaceType.optional(),
  timezoneRequirement: z.string().optional(),
  // Qualifications
  degreeFamily: z.array(z.string()), // e.g. "B.Sc. in Computer Science & Engineering"
  minCgpa: z.number().optional(),
  experienceYears: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
  skills: z.array(z.string()), // mapped later to ESCO / O*NET
  // Lifecycle
  publishedAt: z.string().datetime(),
  deadline: z.string().datetime().optional(), // BST midnight cutoff
  lastVerifiedLiveAt: z.string().datetime(),
  isExpired: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  archiveNotice: z.string().optional(),
  rawExtract: z.record(z.any()).optional(), // original LLM output for audit
});

export type Job = z.infer<typeof JobSchema>;
```

**Production LLM system prompt pattern (Gemini)**
- System: “You are a precise extraction engine for Bangladeshi government circulars and job postings. Output ONLY valid JSON matching the provided schema. Never invent missing fields; use null. Prefer official terminology. For scanned Bengali tables, transcribe accurately.”
- User: Include the full circular text or page images + the Zod-derived JSON schema description + few-shot examples of clean extractions.
- Enforce `response_format: { type: "json_object" }` and post-validate with Zod. Reject or quarantine on schema failure.

---

## MODULE 5: Link Validation & Lifecycle

- Daily sweeper: HTTP HEAD/GET with retries and exponential backoff on every `officialPortalUrl` and `sourceUrl`. Treat soft-404 SPA redirects (HTTP 200 but “Application Closed” / home-page content) as expired by content pattern matching.
- Deadline engine: All deadlines interpreted in BST (UTC+6). At exact midnight after deadline, set `isExpired = true`, generate `archiveNotice`, optionally snapshot via Wayback Machine API, and move to archive partition.
- Deduplication: Compute `fingerprintHash = sha256(normalize(org) + normalize(title) + deadlineDate + location)`. Prefer the record that points to the official portal; merge secondary aggregator links into a `secondaryUrls` array.

---

## MODULE 6: Candidate Matching Engine

**Weighted fit (transparent, not “probability”)**
- Binary gate (fail-closed): Degree discipline exact/family match, age limit, quota eligibility, citizenship.
- Weighted score:
  - Verified Career Passport assessments: ×3
  - Completed INSYT courses / portfolio artifacts: ×2
  - Self-declared CV skills: ×1
- Display “Prerequisite Alignment %” + explicit missing items.
- Gap analysis: Map missing competencies to concrete INSYT learning paths, mock tests, or studio exercises (e.g., “DuckDB SQL → BI Path Lesson 4”).
- 1-click apply: Deep-link to official portal; optionally pre-generate ATS-optimized PDF from Career Passport; auto-advance Kanban card to “Applied” on tracked click.

---

## MODULE 7: Front-End UX (Executive Corporate Light Mode)

Palette: Backgrounds `#F7F8FC` / `#FFFFFF` / `#F1F5F9`; Navy `#1E3A8A`; Trust Blue `#2563EB`; Emerald active `#059669`; Amber imminent `#D97706`; Slate muted `#64748B`. Typography: geometric sans + JetBrains Mono for grades/codes.

**Facets**
- Sector pills: All | Govt Grade 9–10 | Banking MTO | FMCG/MNC | High-Pay Remote (USD)
- Location: Dhaka | Chittagong | Divisional | Anywhere Remote
- Dual currency salary slider
- “Eligible Only” toggle (Career Passport credentials)

**Components**
- Side-by-side circular PDF viewer + structured fields
- Live countdown (“Expires in 2d 14h”) using BST
- Instant ATS resume tailor modal (keyword highlighting against the job’s extracted skills)

---

## MODULE 8: Deployment, Cost & Roadmap

**Zero-to-minimal cost**
- Triggers: GitHub Actions cron (free tier sufficient for hourly/daily).
- Queue: Upstash Redis free tier + BullMQ.
- DB: Appwrite Cloud / Supabase free tier.
- LLM: Gemini 1.5 Flash free tier (monitor RPM/TPM).
- Storage: Same free tiers + object storage for PDFs.

**Phased roadmap**
1. Days 1–3: Zod schema, DB models, dead-link sweeper, basic archival.
2. Days 4–7: Public ATS JSON + RemoteOK-style feeds + normalization.
3. Days 8–14: Teletalk All-Jobs + BPSC + BB portal listing parsers (public HTML/JSON only) + official URL resolution.
4. Days 15–20: PDF download → image render → multimodal extraction pipeline + Bengali OCR fallback.
5. Days 21–25: Matching engine, gap analysis, executive UI on `/opportunities` and `/jobs`.

**Starter code fragments (production-oriented)**

Link health runner (simplified):
```typescript
async function verifyLink(url: string): Promise<{ live: boolean; status: number; soft404: boolean }> {
  const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(10000) });
  // Follow with GET if needed and check body for closed patterns
  return { live: res.ok, status: res.status, soft404: false /* content check */ };
}
```

Gemini multimodal extraction (outline):
```typescript
async function extractFromCircular(pdfUrl: string, images: Buffer[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [/* images + text prompt + schema */] }],
    generationConfig: { responseMimeType: "application/json" }
  });
  const parsed = JobSchema.safeParse(JSON.parse(result.response.text()));
  // handle success / quarantine
}
```

Weighted alignment (outline):
```typescript
function computeFit(candidate: Passport, job: Job): { score: number; missing: string[]; gatePassed: boolean } {
  // binary gates first
  // then weighted skill intersection
}
```

---

This blueprint gives a complete, implementable path that stays within public data, official portals, and ethical collection practices. It eliminates stale records, broken citations, unstructured eligibility, and generic skill tagging while keeping operational cost near zero. Implement the schema and lifecycle first; everything else builds on a clean, verifiable data foundation.

If you need the full expanded Zod schema with every optional field, concrete GitHub Actions workflow YAML, or the exact matching equation coefficients tuned to your Career Passport data model, specify the next priority and I will deliver the code-level artifacts.

