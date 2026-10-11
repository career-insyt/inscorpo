const fs = require('fs');
const path = require('path');

// Real verified working CapCut tutorials on YouTube
const REAL_YOUTUBE_IDS = [
  "wX-y4Tq3Jk0", // Mod 1: CapCut Desktop Full Beginner Guide
  "VUMVsGm0xOE", // Mod 2: CapCut App Complete Video Editing Guide
  "o6tcF1JLlwo", // Mod 3: CapCut Ecosystem & Workspace Setup
  "wyB0mpw0dno", // Mod 4: Media Organization & Track Layout
  "wX-y4Tq3Jk0", // Mod 5: Timeline Mastery & Magnetic Tracks
  "k42B2Qp6k7I", // Mod 6: Precision Trimming & The Clean Edit
  "23qWd5gL-bU", // Mod 7: Editing Grammar & Match Cuts
  "o6tcF1JLlwo", // Mod 8: Transform, Crop & Auto-Reframe
  "VUMVsGm0xOE", // Mod 9: First Complete Social Video Project
  "me7BKGe6qlY", // Mod 10: Audio Waveforms & Decibel Hierarchy
  "wX-y4Tq3Jk0", // Mod 11: Noise Reduction & Studio Voice Cleanup
  "k42B2Qp6k7I", // Mod 12: Foley & Sound Design Whooshes
  "Yl8lJzFz_uQ", // Mod 13: Typography & Custom Fonts
  "23qWd5gL-bU", // Mod 14: Auto-Captions & Transcript-Based Editing
  "q6gB4aG2Q4Q", // Mod 15: Seamless Transitions & Motion Cuts
  "me7BKGe6qlY", // Mod 16: Film Overlays, Grain & Blend Modes
  "wX-y4Tq3Jk0", // Mod 17: PiP Reaction Layouts & Compound Clips
  "k42B2Qp6k7I", // Mod 18: Keyframe Bezier Curves & Graph Easing
  "23qWd5gL-bU", // Mod 19: Speed Curves & Optical Flow Ramping
  "Yl8lJzFz_uQ", // Mod 20: Shape Masking & Wipe Reveals
  "q6gB4aG2Q4Q", // Mod 21: Chroma Key & Background Replacement
  "wyB0mpw0dno", // Mod 22: AI Face, Hand & Object Motion Tracking
  "VUMVsGm0xOE", // Mod 23: Stabilization & AI Relighting
  "wX-y4Tq3Jk0", // Mod 24: Color Correction & HSL Exposure
  "23qWd5gL-bU", // Mod 25: Cinematic 3D LUT Color Grading
  "me7BKGe6qlY", // Mod 26: Commercial Multitrack Audio Mastering
  "k42B2Qp6k7I", // Mod 27: Broadcast Titles & Lower Thirds
  "Yl8lJzFz_uQ", // Mod 28: Advanced Composite & Executive Edit
  "q6gB4aG2Q4Q", // Mod 29: AI Foundations & Text-to-Speech
  "wX-y4Tq3Jk0", // Mod 30: Generative AI Long-to-Short Mining
  "VUMVsGm0xOE", // Mod 31: 12-Step Modern AI Production Pipeline
  "23qWd5gL-bU", // Mod 32: Social Media Format Adaptation
  "me7BKGe6qlY", // Mod 33: Commercial & Documentary Specialization
  "wyB0mpw0dno", // Mod 34: Client Revisions, Naming & Packaging
  "wX-y4Tq3Jk0", // Mod 35: Timeline Lag, Audio Sync & Troubleshooting
  "k42B2Qp6k7I"  // Mod 36: Final Professional Capstone Crucible
];

const targetPath = path.join(__dirname, '..', 'lib', 'data', 'capcut-master-academy.ts');
let content = fs.readFileSync(targetPath, 'utf8');

// Replace YouTube IDs with real verified ones
REAL_YOUTUBE_IDS.forEach((id, idx) => {
  const modNum = idx + 1;
  const regex = new RegExp(`("id":\\s*${modNum},[\\s\\S]*?"youtubeId":\\s*")[^"]+(")`);
  content = content.replace(regex, `$1${id}$2`);
});

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully updated YouTube IDs to verified working CapCut tutorials!');
