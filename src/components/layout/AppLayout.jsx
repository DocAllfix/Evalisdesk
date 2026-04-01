import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NotificationPanel from "./NotificationPanel";

export default function AppLayout() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-poppins flex">
      <Sidebar onOpenNotifications={() => setNotificationsOpen(true)} />
      {/* Main content — offset by sidebar (220px open, 56px collapsed — handled via CSS var or fixed margin) */}
      <div className="flex-1 flex flex-col min-h-screen pl-[220px] transition-all duration-300" id="main-content">
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