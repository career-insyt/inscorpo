"use client";

import { useEffect } from "react";
import { Insyt500View } from "@/components/errors/custom-error-views";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[INSYT Root Error Boundary]", error);
  }, [error]);

  return <Insyt500View error={error} reset={reset} />;
}
