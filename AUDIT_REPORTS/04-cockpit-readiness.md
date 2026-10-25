# 🏛️ CAREERINSYT — FORENSIC AUDIT REPORT
## Artifact 04: Career Cockpit, Readiness Index Engine, Daily Quests & Competency Calibration

---

### Audit Metadata
- **Artifact**: `04-cockpit-readiness.md`
- **Scope**: Cockpit Command Center (`components/dashboard/cockpit-command-center.tsx`), Readiness Index Engine (`lib/assessment/readiness-index.ts`), Daily Quest Engine, Streaks, Velocity Heatmaps, and Skill Gap Diagnostics.
- **Auditor Role**: Principal Product Strategist & Psychometric Assessment Auditor
- **Status**: Complete Forensic Discovery

---

## 1. COCKPIT ARCHITECTURE & READINESS FORMULATION

The Career Cockpit is intended to function as the central flight deck for candidate employability:

$$\text{Readiness Index} = 0.25(\text{Cognitive}) + 0.25(\text{Technical}) + 0.20(\text{Case}) + 0.15(\text{Communication}) + 0.15(\text{Interview})$$

Per **Non-Negotiable Axiom #2 (Zero-Fabrication Policy)**:
> *"Do not create fake partner logos, fake recruiter endorsements, fake job circulars, fabricated readiness scores, or synthetic user completion badges. If fewer than 2 diagnostic dimensions are completed, state: 'Readiness assessment incomplete — complete diagnostics & capstones to calibrate'."*

---

## 2. FORENSIC AUDIT FINDINGS: COCKPIT & READINESS

---

### Finding COCK-01: Hardcoded Component Scores in `cockpit-command-center.tsx` Violates the Zero-Fabrication Axiom
- **Severity**: **P1 — High**
- **Confidence**: Confirmed
- **Type**: Product Integrity & Severe Calculation Defect
- **Affected Route**: `/dashboard`, `/cockpit`
- **Exact File**: [`components/dashboard/cockpit-command-center.tsx`](file:///d:/Insyt/components/dashboard/cockpit-command-center.tsx#L24-L39)
  ```typescript
  // Lines 24-39 in CockpitCommandCenter
  const evaluatedScores: ReadinessComponentScores = useMemo(() => {
    const cognitiveScore = (state.completedMockTests || []).length > 0 ? 76 : null;
    const hasTechnicalCourse = state.courseProgress.some(c => c.progress > 0);
    const technicalScore = hasTechnicalCourse ? 72 : null;
    const caseScore = state.completedChallengeIds.length > 0 ? 68 : null;
    const communicationScore = null;
    const interviewScore = 84; // <-- HARDCODED TO 84 FOR ALL USERS!

    return {
      cognitive: cognitiveScore,
      technical: technicalScore,
      caseSolving: caseScore,
      communication: communicationScore,
      interview: interviewScore,
    };
  }, [state]);
  ```
- **Intended Behavior**: The Readiness Index must strictly compute actual scores achieved on proctored diagnostic assessments, graded mock tests, verified case studies, and proctored AI interview scorecards. If a dimension has not been completed by the candidate, its value must be `null`.
- **Actual Observed Behavior**:
  1. **Fabricated Interview Score**: `interviewScore: 84` is hardcoded as an immutable constant. Every user on the platform—including a brand new user who just created an account 5 seconds ago—receives an Interview Readiness score of 84/100!
  2. **Static Synthetic Scores**:
     - If the user takes ANY mock test (even scoring 10%), `cognitiveScore` is set to `76`.
     - If the user opens ANY technical course and achieves 1% progress, `technicalScore` is set to `72`.
     - If the user completes any challenge, `caseScore` is set to `68`.
  3. **Premature Calibration Bypass**: Because `interviewScore: 84` is always active, as soon as a new user starts reading lesson 1 of any course (`progress > 0`), `validDimensions.length` becomes 2 (`interview` + `technical`). The incomplete safeguard is bypassed, and the Cockpit announces:
     *"Calibrated Executive Readiness: 78%"* with confidence `"medium"`.
- **Evidence**: Inspected source code in `cockpit-command-center.tsx:24-39`. The values `84`, `76`, `72`, `68` are hardcoded numeric literals with zero reference to actual candidate test results or rubric evaluations.
- **Reproduction Steps**:
  1. Create a fresh candidate account.
  2. Notice `interview` is already evaluated at 84% in the diagnostic breakdown.
  3. Enroll in Excel modeling course and click "Start Lesson 1".
  4. Return to Cockpit.
  5. The Readiness score calibrates at ~78%, asserting the candidate is ready for FMCG MTO roles without taking a single assessment.
- **User or Business Impact**: Massive credibility failure for an Employability OS. Recruiters who discover that every candidate has a pre-baked 84% interview score will reject CAREERINSYT credentials as fraudulent.
- **Exploitability / Failure Likelihood**: 100% (Happens by default on every user profile).
- **Recommended Remediation**:
  1. Remove hardcoded scores. Default all 5 dimensions to `null`.
  2. Derive `cognitive` from the mean percentage score of completed tests in `state.completedMockTests`.
  3. Derive `technical` from capstone grades or sandbox verification scores.
  4. Derive `interview` strictly from the candidate’s latest proctored AI interview scorecard in `mock-interviews`.
  5. Enforce strict `isComplete: false` until at least 2 real assessments are graded.
- **Estimated Effort**: M (3–4 hours).

---

### Finding COCK-02: 168-Day Activity Heatmap Hardcodes 23 Weeks of Inactivity
- **Severity**: **P2 — Medium**
- **Confidence**: Confirmed
- **Type**: UX & Product Signal Inconsistency
- **Affected Route**: `/dashboard`
- **Exact File**: [`app/(dashboard)/dashboard/page.tsx`](file:///d:/Insyt/app/(dashboard)/dashboard/page.tsx#L39-L55)
  ```typescript
  // Lines 39-55
  const totalDaysInGrid = 168; // 24 Weeks
  const today = new Date();

  const heatmapGrid = Array.from({ length: totalDaysInGrid }).map((_, idx) => {
    const dayOffset = totalDaysInGrid - 1 - idx;
    ...
    const isRecentWeek = dayOffset < 7;
    const weeklyMins = isRecentWeek ? (state.weeklyActivity[dayOfWeek] || 0) : 0;
    ...
    return { dateStr, level: activityLevel, totalXp: 0, mins: weeklyMins };
  });
  ```
- **Intended Behavior**: The activity heatmap (similar to GitHub's contribution graph) should render historic learning consistency over the past 24 weeks based on persistent daily study logs.
- **Actual Observed Behavior**: `state.weeklyActivity` is a fixed 7-element array storing only the current week (Monday to Sunday). For all prior 161 days (`dayOffset >= 7`), `weeklyMins` is hardcoded to `0`. The candidate is presented with a 24-week grid where 23 weeks are permanently gray and empty, visually implying candidate neglect or platform data loss.
- **User or Business Impact**: Demotivates active users whose past learning history appears wiped out every Monday morning when the week resets.
- **Recommended Remediation**: Store historical daily check-ins as an append-only map (`Record<string, number>` keyed by `YYYY-MM-DD`) in Appwrite profile preferences or local storage, rather than a rolling 7-day array.
- **Estimated Effort**: M (2–3 hours).

---

### Finding COCK-03: Daily Quest Engine Can Be Cleared Without Performing Underlying Tasks
- **Severity**: **P2 — Medium**
- **Confidence**: Confirmed
- **Type**: Functional / Game Economy Integrity
- **Affected File**: `components/dashboard/daily-quest-engine.tsx`
- **Intended Behavior**: Daily quest rewards (XP, streak preservation, vouchers) must require verification that the required action was actually performed (e.g. running a Python script, completing a drill, or submitting an interview answer).
- **Actual Observed Behavior**: Checkbox toggles in the Daily Quest checklist invoke `completeChecklistTask(taskId, title)` on click, immediately awarding +50 XP and streak points without checking if the associated task URL was visited or completed. A candidate can clear all 5 daily quests in 3 seconds by clicking the checkboxes.
- **User or Business Impact**: Devalues XP rewards, streak rankings, and marketplace gamification.
- **Recommended Remediation**: Link task completion to state event listeners (e.g. `onTestComplete`, `onLessonComplete`) and disable manual checkbox toggles for technical assessment tasks.
- **Estimated Effort**: S (1.5 hours).
