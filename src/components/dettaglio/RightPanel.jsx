import React from "react";
import { User, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import DocumentChecklist from "@/components/shared/DocumentChecklist";
import AllegatiSection from "@/components/dettaglio/AllegatiSection";
import PromemoriaSection from "@/components/dettaglio/PromemoriaSection";

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

      <AllegatiSection />
      <PromemoriaSection />
    </div>
  );
}