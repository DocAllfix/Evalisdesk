import React from "react";
import { PHASES, PRATICHE } from "@/lib/mockData";

const BAR_COLORS = {
  1: "bg-phase-1",
  2: "bg-phase-2",
  3: "bg-phase-3",
  4: "bg-phase-4",
  5: "bg-phase-5",
};

export default function PhaseDistribution() {
  const phaseCounts = PHASES.map((phase) => ({
    ...phase,
    count: PRATICHE.filter((p) => p.phase === phase.id && !p.completed).length,
  }));

  const maxCount = Math.max(...phaseCounts.map((p) => p.count), 1);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Distribuzione Fasi</h3>
      </div>
      <div className="p-5 space-y-4">
        {phaseCounts.map((phase) => (
          <div key={phase.id} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{phase.short}</span>
              <span className="text-sm font-semibold text-foreground">{phase.count}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${BAR_COLORS[phase.id]} transition-all duration-700 ease-out`}
                style={{ width: `${(phase.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}