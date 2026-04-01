import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TEAM, CLIENTS } from "@/lib/mockData";
import NormeMultiSelect from "@/components/shared/NormeMultiSelect";
import QuickAddCliente from "@/components/clienti/QuickAddCliente";

const CYCLES = ["Certificazione", "Ricertificazione", "Prima Sorveglianza", "Seconda Sorveglianza"];

export default function PraticaModal({ open, onClose }) {
  const [tipoContatto, setTipoContatto] = useState("consulente");
  const [form, setForm] = useState({
    clientId: "",
    norme: [],
    cycle: "",
    assignedTo: "",
    auditor: "",
    auditDate: "",
    auditLocation: "",
    deadline: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 flex flex-col max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
          <DialogTitle>Nuova Pratica</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Cliente */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Cliente</p>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Cliente *</Label>
              <Select value={form.clientId} onValueChange={(v) => set("clientId", v)}>
                <SelectTrigger><SelectValue placeholder="Seleziona cliente..." /></SelectTrigger>
                <SelectContent>
                  {CLIENTS.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2">
                <QuickAddCliente onClienteCreato={(c) => set("clientId", String(c.id))} />
              </div>
            </div>
          </div>

          {/* Tipo Contatto */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Tipo Contatto</p>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setTipoContatto("consulente")}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${tipoContatto === "consulente" ? "bg-primary/10 border-primary/40 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
              >
                👤 Tramite Consulente
              </button>
              <button
                type="button"
                onClick={() => setTipoContatto("diretto")}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${tipoContatto === "diretto" ? "bg-primary/10 border-primary/40 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
              >
                🏢 Referente Diretto
              </button>
            </div>
            {tipoContatto === "consulente" ? (
              <Select value={form.assignedTo} onValueChange={(v) => set("assignedTo", v)}>
                <SelectTrigger><SelectValue placeholder="Seleziona consulente..." /></SelectTrigger>
                <SelectContent>
                  {TEAM.map((t) => <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Nome Referente</Label>
                  <Input placeholder="Mario Rossi" value={form.referenteNome || ""} onChange={(e) => set("referenteNome", e.target.value)} />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Email</Label>
                  <Input placeholder="email@..." value={form.referenteEmail || ""} onChange={(e) => set("referenteEmail", e.target.value)} />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Telefono</Label>
                  <Input placeholder="+39 ..." value={form.referenteTel || ""} onChange={(e) => set("referenteTel", e.target.value)} />
                </div>
              </div>
            )}
          </div>

          {/* Certificazione */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Certificazione</p>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Norme *</Label>
                <NormeMultiSelect value={form.norme} onChange={(v) => set("norme", v)} />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Tipologia ciclo *</Label>
                <Select value={form.cycle} onValueChange={(v) => set("cycle", v)}>
                  <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
                  <SelectContent>
                    {CYCLES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Assegnazione */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Assegnazione</p>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Auditor</Label>
                <Input placeholder="Nome auditor..." value={form.auditor} onChange={(e) => set("auditor", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Audit */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Audit</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-sm font-medium mb-1.5 block">Data Audit</Label><Input type="date" value={form.auditDate} onChange={(e) => set("auditDate", e.target.value)} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Scadenza</Label><Input type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} /></div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Luogo Audit</Label>
                <Input placeholder="Es. Sede Milano" value={form.auditLocation} onChange={(e) => set("auditLocation", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-2 shrink-0">
          <Button variant="ghost" onClick={onClose}>Annulla</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>Crea Pratica</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}