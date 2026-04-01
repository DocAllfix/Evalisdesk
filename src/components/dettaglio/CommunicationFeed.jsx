import React, { useState } from "react";
import { Send, ArrowRight, FileText, MessageSquare, Paperclip, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TEAM } from "@/lib/mockData";

const MOCK_FEED = [
  { id: 1, type: "system", user: "Sistema", action: "Pratica creata", time: "15 Feb 2026, 10:00" },
  { id: 2, type: "system", user: "Laura Bianchi", action: "Fase avanzata a Programmazione Verifica", time: "20 Feb 2026, 14:30" },
  { id: 3, type: "message", user: "Giuseppe Verde", message: "Ho contattato il cliente per confermare la data dell'audit. Attendo risposta.", time: "5 Mar 2026, 09:15", tipo: "Commento" },
  { id: 4, type: "document", user: "Anna Ferrari", action: "Documento caricato: Contratto firmato", time: "10 Mar 2026, 11:00" },
  { id: 5, type: "system", user: "Laura Bianchi", action: "Fase avanzata a Richiesta Proforma", time: "15 Mar 2026, 16:45" },
  { id: 6, type: "message", user: "Marco Rossi", message: "Verificare la conformità dei documenti prima di procedere con la proforma.", time: "20 Mar 2026, 10:30", tipo: "Richiesta", dest: "Laura Bianchi" },
];

const TYPE_ICONS = { system: ArrowRight, message: MessageSquare, document: FileText };
const TYPE_COLORS = {
  system: "bg-primary/10 text-primary",
  message: "bg-secondary/10 text-secondary",
  document: "bg-success/10 text-success",
};
const TIPO_COLORS = {
  Richiesta: "bg-warning/10 text-warning border-warning/20",
  Commento: "bg-muted text-muted-foreground border-border",
  Comunicazione: "bg-primary/10 text-primary border-primary/20",
};

export default function CommunicationFeed() {
  const [comment, setComment] = useState("");
  const [tipo, setTipo] = useState("Commento");
  const [dest, setDest] = useState("");
  const [feed, setFeed] = useState(MOCK_FEED);

  const handleSend = () => {
    if (!comment.trim()) return;
    const newItem = {
      id: Date.now(),
      type: "message",
      user: "Marco Rossi",
      message: comment,
      time: "Adesso",
      tipo,
      dest: dest || undefined,
    };
    setFeed((prev) => [...prev, newItem]);
    setComment(""); setDest("");
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Comunicazioni</h3>
      </div>
      <div className="p-5">
        {/* Composer */}
        <div className="space-y-2 mb-6">
          <div className="flex gap-2">
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger className="w-36 h-8 text-xs">
                <Tag className="w-3 h-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commento">Commento</SelectItem>
                <SelectItem value="Richiesta">Richiesta</SelectItem>
                <SelectItem value="Comunicazione">Comunicazione</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dest} onValueChange={setDest}>
              <SelectTrigger className="flex-1 h-8 text-xs">
                <SelectValue placeholder="Destinatario (opz.)" />
              </SelectTrigger>
              <SelectContent>
                {TEAM.map((t) => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Textarea
                placeholder="Scrivi un commento..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[72px] bg-muted/30 border-border resize-none pr-10"
              />
              <button className="absolute right-3 bottom-3 text-muted-foreground hover:text-foreground transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <Button size="icon" className="bg-primary hover:bg-primary/90 self-end h-10 w-10" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-5">
            {[...feed].reverse().map((item) => {
              const Icon = TYPE_ICONS[item.type];
              return (
                <div key={item.id} className="flex gap-3.5 relative">
                  <div className={`w-8 h-8 rounded-full ${TYPE_COLORS[item.type]} flex items-center justify-center shrink-0 z-10`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 pt-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-foreground">{item.user}</span>
                      {item.tipo && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${TIPO_COLORS[item.tipo] || TIPO_COLORS.Commento}`}>
                          {item.tipo}
                        </span>
                      )}
                      {item.dest && (
                        <span className="text-xs text-muted-foreground">→ {item.dest}</span>
                      )}
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    {item.action && <p className="text-sm text-muted-foreground mt-0.5">{item.action}</p>}
                    {item.message && (
                      <p className="text-sm text-foreground mt-1 bg-muted/30 rounded-lg px-3 py-2 border border-border/50">
                        {item.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}