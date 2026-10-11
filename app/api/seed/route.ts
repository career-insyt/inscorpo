import { NextResponse } from "next/server";
import { Client, Databases } from "node-appwrite";

// Note: Ensure APPWRITE_API_KEY has sufficient scopes: collections.write, documents.write, databases.read
export async function POST(req: Request) {
  try {
    const adminSecret = req.headers.get("x-admin-secret");
    const expectedSecret = process.env.ADMIN_SECRET_KEY;

    if (!expectedSecret || adminSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized access to database seed endpoint" }, { status: 401 });
    }

    const reqBody = await req.json().catch(() => ({}));
    // API key must come from server environment only — never from request body
    const apiKey = process.env.APPWRITE_API_KEY;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

    if (!apiKey || !endpoint || !projectId || !databaseId) {
      return NextResponse.json({ error: "Server Appwrite environment variables (API Key, Endpoint, Project, Database) are required" }, { status: 400 });
    }

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);

    const databases = new Databases(client);

    const collections = [
      { id: "profiles", name: "Profiles" },
      { id: "tasks", name: "Tasks" },
      { id: "events", name: "Events" },
      { id: "paths", name: "Paths" },
      { id: "courses", name: "Courses" },
    ];

    const results = [];

    // Create Collections (this might throw if they already exist, we will catch and ignore)
    for (const coll of collections) {
      try {
        await databases.createCollection(databaseId, coll.id, coll.name);
        results.push(`Created collection: ${coll.name}`);
      } catch (err: any) {
        if (err.code === 409) {
          results.push(`Collection exists: ${coll.name}`);
        } else {
          results.push(`Failed to create ${coll.name}: ${err.message}`);
        }
      }
    }

    // Delay to let Appwrite process the collection creation before adding attributes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create Attributes
    const attrs = [
      // Profiles
      { type: "string", coll: "profiles", key: "name", req: true, max: 255 },
      { type: "integer", coll: "profiles", key: "xp", req: true },
      { type: "integer", coll: "profiles", key: "level", req: true },
      { type: "integer", coll: "profiles", key: "streak", req: true },
      { type: "string", coll: "profiles", key: "email", req: true, max: 255 },

      // Tasks
      { type: "string", coll: "tasks", key: "title", req: true, max: 255 },
      { type: "integer", coll: "tasks", key: "xp", req: true },

      // Events
      { type: "string", coll: "events", key: "title", req: true, max: 255 },
      { type: "string", coll: "events", key: "date", req: true, max: 255 },
      { type: "string", coll: "events", key: "time", req: true, max: 255 },
      { type: "string", coll: "events", key: "type", req: true, max: 255 },

      // Paths
      { type: "string", coll: "paths", key: "slug", req: true, max: 255 },
      { type: "string", coll: "paths", key: "title", req: true, max: 255 },
      { type: "string", coll: "paths", key: "description", req: true, max: 1000 },
      { type: "integer", coll: "paths", key: "modules", req: true },
      { type: "integer", coll: "paths", key: "hours", req: true },
      { type: "integer", coll: "paths", key: "students", req: true },
      { type: "float", coll: "paths", key: "rating", req: true },
      { type: "string", coll: "paths", key: "icon", req: true, max: 255 },
      { type: "string", coll: "paths", key: "gradient", req: true, max: 255 },
      { type: "stringArray", coll: "paths", key: "topics", req: true },

      // Courses
      { type: "string", coll: "courses", key: "slug", req: true, max: 255 },
      { type: "string", coll: "courses", key: "pathSlug", req: true, max: 255 },
      { type: "string", coll: "courses", key: "title", req: true, max: 255 },
      { type: "string", coll: "courses", key: "description", req: true, max: 1000 },
      { type: "integer", coll: "courses", key: "lessons", req: true },
      { type: "integer", coll: "courses", key: "hours", req: true },
      { type: "integer", coll: "courses", key: "xp", req: true },
      { type: "boolean", coll: "courses", key: "locked", req: true },
      { type: "stringArray", coll: "courses", key: "skills", req: true },
    ];

    for (const attr of attrs) {
      try {
        if (attr.type === "string") {
          await databases.createStringAttribute(databaseId, attr.coll, attr.key, attr.max!, attr.req);
        } else if (attr.type === "integer") {
          await databases.createIntegerAttribute(databaseId, attr.coll, attr.key, attr.req);
        } else if (attr.type === "float") {
          await databases.createFloatAttribute(databaseId, attr.coll, attr.key, attr.req);
        } else if (attr.type === "boolean") {
          await databases.createBooleanAttribute(databaseId, attr.coll, attr.key, attr.req);
        } else if (attr.type === "stringArray") {
          await databases.createStringAttribute(databaseId, attr.coll, attr.key, 255, attr.req, undefined, true);
        }
        results.push(`Created attribute: ${attr.coll}.${attr.key}`);
      } catch (err: any) {
        if (err.code === 409) {
          results.push(`Attribute exists: ${attr.coll}.${attr.key}`);
        } else {
          results.push(`Failed to create attr ${attr.coll}.${attr.key}: ${err.message}`);
        }
      }
    }

    // Delay again for attributes to propagate
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Seed Data
    const seedPaths = [
      {
        slug: "video-ai-production",
        title: "Video Editing + AI Production",
        description: "From CapCut Social Videos to AI-Assisted Professional Production. Tool handoff logic across CapCut, Gemini, ElevenLabs, and Higgsfield.",
        modules: 4, hours: 22, students: 0, rating: 0,
        icon: "Video", gradient: "from-violet-600 via-purple-700 to-indigo-900",
        topics: ["CapCut", "Gemini", "ElevenLabs", "Higgsfield", "Sound Design", "Soul ID"],
      },
      {
        slug: "presentation-engineering",
        title: "Presentation Engineering (Gamma + Canva + PowerPoint)",
        description: "From Idea to Investor Deck: Master Gamma AI, Canva visual design, and executive PowerPoint storytelling.",
        modules: 4, hours: 18, students: 0, rating: 0,
        icon: "Presentation", gradient: "from-amber-600 via-orange-700 to-slate-950",
        topics: ["Gamma AI", "Canva Pro", "PowerPoint", "Pitch Decks", "Data Storytelling"],
      }
    ];

    for (const path of seedPaths) {
      try {
        await databases.createDocument(databaseId, "paths", "unique()", path);
        results.push(`Seeded path: ${path.title}`);
      } catch (err: any) {
        results.push(`Failed to seed path ${path.title}: ${err.message}`);
      }
    }

    const seedCourses = [
      {
        slug: "video-editing-mastery",
        pathSlug: "video-ai-production",
        title: "Video Editing & Social Media Production",
        description: "From basic cuts to advanced pacing, rhythm, transitions, and audio sync.",
        lessons: 8, hours: 6, xp: 350, locked: false,
        skills: ["Video Editing", "Pacing", "Sound Design", "CapCut Pro"],
      },
      {
        slug: "presentation-mastery",
        pathSlug: "presentation-engineering",
        title: "Executive Presentation Architecture",
        description: "Executive slide hierarchy, typography, data visualization, and compelling investor narrative design.",
        lessons: 7, hours: 5, xp: 350, locked: false,
        skills: ["Presentation Design", "PowerPoint", "Gamma AI", "Storytelling"],
      }
    ];

    for (const course of seedCourses) {
      try {
        await databases.createDocument(databaseId, "courses", "unique()", course);
        results.push(`Seeded course: ${course.title}`);
      } catch (err: any) {
        results.push(`Failed to seed course ${course.title}: ${err.message}`);
      }
    }

    // Seed initial Tasks & Events
    const seedTasks = [
      { title: "Complete Banking Module 3 Quiz", xp: 50 },
      { title: "Practice Excel Shortcuts Drill", xp: 30 },
      { title: "Take a Mock Test (Banking)", xp: 100 },
    ];
    for (const task of seedTasks) {
      try {
        await databases.createDocument(databaseId, "tasks", "unique()", task);
      } catch (err) {}
    }

    const seedEvents = [
      { title: "Excel Workshop — BAUBC", date: "Jul 18", time: "3:00 PM", type: "Workshop" },
      { title: "Mock Test Marathon", date: "Jul 20", time: "10:00 AM", type: "Competition" },
    ];
    for (const ev of seedEvents) {
      try {
        await databases.createDocument(databaseId, "events", "unique()", ev);
      } catch (err) {}
    }

    results.push("Seeded mock tasks and events.");

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
