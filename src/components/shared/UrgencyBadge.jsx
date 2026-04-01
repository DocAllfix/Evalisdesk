import React from "react";
import { getDaysRemaining, getUrgencyLevel } from "@/lib/mockData";

const URGENCY_STYLES = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  ok: "bg-success/10 text-success border-success/20",
};

export default function UrgencyBadge({ deadline }) {
  const days = getDaysRemaining(deadline);
  const level = getUrgencyLevel(days);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${URGENCY_STYLES[level]}`}
    >
      {days <= 0 ? "Scaduta" : `${days}g`}
    </span>
  );
}