import React from "react";
import { PHASES } from "@/lib/mockData";

const PHASE_STYLES = {
  1: "bg-phase-1/10 text-phase-1 border-phase-1/20",
  2: "bg-phase-2/10 text-phase-2 border-phase-2/20",
  3: "bg-phase-3/10 text-phase-3 border-phase-3/20",
  4: "bg-phase-4/10 text-phase-4 border-phase-4/20",
  5: "bg-phase-5/10 text-phase-5 border-phase-5/20",
};

export default function PhaseBadge({ phase, short = false }) {
  const phaseData = PHASES.find((p) => p.id === phase);
  if (!phaseData) return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${PHASE_STYLES[phase]}`}
    >
      {short ? phaseData.short : phaseData.name}
    </span>
  );
}