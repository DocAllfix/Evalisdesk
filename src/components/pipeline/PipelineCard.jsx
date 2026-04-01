import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Calendar, MessageSquare, Copy } from "lucide-react";
import UrgencyBadge from "@/components/shared/UrgencyBadge";

export default function PipelineCard({ pratica, phaseColor }) {
  const isMissingDocs = pratica.phase === 4 && !pratica.documents.documentsReceived;

  return (
    <Link
      to={`/pratiche/${pratica.id}`}
      className="block bg-card rounded-lg border border-border hover:shadow-md hover:border-border/80 transition-all duration-150 group overflow-hidden"
    >
      {/* Left colored accent bar */}
      <div className="flex">
        <div className={`w-1 shrink-0 ${phaseColor}`} />
        <div className="flex-1 p-3">
          {/* Client name */}
          <p className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors truncate mb-2">
            {pratica.clientName}
          </p>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {pratica.norms.map((n) => (
              <span key={n} className="text-[11px] bg-muted/80 px-1.5 py-0.5 rounded text-muted-foreground font-medium">
                {n}
              </span>
            ))}
            <span className="text-[11px] bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground">
              {pratica.cycle}
            </span>
          </div>

          {/* Deadline + urgency */}
          {pratica.deadline && (
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <UrgencyBadge deadline={pratica.deadline} />
            </div>
          )}

          {/* Missing docs warning */}
          {isMissingDocs && (
            <div className="flex items-center gap-1.5 mb-2 px-2 py-1 rounded bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="w-3 h-3 text-destructive shrink-0" />
              <span className="text-[11px] font-medium text-destructive">Doc. mancanti</span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[9px] font-bold text-primary-foreground">{pratica.assignedTo.initials}</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <MessageSquare className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}