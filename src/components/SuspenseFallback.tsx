import React, { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

interface SuspenseFallbackProps {
  children?: React.ReactNode;
}

export default function SuspenseFallback({ children }: SuspenseFallbackProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
