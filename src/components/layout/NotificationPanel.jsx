import React, { useState } from "react";
import { X, AlertTriangle, ArrowRight, MessageSquare, FileText, CheckCheck, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NOTIFICATIONS } from "@/lib/mockData";
import { Link } from "react-router-dom";


const TYPE_CONFIG = {
  deadline: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/15" },
  phase: { icon: ArrowRight, color: "text-primary", bg: "bg-primary/15" },
  document: { icon: FileText, color: "text-success", bg: "bg-success/15" },
  message: { icon: MessageSquare, color: "text-secondary", bg: "bg-secondary/15" },
};

const TABS = ["Tutti", "Menzionato", "Assegnazioni"];

export default function NotificationPanel({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("Tutti");

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-screen w-[400px] bg-card border-l border-border shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="px-5 pt-5 pb-0 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Notifiche</h2>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 border-b border-border">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative mt-3 mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Cerca notifiche per persone, bacheche e altro..."
                  className="pl-8 h-8 bg-muted/40 border-border/60 text-xs"
                />
              </div>
            </div>

            {/* Mark all read */}
            <div className="flex items-center justify-between px-5 py-2 border-b border-border/40 shrink-0">
              <span className="text-xs text-muted-foreground">{NOTIFICATIONS.filter(n => !n.read).length} non lette</span>
              <button className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                <CheckCheck className="w-3.5 h-3.5" />
                Segna tutte lette
              </button>
            </div>

            <ScrollArea className="flex-1">
              <div className="py-2">
                {NOTIFICATIONS.map((notif) => {
                  const config = TYPE_CONFIG[notif.type];
                  const Icon = config.icon;
                  return (
                    <Link
                      key={notif.id}
                      to={`/pratiche/${notif.praticaId}`}
                      onClick={onClose}
                      className={`flex gap-3 px-5 py-3.5 transition-colors hover:bg-muted/50 border-b border-border/30 last:border-0 ${
                        !notif.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold truncate ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">{notif.message}</p>
                        <p className="text-[11px] text-muted-foreground/60 mt-1.5 font-medium">{notif.time}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
      </div>
    </>
  );
}