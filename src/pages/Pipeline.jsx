import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PHASES, PRATICHE, TEAM } from "@/lib/mockData";
import PipelineCard from "@/components/pipeline/PipelineCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
  const [pratiche, setPratiche] = useState(PRATICHE);
  const allNorms = [...new Set(PRATICHE.flatMap((p) => p.norms))].sort();

  const filtered = pratiche.filter((p) => {
    if (p.completed) return false;
    if (normFilter !== "all" && !p.norms.includes(normFilter)) return false;
    if (assigneeFilter !== "all" && p.assignedTo.id !== Number(assigneeFilter)) return false;
    return true;
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const destPhase = Number(destination.droppableId);
    if (destPhase === Number(source.droppableId) && destination.index === source.index) return;

    setPratiche((prev) =>
      prev.map((p) => (p.id === draggableId ? { ...p, phase: destPhase } : p))
    );
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-6">
          {PHASES.map((phase) => {
            const cards = filtered.filter((p) => p.phase === phase.id);
            return (
              <div key={phase.id} className="min-w-[260px] w-[260px] shrink-0 flex flex-col">
                {/* Column Header */}
                <div className={`rounded-t-xl px-4 py-2.5 flex items-center gap-2 ${COL_BG[phase.id]}`}>
                  <h3 className="text-sm font-semibold text-white flex-1 truncate">{phase.name}</h3>
                  <span className="text-xs font-bold text-white/80 bg-black/20 px-2 py-0.5 rounded-full">
                    {cards.length}
                  </span>
                </div>
                {/* Droppable Column Body */}
                <Droppable droppableId={String(phase.id)}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-2.5 min-h-[200px] rounded-b-xl p-2.5 border border-t-0 border-border/50 transition-colors ${
                        snapshot.isDraggingOver
                          ? "bg-primary/5 border-primary/30"
                          : "bg-muted/20 dark:bg-muted/10"
                      }`}
                    >
                      {cards.map((p, index) => (
                        <Draggable key={p.id} draggableId={p.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={provided.draggableProps.style}
                              className={snapshot.isDragging ? "opacity-90 rotate-1 scale-105" : ""}
                            >
                              <PipelineCard pratica={p} phaseColor={COL_BG[phase.id]} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {cards.length === 0 && !snapshot.isDraggingOver && (
                        <div className="flex items-center justify-center h-24 text-xs text-muted-foreground/60">
                          Nessuna pratica
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}