// Live test harvest script for audit verification
async function testHackerNews() {
  console.log("\n[1] Probing live Hacker News Firebase API...");
  const start = Date.now();
  try {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=3&orderBy=\"$key\"");
    const ids = await res.json();
    console.log(`  HN Top Stories (${Date.now() - start}ms): Found IDs`, ids.slice(0, 3));
    if (ids.length > 0) {
      const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[0]}.json`);
      const item = await itemRes.json();
      console.log(`  Sample Story: "${item.title}" by ${item.by}`);
    }
  } catch (e) {
    console.log("  HN error:", e.message);
  }
}

async function testRemoteOK() {
  console.log("\n[2] Probing live RemoteOK public API...");
  const start = Date.now();
  try {
    const res = await fetch("https://remoteok.com/api?tag=dev", {
      headers: { "User-Agent": "CareerINSYT-Harvester/1.0 (Mozilla/5.0)" }
    });
    console.log(`  RemoteOK HTTP Status: ${res.status} (${Date.now() - start}ms)`);
    if (res.ok) {
      const data = await res.json();
      console.log(`  RemoteOK Total Items returned: ${data.length}`);
      // Item [0] is legal disclaimer
      if (data.length > 1) {
        const sample = data[1];
        console.log(`  Sample Job: "${sample.position}" at "${sample.company}" (Location: ${sample.location || 'Anywhere'})`);
        console.log(`  URL: ${sample.url}`);
      }
    }
  } catch (e) {
    console.log("  RemoteOK error:", e.message);
  }
}

async function testGreenhouse() {
  console.log("\n[3] Probing live Greenhouse Public Board (e.g. Gitlab)...");
  const start = Date.now();
  try {
    const res = await fetch("https://boards-api.greenhouse.io/v1/boards/gitlab/jobs");
    console.log(`  Greenhouse HTTP Status: ${res.status} (${Date.now() - start}ms)`);
    if (res.ok) {
      const data = await res.json();
      console.log(`  Gitlab Open Positions: ${data.jobs?.length || 0}`);
      if (data.jobs?.length > 0) {
        console.log(`  Sample Position: "${data.jobs[0].title}" (ID: ${data.jobs[0].id})`);
      }
    }
  } catch (e) {
    console.log("  Greenhouse error:", e.message);
  }
}

async function run() {
  console.log("=== EXECUTING DIRECT TEST HARVEST OF EXTERNAL JOB ENDPOINTS ===");
  await testHackerNews();
  await testRemoteOK();
  await testGreenhouse();
}

run();
