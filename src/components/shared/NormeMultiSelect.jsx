import React, { useState } from "react";
import { Search, X, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

const ALL_NORME = [
  "ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 50001",
  "ISO 22000", "ISO 13485", "ISO 17025", "ISO 15189", "ISO 22301",
  "ISO 20000-1", "ISO 37001", "ISO 39001", "ISO 55001", "SA 8000",
  "EMAS", "GDPR",
];

export default function NormeMultiSelect({ value = [], onChange }) {
  const [search, setSearch] = useState("");

  const filtered = ALL_NORME.filter(
    (n) => n.toLowerCase().includes(search.toLowerCase()) && !value.includes(n)
  );

  const toggle = (n) => {
    if (value.includes(n)) onChange(value.filter((v) => v !== n));
    else onChange([...value, n]);
  };

  const isIntegrated = value.length > 1;

  return (
    <div className="space-y-2">
      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((n) => (
            <span key={n} className="flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium border border-primary/20">
              {n}
              <button type="button" onClick={() => toggle(n)} className="hover:text-destructive transition-colors ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Integrated Audit banner */}
      {isIntegrated && (
        <div className="flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-lg px-3 py-2 text-xs text-warning">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          Audit integrato: verranno gestiti {value.length} standard insieme
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input
          className="pl-8 text-sm h-8"
          placeholder="Cerca norma..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
        {filtered.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => toggle(n)}
            className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}