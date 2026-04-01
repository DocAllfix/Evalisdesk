import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { PRATICHE, getDaysRemaining, getUrgencyLevel } from "@/lib/mockData";
import StatsCard from "@/components/shared/StatsCard";
import PhaseBadge from "@/components/shared/PhaseBadge";
import UrgencyBadge from "@/components/shared/UrgencyBadge";
import DocumentChecklist from "@/components/shared/DocumentChecklist";

export default function Scadenze() {
  const [pratiche, setPratiche] = useState(PRATICHE.filter((p) => !p.completed));
  const active = pratiche;

  const handleDocToggle = (praticaId, key, newVal) => {
    setPratiche((prev) =>
      prev.map((p) => p.id === praticaId ? { ...p, documents: { ...p.documents, [key]: newVal } } : p)
    );
  };
  const criticalCount = active.filter((p) => getDaysRemaining(p.deadline) <= 15).length;
  const warningCount = active.filter((p) => {
    const d = getDaysRemaining(p.deadline);
    return d > 15 && d <= 45;
  }).length;
  const okCount = active.filter((p) => getDaysRemaining(p.deadline) > 45).length;

  const sorted = [...active].sort((a, b) => getDaysRemaining(a.deadline) - getDaysRemaining(b.deadline));

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Critiche (< 15 giorni)"
          value={criticalCount}
          icon={AlertTriangle}
          color="bg-destructive"
        />
        <StatsCard
          title="Attenzione (15–45 giorni)"
          value={warningCount}
          icon={Clock}
          color="bg-warning"
        />
        <StatsCard
          title="In Regola (> 45 giorni)"
          value={okCount}
          icon={CheckCircle}
          color="bg-success"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Urgenza</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Norme</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Ciclo</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Fase</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Documenti</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Scadenza</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => {
                const days = getDaysRemaining(p.deadline);
                const level = getUrgencyLevel(days);
                return (
                  <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        level === "critical" ? "bg-destructive" : level === "warning" ? "bg-warning" : "bg-success"
                      }`} />
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium text-foreground">{p.clientName}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1 flex-wrap">
                        {p.norms.map((n) => (
                          <span key={n} className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">{n}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-muted-foreground">{p.cycle}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <PhaseBadge phase={p.phase} short />
                    </td>
                    <td className="px-5 py-3.5">
                      <DocumentChecklist documents={p.documents} compact interactive onToggle={(key, val) => handleDocToggle(p.id, key, val)} />
                    </td>
                    <td className="px-5 py-3.5">
                      <UrgencyBadge deadline={p.deadline} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to={`/pratiche/${p.id}`}
                        className="text-primary hover:text-primary/80 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}