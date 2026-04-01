import React, { useState } from "react";
import { Search, Plus, Building2, Mail, Phone, MapPin, FolderKanban, X, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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

function NewClientDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Nuovo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuovo Cliente</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Ragione Sociale</Label>
            <Input placeholder="Es. Rossi Costruzioni Srl" />
          </div>
          <div className="space-y-2">
            <Label>Contatto</Label>
            <Input placeholder="Nome e cognome" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="email@azienda.it" />
            </div>
            <div className="space-y-2">
              <Label>Telefono</Label>
              <Input placeholder="+39 ..." />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Indirizzo</Label>
            <Input placeholder="Via, Città, CAP" />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Crea Cliente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Clienti() {
  const [search, setSearch] = useState("");

  const filtered = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
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
        <NewClientDialog />
      </div>

      {/* Grid */}
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
    </div>
  );
}