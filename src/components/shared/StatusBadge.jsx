import React from "react";

// Maps phase numbers to monday-style status labels and colors
const PHASE_STATUS = {
  1: { label: "Contratto", bg: "bg-phase-1", text: "text-white" },
  2: { label: "Programmazione", bg: "bg-phase-2", text: "text-white" },
  3: { label: "Proforma", bg: "bg-phase-3", text: "text-white" },
  4: { label: "Elaborazione", bg: "bg-phase-4", text: "text-white" },
  5: { label: "Firme", bg: "bg-phase-5", text: "text-white" },
};

export default function StatusBadge({ phase, label, className = "" }) {
  const config = PHASE_STATUS[phase] || { label: label || "—", bg: "bg-muted", text: "text-muted-foreground" };
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded text-xs font-semibold tracking-wide ${config.bg} ${config.text} ${className}`}
    >
      {label || config.label}
    </span>
  );
}