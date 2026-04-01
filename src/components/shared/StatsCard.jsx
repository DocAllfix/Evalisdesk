import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon, color, trend, trendLabel }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow duration-200 group relative overflow-hidden">
      {/* subtle background icon */}
      <div className={`absolute -right-3 -top-3 w-20 h-20 rounded-full opacity-[0.06] ${color}`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shadow-sm`}>
            <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend > 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}>
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend > 0 ? "+" : ""}{trend}%
            </div>
          )}
        </div>
        <p className="text-4xl font-light text-foreground tracking-tight tabular-nums">{value}</p>
        <p className="text-xs font-medium text-muted-foreground mt-1.5">{title}</p>
        {trendLabel && (
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">{trendLabel}</p>
        )}
      </div>
    </div>
  );
}