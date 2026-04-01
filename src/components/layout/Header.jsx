import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/themeContext";
import { NOTIFICATIONS } from "@/lib/mockData";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/pratiche": "Pratiche",
  "/pipeline": "Pipeline",
  "/scadenze": "Scadenze",
  "/clienti": "Clienti",
  "/consulenti": "Consulenti",
  "/archivio": "Archivio",
};

export default function Header({ onOpenNotifications }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  const pathKey = Object.keys(PAGE_TITLES).find(
    (k) => k === location.pathname || (k !== "/" && location.pathname.startsWith(k))
  );
  const title = pathKey ? PAGE_TITLES[pathKey] : "";

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca pratica, cliente..."
            className="w-64 pl-9 h-9 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-colors"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
          onClick={onOpenNotifications}
        >
          <Bell className="w-[18px] h-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </Button>

        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
          <span className="text-primary text-xs font-semibold">MR</span>
        </div>
      </div>
    </header>
  );
}