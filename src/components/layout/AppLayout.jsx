import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NotificationPanel from "./NotificationPanel";

export default function AppLayout() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Sidebar onOpenNotifications={() => setNotificationsOpen(true)} />
      {/* ml matches sidebar width — sidebar handles its own collapse internally */}
      <div className="ml-[240px] transition-all duration-300 flex flex-col min-h-screen">
        <Header onOpenNotifications={() => setNotificationsOpen(true)} />
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <NotificationPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}