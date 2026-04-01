import React, { useState } from "react";
import { Bell, CheckCircle2, Circle, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const INITIAL = [
  { id: 1, title: "Scadenza proforma", date: "20 Apr 2026", done: false, auto: false },
  { id: 2, title: "Sorveglianza annuale", date: "15 Apr 2027", done: false, auto: true },
];

export default function PromemoriaSection() {
  const [items, setItems] = useState(INITIAL);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const toggle = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  const add = () => {
    if (!newTitle.trim()) return;
    setItems((prev) => [...prev, { id: Date.now(), title: newTitle, date: newDate, done: false, auto: false }]);
    setNewTitle(""); setNewDate(""); setAdding(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Promemoria</h3>
        <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => setAdding((v) => !v)}>
          <Plus className="w-3.5 h-3.5" /> Aggiungi
        </Button>
      </div>
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full flex items-start gap-3 p-2.5 rounded-lg border text-left transition-all ${
              item.done
                ? "bg-success/5 border-success/20 opacity-60"
                : "bg-muted/20 border-border hover:border-primary/30"
            }`}
          >
            {item.done
              ? <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
              : <Circle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            }
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {item.title}
              </p>
              {item.date && (
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Bell className="w-3 h-3" /> {item.date}
                  {item.auto && (
                    <span className="ml-1 flex items-center gap-0.5 bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full text-[10px]">
                      <RefreshCw className="w-2.5 h-2.5" /> Auto
                    </span>
                  )}
                </p>
              )}
            </div>
          </button>
        ))}

        {adding && (
          <div className="space-y-2 pt-2 border-t border-border">
            <Input placeholder="Titolo promemoria..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="h-8 text-sm" />
            <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="h-8 text-sm" />
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 h-7 text-xs bg-primary hover:bg-primary/90" onClick={add}>Aggiungi</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setAdding(false)}>Annulla</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}