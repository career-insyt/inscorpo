import { verifyJobLinkHealth } from "../lib/jobs/link-health-runner.ts";

const testJobs = [
  {
    id: "BARI-AUDIT",
    title: "Scientific Officer",
    organizationName: "Bangladesh Agricultural Research Institute",
    officialPortalUrl: "http://bari.teletalk.com.bd",
    waybackSnapshotUrl: null,
  },
  {
    id: "BINA-AUDIT",
    title: "Scientific Officer",
    organizationName: "Bangladesh Institute of Nuclear Agriculture",
    officialPortalUrl: "http://bina.teletalk.com.bd",
    waybackSnapshotUrl: null,
  },
  {
    id: "BRRI-AUDIT",
    title: "Senior Scientific Officer",
    organizationName: "Bangladesh Rice Research Institute",
    officialPortalUrl: "http://brri.teletalk.com.bd",
    waybackSnapshotUrl: null,
  },
  {
    id: "TELETALK-ALLJOBS-AUDIT",
    title: "Govt Job Directory",
    organizationName: "Teletalk Bangladesh",
    officialPortalUrl: "https://alljobs.teletalk.com.bd/jobs/government",
    waybackSnapshotUrl: null,
  },
  {
    id: "BB-ERECRUITMENT-AUDIT",
    title: "Assistant Director General",
    organizationName: "Bangladesh Bank",
    officialPortalUrl: "https://erecruitment.bb.org.bd/onlineapp/joblist.php",
    waybackSnapshotUrl: null,
  },
];

async function run() {
  console.log("=== EXECUTING LIVE LINK HEALTH SWEEPER AUDIT ===");
  for (const job of testJobs) {
    console.log(`\nProbing: ${job.organizationName} (${job.officialPortalUrl})...`);
    const start = Date.now();
    try {
      const result = await verifyJobLinkHealth(job);
      const elapsed = Date.now() - start;
      console.log(`- Result (${elapsed}ms):`);
      console.log(`  Live: ${result.isLive}`);
      console.log(`  HTTP Status: ${result.httpStatus}`);
      console.log(`  Soft-404 / Closed: ${result.detectedSoft404OrClosed}`);
      console.log(`  Closure Reason: ${result.closureReason}`);
      console.log(`  Wayback Snapshot URL: ${result.waybackSnapshotUrl}`);
    } catch (err) {
      console.error(`- FAILED with error:`, err.message);
    }
  }
}

run();
