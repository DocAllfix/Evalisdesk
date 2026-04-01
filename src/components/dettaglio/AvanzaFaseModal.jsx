import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronRight } from "lucide-react";
import { PHASES } from "@/lib/mockData";

const PHASE_PREREQUISITES = {
  2: [
    { id: "contract", label: "Contratto firmato ricevuto" },
    { id: "client_confirmed", label: "Cliente confermato telefonicamente" },
  ],
  3: [
    { id: "audit_scheduled", label: "Data audit programmata" },
    { id: "auditor_assigned", label: "Auditor assegnato" },
  ],
  4: [
    { id: "proforma_sent", label: "Proforma inviata al cliente" },
    { id: "proforma_confirmed", label: "Proforma confermata/pagata" },
  ],
  5: [
    { id: "docs_received", label: "Documentazione completa ricevuta" },
    { id: "audit_done", label: "Audit eseguito" },
    { id: "report_ready", label: "Report di audit pronto" },
  ],
};

export default function AvanzaFaseModal({ open, onClose, pratica }) {
  const nextPhase = PHASES.find((p) => p.id === pratica.phase + 1);
  const prerequisites = PHASE_PREREQUISITES[pratica.phase + 1] || [];
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const allChecked = prerequisites.every((p) => checked[p.id]);

  if (!nextPhase) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle>Avanza a fase: {nextPhase.name}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-muted-foreground">
            Prima di avanzare, conferma che i seguenti requisiti siano soddisfatti:
          </p>
          <div className="space-y-2">
            {prerequisites.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                  checked[p.id]
                    ? "bg-success/5 border-success/30 text-success"
                    : "bg-muted/30 border-border text-foreground hover:border-primary/40"
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                  checked[p.id] ? "bg-success border-success" : "border-muted-foreground/40"
                }`}>
                  {checked[p.id] && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm font-medium">{p.label}</span>
              </button>
            ))}
          </div>
          {!allChecked && prerequisites.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
              <X className="w-3.5 h-3.5 shrink-0" />
              Devi confermare tutti i requisiti prima di procedere
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Annulla</Button>
          <Button
            disabled={!allChecked}
            className="bg-primary hover:bg-primary/90 disabled:opacity-40"
            onClick={onClose}
          >
            Avanza a {nextPhase.short}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}