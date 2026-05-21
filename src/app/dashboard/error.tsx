"use client";

import { Button } from "@/components/ui/Button";

export default function DashboardError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-10 text-center">
      <h2 className="font-semibold">Dashboard error</h2>
      <Button className="mt-4" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
