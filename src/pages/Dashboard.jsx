import React from "react";
import { FolderKanban, AlertTriangle, CheckCircle, FileWarning } from "lucide-react";
import { Link } from "react-router-dom";
import { PRATICHE, getDaysRemaining } from "@/lib/mockData";
import StatsCard from "@/components/shared/StatsCard";
import DeadlinesTable from "@/components/dashboard/DeadlinesTable";
import PhaseDistribution from "@/components/dashboard/PhaseDistribution";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import NormePieChart from "@/components/dashboard/NormePieChart";
import PhaseBadge from "@/components/shared/PhaseBadge";
import UrgencyBadge from "@/components/shared/UrgencyBadge";

const PHASE_BORDER = {
  1: "border-phase-1", 2: "border-phase-2", 3: "border-phase-3",
  4: "border-phase-4", 5: "border-phase-5",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 18) return "Buonasera";
  if (h >= 13) return "Buon pomeriggio";
  return "Buongiorno";
}

function getItalianDate() {
  const now = new Date("2026-04-01");
  const giorni = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
  const mesi = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
  return `${giorni[now.getDay()]}, ${now.getDate()} ${mesi[now.getMonth()]} ${now.getFullYear()}`;
}

export default function Dashboard() {
  const activePratiche = PRATICHE.filter((p) => !p.completed);
  const criticalCount = activePratiche.filter((p) => getDaysRemaining(p.deadline) <= 15).length;
  const completedMonth = 4;
  const blockedCount = activePratiche.filter(
    (p) => p.phase === 4 && !p.documents.documentsReceived
  ).length;

  // "Le mie pratiche" — assigned to Marco Rossi (TEAM[0])
  const miePratiche = PRATICHE.filter((p) => p.assignedTo?.id === 1 && !p.completed).slice(0, 4);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-poppins font-medium text-foreground">{getGreeting()}, Marco 👋</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{getItalianDate()}</p>
      </div>

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
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PhaseDistribution />
          <NormePieChart />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />

      {/* Le mie pratiche */}
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <h3 className="text-lg font-poppins font-medium text-foreground">Le mie pratiche</h3>
          <span className="text-sm text-muted-foreground">({miePratiche.length} attive)</span>
        </div>
        <div className="space-y-2">
          {miePratiche.map((p) => (
            <div
              key={p.id}
              className={`bg-card rounded-lg border border-border px-4 py-3 flex items-center justify-between gap-4 hover:shadow-sm transition-shadow border-l-4 ${PHASE_BORDER[p.phase]}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{p.clientName}</p>
                  <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                    {p.norms.map((n) => (
                      <span key={n} className="text-[11px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{n}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <PhaseBadge phase={p.phase} short />
                <UrgencyBadge deadline={p.deadline} />
                <Link
                  to={`/pratiche/${p.id}`}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Apri →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/pratiche" className="text-sm text-primary hover:text-primary/80 font-medium mt-3 inline-block">
          Vedi tutte le mie pratiche →
        </Link>
      </div>
    </div>
  );
}