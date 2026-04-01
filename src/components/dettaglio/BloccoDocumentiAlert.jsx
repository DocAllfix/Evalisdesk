import React from "react";
import { AlertTriangle } from "lucide-react";

export default function BloccoDocumentiAlert({ documents }) {
  const missing = Object.entries(documents)
    .filter(([, v]) => !v)
    .map(([k]) => ({
      contractReceived: "Contratto",
      auditScheduled: "Audit programmato",
      proformaIssued: "Proforma emessa",
      documentsReceived: "Documenti ricevuti",
    }[k]));

  if (missing.length === 0) return null;

  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl border bg-destructive/5 border-destructive/20">
      <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-destructive">Documenti mancanti</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          In attesa di: {missing.join(", ")}
        </p>
      </div>
    </div>
  );
}