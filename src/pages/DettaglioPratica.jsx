import React, { useState } from "react";
import { PRATICHE } from "@/lib/mockData";
import PraticaHeader from "@/components/dettaglio/PraticaHeader";
import PhaseStepper from "@/components/shared/PhaseStepper";
import InfoSection from "@/components/dettaglio/InfoSection";
import CommunicationFeed from "@/components/dettaglio/CommunicationFeed";
import RightPanel from "@/components/dettaglio/RightPanel";
import AvanzaFaseModal from "@/components/dettaglio/AvanzaFaseModal";
import BloccoDocumentiAlert from "@/components/dettaglio/BloccoDocumentiAlert";
import StatoPraticaBanner from "@/components/dettaglio/StatoPraticaBanner";

export default function DettaglioPratica() {
  const [avanzaOpen, setAvanzaOpen] = useState(false);
  const path = window.location.pathname;
  const praticaId = path.split("/pratiche/")[1];
  const pratica = PRATICHE.find((p) => p.id === praticaId);

  if (!pratica) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Pratica non trovata</p>
      </div>
    );
  }

  const hasMissingDocs = Object.values(pratica.documents).some((v) => !v);

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Status banners */}
      {pratica.status && <StatoPraticaBanner status={pratica.status} />}
      {hasMissingDocs && <BloccoDocumentiAlert documents={pratica.documents} />}

      <PraticaHeader pratica={pratica} onAvanza={() => setAvanzaOpen(true)} />

      {/* Phase Stepper */}
      <div className="bg-card rounded-xl border border-border p-5">
        <PhaseStepper currentPhase={pratica.phase} />
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-5">
          <InfoSection pratica={pratica} />
          <CommunicationFeed />
        </div>
        <div className="lg:col-span-2">
          <RightPanel pratica={pratica} />
        </div>
      </div>

      <AvanzaFaseModal open={avanzaOpen} onClose={() => setAvanzaOpen(false)} pratica={pratica} />
    </div>
  );
}