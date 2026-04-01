import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, AlertTriangle, Sparkles } from "lucide-react";
import UrgencyBadge from "@/components/shared/UrgencyBadge";

export default function PipelineCard({ pratica }) {
  const isMissingDocs = pratica.phase === 4 && !pratica.documents.documentsReceived;

  return (
    <Link
      to={`/pratiche/${pratica.id}`}
      className={`block bg-card rounded-xl border p-4 hover:shadow-md transition-all duration-200 group ${
        isMissingDocs ? "border-l-[3px] border-l-destructive border-t-border border-r-border border-b-border" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {pratica.clientName}
        </h4>
        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {pratica.norms.map((n) => (
          <span key={n} className="text-[11px] bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">
            {n}
          </span>
        ))}
        {pratica.norms.length > 1 && (
          <span className="text-[11px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-md font-medium flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            Integrato
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{pratica.cycle}</span>
        <UrgencyBadge deadline={pratica.deadline} />
      </div>

      {isMissingDocs && (
        <div className="flex items-center gap-1.5 mt-3 px-2 py-1.5 rounded-md bg-destructive/5 border border-destructive/10">
          <AlertTriangle className="w-3 h-3 text-destructive" />
          <span className="text-[11px] font-medium text-destructive">Documenti mancanti</span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-[9px] font-semibold text-primary">{pratica.assignedTo.initials}</span>
        </div>
        <span className="text-xs text-muted-foreground">{pratica.assignedTo.name.split(" ")[0]}</span>
      </div>
    </Link>
  );
}