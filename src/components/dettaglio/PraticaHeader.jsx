import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhaseBadge from "@/components/shared/PhaseBadge";
import { PHASES } from "@/lib/mockData";

export default function PraticaHeader({ pratica }) {
  const currentPhase = PHASES.find((p) => p.id === pratica.phase);
  const nextPhase = PHASES.find((p) => p.id === pratica.phase + 1);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Link to="/pratiche" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-sm text-muted-foreground">Pratiche</span>
        <ChevronRight className="w-3 h-3 text-muted-foreground" />
        <span className="text-sm text-foreground font-medium">{pratica.id}</span>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-semibold text-foreground">{pratica.clientName}</h2>
            <PhaseBadge phase={pratica.phase} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {pratica.norms.map((n) => (
              <span key={n} className="text-xs bg-muted px-2.5 py-1 rounded-md text-muted-foreground font-medium">{n}</span>
            ))}
            {pratica.norms.length > 1 && (
              <span className="text-xs bg-secondary/10 text-secondary px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Audit Integrato
              </span>
            )}
            <span className="text-xs text-muted-foreground">· {pratica.cycle}</span>
          </div>
        </div>
        {nextPhase && (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            Avanza a {nextPhase.short}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}