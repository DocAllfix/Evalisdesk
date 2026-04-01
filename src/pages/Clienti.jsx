import React, { useState } from "react";
import { Search, Plus, Building2, Mail, Phone, MapPin, FolderKanban, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CLIENTS } from "@/lib/mockData";

function ClientCard({ client }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {client.name}
            </h3>
            <p className="text-xs text-muted-foreground">{client.contact}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-primary/5 px-2.5 py-1 rounded-full">
          <FolderKanban className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-primary">{client.activePratiche}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{client.address}</span>
        </div>
      </div>
    </div>
  );
}

function NewClientDialog({ open, onClose }) {
  const [form, setForm] = useState({ ragioneSociale: "", piva: "", cf: "", email: "", pec: "", tel: "", indirizzo: "", citta: "", cap: "", codiceEA: "", nace: "", dipendenti: "", note: "" });
  const [settoreOpen, setSettoreOpen] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 flex flex-col max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
          <DialogTitle>Nuovo Cliente</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Dati Anagrafici */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Dati Anagrafici</p>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Ragione Sociale / Nome *</Label>
                <Input placeholder="Es. Rossi Costruzioni Srl" value={form.ragioneSociale} onChange={(e) => set("ragioneSociale", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-sm font-medium mb-1.5 block">P.IVA</Label><Input placeholder="IT00000000000" value={form.piva} onChange={(e) => set("piva", e.target.value)} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Codice Fiscale</Label><Input placeholder="RSSMRA80A01H501T" value={form.cf} onChange={(e) => set("cf", e.target.value)} /></div>
              </div>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Contatti</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-sm font-medium mb-1.5 block">Email</Label><Input type="email" placeholder="email@azienda.it" value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">PEC</Label><Input type="email" placeholder="pec@azienda.it" value={form.pec} onChange={(e) => set("pec", e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-sm font-medium mb-1.5 block">Telefono</Label><Input placeholder="+39 ..." value={form.tel} onChange={(e) => set("tel", e.target.value)} /></div>
                <div />
              </div>
            </div>
          </div>

          {/* Sede */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Sede</p>
            <div className="space-y-3">
              <div><Label className="text-sm font-medium mb-1.5 block">Indirizzo</Label><Input placeholder="Via Roma 1" value={form.indirizzo} onChange={(e) => set("indirizzo", e.target.value)} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label className="text-sm font-medium mb-1.5 block">Città</Label><Input placeholder="Milano" value={form.citta} onChange={(e) => set("citta", e.target.value)} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">CAP</Label><Input placeholder="20100" value={form.cap} onChange={(e) => set("cap", e.target.value)} /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Provincia</Label><Input placeholder="MI" value={form.provincia} onChange={(e) => set("provincia", e.target.value)} /></div>
              </div>
            </div>
          </div>

          {/* Dati Settore — collapsible */}
          <div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setSettoreOpen((v) => !v)}
            >
              {settoreOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              Dati settore certificazione
            </button>
            {settoreOpen && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-sm font-medium mb-1.5 block">Codice EA</Label><Input placeholder="EA29" value={form.codiceEA} onChange={(e) => set("codiceEA", e.target.value)} /></div>
                  <div><Label className="text-sm font-medium mb-1.5 block">Codice NACE/ATECO</Label><Input placeholder="41.20" value={form.nace} onChange={(e) => set("nace", e.target.value)} /></div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Numero Dipendenti</Label>
                  <Input type="number" placeholder="Es. 50" value={form.dipendenti} onChange={(e) => set("dipendenti", e.target.value)} />
                </div>
                <p className="text-xs text-muted-foreground/70 italic">Questi dati influenzano la durata degli audit ISO</p>
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">Note</p>
            <Textarea rows={2} className="resize-none" placeholder="Note aggiuntive..." value={form.note} onChange={(e) => set("note", e.target.value)} />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-2 shrink-0">
          <Button variant="ghost" onClick={onClose}>Annulla</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>Crea Cliente</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Clienti() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm" onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuovo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          Nessun cliente trovato
        </div>
      )}

      <NewClientDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}