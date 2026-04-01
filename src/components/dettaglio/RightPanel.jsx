import React from "react";
import { User, MapPin, Calendar, FileText, Download, Bell } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import DocumentChecklist from "@/components/shared/DocumentChecklist";

const MOCK_ATTACHMENTS = [
  { name: "Contratto_firmato.pdf", size: "245 KB", date: "10 Mar 2026" },
  { name: "Richiesta_audit.pdf", size: "128 KB", date: "15 Mar 2026" },
  { name: "Checklist_documenti.xlsx", size: "89 KB", date: "18 Mar 2026" },
];

const MOCK_REMINDERS = [
  { title: "Scadenza proforma", date: "20 Apr 2026", days: 19 },
  { title: "Sorveglianza annuale", date: "15 Apr 2027", days: 379 },
];

export default function RightPanel({ pratica }) {
  return (
    <div className="space-y-5">
      {/* Assignment */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Assegnazione</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">{pratica.assignedTo.initials}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{pratica.assignedTo.name}</p>
              <p className="text-xs text-muted-foreground">{pratica.assignedTo.role}</p>
            </div>
          </div>
          {pratica.auditor && (
            <div className="flex items-start gap-3 pt-3 border-t border-border/50">
              <User className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Auditor</p>
                <p className="text-sm font-medium text-foreground">{pratica.auditor}</p>
              </div>
            </div>
          )}
          {pratica.auditDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Data Audit</p>
                <p className="text-sm font-medium text-foreground">
                  {format(new Date(pratica.auditDate), "d MMMM yyyy", { locale: it })}
                </p>
              </div>
            </div>
          )}
          {pratica.auditLocation && (
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Luogo</p>
                <p className="text-sm font-medium text-foreground">{pratica.auditLocation}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Checklist Documenti</h3>
        </div>
        <div className="p-5">
          <DocumentChecklist documents={pratica.documents} />
        </div>
      </div>

      {/* Attachments */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Allegati</h3>
        </div>
        <div className="p-5 space-y-2">
          {MOCK_ATTACHMENTS.map((att) => (
            <div key={att.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{att.name}</p>
                <p className="text-xs text-muted-foreground">{att.size} · {att.date}</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Reminders */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Promemoria</h3>
        </div>
        <div className="p-5 space-y-3">
          {MOCK_REMINDERS.map((rem) => (
            <div key={rem.title} className="flex items-start gap-3">
              <Bell className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{rem.title}</p>
                <p className="text-xs text-muted-foreground">{rem.date} · tra {rem.days} giorni</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}