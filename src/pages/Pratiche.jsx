import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, ExternalLink, Sparkles, SlidersHorizontal, ArrowUpDown, EyeOff, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRATICHE, PHASES, TEAM, getDaysRemaining } from "@/lib/mockData";
import UrgencyBadge from "@/components/shared/UrgencyBadge";
import DocumentChecklist from "@/components/shared/DocumentChecklist";

const PHASE_CELL_COLORS = {
  1: "bg-phase-1 text-white",
  2: "bg-phase-2 text-white",
  3: "bg-phase-3 text-white",
  4: "bg-phase-4 text-white",
  5: "bg-phase-5 text-white",
};

const PHASE_LABELS = {
  1: "Contratto",
  2: "Programmazione",
  3: "Proforma",
  4: "Elaborazione",
  5: "Firme",
};

export default function Pratiche() {
  const [search, setSearch] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [normFilter, setNormFilter] = useState("all");
  const [tab, setTab] = useState("active");

  const allNorms = [...new Set(PRATICHE.flatMap((p) => p.norms))].sort();

  const filtered = PRATICHE.filter((p) => {
    if (tab === "active" && p.completed) return false;
    if (tab === "completed" && !p.completed) return false;
    if (search && !p.clientName.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (phaseFilter !== "all" && p.phase !== Number(phaseFilter)) return false;
    if (normFilter !== "all" && !p.norms.includes(normFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-0 max-w-[1600px]">
      {/* Top toolbar — monday-style */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-4 text-sm font-medium rounded-md">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Nuova Pratica
        </Button>
        <div className="w-px h-5 bg-border mx-1" />
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Cerca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 bg-muted/40 border-border/60 text-sm w-44 focus:w-56 transition-all"
          />
        </div>
        <Select value={normFilter} onValueChange={setNormFilter}>
          <SelectTrigger className="h-8 px-3 bg-transparent border-border/60 text-sm w-auto gap-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le norme</SelectItem>
            {allNorms.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={phaseFilter} onValueChange={setPhaseFilter}>
          <SelectTrigger className="h-8 px-3 bg-transparent border-border/60 text-sm w-auto gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <SelectValue placeholder="Ordina per fase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le fasi</SelectItem>
            {PHASES.map((p) => (<SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>))}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-muted-foreground hover:text-foreground text-sm gap-1.5">
          <EyeOff className="w-3.5 h-3.5" />
          Nascondi
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-muted-foreground hover:text-foreground text-sm gap-1.5">
          <LayoutList className="w-3.5 h-3.5" />
          Raggruppa
        </Button>
        {/* Tab switcher on the right */}
        <div className="ml-auto flex items-center gap-1 bg-muted rounded-md p-0.5">
          <button
            onClick={() => setTab("active")}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${tab === "active" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Attive
          </button>
          <button
            onClick={() => setTab("completed")}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${tab === "completed" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Completate
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="w-8 px-3 py-2.5">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-border accent-primary" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5 min-w-[200px]">Pratica / Cliente</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5">Proprietario</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5 min-w-[130px]">Stato</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5">Scadenza</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5">Norme</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5">Ciclo</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2.5">Documenti</th>
                <th className="w-8 px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const days = getDaysRemaining(p.deadline);
                const isUrgent = days <= 15;
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors group ${isUrgent ? "border-l-2 border-l-destructive" : "border-l-2 border-l-transparent"}`}
                  >
                    <td className="px-3 py-2.5">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded border-border accent-primary" />
                    </td>
                    <td className="px-3 py-2.5">
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{p.clientName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.id}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary-foreground">{p.assignedTo.initials}</span>
                        </div>
                        <span className="text-xs text-muted-foreground hidden xl:inline">{p.assignedTo.name.split(" ")[0]}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded text-xs font-semibold min-w-[110px] ${PHASE_CELL_COLORS[p.phase]}`}>
                        {PHASE_LABELS[p.phase]}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <UrgencyBadge deadline={p.deadline} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 flex-wrap">
                        {p.norms.map((n) => (
                          <span key={n} className="text-xs bg-muted px-2 py-0.5 rounded font-medium text-muted-foreground">{n}</span>
                        ))}
                        {p.norms.length > 1 && (
                          <span className="text-xs bg-secondary/10 text-secondary px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs text-muted-foreground">{p.cycle}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <DocumentChecklist documents={p.documents} compact />
                    </td>
                    <td className="px-3 py-2.5">
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
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Nessuna pratica trovata</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Prova a cambiare i filtri attivi</p>
          </div>
        )}
        {/* Table footer summary bar — monday style */}
        {filtered.length > 0 && (
          <div className="border-t border-border bg-muted/10 px-3 py-2 flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{filtered.length} pratiche</span>
            <div className="flex items-center gap-1 ml-auto">
              {PHASES.map((ph) => {
                const count = filtered.filter((p) => p.phase === ph.id).length;
                if (count === 0) return null;
                return (
                  <div key={ph.id} className={`w-6 h-2.5 rounded-sm ${PHASE_CELL_COLORS[ph.id].split(" ")[0]}`} title={ph.short} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}