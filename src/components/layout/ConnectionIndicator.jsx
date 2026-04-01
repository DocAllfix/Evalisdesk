import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

const STATES = {
  connected: { label: "Connesso", color: "bg-success", icon: Wifi, textColor: "text-success" },
  reconnecting: { label: "Riconnessione...", color: "bg-warning animate-pulse", icon: RefreshCw, textColor: "text-warning" },
  offline: { label: "Offline", color: "bg-destructive", icon: WifiOff, textColor: "text-destructive" },
};

export default function ConnectionIndicator({ collapsed }) {
  const [status, setStatus] = useState("connected");

  useEffect(() => {
    const handleOffline = () => setStatus("offline");
    const handleOnline = () => setStatus("connected");
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => { window.removeEventListener("offline", handleOffline); window.removeEventListener("online", handleOnline); };
  }, []);

  const { label, color, icon: Icon, textColor } = STATES[status];

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex justify-center py-1">
              <span className={`w-2 h-2 rounded-full ${color}`} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right"><p className="text-xs">{label}</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5">
      <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
      <span className={`text-xs ${textColor}`}>{label}</span>
    </div>
  );
}