import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PRATICHE, PHASES } from "@/lib/mockData";

const NORM_COLORS = [
  "hsl(213,100%,46%)",
  "hsl(263,46%,47%)",
  "hsl(151,64%,51%)",
  "hsl(37,97%,69%)",
  "hsl(351,75%,62%)",
  "hsl(213,60%,65%)",
  "hsl(263,30%,65%)",
  "hsl(151,40%,65%)",
];

// Phase colors match CSS vars: phase-1..5
const PHASE_COLORS = [
  "hsl(213,100%,46%)",
  "hsl(263,46%,47%)",
  "hsl(37,97%,69%)",
  "hsl(151,64%,51%)",
  "hsl(351,75%,62%)",
];

function buildNormeData() {
  const counts = {};
  PRATICHE.filter((p) => !p.completed).forEach((p) => {
    p.norms.forEach((n) => { counts[n] = (counts[n] || 0) + 1; });
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function buildFasiData() {
  return PHASES.map((phase, idx) => ({
    name: phase.short,
    fullName: phase.name,
    value: PRATICHE.filter((p) => p.phase === phase.id && !p.completed).length,
    color: PHASE_COLORS[idx],
  })).filter((d) => d.value > 0);
}

const CustomTooltip = ({ active, payload, mode }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const label = mode === "fasi" ? item.fullName || item.name : item.name;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">{item.value} pratica{item.value !== 1 ? "he" : ""}</p>
    </div>
  );
};

export default function NormePieChart() {
  const [mode, setMode] = useState("norme");
  const [activeIdx, setActiveIdx] = useState(null);

  const normeData = buildNormeData();
  const fasiData = buildFasiData();
  const data = mode === "norme" ? normeData : fasiData;
  const colors = mode === "norme" ? NORM_COLORS : PHASE_COLORS;
  const total = PRATICHE.filter((p) => !p.completed).length;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-foreground">
            {mode === "norme" ? "Norme in Gestione" : "Distribuzione per Fase"}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{total} pratiche attive</p>
        </div>
        {/* Toggle */}
        <div className="flex bg-muted rounded-lg p-0.5 shrink-0">
          {["norme", "fasi"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setActiveIdx(null); }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                mode === m
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "norme" ? "Norme" : "Fasi"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="h-44 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="52%"
                outerRadius="78%"
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, idx) => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                stroke="none"
              >
                {data.map((entry, idx) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color || colors[idx % colors.length]}
                    opacity={activeIdx === null || activeIdx === idx ? 1 : 0.35}
                    style={{ transition: "opacity 0.2s", cursor: "pointer" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip mode={mode} />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold font-poppins text-foreground">{total}</span>
            <span className="text-[11px] text-muted-foreground">pratiche</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {data.map((entry, idx) => (
            <div
              key={entry.name}
              className="flex items-center gap-2 cursor-default"
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: entry.color || colors[idx % colors.length] }}
              />
              <span className="text-xs text-muted-foreground truncate">{entry.name}</span>
              <span className="text-xs font-semibold text-foreground ml-auto shrink-0">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}