import React from "react";
import { X, AlertTriangle, ArrowRight, MessageSquare, FileText, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NOTIFICATIONS } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TYPE_CONFIG = {
  deadline: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  phase: { icon: ArrowRight, color: "text-primary", bg: "bg-primary/10" },
  document: { icon: FileText, color: "text-success", bg: "bg-success/10" },
  message: { icon: MessageSquare, color: "text-secondary", bg: "bg-secondary/10" },
};

export default function NotificationPanel({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-[380px] bg-card border-l border-border shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
              <h2 className="font-semibold text-foreground">Notifiche</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                  <CheckCheck className="w-3.5 h-3.5 mr-1" />
                  Segna tutte lette
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-1">
                {NOTIFICATIONS.map((notif) => {
                  const config = TYPE_CONFIG[notif.type];
                  const Icon = config.icon;
                  return (
                    <Link
                      key={notif.id}
                      to={`/pratiche/${notif.praticaId}`}
                      onClick={onClose}
                      className={`flex gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                        !notif.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium truncate ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[11px] text-muted-foreground/70 mt-1">{notif.time}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}