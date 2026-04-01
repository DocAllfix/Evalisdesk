import React from "react";
import { FolderKanban, AlertTriangle, CheckCircle, FileWarning } from "lucide-react";
import { PRATICHE, getDaysRemaining } from "@/lib/mockData";
import StatsCard from "@/components/shared/StatsCard";
import DeadlinesTable from "@/components/dashboard/DeadlinesTable";
import PhaseDistribution from "@/components/dashboard/PhaseDistribution";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

export default function Dashboard() {
  const activePratiche = PRATICHE.filter((p) => !p.completed);
  const criticalCount = activePratiche.filter((p) => getDaysRemaining(p.deadline) <= 15).length;
  const completedMonth = 4;
  const blockedCount = activePratiche.filter(
    (p) => p.phase === 4 && !p.documents.documentsReceived
  ).length;

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Pratiche Attive"
          value={activePratiche.length}
          icon={FolderKanban}
          color="bg-primary"
          trend={12}
          trendLabel="vs mese scorso"
        />
        <StatsCard
          title="Scadenze Critiche"
          value={criticalCount}
          icon={AlertTriangle}
          color="bg-destructive"
          trend={-8}
          trendLabel="vs mese scorso"
        />
        <StatsCard
          title="Completate questo Mese"
          value={completedMonth}
          icon={CheckCircle}
          color="bg-success"
          trend={25}
          trendLabel="vs mese scorso"
        />
        <StatsCard
          title="Bloccate (Doc. Mancanti)"
          value={blockedCount}
          icon={FileWarning}
          color="bg-warning"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <DeadlinesTable />
        </div>
        <div className="lg:col-span-2">
          <PhaseDistribution />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}