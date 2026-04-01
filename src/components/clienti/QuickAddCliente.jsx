import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function QuickAddCliente({ onClienteCreato }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", tel: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleCreate = () => {
    if (!form.nome.trim()) return;
    const newClient = { id: Date.now(), name: form.nome, email: form.email, tel: form.tel };
    onClienteCreato?.(newClient);
    setForm({ nome: "", email: "", tel: "" });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-primary underline underline-offset-2 hover:text-primary/80 transition-colors flex items-center gap-1"
      >
        <Plus className="w-3 h-3" /> Aggiungi nuovo cliente
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm p-0 gap-0">
          <DialogHeader className="px-5 py-4 border-b border-border">
            <DialogTitle>Nuovo Cliente (rapido)</DialogTitle>
          </DialogHeader>
          <div className="px-5 py-4 space-y-3">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Ragione Sociale / Nome *</Label>
              <Input placeholder="Es. Rossi Costruzioni Srl" value={form.nome} onChange={(e) => set("nome", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Email</Label>
                <Input type="email" placeholder="email@azienda.it" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Telefono</Label>
                <Input placeholder="+39 ..." value={form.tel} onChange={(e) => set("tel", e.target.value)} />
              </div>
            </div>
          </div>
          <div className="px-5 py-3 border-t border-border flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Annulla</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleCreate}>Crea e seleziona</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}