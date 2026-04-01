import React from "react";
import { TEAM } from "@/lib/mockData";
import { Shield, Mail, Phone } from "lucide-react";

const ROLE_COLORS = {
  Admin: "bg-primary/10 text-primary border-primary/20",
  Responsabile: "bg-secondary/10 text-secondary border-secondary/20",
  Operatore: "bg-success/10 text-success border-success/20",
};

export default function Consulenti() {
  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {TEAM.map((member) => (
          <div key={member.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all duration-200 group text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
              <span className="text-lg font-semibold text-primary">{member.initials}</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground">{member.name}</h3>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border mt-2 ${ROLE_COLORS[member.role]}`}>
              {member.role}
            </span>
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5" />
                <span>{member.name.toLowerCase().replace(" ", ".")}@certdesk.it</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-3.5 h-3.5" />
                <span>3 pratiche assegnate</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}