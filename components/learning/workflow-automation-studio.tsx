"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow, GitBranch, Play, RotateCcw, CheckCircle2, AlertTriangle,
  Zap, Copy, Check, Download, Terminal, Database, Send, Code,
  HelpCircle, RefreshCw, Layers, Shield, FileText, ChevronRight,
  Maximize2, Cpu, Globe, CheckSquare, Search, Sliders, DollarSign,
  Clock, TrendingUp, Sparkles, Filter, ExternalLink, ArrowRight, XCircle
} from "lucide-react";

interface WorkflowAutomationStudioProps {
  lessonSlug: string;
  courseSlug: string;
}

export default function WorkflowAutomationStudio({ lessonSlug, courseSlug }: WorkflowAutomationStudioProps) {
  const [activeTab, setActiveTab] = useState<"canvas" | "trace" | "playground" | "roi" | "gym">("canvas");

  // ─────────────────────────────────────────────────────────────
  // 1. WORKFLOW CANVAS STATE
  // ─────────────────────────────────────────────────────────────
  interface WorkflowNode {
    id: string;
    label: string;
    category: "trigger" | "webhook" | "http" | "transform" | "ai" | "condition" | "approval" | "database" | "dlq";
    status: "idle" | "running" | "success" | "warning" | "error";
    icon: string;
    description: string;
    config: string;
    inputSample: Record<string, any>;
    outputSample: Record<string, any>;
    securityNotes: string;
  }

  const WORKFLOW_NODES: WorkflowNode[] = [
    {
      id: "node-1",
      label: "Inbound Carrier Webhook",
      category: "trigger",
      status: "success",
      icon: "Zap",
      description: "Listens for real-time shipment updates pushed by ocean carriers. Validates HMAC-SHA256 signature in x-hub-signature-256 header.",
      config: "Method: POST\nPath: /webhooks/v1/shipments\nHMAC Header: x-hub-signature-256\nResponse: 200 OK (Immediate ACK)",
      inputSample: {
        event: "shipment.status_updated",
        carrier_code: "MAEU",
        container_no: "MSKU4491021",
        timestamp: "2026-10-09T08:14:22Z",
        gross_weight_kg: 24500
      },
      outputSample: {
        verified: true,
        transaction_id: "TXN-2026-9041",
        container_no: "MSKU4491021",
        carrier: "Maersk Line",
        status: "PORT_ARRIVAL_VERIFIED"
      },
      securityNotes: "Enforces HMAC-SHA256 signature verification. Rejects unsigned or expired webhook calls with HTTP 401."
    },
    {
      id: "node-2",
      label: "Schema Validation Gate",
      category: "transform",
      status: "success",
      icon: "CheckSquare",
      description: "Validates incoming JSON against draft-07 JSON Schema. Ensures container_no matches ISO 6346 pattern and gross_weight_kg > 0.",
      config: "JSON Schema Draft-07\nStrict: true\nFail Action: Route to Dead-Letter Queue (DLQ)",
      inputSample: {
        container_no: "MSKU4491021",
        gross_weight_kg: 24500,
        carrier_code: "MAEU"
      },
      outputSample: {
        schema_valid: true,
        container_prefix: "MSKU",
        container_serial: "4491021",
        iso_compliant: true
      },
      securityNotes: "Sanitizes raw text inputs against SQL injection and prototype pollution before downstream processing."
    },
    {
      id: "node-3",
      label: "Customs API (HTTP Request)",
      category: "http",
      status: "success",
      icon: "Globe",
      description: "Queries government customs clearance database via REST API. Injects OAuth 2.0 Bearer token with exponential retry on 429/503.",
      config: "GET https://api.customs.gov/v2/clearance/MSKU4491021\nAuth: Bearer {{ $credentials.customs_token }}\nRetry Count: 3 (Exponential Backoff with Jitter)",
      inputSample: {
        container_no: "MSKU4491021"
      },
      outputSample: {
        customs_status: "CLEARED_FOR_RELEASE",
        duty_paid_usd: 1240.50,
        clearance_id: "CLR-881920-BD",
        inspection_hold: false
      },
      securityNotes: "Bearer tokens cached in Azure Key Vault. Dynamic token refresh invoked upon receipt of HTTP 401."
    },
    {
      id: "node-4",
      label: "Document AI Invoice Extractor",
      category: "ai",
      status: "success",
      icon: "Cpu",
      description: "Bounded multimodal extraction step: parses carrier freight PDF, extracts demurrage line items into strict JSON Schema.",
      config: "Model: GPT-4o / Claude 3.5 Sonnet\nResponse Format: json_schema\nTemperature: 0.0 (Zero hallucination constraint)",
      inputSample: {
        document_uri: "s3://invoices/carrier_invoice_2026_991.pdf",
        invoice_type: "FREIGHT_DEMURRAGE"
      },
      outputSample: {
        invoice_number: "INV-MAEU-9812",
        freight_charges_usd: 4850.00,
        demurrage_days: 2,
        demurrage_fee_usd: 600.00,
        total_billed_usd: 5450.00,
        extraction_confidence: 0.984
      },
      securityNotes: "Prompt boundary tags isolate untrusted document text to prevent indirect prompt injection."
    },
    {
      id: "node-5",
      label: "Approval Threshold Gateway",
      category: "condition",
      status: "warning",
      icon: "GitBranch",
      description: "Conditional logic: if total_billed_usd > $3,000 OR inspection_hold == true, routes to human review. Otherwise straight-through.",
      config: "IF {{ $json.total_billed_usd > 3000 }} THEN Path 'Human Approval' ELSE Path 'Auto Post'",
      inputSample: {
        total_billed_usd: 5450.00,
        inspection_hold: false
      },
      outputSample: {
        condition_result: true,
        branch_taken: "HUMAN_APPROVAL_REQUIRED",
        reason: "EXCEEDS_TIER1_THRESHOLD_3000"
      },
      securityNotes: "Deterministic code gate. High-value disbursements cannot be bypassed by upstream AI parameters."
    },
    {
      id: "node-6",
      label: "Microsoft Teams Approval Card",
      category: "approval",
      status: "warning",
      icon: "Users",
      description: "Dispatches actionable Adaptive Card to Regional Logistics Manager's Teams chat with Approve/Reject buttons and audit trail.",
      config: "Teams Connector: Post adaptive card and wait for a response\nTimeout: 48 Hours\nEscalation Target: Operations VP",
      inputSample: {
        invoice_number: "INV-MAEU-9812",
        amount_usd: 5450.00,
        demurrage_days: 2
      },
      outputSample: {
        approver: "farhana.haque@nexuslogistics.com",
        decision: "APPROVED",
        responded_at: "2026-10-09T08:21:40Z",
        comments: "Approved demurrage due to port congestion."
      },
      securityNotes: "Ensures only authorized personnel in the Finance Entra ID security group can submit the approval action."
    },
    {
      id: "node-7",
      label: "PostgreSQL Ledger Write",
      category: "database",
      status: "success",
      icon: "Database",
      description: "Executes idempotent transactional write to central operations database. Uses ON CONFLICT (invoice_no) DO NOTHING to prevent duplicates.",
      config: "Connection: Nexus-PostgreSQL-Prod\nTable: carrier_settlements\nIdempotency Key: invoice_number\nMode: UPSERT",
      inputSample: {
        invoice_number: "INV-MAEU-9812",
        status: "APPROVED_FOR_PAYMENT",
        amount_usd: 5450.00
      },
      outputSample: {
        row_id: 104928,
        written_at: "2026-10-09T08:21:42Z",
        reconciled: true,
        db_duration_ms: 18
      },
      securityNotes: "Parameterized SQL query prevents SQL injection; uses dedicated service principal credentials."
    },
    {
      id: "node-8",
      label: "Dead-Letter Queue (DLQ)",
      category: "dlq",
      status: "idle",
      icon: "AlertTriangle",
      description: "Catches unrecoverable fatal exceptions, retains raw payload, records error diagnostics, and alerts Slack/PagerDuty.",
      config: "Trigger: On Error Catch\nTarget: Azure Service Bus / dlq_incidents\nRetention: 90 Days WORM Storage",
      inputSample: {},
      outputSample: {},
      securityNotes: "Scrubs all API keys and tokens before persisting error payload to audit storage."
    }
  ];

  const [selectedNodeId, setSelectedNodeId] = useState<string>("node-1");
  const selectedNode = WORKFLOW_NODES.find(n => n.id === selectedNodeId) || WORKFLOW_NODES[0];
  const [executionStep, setExecutionStep] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const runSimulationStep = () => {
    if (executionStep < WORKFLOW_NODES.length - 1) {
      setExecutionStep(prev => prev + 1);
      setSelectedNodeId(WORKFLOW_NODES[executionStep + 1].id);
    } else {
      setExecutionStep(0);
      setSelectedNodeId(WORKFLOW_NODES[0].id);
    }
  };

  const handleCopyJson = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // ─────────────────────────────────────────────────────────────
  // 2. MOCK API PLAYGROUND STATE
  // ─────────────────────────────────────────────────────────────
  const [apiMethod, setApiMethod] = useState<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">("POST");
  const [apiEndpoint, setApiEndpoint] = useState<string>("/api/v1/logistics/shipments/ingest");
  const [apiMockStatus, setApiMockStatus] = useState<number>(200);
  const [apiRequestBody, setApiRequestBody] = useState<string>(
    JSON.stringify({
      carrier_id: "CARRIER-MAEU-09",
      container_number: "MSKU4491021",
      bill_of_lading: "BL-98401924",
      declared_value_usd: 5450.00,
      customs_origin: "CGP-CHITTAGONG"
    }, null, 2)
  );
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  const executeApiPlayground = () => {
    setApiLoading(true);
    setTimeout(() => {
      let resp: any = {};
      let headers: Record<string, string> = {
        "content-type": "application/json",
        "x-correlation-id": `req_${Math.random().toString(36).substring(2, 10)}`,
        "date": new Date().toUTCString()
      };

      if (apiMockStatus === 200 || apiMockStatus === 201) {
        resp = {
          status: apiMockStatus === 201 ? "CREATED" : "SUCCESS",
          transaction_id: `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          ingested_at: new Date().toISOString(),
          details: "Record successfully verified and ingested into regional logistics queue.",
          downstream_jobs: ["customs_check", "demurrage_audit"]
        };
      } else if (apiMockStatus === 400) {
        resp = {
          error: "BAD_REQUEST",
          message: "Payload failed schema validation. Missing required field: 'bill_of_lading'.",
          validation_errors: [
            { field: "bill_of_lading", rule: "required", received: null }
          ]
        };
      } else if (apiMockStatus === 401) {
        resp = {
          error: "UNAUTHORIZED",
          message: "Bearer access token is expired or signature invalid. Re-authenticate via /oauth/token.",
          code: "AUTH_TOKEN_EXPIRED"
        };
      } else if (apiMockStatus === 403) {
        resp = {
          error: "FORBIDDEN",
          message: "The authenticated Service Principal lacks the 'Logistics.Shipments.Write' scope.",
          required_scope: "Logistics.Shipments.Write"
        };
      } else if (apiMockStatus === 429) {
        headers["retry-after"] = "30";
        headers["x-ratelimit-remaining"] = "0";
        resp = {
          error: "TOO_MANY_REQUESTS",
          message: "Rate limit exceeded: 5 requests per second permitted. Pause before retrying.",
          retry_after_seconds: 30
        };
      } else {
        resp = {
          error: "INTERNAL_SERVER_ERROR",
          message: "Upstream PostgreSQL container database timed out during connection pool acquisition.",
          transient: true
        };
      }

      setApiResponse({
        statusCode: apiMockStatus,
        headers,
        body: resp
      });
      setApiLoading(false);
    }, 400);
  };

  // ─────────────────────────────────────────────────────────────
  // 3. INTERACTIVE ROI CALCULATOR STATE
  // ─────────────────────────────────────────────────────────────
  const [monthlyVolume, setMonthlyVolume] = useState<number>(3200);
  const [manualMinutes, setManualMinutes] = useState<number>(14);
  const [loadedLaborRate, setLoadedLaborRate] = useState<number>(32);
  const [automationRate, setAutomationRate] = useState<number>(85);
  const [upfrontBuildCost, setUpfrontBuildCost] = useState<number>(18000);
  const [annualPlatformCost, setAnnualPlatformCost] = useState<number>(4800);
  const [annualMaintenanceCost, setAnnualMaintenanceCost] = useState<number>(6000);

  // Calculations
  const annualManualHours = (monthlyVolume * manualMinutes * 12) / 60;
  const annualRecoveredHours = annualManualHours * (automationRate / 100);
  const grossAnnualSavings = annualRecoveredHours * loadedLaborRate;
  const totalAnnualOpex = annualPlatformCost + annualMaintenanceCost;
  const netAnnualSavings = grossAnnualSavings - totalAnnualOpex;
  const monthlyNetSavings = netAnnualSavings / 12;
  const paybackPeriodMonths = monthlyNetSavings > 0 ? (upfrontBuildCost / monthlyNetSavings) : 0;
  const threeYearNetBenefit = (netAnnualSavings * 3) - upfrontBuildCost;
  const threeYearRoi = upfrontBuildCost > 0 ? (threeYearNetBenefit / upfrontBuildCost) * 100 : 0;

  // ─────────────────────────────────────────────────────────────
  // 4. FAILURE DEBUGGING GYM STATE
  // ─────────────────────────────────────────────────────────────
  interface DebugChallenge {
    id: string;
    category: string;
    title: string;
    symptom: string;
    errorTrace: string;
    brokenCode: string;
    solutionCode: string;
    explanation: string;
  }

  const DEBUG_CHALLENGES: DebugChallenge[] = [
    {
      id: "auth-401",
      category: "Authentication & Permissions",
      title: "Challenge A: Silent 401 Bearer Token Expiration",
      symptom: "Overnight batch reconciliation crashes at 02:15 AM after running smoothly for exactly 60 minutes.",
      errorTrace: "HTTP 401 Unauthorized: JWT expired at timestamp 1760081400 (exp claim elapsed).",
      brokenCode: `// BROKEN: Hardcoded bearer token evaluated once at startup
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjAwOD...";
const response = await fetch("https://api.erp.internal/v1/invoices", {
  headers: { "Authorization": \`Bearer \${token}\` }
});`,
      solutionCode: `// REPAIRED: Token lifecycle manager with automatic refresh
async function getValidToken() {
  if (!cachedToken || Date.now() > tokenExpiresAt - 300000) { // 5-min safety margin
    const auth = await fetch("https://auth.erp.internal/oauth/token", {
      method: "POST",
      body: JSON.stringify({ grant_type: "client_credentials", client_id, client_secret })
    });
    const data = await auth.json();
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in * 1000);
  }
  return cachedToken;
}
const token = await getValidToken();`,
      explanation: "Access tokens expire hourly by design. Enterprise workflows must evaluate token expiration with a 5-minute safety buffer and dynamically request fresh tokens without crashing."
    },
    {
      id: "schema-null",
      category: "Schema & Payload Mismatch",
      title: "Challenge B: TypeError: Cannot read property 'tax_id' of undefined",
      symptom: "Webhook crashes with a fatal unhandled exception whenever an unregistered retail client submits an order without billing metadata.",
      errorTrace: "TypeError: Cannot read properties of undefined (reading 'tax_id') at Node: Data Transform Line 14",
      brokenCode: `// BROKEN: Unsafe direct object access
const taxId = item.customer.billing_address.tax_id;
const postal = item.customer.billing_address.postal_code;`,
      solutionCode: `// REPAIRED: Safe optional chaining with nullish coalescing
const taxId = item.customer?.billing_address?.tax_id ?? "TAX-EXEMPT-RETAIL";
const postal = item.customer?.billing_address?.postal_code ?? "N/A";`,
      explanation: "In production, external payloads frequently omit optional nested structures. Unshielded dot notation throws fatal TypeErrors, whereas optional chaining (?.) and nullish coalescing (??) provide resilient fallbacks."
    },
    {
      id: "rate-429",
      category: "Rate Limits & Throttling",
      title: "Challenge C: HTTP 429 Retry Storm Congestion",
      symptom: "Workflow hammers external logistics API with 200 concurrent requests, triggering aggressive IP ban for 4 hours.",
      errorTrace: "HTTP 429 Too Many Requests. Headers: Retry-After: 45. Error: Client rate quota exceeded.",
      brokenCode: `// BROKEN: Immediate blind retries in a tight loop
for (let i = 0; i < 5; i++) {
  try {
    return await sendRequest(payload);
  } catch (err) {
    // Retrying immediately with zero delay!
  }
}`,
      solutionCode: `// REPAIRED: Exponential backoff with randomized jitter & Retry-After respect
async function sendWithBackoff(payload, attempt = 1) {
  try {
    return await sendRequest(payload);
  } catch (err) {
    if (err.status === 429 && attempt <= 4) {
      const retryAfter = Number(err.headers['retry-after']) || (2 ** attempt);
      const jitter = Math.random() * 1.5;
      const totalWaitMs = (retryAfter + jitter) * 1000;
      await new Promise(r => setTimeout(r, totalWaitMs));
      return sendWithBackoff(payload, attempt + 1);
    }
    throw err;
  }
}`,
      explanation: "Blind retries exacerbate server congestion. Honoring the Retry-After header and combining exponential backoff with randomized jitter allows recovering servers to handle retry traffic smoothly."
    },
    {
      id: "idempotency-dupe",
      category: "Idempotency & Double Invoicing",
      title: "Challenge D: Duplicate Webhook Double Payment Hazard",
      symptom: "Network disconnect caused partner to resend webhook 3 times, causing customer credit card to be charged $5,450 three times.",
      errorTrace: "Audit Alert: Multiple disbursements registered for identical container order ref 'TXN-9041'.",
      brokenCode: `// BROKEN: Blind non-idempotent database insert
await db.query(
  "INSERT INTO carrier_payments (amount, container_no) VALUES ($1, $2)",
  [amount, containerNo]
);`,
      solutionCode: `// REPAIRED: Idempotency key check with atomic database UPSERT
const idempotencyKey = crypto
  .createHash('sha256')
  .update(\`\${containerNo}-\${invoiceDate}-\${amount}\`)
  .digest('hex');

await db.query(
  \`INSERT INTO carrier_payments (idempotency_key, amount, container_no) 
   VALUES ($1, $2, $3) 
   ON CONFLICT (idempotency_key) DO NOTHING\`,
  [idempotencyKey, amount, containerNo]
);`,
      explanation: "Network glitches guarantee that webhooks will eventually be redelivered. Establishing an idempotency hash and enforcing database unique key constraints guarantees zero duplicate disbursements."
    }
  ];

  const [activeGymChallenge, setActiveGymChallenge] = useState<DebugChallenge>(DEBUG_CHALLENGES[0]);
  const [gymUserCode, setGymUserCode] = useState<string>(DEBUG_CHALLENGES[0].brokenCode);
  const [gymVerified, setGymVerified] = useState<boolean | null>(null);

  const handleSelectChallenge = (c: DebugChallenge) => {
    setActiveGymChallenge(c);
    setGymUserCode(c.brokenCode);
    setGymVerified(null);
  };

  const handleApplyFix = () => {
    setGymUserCode(activeGymChallenge.solutionCode);
    setGymVerified(true);
  };

  const handleTestFix = () => {
    // If the code contains key elements of the solution
    if (gymUserCode.includes("??") || gymUserCode.includes("getValidToken") || gymUserCode.includes("jitter") || gymUserCode.includes("ON CONFLICT")) {
      setGymVerified(true);
    } else {
      setGymVerified(false);
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-xl border-2 border-indigo-500 shadow-[6px_6px_0px_0px_#4f46e5] space-y-6" style={{ background: "var(--corp-surface)" }}>
      {/* Studio Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-corp-border pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
            <Workflow size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold font-mono uppercase tracking-wide" style={{ color: "var(--corp-text)" }}>
                Enterprise Workflow & Automation Studio
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                n8n · Power Automate · CEAS Engine
              </span>
            </div>
            <p className="text-xs font-mono text-indigo-400 font-semibold mt-0.5">
              Interactive Workflow Canvas · Node Inspector · Mock API Sandbox · ROI Financial Modeling · Debugging Gym
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1.5 bg-corp-bg-secondary p-1 rounded-lg border border-corp-border">
          <button
            onClick={() => setActiveTab("canvas")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === "canvas" ? "bg-indigo-600 text-white shadow-sm" : "text-corp-text hover:text-indigo-400"
            }`}
          >
            <Workflow size={13} />
            <span>1. Workflow Canvas</span>
          </button>
          <button
            onClick={() => setActiveTab("trace")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === "trace" ? "bg-indigo-600 text-white shadow-sm" : "text-corp-text hover:text-indigo-400"
            }`}
          >
            <Terminal size={13} />
            <span>2. Execution Trace</span>
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === "playground" ? "bg-indigo-600 text-white shadow-sm" : "text-corp-text hover:text-indigo-400"
            }`}
          >
            <Globe size={13} />
            <span>3. API Playground</span>
          </button>
          <button
            onClick={() => setActiveTab("roi")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === "roi" ? "bg-indigo-600 text-white shadow-sm" : "text-corp-text hover:text-indigo-400"
            }`}
          >
            <TrendingUp size={13} />
            <span>4. ROI Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab("gym")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activeTab === "gym" ? "bg-indigo-600 text-white shadow-sm" : "text-corp-text hover:text-indigo-400"
            }`}
          >
            <AlertTriangle size={13} />
            <span>5. Debugging Gym</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: WORKFLOW CANVAS & NODE INSPECTOR
          ───────────────────────────────────────────────────────────── */}
      {activeTab === "canvas" && (
        <div className="space-y-6">
          {/* Canvas Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-corp-bg-secondary border border-corp-border text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-corp-text">Pipeline Status: ACTIVE ORCHESTRATION</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-400">Step {executionStep + 1} of {WORKFLOW_NODES.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={runSimulationStep}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
              >
                <Play size={12} />
                <span>Next Step ({executionStep + 1}/{WORKFLOW_NODES.length})</span>
              </button>
              <button
                onClick={() => { setExecutionStep(0); setSelectedNodeId(WORKFLOW_NODES[0].id); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-corp-surface border border-corp-border hover:bg-slate-800 text-slate-300 font-bold transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Interactive Pipeline Node Graph */}
          <div className="p-4 rounded-xl bg-[#090d16] border-2 border-corp-border/70 overflow-x-auto">
            <div className="text-[11px] font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>VISUAL EXECUTION PIPELINE (CLICK ANY NODE TO INSPECT PAYLOAD & SPECS):</span>
              <span className="text-indigo-400">Selected: {selectedNode.label}</span>
            </div>
            <div className="flex items-center gap-3 min-w-[900px] py-4">
              {WORKFLOW_NODES.map((node, idx) => {
                const isSelected = node.id === selectedNodeId;
                const isCurrentStep = idx === executionStep;
                return (
                  <div key={node.id} className="flex items-center">
                    <button
                      onClick={() => { setSelectedNodeId(node.id); setExecutionStep(idx); }}
                      className={`relative flex flex-col items-start p-3 rounded-lg border-2 text-left transition-all w-48 ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-950/40 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                          : isCurrentStep
                          ? "border-emerald-400 bg-emerald-950/20"
                          : "border-slate-800 bg-[#0f172a]/80 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          node.category === "trigger" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                          node.category === "http" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                          node.category === "ai" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" :
                          node.category === "approval" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" :
                          node.category === "database" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                          node.category === "dlq" ? "bg-red-500/20 text-red-300 border border-red-500/30" :
                          "bg-slate-700 text-slate-300"
                        }`}>
                          {node.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-500">#{idx + 1}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-100 truncate w-full">
                        {node.label}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1 truncate w-full">
                        {node.status === "success" && <span className="text-emerald-400">✓ Completed</span>}
                        {node.status === "warning" && <span className="text-amber-400">⚠ Gate Active</span>}
                        {node.status === "idle" && <span className="text-slate-500">○ Ready</span>}
                      </div>
                    </button>

                    {/* Connecting Arrow */}
                    {idx < WORKFLOW_NODES.length - 1 && (
                      <div className="px-2 text-slate-600">
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Inspector Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left: Node Info & Configuration */}
            <div className="lg:col-span-1 p-5 rounded-xl bg-corp-bg-secondary border border-corp-border space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-corp-border pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-100">{selectedNode.label}</h4>
                  <span className="text-[10px] text-indigo-400 uppercase font-bold">Category: {selectedNode.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Operational Purpose:</span>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">{selectedNode.description}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Node Configuration:</span>
                <pre className="p-3 rounded-lg bg-[#0d1117] border border-slate-800 text-slate-200 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {selectedNode.config}
                </pre>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Security & Governance Note:</span>
                <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-indigo-200 text-[11px] leading-relaxed">
                  {selectedNode.securityNotes}
                </div>
              </div>
            </div>

            {/* Right: Input vs Output Payload Inspector */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Input Sample */}
              <div className="p-4 rounded-xl bg-[#0d1117] border border-slate-800 flex flex-col h-[380px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono">
                  <span className="font-bold text-slate-300 uppercase">Input Payload ($json.in)</span>
                  <button
                    onClick={() => handleCopyJson(selectedNode.inputSample)}
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
                  >
                    {copiedJson ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="flex-1 overflow-auto font-mono text-[11px] text-slate-300 leading-relaxed">
                  <pre>{JSON.stringify(selectedNode.inputSample, null, 2)}</pre>
                </div>
              </div>

              {/* Output Sample */}
              <div className="p-4 rounded-xl bg-[#0d1117] border border-slate-800 flex flex-col h-[380px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono">
                  <span className="font-bold text-emerald-400 uppercase">Emitted Payload ($json.out)</span>
                  <button
                    onClick={() => handleCopyJson(selectedNode.outputSample)}
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
                  >
                    {copiedJson ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="flex-1 overflow-auto font-mono text-[11px] text-emerald-300/90 leading-relaxed">
                  <pre>{JSON.stringify(selectedNode.outputSample, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: EXECUTION TRACE
          ───────────────────────────────────────────────────────────── */}
      {activeTab === "trace" && (
        <div className="space-y-5 font-mono text-xs">
          <div className="p-4 rounded-xl bg-corp-bg-secondary border border-corp-border flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-100">Live Execution Audit Trail</h4>
              <p className="text-[11px] text-slate-400">Execution ID: #EX-2026-9041-NEXUS · Duration: 842ms · Terminal Status: SUCCESS</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              ALL NODES AUDITED
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-corp-border bg-[#0d1117]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161b22] border-b border-corp-border/60 text-slate-400 text-[11px]">
                <tr>
                  <th className="p-3">Step</th>
                  <th className="p-3">Node Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500">01</td>
                  <td className="p-3 font-bold text-slate-100">Inbound Carrier Webhook</td>
                  <td className="p-3 text-amber-400">Webhook Trigger</td>
                  <td className="p-3"><span className="text-emerald-400">● 200 Succeeded</span></td>
                  <td className="p-3 text-slate-400">42ms</td>
                  <td className="p-3 text-slate-300">HMAC-SHA256 signature verified against Maersk secret key</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500">02</td>
                  <td className="p-3 font-bold text-slate-100">Schema Validation Gate</td>
                  <td className="p-3 text-blue-400">Code Node</td>
                  <td className="p-3"><span className="text-emerald-400">● 200 Succeeded</span></td>
                  <td className="p-3 text-slate-400">8ms</td>
                  <td className="p-3 text-slate-300">JSON Schema draft-07 verified; container_no format matches ISO 6346</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500">03</td>
                  <td className="p-3 font-bold text-slate-100">Customs Clearance API</td>
                  <td className="p-3 text-indigo-400">HTTP Request</td>
                  <td className="p-3"><span className="text-emerald-400">● 200 Succeeded</span></td>
                  <td className="p-3 text-slate-400">184ms</td>
                  <td className="p-3 text-slate-300">Retrieved customs status 'CLEARED_FOR_RELEASE' via Bearer token</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500">04</td>
                  <td className="p-3 font-bold text-slate-100">Document AI Extractor</td>
                  <td className="p-3 text-purple-400">AI Task (LLM)</td>
                  <td className="p-3"><span className="text-emerald-400">● 200 Succeeded</span></td>
                  <td className="p-3 text-slate-400">410ms</td>
                  <td className="p-3 text-slate-300">Extracted $5,450.00 total across 2 demurrage days; confidence: 0.984</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500">05</td>
                  <td className="p-3 font-bold text-slate-100">Approval Threshold Gateway</td>
                  <td className="p-3 text-amber-400">Condition (IF)</td>
                  <td className="p-3"><span className="text-amber-400">▲ Branched</span></td>
                  <td className="p-3 text-slate-400">4ms</td>
                  <td className="p-3 text-slate-300">Amount &gt; $3,000 threshold triggered; routed to human approval lane</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500">06</td>
                  <td className="p-3 font-bold text-slate-100">Microsoft Teams Approval Card</td>
                  <td className="p-3 text-rose-400">Adaptive Card</td>
                  <td className="p-3"><span className="text-emerald-400">● 200 Approved</span></td>
                  <td className="p-3 text-slate-400">165ms</td>
                  <td className="p-3 text-slate-300">Signed off by Farhana Haque (Regional Logistics Manager)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500">07</td>
                  <td className="p-3 font-bold text-slate-100">PostgreSQL Ledger Write</td>
                  <td className="p-3 text-emerald-400">Database SQL</td>
                  <td className="p-3"><span className="text-emerald-400">● 200 Written</span></td>
                  <td className="p-3 text-slate-400">29ms</td>
                  <td className="p-3 text-slate-300">Row inserted with idempotency key; total duration 842ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: MOCK API PLAYGROUND
          ───────────────────────────────────────────────────────────── */}
      {activeTab === "playground" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-4 rounded-xl bg-corp-bg-secondary border border-corp-border">
            <h4 className="font-bold text-sm text-slate-100">Interactive API Request & Status Sandbox</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Test real HTTP methods, headers, payloads, and simulate error codes (401, 429, 500) to verify workflow recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Builder */}
            <div className="p-5 rounded-xl bg-corp-bg-secondary border border-corp-border space-y-4">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
                1. Request Parameters
              </span>

              {/* Method and Endpoint */}
              <div className="flex gap-2">
                <select
                  value={apiMethod}
                  onChange={(e) => setApiMethod(e.target.value as any)}
                  className="px-3 py-2 rounded-lg bg-[#0d1117] border border-corp-border text-slate-100 font-bold"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#0d1117] border border-corp-border text-slate-200"
                />
              </div>

              {/* Status Simulator Select */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Simulate Target Response Status:</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {[200, 201, 400, 401, 429, 500].map((code) => (
                    <button
                      key={code}
                      onClick={() => setApiMockStatus(code)}
                      className={`px-2 py-1.5 rounded text-center font-bold text-[11px] transition-all ${
                        apiMockStatus === code
                          ? code < 300
                            ? "bg-emerald-600 text-white"
                            : code < 500
                            ? "bg-amber-600 text-white"
                            : "bg-rose-600 text-white"
                          : "bg-[#0d1117] text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Request Body Editor */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">JSON Request Body:</label>
                <textarea
                  value={apiRequestBody}
                  onChange={(e) => setApiRequestBody(e.target.value)}
                  rows={8}
                  className="w-full p-3 rounded-lg bg-[#0d1117] border border-corp-border text-slate-200 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={executeApiPlayground}
                disabled={apiLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
              >
                {apiLoading ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                <span>{apiLoading ? "Dispatching HTTP Call..." : "Execute Mock API Call"}</span>
              </button>
            </div>

            {/* Response Inspector */}
            <div className="p-5 rounded-xl bg-[#0d1117] border border-corp-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                    2. Response Inspector
                  </span>
                  {apiResponse && (
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      apiResponse.statusCode < 300
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : apiResponse.statusCode < 500
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}>
                      HTTP {apiResponse.statusCode}
                    </span>
                  )}
                </div>

                {apiResponse ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Response Headers:</span>
                      <pre className="p-2.5 rounded bg-[#161b22] text-[10px] text-slate-400 overflow-x-auto">
                        {JSON.stringify(apiResponse.headers, null, 2)}
                      </pre>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Response Body:</span>
                      <pre className="p-3 rounded bg-[#161b22] text-[11px] text-slate-200 overflow-x-auto leading-relaxed max-h-[220px]">
                        {JSON.stringify(apiResponse.body, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-center">
                    <Globe size={32} className="mb-2 opacity-40" />
                    <p>Select target status code and click "Execute Mock API Call" to inspect response payload and headers.</p>
                  </div>
                )}
              </div>

              {apiResponse && (
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-[11px] text-indigo-300 mt-4">
                  <strong>Architectural Diagnostic:</strong>{" "}
                  {apiResponse.statusCode === 429 && "Inspect the 'retry-after' header and execute exponential backoff with jitter."}
                  {apiResponse.statusCode === 401 && "Trigger your OAuth 2.0 Client Credentials token refresh pipeline immediately."}
                  {apiResponse.statusCode === 400 && "Do NOT retry automatically. Route the invalid payload to the Dead-Letter Queue (DLQ)."}
                  {apiResponse.statusCode < 300 && "Transaction successful. Safe to proceed to downstream database insertion."}
                  {apiResponse.statusCode >= 500 && "Transient upstream failure. Eligible for up to 3 automatic retries."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: INTERACTIVE ROI CALCULATOR
          ───────────────────────────────────────────────────────────── */}
      {activeTab === "roi" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-4 rounded-xl bg-corp-bg-secondary border border-corp-border">
            <h4 className="font-bold text-sm text-slate-100">Enterprise Automation ROI & Financial Payback Model</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Empirical baseline financial modeling: compute hours recovered, net annual savings, payback period, and 3-year ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inputs Panel */}
            <div className="p-5 rounded-xl bg-corp-bg-secondary border border-corp-border space-y-4">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
                1. Operational & Financial Assumptions
              </span>

              {/* Monthly Volume */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-bold">Monthly Transaction Volume:</span>
                  <span className="text-indigo-400 font-bold">{monthlyVolume.toLocaleString()} items / mo</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Manual Handling Time */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-bold">Baseline Manual Handling Time:</span>
                  <span className="text-indigo-400 font-bold">{manualMinutes} minutes / item</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="45"
                  step="1"
                  value={manualMinutes}
                  onChange={(e) => setManualMinutes(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Loaded Labor Rate */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-bold">Fully Loaded Hourly Labor Rate:</span>
                  <span className="text-indigo-400 font-bold">${loadedLaborRate} / hr</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="2"
                  value={loadedLaborRate}
                  onChange={(e) => setLoadedLaborRate(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Target Automation Rate */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-bold">Straight-Through Automation Rate:</span>
                  <span className="text-emerald-400 font-bold">{automationRate}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="98"
                  step="1"
                  value={automationRate}
                  onChange={(e) => setAutomationRate(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Cost Inputs Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-corp-border/60">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Build CAPEX ($):</label>
                  <input
                    type="number"
                    value={upfrontBuildCost}
                    onChange={(e) => setUpfrontBuildCost(Number(e.target.value))}
                    className="w-full p-1.5 rounded bg-[#0d1117] border border-corp-border text-slate-100 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">License OPEX ($/yr):</label>
                  <input
                    type="number"
                    value={annualPlatformCost}
                    onChange={(e) => setAnnualPlatformCost(Number(e.target.value))}
                    className="w-full p-1.5 rounded bg-[#0d1117] border border-corp-border text-slate-100 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Maint. OPEX ($/yr):</label>
                  <input
                    type="number"
                    value={annualMaintenanceCost}
                    onChange={(e) => setAnnualMaintenanceCost(Number(e.target.value))}
                    className="w-full p-1.5 rounded bg-[#0d1117] border border-corp-border text-slate-100 text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Results & Executive Summary */}
            <div className="p-5 rounded-xl bg-[#090d16] border-2 border-indigo-500/40 flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-4">
                  2. Executive Financial Return Metrics
                </span>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="p-3.5 rounded-lg bg-[#0f172a] border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Hours Recovered / Year</span>
                    <span className="text-xl font-extrabold text-indigo-400 mt-1 block">
                      {Math.round(annualRecoveredHours).toLocaleString()} hrs
                    </span>
                    <span className="text-[10px] text-slate-500">Baseline: {Math.round(annualManualHours).toLocaleString()} hrs</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0f172a] border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Net Annual Cash Savings</span>
                    <span className="text-xl font-extrabold text-emerald-400 mt-1 block">
                      ${Math.round(netAnnualSavings).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500">Gross: ${Math.round(grossAnnualSavings).toLocaleString()}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0f172a] border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Simple Payback Period</span>
                    <span className="text-xl font-extrabold text-amber-400 mt-1 block">
                      {paybackPeriodMonths.toFixed(1)} Months
                    </span>
                    <span className="text-[10px] text-slate-500">Break-even timeline</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0f172a] border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">3-Year Projected ROI</span>
                    <span className="text-xl font-extrabold text-purple-400 mt-1 block">
                      {Math.round(threeYearRoi).toLocaleString()}%
                    </span>
                    <span className="text-[10px] text-slate-500">Net: ${Math.round(threeYearNetBenefit).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-[11px] text-slate-300 leading-relaxed">
                  <strong>Boardroom Proposal Summary:</strong> Investing <strong>${upfrontBuildCost.toLocaleString()}</strong> upfront delivers <strong>{Math.round(annualRecoveredHours).toLocaleString()} hours</strong> of capacity back to operations. The automation breaks even in <strong>{paybackPeriodMonths.toFixed(1)} months</strong> and generates <strong>${Math.round(threeYearNetBenefit).toLocaleString()}</strong> in cumulative net 3-year value.
                </div>
              </div>

              <p className="text-[10px] text-slate-500 italic mt-4">
                * Note: Financial projections are mathematical models based on fully loaded labor rate assumptions and estimated automation rates. Actual corporate savings vary by operational adoption and wage scale.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: FAILURE-DRIVEN DEBUGGING GYM
          ───────────────────────────────────────────────────────────── */}
      {activeTab === "gym" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-4 rounded-xl bg-corp-bg-secondary border border-corp-border">
            <h4 className="font-bold text-sm text-slate-100">Enterprise Failure-Driven Debugging Gym</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Diagnose and repair real production failure modes: token expirations, null reference TypeErrors, rate limits, and duplicate transactions.
            </p>
          </div>

          {/* Challenge Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {DEBUG_CHALLENGES.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleSelectChallenge(ch)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  activeGymChallenge.id === ch.id
                    ? "bg-indigo-950/50 border-indigo-400 text-white shadow-sm"
                    : "bg-[#0d1117] border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="text-[9px] uppercase font-bold text-indigo-400 block mb-0.5">{ch.category}</span>
                <span className="font-bold text-xs truncate block">{ch.title}</span>
              </button>
            ))}
          </div>

          {/* Active Challenge Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Symptom & Error Diagnostic */}
            <div className="p-5 rounded-xl bg-corp-bg-secondary border border-corp-border space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Observed Failure Symptom:</span>
                <p className="text-slate-200 font-sans text-xs">{activeGymChallenge.symptom}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">Production Error Trace:</span>
                <pre className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-rose-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {activeGymChallenge.errorTrace}
                </pre>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Root-Cause Engineering Analysis:</span>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">{activeGymChallenge.explanation}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleApplyFix}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Reveal Reference Solution Fix
                </button>
              </div>
            </div>

            {/* Right: Code Fix Editor */}
            <div className="p-5 rounded-xl bg-[#0d1117] border border-corp-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[11px] font-bold text-slate-300 uppercase">Configuration / Code Editor</span>
                  <span className="text-[10px] text-slate-500">JavaScript / Expression Engine</span>
                </div>

                <textarea
                  value={gymUserCode}
                  onChange={(e) => setGymUserCode(e.target.value)}
                  rows={12}
                  className="w-full p-3 rounded-lg bg-[#161b22] border border-slate-800 text-slate-200 font-mono text-[11px] leading-relaxed focus:outline-none focus:border-indigo-500"
                />

                {gymVerified === true && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span><strong>VERIFICATION PASSED!</strong> Code logic correctly guards against failure and handles edge-cases.</span>
                  </div>
                )}

                {gymVerified === false && (
                  <div className="mt-3 p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-300 text-xs flex items-center gap-2">
                    <XCircle size={16} className="text-rose-400 shrink-0" />
                    <span><strong>VERIFICATION FAILED:</strong> The current code does not resolve the error condition. Check syntax or click 'Reveal Reference Solution Fix'.</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-2">
                <button
                  onClick={handleTestFix}
                  className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Play size={13} />
                  <span>Test & Verify Fix</span>
                </button>
                <button
                  onClick={() => { setGymUserCode(activeGymChallenge.brokenCode); setGymVerified(null); }}
                  className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
