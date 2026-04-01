import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { PRATICHE, getDaysRemaining } from "@/lib/mockData";
import PhaseBadge from "@/components/shared/PhaseBadge";
import UrgencyBadge from "@/components/shared/UrgencyBadge";

export default function DeadlinesTable() {
  const sorted = [...PRATICHE]
    .filter((p) => !p.completed)
    .sort((a, b) => getDaysRemaining(a.deadline) - getDaysRemaining(b.deadline))
    .slice(0, 5);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Scadenze Urgenti</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Cliente</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Norma</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Fase</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Scadenza</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3">
                  <span className="text-sm font-medium text-foreground">{p.clientName}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-sm text-muted-foreground">{p.norms.join(", ")}</span>
                </td>
                <td className="px-5 py-3">
                  <PhaseBadge phase={p.phase} short />
                </td>
                <td className="px-5 py-3">
                  <UrgencyBadge deadline={p.deadline} />
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    to={`/pratiche/${p.id}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}