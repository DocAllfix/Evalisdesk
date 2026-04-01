import React, { useState, useRef } from "react";
import { FileText, Download, Upload, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_FILES = [
  { id: 1, name: "Contratto_firmato.pdf", size: "245 KB", date: "10 Mar 2026", progress: 100 },
  { id: 2, name: "Richiesta_audit.pdf", size: "128 KB", date: "15 Mar 2026", progress: 100 },
  { id: 3, name: "Checklist_documenti.xlsx", size: "89 KB", date: "18 Mar 2026", progress: 100 },
];

export default function AllegatiSection() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFile = (f) => {
    const newFile = { id: Date.now(), name: f.name, size: `${Math.round(f.size / 1024)} KB`, date: "01 Apr 2026", progress: 0 };
    setFiles((prev) => [...prev, newFile]);
    // Simulate progress
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setFiles((prev) => prev.map((item) => item.id === newFile.id ? { ...item, progress: p } : item));
      if (p >= 100) clearInterval(interval);
    }, 150);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    Array.from(e.dataTransfer.files).forEach(addFile);
  };

  const handleInput = (e) => Array.from(e.target.files).forEach(addFile);

  const remove = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Allegati</h3>
        <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => inputRef.current?.click()}>
          <Upload className="w-3.5 h-3.5" /> Carica
        </Button>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={handleInput} />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`mx-4 mt-3 mb-1 border-2 border-dashed rounded-lg py-4 text-center transition-colors cursor-pointer ${
          dragging ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/40 hover:bg-muted/20"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Trascina file qui o clicca per caricare</p>
      </div>

      <div className="p-4 pt-2 space-y-2">
        {files.map((f) => (
          <div key={f.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
              {f.progress < 100 ? (
                <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-200" style={{ width: `${f.progress}%` }} />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">{f.size} · {f.date}</p>
              )}
            </div>
            {f.progress === 100 ? (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-muted-foreground hover:text-foreground"><Download className="w-4 h-4" /></button>
                <button className="text-muted-foreground hover:text-destructive" onClick={() => remove(f.id)}><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-success" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}