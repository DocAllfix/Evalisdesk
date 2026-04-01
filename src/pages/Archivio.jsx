import React from "react";
import { Archive, CheckCircle, Calendar } from "lucide-react";

const COMPLETED = [
  { id: "PRT-2025-018", client: "Rossi Costruzioni Srl", norms: ["ISO 9001"], cycle: "Sorveglianza", completedDate: "15 Dic 2025" },
  { id: "PRT-2025-015", client: "Bianchi Industriale SpA", norms: ["ISO 14001"], cycle: "Certificazione", completedDate: "28 Nov 2025" },
  { id: "PRT-2025-012", client: "Verde Logistics Srl", norms: ["ISO 45001"], cycle: "Certificazione", completedDate: "10 Ott 2025" },
  { id: "PRT-2025-009", client: "Beta Services Srl", norms: ["ISO 27001"], cycle: "Certificazione", completedDate: "22 Set 2025" },
];

export default function Archivio() {
  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Pratica</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Norme</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Ciclo</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Completata</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Stato</th>
              </tr>
            </thead>
            <tbody>
              {COMPLETED.map((p) => (
                <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-foreground">{p.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-foreground">{p.client}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      {p.norms.map((n) => (
                        <span key={n} className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">{n}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-muted-foreground">{p.cycle}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{p.completedDate}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                      <CheckCircle className="w-3 h-3" />
                      Completata
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}