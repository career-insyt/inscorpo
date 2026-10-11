import { CORPORATE_MODELING_LESSONS } from "./corporate-modeling-lessons";
import { ENTERPRISE_PYTHON_LESSONS } from "./enterprise-python-lessons";
import { ENTERPRISE_AUTOMATION_LESSONS } from "./enterprise-automation-lessons";
import { ENTERPRISE_BI_LESSONS } from "./enterprise-bi-lessons";
import { MTO_MASTERY_LESSONS } from "./mto-mastery-lessons";
import { CAPCUT_LESSON_DETAILS } from "./capcut-lessons-adapter";
import { CORPORATE_WORKPLACE_LESSONS } from "./corporate-workplace-lessons";

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface LessonDetail {
  slug: string;
  title: string;
  xpReward: number;
  duration: string;
  videoUrl: string;
  notes: string;
  quiz: LessonQuiz;
  hasSimulator?: "corporate-modeling" | "tool-matrix" | "messy-data" | "export-lab" | "ai-verification" | "error-log" | "lookup" | "npv" | "solver" | "email" | "resume" | "star" | "forces" | "formula" | "python-analytics" | "workflow-automation" | "bi-powerbi-sql" | "mto-recruitment";
}

export const DYNAMIC_LESSONS: Record<string, LessonDetail> = {
  ...CORPORATE_MODELING_LESSONS,
  ...ENTERPRISE_PYTHON_LESSONS,
  ...ENTERPRISE_AUTOMATION_LESSONS,
  ...ENTERPRISE_BI_LESSONS,
  ...MTO_MASTERY_LESSONS,
  ...CAPCUT_LESSON_DETAILS,
  ...CORPORATE_WORKPLACE_LESSONS,
  // ═══════════════════════════════════════════════════════════════
  // 1. VIDEO EDITING + AI PRODUCTION (Pure Skill-Based)
  // ═══════════════════════════════════════════════════════════════
  "timeline-assembly": {
    slug: "timeline-assembly",
    title: "Interface Setup, Track Organization & Three-Point Editing",
    xpReward: 70,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### CapCut Desktop Pro Workflow & Three-Point Editing

#### Executive Overview
Professional editing velocity is governed by track hygiene and non-destructive trimming. Before dragging any raw clip into the primary timeline, your project properties and shortcuts must be configured.

#### Core Timeline Rules:
1. **Aspect Ratio Lock**: Select **9:16** for vertical social formats or **16:9** for YouTube/desktop film. Never leave aspect ratio set to "Original".
2. **Main Track Magnet**: Keep Auto-Snapping and Main Track Magnet enabled for rough cuts, but disable Magnet (\`P\` or Toggle Magnet icon) when layering complex B-roll and sound effects.
3. **Three-Point Trimming**: Use **I** (Set In-Point) and **O** (Set Out-Point) in the preview monitor to select only the usable portion of a clip before inserting it into the timeline with **Q** / **W** ripple trims.

#### Professional Hotkey Palette:
* \`Ctrl + B\` or \`C\`: Razor blade cut at playhead.
* \`Q\`: Ripple delete from clip start to playhead.
* \`W\`: Ripple delete from playhead to clip end.
* \`V\`: Select tool.
* \`Alt + Drag\`: Duplicate clip/title without affecting original in media pool.`,
    quiz: {
      question: "Which keyboard shortcut in CapCut ripple-trims and deletes everything from the beginning of the active clip up to the playhead position?",
      options: ["Q", "W", "Ctrl + B", "Delete"],
      correctIdx: 0,
      explanation: "'Q' performs a ripple trim from the head of the clip to the playhead, automatically closing the gap without leaving empty black frames."
    },
    hasSimulator: "tool-matrix"
  },

  "visual-grammar-pacing": {
    slug: "visual-grammar-pacing",
    title: "Pacing Psychology: J-Cuts, L-Cuts & Retention Rhythm",
    xpReward: 60,
    duration: "20m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Pacing Psychology & Audio-Visual Transitions

#### The Science of Attention Retention
Straight hard cuts where video and audio transition simultaneously feel robotic and fatiguing. Professional editors use split edits (J-Cuts and L-Cuts) to create seamless narrative momentum.

#### Split Cut Mechanics:
1. **J-Cut (Audio Leads)**: The audio of the next scene starts 0.5 to 1.5 seconds BEFORE the video changes. This stimulates subconscious curiosity in the viewer's brain.
2. **L-Cut (Video Leads)**: The video transitions to the new scene or B-roll while the dialogue of the previous speaker continues underneath.
3. **Eye-Trace Continuity**: Never place your visual subject on the far left in Shot 1 and far right in Shot 2. Keep the viewer's focal point within the central third to avoid cognitive friction.`,
    quiz: {
      question: "What occurs during a J-Cut transition in video editing?",
      options: [
        "Audio from the incoming clip plays before the visual video changes",
        "Video transitions to black before audio begins",
        "Both audio and video cut abruptly at the exact same frame",
        "The timeline is reversed by 180 degrees"
      ],
      correctIdx: 0,
      explanation: "In a J-Cut (shaped like the letter J on the timeline), the audio of scene B enters early while scene A's visual is still on screen."
    },
    hasSimulator: "tool-matrix"
  },

  "kinetic-subtitles": {
    slug: "kinetic-subtitles",
    title: "Styling Dynamic Auto-Captions & Word-by-Word Highlight",
    xpReward: 80,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Kinetic Typography & Social Retention Subtitles

#### Retention Impact
Over 70% of mobile users watch vertical video without sound. Auto-captions are no longer optional accessibility features — they are the primary visual hook.

#### Subtitle Engineering Standard:
1. **Word-by-Word Highlighting**: Never show a 3-line paragraph on screen. Display 2 to 4 words maximum per caption card with active word pop/highlighting.
2. **Safe Margin Compliance**: Keep captions above the bottom 250px of a 9:16 frame to avoid overlap with platform UI buttons (likes, comments, share, sound disc).
3. **Color Coding Strategy**: Use high-contrast punchy colors (Yellow #FACC15 or Neon Green #22C55E) on key emotion words (e.g., "secret", "never", "doubled", "free").`,
    quiz: {
      question: "Why should vertical subtitles be positioned above the bottom 250 pixels in a 9:16 mobile canvas?",
      options: [
        "To comply with vertical resolution limits",
        "To prevent overlapping with TikTok/Reels user interface icons and caption overlays",
        "Because top sensors require higher brightness",
        "To make rendering faster on mobile GPUs"
      ],
      correctIdx: 1,
      explanation: "Platform UI controls (account handles, captions, like/comment buttons) occupy the lower third of mobile screens. Subtitles placed too low are obscured."
    },
    hasSimulator: "tool-matrix"
  },

  "av-script-architecture": {
    slug: "av-script-architecture",
    title: "Two-Column Script Blueprint: Timing, Voice & Visual Cues",
    xpReward: 75,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Dual-Column A/V Scripting Standard

#### Executive Framework
Amateur creators write a script as a block of text. Professional producers use the **Two-Column A/V format**: Left Column = Visual (Video), Right Column = Audio (Dialogue, SFX, Music).

#### Structural Anatomy of a 30-Second Commercial:
* **00:00 – 00:03 (The Hook)**:
  * *Visual*: Extreme close-up with abrupt motion or visual juxtaposition.
  * *Audio*: Direct contrarian question + cinematic impact riser SFX.
* **00:04 – 00:15 (The Agitation / Problem)**:
  * *Visual*: Fast-paced montage showing user friction or time-wasting manual work.
  * *Audio*: Conversational cadence outlining the pain point.
* **00:16 – 00:26 (The Breakthrough / Demonstration)**:
  * *Visual*: Sleek product UI interaction / cinematic reveal shot.
  * *Audio*: Clear explanation of the transformation.
* **00:27 – 00:30 (The Call-to-Action)**:
  * *Visual*: Crisp logo end card + clear text URL.
  * *Audio*: Singular, low-friction instruction.`,
    quiz: {
      question: "In a standard Two-Column A/V commercial script, what information resides in the Left Column?",
      options: [
        "Voiceover text and voice actor notes",
        "Visual descriptions, camera movements, framing, and on-screen graphics",
        "Music track licensing and royalty fees",
        "Client payment milestones"
      ],
      correctIdx: 1,
      explanation: "The left column contains all Visual instructions (camera angle, lighting, subject action, B-roll), while the right column handles Audio (dialogue, SFX, music)."
    },
    hasSimulator: "tool-matrix"
  },

  "gemini-prompting-scripts": {
    slug: "gemini-prompting-scripts",
    title: "Reverse-Engineering Creative Briefs with Gemini Prompts",
    xpReward: 85,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Structured Prompting for A/V Production in Google Gemini

#### Context Engineering for Video Creators
When prompting Gemini for video scripts, generic requests yield boring corporate cliches. You must supply:
1. **Target Audience Psychographics**: Who is watching, what do they fear, and what do they desire?
2. **Format Constraints**: 30 seconds total, maximum 65 spoken words (to allow pacing space).
3. **Structured Schema Output**: Explicitly request a markdown table with columns: \`Timecode\`, \`Shot Type\`, \`Visual Action\`, \`Voiceover Script\`, \`SFX & Music Cue\`.

#### Master Prompt Template:
\`\`\`markdown
You are an award-winning creative video director.
Write a 30-second high-conversion product commercial in two-column A/V format for [Product Name].
Tone: Cinematic, energetic, authoritative.
Constraints: Max 60 spoken words. Pacing must allow 2-second visual breathers.
Output: Markdown table with [Timecode | Camera Angle & Framing | Visual Action | Dialogue/VO | SFX].
\`\`\``,
    quiz: {
      question: "For a standard 30-second commercial script, what is the maximum recommended spoken word count to ensure proper visual breathing room?",
      options: ["120-140 words", "60-70 words", "20-30 words", "200 words"],
      correctIdx: 1,
      explanation: "Speaking at normal cadence takes about 2.5 words per second. A 30-second video needs pauses for visuals and sound effects, making 60-70 words optimal."
    },
    hasSimulator: "tool-matrix"
  },

  "voice-cloning-fidelity": {
    slug: "voice-cloning-fidelity",
    title: "Clean Audio Sampling, Noise Floor & Instant Voice Cloning",
    xpReward: 75,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### ElevenLabs High-Fidelity Voice Cloning Architecture

#### Principles of High-Clarity Voice Cloning
The quality of an AI voice clone depends entirely on the signal-to-noise ratio of your training audio.

#### Golden Rules for Training Samples:
1. **Zero Background Music or Echo**: Never upload audio with background reverb or faint music. The AI will bake that noise into every generation.
2. **Room Tone & Noise Gate**: Record in a carpeted room with soft furnishings. Apply a -45dB noise gate before feeding audio into ElevenLabs.
3. **Consistent Tone & Mic Distance**: Speak 4-6 inches from the microphone with a pop filter. Maintain dynamic vocal energy rather than a flat monotone.
4. **Parameter Tuning**:
   * *Stability*: 0.40 – 0.65 for natural emotional inflection. Higher than 0.75 sounds robotic.
   * *Clarity / Similarity*: 0.75 – 0.85 for close voice matching without distortion.
   * *Style Exaggeration*: 0.05 – 0.15 for subtle dramatic cadence.`,
    quiz: {
      question: "What happens if you set the 'Stability' slider in ElevenLabs above 0.85?",
      options: [
        "The voice becomes hyper-expressive and laughs naturally",
        "The voice becomes flatter and more monotonous/robotic",
        "The generation will crash the audio server",
        "The audio will be generated at 2x speed"
      ],
      correctIdx: 1,
      explanation: "High stability suppresses vocal variation and pitch inflection, producing a monotone, mechanical delivery. Keeping it between 0.45-0.65 yields human warmth."
    },
    hasSimulator: "tool-matrix"
  },

  "soul-id-anchoring": {
    slug: "soul-id-anchoring",
    title: "Anchor Faces & Character Continuity Across Multiple Generations",
    xpReward: 90,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Character Consistency with Higgsfield Soul ID

#### The Greatest AI Video Challenge
In traditional generative video, every generation creates a completely different face. Higgsfield's **Soul ID** technology allows creators to lock an identity across varied scenes, lighting angles, and emotional beats.

#### Soul ID Pipeline:
1. **Reference Ingestion**: Upload 3-5 high-resolution neutral and expressive reference images of the subject with clean lighting.
2. **Identity Tagging**: Assign an identity handle (e.g., \`@protagonist_maya\`) and reference this handle across all prompt prompts.
3. **Seed Locking & Camera Prompts**: Combine the Soul ID with explicit camera choreographies (e.g. "cinematic dolly zoom on @protagonist_maya looking up at the futuristic cityscape").
4. **Handoff Logic**: Use Higgsfield for the complex character scenes, then export to CapCut for pacing, transitions, and audio layering.`,
    quiz: {
      question: "What is the primary function of Higgsfield's Soul ID feature in generative video workflows?",
      options: [
        "Automatic background music synthesis",
        "Locking facial features and character identity across multiple generated camera shots",
        "Exporting videos directly to Instagram Reels",
        "Applying cinematic LUTs to CapCut timelines"
      ],
      correctIdx: 1,
      explanation: "Soul ID preserves character face and style consistency across disparate shots, solving the major flaw of random faces in generative video production."
    },
    hasSimulator: "tool-matrix"
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. ADVANCED PROFESSIONAL EXCEL (Messy Data Gym)
  // ═══════════════════════════════════════════════════════════════
  "excel-orientation": {
    slug: "excel-orientation",
    title: "Excel Course Orientation & Corporate Setup Guide",
    xpReward: 50,
    duration: "15m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Excel Course Orientation & Corporate Setup Guide

#### Executive Summary & Corporate Context
In investment banking, management consulting, and FMCG corporate analytics, financial modeling speed and precision dictate career velocity. This masterclass trains you to work mouse-free using industry-standard keyboard shortcut systems.

#### Core Setup Standards for Corporate Analysts:
1. **Gridlines Display**: Ensure Gridlines are enabled under \`View -> Show -> Gridlines\` for raw data, but hidden for executive presentation decks.
2. **Formula Auto-Calculation**: Set Calculation Options to \`Automatic\` under \`Formulas -> Calculation Options\`.
3. **Quick Access Toolbar (QAT)**: Customize the top bar with \`Save\`, \`Undo\`, \`Redo\`, \`Paste Special Values\`, and \`Font Color\`.

#### Best Practices Checklist:
* **Color Coding Standards**: Blue text = Hardcoded inputs, Black text = Formulas & calculations, Green text = Links to other sheets, Red text = External links/warnings.
* **Never Hardcode in Formulas**: Separate assumptions (inputs) into dedicated input cells rather than writing numbers inside formulas (e.g. use \`=A1*(1+B1)\` instead of \`=A1*1.05\`).`,
    quiz: {
      question: "According to financial modeling standards, what cell text color should be used for hardcoded input numbers?",
      options: ["Black font", "Blue font", "Green font", "Red font"],
      correctIdx: 1,
      explanation: "Standard corporate financial modeling guidelines mandate Blue font for hardcoded input values and Black font for calculated formulas."
    },
    hasSimulator: "messy-data"
  },

  "keyboard-shortcuts": {
    slug: "keyboard-shortcuts",
    title: "High-Frequency Executive Keyboard Shortcuts",
    xpReward: 70,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### High-Frequency Executive Keyboard Shortcuts

#### The Mouse-Free Productivity Philosophy
Top analysts work 3x faster by eliminating mouse dependency. Memorize these key combinations to navigate spreadsheets at elite speeds.

#### Essential Shortcut Cheat Sheet:
* **Navigation & Selection**:
  * \`Ctrl + Arrow Keys\`: Jump to the edge of the data region.
  * \`Ctrl + Shift + Arrow Keys\`: Select range to the edge of data.
  * \`Ctrl + Home / End\`: Jump to cell A1 or the last used cell.
* **Editing & Formatting**:
  * \`F4\`: Toggle absolute/relative cell references (\`$A$1\`, \`A$1\`, \`$A1\`, \`A1\`) OR repeat last action.
  * \`Ctrl + 1\`: Open Format Cells dialog box.
  * \`Alt + H + O + I\`: Auto-fit column widths.
  * \`Alt + = \`: AutoSum selected numbers.
  * \`Ctrl + Shift + 1\`: Format as Number (\`#,##0.00\`).
  * \`Ctrl + Shift + 4\`: Format as Currency (\`$#,##0.00\`).`,
    quiz: {
      question: "Which function key toggles cell reference locking (absolute vs relative, e.g. $A$1) inside the formula bar?",
      options: ["F2", "F4", "F8", "F12"],
      correctIdx: 1,
      explanation: "Pressing F4 while editing a cell reference cycles through absolute ($A$1), row-locked (A$1), column-locked ($A1), and relative (A1) modes."
    },
    hasSimulator: "messy-data"
  },

  "lookup-functions": {
    slug: "lookup-functions",
    title: "XLOOKUP Syntax & Advanced Array Mapping",
    xpReward: 80,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### XLOOKUP Syntax & Advanced Array Mapping

#### Executive Overview
Microsoft introduced \`XLOOKUP\` to solve the critical vulnerabilities of legacy \`VLOOKUP\` and replace multi-nested \`INDEX-MATCH\` functions.

#### Syntactical Signature:
\`\`\`excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
\`\`\`

#### Comparative Advantages:
1. **Leftward Lookups**: Searches left or right without requiring the lookup column to be the leftmost array column.
2. **Default Exact Match**: Defaults to exact match (\`match_mode = 0\`), eliminating accidental approximate matching errors.
3. **Native Error Handling**: Includes built-in \`[if_not_found]\` parameter, removing the need to wrap formulas in \`IFERROR()\`.
4. **Dynamic Array Return**: Returns an entire row or multi-column array when paired with multiple return columns.`,
    quiz: {
      question: "Which array parameter represents the target database column from which values are extracted in XLOOKUP?",
      options: ["lookup_value", "lookup_array", "return_array", "match_mode"],
      correctIdx: 2,
      explanation: "The return_array parameter defines the target dataset column or range containing the values to return."
    },
    hasSimulator: "messy-data"
  },

  "summary-functions": {
    slug: "summary-functions",
    title: "SUMIFS, COUNTIFS & Conditional Summaries",
    xpReward: 75,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### SUMIFS, COUNTIFS & Multi-Criteria Analytics

#### Corporate Application
Executive dashboards require aggregating metrics based on dynamic filters (e.g. Total Revenue for Region='North' AND Category='Electronics' AND Date >= Q1).

#### Formula Syntax Signatures:
* **SUMIFS**: \`=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)\`
* **COUNTIFS**: \`=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)\`

#### Key Syntactical Rule:
In \`SUMIFS\`, the \`sum_range\` comes **FIRST**, whereas in legacy single-criterion \`SUMIF\`, the sum range comes last. Always use \`SUMIFS\` for consistency.`,
    quiz: {
      question: "In the SUMIFS function, what is the position of the sum_range parameter?",
      options: [
        "The very first argument",
        "The very last argument",
        "Directly after criteria_range1",
        "Inside an array bracket"
      ],
      correctIdx: 0,
      explanation: "Unlike single-criterion SUMIF, SUMIFS requires sum_range as its first parameter before any criteria ranges are listed."
    },
    hasSimulator: "messy-data"
  },

  "unpivot-columns-cleaning": {
    slug: "unpivot-columns-cleaning",
    title: "Unpivoting Wide Tables & Standardizing Dirty Date Formats",
    xpReward: 90,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Unpivoting Data in Power Query & ETL Best Practices

#### The Wide vs. Tall Data Dilemma
Accounting and ERP systems frequently export reports in "human presentation" formats: Month names spread across 12 horizontal columns. You cannot build clean PivotTables from wide data.

#### The Unpivot Transformation:
1. Select the fixed descriptor columns (e.g. \`Account_ID\`, \`Branch\`, \`Category\`).
2. Right-click and choose **"Unpivot Other Columns"**.
3. Power Query instantly transforms 12 month columns into two tidy columns: \`Attribute\` (Month) and \`Value\` (Amount).
4. Rename headers and assign data types (\`Text\`, \`Currency\`).

#### M-Code Hygiene:
Always remove intermediate navigation steps to avoid broken query paths when monthly columns change.`,
    quiz: {
      question: "Why should you choose 'Unpivot Other Columns' rather than 'Unpivot Columns' in Power Query?",
      options: [
        "It renders columns in alphabetical order",
        "It automatically absorbs new future monthly columns added to the raw dataset without breaking the query",
        "It reduces RAM usage by 90%",
        "It converts dates to Unix timestamps"
      ],
      correctIdx: 1,
      explanation: "Selecting key identifier columns and clicking 'Unpivot Other Columns' ensures that when next month's data is added, Power Query automatically captures it without manual schema updates."
    },
    hasSimulator: "messy-data"
  },

  "dax-calculate-filter": {
    slug: "dax-calculate-filter",
    title: "CALCULATE: The Single Most Important DAX Function",
    xpReward: 95,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Power of CALCULATE in Power Pivot & DAX

#### Executive Overview
\`CALCULATE()\` is the engine of Power Pivot and Power BI. It is the ONLY function in DAX capable of modifying the filter context of a measure evaluation.

#### Syntactical Signature:
\`\`\`dax
Total_High_Margin_Sales := CALCULATE(
    SUM(Sales[Revenue]),
    Products[Margin_Percent] > 0.30,
    Geography[Region] = "Dhaka"
)
\`\`\`

#### Context Transition:
When wrapped inside \`CALCULATE\`, row context is automatically transitioned into an equivalent filter context. This enables row-by-row comparisons against grand totals.`,
    quiz: {
      question: "What is the unique capability of the CALCULATE function in DAX?",
      options: [
        "It speeds up CPU clock cycles in Excel",
        "It is the only DAX function that can alter or override filter context during evaluation",
        "It exports tables to SQL databases automatically",
        "It replaces the need for relationships in the data model"
      ],
      correctIdx: 1,
      explanation: "CALCULATE modifies the filter context of an expression, allowing analysts to compute specific segment KPIs (e.g. Sales where Region='Dhaka') regardless of what row or column slicers are selected."
    },
    hasSimulator: "messy-data"
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. PRESENTATION ENGINEERING (Export Quality Lab)
  // ═══════════════════════════════════════════════════════════════
  "gamma-prompt-structure": {
    slug: "gamma-prompt-structure",
    title: "Structuring Gamma Prompts from Raw Meeting Notes",
    xpReward: 75,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Rapid Slide Ideation with Gamma App

#### Moving from Text to Card Decks
Gamma AI excels at turning messy unformatted notes into modern, card-based web presentations in seconds. However, bad inputs yield generic buzzword cards.

#### Prompt Ingestion Format:
* **Role Directive**: "You are a McKinsey senior associate preparing a 7-card briefing."
* **Density Setting**: Set text density to **Condensed** rather than **Detailed** to prevent walls of text.
* **Layout Directives**: Request 3-column comparative cards for pros/cons and 2-column split cards for problem vs solution.`,
    quiz: {
      question: "Which text density setting in Gamma yields the cleanest executive-ready slide cards?",
      options: ["Detailed", "Condensed", "Narrative Essay", "Full Transcribe"],
      correctIdx: 1,
      explanation: "Selecting 'Condensed' forces Gamma to use bullet points, bolded lead words, and concise metrics rather than overflowing paragraphs."
    },
    hasSimulator: "export-lab"
  },

  "gamma-ppt-export-audit": {
    slug: "gamma-ppt-export-audit",
    title: "Exporting to PowerPoint: Font Substitution & Layout Fixes",
    xpReward: 85,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Export Quality Lab: Gamma to PowerPoint Translation

#### Critical Conversion Traps
When exporting from Gamma to Microsoft PowerPoint (.pptx), format corruption frequently occurs:
1. **Font Substitution**: Web fonts in Gamma (e.g. Satoshi, Inter) often revert to default Arial or Calibri on corporate Windows laptops unless installed locally.
2. **Text Box Overflow**: Card padding translates into rigid PowerPoint bounding boxes that clip descending letters (g, y, p).
3. **Shape Flattening**: Complex SVG gradients often flatten into low-res raster bitmaps.

#### 5-Minute Handoff Protocol:
* Replace missing fonts using \`Home -> Replace -> Replace Fonts\`.
* Reset Slide Master typography hierarchy to company standard.
* Verify 16:9 widescreen canvas alignment.`,
    quiz: {
      question: "What is the quickest way to fix missing substituted fonts across an entire converted PowerPoint presentation?",
      options: [
        "Click on every single text box manually and change the font",
        "Use 'Replace Fonts' under the Home tab to swap the font globally across all slides in one click",
        "Take screenshots of the web deck and paste them as images",
        "Reinstall Windows"
      ],
      correctIdx: 1,
      explanation: "PowerPoint's 'Replace Fonts' feature globally swaps any substituted or missing font with your approved corporate font across every slide simultaneously."
    },
    hasSimulator: "export-lab"
  },

  "pyramid-principle-storylines": {
    slug: "pyramid-principle-storylines",
    title: "The Pyramid Principle: Action Titles & Lead Messages",
    xpReward: 90,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Barbara Minto's Pyramid Principle in Executive Decks

#### Lead with the Conclusion
C-suite executives do not have time to sit through 20 minutes of buildup before hearing your recommendation. Start with the governing conclusion at the very top.

#### Slide Header Standards:
* **Bad (Category Header)**: *"Q3 Marketing Performance Overview"*
* **Good (Action Title)**: *"Marketing ROI Dropped 18% in Q3 Due to Rising Customer Acquisition Costs in Tier-2 Cities"*

#### Rule of Three (MECE):
Support your primary assertion with 3 mutually exclusive, collectively exhaustive pillars. If an executive leaves after viewing only the slide titles, they should still understand 100% of your business case.`,
    quiz: {
      question: "Which of the following slide titles strictly adheres to the Pyramid Principle action title standard?",
      options: [
        "Financial Analytics & Discussion",
        "Operations Update Q2",
        "Expanding into Regional Hubs Will Increase Net Margins by 4.2% by Q4",
        "Summary of Various Market Observations"
      ],
      correctIdx: 2,
      explanation: "An action title states the core takeaway, supporting metric, and timeline as a complete declarative sentence rather than a passive topical label."
    },
    hasSimulator: "export-lab"
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. AI FOR WORK, CAREER & BUSINESS (AI Verification Gym)
  // ═══════════════════════════════════════════════════════════════
  "wsci-prompt-framework": {
    slug: "wsci-prompt-framework",
    title: "The W-S-C-I Prompt Architecture for Flawless Output",
    xpReward: 75,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The W-S-C-I Prompt Engineering Framework

#### Context Engineering for Professionals
Vague prompts yield generic platitudes. The W-S-C-I architecture anchors the AI in corporate reality:
* **W (Who)**: Explicit professional persona and perspective (e.g., "Senior Supply Chain Auditor with 15 years experience").
* **S (Situation)**: Detailed background context, constraints, and operational environment.
* **C (Constraints)**: Negative constraints and rules (e.g. "Do not use buzzwords like 'synergy'. Limit to 250 words. Do not speculate if data is missing.").
* **I (Instructions & Format)**: Specific required output schema (e.g. "Generate a 3-column markdown table with Risk, Probability, and Mitigation Plan.").`,
    quiz: {
      question: "In the W-S-C-I framework, what does the 'C' represent?",
      options: ["Creativity level", "Constraints & negative boundaries", "Computation power", "Client credentials"],
      correctIdx: 1,
      explanation: "'C' stands for Constraints: the explicit negative rules, length limits, forbidden phrases, and boundary guidelines that keep the AI on track."
    },
    hasSimulator: "ai-verification"
  },

  "hallucination-mitigation": {
    slug: "hallucination-mitigation",
    title: "Spotting Hallucinations: Grounding Rules & Source Verification",
    xpReward: 85,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Detecting & Eliminating AI Hallucinations

#### Corporate Liability of Unchecked AI
LLMs predict the most statistically probable next token — they do not inherently know truth. Presenting fabricated numbers or fake legal citations to a client or manager can be career-ending.

#### The 3-Step Verification Protocol:
1. **Source Grounding**: Always supply the reference document and mandate: *"Answer ONLY based on the provided text. If the answer is not explicitly stated in the document, respond with 'DATA NOT FOUND IN SOURCE'."*
2. **Reverse Verification**: Ask the AI to cite the exact page number and verbatim quote supporting each factual claim.
3. **Explore → Port-It → Verify-It**: Never copy AI text directly into client deliverables. Cross-reference every metric with official ERP/reporting databases.`,
    quiz: {
      question: "Which system prompt directive best prevents an LLM from inventing facts when answering questions from a company report?",
      options: [
        "Be very smart and use all knowledge on the internet",
        "Answer ONLY using the provided text. If the information is not present, reply 'NOT IN SOURCE'",
        "Generate 10 possible theories about the company",
        "Make the tone sound extremely confident"
      ],
      correctIdx: 1,
      explanation: "Restricting the model to the provided text and explicitly instructing it to declare 'NOT IN SOURCE' dramatically cuts false positive hallucinations."
    },
    hasSimulator: "ai-verification"
  },

  "notebooklm-source-grounding": {
    slug: "notebooklm-source-grounding",
    title: "Document Forensics: Grounding Queries in 100-Page PDFs",
    xpReward: 85,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Google NotebookLM for Executive Research & Forensics

#### Zero-Hallucination Document Queries
NotebookLM is grounded strictly in your uploaded source materials (PDFs, docs, spreadsheets, web URLs). Every answer contains clickable in-text citation chips that link to the exact sentence in the original document.

#### Executive Use Cases:
* **Annual Report Audits**: Compare Q2 vs Q3 disclosures across two 100-page earnings releases simultaneously.
* **Contract Analysis**: Identify indemnification clauses, governing law jurisdictions, and termination penalties.
* **Audio Overviews**: Generate a 10-minute deep-dive discussion podcast summarizing complex industry whitepapers.`,
    quiz: {
      question: "What distinctive feature makes Google NotebookLM safer for corporate document analysis than standard chatbots?",
      options: [
        "It generates 3D animated graphs",
        "Every claim is grounded in uploaded source files with clickable citation chips referencing the original text",
        "It sends direct emails to team members",
        "It disables all internet firewalls"
      ],
      correctIdx: 1,
      explanation: "NotebookLM anchors its knowledge exclusively in your uploaded source files, backing every statement with traceable in-text citations."
    },
    hasSimulator: "ai-verification"
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. GRE PREPARATION (Error Log OS)
  // ═══════════════════════════════════════════════════════════════
  "gre-shorter-format-overview": {
    slug: "gre-shorter-format-overview",
    title: "The 1h 58m GRE Blueprint & Adaptive Scoring Rules",
    xpReward: 70,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Shorter GRE Blueprint (1h 58m) & Section-Adaptive Algorithm

#### Executive Test Overview
ETS officially shortened the GRE to **1 hour and 58 minutes**:
* **Analytical Writing**: 1 Essay (Analyze an Issue) — 30 minutes. (Argument essay completely eliminated).
* **Quantitative Reasoning**: 2 Sections (Section 1: 12 questions in 21m; Section 2: 15 questions in 26m) — Total 27 questions.
* **Verbal Reasoning**: 2 Sections (Section 1: 12 questions in 18m; Section 2: 15 questions in 23m) — Total 27 questions.
* **No Unscored Research Section**: Every section counts towards your score.

#### The Section-Adaptive Scoring Trap:
Your performance on **Section 1** determines the difficulty of **Section 2**:
* High accuracy on Section 1 unlocks the **Hard** second section (with a high score ceiling: 160-170).
* Low accuracy on Section 1 triggers the **Easy** second section (capping your score ceiling regardless of how well you do). Section 1 accuracy is paramount!`,
    quiz: {
      question: "Under the official shorter GRE format, how many questions are present in Quantitative Section 1?",
      options: ["20 questions", "12 questions", "25 questions", "15 questions"],
      correctIdx: 1,
      explanation: "In the shorter GRE format, Section 1 contains exactly 12 questions (21 minutes for Quant; 18 minutes for Verbal), and Section 2 contains 15 questions."
    },
    hasSimulator: "error-log"
  },

  "error-log-os-setup": {
    slug: "error-log-os-setup",
    title: "Configuring Your Error Log OS: 4 Root Cause Categories",
    xpReward: 80,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Error Log OS: Research-Backed Score Acceleration

#### Why Brute-Force Question Solving Fails
Cognitive research (Powers, 1983; Lee & Wai, 2023) proves that doing 1,000 practice questions without structured reflection yields negligible score gains. True improvement comes from error forensics.

#### The 4 Root Causes in Error Log OS:
1. **Content Gap (Knowledge)**: You did not know the underlying mathematical formula or vocabulary definition.
2. **Trap Answer (Disguise)**: You misread the question stem (e.g. found $x$ instead of $2x+1$, or fell for an extreme RC qualifier).
3. **Careless Arithmetic (Execution)**: You knew the concept, but made a sign error ($-(-3) = -3$) or division mistake under time pressure.
4. **Pacing Panic (Strategy)**: You spent 3.5 minutes on one question and had to rush through 4 questions at the end.`,
    quiz: {
      question: "If you understood the geometric theorem of a problem but accidentally answered for the radius instead of the requested diameter, what error category applies?",
      options: ["Content Gap", "Trap Answer / Misread Stem", "Careless Arithmetic", "Pacing Panic"],
      correctIdx: 1,
      explanation: "Failing to answer the exact quantity requested by the question stem (radius vs diameter) is classified under Trap Answer / Misread Stem in the Error Log OS."
    },
    hasSimulator: "error-log"
  },

  "divisibility-remainders": {
    slug: "divisibility-remainders",
    title: "Factors, Multiples, and Remainder Theorem",
    xpReward: 60,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Factors, Multiples & Remainder Theorem

#### Executive Overview & Quantitative Strategy
Quantitative reasoning evaluates your ability to recognize structural number properties rather than perform brute-force arithmetic.

#### Core Mathematical Theorems:
1. **The Quotient-Remainder Formula**: For any integer $n$ divided by positive divisor $d$:
   $$n = q \\cdot d + r \\quad \\text{where } 0 \\le r < d$$
2. **Remainder Addition Property**:
   $$\\text{Rem}\\left(\\frac{A + B}{d}\\right) = \\text{Rem}\\left(\\frac{\\text{Rem}(A/d) + \\text{Rem}(B/d)}{d}\\right)$$
3. **Prime Factorization Rule**: The total number of factors of $N = p_1^{a} \\cdot p_2^{b} \\cdot p_3^{c}$ is given by:
   $$\\text{Total Factors} = (a+1)(b+1)(c+1)$$`,
    quiz: {
      question: "If integer x is divided by 9, the remainder is 5. What is the remainder when 3x + 4 is divided by 9?",
      options: ["1", "3", "4", "7"],
      correctIdx: 0,
      explanation: "Let x = 9k + 5. Then 3x + 4 = 3(9k + 5) + 4 = 27k + 15 + 4 = 27k + 19 = 27k + 18 + 1 = 9(3k + 2) + 1. The remainder is 1."
    },
    hasSimulator: "error-log"
  }
};

export function getLessonBySlug(slug: string): LessonDetail | null {
  return DYNAMIC_LESSONS[slug] || null;
}
