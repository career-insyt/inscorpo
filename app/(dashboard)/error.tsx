"use client";

import { useEffect } from "react";
import { Insyt500View } from "@/components/errors/custom-error-views";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[INSYT Dashboard Error Boundary]", error);
  }, [error]);

  return <Insyt500View error={error} reset={reset} />;
}
