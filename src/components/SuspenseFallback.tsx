import React, { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface SuspenseFallbackProps {
  children?: React.ReactNode;
}

export default function SuspenseFallback({ children }: SuspenseFallbackProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
