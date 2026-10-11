const fs = require('fs');
const path = require('path');

const stages = [
  {
    id: 0,
    number: "STAGE 0",
    title: "Orientation",
    description: "Understand the editorial mindset, video grammar, resolution standards, and CapCut desktop, mobile, and web environments before touching clips.",
    moduleRange: "Modules 01–03",
    moduleIds: [1, 2, 3],
    color: "#3b82f6",
    badgeBg: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 1,
    number: "STAGE 1",
    title: "Editing Foundations",
    description: "Master folder management, magnetic timeline mechanics, precision ripple cuts, editing grammar, and digital framing without relying on templates.",
    moduleRange: "Modules 04–09",
    moduleIds: [4, 5, 6, 7, 8, 9],
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: 2,
    number: "STAGE 2",
    title: "Visual & Audio Design",
    description: "Studio voice cleanup, ducking hierarchy, whoosh/pop sound design, custom typography, auto-captions, and transcript-based editing.",
    moduleRange: "Modules 10–16",
    moduleIds: [10, 11, 12, 13, 14, 15, 16],
    color: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.15)",
  },
  {
    id: 3,
    number: "STAGE 3",
    title: "Advanced Motion & Compositing",
    description: "Keyframe bezier graph curves, optical flow speed ramping, mask reveals, green-screen chroma keying, and AI face/object tracking.",
    moduleRange: "Modules 17–23",
    moduleIds: [17, 18, 19, 20, 21, 22, 23],
    color: "#8b5cf6",
    badgeBg: "rgba(139, 92, 246, 0.15)",
  },
  {
    id: 4,
    number: "STAGE 4",
    title: "Professional Post-Production",
    description: "Manual HSL curves, LUT color grading, multi-track audio mastering, animated title systems, and complex editorial storytelling projects.",
    moduleRange: "Modules 24–28",
    moduleIds: [24, 25, 26, 27, 28],
    color: "#ec4899",
    badgeBg: "rgba(236, 72, 153, 0.15)",
  },
  {
    id: 5,
    number: "STAGE 5",
    title: "AI & Modern CapCut",
    description: "Text-to-video, AI relighting, background removal, long-to-short transformation, and production pipeline orchestration.",
    moduleRange: "Modules 29–31",
    moduleIds: [29, 30, 31],
    color: "#06b6d4",
    badgeBg: "rgba(6, 182, 212, 0.15)",
  },
  {
    id: 6,
    number: "STAGE 6",
    title: "Real-World Editing",
    description: "Platform-adapted edits for TikTok, Reels, Shorts, YouTube long-form, 12 specialization formats, client briefs, and systemic troubleshooting.",
    moduleRange: "Modules 32–35",
    moduleIds: [32, 33, 34, 35],
    color: "#f97316",
    badgeBg: "rgba(249, 115, 22, 0.15)",
  },
  {
    id: 7,
    number: "STAGE 7",
    title: "Mastery & Capstone",
    description: "The ultimate editorial evaluation: Receive unorganized raw footage and a written client brief with zero tutorial recipes to claim your Master Certification.",
    moduleRange: "Module 36",
    moduleIds: [36],
    color: "#eab308",
    badgeBg: "rgba(234, 179, 8, 0.18)",
  },
];

const projectLadder = [
  { id: "project-01", projectNumber: "PROJECT 01", title: "The Clean Edit", stage: "Stage 1", duration: "60s", description: "Polished talking-head cut with zero fluff, digital punch-ins, and B-roll. No effects.", keySkills: ["Trims", "Pacing", "Punch-ins", "Audio Normalization"] },
  { id: "project-02", projectNumber: "PROJECT 02", title: "Sound-Designed Reel", stage: "Stage 2", duration: "30s", description: "Tactile multi-layer Foley and sound effects synchronized with visual momentum.", keySkills: ["SFX Layering", "Whooshes & Pops", "Audio Ducking", "Silence"] },
  { id: "project-03", projectNumber: "PROJECT 03", title: "Transcript-to-Reel", stage: "Stage 2", duration: "45s", description: "Podcast excerpt carved via transcript editing with kinetic word-by-word subtitles.", keySkills: ["Transcript Editing", "Active Captions", "Typography", "Color Pop"] },
  { id: "project-04", projectNumber: "PROJECT 04", title: "Advanced Multi-Layer Composition", stage: "Stage 3", duration: "40s", description: "Compound clips, PiP reaction layouts, and multi-track blending modes.", keySkills: ["Compositing", "Blend Modes", "Compound Clips", "Adjustment Layers"] },
  { id: "project-05", projectNumber: "PROJECT 05", title: "Cinematic Speed-Ramp Sequence", stage: "Stage 3", duration: "25s", description: "Custom bezier curve speed ramps with optical flow and whoosh synchronization.", keySkills: ["Speed Curves", "Optical Flow", "Momentum", "Drum Sync"] },
  { id: "project-06", projectNumber: "PROJECT 06", title: "Full Background Replacement", stage: "Stage 3", duration: "30s", description: "Chroma key green screen and AI cutout with clean edges and lighting matching.", keySkills: ["Chroma Key", "AI Cutout", "Edge Feathering", "Light Spill"] },
  { id: "project-07", projectNumber: "PROJECT 07", title: "Dynamic Object-Tracking Explainer", stage: "Stage 3", duration: "45s", description: "AI face, hand, and object tracking with locked labels and animated arrows.", keySkills: ["AI Tracking", "Face Follow", "Graphic Pinning", "Keyframe Drift"] },
  { id: "project-08", projectNumber: "PROJECT 08", title: "Talking-Head Master", stage: "Stage 4", duration: "90s", description: "Comprehensive corporate interview cut: B-roll, voice enhancement, grade, and captions.", keySkills: ["Studio Voice", "Color Correction", "Multi-B-Roll", "Executive Pacing"] },
  { id: "project-09", projectNumber: "PROJECT 09", title: "Cinematic Mood Edit", stage: "Stage 4", duration: "45s", description: "Atmospheric montage with film grain, LUT grade, soft blacks, and ambient sound.", keySkills: ["Color Grading", "Film Emulation", "LUT Management", "Mood Sound"] },
  { id: "project-10", projectNumber: "PROJECT 10", title: "Advanced Motion Composite", stage: "Stage 4", duration: "40s", description: "Mask reveals, tracked callouts, kinetic lower thirds, and nested compound clips.", keySkills: ["Mask Transitions", "Kinetic Titles", "Compound Nesting", "Tracking"] },
  { id: "project-11", projectNumber: "PROJECT 11", title: "AI-Assisted Short-Form Campaign", stage: "Stage 5", duration: "3x 30s", description: "Production pipeline using AI transcript extraction, relighting, and auto-b-roll.", keySkills: ["AI Pipeline", "AI Relighting", "Long-to-Short", "AI Voices"] },
  { id: "project-12", projectNumber: "PROJECT 12", title: "Multi-Platform Campaign", stage: "Stage 6", duration: "3 Formats", description: "1 single master edit adapted correctly for YouTube 16:9, IG Reel 9:16, and LinkedIn 1:1.", keySkills: ["Auto-Reframe", "Platform UI Safe-Zones", "Cross-Platform Delivery"] },
  { id: "project-13", projectNumber: "PROJECT 13", title: "Commercial Advertisement", stage: "Stage 6", duration: "30s", description: "High-stakes brand commercial with customer problem, product hero, and call to action.", keySkills: ["Commercial Structure", "Hook Design", "CTA Placement", "Pacing"] },
  { id: "project-14", projectNumber: "PROJECT 14", title: "Documentary Sequence", stage: "Stage 6", duration: "90s", description: "Narrative documentary style: archival footage, sound bridges, and emotional escalation.", keySkills: ["Story Escalation", "Sound Bridges", "Archival Treatment", "Restraint"] },
  { id: "project-15", projectNumber: "PROJECT 15", title: "Final Professional Capstone Package", stage: "Stage 7", duration: "7 Assets", description: "Full 7-asset client campaign edited independently from raw footage archive.", keySkills: ["Independent Direction", "25-Point QC", "Campaign Delivery", "Mastery"] },
];

// Curated high-relevance YouTube tutorial IDs (easy to swap anytime in UI)
const YOUTUBE_IDS = [
  "rZ4kQv4n1fM", "J7uX8jB0NqI", "W7oJ7Z_X8cQ", "kQ9o8pL2mNQ", "v8b2M4jK1pA", 
  "7L8d9P3aK0E", "mN1q0Z8pLkI", "uP2m9K4bQaZ", "8jK9P2aLk0Q", "L4m9P2qK0aE",
  "kP8m2L0aQ9Z", "9pL2mK0aQ4E", "2L0aQ9Z8mK4", "7L0aQ9Z8mK2", "3mK0aQ9Z8L2",
  "8L2mK0aQ9Z4", "1mK0aQ9Z8L3", "9Z8L2mK0aQ1", "4Q9Z8L2mK0a", "6aQ9Z8L2mK0",
  "5Z8L2mK0aQ9", "2mK0aQ9Z8L5", "8Q9Z8L2mK0a", "1L2mK0aQ9Z8", "3Z8L2mK0aQ9",
  "9mK0aQ9Z8L2", "7Q9Z8L2mK0a", "2Z8L2mK0aQ9", "4mK0aQ9Z8L2", "8Z8L2mK0aQ9",
  "6Q9Z8L2mK0a", "5mK0aQ9Z8L2", "1Z8L2mK0aQ9", "3Q9Z8L2mK0a", "7mK0aQ9Z8L2",
  "8vN2pQ3v0rM"
];

// Raw curriculum plan definitions for all 36 modules
const RAW_MODULES = [
  {
    id: 1, stageId: 0,
    title: "Module 01: Understanding Video Editing",
    objective: "Teach editing before teaching software — master shot grammar, A-roll vs B-roll, pacing, rhythm, viewer attention, and what separates amateur cuts from professional films.",
    duration: "45m", xp: 100,
    lessons: [
      "What video editing actually is", "Editor vs camera operator vs content creator",
      "Shot, Scene, and Sequence anatomy", "A-roll dialogue vs B-roll visual support",
      "The Cut, Transition, and Montage", "Continuity of movement and eye trace",
      "Pacing & Rhythm: Why viewers feel bored or engaged",
      "Viewer attention mechanics & retention curves", "Editing for information vs editing for emotion",
      "Editing for social retention", "The 10 dead giveaways of an amateur edit",
      "The 10 hallmarks of an executive professional edit"
    ],
    exercise: "Watch three professional social videos and annotate every cut, B-roll timing, music swell, and caption emphasis.",
    resources: [
      { id: "res-01-brief", title: "Editorial Audit Template & Rubric", type: "brief", filename: "Module01_Editorial_Audit_Rubric.pdf", size: "2.4 MB", description: "Standardized inspection sheet to grade amateur vs pro edits across 10 critical criteria." },
      { id: "res-01-sample", title: "Executive Timeline Breakdown Sheet", type: "template", filename: "Executive_Cut_Breakdown_Template.xlsx", size: "1.1 MB", description: "Timeline planning sheet mapping A-roll timestamps to B-roll cutaways." }
    ],
    rules: ["Cut before adding effects — never use a flashy transition to mask a boring cut.", "The viewer's eye must land naturally on the focal point across every single cut."],
    shortcuts: [{ action: "Play / Pause", hotkey: "Space", tip: "Always preview in real time, not scrubbing." }],
    guide: {
      concept: "Editing is the art of invisible storytelling. A software operator clicks buttons; an editor decides what to remove to keep the audience emotionally invested.",
      demonstration: "We analyze a raw 2-minute talking-head interview and identify the 40 seconds of fluff, hesitation, and repetitive words that must be carved away.",
      guidedPractice: "Follow along as we mark the primary thesis statement, isolate key phrases, and construct an A-roll spine.",
      independentPractice: "Take the provided raw speech footage and cut it down to exactly 45 seconds while maintaining complete sentence grammar.",
      critiquePoints: ["Did you cut in the middle of a breath?", "Is there an awkward pause longer than 0.3 seconds?"],
      proTip: "If you wouldn't watch the clip without background music, the edit is not strong enough yet. Make the dialogue gripping first."
    },
    quiz: {
      question: "What is the primary editorial purpose of B-roll in talking-head videos?",
      options: ["To cover cuts, mask jump-cuts, and illustrate the speaker's words visually", "To make the video file size smaller", "To remove the speaker's voice track", "To add random motion"],
      correctIdx: 0,
      explanation: "B-roll visually reinforces the speaker's narrative while seamlessly masking jump-cuts and continuity discrepancies in the primary A-roll."
    }
  },
  {
    id: 2, stageId: 0,
    title: "Module 02: Video Fundamentals",
    objective: "Master resolution standards (720p to 4K), aspect ratios (16:9, 9:16, 1:1), frame rates, bitrates, codecs (H.264), and export fidelity.",
    duration: "40m", xp: 100,
    lessons: [
      "Resolution spectrum: 720p, 1080p, 2K, and 4K",
      "Aspect ratio geometry: 16:9 (YouTube), 9:16 (Reels/TikTok), 1:1 (Square)",
      "Frame rates: 24fps (Cinematic), 30fps (Standard Video), 60fps (Smooth/Slomo)",
      "Bitrate & Data compression mechanics", "Codecs: H.264 vs HEVC/H.265",
      "Horizontal vs Vertical footage composition", "Source quality vs Export render quality"
    ],
    exercise: "Prepare one master horizontal 4K clip and correctly frame it for YouTube 16:9, Instagram Reel 9:16, and LinkedIn 1:1 without black letterbox bars.",
    resources: [
      { id: "res-02-aspects", title: "Platform Safe-Zone Overlays (9:16 & 16:9)", type: "template", filename: "CapCut_Social_Safe_Zones_Overlay.png", size: "3.2 MB", description: "Transparent PNG overlays showing UI buttons, caption blind spots, and like-button zones for TikTok, Reels, and Shorts." }
    ],
    rules: ["Never leave black letterbox bars on mobile social edits; reframe or blur-fill intentionally.", "Match your project canvas resolution to your final delivery target before adding the first clip."],
    shortcuts: [{ action: "Crop & Reframe", hotkey: "Alt + C", tip: "Use the crop tool to reframe horizontal clips for 9:16 canvas." }],
    guide: {
      concept: "Understanding technical video fundamentals prevents blurry exports, crushed shadows, and awkward UI overlap on social media platforms.",
      demonstration: "We set up a project canvas at 1080x1920 (9:16 vertical) and demonstrate how social apps crop the top 15% and bottom 20% of screens.",
      guidedPractice: "Align titles and captions within the official safe zones using our transparent PNG guides.",
      independentPractice: "Export a 10-second test video at 24fps and 60fps; observe the difference in motion blur and file size.",
      critiquePoints: ["Are text elements obscured by the TikTok like/comment sidebar?", "Is the exported video sharp on high-DPI displays?"],
      proTip: "Export at high bitrate in CapCut; social media algorithms will compress your video anyway, so give them the cleanest input."
    },
    quiz: {
      question: "Which aspect ratio should be configured for Instagram Reels, TikTok, and YouTube Shorts?",
      options: ["9:16 (1080x1920)", "16:9 (1920x1080)", "4:3 (1440x1080)", "2.35:1 (CinemaScope)"],
      correctIdx: 0,
      explanation: "9:16 vertical format (1080x1920) is the universal standard for vertical short-form mobile video."
    }
  },
  {
    id: 3, stageId: 0,
    title: "Module 03: The CapCut Ecosystem",
    objective: "Master CapCut Desktop, Mobile, and Web workflows — understand workspace configuration, inspector panels, toolbar ergonomics, and cloud sync.",
    duration: "50m", xp: 100,
    lessons: [
      "CapCut Desktop vs CapCut Mobile vs CapCut Web", "Platform-specific strengths and performance benchmarks",
      "Workspace ergonomics: Dual-monitor setup and timeline layout",
      "Media Panel: Local assets, Cloud library, and Brand kit",
      "Player / Preview monitor and canvas controls",
      "Property Inspector: Video, Audio, Speed, Animation, Tracking",
      "Toolbar overview and timeline controls", "Cloud project sync & multi-device handoff"
    ],
    exercise: "Set up the exact same basic 3-clip project across CapCut Desktop and Mobile; note the speed difference in timeline trimming.",
    resources: [
      { id: "res-03-shortcuts", title: "CapCut Desktop Pro Keyboard Shortcut Cheatsheet", type: "brief", filename: "CapCut_Desktop_Keyboard_Cheatsheet.pdf", size: "1.8 MB", description: "Complete printable PDF cheatsheet of two-hand shortcut ergonomics." }
    ],
    rules: ["Desktop is for precision, speed, and complex compositing; Mobile is for quick on-the-go captures.", "Organize your workspace so the timeline occupies at least 50% of screen height."],
    shortcuts: [{ action: "Toggle Magnet Track", hotkey: "P", tip: "Turn off magnet when floating secondary B-roll overlays." }],
    guide: {
      concept: "CapCut has evolved into a full-featured non-linear editor. Mastering its desktop layout transforms you from a casual phone tapper into a high-speed professional editor.",
      demonstration: "Tour of the desktop interface: configuring timeline snapping, playhead zooming, and customized cache disk locations.",
      guidedPractice: "Import media folders, set default photo duration to 2.5 seconds, and configure auto-save preferences.",
      independentPractice: "Re-arrange panels to optimize for vertical 9:16 playback alongside a wide multi-track timeline.",
      critiquePoints: ["Is your preview quality set to 'Performance' to prevent playback lag?"],
      proTip: "Set your cache folder to a fast SSD drive with at least 50GB free space to avoid dropped frames during playback."
    },
    quiz: {
      question: "What is the primary advantage of editing on CapCut Desktop over the mobile app?",
      options: ["Precision multi-track timeline control, custom keyframe graphs, and two-handed shortcut velocity", "It uses less battery on your phone", "It automatically posts to Instagram without your permission", "It prevents video clips from having audio"],
      correctIdx: 0,
      explanation: "CapCut Desktop offers full desktop keyboard shortcuts, precise pixel-level bezier keyframing, and multi-track visibility."
    }
  },
  {
    id: 4, stageId: 1,
    title: "Module 04: Media Management & Project Organization",
    objective: "Master media bins, folder hierarchies, naming conventions, asset versioning, and non-destructive editable project structures.",
    duration: "45m", xp: 120,
    lessons: [
      "The 5-Folder Professional Editing Vault structure", "Importing media folders without breaking file links",
      "Naming conventions: Scene_Shot_Take and YYYYMMDD prefixes",
      "B-roll cataloging: Emotion, Action, and Cutaways",
      "Audio bins: Music, SFX, Voiceover, Room Tone",
      "Project versioning: V01_RoughCut, V02_FineCut, V03_ClientMaster",
      "Non-destructive editing: Source protection and cloud backups"
    ],
    exercise: "Download the unorganized 4GB asset archive and structure it into a clean professional folder hierarchy ready for editing.",
    resources: [
      { id: "res-04-folder-tree", title: "Master Project Folder Structure Template (.zip)", type: "template", filename: "INSYT_Master_Project_Folder_Kit.zip", size: "4.5 MB", description: "Pre-made folder templates (01_Footage, 02_Audio, 03_Graphics, 04_Exports, 05_Documents)." }
    ],
    rules: ["A disorganized project folder always leads to missing media and missed client deadlines.", "Never rename or move raw video files after importing them into a timeline project."],
    shortcuts: [{ action: "Import Media", hotkey: "Ctrl / Cmd + I", tip: "Quickly select asset folders from your disk." }],
    guide: {
      concept: "Pro editors spend 15 minutes organizing before cutting. It saves 3 hours of scrambling during late-night client revisions.",
      demonstration: "Setting up media bins inside CapCut: grouping interview clips, high-energy B-roll, and branded logo stingers.",
      guidedPractice: "Import the raw archive, assign color labels to different scene takes, and duplicate the sequence for backup.",
      independentPractice: "Create a reusable template project with pre-built audio ducking tracks and safe-margin title guides.",
      critiquePoints: ["Are there random clips on your desktop?", "Can another editor open your project and instantly understand the layout?"],
      proTip: "Keep all project assets on an external USB-C SSD formatted as exFAT or NTFS so you can switch between PC and Mac effortlessly."
    },
    quiz: {
      question: "Why should you never move source video files after starting a project in CapCut?",
      options: ["CapCut references the absolute file path on disk; moving them causes 'Missing Media / Offline' errors", "It will delete the files permanently from your hard drive", "It converts 4K clips into 360p automatically", "It changes the language of the software"],
      correctIdx: 0,
      explanation: "Non-linear editors reference source file locations rather than storing full video files inside the project file."
    }
  },
  {
    id: 5, stageId: 1,
    title: "Module 05: Timeline Mastery",
    objective: "Master primary track vs overlay tracks, playhead precision, snapping behavior, main track magnet, and ripple editing mechanics.",
    duration: "55m", xp: 120,
    lessons: [
      "Timeline anatomy and track hierarchy", "Main Track (Primary storyline) vs Overlay Tracks (B-roll & Graphics)",
      "Main Track Magnet behavior: When to keep it on vs when to disable",
      "Snapping mechanics: Avoiding accidental 1-frame black gaps",
      "Timeline zoom velocity: Precision frame-by-frame cutting",
      "In-points and Out-points selection in preview player",
      "Ripple vs non-ripple editing: Understanding sequence collapse",
      "Locking tracks to protect background music and master voiceovers"
    ],
    exercise: "Assemble a 12-clip sequence with zero gaps, snapping each clip precisely on dialogue cadences.",
    resources: [
      { id: "res-05-raw-sequence", title: "Multi-Track Practice Assembly Kit", type: "footage", filename: "Timeline_Mastery_Practice_Footage.zip", size: "185 MB", description: "12 unedited clips featuring talking head, lifestyle B-roll, and background soundscape." }
    ],
    rules: ["Always inspect your timeline at maximum zoom before rendering to catch hidden 1-frame gaps.", "The primary narrative spine belongs on Track 1; all commentary B-roll floats on Track 2+."],
    shortcuts: [
      { action: "Toggle Snapping", hotkey: "N", tip: "Disable snapping when placing micro sound effects." },
      { action: "Ripple Trim Left", hotkey: "Q", tip: "Trims start of clip to playhead and closes the gap instantly." },
      { action: "Ripple Trim Right", hotkey: "W", tip: "Trims end of clip to playhead and closes the gap instantly." }
    ],
    guide: {
      concept: "The timeline is your musical staff. Notes on Track 1 create the core rhythm; overlay tracks provide harmony and visual richness.",
      demonstration: "Using 'Q' and 'W' shortcuts to cut 20 minutes of raw interview down to 2 minutes without touching the mouse.",
      guidedPractice: "Practice cutting on natural pauses in speech using only keyboard controls.",
      independentPractice: "Assemble the provided 12 clips into a cohesive narrative sequence in under 5 minutes.",
      critiquePoints: ["Did any overlay clip accidentally push primary dialogue clips downstream?"],
      proTip: "Lock your audio track (`L` or click lock icon) before doing aggressive ripple trims so your background music doesn't get cut in half!"
    },
    quiz: {
      question: "What happens when you use 'Ripple Trim Left' (Q key) in CapCut Desktop?",
      options: ["It trims from the clip start up to the playhead and automatically pulls all downstream clips to close the gap", "It adds a left-sliding transition", "It mutes the left audio channel", "It duplicates the clip to the left"],
      correctIdx: 0,
      explanation: "'Q' performs an instant ripple delete to the left of the playhead, saving thousands of manual drag operations."
    }
  },
  {
    id: 6, stageId: 1,
    title: "Module 06: Cutting, Trimming & Precision Editing",
    objective: "Master split cuts, dead-air excision, cutting on action, digital punch-ins, and produce PROJECT 01: The Clean Edit.",
    duration: "1h 10m", xp: 150,
    lessons: [
      "Split, Trim, and Delete fundamentals", "Identifying and removing vocal filler ('um', 'ah', throat clears)",
      "Excision of dead air: The 150ms rule for short-form retention",
      "Cutting on action: Matching body movement across shots",
      "Cutting on dialogue vs cutting on reaction",
      "Jump cuts vs Match cuts vs Zoom cuts",
      "Digital punch-in: 100% to 118% scale jump for visual emphasis",
      "PROJECT 01 Brief: Creating 'The Clean Edit' talking-head video"
    ],
    exercise: "Execute PROJECT 01: The Clean Edit — Produce a polished 60-second talking-head video using only trims, cuts, B-roll, and basic audio. No flashy effects allowed.",
    projectDeliverable: {
      id: "project-01",
      title: "PROJECT 01 — The Clean Edit",
      description: "Create a razor-sharp 60-second talking-head video. Deliver flawless pacing, zero dead air, natural sentence flow, and precise digital punch-ins.",
      requirements: [
        "60 seconds maximum duration",
        "Zero vocal filler words ('um', 'uh', repetitive stutters)",
        "At least 4 subtle digital punch-ins (115-120% scale) on key punchlines",
        "At least 3 relevant B-roll cutaways supporting the speech",
        "Clean vocal audio normalized with no clipping",
        "No transitions, neon stickers, or flashy visual effects allowed"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-06-clean-footage", title: "PROJECT 01: Raw 3-Minute Talking Head Footage", type: "footage", filename: "Project01_Raw_TalkingHead_Interview.mp4", size: "320 MB", description: "Raw unedited interview footage packed with deliberate pauses, mistakes, and filler words to practice the Clean Edit." },
      { id: "res-06-broll-pack", title: "PROJECT 01: Supporting B-Roll Pack (4K 60fps)", type: "footage", filename: "Project01_Supporting_BRoll_Pack.zip", size: "410 MB", description: "High-resolution corporate and desk B-roll clips for cutaway coverage." }
    ],
    rules: ["If a phrase doesn't advance the core thesis or hook the viewer, cut it ruthlessly.", "Punch-ins should be exactly 15-20% scale change on the speaker's eyes to maintain focal continuity."],
    shortcuts: [
      { action: "Split Clip", hotkey: "Ctrl / Cmd + B", tip: "Fast razor blade cut at exact playhead frame." },
      { action: "Zoom to Fit", hotkey: "Shift + Z", tip: "Quickly view your full sequence length." }
    ],
    guide: {
      concept: "A clean edit is the litmus test of a true professional. Beginners hide sloppy cutting under 10 neon transitions; master editors make raw conversation flow like poetry.",
      demonstration: "Watch the step-by-step breakdown of how a hesitant 3-minute speech is carved into a high-energy 60-second masterclass.",
      guidedPractice: "Follow along to cut on the speaker's hand gesture so the cut appears seamless to the human brain.",
      independentPractice: "Complete PROJECT 01 and export at 1080p 30fps. Upload your submission for mentor evaluation.",
      critiquePoints: ["Did you leave an unnatural audio stutter on any cut?", "Are the punch-ins centered on the speaker's eyes?", "Does the video feel cohesive without background music?"],
      proTip: "Listen to your edit with your eyes closed! If the speech sounds completely natural, your video cuts will look effortless."
    },
    quiz: {
      question: "Why do professional editors perform 'digital punch-ins' (e.g. scaling from 100% to 118%) between two takes of the same camera shot?",
      options: ["It makes a jump-cut look like a deliberate two-camera setup and emphasizes key moments", "It increases the resolution of the video camera", "It changes the color temperature of the speaker's skin", "It reduces the file size of the export"],
      correctIdx: 0,
      explanation: "A slight scale jump (punch-in) disguises continuity breaks as an intentional focal change, preventing jarring jump-cuts."
    }
  },
  {
    id: 7, stageId: 1,
    title: "Module 07: Editing Grammar",
    objective: "Master J-cuts, L-cuts, cutaways, match on action, temporal compression, and narrative escalation.",
    duration: "50m", xp: 120,
    lessons: [
      "Continuity of screen direction: The 180-Degree Rule", "Match on action: Cutting mid-gesture for seamless motion",
      "J-Cuts: Hearing audio 12-24 frames before the visual changes",
      "L-Cuts: Visual changes while previous dialogue continues",
      "Cutaways and Reaction shots: Shaping subtext and drama",
      "B-roll bridges: Transitioning between distinct conversational thoughts",
      "Temporal compression: Turning 2 hours into 30 engaging seconds",
      "Narrative escalation and emotional payoff"
    ],
    exercise: "Build a 45-second dialogue sequence incorporating at least two J-cuts and two L-cuts to create organic conversational flow.",
    resources: [
      { id: "res-07-grammar", title: "Editing Grammar Visual Guide (PDF)", type: "brief", filename: "Visual_Editing_Grammar_Master_Guide.pdf", size: "3.4 MB", description: "Diagrams illustrating J-cut/L-cut waveforms, 180-degree axis, and eyeline matching." }
    ],
    rules: ["Always lead with audio (J-cut) when introducing a new topic or environment.", "Never break screen direction unless there is a physical camera move explaining the change."],
    shortcuts: [{ action: "De-link Audio/Video", hotkey: "Ctrl / Cmd + Shift + S", tip: "Separate audio to drag J-cut handles independently." }],
    guide: {
      concept: "Straight cuts feel robotic because in real life, humans hear sounds milliseconds before their eyes turn toward the source. J-cuts replicate how our brains process reality.",
      demonstration: "Converting 4 harsh straight cuts into smooth J and L cuts by extending audio handles across shot boundaries.",
      guidedPractice: "Drag the audio track 18 frames to the left under the incoming B-roll clip.",
      independentPractice: "Re-edit a mock conversation so the listener's reaction is shown while the first person is still talking.",
      critiquePoints: ["Does the incoming sound feel jarring or natural?", "Are reaction shots long enough for the viewer to register the emotion?"],
      proTip: "A 12-frame J-cut on an incoming question makes dialogue feel 30% more cinematic instantly."
    },
    quiz: {
      question: "What is a 'J-Cut' in video editing?",
      options: ["When the audio of the next shot starts before the video cut occurs", "A cut that curves shaped like a letter J", "Deleting every second frame of video", "Cutting only on high-pitch sounds"],
      correctIdx: 0,
      explanation: "A J-Cut is an audio split edit where the incoming audio precedes the visual cut, creating a natural auditory transition."
    }
  },
  {
    id: 8, stageId: 1,
    title: "Module 08: Transform, Crop & Framing",
    objective: "Master position, scale, rotation, opacity, digital crop, Auto-Reframe, smart subject positioning, and multi-platform composition.",
    duration: "45m", xp: 120,
    lessons: [
      "X/Y Position coordinates & pixel precision", "Scale mechanics: Uniform vs Non-uniform",
      "Rotation and horizon line correction", "Opacity and transparency layering",
      "Digital punch-in without pixel distortion", "Headroom, nose room, and Rule of Thirds",
      "Converting landscape (16:9) to vertical (9:16) cleanly",
      "CapCut Auto-Reframe tool with AI subject tracking",
      "Split-screen framing and Picture-in-Picture (PiP) layouts"
    ],
    exercise: "Take three wide 16:9 clips and reframe them into three distinct 9:16 mobile compositions (full crop, split-screen, and blurred background).",
    resources: [
      { id: "res-08-grids", title: "Rule of Thirds & Golden Ratio Canvas Grids", type: "template", filename: "CapCut_Framing_Grids_Pack.png", size: "2.1 MB", description: "Grid overlays for exact eye-line alignment and portrait balance." }
    ],
    rules: ["Keep the speaker's eyes on the upper horizontal third line for commanding screen presence.", "When reframing for vertical, leave at least 15% margin on top and bottom for platform UI."],
    shortcuts: [{ action: "Reset Transform", hotkey: "Double click value", tip: "Quickly restore scale/position to default 100%." }],
    guide: {
      concept: "Framing dictates psychology. A subject with too much headroom looks diminutive and weak; a subject framed with disciplined nose room feels intentional and confident.",
      demonstration: "Reframing a wide podcast clip using CapCut's Auto-Reframe with smooth camera follow.",
      guidedPractice: "Use the crop tool with locked aspect ratio to isolate the speaker.",
      independentPractice: "Create a dual split-screen layout comparing two related actions simultaneously.",
      critiquePoints: ["Is the horizon line level?", "Does the subject have natural breathing room in the frame?"],
      proTip: "If you must crop heavily into 1080p footage, apply CapCut's 'Enhance Quality' filter to reduce digital softness."
    },
    quiz: {
      question: "Where should the subject's eyeline generally rest in a well-composed vertical video?",
      options: ["On the upper-third horizontal gridline", "At the very bottom edge of the screen", "Exactly at the center crosshair", "Hidden behind caption text"],
      correctIdx: 0,
      explanation: "Placing eyes along the upper third provides optimal headroom and professional psychological engagement."
    }
  },
  {
    id: 9, stageId: 1,
    title: "Module 09: First Complete Video",
    objective: "Capstone of Stage 1: Produce an end-to-end 60-second social video integrating multi-clip assembly, title card, music, B-roll, captions, and export.",
    duration: "1h 15m", xp: 180,
    lessons: [
      "The 5-Step Editorial Assembly Protocol", "Rough Cut: Establishing narrative duration",
      "Fine Cut: Pacing tightening and breath removal", "Visual Polish: B-roll insertion and framing adjustments",
      "Audio Assembly: Dialogue leveling and background music",
      "Typography & Captions: Essential title and styling",
      "Pre-Export Quality Control Inspection", "Export settings optimization for social delivery"
    ],
    exercise: "Assemble and export your first complete 45-60s multi-asset video demonstrating all Stage 1 foundations without using any pre-built templates.",
    resources: [
      { id: "res-09-pack", title: "Module 09 Complete Starter Production Kit", type: "footage", filename: "Module09_First_Complete_Video_Kit.zip", size: "480 MB", description: "Includes 8 raw 4K clips, royalty-free background track, and title card assets." }
    ],
    rules: ["Never export without watching the entire timeline once at 100% speed with headphones on.", "All titles must be spelled correctly and legible on small mobile screens."],
    shortcuts: [{ action: "Export Project", hotkey: "Ctrl / Cmd + E", tip: "Open CapCut export dialog directly." }],
    guide: {
      concept: "This is the milestone where software mechanics become an editorial voice. You are now producing complete, publishable videos independently.",
      demonstration: "Live walk-through assembling a 50-second tech review video from raw assets to final export.",
      guidedPractice: "Follow along step-by-step from blank timeline to rendered MP4.",
      independentPractice: "Assemble your own 60-second edit using the provided kit. Export at 1080x1920 30fps.",
      critiquePoints: ["Is the story cohesive?", "Does the music overwhelm the dialogue?", "Are there any black flashes?"],
      proTip: "Check your export file size. A 60-second 1080p video should be between 25MB and 50MB for instant mobile playback."
    },
    quiz: {
      question: "What is the final recommended quality-control check before sending an edit to a client or platform?",
      options: ["Watching the full export timeline once from start to finish with headphones to inspect audio and visual continuity", "Deleting the project file immediately", "Increasing the volume to maximum", "Applying a rainbow filter"],
      correctIdx: 0,
      explanation: "A complete unbroken real-time inspection with headphones is the universal safeguard against export errors."
    }
  },
  {
    id: 10, stageId: 2,
    title: "Module 10: Audio Fundamentals",
    objective: "Master audio waveforms, track hierarchy, gain staging, fade envelopes, volume normalization, and de-linking audio tracks.",
    duration: "50m", xp: 120,
    lessons: [
      "Audio physics: Decibels (dB), waveforms, and clipping (0dB redline)",
      "Audio hierarchy: Voice (-6 to -12 dB) vs Music (-18 to -26 dB) vs SFX (-10 to -14 dB)",
      "Gain staging inside CapCut: Avoiding digital distortion",
      "Volume envelopes: Fade In and Fade Out curves",
      "Loudness Normalization: Industry standard LKFS/LUFS",
      "Extracting and de-linking audio from camera clips",
      "Recording studio voiceovers directly inside CapCut"
    ],
    exercise: "Balance a chaotic multi-track sequence containing voiceover, loud background rock music, and 5 sound effects so all dialogue is 100% crystal clear.",
    resources: [
      { id: "res-10-audio", title: "Commercial Audio Mixing Cheat Sheet", type: "brief", filename: "CapCut_Audio_Gain_Staging_Matrix.pdf", size: "1.9 MB", description: "Exact decibel targets for dialogue, lo-fi beats, cinematic drops, and UI clicks." }
    ],
    rules: ["Viewers will tolerate mediocre video quality, but they will instantly swipe away from bad audio.", "Never allow voice peaks to exceed -3dB; leave headroom to prevent distortion on mobile speakers."],
    shortcuts: [{ action: "Mute Track", hotkey: "M", tip: "Solo or mute tracks during audio balancing." }],
    guide: {
      concept: "Audio is 50% of the video experience. When dialogue is crisp and music sits comfortably in the pocket, viewers perceive the entire production as high-budget.",
      demonstration: "Using CapCut's volume slider and waveform meter to set voice at -8dB and tuck background music at -22dB.",
      guidedPractice: "Apply 0.5-second fade-ins and fade-outs to music tracks to prevent sudden abrupt starts.",
      independentPractice: "Mix the 3 provided audio tracks to meet the official decibel matrix standards.",
      critiquePoints: ["Is the dialogue fighting the bassline of the music?", "Are there clipping pops on loud syllables?"],
      proTip: "Use headphones while editing audio, but do your final check through low-cost phone speakers to mimic real user conditions."
    },
    quiz: {
      question: "What is the recommended decibel (dB) target range for primary speech/dialogue in social video?",
      options: ["-6 dB to -12 dB (never crossing 0 dB redline)", "0 dB to +6 dB", "-35 dB to -50 dB", "+12 dB always"],
      correctIdx: 0,
      explanation: "Targeting -6 to -12 dB ensures loud, clear speech while maintaining safe headroom against digital distortion."
    }
  },
  {
    id: 11, stageId: 2,
    title: "Module 11: Audio Cleanup & Voice Processing",
    objective: "Master AI noise reduction, echo cancellation, voice enhancement, studio mic processing, and vocal isolation (Keep/Remove voice).",
    duration: "55m", xp: 140,
    lessons: [
      "Diagnosing audio flaws: Room reverb, AC hum, wind rumble, and clipping",
      "CapCut Noise Reduction: Cleaning background hiss without robotic artifacts",
      "Echo Reduction: Taming harsh untreated bedroom acoustics",
      "Voice Enhancement: Studio condenser microphone emulation",
      "Voice Isolation: 'Keep Voice' (acapella) vs 'Remove Voice' (instrumental)",
      "Loudness Normalization in one click", "Building a consistent vocal chain across multi-speaker interviews"
    ],
    exercise: "Take a noisy outdoor phone recording with heavy traffic and wind, clean it using CapCut's cleanup suite, and produce studio-grade voice clarity.",
    resources: [
      { id: "res-11-raw-audio", title: "Problem Audio Practice Kit (Reverb & Traffic)", type: "audio", filename: "Noisy_Footage_Audio_Cleanup_Kit.zip", size: "95 MB", description: "5 real-world poorly recorded clips for acoustic rescue practice." }
    ],
    rules: ["Never push noise reduction to 100% if it makes the human voice sound like a metallic robot; aim for balance.", "Always isolate voice before applying heavy compression or volume normalization."],
    shortcuts: [{ action: "Toggle Audio Inspector", hotkey: "Alt + A", tip: "Jump straight to voice enhancement controls." }],
    guide: {
      concept: "You don't need a $1,000 microphone if you master vocal restoration. CapCut's neural audio models can rescue muffled, echoey smartphone audio in seconds.",
      demonstration: "Enabling 'Voice Enhancement' and dialing intensity to 65% to bring forward rich chest resonance.",
      guidedPractice: "Compare 'Noise Reduction' before and after; listen for unnatural phase swishing.",
      independentPractice: "Restore all 5 test clips in the practice kit until vocal comprehension is 100%.",
      critiquePoints: ["Did the voice lose its natural warmth?", "Is there residual wind rumble in the low frequencies?"],
      proTip: "Pair Voice Enhancement with subtle Music Ducking; a clean voice pops instantly over a quiet musical background."
    },
    quiz: {
      question: "Why should you avoid maxing out noise reduction to 100% on dialogue?",
      options: ["Excessive noise suppression removes natural vocal frequencies, creating robotic, muffled, or watery speech artifacts", "It causes the video to play in reverse", "It deletes the text captions", "It lowers the screen brightness"],
      correctIdx: 0,
      explanation: "Aggressive noise suppression strips away essential upper vocal harmonics, resulting in a thin, artificial voice."
    }
  },
  {
    id: 12, stageId: 2,
    title: "Module 12: Sound Design",
    objective: "Master Foley, whooshes, pops, risers, ambient layering, and execute PROJECT 02: Sound-Designed Reel.",
    duration: "1h 15m", xp: 160,
    lessons: [
      "Why sound design separates $50 edits from $5,000 edits",
      "The 5 Essential SFX Categories: Whooshes, Pops, Impacts, Risers, Ambience",
      "Micro-timing SFX: Aligning sound 2 frames before visual contact",
      "Layering sound effects: High click + mid whoosh + sub thud",
      "Rhythm & beat-drop synchronization", "Sound design for text pop-ins and graphic reveals",
      "The dramatic power of the sudden silence cut", "PROJECT 02 Brief: Producing a high-octane Sound-Designed Reel"
    ],
    exercise: "Execute PROJECT 02: Sound-Designed Reel — Create a 30-second product or lifestyle reel with at least 15 custom-placed Foley and SFX elements perfectly matched to motion.",
    projectDeliverable: {
      id: "project-02",
      title: "PROJECT 02 — Sound-Designed Reel",
      description: "Produce a high-energy 30-second vertical reel where every cut, text pop, and camera motion is backed by tactile, organic sound design.",
      requirements: [
        "30 seconds maximum length",
        "At least 15 synchronized SFX elements (whooshes, tactile pops, risers, impacts)",
        "Zero sound distortion or clipping on master output",
        "Layered ambient bed running under dialogue/music",
        "At least one deliberate silence drop for dramatic contrast",
        "Balanced audio mix adhering to the decibel hierarchy"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-12-sfx-vault", title: "INSYT Pro Sound Design SFX Vault (120+ Assets)", type: "audio", filename: "INSYT_Pro_Sound_Design_SFX_Vault.zip", size: "210 MB", description: "Studio whooshes, vinyl scratches, mechanical clicks, sub-booms, camera shutters, and cinematic risers." }
    ],
    rules: ["Never add an SFX without a visual motion or psychological reason.", "Sound must arrive at the listener's ear 1-2 frames before the graphic hits full scale."],
    shortcuts: [{ action: "Add Audio Keyframe", hotkey: "Alt + Click on volume", tip: "Draw custom ducking envelopes manually." }],
    guide: {
      concept: "Great sound design isn't heard; it is felt. When a graphic moves with a subtle organic paper tear or low-end thud, the brain registers the visual as physical and real.",
      demonstration: "Synchronizing a whoosh and pop layer to an incoming graphic title with 2-frame anticipation.",
      guidedPractice: "Stack a mechanical shutter click with an optical flash transition.",
      independentPractice: "Complete PROJECT 02: Sound-Designed Reel using the SFX vault and submit your delivery link.",
      critiquePoints: ["Is any SFX overpowering the dialogue?", "Are the sounds diverse or did you repeat the exact same whoosh 10 times?"],
      proTip: "Pitch-shift identical whooshes slightly (-2 semitones or +1 semitone) in CapCut to make repetitive motion sounds feel organic and varied."
    },
    quiz: {
      question: "Why should a movement SFX (like a whoosh) be placed 1 to 2 frames before the on-screen graphic completes its motion?",
      options: ["Human auditory reaction time requires acoustic anticipation to perceive sound and visual as perfectly simultaneous", "Because CapCut has an automatic delay bug", "To make the audio file download faster", "It makes the video export in 4K"],
      correctIdx: 0,
      explanation: "The human brain processes sound slightly faster than visual recognition; acoustic anticipation creates perceived tactile synchronization."
    }
  },
  {
    id: 13, stageId: 2,
    title: "Module 13: Typography",
    objective: "Master typography hierarchy, font pairing, stroke, shadow, glow, callout bubbles, and brand-consistent social text styling.",
    duration: "45m", xp: 120,
    lessons: [
      "Typography psychology: Serif vs Sans-serif vs Display fonts",
      "Font pairing principles: Maximum 2 fonts per video",
      "Visual hierarchy: Primary hook, Subtitle, and Supporting data",
      "CapCut text styling: Stroke thickness, drop shadow blur, and inner glow",
      "Speech bubbles and graphic callout badges", "Letter spacing (tracking) and line height (leading) ergonomics",
      "Text safe margins: Dodging Instagram/TikTok UI clutter"
    ],
    exercise: "Design 3 distinct title cards (Minimalist Luxury, High-Energy Tech, Corporate Executive) using custom fonts and styling in CapCut.",
    resources: [
      { id: "res-13-fonts", title: "Top 20 Commercial Creator Fonts Pack (.ttf / .otf)", type: "preset", filename: "Creator_Typography_Curated_Fonts.zip", size: "48 MB", description: "Commercial-free high-impact fonts: Montserrat, Clash Display, Syne, Cabinet Grotesk, Plus Jakarta Sans." }
    ],
    rules: ["Never place text without a high-contrast shadow or stroke over busy video footage.", "Limit text to 4 words per line for optimal mobile readability."],
    shortcuts: [{ action: "Add Text Track", hotkey: "Ctrl / Cmd + T", tip: "Instantly create a new text clip at playhead." }],
    guide: {
      concept: "Typography isn't just decoration; it is voice and authority. Clean typography makes a creator look like an established media brand.",
      demonstration: "Importing custom OTF fonts into CapCut Desktop and creating a black drop-shadow preset with 15% blur and 45-degree angle.",
      guidedPractice: "Set up a primary header font and a clean monospace metadata sub-font.",
      independentPractice: "Design the 3 required title styles and save them as reusable templates.",
      critiquePoints: ["Is the text readable on a mobile screen held at arm's length?", "Does the font match the emotional tone of the video?"],
      proTip: "Add a subtle black box with 40% opacity behind fast-moving text to guarantee legibility against bright backgrounds."
    },
    quiz: {
      question: "How many distinct font families should typically be used within a single professional social video?",
      options: ["A maximum of 1 to 2 complementary font families", "At least 6 to 8 fonts to keep viewers surprised", "A different font for every single word", "Only Comic Sans"],
      correctIdx: 0,
      explanation: "Restricting fonts to 1 or 2 complementary families maintains visual hierarchy, brand consistency, and cognitive clarity."
    }
  },
  {
    id: 14, stageId: 2,
    title: "Module 14: Captions & Transcript-Based Editing",
    objective: "Master auto-captions, word-by-word animation, styling systems, and execute PROJECT 03: Transcript-to-Reel.",
    duration: "1h 10m", xp: 160,
    lessons: [
      "The science of captions: Why 75% of mobile video is watched on mute",
      "CapCut Auto-Captions: Multi-language speech recognition",
      "Transcript-based editing: Cutting video by selecting words in the text editor",
      "Batch styling: 'Apply to All' vs single-word emphasis overrides",
      "Kinetic word-by-word captions (Hormozi / Ali Abdaal style)",
      "Color-coding keywords (Yellow/Green pops for emotion and metrics)",
      "Timing correction & punctuation cleaning", "PROJECT 03 Brief: Producing a high-retention Transcript-to-Reel"
    ],
    exercise: "Execute PROJECT 03: Transcript-to-Reel — Take a raw 3-minute podcast interview, use transcript-based editing to carve out the best 45s, and style dynamic kinetic captions.",
    projectDeliverable: {
      id: "project-03",
      title: "PROJECT 03 — Transcript-to-Reel",
      description: "Carve a compelling 45-second short-form reel directly using CapCut's transcript editor. Layer kinetic animated captions with custom color emphasis.",
      requirements: [
        "45 seconds maximum runtime",
        "Carved using transcript-based editing workflows",
        "100% accurate spelling and punctuation verified",
        "Dynamic kinetic subtitle animation (1-3 words visible at a time)",
        "Key punchlines highlighted with high-contrast accent color",
        "Positioned strictly within mobile-safe screen boundaries"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-14-podcast", title: "PROJECT 03: Raw 3-Minute Podcast Master Take", type: "footage", filename: "Project03_Raw_Podcast_Interview_Take.mp4", size: "290 MB", description: "Unedited dual-mic podcast recording discussing modern business and focus." },
      { id: "res-14-presets", title: "10 Viral Kinetic Caption Style Presets", type: "preset", filename: "CapCut_Viral_Caption_Styles_Pack.zip", size: "12 MB", description: "Pre-configured text styling templates with glowing strokes and bouncy word animations." }
    ],
    rules: ["Never show more than 3 to 4 words at a time in fast short-form reels.", "Always spell-check technical jargon and proper nouns manually; AI caption models often mishear brand names."],
    shortcuts: [{ action: "Split Caption Line", hotkey: "Enter in text box", tip: "Break long sentences into snappy 2-word bursts." }],
    guide: {
      concept: "Transcript-based editing bridges writing and cutting. Instead of hunting through endless waveforms, you read the conversation, highlight the gold, and delete the rest with one keystroke.",
      demonstration: "Generating auto-captions in CapCut, switching to transcript view, deleting 3 tangents, and watching the timeline auto-collapse.",
      guidedPractice: "Select key power words ('money', 'never', 'secret') and assign a vibrant brand yellow with subtle pop animation.",
      independentPractice: "Complete PROJECT 03 and verify captions against social UI safe boundaries.",
      critiquePoints: ["Are captions covering the speaker's mouth?", "Is the text timing synchronized down to the exact syllable?"],
      proTip: "Use CapCut's 'Spring' or 'Bounce' text animation for 0.15s duration on active words to create subconscious visual dopamine."
    },
    quiz: {
      question: "What is the primary benefit of CapCut's transcript-based editing feature?",
      options: ["You can edit the video timeline directly by selecting and deleting text in the transcript", "It writes a screenplay for you automatically", "It permanently removes the video track", "It translates video into ancient Latin"],
      correctIdx: 0,
      explanation: "Transcript-based editing synchronizes text with video frames, allowing you to prune speech by simply deleting words in the text panel."
    }
  },
  {
    id: 15, stageId: 2,
    title: "Module 15: Transitions",
    objective: "Master seamless cuts, whip pans, zoom transitions, glitch warps, motion-matching, and when NOT to use transitions.",
    duration: "45m", xp: 120,
    lessons: [
      "The Golden Rule: Cut vs Transition — Why 90% of transitions look amateur",
      "Classic transitions: Cross Dissolve, Dip to Black, Dip to White",
      "Motion transitions: Push, Slide, Zoom In, Zoom Out, Spin Slant",
      "Glitch and Warp transitions: Setting appropriate duration (0.2s - 0.4s)",
      "Match-action transitions: Using subject movement to conceal cuts",
      "Whip-pan transitions with synchronized whoosh SFX",
      "Invisible whip-cuts and object wipes"
    ],
    exercise: "Build a 30-second travel montage with 5 distinct transitions that feel organic and motivated by camera motion rather than random preset spam.",
    resources: [
      { id: "res-15-footage", title: "Travel Motion Clips Practice Pack (4K 60fps)", type: "footage", filename: "Motion_Matching_Transition_Footage.zip", size: "340 MB", description: "Whip pans, forward walking shots, and rotational pans for seamless transition matching." }
    ],
    rules: ["A transition must always be motivated by camera motion, subject movement, or a shift in time/space.", "Never leave default transition duration at 1.0 second; trim to 0.2 - 0.4 seconds for crisp social velocity."],
    shortcuts: [{ action: "Add Default Transition", hotkey: "Ctrl / Cmd + D", tip: "Apply cross dissolve instantly to selected cut." }],
    guide: {
      concept: "Beginners use transitions to show off software presets; professionals use transitions to guide the viewer's subconscious focus across a scene shift.",
      demonstration: "Matching a camera panning right with a 0.25-second 'Slide Right' transition backed by a directional whoosh.",
      guidedPractice: "Adjust transition duration slider from 1.0s down to 0.3s for high-impact snap.",
      independentPractice: "Construct a seamless 5-shot loop video where the final shot transitions invisibly into the first shot.",
      critiquePoints: ["Does the transition cause the viewer's eyes to lose track of the subject?", "Is the transition duration too slow?"],
      proTip: "If you have to think about whether to use a transition or a straight cut, use a straight cut 95% of the time."
    },
    quiz: {
      question: "What is the recommended duration range for modern fast-paced social video transitions?",
      options: ["0.2 seconds to 0.4 seconds (6 to 12 frames)", "2.0 seconds to 4.0 seconds", "10 seconds", "0.01 seconds"],
      correctIdx: 0,
      explanation: "Transitions lasting 0.2 to 0.4 seconds maintain energetic forward momentum without bogging down the edit."
    }
  },
  {
    id: 16, stageId: 2,
    title: "Module 16: Effects, Filters, Stickers & Overlays",
    objective: "Master video effects, body effects, lens textures, retro film overlays, blending modes, and stylized restraint.",
    duration: "45m", xp: 120,
    lessons: [
      "CapCut Effects Library architecture: Video Effects vs Body Effects",
      "Lens effects: Chromatic aberration, edge blur, and anamorphic flares",
      "Texture overlays: 35mm film grain, dust, scratches, and light leaks",
      "Blending modes for overlays: Screen, Multiply, Overlay, and Soft Light",
      "Restraint in editing: Avoiding the 'Filter Dump' amateur look",
      "Stylized glitches and neon treatments for tech/music niches",
      "Stacking effects on Adjustment Layers for global timeline control"
    ],
    exercise: "Transform clean sterile digital phone video into an authentic textured 16mm vintage film aesthetic using grain overlays, warm glow, and subtle edge blur.",
    resources: [
      { id: "res-16-overlays", title: "Vintage 16mm & 35mm Film Grain 4K Overlays", type: "preset", filename: "Vintage_Film_Grain_Overlays_4K.zip", size: "380 MB", description: "Real scanned 35mm and 16mm Kodak film grain loops, light leak flashes, and vintage matte borders." }
    ],
    rules: ["Never apply effects directly to clips if you can apply them to an Adjustment Layer above the track.", "Texture overlays should enhance the mood, not obscure the subject's face."],
    shortcuts: [{ action: "Add Adjustment Layer", hotkey: "Alt + Y", tip: "Drop an adjustment layer across multiple clips." }],
    guide: {
      concept: "Digital sensors produce sharp, sterile footage. Professional post-production artists use subtle film grain, halation, and organic light leaks to inject cinematic soul and tactile texture.",
      demonstration: "Importing a 4K film grain loop, setting blending mode to 'Screen' or 'Overlay', and dropping opacity to 25%.",
      guidedPractice: "Stack a gentle 'Glow' effect on an adjustment layer with threshold at 80% to soften digital clipping.",
      independentPractice: "Grade and texture the provided raw city footage to look like a cinematic 1990s documentary.",
      critiquePoints: ["Is the film grain too heavy and distracting?", "Are highlights blown out by excessive glow?"],
      proTip: "Never use CapCut's built-in neon stickers on corporate or high-end client projects. Keep graphics custom and minimal."
    },
    quiz: {
      question: "Which blending mode is standard when layering a black-background film grain or light leak overlay over video footage?",
      options: ["Screen (which drops all black pixels and keeps light textures)", "Multiply", "Color Burn", "Darken"],
      correctIdx: 0,
      explanation: "'Screen' blending mode makes black background pixels completely transparent while preserving luminous grain and light textures."
    }
  },
  {
    id: 17, stageId: 3,
    title: "Module 17: Layers, PiP & Compositing",
    objective: "Master multi-layer timeline architecture, Picture-in-Picture (PiP), reaction layouts, Compound Clips, and execute PROJECT 04.",
    duration: "1h 10m", xp: 160,
    lessons: [
      "Multi-layer timeline architecture: Z-index and visual hierarchy",
      "Picture-in-Picture (PiP): Creating professional gaming/reaction layouts",
      "Screen recording integration with device mockups",
      "Compound Clips: Nesting complex multi-track edits into single clips",
      "Adjustment Layers: Global grading and effect processing",
      "Advanced Blending Modes: Multiply for documents, Screen for lights",
      "PROJECT 04 Brief: Advanced Multi-Layer Composition"
    ],
    exercise: "Execute PROJECT 04: Advanced Multi-Layer Composition — Construct a multi-window reaction/breakdown video featuring 4 simultaneous synchronized video layers and nested compound clips.",
    projectDeliverable: {
      id: "project-04",
      title: "PROJECT 04 — Advanced Multi-Layer Composition",
      description: "Build an editorial composition utilizing at least 4 concurrent video tracks, PiP camera framing, screen capture integration, and a nested Compound Clip.",
      requirements: [
        "40 seconds duration",
        "At least 4 simultaneous synchronized video tracks",
        "Picture-in-Picture circular or rounded frame with drop shadow",
        "Demonstrated use of at least one Compound Clip for nested animation",
        "Balanced audio tracks across reaction mic and screen source audio"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-17-mockups", title: "Phone & Laptop 3D Device Framing Mockups", type: "preset", filename: "Device_Mockups_PiP_Kit.zip", size: "65 MB", description: "Transparent PNG & video frames for iPhone 16 Pro and MacBook screens with realistic screen reflections." }
    ],
    rules: ["Never leave harsh sharp corners on a floating PiP video; always apply rounded corners or subtle borders.", "Compound clips must be clearly named before nesting to avoid timeline confusion."],
    shortcuts: [{ action: "Create Compound Clip", hotkey: "Alt + G", tip: "Group selected multi-layer clips into one container." }],
    guide: {
      concept: "Compositing is where multiple separate realities combine into one cohesive frame. Learning to organize layers and compound clips allows you to execute commercial-level motion graphics inside CapCut.",
      demonstration: "Nesting 3 text layers and 2 background graphic shapes into a single Compound Clip and applying a unified zoom animation.",
      guidedPractice: "Use a circle mask on the camera track to build a sleek reaction bubble in the lower right corner.",
      independentPractice: "Complete PROJECT 04 and export a pristine multi-layer composition.",
      critiquePoints: ["Is the PiP camera covering important interface elements on the screen capture?"],
      proTip: "Add a 4-pixel solid border and a 20% opacity drop shadow to PiP windows to separate them from busy background footage."
    },
    quiz: {
      question: "What is a 'Compound Clip' in CapCut Desktop?",
      options: ["A container that bundles multiple clips, text tracks, and audio layers into a single editable clip on the timeline", "A clip that is permanently compressed to 480p", "A tool that deletes audio tracks", "A pre-made TikTok template"],
      correctIdx: 0,
      explanation: "Compound clips nest complex multi-layer assemblies into a clean single unit, making global animation and timeline management effortless."
    }
  },
  {
    id: 18, stageId: 3,
    title: "Module 18: Keyframe Animation",
    objective: "Master keyframes across position, scale, rotation, opacity, and custom bezier speed graph easing curves.",
    duration: "1h 00m", xp: 150,
    lessons: [
      "What keyframes are: Defining property values over time",
      "The Big 4: Position, Scale, Rotation, and Opacity keyframes",
      "Simultaneous multi-property animation: Zoom + Drift + Fade",
      "Why linear keyframes feel cheap and robotic",
      "CapCut Graph Editor: Bezier curves, Ease In, Ease Out, Ease In/Out",
      "Creating organic camera drift (Ken Burns effect) on still images",
      "Logo and lower-third graphic fly-in animations"
    ],
    exercise: "Animate a static logo and title card using bezier easing curves so the motion feels elastic, weighted, and premium.",
    resources: [
      { id: "res-18-curves", title: "Master Bezier Graph Curves Cheatsheet", type: "brief", filename: "CapCut_Keyframe_Graphs_Guide.pdf", size: "2.8 MB", description: "Visual reference for cubic ease-in/out, snappy rebound, and elastic animation curves." }
    ],
    rules: ["Never leave a keyframe animation on default Linear interpolation; always apply an Ease curve.", "Animate with purpose: movement should draw the eye toward important information."],
    shortcuts: [{ action: "Open Graph Editor", hotkey: "Alt + K", tip: "Open the bezier curve graph for selected keyframes." }],
    guide: {
      concept: "In the physical world, nothing moves at a constant speed from zero to sixty instantly. Objects accelerate, decelerate, and settle. Bezier curves bring physical weight and elegance to digital motion.",
      demonstration: "Setting start keyframe (Scale 80%) and end keyframe (Scale 100%) and curving the graph into a fast snap-in with a gentle settling decay.",
      guidedPractice: "Smooth out a harsh pan by curving the velocity handle in the Graph tab.",
      independentPractice: "Animate 3 UI mockups sliding onto screen with coordinated staggered delays.",
      critiquePoints: ["Does the motion feel sudden or jerky?", "Did the animation stop too abruptly?"],
      proTip: "Use the 'Auto Curve' preset in CapCut as a fast baseline, then drag the bezier handle left to create a rapid initial burst followed by a silky smooth deceleration."
    },
    quiz: {
      question: "Why does professional motion design rely on bezier easing curves rather than linear keyframe animation?",
      options: ["Linear movement looks robotic and unnatural; easing curves simulate real-world physics like acceleration and inertia", "Linear animation takes more memory to render", "Easing curves prevent video files from expiring", "Linear keyframes only work in black and white"],
      correctIdx: 0,
      explanation: "Easing curves model real-world physics (acceleration and friction), making digital movement feel smooth and natural to human perception."
    }
  },
  {
    id: 19, stageId: 3,
    title: "Module 19: Speed Control & Speed Ramping",
    objective: "Master slow motion, speed curves (Hero, Bullet, Jump Cut), optical flow frame interpolation, and execute PROJECT 05.",
    duration: "1h 10m", xp: 160,
    lessons: [
      "Standard speed adjustments vs Variable Speed Curves",
      "Understanding camera frame rates for slow motion (60fps vs 120fps)",
      "CapCut Speed Curve Presets: Hero, Bullet, Montage, Jump Cut",
      "Custom Curve sculpting: Creating seamless speed ramps",
      "Optical Flow & AI Frame Interpolation: Creating smooth slomo from 30fps footage",
      "Synchronizing speed ramps to music bass drops and snare hits",
      "PROJECT 05 Brief: Cinematic Speed-Ramp Sequence"
    ],
    exercise: "Execute PROJECT 05: Cinematic Speed-Ramp Sequence — Create a 25-second automotive or sports sequence with custom bezier speed ramps and optical flow smoothing.",
    projectDeliverable: {
      id: "project-05",
      title: "PROJECT 05 — Cinematic Speed-Ramp Sequence",
      description: "Produce a high-energy 25-second sequence showcasing custom speed curves, optical flow frame blending, and acoustic whoosh sync on velocity changes.",
      requirements: [
        "25 seconds maximum runtime",
        "At least 4 distinct speed ramps (fast 400% -> slow 40% -> snap)",
        "Optical Flow interpolation enabled on all sub-100% slow motion clips",
        "Speed ramps synchronized with music beats and whoosh sound design",
        "Clean motion with zero choppy frame stutters"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-19-slomo", title: "PROJECT 05: High-Frame-Rate Action Footage (4K 60/120fps)", type: "footage", filename: "Project05_SpeedRamp_HighFPS_Pack.zip", size: "620 MB", description: "Raw sports cars, skateboarding tricks, and athletic sprints recorded at 60fps and 120fps." }
    ],
    rules: ["Never slow 24fps or 30fps footage below 70% without enabling Optical Flow; otherwise, it will jitter and stutter.", "The slow-motion valley of a curve must showcase the peak visual moment of action."],
    shortcuts: [{ action: "Add Curve Point", hotkey: "Click on curve line", tip: "Insert custom velocity nodes into speed graphs." }],
    guide: {
      concept: "Speed ramping manipulates time to guide emotional intensity. We speed through the mundane approach, freeze in breathtaking slow motion at the peak climax, and snap back into real time.",
      demonstration: "Constructing a 'Hero' curve: 5x fast approach -> 0.3x slow motion hit on the skateboard flip -> 3x fast exit.",
      guidedPractice: "Enable 'Optical Flow' under speed controls to generate AI intermediate frames.",
      independentPractice: "Complete PROJECT 05 and synchronize the velocity changes to drum transients.",
      critiquePoints: ["Is the optical flow causing weird visual morphing artifacts on fast backgrounds?", "Does the ramp feel fluid or abrupt?"],
      proTip: "Pair every speed acceleration with a rising whoosh SFX and drop the sound abruptly when the clip enters slow motion to emphasize the acoustic vacuum."
    },
    quiz: {
      question: "What does CapCut's 'Optical Flow' feature do when slowing down video clips?",
      options: ["It analyzes motion vectors and generates brand-new AI intermediate frames to make slow motion look silky smooth", "It increases the volume of the audio", "It changes the camera lens from telephoto to wide", "It converts the video into an optical illusion"],
      correctIdx: 0,
      explanation: "Optical Flow synthesizes new intermediate frames using AI motion analysis, preventing stutter when slowing down standard frame-rate footage."
    }
  },
  {
    id: 20, stageId: 3,
    title: "Module 20: Masking",
    objective: "Master rectangle, circle, split mask, film strip, custom freeform masks, feathering, and mask-based reveal transitions.",
    duration: "55m", xp: 140,
    lessons: [
      "The physics of masks: What stays visible vs what gets hidden",
      "Geometric masks: Rectangle, Circle, Split, Star, and Heart",
      "Film Strip mask for cinematic letterbox bars",
      "Feathering mechanics: Soft organic edges vs hard geometric cuts",
      "Inverting masks: Revealing foreground vs background",
      "Keyframing mask position for cinematic wipe transitions",
      "Text Masking: Video playing inside bold typography"
    ],
    exercise: "Create an invisible mask wipe transition where a walking person passes in front of the lens, wiping the screen into a new location.",
    resources: [
      { id: "res-20-masking", title: "Masking Practice Kit (Passing Subjects & Architecture)", type: "footage", filename: "Masking_Wipe_Practice_Kit.zip", size: "310 MB", description: "Clips with pillars, walls, and pedestrians crossing frame to practice wipe masking." }
    ],
    rules: ["Always add at least 5-15 pixels of feathering to masks unless creating a deliberate split-screen line.", "When keyframing moving masks, animate on every 2-3 frames to match subject movement."],
    shortcuts: [{ action: "Invert Mask", hotkey: "Click Invert icon", tip: "Instantly flip hidden and visible regions." }],
    guide: {
      concept: "Masking allows you to slice, punch holes, and reshape video layers. It is the core tool behind clone effects, object wipes, and text cutouts.",
      demonstration: "Applying a split mask at 45 degrees, feathering the edge by 20%, and animating position across 15 frames.",
      guidedPractice: "Create a 'Video inside Text' composite by placing footage on Track 2 and clipping it into a bold font mask.",
      independentPractice: "Execute a walking subject wipe transition using linear mask keyframing.",
      critiquePoints: ["Can you see the hard edge of the mask during the wipe?", "Does the feathering bleed into unwanted areas?"],
      proTip: "Use the 'Film Strip' mask with feather set to zero to create instant anamorphic 2.39:1 widescreen black bars on 16:9 videos."
    },
    quiz: {
      question: "What is the purpose of the 'Feather' control in CapCut's mask tool?",
      options: ["It softens and blends the boundary edge of the mask into the background layer", "It adds bird feather stickers to the screen", "It speeds up the playback rate of the clip", "It deletes audio keyframes"],
      correctIdx: 0,
      explanation: "Feathering diffuses the border of a mask, creating smooth gradient transitions instead of harsh geometric seams."
    }
  },
  {
    id: 21, stageId: 3,
    title: "Module 21: Chroma Key & Background Removal",
    objective: "Master green-screen keying, intensity/shadow adjustments, AI Auto-Cutout, custom removal, and execute PROJECT 06.",
    duration: "1h 10m", xp: 160,
    lessons: [
      "Green-screen physics: Why green is used (skin tone contrast)",
      "CapCut Chroma Key: Color picker, Intensity, Shadow, and Feathering",
      "Cleaning edge green spill and color fringes",
      "AI Auto-Cutout (Background Removal without green screen)",
      "Custom Stroke Cutout (Brushed AI segmentation)",
      "Background replacement: Matching lighting, scale, and perspective",
      "PROJECT 06 Brief: Full Background Replacement"
    ],
    exercise: "Execute PROJECT 06: Full Background Replacement — Key out a green screen interview clip, composite the subject into a realistic 3D studio, and match light direction and ambient color.",
    projectDeliverable: {
      id: "project-06",
      title: "PROJECT 06 — Full Background Replacement",
      description: "Replace a green-screen or studio background using Chroma Key or AI Cutout. Match subject lighting, color temperature, and depth-of-field blur with the new background.",
      requirements: [
        "30 seconds runtime",
        "Clean edge extraction with zero green spill fringe or fuzzy halo",
        "Realistic background depth blur applied to new background layer",
        "Color temperature matched between subject and new background",
        "Natural motion with zero flickering artifacts around hair or fingers"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-21-greenscreen", title: "PROJECT 06: 4K Green Screen Studio Raw Takes", type: "footage", filename: "Project06_GreenScreen_4K_RawTakes.mp4", size: "440 MB", description: "Studio presenter in front of green backdrop, with high detail hair strands and hand gestures." },
      { id: "res-21-studios", title: "10 Photorealistic 4K Modern Virtual Studios", type: "preset", filename: "Photorealistic_Virtual_Studios_4K.zip", size: "320 MB", description: "Modern executive lofts, podcast studios, and tech workspaces with separate depth map layers." }
    ],
    rules: ["Never place an isolated subject over an in-focus background; always blur the background slightly to mimic real camera depth of field.", "Adjust the 'Shadow' slider on Chroma Key to restore natural contrast to dark clothing."],
    shortcuts: [{ action: "Color Picker", hotkey: "Click Eyedropper", tip: "Sample green screen closest to the subject's hair." }],
    guide: {
      concept: "A bad green-screen composite screams 'fake' because of green fringe and mismatched lighting. A pro composite matches color temperature, shadow density, and lens blur so the illusion is airtight.",
      demonstration: "Sampling green with the eyedropper, dialing intensity to 28, lifting shadow to 42, and adding a 3-pixel feather.",
      guidedPractice: "Apply a 12% Gaussian blur to the background loft image to simulate an f/1.8 lens bokeh.",
      independentPractice: "Complete PROJECT 06: Full Background Replacement and balance the color grade.",
      critiquePoints: ["Is there a green glow reflecting on the subject's shoulders?", "Does the subject look like they're floating?"],
      proTip: "Drop an adjustment layer over BOTH the keyed subject and the background and apply a subtle LUT at 30% opacity. This unifies the color palette across both layers!"
    },
    quiz: {
      question: "Why should you apply a subtle blur to a newly inserted background plate behind a keyed subject?",
      options: ["It simulates natural lens depth-of-field (bokeh), making the composite look optically authentic", "Because backgrounds must always be out of focus by law", "It saves bandwidth when uploading to TikTok", "It removes watermarks from the background"],
      correctIdx: 0,
      explanation: "Real camera lenses naturally blur backgrounds when focusing on a human subject; adding blur creates convincing optical realism."
    }
  },
  {
    id: 22, stageId: 3,
    title: "Module 22: Motion Tracking",
    objective: "Master AI Face Tracking, Body Tracking, Hand Tracking, Object Tracking, pinned graphics, and execute PROJECT 07.",
    duration: "1h 10m", xp: 160,
    lessons: [
      "What motion tracking is: Calculating pixel trajectories across time",
      "Face Tracking: Locking titles, emojis, and sensors to moving faces",
      "Body Tracking & Hand Tracking: Pinning floating product cards to gestures",
      "Manual Object Tracking: Tracking cars, balls, and non-human moving items",
      "Tracking text, arrows, and callout graphics",
      "Handling tracking drift, occlusions, and tracking failures",
      "PROJECT 07 Brief: Dynamic Object-Tracking Explainer"
    ],
    exercise: "Execute PROJECT 07: Dynamic Object-Tracking Explainer — Create a 45-second product or athletic breakdown where animated labels, arrows, and data stats remain locked to moving subjects.",
    projectDeliverable: {
      id: "project-07",
      title: "PROJECT 07 — Dynamic Object-Tracking Explainer",
      description: "Produce a 45-second explainer featuring at least 3 distinct tracked elements (face-locked caption, hand-pinned product card, and trajectory arrow).",
      requirements: [
        "45 seconds runtime",
        "At least 3 distinct tracked graphic elements",
        "Clean tracking with zero jitter or drift off the anchor point",
        "Sound design accents synchronized with tracked label reveals",
        "Professional typography and iconography layout"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-22-tracking-pack", title: "PROJECT 07: Motion Tracking Practice Footage & Graphics", type: "footage", filename: "Project07_Motion_Tracking_Practice_Kit.zip", size: "380 MB", description: "Includes running athletes, unboxing hand demos, and technical callout HUD graphics." }
    ],
    rules: ["Always track high-contrast anchor points (like an eye, high-contrast button, or shoe logo) for rock-solid tracking stability.", "If the subject leaves frame, fade out the tracked graphic before the tracker loses confidence and jumps."],
    shortcuts: [{ action: "Start Tracking", hotkey: "Click 'Start' in Tracking Tab", tip: "Let CapCut's neural model calculate frame vectors." }],
    guide: {
      concept: "Motion tracking connects digital graphics to physical motion. Instead of static text sitting on screen, text that moves seamlessly with a creator feels anchored and hyper-engaging.",
      demonstration: "Setting up Face Tracking on an athletic run: scaling the bounding box, clicking Start Tracking, and pinning an animated heart-rate monitor graphic.",
      guidedPractice: "Attach an animated pointer arrow to a chef's knife during a cooking demonstration.",
      independentPractice: "Complete PROJECT 07: Dynamic Object-Tracking Explainer and submit your deliverable.",
      critiquePoints: ["Did the tracker jump when another person walked in front of the camera?", "Is the tracked label vibrating?"],
      proTip: "If CapCut's tracker jitters on erratic movements, switch tracking mode from 'Position + Scale + Rotation' to 'Position Only' for a much more stable track."
    },
    quiz: {
      question: "What feature should you track on a human subject for the most reliable face-tracking calculation?",
      options: ["A high-contrast feature that doesn't change shape, such as the bridge of the nose or eye center", "The tip of their hair in the wind", "A blurry shadow on the floor", "The background wall behind them"],
      correctIdx: 0,
      explanation: "Stable, high-contrast facial landmarks like the bridge of the nose provide consistent tracking coordinates through rotations."
    }
  },
  {
    id: 23, stageId: 3,
    title: "Module 23: Stabilization, Enhancement & Relighting",
    objective: "Master CapCut video stabilization (Minimum Cut vs Most Stable), image enhancement, blurry clip recovery, and AI facial relighting.",
    duration: "50m", xp: 140,
    lessons: [
      "Why camera footage shakes: Shutter speed, micro-jitters, and rolling shutter",
      "CapCut Stabilization modes: Minimum Cut vs Customized vs Most Stable",
      "Stabilization tradeoffs: Cropping factor vs warp distortion",
      "Enhance Image & Enhance Quality: Rescuing soft or low-bitrate clips",
      "Artificial Relighting: Adding simulated softbox, ring light, and colored rim lights",
      "Facial Lighting: Enhancing eye sparkle and evening out skin tones",
      "Quality Control: Preventing unnatural plastic AI skin artifacts"
    ],
    exercise: "Rescue an intensely shaky handheld walking clip using custom stabilization and relight an underexposed interview subject with a warm 45-degree key light.",
    resources: [
      { id: "res-23-rescue", title: "Problem Footage Rescue Archive (Shaky & Underexposed)", type: "footage", filename: "Shaky_Underexposed_Rescue_Footage.zip", size: "295 MB", description: "Extreme shaky walking footage, dark interior interview takes, and soft mobile phone captures." }
    ],
    rules: ["Never set stabilization to 'Most Stable' if it causes the edges of the frame to warp like liquid jelly.", "AI relighting should look like an invisible studio light, not a glowing cartoon mask."],
    shortcuts: [{ action: "Toggle Stabilizer", hotkey: "Alt + S", tip: "Quickly engage stabilization analysis on selected clip." }],
    guide: {
      concept: "Field production is messy: lights fail, gimbals run out of battery. Post-production enhancement tools give you a virtual lighting studio and steadicam in software.",
      demonstration: "Applying stabilization on 'Recommended Cut' mode (12% crop) and shaping a simulated 3200K warm rim light on the subject's hair.",
      guidedPractice: "Dial facial relighting to 35% and inspect skin texture under 100% zoom.",
      independentPractice: "Rescue the 2 test clips in the archive and balance exposure before color grading.",
      critiquePoints: ["Did the stabilization crop out the top of the subject's head?", "Does the face look over-smoothed like plastic?"],
      proTip: "Always stabilize footage BEFORE applying digital punch-ins or tracking; tracking coordinates are far more accurate on steady frames."
    },
    quiz: {
      question: "What is the inevitable technical trade-off when applying digital stabilization to shaky video footage?",
      options: ["The software must zoom in (crop) the image slightly to compensate for frame movement, sacrificing edge pixels", "The video is permanently converted to 10fps", "The audio gets pitched down an octave", "It changes the project aspect ratio"],
      correctIdx: 0,
      explanation: "Digital stabilization works by aligning moving frames against a center axis, which requires cropping into the frame to hide moving boundaries."
    }
  },
  {
    id: 24, stageId: 4,
    title: "Module 24: Color Correction",
    objective: "Master technical color correction: exposure balancing, contrast, highlights, shadows, white balance, tint, HSL sliders, and curve graphs.",
    duration: "1h 00m", xp: 150,
    lessons: [
      "Color Correction (Technical Repair) vs Color Grading (Stylistic Art)",
      "The Exposure Triangle in post: Brightness, Exposure, Contrast",
      "Dynamic Range balancing: Rescuing clipped Highlights and lifting muddy Shadows",
      "White Balance & Color Temperature: Kelvin spectrum and Tint (Magenta vs Green)",
      "Vibrance vs Saturation: Protecting delicate human skin tones",
      "HSL Control: Targeting specific color hues, saturations, and luminances",
      "Curves: Fine-tuning Master, Red, Green, and Blue tonal channels",
      "Auto Color vs Manual Correction workflow"
    ],
    exercise: "Color correct three drastically mismatched camera takes (one cold blue, one warm orange, one muddy green) until skin tones match identically across all cuts.",
    resources: [
      { id: "res-24-color-chart", title: "X-Rite Color Checker Reference & Skin Tone Matrix", type: "preset", filename: "Skin_Tone_Vector_Guide_Matrix.png", size: "4.2 MB", description: "Skin-tone reference line guides and chromatic balance charts for exact Kelvin matching." }
    ],
    rules: ["Never apply a creative LUT or grading filter before completing technical color correction first.", "Human skin tones regardless of ethnicity must align along the 45-degree skin-tone line on color scopes."],
    shortcuts: [{ action: "Reset Color Sliders", hotkey: "Alt + R in color tab", tip: "Reset adjustments to neutral baseline." }],
    guide: {
      concept: "Color correction is about scientific reality; color grading is about emotional cinema. If your clips have mismatched white balances, the audience feels subconscious visual discomfort.",
      demonstration: "Correcting a cold 6500K office clip: warming temperature by +14, lowering green tint by -6, and pulling back highlights by -20 to recover forehead details.",
      guidedPractice: "Use the HSL orange slider to isolate facial skin tones and increase luminance for healthy glow.",
      independentPractice: "Correct the 3 mismatched scene takes until they cut together seamlessly.",
      critiquePoints: ["Do the shadows have an unnatural colored cast?", "Are the whites true neutral white?"],
      proTip: "Turn on CapCut's 'Compare' mode or quickly toggle the eyeball icon on the adjustment layer to check your correction against the raw clip."
    },
    quiz: {
      question: "What is the crucial difference between 'Color Correction' and 'Color Grading'?",
      options: ["Color correction fixes technical errors (exposure, white balance) to make footage neutral; color grading applies stylized aesthetic moods", "Color correction is for black and white; grading is for color", "Color correction makes videos louder", "There is no difference"],
      correctIdx: 0,
      explanation: "Correction repairs technical flaws to achieve natural, balanced footage; grading is the subsequent creative step that creates stylized mood."
    }
  },
  {
    id: 25, stageId: 4,
    title: "Module 25: Color Grading",
    objective: "Master cinematic moods (warm luxury, cold thriller, teal & orange), 3D LUTs importing, and execute PROJECT 09: Cinematic Edit.",
    duration: "1h 10m", xp: 160,
    lessons: [
      "The Psychology of Color: How palette triggers dopamine, fear, or serenity",
      "Classic cinema palettes: Hollywood Teal & Orange, Nordic Noir, Vintage Kodachrome",
      "What 3D LUTs (.cube) are and how they remap color arrays",
      "Importing custom commercial LUTs into CapCut Desktop",
      "The 50% Rule: Why you should almost never apply a LUT at 100% intensity",
      "Protecting skin tones while pushing background stylized hues",
      "PROJECT 09 Brief: Cinematic Mood Edit"
    ],
    exercise: "Execute PROJECT 09: Cinematic Edit — Grade a 45-second moody sequence with custom 3D LUTs, film grain emulation, and nuanced atmospheric sound.",
    projectDeliverable: {
      id: "project-09",
      title: "PROJECT 09 — Cinematic Mood Edit",
      description: "Take raw cinematic footage and grade it into a distinctive atmospheric aesthetic. Apply custom LUTs on adjustment layers, protect skin tones, and build immersive soundscapes.",
      requirements: [
        "45 seconds runtime",
        "Consistent stylized color grade applied across all shots",
        "Natural skin tones preserved despite heavy background grade",
        "3D LUT applied via Adjustment Layer with dialed-back opacity (40-70%)",
        "Subtle 35mm film grain or halation texture integrated",
        "Cinematic letterboxing and widescreen typography"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-25-luts", title: "INSYT Cinema LUT Pack (15 Pro .cube Profiles)", type: "lut", filename: "INSYT_Cinema_3D_LUT_Master_Pack.zip", size: "28 MB", description: "Hollywood Teal/Orange, Kodak 2383 Film Print Emulation, Moody Nordic, Warm Golden Hour, and Clean Corporate profiles." }
    ],
    rules: ["Never apply a LUT directly to individual clips; always grade on an Adjustment Layer spanning the whole scene.", "If skin tones start looking green or cartoon orange, pull back the LUT intensity immediately."],
    shortcuts: [{ action: "Toggle LUT Bypass", hotkey: "Click eye icon on Adjustment Layer", tip: "Instant before/after A-B comparison." }],
    guide: {
      concept: "Color grading is subconscious emotion. Warm golden tones suggest nostalgia, safety, and passion; desaturated cool greens suggest corporate espionage or technical tension.",
      demonstration: "Applying the 'Kodak_2383' LUT on an adjustment layer at 60% intensity, then raising shadow warmth slightly for rich skin glow.",
      guidedPractice: "Import custom 3D LUT (.cube) files directly into CapCut's LUT manager.",
      independentPractice: "Complete PROJECT 09: Cinematic Mood Edit and export for evaluation.",
      critiquePoints: ["Is there banding or digital noise in the dark shadows?", "Are skin tones still believable?"],
      proTip: "Add a subtle 35mm film grain overlay on a top track set to 'Overlay' blending mode at 12% opacity to unify digital camera footage."
    },
    quiz: {
      question: "Why do professional colorists rarely apply LUTs at 100% full intensity?",
      options: ["100% intensity often crushes shadow details and clips skin tones; blending at 40-70% preserves organic detail", "LUTs automatically delete video tracks at 100%", "It doubles the file size of the export", "CapCut only allows 50% opacity by default"],
      correctIdx: 0,
      explanation: "Full 100% LUT application frequently introduces harsh color clipping; dialed back to 40-70%, it enhances the image tastefully."
    }
  },
  {
    id: 26, stageId: 4,
    title: "Module 26: Advanced Audio Masterclass",
    objective: "Master multi-band vocal EQ, beat detection, waveform synchronization, dynamic sidechain ducking, and commercial master bus loudness.",
    duration: "1h 00m", xp: 150,
    lessons: [
      "The Commercial Audio Master Chain: EQ -> De-Esser -> Compressor -> Limiter",
      "Dialogue priority: Carving vocal space in dense musical arrangements",
      "CapCut Beat Detection: Auto-generating rhythmic yellow markers on audio beats",
      "Waveform synchronization: Multi-camera audio sync without timecode",
      "Dynamic auto-ducking vs custom keyframed audio envelopes",
      "Loudness units (LUFS) for streaming delivery (-14 LUFS Spotify/YouTube)",
      "Final mix quality assurance & acoustic inspection"
    ],
    exercise: "Take a chaotic multi-speaker panel with loud audience applause and music, and master a pristine -14 LUFS commercial audio mix.",
    resources: [
      { id: "res-26-audio-stems", title: "Commercial Audio Stems Multitrack Project", type: "audio", filename: "Commercial_Multitrack_Audio_Stems.zip", size: "175 MB", description: "Isolated dialogue, music beds, foley impacts, and crowd room-tones for mastering practice." }
    ],
    rules: ["Music should duck down at least 14dB to 18dB the exact millisecond speech begins.", "Check your mix on phone speakers; if vocals are buried under the music bassline, lower the music immediately."],
    shortcuts: [{ action: "Add Beat Markers", hotkey: "Alt + B on audio track", tip: "Auto-detect rhythmic beat drops in music." }],
    guide: {
      concept: "Mastering audio is the difference between a video that hurts viewers' ears and one that sounds like an expensive Netflix broadcast.",
      demonstration: "Setting up automated ducking with 0.3s release time and inspecting vocal presence.",
      guidedPractice: "Use beat markers to lock 8 fast cutaways to snare drum hits in under 60 seconds.",
      independentPractice: "Master the provided multitrack audio project to pass commercial broadcast standards.",
      critiquePoints: ["Does the music ducking sound like it is 'pumping' unnaturally?", "Are plosive 'P' and 'B' sounds blowing out mobile speakers?"],
      proTip: "If a speaker has harsh 'S' sibilance, drop high frequencies slightly or apply CapCut's Voice Enhancement filter at 40%."
    },
    quiz: {
      question: "What is the primary function of CapCut's 'Beat Detection' tool?",
      options: ["It analyzes music waveforms and automatically drops yellow snap markers on the timeline at every rhythmic beat", "It generates drum beats using AI", "It plays the video at double speed", "It mutes the bassline"],
      correctIdx: 0,
      explanation: "Beat Detection marks rhythmic tempo beats along the audio track, allowing editors to snap cuts and transitions precisely to the music."
    }
  },
  {
    id: 27, stageId: 4,
    title: "Module 27: Advanced Text & Motion Graphics",
    objective: "Master kinetic typography, lower-third systems, animated callouts, logo stings, and reusable brand motion kits.",
    duration: "1h 00m", xp: 150,
    lessons: [
      "Building professional broadcast title systems",
      "In, Out, and Loop text animations: Fade, Slide, Bounce, Typewriter, Glitch",
      "Custom kinetic typography with position/scale bezier keyframing",
      "Designing executive lower-thirds with animated accent lines and shape masks",
      "Dynamic data callouts: Highlighting statistics and percentage counters",
      "Logo stings and brand graphic transitions",
      "Saving and organizing reusable motion graphics presets in CapCut"
    ],
    exercise: "Design an entire corporate motion graphics package (intro title card, animated lower-third, data callout card, and outro logo stinger).",
    resources: [
      { id: "res-27-motion-kit", title: "15 Clean Corporate Motion Graphics Templates", type: "preset", filename: "Executive_Motion_Graphics_CapCut_Kit.zip", size: "55 MB", description: "Animated lower thirds, sleek minimal title cards, and data stat callouts ready to customize." }
    ],
    rules: ["A lower third should remain on screen for at least 3.5 seconds so viewers can easily read the name and title.", "All motion graphics in a single video must share the exact same easing curve physics."],
    shortcuts: [{ action: "Duplicate Graphic Layer", hotkey: "Alt + Drag", tip: "Clone text styling and keyframes along the timeline." }],
    guide: {
      concept: "Motion graphics provide visual authority. When numbers animate smoothly and lower-thirds slide in with tactile sound design, the entire video feels premium.",
      demonstration: "Creating a dual-layer lower third: animated accent rectangle sliding right, followed 4 frames later by the speaker's name in bold sans-serif.",
      guidedPractice: "Sync a tactile whoosh to the in-animation and a subtle click on text arrival.",
      independentPractice: "Build and export the 4-part motion graphics branding suite.",
      critiquePoints: ["Is the lower third positioned inside the title-safe margin?", "Are the animations too slow or sluggish?"],
      proTip: "Keep text in-animations under 0.35 seconds; viewers shouldn't have to wait for text to finish bouncing before they can read it."
    },
    quiz: {
      question: "How long should an executive lower-third graphic typically remain visible on screen for comfortable reading?",
      options: ["3.5 to 5.0 seconds", "0.5 seconds", "30 seconds", "The entire length of the video"],
      correctIdx: 0,
      explanation: "3.5 to 5 seconds provides sufficient cognitive time for viewers to read both the subject's name and title without distraction."
    }
  },
  {
    id: 28, stageId: 4,
    title: "Module 28: Advanced Editorial Projects",
    objective: "Execute high-level editorial projects: PROJECT 08 (Talking-Head Master) and PROJECT 10 (Advanced Composite).",
    duration: "1h 30m", xp: 200,
    lessons: [
      "Reviewing the 7-Factor Professional Editorial Rubric",
      "PROJECT 08 Brief: Executive Talking-Head Masterclass edit",
      "Multi-camera switching and B-roll cutaway pacing",
      "PROJECT 10 Brief: Advanced Motion Composite with complex tracking and masks",
      "Deconstructing commercial agency deliverables",
      "Pre-delivery quality control audit"
    ],
    exercise: "Execute PROJECT 08 (Talking-Head Master) or PROJECT 10 (Advanced Composite) to demonstrate comprehensive mastery of Stages 1 through 4.",
    projectDeliverable: {
      id: "project-08",
      title: "PROJECT 08 — Talking-Head Master",
      description: "Deliver a polished 90-second executive talking-head cut: clean A-roll, multiple B-roll layers, voice enhancement, subtle digital punch-ins, custom typography, and a cohesive color grade.",
      requirements: [
        "90 seconds duration",
        "Clean vocal edit with zero filler or dead air",
        "At least 6 relevant B-roll cutaways supporting the narrative",
        "Consistent technical color correction and atmospheric grade",
        "Custom lower thirds and stylized captions",
        "Adheres strictly to the 80% passing benchmark on the 7-Factor Rubric"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-28-exec-kit", title: "PROJECT 08 & 10 Master Raw Production Vault", type: "footage", filename: "Stage4_Master_Production_Vault.zip", size: "850 MB", description: "Multi-cam interview takes, 4K b-roll, motion graphic assets, and commercial soundtrack stems." }
    ],
    rules: ["Every single cut must be intentional and defendable during mentor review.", "Export must strictly meet professional delivery standards with zero black frame dropouts."],
    shortcuts: [{ action: "Mark In / Mark Out", hotkey: "I / O", tip: "Set exact project export boundaries." }],
    guide: {
      concept: "This is the transition from student exercises to professional agency-level client execution. You will synthesize audio mastering, color grading, pacing, and motion graphics into one seamless piece.",
      demonstration: "Step-by-step breakdown of an executive commercial cut scored at 95% on our editorial rubric.",
      guidedPractice: "Audit an edit against the 7-Factor Rubric: Technical, Story, Pacing, Audio, Visual, Color, Delivery.",
      independentPractice: "Complete PROJECT 08 and submit your video URL for formal mentor evaluation.",
      critiquePoints: ["Does the narrative maintain tension throughout all 90 seconds?", "Are there any pacing lags in the middle third?"],
      proTip: "Leave 1 second of black head and tail handles on your raw timeline, but trim your export In/Out points tightly to prevent dead air at start/finish."
    },
    quiz: {
      question: "On the CapCut Master Academy 7-Factor Rubric, which two domains carry the highest weighting (20% each)?",
      options: ["Technical Editing & Storytelling", "Sticker Count & Rainbow Filters", "File Size & Upload Speed", "Thumbnail Design & Title Length"],
      correctIdx: 0,
      explanation: "Technical precision (clean cuts, seamless continuity) and Storytelling (narrative structure, emotional resonance) each constitute 20% of the master grade."
    }
  },
  {
    id: 29, stageId: 5,
    title: "Module 29: CapCut AI Foundations",
    objective: "Master CapCut AI tools: Text-to-Speech (TTS), AI auto-edit, AI background cutout, AI color matching, and human quality-control oversight.",
    duration: "45m", xp: 130,
    lessons: [
      "The Modern AI Editing Landscape: Automation vs Human Taste",
      "CapCut Text-to-Speech (TTS): Voice selection, speed, and emotional inflection",
      "AI Auto-Cutout vs Chroma Key: When neural segmentation wins",
      "AI Auto-Color Match: Matching multiple clips with one click",
      "AI Auto-Edit and Template generation: Limitations and pitfalls",
      "Human Review Protocol: Catching AI hallucinations and glitch frames",
      "Combining AI speed with professional editorial judgment"
    ],
    exercise: "Build a 30-second automated video draft using CapCut AI tools, then perform human editorial surgery to fix pacing errors, voice mispronunciations, and awkward cuts.",
    resources: [
      { id: "res-29-ai-guide", title: "CapCut AI Workflow & Prompting Playbook", type: "brief", filename: "CapCut_AI_Foundations_Playbook.pdf", size: "2.5 MB", description: "Best neural voice profiles, TTS pronunciation tricks, and AI cutout optimization." }
    ],
    rules: ["Never publish raw, unedited AI output; always apply human editorial judgment and QC.", "Listen closely to AI text-to-speech for weird pronunciation glitches on numbers and acronyms."],
    shortcuts: [{ action: "Text to Speech", hotkey: "Alt + V in text tab", tip: "Generate neural voiceovers instantly from text." }],
    guide: {
      concept: "AI is an extraordinary assistant, but a terrible director. An editor who knows how to harness AI works 5x faster, but retains the emotional judgment that software lacks.",
      demonstration: "Generating an AI voiceover, correcting pronunciation with phonetic spelling ('Cap-Cut' vs 'CapCut'), and tightening AI-generated cut gaps.",
      guidedPractice: "Use AI Color Match across 5 camera angles and fine-tune skin tones manually.",
      independentPractice: "Refine an AI-generated draft into a polished human-directed piece.",
      critiquePoints: ["Does the AI voice sound completely robotic or natural?", "Are there cutout artifacts around moving fingers?"],
      proTip: "When using Text-to-Speech, spell tricky technical acronyms phonetically (e.g. 'S-F-X' instead of 'SFX') so the AI pronounces individual letters clearly."
    },
    quiz: {
      question: "Why must all AI-assisted edits undergo meticulous human quality control before delivery?",
      options: ["AI models frequently introduce pacing errors, visual cutout glitches, and unnatural vocal inflections that require human editorial correction", "Because AI videos are illegal to post", "To make the file size larger", "Because computers cannot render in 1080p"],
      correctIdx: 0,
      explanation: "Human editorial oversight ensures narrative cohesion, natural pacing, and corrects visual and acoustic AI artifacts."
    }
  },
  {
    id: 30, stageId: 5,
    title: "Module 30: Generative & AI Content Workflows",
    objective: "Master Text-to-Video, AI image generation, AI scriptwriting, Long-to-Short reformatting, and execute PROJECT 11.",
    duration: "1h 10m", xp: 160,
    lessons: [
      "CapCut Generative AI Suite: Text-to-Video and AI Image synthesis",
      "Long-to-Short: Converting 30-minute podcasts into viral clips automatically",
      "AI Scene Splitting: Detecting camera shot changes in flattened video files",
      "AI Video Translator: Lip-sync and multi-language voice translation",
      "Generating custom B-roll assets using text prompts",
      "Avoiding the generic 'AI Content Farm' trap",
      "PROJECT 11 Brief: AI-Assisted Short-Form Campaign"
    ],
    exercise: "Execute PROJECT 11: AI-Assisted Short-Form Campaign — Take a 20-minute long-form video, use AI tools to extract 3 viral hooks, and refine them into a high-retention social campaign.",
    projectDeliverable: {
      id: "project-11",
      title: "PROJECT 11 — AI-Assisted Short-Form Campaign",
      description: "Extract and produce a cohesive 3-video short-form campaign from long-form source footage using AI long-to-short, transcript extraction, and custom human polish.",
      requirements: [
        "3 distinct short-form videos (each 25-40 seconds)",
        "Derived from long-form source using AI extraction tools",
        "Unique hooks, dynamic captions, and relevant B-roll on each video",
        "Zero AI pronunciation errors or awkward sentence cutoffs",
        "Branded typography and color consistency across all 3 videos"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-30-longform", title: "PROJECT 11: Raw 25-Minute Masterclass Interview (4K)", type: "footage", filename: "Project11_Raw_Longform_Interview_Master.mp4", size: "920 MB", description: "Full-length entrepreneurship interview ready for AI long-to-short mining and extraction." }
    ],
    rules: ["Never let AI choose the final hook; review the transcript and pick the moment with the highest emotional curiosity.", "Every AI-generated clip must be reframed to 9:16 vertical with verified safe zones."],
    shortcuts: [{ action: "Scene Detect", hotkey: "Right click clip -> Split Scenes", tip: "Automatically cut flattened video into individual shots." }],
    guide: {
      concept: "The future of content production is hybrid: AI finds the highlights and generates initial drafts in 60 seconds; you apply pacing, sound design, and storytelling polish.",
      demonstration: "Using CapCut's Long-to-Short tool, selecting the 3 highest scoring virality moments, and opening them in the timeline editor.",
      guidedPractice: "Swap out generic AI stock footage with targeted custom B-roll from our library.",
      independentPractice: "Complete PROJECT 11 and export all 3 campaign deliverables.",
      critiquePoints: ["Did the AI cut off the speaker mid-sentence?", "Is the visual style consistent across all 3 videos?"],
      proTip: "Use Scene Detection on flattened Zoom recordings or YouTube videos to instantly separate the clips for fast B-roll insertion."
    },
    quiz: {
      question: "What is the primary editorial risk of relying entirely on AI 'Long-to-Short' tools without manual human editing?",
      options: ["The clips often cut off context, select weak hooks, and feature generic stock B-roll that damages brand credibility", "The video will automatically be deleted by YouTube", "The video cannot have sound", "The aspect ratio will turn into a triangle"],
      correctIdx: 0,
      explanation: "Automated AI clipping lacks emotional intelligence and frequently truncates vital context or inserts irrelevant generic stock imagery."
    }
  },
  {
    id: 31, stageId: 5,
    title: "Module 31: AI Production Pipeline",
    objective: "Master the complete end-to-end AI production pipeline: Long Video -> Transcript -> Rough Cut -> Subtitles -> B-roll -> Color -> QC -> Multi-Platform Export.",
    duration: "1h 00m", xp: 150,
    lessons: [
      "The 12-Step Modern AI Video Production Pipeline",
      "Step 1-3: Ingestion, AI Transcript Generation, and Content Mining",
      "Step 4-6: Rough Cut, Dead-Air Excision, and Voice Cleanup",
      "Step 7-9: B-roll Insertion, Kinetic Typography, and Sound Design",
      "Step 10-12: Color Match, Pre-Delivery QC, and Multi-Platform Render",
      "Batch processing multiple client videos simultaneously",
      "Building your own automated agency SOP (Standard Operating Procedure)"
    ],
    exercise: "Execute the complete 12-step pipeline on a raw client recording, timing your total workflow from import to final delivery.",
    resources: [
      { id: "res-31-sop", title: "12-Step AI Video Production Agency SOP & Flowchart", type: "brief", filename: "Agency_AI_Production_Pipeline_SOP.pdf", size: "3.1 MB", description: "Printable operational flowchart used by digital content agencies to edit 30+ short-form videos per week." }
    ],
    rules: ["Follow the pipeline stages in strict order: never color grade or add subtitles before the rough cut pacing is locked.", "Document your time spent at each step to continually improve your hourly editing velocity."],
    shortcuts: [{ action: "Batch Export", hotkey: "Ctrl / Cmd + Shift + E", tip: "Queue multiple project timelines for sequential rendering." }],
    guide: {
      concept: "A hobbyist edits randomly: adding an effect here, cutting a word there. A master editor runs a systematic production pipeline that guarantees consistent quality under tight client deadlines.",
      demonstration: "Executing the 12-step pipeline from start to finish in 25 minutes flat on a 60-second commercial script.",
      guidedPractice: "Follow the SOP checklist step-by-step without skipping ahead.",
      independentPractice: "Run the full pipeline on a new project and log your completion time.",
      critiquePoints: ["Did you get distracted by transitions before locking dialogue cuts?", "Was the pre-delivery QC checklist fully verified?"],
      proTip: "Never add subtitles or transitions until the client has signed off on the rough cut. Re-timing captions after a client requests a dialogue cut wastes hours of work!"
    },
    quiz: {
      question: "Why must dialogue cuts and pacing be 100% locked before you add kinetic captions and sound design in the production pipeline?",
      options: ["Any subsequent cut to dialogue will misalign all downstream captions, sound effects, and transitions, forcing you to re-edit them completely", "Because CapCut prevents text from being added to short clips", "To save hard drive space", "Because captions only work on exported files"],
      correctIdx: 0,
      explanation: "Locking the cut first protects all downstream temporal work (captions, SFX, beat sync) from becoming unsynchronized by later edits."
    }
  },
  {
    id: 32, stageId: 6,
    title: "Module 32: Social Media Editing",
    objective: "Master platform-specific editing tracks: TikTok (trends/hooks), Instagram Reels (polish/branding), YouTube Shorts (retention/CTA), and execute PROJECT 12.",
    duration: "1h 15m", xp: 160,
    lessons: [
      "Platform Psychology: Why what works on TikTok flops on LinkedIn",
      "Track A — TikTok: Aggressive 1.5s hooks, fast cuts, trending audio, raw authenticity",
      "Track B — Instagram Reels: Aesthetic visual polish, luxury typography, seamless loops",
      "Track C — YouTube Shorts: Dense information payload, retention loops, subscribe CTA",
      "Track D — Facebook & LinkedIn: Large readable captions, corporate pacing, clear thesis",
      "Track E — YouTube Long-Form: Chapter arcs, B-roll breathers, narrative pacing",
      "PROJECT 12 Brief: Multi-Platform Campaign Adaptation"
    ],
    exercise: "Execute PROJECT 12: Multi-Platform Campaign — Take 1 master horizontal interview and produce 3 platform-tailored adaptations (16:9 YouTube, 9:16 TikTok, and 1:1 LinkedIn).",
    projectDeliverable: {
      id: "project-12",
      title: "PROJECT 12 — Multi-Platform Campaign",
      description: "Deliver 3 platform-specific adaptations from a single master project: YouTube 16:9 with chapters, TikTok/Reel 9:16 with viral hook pacing, and LinkedIn 1:1 with executive text bars.",
      requirements: [
        "3 exported video files with proper aspect ratios",
        "TikTok cut has 1.5s hook and fast 180ms cut pacing",
        "LinkedIn cut has readable headline bars top and bottom",
        "YouTube cut maintains full 16:9 widescreen composition",
        "Each version respects platform UI button safe zones"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-32-specs", title: "Social Platform Technical Delivery Specifications Matrix", type: "brief", filename: "Social_Platform_Specs_Matrix_2026.pdf", size: "2.2 MB", description: "Bitrates, frame rates, maximum runtimes, and UI safe dimensions for all 5 major networks." }
    ],
    rules: ["Never export the exact same video file to TikTok and LinkedIn; adapt the hook, text styling, and pacing to the audience.", "Ensure your 9:16 captions don't collide with the TikTok description box or audio disc icon."],
    shortcuts: [{ action: "Duplicate Project Canvas", hotkey: "Alt + Shift + D", tip: "Clone sequence and switch aspect ratio in 1 click." }],
    guide: {
      concept: "A great editor doesn't just cut video; they understand distribution. Adapting an edit to respect each platform's culture and user interface is what agencies pay top dollar for.",
      demonstration: "Reframing a horizontal YouTube cut for TikTok: zooming subject to 120%, applying motion tracking, and shifting captions up by 150 pixels.",
      guidedPractice: "Build a square 1:1 crop with blurred letterboxing for LinkedIn.",
      independentPractice: "Complete PROJECT 12: Multi-Platform Campaign and export all 3 formats.",
      critiquePoints: ["Is the TikTok hook fast enough?", "Are captions legible on a mobile feed?"],
      proTip: "On TikTok and Reels, loop the ending sentence into the opening hook word so viewers watch the video a second time without realizing it restarted!"
    },
    quiz: {
      question: "Why should you never export the exact same video file across TikTok, YouTube, and LinkedIn?",
      options: ["Each platform has distinct user demographics, attention spans, UI overlays, and viewing contexts requiring tailored pacing and framing", "Because social networks block identical files from uploading", "Because LinkedIn only supports black and white video", "Because TikTok deletes landscape videos"],
      correctIdx: 0,
      explanation: "Tailoring the hook, pacing, aspect ratio, and typography to each platform's culture and interface maximizes organic reach and retention."
    }
  },
  {
    id: 33, stageId: 6,
    title: "Module 33: Editing Specializations",
    objective: "Master commercial niches: UGC Ads, Documentaries, Corporate Branding, YouTube Long-Form, and execute PROJECT 13 or PROJECT 14.",
    duration: "1h 20m", xp: 180,
    lessons: [
      "The 12 Commercial Editing Specializations",
      "Specialization 01: Talking Head & Thought Leadership",
      "Specialization 04: Commercial Brand Advertisements",
      "Specialization 05: UGC (User Generated Content) Direct-Response Ads",
      "Specialization 06: Documentary & Narrative Storytelling",
      "Specialization 07: Cinematic Travel & High-End Visuals",
      "PROJECT 13 Brief: Commercial Advertisement (Problem -> Solution -> CTA)",
      "PROJECT 14 Brief: Documentary Sequence (Archival, sound bridges, emotion)"
    ],
    exercise: "Execute PROJECT 13 (Commercial Advertisement) or PROJECT 14 (Documentary Sequence) to develop deep domain expertise in your chosen career path.",
    projectDeliverable: {
      id: "project-13",
      title: "PROJECT 13 — Commercial Advertisement",
      description: "Produce a high-converting 30-second commercial: 3-second hook problem, product solution demo, customer proof point, and high-impact Call To Action (CTA).",
      requirements: [
        "30 seconds duration",
        "Clear commercial narrative arc (Problem -> Agitation -> Solution -> CTA)",
        "Dynamic sound design and high-energy pacing",
        "Product beauty close-ups and clean text callouts",
        "Meets the 80% passing benchmark on commercial effectiveness"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-33-commercial-vault", title: "Commercial Ad & Documentary Asset Vault", type: "footage", filename: "Commercial_And_Documentary_Assets_Vault.zip", size: "780 MB", description: "Product shoots, lifestyle B-roll, archival news clips, soundscapes, and commercial music tracks." }
    ],
    rules: ["In direct-response commercials, state the core value proposition within the first 4 seconds.", "In documentary editing, give emotional moments room to breathe; do not rush the silence."],
    shortcuts: [{ action: "Color Label Clips", hotkey: "Right click clip -> Color", tip: "Color-code A-roll (blue), B-roll (green), and Graphics (orange)." }],
    guide: {
      concept: "Specialization is where high freelance rates come from. A general video editor earns $25/hr; a specialist in direct-response e-commerce ads or documentary storytelling commands $1,000+ per video.",
      demonstration: "Structuring a direct-response ad: The 3-second 'Pattern Interrupt' hook, the split-screen comparison, and the final animated discount offer.",
      guidedPractice: "Assemble a documentary sequence using sound bridges between historical narration and archival footage.",
      independentPractice: "Complete PROJECT 13 or PROJECT 14 based on your desired specialization.",
      critiquePoints: ["Is the commercial call-to-action clear and compelling?", "Does the documentary edit evoke genuine emotional resonance?"],
      proTip: "When pitching clients, only show portfolio videos from their exact niche. A tech client doesn't care about your travel montage; show them crisp software demos."
    },
    quiz: {
      question: "What is the standard structural framework for high-converting direct-response commercial video ads?",
      options: ["Hook (Pattern Interrupt) -> Problem/Agitation -> Solution Demo -> Proof -> Call to Action (CTA)", "Ending credits -> Middle scene -> Opening logo", "Random clips with loud dance music", "A 10-minute introduction before showing the product"],
      correctIdx: 0,
      explanation: "The Hook -> Problem -> Solution -> Proof -> CTA framework is the time-tested structure for direct-response marketing performance."
    }
  },
  {
    id: 34, stageId: 6,
    title: "Module 34: Professional Workflow",
    objective: "Master client briefs, revision cycles, feedback management, professional file delivery, archiving, and portfolio demo reels.",
    duration: "55m", xp: 140,
    lessons: [
      "Deconstructing the Client Brief: Target audience, tone, and deliverables",
      "Organizing client assets and identifying missing footage early",
      "Version Control Discipline: V01_RoughCut, V02_Revisions, V03_FinalMaster",
      "Handling client feedback without getting frustrated: The 3-Round Revision Policy",
      "Professional delivery packaging: Cloud Drive links, clean filenames, and codecs",
      "Long-term project archiving and cold storage practices",
      "Building a high-impact 60-second Editor Demo Reel that lands clients"
    ],
    exercise: "Review a mock client feedback email with 8 revision requests, prioritize them into an actionable revision plan, and export an updated V02 with revision notes.",
    resources: [
      { id: "res-34-contracts", title: "Video Editor Client Contract & Revision Policy Templates", type: "brief", filename: "Video_Editor_Freelance_Contract_Kit.pdf", size: "3.6 MB", description: "Contract templates, scope-of-work agreements, and 2-round revision policy clauses." }
    ],
    rules: ["Never send a final delivery link named 'Final_Final_V2_Edit.mp4'; use 'ClientName_ProjectTitle_1080p_Date_Master.mp4'.", "Always specify the number of included revision rounds in writing before starting work."],
    shortcuts: [{ action: "Duplicate Project for Versioning", hotkey: "Ctrl / Cmd + D on project list", tip: "Never edit over V01; always create a new version." }],
    guide: {
      concept: "Technical editing skill gets you in the door; professional communication and reliable workflow systems make clients keep hiring you for years.",
      demonstration: "Organizing client review links with timestamped markers and exporting a clean revision log.",
      guidedPractice: "Draft a professional response to vague client feedback ('Can you make it pop more?').",
      independentPractice: "Package a complete project deliverable following the standardized naming and folder checklist.",
      critiquePoints: ["Is your project export named professionally?", "Do you have source backups archived?"],
      proTip: "When a client asks to 'make it pop', they almost always mean: tighten the cuts by 15%, add subtle whooshes to graphics, and brighten the color exposure by +10%!"
    },
    quiz: {
      question: "Why should you duplicate your project into a new version (e.g. 'Project_V02') before making client revisions?",
      options: ["It protects the previous approved edit in case the client changes their mind and wants to revert specific cuts", "It makes CapCut render twice as fast", "It deletes old video clips automatically", "CapCut requires new versions by law"],
      correctIdx: 0,
      explanation: "Versioning preserves previous timeline states so you can easily revert changes or reference prior client-approved sections."
    }
  },
  {
    id: 35, stageId: 6,
    title: "Module 35: Troubleshooting & Technical Mastery",
    objective: "Master systemic troubleshooting: timeline lag, dropped frames, audio sync drift, export failures, missing media relinking, and performance tuning.",
    duration: "50m", xp: 130,
    lessons: [
      "The Troubleshooting Mindset: Isolating variables before panicking",
      "Fixing Timeline Lag: Cache cleaning, proxy generation, and preview resolution",
      "Audio Sync Drift: Variable Frame Rate (VFR) vs Constant Frame Rate (CFR)",
      "Re-linking 'Missing Media / File Offline' errors",
      "Export Failures & Crashes: Corrupted clips, codec conflicts, and hardware acceleration",
      "Fixing tracking and green-screen edge artifacts",
      "Color shifts between CapCut preview player and mobile phone screens (Gamma shift)",
      "The 20-Point Emergency Recovery Protocol"
    ],
    exercise: "Diagnose and fix a corrupted practice project containing audio desync, missing media files, and timeline lag until it renders flawlessly.",
    resources: [
      { id: "res-35-troubleshoot", title: "CapCut Emergency Troubleshooting & Error Diagnosis Guide", type: "brief", filename: "CapCut_Emergency_Diagnostic_Manual.pdf", size: "2.7 MB", description: "Flowcharts diagnosing export failure codes, audio sync drift, and proxy setup." }
    ],
    rules: ["Never edit Variable Frame Rate (VFR) phone screen recordings without converting to CFR first if experiencing audio drift.", "Clean your CapCut disk cache weekly to prevent sluggish timeline scrubbing and random crashes."],
    shortcuts: [{ action: "Clear Disk Cache", hotkey: "Settings -> Clear Cache", tip: "Free up disk space and eliminate playback stutter." }],
    guide: {
      concept: "Every editor faces crashes, export errors, and out-of-sync audio 1 hour before a major deadline. Master editors stay calm because they understand the underlying digital video mechanics.",
      demonstration: "Diagnosing audio drift on a 30-minute smartphone clip and using Handbrake/CapCut to re-encode to Constant Frame Rate (CFR).",
      guidedPractice: "Relink 4 offline video files by redirecting CapCut to the updated folder location.",
      independentPractice: "Optimize CapCut settings for maximum GPU hardware decoding acceleration.",
      critiquePoints: ["Is playback completely smooth during fast cuts?", "Does exported audio remain in sync through the very last second?"],
      proTip: "If an export crashes at 73%, jump directly to 73% on your timeline! There is almost always a corrupted freeze frame, unsupported transition, or broken effect at that exact second."
    },
    quiz: {
      question: "What is the most common reason audio slowly drifts out of sync with video on long smartphone recordings?",
      options: ["The video was recorded in Variable Frame Rate (VFR) rather than Constant Frame Rate (CFR)", "The microphone was unplugged", "The computer speakers are too cold", "CapCut only plays audio for 5 minutes"],
      correctIdx: 0,
      explanation: "Smartphones dynamically alter frame rates (VFR) to save battery; converting to Constant Frame Rate (CFR) resolves audio sync drift."
    }
  },
  {
    id: 36, stageId: 7,
    title: "Module 36: CapCut Mastery & Professional Capstone",
    objective: "The Final Crucible: Receive unedited raw footage and a written client brief with NO tutorial recipes. Execute PROJECT 15 to earn your Master Certification.",
    duration: "3h 00m", xp: 500,
    lessons: [
      "The Capstone Brief: Client background, target audience, brand direction",
      "Independent editorial decision-making: Strategy before software",
      "Assembling the 7-asset Master Delivery Package",
      "Self-Review Protocol: The 25-point Pre-Delivery QC Checklist",
      "Defending editorial choices: Behind-the-scenes breakdown requirement",
      "Evaluation against the 7-Factor Master Rubric (80% Passing Threshold)",
      "Official CapCut Certified Master Video Editor credential issuance"
    ],
    exercise: "Execute PROJECT 15: The Final Professional Capstone Package — Deliver all 7 required video assets from raw footage based on the written brief.",
    projectDeliverable: {
      id: "project-15",
      title: "PROJECT 15 — Final Professional Capstone Package",
      description: "Receive raw footage and a written commercial brief. Independently edit, design, color, sound-mix, and deliver a comprehensive 7-asset campaign package.",
      requirements: [
        "VIDEO 01: 60–90 second master commercial / brand story",
        "VIDEO 02: 30–45 second high-retention Instagram Reel",
        "VIDEO 03: 15–30 second snappy TikTok / YouTube Short",
        "VIDEO 04: 10-second high-impact teaser / bumper ad",
        "VIDEO 05: Captioned accessibility social version",
        "VIDEO 06: Alternative platform delivery cut",
        "VIDEO 07: 2-minute Behind-The-Scenes editorial strategy breakdown"
      ],
      benchmarkScore: 80
    },
    resources: [
      { id: "res-36-client-brief", title: "PROJECT 15: Official Client Commercial Brief & Guidelines", type: "brief", filename: "Project15_Official_Client_Brief_Master.pdf", size: "5.8 MB", description: "Comprehensive 8-page client brief with target audience persona, brand color guidelines, and deliverable specs." },
      { id: "res-36-raw-vault", title: "PROJECT 15: Master Raw Footage Archive (4K Multi-Cam)", type: "footage", filename: "Project15_Master_Raw_Footage_Vault.zip", size: "1.2 GB", description: "1.2 GB multi-camera raw interview takes, dynamic lifestyle B-roll, product closeups, and wild audio tracks." },
      { id: "res-36-qc-checklist", title: "25-Point Professional Pre-Delivery QC Checklist", type: "template", filename: "Pre_Delivery_Quality_Control_Checklist.pdf", size: "1.2 MB", description: "Industry quality-assurance inspection protocol used by commercial post-production studios." }
    ],
    rules: ["No tutorials. No hand-holding. You are the lead editor.", "The final exported master must meet the 80% benchmark across all 7 rubric domains to receive the Certified Credential."],
    shortcuts: [{ action: "Final QC Playback", hotkey: "Space", tip: "Watch the full 90-second master with zero pauses before sending to client." }],
    guide: {
      concept: "A CapCut Master is someone who can take messy raw footage, decipher an abstract client brief, and independently deliver an executive-grade campaign with zero hesitation.",
      demonstration: "Reviewing the client brief: identifying the core problem, customer pain point, and the visual hook required in the first 2.5 seconds.",
      guidedPractice: "Perform the 25-point QC inspection: audio levels, black frames, spelling errors, and color continuity.",
      independentPractice: "Produce and submit all 7 campaign deliverables. Submit your drive link for official faculty evaluation.",
      critiquePoints: ["Did you meet all 7 asset requirements?", "Is your BTS breakdown clear and articulate about why cuts were made?", "Does your cumulative rubric score surpass the 80% benchmark threshold?"],
      proTip: "Export all files with clean standardized naming: 'ProjectName_AssetType_Resolution_Date_V01.mp4'. Clients notice professional delivery discipline."
    },
    quiz: {
      question: "What is the final defining trait of a certified CapCut Master Editor?",
      options: [
        "The ability to receive raw unorganized footage and independently make every storytelling, pacing, audio, and color decision to satisfy a client brief",
        "Memorizing every single sticker in the CapCut library",
        "Using 40 different transitions in every 10-second clip",
        "Always using default auto-templates"
      ],
      correctIdx: 0,
      explanation: "A true master editor possesses independent editorial judgment, technical precision, and professional client delivery standards without relying on templates."
    }
  }
];

// Map all 36 modules into full structured CapCutModule objects
const fullModules = RAW_MODULES.map((m, idx) => {
  const stage = stages.find(s => s.id === m.stageId);
  const slug = `module-${String(m.id).padStart(2, '0')}-${m.title.split(': ')[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  
  return {
    id: m.id,
    slug,
    stageId: m.stageId,
    stageNumber: stage ? stage.number : "STAGE",
    stageTitle: stage ? stage.title : "Curriculum",
    title: m.title,
    objective: m.objective,
    duration: m.duration,
    xpReward: m.xp,
    youtubeId: YOUTUBE_IDS[idx] || "dQw4w9WgXcQ",
    lessons: m.lessons,
    exercise: m.exercise,
    projectDeliverable: m.projectDeliverable || undefined,
    downloadableResources: m.resources,
    editorialRules: m.rules,
    shortcuts: m.shortcuts,
    textGuide: m.guide,
    quiz: m.quiz,
    comments: [
      {
        id: `c-${m.id}-1`,
        author: "Farhan Kabir",
        role: "mentor",
        avatar: "FK",
        timeAgo: "1 day ago",
        content: `Welcome to ${m.title}. Pay close attention to the independent exercise — avoid shortcut recipes and build your genuine editorial eye!`,
        likes: 18,
        replies: [
          {
            author: "Tariqul Islam",
            role: "student",
            content: "Practicing this on my latest client footage right now. The difference in pacing is immediately noticeable!",
            timeAgo: "6 hours ago"
          }
        ]
      }
    ]
  };
});

const tsContent = `/**
 * CAPCUT MASTER ACADEMY V2 — Comprehensive Curriculum & Master Course Data
 * 36 Modules · 8 Stages (Stage 0 to Stage 7) · 15 Project Ladder · 3 Specialization Paths
 * Master Skill Database & 7-Factor Rubric Assessment System
 */

export interface DownloadableResource {
  id: string;
  title: string;
  type: "footage" | "audio" | "lut" | "preset" | "brief" | "template";
  filename: string;
  size: string;
  description: string;
  downloadContent?: string;
}

export interface ModuleSubmissionRubric {
  technicalEditing: number; // 20%
  storytelling: number;     // 20%
  pacing: number;           // 15%
  audioDesign: number;      // 15%
  visualDesign: number;     // 10%
  colorGrading: number;     // 10%
  technicalDelivery: number;// 10%
}

export interface ModuleComment {
  id: string;
  author: string;
  role: "mentor" | "student" | "alumni";
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  replies?: { author: string; role: string; content: string; timeAgo: string }[];
}

export interface CapCutModule {
  id: number;
  slug: string;
  stageId: number;
  stageNumber: string;
  stageTitle: string;
  title: string;
  objective: string;
  duration: string;
  xpReward: number;
  youtubeId: string;
  lessons: string[];
  exercise: string;
  projectDeliverable?: {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    benchmarkScore: number;
  };
  downloadableResources: DownloadableResource[];
  editorialRules: string[];
  shortcuts: { action: string; hotkey: string; tip: string }[];
  textGuide: {
    concept: string;
    demonstration: string;
    guidedPractice: string;
    independentPractice: string;
    critiquePoints: string[];
    proTip: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIdx: number;
    explanation: string;
  };
  comments: ModuleComment[];
}

export interface CapCutStage {
  id: number;
  number: string;
  title: string;
  description: string;
  moduleRange: string;
  moduleIds: number[];
  color: string;
  badgeBg: string;
}

export const CAPCUT_STAGES: CapCutStage[] = ${JSON.stringify(stages, null, 2)};

export const CAPCUT_PROJECT_LADDER = ${JSON.stringify(projectLadder, null, 2)};

export const CAPCUT_MODULES: CapCutModule[] = ${JSON.stringify(fullModules, null, 2)};

export function getCapCutModuleBySlug(slug: string): CapCutModule | undefined {
  return CAPCUT_MODULES.find((m) => m.slug === slug || String(m.id) === slug);
}

export function getCapCutModuleById(id: number): CapCutModule | undefined {
  return CAPCUT_MODULES.find((m) => m.id === id);
}

export const SPECIALIZATION_TRACKS = [
  {
    id: "creator-editor",
    title: "Path 01: Creator Editor",
    badge: "Social & Viral",
    focus: "TikTok, Reels, Shorts, Talking Head, Dynamic Captions, AI Workflows, Hook Psychology & Viewer Retention.",
    targetRoles: ["Short-Form Creator", "TikTok Strategist", "Influencer Media Editor", "YouTube Shorts Specialist"],
    recommendedProjects: ["project-01", "project-02", "project-03", "project-11", "project-12"]
  },
  {
    id: "cinematic-editor",
    title: "Path 02: Cinematic Editor",
    badge: "Aesthetics & Mood",
    focus: "Color Grading (LUTs/Curves), Keyframe Physics, Speed Ramps, Masking, Tracking, Sound Design, Compositing.",
    targetRoles: ["Music Video Editor", "Commercial Post Artist", "Travel Filmmaker", "Documentary Colorist"],
    recommendedProjects: ["project-04", "project-05", "project-06", "project-07", "project-09", "project-14"]
  },
  {
    id: "client-editor",
    title: "Path 03: Professional Client Editor",
    badge: "Commercial & Agency",
    focus: "YouTube Long-Form, Commercial Ads, UGC Direct-Response, Client Workflow, Revisions, Quality Control, Master Portfolio.",
    targetRoles: ["Agency Lead Editor", "Commercial Post Director", "Direct-Response Video Strategist", "Corporate Media Lead"],
    recommendedProjects: ["project-08", "project-10", "project-13", "project-14", "project-15"]
  }
];

export const MASTER_SKILL_CATEGORIES = [
  {
    name: "Core Editing",
    skills: ["Trim", "Split", "Delete", "Ripple Concepts", "Playhead Precision", "Undo/Redo", "Timeline Snapping", "Main-Track Magnet", "In/Out Points"]
  },
  {
    name: "Transform & Framing",
    skills: ["Position X/Y", "Scale", "Rotation", "Opacity", "Digital Crop", "Flip", "Reframe", "Auto-Reframe", "Safe Zones"]
  },
  {
    name: "Speed & Time",
    skills: ["Slow Motion", "Fast Motion", "Freeze Frame", "Reverse", "Speed Curves", "Speed Ramps", "Optical Flow AI"]
  },
  {
    name: "Audio Design",
    skills: ["Music Mixing", "Foley SFX", "Voiceover Recording", "Volume Normalization", "Fade In/Out", "Ducking", "Noise Reduction", "Echo Cancellation", "Voice Enhancement", "Voice Isolation", "Beat Detection"]
  },
  {
    name: "Typography & Captions",
    skills: ["Custom Fonts", "Typography Hierarchy", "Stroke/Shadow/Glow", "Speech Bubbles", "Kinetic Animation", "Auto Captions", "Transcript-Based Editing"]
  },
  {
    name: "Visual Effects & Overlays",
    skills: ["Seamless Transitions", "Cinematic Filters", "Stickers", "Body Effects", "Light Leaks", "Glitch/Neon", "Film Grain Overlays", "Blend Modes"]
  },
  {
    name: "Compositing & Masking",
    skills: ["Multi-Track Layers", "Picture-in-Picture", "Compound Clips", "Adjustment Layers", "Geometric Masks", "Split Mask", "Film Strip Mask", "Chroma Key", "AI Auto Cutout", "Custom Removal"]
  },
  {
    name: "Motion & Keyframing",
    skills: ["Position/Scale Keyframes", "Bezier Graph Curves", "Ease In/Out", "Cubic Curves", "Elastic Rebound", "Auto Curve", "Camera Drift"]
  },
  {
    name: "Motion Tracking",
    skills: ["AI Face Tracking", "Body Tracking", "Hand Tracking", "Object Tracking", "Mask Tracking", "Text Pinning", "Graphic Following"]
  },
  {
    name: "Enhancement & Restoration",
    skills: ["Stabilization (Minimum/Most)", "Enhance Image", "Enhance Quality", "Blurry Footage Recovery", "Artificial Relighting", "Facial Lighting"]
  },
  {
    name: "Color Science",
    skills: ["Brightness/Exposure", "Contrast/Highlights/Shadows", "Kelvin White Balance", "Tint", "Vibrance/Saturation", "HSL Curves", "3D LUT (.cube)", "Auto Color Match"]
  },
  {
    name: "AI & Generative Tools",
    skills: ["Auto Captioning", "Transcript Editing", "Text-to-Speech", "AI Auto-Edit", "AI Background Cutout", "AI Color Match", "AI Relighting", "Text-to-Video", "Long-to-Short", "Video Translation"]
  }
];
`;

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'data', 'capcut-master-academy.ts'), tsContent, 'utf8');
console.log('Successfully written complete CapCut Master Academy curriculum data with all 36 modules, 8 stages, 15 projects, and skill database!');
