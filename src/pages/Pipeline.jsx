import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PHASES, PRATICHE, TEAM } from "@/lib/mockData";
import PipelineCard from "@/components/pipeline/PipelineCard";

const COL_HEADER_COLORS = {
  1: "bg-phase-1",
  2: "bg-phase-2",
  3: "bg-phase-3",
  4: "bg-phase-4",
  5: "bg-phase-5",
};

export default function Pipeline() {
  const [normFilter, setNormFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const allNorms = [...new Set(PRATICHE.flatMap((p) => p.norms))].sort();

  const filtered = PRATICHE.filter((p) => {
    if (p.completed) return false;
    if (normFilter !== "all" && !p.norms.includes(normFilter)) return false;
    if (assigneeFilter !== "all" && p.assignedTo.id !== Number(assigneeFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={normFilter} onValueChange={setNormFilter}>
          <SelectTrigger className="w-40 bg-card border-border">
            <SelectValue placeholder="Norma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le norme</SelectItem>
            {allNorms.map((n) => (
              <SelectItem key={n} value={n}>{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger className="w-44 bg-card border-border">
            <SelectValue placeholder="Assegnatario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti</SelectItem>
            {TEAM.map((t) => (
              <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PHASES.map((phase) => {
          const cards = filtered.filter((p) => p.phase === phase.id);
          return (
            <div key={phase.id} className="min-w-[280px] w-[280px] shrink-0">
              {/* Column Header */}
              <div className="flex items-center gap-2.5 mb-4 px-1">
                <div className={`w-2.5 h-2.5 rounded-full ${COL_HEADER_COLORS[phase.id]}`} />
                <h3 className="text-sm font-semibold text-foreground">{phase.name}</h3>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">
                  {cards.length}
                </span>
              </div>
              {/* Column Body */}
              <div className="space-y-3 min-h-[200px] bg-muted/30 rounded-xl p-3 border border-border/50">
                {cards.map((p) => (
                  <PipelineCard key={p.id} pratica={p} />
                ))}
                {cards.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
                    Nessuna pratica
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}