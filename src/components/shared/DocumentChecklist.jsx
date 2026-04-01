import React from "react";
import { Check, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DOC_LABELS = {
  contractReceived: "Contratto",
  auditScheduled: "Audit",
  proformaIssued: "Proforma",
  documentsReceived: "Documenti",
};

export default function DocumentChecklist({ documents, compact = false, interactive = false, onToggle = null }) {
  if (compact) {
    return (
      <TooltipProvider>
        <div className="flex items-center gap-1">
          {Object.entries(documents).map(([key, value]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                {interactive ? (
                  <button
                    type="button"
                    onClick={() => onToggle?.(key, !value)}
                    className={`w-5 h-5 rounded flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
                      value ? "bg-success/10 text-success" : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  </button>
                ) : (
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                      value ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  </div>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{DOC_LABELS[key]}: {value ? "Completato" : "Mancante"}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-2">
      {Object.entries(documents).map(([key, value]) => (
        <div
          key={key}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors ${
            value
              ? "bg-success/5 border-success/20"
              : "bg-destructive/5 border-destructive/20"
          }`}
        >
          <div
            className={`w-5 h-5 rounded flex items-center justify-center ${
              value ? "bg-success text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            {value && <Check className="w-3 h-3" />}
          </div>
          <span className="text-sm text-foreground">{DOC_LABELS[key]}</span>
          {!value && (
            <span className="ml-auto text-xs text-destructive font-medium">Mancante</span>
          )}
        </div>
      ))}
    </div>
  );
}