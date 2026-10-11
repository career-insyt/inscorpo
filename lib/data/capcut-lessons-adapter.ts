import { LessonDetail } from "./lessons";

export const CAPCUT_LESSON_DETAILS: Record<string, LessonDetail> = {
  "module-01-understanding-video-editing": {
    slug: "module-01-understanding-video-editing",
    title: "Module 01: Understanding Video Editing",
    xpReward: 100,
    duration: "45m",
    videoUrl: "https://www.youtube.com/watch?v=23qWd5gL-bU",
    notes: "### Module 01: Understanding Video Editing\n\n#### Objective & Learning Framework\nTeach editing before teaching software — master shot grammar, A-roll vs B-roll, pacing, rhythm, viewer attention, and what separates amateur cuts from professional films.\n\n#### Core Curriculum Breakdown\n* What video editing actually is\n* Editor vs camera operator vs content creator\n* Shot, Scene, and Sequence anatomy\n* A-roll dialogue vs B-roll visual support\n* The Cut, Transition, and Montage\n* Continuity of movement and eye trace\n* Pacing & Rhythm: Why viewers feel bored or engaged\n* Viewer attention mechanics & retention curves\n* Editing for information vs editing for emotion\n* Editing for social retention\n* The 10 dead giveaways of an amateur edit\n* The 10 hallmarks of an executive professional edit\n\n#### Practical Application Exercise\nWatch three professional social videos and annotate every cut, B-roll timing, music swell, and caption emphasis.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the primary editorial purpose of B-roll in talking-head videos?",
      options: ["To cover cuts, mask jump-cuts, and illustrate the speaker's words visually","To make the video file size smaller","To remove the speaker's voice track","To add random motion"],
      correctIdx: 0,
      explanation: "B-roll visually reinforces the speaker's narrative while seamlessly masking jump-cuts and continuity discrepancies in the primary A-roll."
    },
    hasSimulator: "tool-matrix"
  },
  "module-02-video-fundamentals": {
    slug: "module-02-video-fundamentals",
    title: "Module 02: Video Fundamentals",
    xpReward: 100,
    duration: "40m",
    videoUrl: "https://www.youtube.com/watch?v=j5_471mO14c",
    notes: "### Module 02: Video Fundamentals\n\n#### Objective & Learning Framework\nMaster resolution standards (720p to 4K), aspect ratios (16:9, 9:16, 1:1), frame rates, bitrates, codecs (H.264), and export fidelity.\n\n#### Core Curriculum Breakdown\n* Resolution spectrum: 720p, 1080p, 2K, and 4K\n* Aspect ratio geometry: 16:9 (YouTube), 9:16 (Reels/TikTok), 1:1 (Square)\n* Frame rates: 24fps (Cinematic), 30fps (Standard Video), 60fps (Smooth/Slomo)\n* Bitrate & Data compression mechanics\n* Codecs: H.264 vs HEVC/H.265\n* Horizontal vs Vertical footage composition\n* Source quality vs Export render quality\n\n#### Practical Application Exercise\nPrepare one master horizontal 4K clip and correctly frame it for YouTube 16:9, Instagram Reel 9:16, and LinkedIn 1:1 without black letterbox bars.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Which aspect ratio should be configured for Instagram Reels, TikTok, and YouTube Shorts?",
      options: ["9:16 (1080x1920)","16:9 (1920x1080)","4:3 (1440x1080)","2.35:1 (CinemaScope)"],
      correctIdx: 0,
      explanation: "9:16 vertical format (1080x1920) is the universal standard for vertical short-form mobile video."
    },
    hasSimulator: "tool-matrix"
  },
  "module-03-the-capcut-ecosystem": {
    slug: "module-03-the-capcut-ecosystem",
    title: "Module 03: The CapCut Ecosystem",
    xpReward: 100,
    duration: "50m",
    videoUrl: "https://www.youtube.com/watch?v=cyMEW5Rne4U",
    notes: "### Module 03: The CapCut Ecosystem\n\n#### Objective & Learning Framework\nMaster CapCut Desktop, Mobile, and Web workflows — understand workspace configuration, inspector panels, toolbar ergonomics, and cloud sync.\n\n#### Core Curriculum Breakdown\n* CapCut Desktop vs CapCut Mobile vs CapCut Web\n* Platform-specific strengths and performance benchmarks\n* Workspace ergonomics: Dual-monitor setup and timeline layout\n* Media Panel: Local assets, Cloud library, and Brand kit\n* Player / Preview monitor and canvas controls\n* Property Inspector: Video, Audio, Speed, Animation, Tracking\n* Toolbar overview and timeline controls\n* Cloud project sync & multi-device handoff\n\n#### Practical Application Exercise\nSet up the exact same basic 3-clip project across CapCut Desktop and Mobile; note the speed difference in timeline trimming.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the primary advantage of editing on CapCut Desktop over the mobile app?",
      options: ["Precision multi-track timeline control, custom keyframe graphs, and two-handed shortcut velocity","It uses less battery on your phone","It automatically posts to Instagram without your permission","It prevents video clips from having audio"],
      correctIdx: 0,
      explanation: "CapCut Desktop offers full desktop keyboard shortcuts, precise pixel-level bezier keyframing, and multi-track visibility."
    },
    hasSimulator: "tool-matrix"
  },
  "module-04-media-management-project-organization": {
    slug: "module-04-media-management-project-organization",
    title: "Module 04: Media Management & Project Organization",
    xpReward: 120,
    duration: "45m",
    videoUrl: "https://www.youtube.com/watch?v=68KNzsmBarM",
    notes: "### Module 04: Media Management & Project Organization\n\n#### Objective & Learning Framework\nMaster media bins, folder hierarchies, naming conventions, asset versioning, and non-destructive editable project structures.\n\n#### Core Curriculum Breakdown\n* The 5-Folder Professional Editing Vault structure\n* Importing media folders without breaking file links\n* Naming conventions: Scene_Shot_Take and YYYYMMDD prefixes\n* B-roll cataloging: Emotion, Action, and Cutaways\n* Audio bins: Music, SFX, Voiceover, Room Tone\n* Project versioning: V01_RoughCut, V02_FineCut, V03_ClientMaster\n* Non-destructive editing: Source protection and cloud backups\n\n#### Practical Application Exercise\nDownload the unorganized 4GB asset archive and structure it into a clean professional folder hierarchy ready for editing.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why should you never move source video files after starting a project in CapCut?",
      options: ["CapCut references the absolute file path on disk; moving them causes 'Missing Media / Offline' errors","It will delete the files permanently from your hard drive","It converts 4K clips into 360p automatically","It changes the language of the software"],
      correctIdx: 0,
      explanation: "Non-linear editors reference source file locations rather than storing full video files inside the project file."
    },
    hasSimulator: "tool-matrix"
  },
  "module-05-timeline-mastery": {
    slug: "module-05-timeline-mastery",
    title: "Module 05: Timeline Mastery",
    xpReward: 120,
    duration: "55m",
    videoUrl: "https://www.youtube.com/watch?v=O_ochkV-B8Q",
    notes: "### Module 05: Timeline Mastery\n\n#### Objective & Learning Framework\nMaster primary track vs overlay tracks, playhead precision, snapping behavior, main track magnet, and ripple editing mechanics.\n\n#### Core Curriculum Breakdown\n* Timeline anatomy and track hierarchy\n* Main Track (Primary storyline) vs Overlay Tracks (B-roll & Graphics)\n* Main Track Magnet behavior: When to keep it on vs when to disable\n* Snapping mechanics: Avoiding accidental 1-frame black gaps\n* Timeline zoom velocity: Precision frame-by-frame cutting\n* In-points and Out-points selection in preview player\n* Ripple vs non-ripple editing: Understanding sequence collapse\n* Locking tracks to protect background music and master voiceovers\n\n#### Practical Application Exercise\nAssemble a 12-clip sequence with zero gaps, snapping each clip precisely on dialogue cadences.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What happens when you use 'Ripple Trim Left' (Q key) in CapCut Desktop?",
      options: ["It trims from the clip start up to the playhead and automatically pulls all downstream clips to close the gap","It adds a left-sliding transition","It mutes the left audio channel","It duplicates the clip to the left"],
      correctIdx: 0,
      explanation: "'Q' performs an instant ripple delete to the left of the playhead, saving thousands of manual drag operations."
    },
    hasSimulator: "tool-matrix"
  },
  "module-06-cutting-trimming-precision-editing": {
    slug: "module-06-cutting-trimming-precision-editing",
    title: "Module 06: Cutting, Trimming & Precision Editing",
    xpReward: 150,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=wX-y4Tq3Jk0",
    notes: "### Module 06: Cutting, Trimming & Precision Editing\n\n#### Objective & Learning Framework\nMaster split cuts, dead-air excision, cutting on action, digital punch-ins, and produce PROJECT 01: The Clean Edit.\n\n#### Core Curriculum Breakdown\n* Split, Trim, and Delete fundamentals\n* Identifying and removing vocal filler ('um', 'ah', throat clears)\n* Excision of dead air: The 150ms rule for short-form retention\n* Cutting on action: Matching body movement across shots\n* Cutting on dialogue vs cutting on reaction\n* Jump cuts vs Match cuts vs Zoom cuts\n* Digital punch-in: 100% to 118% scale jump for visual emphasis\n* PROJECT 01 Brief: Creating 'The Clean Edit' talking-head video\n\n#### Practical Application Exercise\nExecute PROJECT 01: The Clean Edit — Produce a polished 60-second talking-head video using only trims, cuts, B-roll, and basic audio. No flashy effects allowed.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why do professional editors perform 'digital punch-ins' (e.g. scaling from 100% to 118%) between two takes of the same camera shot?",
      options: ["It makes a jump-cut look like a deliberate two-camera setup and emphasizes key moments","It increases the resolution of the video camera","It changes the color temperature of the speaker's skin","It reduces the file size of the export"],
      correctIdx: 0,
      explanation: "A slight scale jump (punch-in) disguises continuity breaks as an intentional focal change, preventing jarring jump-cuts."
    },
    hasSimulator: "tool-matrix"
  },
  "module-07-editing-grammar": {
    slug: "module-07-editing-grammar",
    title: "Module 07: Editing Grammar",
    xpReward: 120,
    duration: "50m",
    videoUrl: "https://www.youtube.com/watch?v=VUMVsGm0xOE",
    notes: "### Module 07: Editing Grammar\n\n#### Objective & Learning Framework\nMaster J-cuts, L-cuts, cutaways, match on action, temporal compression, and narrative escalation.\n\n#### Core Curriculum Breakdown\n* Continuity of screen direction: The 180-Degree Rule\n* Match on action: Cutting mid-gesture for seamless motion\n* J-Cuts: Hearing audio 12-24 frames before the visual changes\n* L-Cuts: Visual changes while previous dialogue continues\n* Cutaways and Reaction shots: Shaping subtext and drama\n* B-roll bridges: Transitioning between distinct conversational thoughts\n* Temporal compression: Turning 2 hours into 30 engaging seconds\n* Narrative escalation and emotional payoff\n\n#### Practical Application Exercise\nBuild a 45-second dialogue sequence incorporating at least two J-cuts and two L-cuts to create organic conversational flow.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is a 'J-Cut' in video editing?",
      options: ["When the audio of the next shot starts before the video cut occurs","A cut that curves shaped like a letter J","Deleting every second frame of video","Cutting only on high-pitch sounds"],
      correctIdx: 0,
      explanation: "A J-Cut is an audio split edit where the incoming audio precedes the visual cut, creating a natural auditory transition."
    },
    hasSimulator: "tool-matrix"
  },
  "module-08-transform-crop-framing": {
    slug: "module-08-transform-crop-framing",
    title: "Module 08: Transform, Crop & Framing",
    xpReward: 120,
    duration: "45m",
    videoUrl: "https://www.youtube.com/watch?v=_e0Pk65yPg8",
    notes: "### Module 08: Transform, Crop & Framing\n\n#### Objective & Learning Framework\nMaster position, scale, rotation, opacity, digital crop, Auto-Reframe, smart subject positioning, and multi-platform composition.\n\n#### Core Curriculum Breakdown\n* X/Y Position coordinates & pixel precision\n* Scale mechanics: Uniform vs Non-uniform\n* Rotation and horizon line correction\n* Opacity and transparency layering\n* Digital punch-in without pixel distortion\n* Headroom, nose room, and Rule of Thirds\n* Converting landscape (16:9) to vertical (9:16) cleanly\n* CapCut Auto-Reframe tool with AI subject tracking\n* Split-screen framing and Picture-in-Picture (PiP) layouts\n\n#### Practical Application Exercise\nTake three wide 16:9 clips and reframe them into three distinct 9:16 mobile compositions (full crop, split-screen, and blurred background).\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Where should the subject's eyeline generally rest in a well-composed vertical video?",
      options: ["On the upper-third horizontal gridline","At the very bottom edge of the screen","Exactly at the center crosshair","Hidden behind caption text"],
      correctIdx: 0,
      explanation: "Placing eyes along the upper third provides optimal headroom and professional psychological engagement."
    },
    hasSimulator: "tool-matrix"
  },
  "module-09-first-complete-video": {
    slug: "module-09-first-complete-video",
    title: "Module 09: First Complete Video",
    xpReward: 180,
    duration: "1h 15m",
    videoUrl: "https://www.youtube.com/watch?v=k42B2Qp6k7I",
    notes: "### Module 09: First Complete Video\n\n#### Objective & Learning Framework\nCapstone of Stage 1: Produce an end-to-end 60-second social video integrating multi-clip assembly, title card, music, B-roll, captions, and export.\n\n#### Core Curriculum Breakdown\n* The 5-Step Editorial Assembly Protocol\n* Rough Cut: Establishing narrative duration\n* Fine Cut: Pacing tightening and breath removal\n* Visual Polish: B-roll insertion and framing adjustments\n* Audio Assembly: Dialogue leveling and background music\n* Typography & Captions: Essential title and styling\n* Pre-Export Quality Control Inspection\n* Export settings optimization for social delivery\n\n#### Practical Application Exercise\nAssemble and export your first complete 45-60s multi-asset video demonstrating all Stage 1 foundations without using any pre-built templates.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the final recommended quality-control check before sending an edit to a client or platform?",
      options: ["Watching the full export timeline once from start to finish with headphones to inspect audio and visual continuity","Deleting the project file immediately","Increasing the volume to maximum","Applying a rainbow filter"],
      correctIdx: 0,
      explanation: "A complete unbroken real-time inspection with headphones is the universal safeguard against export errors."
    },
    hasSimulator: "tool-matrix"
  },
  "module-10-audio-fundamentals": {
    slug: "module-10-audio-fundamentals",
    title: "Module 10: Audio Fundamentals",
    xpReward: 120,
    duration: "50m",
    videoUrl: "https://www.youtube.com/watch?v=Yl8lJzFz_uQ",
    notes: "### Module 10: Audio Fundamentals\n\n#### Objective & Learning Framework\nMaster audio waveforms, track hierarchy, gain staging, fade envelopes, volume normalization, and de-linking audio tracks.\n\n#### Core Curriculum Breakdown\n* Audio physics: Decibels (dB), waveforms, and clipping (0dB redline)\n* Audio hierarchy: Voice (-6 to -12 dB) vs Music (-18 to -26 dB) vs SFX (-10 to -14 dB)\n* Gain staging inside CapCut: Avoiding digital distortion\n* Volume envelopes: Fade In and Fade Out curves\n* Loudness Normalization: Industry standard LKFS/LUFS\n* Extracting and de-linking audio from camera clips\n* Recording studio voiceovers directly inside CapCut\n\n#### Practical Application Exercise\nBalance a chaotic multi-track sequence containing voiceover, loud background rock music, and 5 sound effects so all dialogue is 100% crystal clear.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the recommended decibel (dB) target range for primary speech/dialogue in social video?",
      options: ["-6 dB to -12 dB (never crossing 0 dB redline)","0 dB to +6 dB","-35 dB to -50 dB","+12 dB always"],
      correctIdx: 0,
      explanation: "Targeting -6 to -12 dB ensures loud, clear speech while maintaining safe headroom against digital distortion."
    },
    hasSimulator: "tool-matrix"
  },
  "module-11-audio-cleanup-voice-processing": {
    slug: "module-11-audio-cleanup-voice-processing",
    title: "Module 11: Audio Cleanup & Voice Processing",
    xpReward: 140,
    duration: "55m",
    videoUrl: "https://www.youtube.com/watch?v=me7BKGe6qlY",
    notes: "### Module 11: Audio Cleanup & Voice Processing\n\n#### Objective & Learning Framework\nMaster AI noise reduction, echo cancellation, voice enhancement, studio mic processing, and vocal isolation (Keep/Remove voice).\n\n#### Core Curriculum Breakdown\n* Diagnosing audio flaws: Room reverb, AC hum, wind rumble, and clipping\n* CapCut Noise Reduction: Cleaning background hiss without robotic artifacts\n* Echo Reduction: Taming harsh untreated bedroom acoustics\n* Voice Enhancement: Studio condenser microphone emulation\n* Voice Isolation: 'Keep Voice' (acapella) vs 'Remove Voice' (instrumental)\n* Loudness Normalization in one click\n* Building a consistent vocal chain across multi-speaker interviews\n\n#### Practical Application Exercise\nTake a noisy outdoor phone recording with heavy traffic and wind, clean it using CapCut's cleanup suite, and produce studio-grade voice clarity.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why should you avoid maxing out noise reduction to 100% on dialogue?",
      options: ["Excessive noise suppression removes natural vocal frequencies, creating robotic, muffled, or watery speech artifacts","It causes the video to play in reverse","It deletes the text captions","It lowers the screen brightness"],
      correctIdx: 0,
      explanation: "Aggressive noise suppression strips away essential upper vocal harmonics, resulting in a thin, artificial voice."
    },
    hasSimulator: "tool-matrix"
  },
  "module-12-sound-design": {
    slug: "module-12-sound-design",
    title: "Module 12: Sound Design",
    xpReward: 160,
    duration: "1h 15m",
    videoUrl: "https://www.youtube.com/watch?v=q6gB4aG2Q4Q",
    notes: "### Module 12: Sound Design\n\n#### Objective & Learning Framework\nMaster Foley, whooshes, pops, risers, ambient layering, and execute PROJECT 02: Sound-Designed Reel.\n\n#### Core Curriculum Breakdown\n* Why sound design separates $50 edits from $5,000 edits\n* The 5 Essential SFX Categories: Whooshes, Pops, Impacts, Risers, Ambience\n* Micro-timing SFX: Aligning sound 2 frames before visual contact\n* Layering sound effects: High click + mid whoosh + sub thud\n* Rhythm & beat-drop synchronization\n* Sound design for text pop-ins and graphic reveals\n* The dramatic power of the sudden silence cut\n* PROJECT 02 Brief: Producing a high-octane Sound-Designed Reel\n\n#### Practical Application Exercise\nExecute PROJECT 02: Sound-Designed Reel — Create a 30-second product or lifestyle reel with at least 15 custom-placed Foley and SFX elements perfectly matched to motion.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why should a movement SFX (like a whoosh) be placed 1 to 2 frames before the on-screen graphic completes its motion?",
      options: ["Human auditory reaction time requires acoustic anticipation to perceive sound and visual as perfectly simultaneous","Because CapCut has an automatic delay bug","To make the audio file download faster","It makes the video export in 4K"],
      correctIdx: 0,
      explanation: "The human brain processes sound slightly faster than visual recognition; acoustic anticipation creates perceived tactile synchronization."
    },
    hasSimulator: "tool-matrix"
  },
  "module-13-typography": {
    slug: "module-13-typography",
    title: "Module 13: Typography",
    xpReward: 120,
    duration: "45m",
    videoUrl: "https://www.youtube.com/watch?v=wyB0mpw0dno",
    notes: "### Module 13: Typography\n\n#### Objective & Learning Framework\nMaster typography hierarchy, font pairing, stroke, shadow, glow, callout bubbles, and brand-consistent social text styling.\n\n#### Core Curriculum Breakdown\n* Typography psychology: Serif vs Sans-serif vs Display fonts\n* Font pairing principles: Maximum 2 fonts per video\n* Visual hierarchy: Primary hook, Subtitle, and Supporting data\n* CapCut text styling: Stroke thickness, drop shadow blur, and inner glow\n* Speech bubbles and graphic callout badges\n* Letter spacing (tracking) and line height (leading) ergonomics\n* Text safe margins: Dodging Instagram/TikTok UI clutter\n\n#### Practical Application Exercise\nDesign 3 distinct title cards (Minimalist Luxury, High-Energy Tech, Corporate Executive) using custom fonts and styling in CapCut.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "How many distinct font families should typically be used within a single professional social video?",
      options: ["A maximum of 1 to 2 complementary font families","At least 6 to 8 fonts to keep viewers surprised","A different font for every single word","Only Comic Sans"],
      correctIdx: 0,
      explanation: "Restricting fonts to 1 or 2 complementary families maintains visual hierarchy, brand consistency, and cognitive clarity."
    },
    hasSimulator: "tool-matrix"
  },
  "module-14-captions-transcript-based-editing": {
    slug: "module-14-captions-transcript-based-editing",
    title: "Module 14: Captions & Transcript-Based Editing",
    xpReward: 160,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=o6tcF1JLlwo",
    notes: "### Module 14: Captions & Transcript-Based Editing\n\n#### Objective & Learning Framework\nMaster auto-captions, word-by-word animation, styling systems, and execute PROJECT 03: Transcript-to-Reel.\n\n#### Core Curriculum Breakdown\n* The science of captions: Why 75% of mobile video is watched on mute\n* CapCut Auto-Captions: Multi-language speech recognition\n* Transcript-based editing: Cutting video by selecting words in the text editor\n* Batch styling: 'Apply to All' vs single-word emphasis overrides\n* Kinetic word-by-word captions (Hormozi / Ali Abdaal style)\n* Color-coding keywords (Yellow/Green pops for emotion and metrics)\n* Timing correction & punctuation cleaning\n* PROJECT 03 Brief: Producing a high-retention Transcript-to-Reel\n\n#### Practical Application Exercise\nExecute PROJECT 03: Transcript-to-Reel — Take a raw 3-minute podcast interview, use transcript-based editing to carve out the best 45s, and style dynamic kinetic captions.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the primary benefit of CapCut's transcript-based editing feature?",
      options: ["You can edit the video timeline directly by selecting and deleting text in the transcript","It writes a screenplay for you automatically","It permanently removes the video track","It translates video into ancient Latin"],
      correctIdx: 0,
      explanation: "Transcript-based editing synchronizes text with video frames, allowing you to prune speech by simply deleting words in the text panel."
    },
    hasSimulator: "tool-matrix"
  },
  "module-15-transitions": {
    slug: "module-15-transitions",
    title: "Module 15: Transitions",
    xpReward: 120,
    duration: "45m",
    videoUrl: "https://www.youtube.com/watch?v=23qWd5gL-bU",
    notes: "### Module 15: Transitions\n\n#### Objective & Learning Framework\nMaster seamless cuts, whip pans, zoom transitions, glitch warps, motion-matching, and when NOT to use transitions.\n\n#### Core Curriculum Breakdown\n* The Golden Rule: Cut vs Transition — Why 90% of transitions look amateur\n* Classic transitions: Cross Dissolve, Dip to Black, Dip to White\n* Motion transitions: Push, Slide, Zoom In, Zoom Out, Spin Slant\n* Glitch and Warp transitions: Setting appropriate duration (0.2s - 0.4s)\n* Match-action transitions: Using subject movement to conceal cuts\n* Whip-pan transitions with synchronized whoosh SFX\n* Invisible whip-cuts and object wipes\n\n#### Practical Application Exercise\nBuild a 30-second travel montage with 5 distinct transitions that feel organic and motivated by camera motion rather than random preset spam.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the recommended duration range for modern fast-paced social video transitions?",
      options: ["0.2 seconds to 0.4 seconds (6 to 12 frames)","2.0 seconds to 4.0 seconds","10 seconds","0.01 seconds"],
      correctIdx: 0,
      explanation: "Transitions lasting 0.2 to 0.4 seconds maintain energetic forward momentum without bogging down the edit."
    },
    hasSimulator: "tool-matrix"
  },
  "module-16-effects-filters-stickers-overlays": {
    slug: "module-16-effects-filters-stickers-overlays",
    title: "Module 16: Effects, Filters, Stickers & Overlays",
    xpReward: 120,
    duration: "45m",
    videoUrl: "https://www.youtube.com/watch?v=j5_471mO14c",
    notes: "### Module 16: Effects, Filters, Stickers & Overlays\n\n#### Objective & Learning Framework\nMaster video effects, body effects, lens textures, retro film overlays, blending modes, and stylized restraint.\n\n#### Core Curriculum Breakdown\n* CapCut Effects Library architecture: Video Effects vs Body Effects\n* Lens effects: Chromatic aberration, edge blur, and anamorphic flares\n* Texture overlays: 35mm film grain, dust, scratches, and light leaks\n* Blending modes for overlays: Screen, Multiply, Overlay, and Soft Light\n* Restraint in editing: Avoiding the 'Filter Dump' amateur look\n* Stylized glitches and neon treatments for tech/music niches\n* Stacking effects on Adjustment Layers for global timeline control\n\n#### Practical Application Exercise\nTransform clean sterile digital phone video into an authentic textured 16mm vintage film aesthetic using grain overlays, warm glow, and subtle edge blur.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Which blending mode is standard when layering a black-background film grain or light leak overlay over video footage?",
      options: ["Screen (which drops all black pixels and keeps light textures)","Multiply","Color Burn","Darken"],
      correctIdx: 0,
      explanation: "'Screen' blending mode makes black background pixels completely transparent while preserving luminous grain and light textures."
    },
    hasSimulator: "tool-matrix"
  },
  "module-17-layers-pip-compositing": {
    slug: "module-17-layers-pip-compositing",
    title: "Module 17: Layers, PiP & Compositing",
    xpReward: 160,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=cyMEW5Rne4U",
    notes: "### Module 17: Layers, PiP & Compositing\n\n#### Objective & Learning Framework\nMaster multi-layer timeline architecture, Picture-in-Picture (PiP), reaction layouts, Compound Clips, and execute PROJECT 04.\n\n#### Core Curriculum Breakdown\n* Multi-layer timeline architecture: Z-index and visual hierarchy\n* Picture-in-Picture (PiP): Creating professional gaming/reaction layouts\n* Screen recording integration with device mockups\n* Compound Clips: Nesting complex multi-track edits into single clips\n* Adjustment Layers: Global grading and effect processing\n* Advanced Blending Modes: Multiply for documents, Screen for lights\n* PROJECT 04 Brief: Advanced Multi-Layer Composition\n\n#### Practical Application Exercise\nExecute PROJECT 04: Advanced Multi-Layer Composition — Construct a multi-window reaction/breakdown video featuring 4 simultaneous synchronized video layers and nested compound clips.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is a 'Compound Clip' in CapCut Desktop?",
      options: ["A container that bundles multiple clips, text tracks, and audio layers into a single editable clip on the timeline","A clip that is permanently compressed to 480p","A tool that deletes audio tracks","A pre-made TikTok template"],
      correctIdx: 0,
      explanation: "Compound clips nest complex multi-layer assemblies into a clean single unit, making global animation and timeline management effortless."
    },
    hasSimulator: "tool-matrix"
  },
  "module-18-keyframe-animation": {
    slug: "module-18-keyframe-animation",
    title: "Module 18: Keyframe Animation",
    xpReward: 150,
    duration: "1h 00m",
    videoUrl: "https://www.youtube.com/watch?v=68KNzsmBarM",
    notes: "### Module 18: Keyframe Animation\n\n#### Objective & Learning Framework\nMaster keyframes across position, scale, rotation, opacity, and custom bezier speed graph easing curves.\n\n#### Core Curriculum Breakdown\n* What keyframes are: Defining property values over time\n* The Big 4: Position, Scale, Rotation, and Opacity keyframes\n* Simultaneous multi-property animation: Zoom + Drift + Fade\n* Why linear keyframes feel cheap and robotic\n* CapCut Graph Editor: Bezier curves, Ease In, Ease Out, Ease In/Out\n* Creating organic camera drift (Ken Burns effect) on still images\n* Logo and lower-third graphic fly-in animations\n\n#### Practical Application Exercise\nAnimate a static logo and title card using bezier easing curves so the motion feels elastic, weighted, and premium.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why does professional motion design rely on bezier easing curves rather than linear keyframe animation?",
      options: ["Linear movement looks robotic and unnatural; easing curves simulate real-world physics like acceleration and inertia","Linear animation takes more memory to render","Easing curves prevent video files from expiring","Linear keyframes only work in black and white"],
      correctIdx: 0,
      explanation: "Easing curves model real-world physics (acceleration and friction), making digital movement feel smooth and natural to human perception."
    },
    hasSimulator: "tool-matrix"
  },
  "module-19-speed-control-speed-ramping": {
    slug: "module-19-speed-control-speed-ramping",
    title: "Module 19: Speed Control & Speed Ramping",
    xpReward: 160,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=O_ochkV-B8Q",
    notes: "### Module 19: Speed Control & Speed Ramping\n\n#### Objective & Learning Framework\nMaster slow motion, speed curves (Hero, Bullet, Jump Cut), optical flow frame interpolation, and execute PROJECT 05.\n\n#### Core Curriculum Breakdown\n* Standard speed adjustments vs Variable Speed Curves\n* Understanding camera frame rates for slow motion (60fps vs 120fps)\n* CapCut Speed Curve Presets: Hero, Bullet, Montage, Jump Cut\n* Custom Curve sculpting: Creating seamless speed ramps\n* Optical Flow & AI Frame Interpolation: Creating smooth slomo from 30fps footage\n* Synchronizing speed ramps to music bass drops and snare hits\n* PROJECT 05 Brief: Cinematic Speed-Ramp Sequence\n\n#### Practical Application Exercise\nExecute PROJECT 05: Cinematic Speed-Ramp Sequence — Create a 25-second automotive or sports sequence with custom bezier speed ramps and optical flow smoothing.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What does CapCut's 'Optical Flow' feature do when slowing down video clips?",
      options: ["It analyzes motion vectors and generates brand-new AI intermediate frames to make slow motion look silky smooth","It increases the volume of the audio","It changes the camera lens from telephoto to wide","It converts the video into an optical illusion"],
      correctIdx: 0,
      explanation: "Optical Flow synthesizes new intermediate frames using AI motion analysis, preventing stutter when slowing down standard frame-rate footage."
    },
    hasSimulator: "tool-matrix"
  },
  "module-20-masking": {
    slug: "module-20-masking",
    title: "Module 20: Masking",
    xpReward: 140,
    duration: "55m",
    videoUrl: "https://www.youtube.com/watch?v=wX-y4Tq3Jk0",
    notes: "### Module 20: Masking\n\n#### Objective & Learning Framework\nMaster rectangle, circle, split mask, film strip, custom freeform masks, feathering, and mask-based reveal transitions.\n\n#### Core Curriculum Breakdown\n* The physics of masks: What stays visible vs what gets hidden\n* Geometric masks: Rectangle, Circle, Split, Star, and Heart\n* Film Strip mask for cinematic letterbox bars\n* Feathering mechanics: Soft organic edges vs hard geometric cuts\n* Inverting masks: Revealing foreground vs background\n* Keyframing mask position for cinematic wipe transitions\n* Text Masking: Video playing inside bold typography\n\n#### Practical Application Exercise\nCreate an invisible mask wipe transition where a walking person passes in front of the lens, wiping the screen into a new location.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the purpose of the 'Feather' control in CapCut's mask tool?",
      options: ["It softens and blends the boundary edge of the mask into the background layer","It adds bird feather stickers to the screen","It speeds up the playback rate of the clip","It deletes audio keyframes"],
      correctIdx: 0,
      explanation: "Feathering diffuses the border of a mask, creating smooth gradient transitions instead of harsh geometric seams."
    },
    hasSimulator: "tool-matrix"
  },
  "module-21-chroma-key-background-removal": {
    slug: "module-21-chroma-key-background-removal",
    title: "Module 21: Chroma Key & Background Removal",
    xpReward: 160,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=VUMVsGm0xOE",
    notes: "### Module 21: Chroma Key & Background Removal\n\n#### Objective & Learning Framework\nMaster green-screen keying, intensity/shadow adjustments, AI Auto-Cutout, custom removal, and execute PROJECT 06.\n\n#### Core Curriculum Breakdown\n* Green-screen physics: Why green is used (skin tone contrast)\n* CapCut Chroma Key: Color picker, Intensity, Shadow, and Feathering\n* Cleaning edge green spill and color fringes\n* AI Auto-Cutout (Background Removal without green screen)\n* Custom Stroke Cutout (Brushed AI segmentation)\n* Background replacement: Matching lighting, scale, and perspective\n* PROJECT 06 Brief: Full Background Replacement\n\n#### Practical Application Exercise\nExecute PROJECT 06: Full Background Replacement — Key out a green screen interview clip, composite the subject into a realistic 3D studio, and match light direction and ambient color.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why should you apply a subtle blur to a newly inserted background plate behind a keyed subject?",
      options: ["It simulates natural lens depth-of-field (bokeh), making the composite look optically authentic","Because backgrounds must always be out of focus by law","It saves bandwidth when uploading to TikTok","It removes watermarks from the background"],
      correctIdx: 0,
      explanation: "Real camera lenses naturally blur backgrounds when focusing on a human subject; adding blur creates convincing optical realism."
    },
    hasSimulator: "tool-matrix"
  },
  "module-22-motion-tracking": {
    slug: "module-22-motion-tracking",
    title: "Module 22: Motion Tracking",
    xpReward: 160,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=_e0Pk65yPg8",
    notes: "### Module 22: Motion Tracking\n\n#### Objective & Learning Framework\nMaster AI Face Tracking, Body Tracking, Hand Tracking, Object Tracking, pinned graphics, and execute PROJECT 07.\n\n#### Core Curriculum Breakdown\n* What motion tracking is: Calculating pixel trajectories across time\n* Face Tracking: Locking titles, emojis, and sensors to moving faces\n* Body Tracking & Hand Tracking: Pinning floating product cards to gestures\n* Manual Object Tracking: Tracking cars, balls, and non-human moving items\n* Tracking text, arrows, and callout graphics\n* Handling tracking drift, occlusions, and tracking failures\n* PROJECT 07 Brief: Dynamic Object-Tracking Explainer\n\n#### Practical Application Exercise\nExecute PROJECT 07: Dynamic Object-Tracking Explainer — Create a 45-second product or athletic breakdown where animated labels, arrows, and data stats remain locked to moving subjects.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What feature should you track on a human subject for the most reliable face-tracking calculation?",
      options: ["A high-contrast feature that doesn't change shape, such as the bridge of the nose or eye center","The tip of their hair in the wind","A blurry shadow on the floor","The background wall behind them"],
      correctIdx: 0,
      explanation: "Stable, high-contrast facial landmarks like the bridge of the nose provide consistent tracking coordinates through rotations."
    },
    hasSimulator: "tool-matrix"
  },
  "module-23-stabilization-enhancement-relighting": {
    slug: "module-23-stabilization-enhancement-relighting",
    title: "Module 23: Stabilization, Enhancement & Relighting",
    xpReward: 140,
    duration: "50m",
    videoUrl: "https://www.youtube.com/watch?v=k42B2Qp6k7I",
    notes: "### Module 23: Stabilization, Enhancement & Relighting\n\n#### Objective & Learning Framework\nMaster CapCut video stabilization (Minimum Cut vs Most Stable), image enhancement, blurry clip recovery, and AI facial relighting.\n\n#### Core Curriculum Breakdown\n* Why camera footage shakes: Shutter speed, micro-jitters, and rolling shutter\n* CapCut Stabilization modes: Minimum Cut vs Customized vs Most Stable\n* Stabilization tradeoffs: Cropping factor vs warp distortion\n* Enhance Image & Enhance Quality: Rescuing soft or low-bitrate clips\n* Artificial Relighting: Adding simulated softbox, ring light, and colored rim lights\n* Facial Lighting: Enhancing eye sparkle and evening out skin tones\n* Quality Control: Preventing unnatural plastic AI skin artifacts\n\n#### Practical Application Exercise\nRescue an intensely shaky handheld walking clip using custom stabilization and relight an underexposed interview subject with a warm 45-degree key light.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the inevitable technical trade-off when applying digital stabilization to shaky video footage?",
      options: ["The software must zoom in (crop) the image slightly to compensate for frame movement, sacrificing edge pixels","The video is permanently converted to 10fps","The audio gets pitched down an octave","It changes the project aspect ratio"],
      correctIdx: 0,
      explanation: "Digital stabilization works by aligning moving frames against a center axis, which requires cropping into the frame to hide moving boundaries."
    },
    hasSimulator: "tool-matrix"
  },
  "module-24-color-correction": {
    slug: "module-24-color-correction",
    title: "Module 24: Color Correction",
    xpReward: 150,
    duration: "1h 00m",
    videoUrl: "https://www.youtube.com/watch?v=Yl8lJzFz_uQ",
    notes: "### Module 24: Color Correction\n\n#### Objective & Learning Framework\nMaster technical color correction: exposure balancing, contrast, highlights, shadows, white balance, tint, HSL sliders, and curve graphs.\n\n#### Core Curriculum Breakdown\n* Color Correction (Technical Repair) vs Color Grading (Stylistic Art)\n* The Exposure Triangle in post: Brightness, Exposure, Contrast\n* Dynamic Range balancing: Rescuing clipped Highlights and lifting muddy Shadows\n* White Balance & Color Temperature: Kelvin spectrum and Tint (Magenta vs Green)\n* Vibrance vs Saturation: Protecting delicate human skin tones\n* HSL Control: Targeting specific color hues, saturations, and luminances\n* Curves: Fine-tuning Master, Red, Green, and Blue tonal channels\n* Auto Color vs Manual Correction workflow\n\n#### Practical Application Exercise\nColor correct three drastically mismatched camera takes (one cold blue, one warm orange, one muddy green) until skin tones match identically across all cuts.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the crucial difference between 'Color Correction' and 'Color Grading'?",
      options: ["Color correction fixes technical errors (exposure, white balance) to make footage neutral; color grading applies stylized aesthetic moods","Color correction is for black and white; grading is for color","Color correction makes videos louder","There is no difference"],
      correctIdx: 0,
      explanation: "Correction repairs technical flaws to achieve natural, balanced footage; grading is the subsequent creative step that creates stylized mood."
    },
    hasSimulator: "tool-matrix"
  },
  "module-25-color-grading": {
    slug: "module-25-color-grading",
    title: "Module 25: Color Grading",
    xpReward: 160,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=me7BKGe6qlY",
    notes: "### Module 25: Color Grading\n\n#### Objective & Learning Framework\nMaster cinematic moods (warm luxury, cold thriller, teal & orange), 3D LUTs importing, and execute PROJECT 09: Cinematic Edit.\n\n#### Core Curriculum Breakdown\n* The Psychology of Color: How palette triggers dopamine, fear, or serenity\n* Classic cinema palettes: Hollywood Teal & Orange, Nordic Noir, Vintage Kodachrome\n* What 3D LUTs (.cube) are and how they remap color arrays\n* Importing custom commercial LUTs into CapCut Desktop\n* The 50% Rule: Why you should almost never apply a LUT at 100% intensity\n* Protecting skin tones while pushing background stylized hues\n* PROJECT 09 Brief: Cinematic Mood Edit\n\n#### Practical Application Exercise\nExecute PROJECT 09: Cinematic Edit — Grade a 45-second moody sequence with custom 3D LUTs, film grain emulation, and nuanced atmospheric sound.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why do professional colorists rarely apply LUTs at 100% full intensity?",
      options: ["100% intensity often crushes shadow details and clips skin tones; blending at 40-70% preserves organic detail","LUTs automatically delete video tracks at 100%","It doubles the file size of the export","CapCut only allows 50% opacity by default"],
      correctIdx: 0,
      explanation: "Full 100% LUT application frequently introduces harsh color clipping; dialed back to 40-70%, it enhances the image tastefully."
    },
    hasSimulator: "tool-matrix"
  },
  "module-26-advanced-audio-masterclass": {
    slug: "module-26-advanced-audio-masterclass",
    title: "Module 26: Advanced Audio Masterclass",
    xpReward: 150,
    duration: "1h 00m",
    videoUrl: "https://www.youtube.com/watch?v=q6gB4aG2Q4Q",
    notes: "### Module 26: Advanced Audio Masterclass\n\n#### Objective & Learning Framework\nMaster multi-band vocal EQ, beat detection, waveform synchronization, dynamic sidechain ducking, and commercial master bus loudness.\n\n#### Core Curriculum Breakdown\n* The Commercial Audio Master Chain: EQ -> De-Esser -> Compressor -> Limiter\n* Dialogue priority: Carving vocal space in dense musical arrangements\n* CapCut Beat Detection: Auto-generating rhythmic yellow markers on audio beats\n* Waveform synchronization: Multi-camera audio sync without timecode\n* Dynamic auto-ducking vs custom keyframed audio envelopes\n* Loudness units (LUFS) for streaming delivery (-14 LUFS Spotify/YouTube)\n* Final mix quality assurance & acoustic inspection\n\n#### Practical Application Exercise\nTake a chaotic multi-speaker panel with loud audience applause and music, and master a pristine -14 LUFS commercial audio mix.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the primary function of CapCut's 'Beat Detection' tool?",
      options: ["It analyzes music waveforms and automatically drops yellow snap markers on the timeline at every rhythmic beat","It generates drum beats using AI","It plays the video at double speed","It mutes the bassline"],
      correctIdx: 0,
      explanation: "Beat Detection marks rhythmic tempo beats along the audio track, allowing editors to snap cuts and transitions precisely to the music."
    },
    hasSimulator: "tool-matrix"
  },
  "module-27-advanced-text-motion-graphics": {
    slug: "module-27-advanced-text-motion-graphics",
    title: "Module 27: Advanced Text & Motion Graphics",
    xpReward: 150,
    duration: "1h 00m",
    videoUrl: "https://www.youtube.com/watch?v=wyB0mpw0dno",
    notes: "### Module 27: Advanced Text & Motion Graphics\n\n#### Objective & Learning Framework\nMaster kinetic typography, lower-third systems, animated callouts, logo stings, and reusable brand motion kits.\n\n#### Core Curriculum Breakdown\n* Building professional broadcast title systems\n* In, Out, and Loop text animations: Fade, Slide, Bounce, Typewriter, Glitch\n* Custom kinetic typography with position/scale bezier keyframing\n* Designing executive lower-thirds with animated accent lines and shape masks\n* Dynamic data callouts: Highlighting statistics and percentage counters\n* Logo stings and brand graphic transitions\n* Saving and organizing reusable motion graphics presets in CapCut\n\n#### Practical Application Exercise\nDesign an entire corporate motion graphics package (intro title card, animated lower-third, data callout card, and outro logo stinger).\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "How long should an executive lower-third graphic typically remain visible on screen for comfortable reading?",
      options: ["3.5 to 5.0 seconds","0.5 seconds","30 seconds","The entire length of the video"],
      correctIdx: 0,
      explanation: "3.5 to 5 seconds provides sufficient cognitive time for viewers to read both the subject's name and title without distraction."
    },
    hasSimulator: "tool-matrix"
  },
  "module-28-advanced-editorial-projects": {
    slug: "module-28-advanced-editorial-projects",
    title: "Module 28: Advanced Editorial Projects",
    xpReward: 200,
    duration: "1h 30m",
    videoUrl: "https://www.youtube.com/watch?v=o6tcF1JLlwo",
    notes: "### Module 28: Advanced Editorial Projects\n\n#### Objective & Learning Framework\nExecute high-level editorial projects: PROJECT 08 (Talking-Head Master) and PROJECT 10 (Advanced Composite).\n\n#### Core Curriculum Breakdown\n* Reviewing the 7-Factor Professional Editorial Rubric\n* PROJECT 08 Brief: Executive Talking-Head Masterclass edit\n* Multi-camera switching and B-roll cutaway pacing\n* PROJECT 10 Brief: Advanced Motion Composite with complex tracking and masks\n* Deconstructing commercial agency deliverables\n* Pre-delivery quality control audit\n\n#### Practical Application Exercise\nExecute PROJECT 08 (Talking-Head Master) or PROJECT 10 (Advanced Composite) to demonstrate comprehensive mastery of Stages 1 through 4.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "On the CapCut Master Academy 7-Factor Rubric, which two domains carry the highest weighting (20% each)?",
      options: ["Technical Editing & Storytelling","Sticker Count & Rainbow Filters","File Size & Upload Speed","Thumbnail Design & Title Length"],
      correctIdx: 0,
      explanation: "Technical precision (clean cuts, seamless continuity) and Storytelling (narrative structure, emotional resonance) each constitute 20% of the master grade."
    },
    hasSimulator: "tool-matrix"
  },
  "module-29-capcut-ai-foundations": {
    slug: "module-29-capcut-ai-foundations",
    title: "Module 29: CapCut AI Foundations",
    xpReward: 130,
    duration: "45m",
    videoUrl: "https://www.youtube.com/watch?v=23qWd5gL-bU",
    notes: "### Module 29: CapCut AI Foundations\n\n#### Objective & Learning Framework\nMaster CapCut AI tools: Text-to-Speech (TTS), AI auto-edit, AI background cutout, AI color matching, and human quality-control oversight.\n\n#### Core Curriculum Breakdown\n* The Modern AI Editing Landscape: Automation vs Human Taste\n* CapCut Text-to-Speech (TTS): Voice selection, speed, and emotional inflection\n* AI Auto-Cutout vs Chroma Key: When neural segmentation wins\n* AI Auto-Color Match: Matching multiple clips with one click\n* AI Auto-Edit and Template generation: Limitations and pitfalls\n* Human Review Protocol: Catching AI hallucinations and glitch frames\n* Combining AI speed with professional editorial judgment\n\n#### Practical Application Exercise\nBuild a 30-second automated video draft using CapCut AI tools, then perform human editorial surgery to fix pacing errors, voice mispronunciations, and awkward cuts.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why must all AI-assisted edits undergo meticulous human quality control before delivery?",
      options: ["AI models frequently introduce pacing errors, visual cutout glitches, and unnatural vocal inflections that require human editorial correction","Because AI videos are illegal to post","To make the file size larger","Because computers cannot render in 1080p"],
      correctIdx: 0,
      explanation: "Human editorial oversight ensures narrative cohesion, natural pacing, and corrects visual and acoustic AI artifacts."
    },
    hasSimulator: "tool-matrix"
  },
  "module-30-generative-ai-content-workflows": {
    slug: "module-30-generative-ai-content-workflows",
    title: "Module 30: Generative & AI Content Workflows",
    xpReward: 160,
    duration: "1h 10m",
    videoUrl: "https://www.youtube.com/watch?v=j5_471mO14c",
    notes: "### Module 30: Generative & AI Content Workflows\n\n#### Objective & Learning Framework\nMaster Text-to-Video, AI image generation, AI scriptwriting, Long-to-Short reformatting, and execute PROJECT 11.\n\n#### Core Curriculum Breakdown\n* CapCut Generative AI Suite: Text-to-Video and AI Image synthesis\n* Long-to-Short: Converting 30-minute podcasts into viral clips automatically\n* AI Scene Splitting: Detecting camera shot changes in flattened video files\n* AI Video Translator: Lip-sync and multi-language voice translation\n* Generating custom B-roll assets using text prompts\n* Avoiding the generic 'AI Content Farm' trap\n* PROJECT 11 Brief: AI-Assisted Short-Form Campaign\n\n#### Practical Application Exercise\nExecute PROJECT 11: AI-Assisted Short-Form Campaign — Take a 20-minute long-form video, use AI tools to extract 3 viral hooks, and refine them into a high-retention social campaign.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the primary editorial risk of relying entirely on AI 'Long-to-Short' tools without manual human editing?",
      options: ["The clips often cut off context, select weak hooks, and feature generic stock B-roll that damages brand credibility","The video will automatically be deleted by YouTube","The video cannot have sound","The aspect ratio will turn into a triangle"],
      correctIdx: 0,
      explanation: "Automated AI clipping lacks emotional intelligence and frequently truncates vital context or inserts irrelevant generic stock imagery."
    },
    hasSimulator: "tool-matrix"
  },
  "module-31-ai-production-pipeline": {
    slug: "module-31-ai-production-pipeline",
    title: "Module 31: AI Production Pipeline",
    xpReward: 150,
    duration: "1h 00m",
    videoUrl: "https://www.youtube.com/watch?v=cyMEW5Rne4U",
    notes: "### Module 31: AI Production Pipeline\n\n#### Objective & Learning Framework\nMaster the complete end-to-end AI production pipeline: Long Video -> Transcript -> Rough Cut -> Subtitles -> B-roll -> Color -> QC -> Multi-Platform Export.\n\n#### Core Curriculum Breakdown\n* The 12-Step Modern AI Video Production Pipeline\n* Step 1-3: Ingestion, AI Transcript Generation, and Content Mining\n* Step 4-6: Rough Cut, Dead-Air Excision, and Voice Cleanup\n* Step 7-9: B-roll Insertion, Kinetic Typography, and Sound Design\n* Step 10-12: Color Match, Pre-Delivery QC, and Multi-Platform Render\n* Batch processing multiple client videos simultaneously\n* Building your own automated agency SOP (Standard Operating Procedure)\n\n#### Practical Application Exercise\nExecute the complete 12-step pipeline on a raw client recording, timing your total workflow from import to final delivery.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why must dialogue cuts and pacing be 100% locked before you add kinetic captions and sound design in the production pipeline?",
      options: ["Any subsequent cut to dialogue will misalign all downstream captions, sound effects, and transitions, forcing you to re-edit them completely","Because CapCut prevents text from being added to short clips","To save hard drive space","Because captions only work on exported files"],
      correctIdx: 0,
      explanation: "Locking the cut first protects all downstream temporal work (captions, SFX, beat sync) from becoming unsynchronized by later edits."
    },
    hasSimulator: "tool-matrix"
  },
  "module-32-social-media-editing": {
    slug: "module-32-social-media-editing",
    title: "Module 32: Social Media Editing",
    xpReward: 160,
    duration: "1h 15m",
    videoUrl: "https://www.youtube.com/watch?v=68KNzsmBarM",
    notes: "### Module 32: Social Media Editing\n\n#### Objective & Learning Framework\nMaster platform-specific editing tracks: TikTok (trends/hooks), Instagram Reels (polish/branding), YouTube Shorts (retention/CTA), and execute PROJECT 12.\n\n#### Core Curriculum Breakdown\n* Platform Psychology: Why what works on TikTok flops on LinkedIn\n* Track A — TikTok: Aggressive 1.5s hooks, fast cuts, trending audio, raw authenticity\n* Track B — Instagram Reels: Aesthetic visual polish, luxury typography, seamless loops\n* Track C — YouTube Shorts: Dense information payload, retention loops, subscribe CTA\n* Track D — Facebook & LinkedIn: Large readable captions, corporate pacing, clear thesis\n* Track E — YouTube Long-Form: Chapter arcs, B-roll breathers, narrative pacing\n* PROJECT 12 Brief: Multi-Platform Campaign Adaptation\n\n#### Practical Application Exercise\nExecute PROJECT 12: Multi-Platform Campaign — Take 1 master horizontal interview and produce 3 platform-tailored adaptations (16:9 YouTube, 9:16 TikTok, and 1:1 LinkedIn).\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why should you never export the exact same video file across TikTok, YouTube, and LinkedIn?",
      options: ["Each platform has distinct user demographics, attention spans, UI overlays, and viewing contexts requiring tailored pacing and framing","Because social networks block identical files from uploading","Because LinkedIn only supports black and white video","Because TikTok deletes landscape videos"],
      correctIdx: 0,
      explanation: "Tailoring the hook, pacing, aspect ratio, and typography to each platform's culture and interface maximizes organic reach and retention."
    },
    hasSimulator: "tool-matrix"
  },
  "module-33-editing-specializations": {
    slug: "module-33-editing-specializations",
    title: "Module 33: Editing Specializations",
    xpReward: 180,
    duration: "1h 20m",
    videoUrl: "https://www.youtube.com/watch?v=O_ochkV-B8Q",
    notes: "### Module 33: Editing Specializations\n\n#### Objective & Learning Framework\nMaster commercial niches: UGC Ads, Documentaries, Corporate Branding, YouTube Long-Form, and execute PROJECT 13 or PROJECT 14.\n\n#### Core Curriculum Breakdown\n* The 12 Commercial Editing Specializations\n* Specialization 01: Talking Head & Thought Leadership\n* Specialization 04: Commercial Brand Advertisements\n* Specialization 05: UGC (User Generated Content) Direct-Response Ads\n* Specialization 06: Documentary & Narrative Storytelling\n* Specialization 07: Cinematic Travel & High-End Visuals\n* PROJECT 13 Brief: Commercial Advertisement (Problem -> Solution -> CTA)\n* PROJECT 14 Brief: Documentary Sequence (Archival, sound bridges, emotion)\n\n#### Practical Application Exercise\nExecute PROJECT 13 (Commercial Advertisement) or PROJECT 14 (Documentary Sequence) to develop deep domain expertise in your chosen career path.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the standard structural framework for high-converting direct-response commercial video ads?",
      options: ["Hook (Pattern Interrupt) -> Problem/Agitation -> Solution Demo -> Proof -> Call to Action (CTA)","Ending credits -> Middle scene -> Opening logo","Random clips with loud dance music","A 10-minute introduction before showing the product"],
      correctIdx: 0,
      explanation: "The Hook -> Problem -> Solution -> Proof -> CTA framework is the time-tested structure for direct-response marketing performance."
    },
    hasSimulator: "tool-matrix"
  },
  "module-34-professional-workflow": {
    slug: "module-34-professional-workflow",
    title: "Module 34: Professional Workflow",
    xpReward: 140,
    duration: "55m",
    videoUrl: "https://www.youtube.com/watch?v=wX-y4Tq3Jk0",
    notes: "### Module 34: Professional Workflow\n\n#### Objective & Learning Framework\nMaster client briefs, revision cycles, feedback management, professional file delivery, archiving, and portfolio demo reels.\n\n#### Core Curriculum Breakdown\n* Deconstructing the Client Brief: Target audience, tone, and deliverables\n* Organizing client assets and identifying missing footage early\n* Version Control Discipline: V01_RoughCut, V02_Revisions, V03_FinalMaster\n* Handling client feedback without getting frustrated: The 3-Round Revision Policy\n* Professional delivery packaging: Cloud Drive links, clean filenames, and codecs\n* Long-term project archiving and cold storage practices\n* Building a high-impact 60-second Editor Demo Reel that lands clients\n\n#### Practical Application Exercise\nReview a mock client feedback email with 8 revision requests, prioritize them into an actionable revision plan, and export an updated V02 with revision notes.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "Why should you duplicate your project into a new version (e.g. 'Project_V02') before making client revisions?",
      options: ["It protects the previous approved edit in case the client changes their mind and wants to revert specific cuts","It makes CapCut render twice as fast","It deletes old video clips automatically","CapCut requires new versions by law"],
      correctIdx: 0,
      explanation: "Versioning preserves previous timeline states so you can easily revert changes or reference prior client-approved sections."
    },
    hasSimulator: "tool-matrix"
  },
  "module-35-troubleshooting-technical-mastery": {
    slug: "module-35-troubleshooting-technical-mastery",
    title: "Module 35: Troubleshooting & Technical Mastery",
    xpReward: 130,
    duration: "50m",
    videoUrl: "https://www.youtube.com/watch?v=VUMVsGm0xOE",
    notes: "### Module 35: Troubleshooting & Technical Mastery\n\n#### Objective & Learning Framework\nMaster systemic troubleshooting: timeline lag, dropped frames, audio sync drift, export failures, missing media relinking, and performance tuning.\n\n#### Core Curriculum Breakdown\n* The Troubleshooting Mindset: Isolating variables before panicking\n* Fixing Timeline Lag: Cache cleaning, proxy generation, and preview resolution\n* Audio Sync Drift: Variable Frame Rate (VFR) vs Constant Frame Rate (CFR)\n* Re-linking 'Missing Media / File Offline' errors\n* Export Failures & Crashes: Corrupted clips, codec conflicts, and hardware acceleration\n* Fixing tracking and green-screen edge artifacts\n* Color shifts between CapCut preview player and mobile phone screens (Gamma shift)\n* The 20-Point Emergency Recovery Protocol\n\n#### Practical Application Exercise\nDiagnose and fix a corrupted practice project containing audio desync, missing media files, and timeline lag until it renders flawlessly.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the most common reason audio slowly drifts out of sync with video on long smartphone recordings?",
      options: ["The video was recorded in Variable Frame Rate (VFR) rather than Constant Frame Rate (CFR)","The microphone was unplugged","The computer speakers are too cold","CapCut only plays audio for 5 minutes"],
      correctIdx: 0,
      explanation: "Smartphones dynamically alter frame rates (VFR) to save battery; converting to Constant Frame Rate (CFR) resolves audio sync drift."
    },
    hasSimulator: "tool-matrix"
  },
  "module-36-capcut-mastery-professional-capstone": {
    slug: "module-36-capcut-mastery-professional-capstone",
    title: "Module 36: CapCut Mastery & Professional Capstone",
    xpReward: 500,
    duration: "3h 00m",
    videoUrl: "https://www.youtube.com/watch?v=_e0Pk65yPg8",
    notes: "### Module 36: CapCut Mastery & Professional Capstone\n\n#### Objective & Learning Framework\nThe Final Crucible: Receive unedited raw footage and a written client brief with NO tutorial recipes. Execute PROJECT 15 to earn your Master Certification.\n\n#### Core Curriculum Breakdown\n* The Capstone Brief: Client background, target audience, brand direction\n* Independent editorial decision-making: Strategy before software\n* Assembling the 7-asset Master Delivery Package\n* Self-Review Protocol: The 25-point Pre-Delivery QC Checklist\n* Defending editorial choices: Behind-the-scenes breakdown requirement\n* Evaluation against the 7-Factor Master Rubric (80% Passing Threshold)\n* Official CapCut Certified Master Video Editor credential issuance\n\n#### Practical Application Exercise\nExecute PROJECT 15: The Final Professional Capstone Package — Deliver all 7 required video assets from raw footage based on the written brief.\n\n#### CapCut Academy Assignment\nundefined\n",
    quiz: {
      question: "What is the final defining trait of a certified CapCut Master Editor?",
      options: ["The ability to receive raw unorganized footage and independently make every storytelling, pacing, audio, and color decision to satisfy a client brief","Memorizing every single sticker in the CapCut library","Using 40 different transitions in every 10-second clip","Always using default auto-templates"],
      correctIdx: 0,
      explanation: "A true master editor possesses independent editorial judgment, technical precision, and professional client delivery standards without relying on templates."
    },
    hasSimulator: "tool-matrix"
  },
};
