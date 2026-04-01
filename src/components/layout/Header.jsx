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
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-5 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-poppins font-medium text-foreground leading-[34px]">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Cerca pratica, cliente..."
            className="w-52 pl-8 h-8 bg-muted/40 border-border/60 text-sm focus:border-primary/40 focus:bg-card transition-colors"
          />
        </div>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-8 h-8 text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative w-8 h-8 text-muted-foreground hover:text-foreground"
          onClick={onOpenNotifications}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
          <span className="text-primary-foreground text-xs font-bold">MR</span>
        </div>
      </div>
    </header>
  );
}