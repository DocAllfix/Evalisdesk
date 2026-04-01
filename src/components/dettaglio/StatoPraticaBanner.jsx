import React from "react";
import { AlertTriangle, Ban, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_CONFIG = {
  sospesa: {
    icon: AlertTriangle,
    bg: "bg-warning/10 border-warning/30",
    text: "text-warning",
    label: "Pratica Sospesa",
    description: "Questa pratica è attualmente sospesa. Nessuna azione è possibile finché non viene riattivata.",
  },
  annullata: {
    icon: Ban,
    bg: "bg-destructive/10 border-destructive/30",
    text: "text-destructive",
    label: "Pratica Annullata",
    description: "Questa pratica è stata annullata e non può essere modificata.",
  },
};

export default function StatoPraticaBanner({ status, onReactivate }) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${config.bg}`}>
      <Icon className={`w-5 h-5 shrink-0 ${config.text}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${config.text}`}>{config.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{config.description}</p>
      </div>
      {status === "sospesa" && onReactivate && (
        <Button size="sm" variant="outline" onClick={onReactivate} className="shrink-0 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          Riattiva
        </Button>
      )}
    </div>
  );
}