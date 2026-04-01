import React from "react";
import { Building2, Calendar, User, FileText, MapPin } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function InfoSection({ pratica }) {
  const items = [
    { icon: Building2, label: "Cliente", value: pratica.clientName },
    { icon: FileText, label: "Tipo Contatto", value: pratica.contactType },
    { icon: User, label: "Assegnato a", value: pratica.assignedTo.name },
    { icon: Calendar, label: "Scadenza", value: format(new Date(pratica.deadline), "d MMMM yyyy", { locale: it }) },
    { icon: User, label: "Auditor", value: pratica.auditor || "Non assegnato" },
    { icon: Calendar, label: "Data Audit", value: pratica.auditDate ? format(new Date(pratica.auditDate), "d MMMM yyyy", { locale: it }) : "Non programmata" },
    { icon: MapPin, label: "Luogo Audit", value: pratica.auditLocation || "Non definito" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Informazioni Generali</h3>
      </div>
      <div className="p-5 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-start gap-3">
              <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}