import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PHASES, PRATICHE, TEAM } from "@/lib/mockData";
import PipelineCard from "@/components/pipeline/PipelineCard";

const COL_BG = {
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
    <div className="space-y-4 h-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Cerca..." className="pl-8 h-8 bg-muted/40 border-border/60 text-sm w-40" />
        </div>
        <Select value={normFilter} onValueChange={setNormFilter}>
          <SelectTrigger className="h-8 px-3 bg-transparent border-border/60 text-sm w-auto gap-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <SelectValue placeholder="Norma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le norme</SelectItem>
            {allNorms.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger className="h-8 px-3 bg-transparent border-border/60 text-sm w-auto gap-1.5">
            <SelectValue placeholder="Persona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti</SelectItem>
            {TEAM.map((t) => (<SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-6">
        {PHASES.map((phase) => {
          const cards = filtered.filter((p) => p.phase === phase.id);
          return (
            <div key={phase.id} className="min-w-[260px] w-[260px] shrink-0 flex flex-col">
              {/* Column Header — solid colored bar like monday */}
              <div className={`rounded-t-xl px-4 py-2.5 flex items-center gap-2 ${COL_BG[phase.id]}`}>
                <h3 className="text-sm font-semibold text-white flex-1 truncate">{phase.name}</h3>
                <span className="text-xs font-bold text-white/80 bg-black/20 px-2 py-0.5 rounded-full">
                  {cards.length}
                </span>
              </div>
              {/* Column Body */}
              <div className="flex-1 space-y-2.5 min-h-[200px] bg-muted/20 dark:bg-muted/10 rounded-b-xl p-2.5 border border-t-0 border-border/50">
                {cards.map((p) => (
                  <PipelineCard key={p.id} pratica={p} phaseColor={COL_BG[phase.id]} />
                ))}
                {cards.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-xs text-muted-foreground/60">
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