import React, { useState } from "react";
import { Send, ArrowRight, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MOCK_FEED = [
  { id: 1, type: "system", user: "Sistema", action: "Pratica creata", time: "15 Feb 2026, 10:00" },
  { id: 2, type: "system", user: "Laura Bianchi", action: "Fase avanzata a Programmazione Verifica", time: "20 Feb 2026, 14:30" },
  { id: 3, type: "message", user: "Giuseppe Verde", message: "Ho contattato il cliente per confermare la data dell'audit. Attendo risposta.", time: "5 Mar 2026, 09:15" },
  { id: 4, type: "document", user: "Anna Ferrari", action: "Documento caricato: Contratto firmato", time: "10 Mar 2026, 11:00" },
  { id: 5, type: "system", user: "Laura Bianchi", action: "Fase avanzata a Richiesta Proforma", time: "15 Mar 2026, 16:45" },
  { id: 6, type: "message", user: "Marco Rossi", message: "Verificare la conformità dei documenti prima di procedere con la proforma.", time: "20 Mar 2026, 10:30" },
];

const TYPE_ICONS = {
  system: ArrowRight,
  message: MessageSquare,
  document: FileText,
};

const TYPE_COLORS = {
  system: "bg-primary/10 text-primary",
  message: "bg-secondary/10 text-secondary",
  document: "bg-success/10 text-success",
};

export default function CommunicationFeed() {
  const [comment, setComment] = useState("");

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Comunicazioni</h3>
      </div>
      <div className="p-5">
        {/* Input */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <Textarea
              placeholder="Scrivi un commento..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[80px] bg-muted/30 border-border resize-none"
            />
          </div>
          <Button size="icon" className="bg-primary hover:bg-primary/90 self-end h-10 w-10">
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-5">
            {[...MOCK_FEED].reverse().map((item) => {
              const Icon = TYPE_ICONS[item.type];
              return (
                <div key={item.id} className="flex gap-3.5 relative">
                  <div className={`w-8 h-8 rounded-full ${TYPE_COLORS[item.type]} flex items-center justify-center shrink-0 z-10`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-foreground">{item.user}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    {item.action && (
                      <p className="text-sm text-muted-foreground mt-0.5">{item.action}</p>
                    )}
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