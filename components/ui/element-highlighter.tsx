"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ElementHighlighterInner() {
  const searchParams = useSearchParams();
  const highlightKey = searchParams.get("highlight");

  useEffect(() => {
    if (!highlightKey) return;

    // Wait briefly for hydration & target components to settle in DOM
    const timer = setTimeout(() => {
      // Find element by id, name, or data-highlight attribute
      const target =
        document.getElementById(highlightKey) ||
        document.querySelector(`[data-highlight="${highlightKey}"]`) ||
        document.querySelector(`[name="${highlightKey}"]`);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add hyper-glow animated highlight class
        target.classList.add("highlight-target-glow");

        const clearGlowTimer = setTimeout(() => {
          target.classList.remove("highlight-target-glow");
        }, 4000);

        return () => clearTimeout(clearGlowTimer);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [highlightKey, searchParams]);

  return null;
}

export function ElementHighlighter() {
  return (
    <Suspense fallback={null}>
      <ElementHighlighterInner />
    </Suspense>
  );
}
