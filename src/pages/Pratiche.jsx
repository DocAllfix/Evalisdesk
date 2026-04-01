import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, ExternalLink, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRATICHE, PHASES, TEAM } from "@/lib/mockData";
import PhaseBadge from "@/components/shared/PhaseBadge";
import UrgencyBadge from "@/components/shared/UrgencyBadge";
import DocumentChecklist from "@/components/shared/DocumentChecklist";

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
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-muted">
            <TabsTrigger value="active" className="text-sm">Attive</TabsTrigger>
            <TabsTrigger value="completed" className="text-sm">Completate</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Nuova Pratica
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca pratica o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>
        <Select value={phaseFilter} onValueChange={setPhaseFilter}>
          <SelectTrigger className="w-48 bg-card border-border">
            <Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Fase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le fasi</SelectItem>
            {PHASES.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Pratica</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Norme</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Ciclo</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Fase</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Scadenza</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Documenti</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Assegnato</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-foreground">{p.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-foreground">{p.clientName}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {p.norms.map((n) => (
                        <span key={n} className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">{n}</span>
                      ))}
                      {p.norms.length > 1 && (
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Audit Integrato
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-muted-foreground">{p.cycle}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <PhaseBadge phase={p.phase} short />
                  </td>
                  <td className="px-5 py-3.5">
                    <UrgencyBadge deadline={p.deadline} />
                  </td>
                  <td className="px-5 py-3.5">
                    <DocumentChecklist documents={p.documents} compact />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-primary">{p.assignedTo.initials}</span>
                      </div>
                      <span className="text-xs text-muted-foreground hidden xl:inline">{p.assignedTo.name.split(" ")[0]}</span>
                    </div>
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
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            Nessuna pratica trovata
          </div>
        )}
      </div>
    </div>
  );
}