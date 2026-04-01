import React from "react";
import { Link } from "react-router-dom";
import { ACTIVITY_FEED } from "@/lib/mockData";

export default function ActivityFeed() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Attività Recente</h3>
      </div>
      <div className="p-5">
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-5">
            {ACTIVITY_FEED.map((item) => (
              <div key={item.id} className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Link
                      to={`/pratiche/${item.praticaId}`}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      {item.client}
                    </Link>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}