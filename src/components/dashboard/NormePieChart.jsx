import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PRATICHE } from "@/lib/mockData";

const COLORS = [
  "hsl(213,100%,46%)",   // primary blue
  "hsl(263,46%,47%)",    // secondary purple
  "hsl(151,64%,51%)",    // success green
  "hsl(37,97%,69%)",     // warning amber
  "hsl(351,75%,62%)",    // destructive rose
  "hsl(213,60%,65%)",    // light blue
  "hsl(263,30%,65%)",    // light purple
  "hsl(151,40%,65%)",    // light green
];

function buildData() {
  const counts = {};
  PRATICHE.filter((p) => !p.completed).forEach((p) => {
    p.norms.forEach((n) => {
      counts[n] = (counts[n] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground">{name}</p>
      <p className="text-muted-foreground">{value} pratica{value !== 1 ? "he" : ""}</p>
    </div>
  );
};

export default function NormePieChart() {
  const data = buildData();
  const total = data.reduce((s, d) => s + d.value, 0);
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Norme in Gestione</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{total} pratiche attive</p>
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
                    fill={COLORS[idx % COLORS.length]}
                    opacity={activeIdx === null || activeIdx === idx ? 1 : 0.4}
                    style={{ transition: "opacity 0.2s", cursor: "pointer" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
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
                style={{ background: COLORS[idx % COLORS.length] }}
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