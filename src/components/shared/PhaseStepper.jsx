import React from "react";
import { Check } from "lucide-react";
import { PHASES } from "@/lib/mockData";

const STEP_COLORS = {
  1: "bg-phase-1",
  2: "bg-phase-2",
  3: "bg-phase-3",
  4: "bg-phase-4",
  5: "bg-phase-5",
};

const STEP_RING = {
  1: "ring-phase-1/30",
  2: "ring-phase-2/30",
  3: "ring-phase-3/30",
  4: "ring-phase-4/30",
  5: "ring-phase-5/30",
};

export default function PhaseStepper({ currentPhase }) {
  return (
    <div className="flex items-center w-full">
      {PHASES.map((phase, idx) => {
        const isCompleted = phase.id < currentPhase;
        const isCurrent = phase.id === currentPhase;
        const isFuture = phase.id > currentPhase;

        return (
          <React.Fragment key={phase.id}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? `${STEP_COLORS[phase.id]} text-white`
                    : isCurrent
                    ? `${STEP_COLORS[phase.id]} text-white ring-4 ${STEP_RING[phase.id]}`
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : phase.id}
              </div>
              <span
                className={`text-xs font-medium text-center whitespace-nowrap ${
                  isCurrent ? "text-foreground" : isFuture ? "text-muted-foreground" : "text-muted-foreground"
                }`}
              >
                {phase.short}
              </span>
            </div>
            {idx < PHASES.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${
                  phase.id < currentPhase ? STEP_COLORS[phase.id] : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}