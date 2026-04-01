import React, { useState } from "react";
import { TEAM } from "@/lib/mockData";
import { Shield, Mail, Phone, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import NormeMultiSelect from "@/components/shared/NormeMultiSelect.jsx";

const ROLE_COLORS = {
  Admin: "bg-primary/10 text-primary border-primary/20",
  Responsabile: "bg-secondary/10 text-secondary border-secondary/20",
  Operatore: "bg-success/10 text-success border-success/20",
};

function ConsulenteModal({ open, onClose, member }) {
  const [form, setForm] = useState({
    nome: member?.name?.split(" ")[0] || "",
    cognome: member?.name?.split(" ")[1] || "",
    azienda: "",
    email: member ? `${member.name.toLowerCase().replace(" ", ".")}@certdesk.it` : "",
    tel: "",
    norme: member?.norme || [],
    note: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 flex flex-col max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
          <DialogTitle>{member ? "Modifica Consulente" : "Nuovo Consulente"}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Anagrafica */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Anagrafica</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-sm font-medium mb-1.5 block">Nome *</Label><Input value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Marco" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Cognome</Label><Input value={form.cognome} onChange={(e) => set("cognome", e.target.value)} placeholder="Rossi" /></div>
              </div>
              <div><Label className="text-sm font-medium mb-1.5 block">Azienda / Studio</Label><Input value={form.azienda} onChange={(e) => set("azienda", e.target.value)} placeholder="Studio Rossi Consulting" /></div>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Contatti</p>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-sm font-medium mb-1.5 block">Email</Label><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
              <div><Label className="text-sm font-medium mb-1.5 block">Telefono</Label><Input value={form.tel} onChange={(e) => set("tel", e.target.value)} placeholder="+39..." /></div>
            </div>
          </div>

          {/* Norme gestite */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Norme gestite</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>Le norme per cui questo consulente segue i clienti</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <NormeMultiSelect value={form.norme} onChange={(v) => set("norme", v)} />
          </div>

          {/* Note */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Note</p>
            <Textarea rows={2} className="resize-none" placeholder="Note..." value={form.note} onChange={(e) => set("note", e.target.value)} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-2 shrink-0">
          <Button variant="ghost" onClick={onClose}>Annulla</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>Salva Consulente</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Consulenti() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);

  const openModal = (member = null) => { setEditMember(member); setModalOpen(true); };

  return (
    <TooltipProvider>
      <div className="space-y-5 max-w-[1400px]">
        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm" onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi Consulente
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {TEAM.map((member) => (
            <div
              key={member.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all duration-200 group text-center cursor-pointer"
              onClick={() => openModal(member)}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <span className="text-lg font-semibold text-primary">{member.initials}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{member.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border mt-2 ${ROLE_COLORS[member.role]}`}>
                {member.role}
              </span>

              {/* Norme tags */}
              {member.norme?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  {member.norme.slice(0, 3).map((n) => (
                    <span key={n} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{n}</span>
                  ))}
                  {member.norme.length > 3 && (
                    <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">+{member.norme.length - 3} altri</span>
                  )}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{member.name.toLowerCase().replace(" ", ".")}@certdesk.it</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>3 pratiche assegnate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConsulenteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        member={editMember}
      />
    </TooltipProvider>
  );
}