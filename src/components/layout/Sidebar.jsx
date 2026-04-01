import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, Columns3, CalendarClock,
  Users, UserCheck, Archive, Bell, Settings, ChevronLeft, ChevronRight
} from "lucide-react";
import { NOTIFICATIONS } from "@/lib/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ConnectionIndicator from "@/components/layout/ConnectionIndicator";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pratiche", label: "Pratiche", icon: FolderKanban },
  { path: "/pipeline", label: "Pipeline", icon: Columns3 },
  { path: "/scadenze", label: "Scadenze", icon: CalendarClock },
  { path: "/clienti", label: "Clienti", icon: Users },
  { path: "/consulenti", label: "Consulenti", icon: UserCheck },
  { path: "/archivio", label: "Archivio", icon: Archive },
];

export default function Sidebar({ onOpenNotifications }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path ||
      (item.path !== "/" && location.pathname.startsWith(item.path));
    const Icon = item.icon;

    const content = (
      <Link
        to={item.path}
        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 relative cursor-pointer ${
          isActive
            ? "bg-sidebar-accent text-sidebar-primary"
            : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-sidebar-primary rounded-r-full" />
        )}
        <Icon className="w-4 h-4 shrink-0" />
        {!collapsed && <span className="text-[14px] leading-5 font-figtree truncate" style={{fontWeight: isActive ? 600 : 400}}>{item.label}</span>}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="ml-1">{item.label}</TooltipContent>
        </Tooltip>
      );
    }
    return content;
  };

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-all duration-300 ${
          collapsed ? "w-[56px]" : "w-[255px]"
        }`}
      >
        {/* Logo / Workspace */}
        <div className={`flex items-center gap-2.5 h-14 border-b border-sidebar-border shrink-0 ${collapsed ? "px-3 justify-center" : "px-4"}`}>
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center shrink-0 overflow-hidden">
            <img src="https://media.base44.com/images/public/69ccd48fcbeffb9e9082bb7d/ea897fee2_logo-evalispng.jpg" alt="Evalis logo" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sidebar-accent-foreground font-semibold text-sm leading-tight truncate">EvalisDesk</p>
              <p className="text-sidebar-foreground text-[10px] truncate">Certification CRM</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-2 space-y-0.5 shrink-0">
          {collapsed ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onOpenNotifications}
                    className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground transition-all duration-150 relative"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Notifiche</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground transition-all duration-150">
                    <Settings className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Impostazioni</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <>
              <button
                onClick={onOpenNotifications}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground transition-all duration-150"
              >
                <div className="relative shrink-0">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">Notifiche</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground transition-all duration-150">
                <Settings className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Impostazioni</span>
              </button>
            </>
          )}

          {/* Connection Indicator */}
          <ConnectionIndicator collapsed={collapsed} />

          {/* User */}
          <div className={`flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-md bg-sidebar-accent/40 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground text-[10px] font-bold">MR</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-sidebar-accent-foreground truncate">Marco Rossi</p>
                <p className="text-[10px] text-sidebar-foreground truncate">Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[72px] w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors z-10"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
      </aside>
    </TooltipProvider>
  );
}