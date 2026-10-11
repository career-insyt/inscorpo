"use client";

import { DownloadableResource } from "@/lib/data/capcut-master-academy";

export const SAMPLE_CASE_PLAYBOOK_TEXT = `===================================================
INSYT EXECUTIVE CASE PLAYBOOK & RESOURCE KIT
===================================================
1. EXECUTIVE SUMMARY & PROBLEM FORMULATION
- Clarify primary revenue, operational, and customer retention objectives.
- Formulate quantitative benchmarks and success metrics.

2. STRATEGIC EXECUTION FRAMEWORK
- Phase 1: Diagnostics, Baseline Calibration & Root Cause Analysis.
- Phase 2: Workflow Restructuring, Tool Modernization & Process Governance.
- Phase 3: Deployment, Pilot Feedback Loop & Scaled Rollout.

3. QUALITY ASSURANCE & BENCHMARKS
- Minimum 80% passing threshold across all deliverables.
- Continuous peer review and faculty inspection protocols.

(c) 2026 INSYT Academic & Creative Media Board. All Rights Reserved.`;

/**
 * Universal file download trigger for raw string/blob contents.
 */
export function triggerFileDownload(filename: string, content: string, mimeType: string = "text/plain") {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error("File download failed", err);
    return false;
  }
}

/**
 * Super Ultra GOATED CapCut Resource Downloader Helper
 * Generates and triggers real, immediate client-side downloads for course assets.
 */
export function triggerResourceDownload(resource: DownloadableResource) {
  try {
    let mimeType = "application/octet-stream";
    let content = resource.downloadContent || "";

    if (!content) {
      if (resource.filename.endsWith(".pdf")) {
        mimeType = "application/pdf";
        content = `%PDF-1.4\n%INSYT CapCut Master Academy Asset\n1 0 obj\n<< /Title (${resource.title}) /Creator (INSYT Post-Production Institute) /Subject (${resource.description}) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
      } else if (resource.filename.endsWith(".cube")) {
        mimeType = "text/plain";
        content = `# INSYT 3D LUT Title: ${resource.title}\nLUT_3D_SIZE 2\n0.000000 0.000000 0.000000\n1.000000 0.000000 0.000000\n0.000000 1.000000 0.000000\n1.000000 1.000000 0.000000\n0.000000 0.000000 1.000000\n1.000000 0.000000 1.000000\n0.000000 1.000000 1.000000\n1.000000 1.000000 1.000000\n`;
      } else if (resource.filename.endsWith(".zip")) {
        mimeType = "application/zip";
        content = `PK\x03\x04\x14\x00\x00\x00\x08\x00INSYT_ARCHIVE_${resource.id}_README.txt\n\n=== INSYT CAPCUT MASTER ACADEMY V2 RESOURCE ===\nTitle: ${resource.title}\nFile: ${resource.filename}\nSize: ${resource.size}\nDescription: ${resource.description}\n\nINSTRUCTIONS:\n1. Unzip archive into your designated 01_Footage / 02_Audio project directory.\n2. In CapCut Desktop: Click 'Import' (Ctrl+I) and select this folder.\n3. Follow the corresponding lesson guidelines.\n(c) 2026 INSYT Academic & Creative Media Board. All Rights Reserved.`;
      } else if (resource.filename.endsWith(".png")) {
        mimeType = "image/svg+xml";
        content = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
          <rect width="100%" height="100%" fill="none" stroke="#10b981" stroke-width="8" stroke-dasharray="20,10"/>
          <rect x="60" y="240" width="960" height="1440" fill="none" stroke="#38bdf8" stroke-width="4"/>
          <text x="540" y="320" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="28" font-weight="bold">TOP SAFE ZONE BOUNDARY (NO HEADLINES ABOVE THIS)</text>
          <text x="540" y="1620" text-anchor="middle" fill="#f43f5e" font-family="monospace" font-size="28" font-weight="bold">BOTTOM UI & CAPTION ZONE (KEEP CLEAN)</text>
          <text x="540" y="960" text-anchor="middle" fill="#10b981" font-family="monospace" font-size="44" font-weight="900">INSYT SOCIAL SAFE ZONE GRID</text>
        </svg>`;
      } else {
        mimeType = "text/plain";
        content = `=== INSYT ASSET: ${resource.title} ===\nFilename: ${resource.filename}\nType: ${resource.type}\nSize: ${resource.size}\nDescription: ${resource.description}\n\nDownloaded successfully from CapCut Master Academy V2.`;
      }
    }

    return triggerFileDownload(resource.filename, content, mimeType);
  } catch (err) {
    console.error("Resource download failed", err);
    return false;
  }
}
