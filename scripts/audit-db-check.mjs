import { Client, Databases } from 'node-appwrite';
import fs from 'fs';

// Read .env.local
let endpoint = 'https://sgp.cloud.appwrite.io/v1';
let project = '6a55c66500032e142d85';
let databaseId = '6a56075800013fce1aa1';

try {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  envContent.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (!k || !v) return;
    const key = k.trim();
    const val = v.trim().replace(/^["']|["']$/g, '');
    if (key === 'NEXT_PUBLIC_APPWRITE_ENDPOINT') endpoint = val;
    if (key === 'NEXT_PUBLIC_APPWRITE_PROJECT') project = val;
    if (key === 'NEXT_PUBLIC_APPWRITE_DATABASE_ID') databaseId = val;
  });
} catch (e) {
  console.log('Error reading .env.local:', e.message);
}

const client = new Client().setEndpoint(endpoint).setProject(project);
const dbs = new Databases(client);

async function inspect() {
  console.log('=== APPWRITE DATABASE AUDIT ===');
  console.log('Endpoint:', endpoint);
  console.log('Project:', project);
  console.log('Database ID:', databaseId);

  try {
    const res = await dbs.listCollections(databaseId);
    console.log('\nTotal Collections:', res.total);
    res.collections.forEach(c => {
      console.log(`- Collection Name: "${c.name}", ID: "${c.$id}"`);
    });

    // Check if canonical_jobs or jobs collection exists
    const jobColl = res.collections.find(c => c.name.toLowerCase().includes('job') || c.$id.toLowerCase().includes('job'));
    console.log('\nJob related collections:', jobColl ? `${jobColl.name} (${jobColl.$id})` : 'NONE FOUND');

    if (jobColl) {
      const docs = await dbs.listDocuments(databaseId, jobColl.$id);
      console.log(`Documents count in ${jobColl.name}:`, docs.total);
    }
  } catch (err) {
    console.log('Appwrite API error (check API key or permissions):', err.message);
  }
}

inspect();
