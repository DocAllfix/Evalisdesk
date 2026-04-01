export const PHASES = [
  { id: 1, name: "Contratto Firmato", short: "Contratto" },
  { id: 2, name: "Programmazione Verifica", short: "Verifica" },
  { id: 3, name: "Richiesta Proforma", short: "Proforma" },
  { id: 4, name: "Elaborazione Pratica", short: "Elaborazione" },
  { id: 5, name: "Firme", short: "Firme" },
];

export const PHASE_COLORS = {
  1: "phase-1",
  2: "phase-2",
  3: "phase-3",
  4: "phase-4",
  5: "phase-5",
};

export const TEAM = [
  { id: 1, name: "Marco Rossi", role: "Admin", initials: "MR", avatar: null },
  { id: 2, name: "Laura Bianchi", role: "Responsabile", initials: "LB", avatar: null },
  { id: 3, name: "Giuseppe Verde", role: "Operatore", initials: "GV", avatar: null },
  { id: 4, name: "Anna Ferrari", role: "Operatore", initials: "AF", avatar: null },
];

export const CLIENTS = [
  { id: 1, name: "Rossi Costruzioni Srl", contact: "Mario Rossi", email: "m.rossi@rossicostruzioni.it", phone: "+39 02 1234567", address: "Via Milano 42, 20100 Milano", activePratiche: 1 },
  { id: 2, name: "Bianchi Industriale SpA", contact: "Francesca Bianchi", email: "f.bianchi@bianchiind.it", phone: "+39 011 9876543", address: "Corso Torino 15, 10100 Torino", activePratiche: 1 },
  { id: 3, name: "Verde Logistics Srl", contact: "Paolo Verde", email: "p.verde@verdelogistics.it", phone: "+39 06 5551234", address: "Via Roma 88, 00100 Roma", activePratiche: 1 },
  { id: 4, name: "Alfa Manufacturing SpA", contact: "Sara Alfa", email: "s.alfa@alfamfg.it", phone: "+39 055 3334567", address: "Via Firenze 22, 50100 Firenze", activePratiche: 1 },
  { id: 5, name: "Beta Services Srl", contact: "Luca Beta", email: "l.beta@betaservices.it", phone: "+39 081 7778899", address: "Via Napoli 56, 80100 Napoli", activePratiche: 1 },
  { id: 6, name: "Gamma Alimentare Srl", contact: "Elena Gamma", email: "e.gamma@gammaalimentare.it", phone: "+39 051 2223344", address: "Via Bologna 31, 40100 Bologna", activePratiche: 1 },
];

export const PRATICHE = [
  {
    id: "PRT-2026-001",
    clientId: 1,
    clientName: "Rossi Costruzioni Srl",
    norms: ["ISO 9001"],
    cycle: "Certificazione",
    phase: 3,
    contactType: "Nuova Certificazione",
    assignedTo: TEAM[1],
    auditor: "Dott. Paolo Verdi",
    auditDate: "2026-05-15",
    auditLocation: "Sede Milano",
    deadline: "2026-04-20",
    documents: { contractReceived: true, auditScheduled: true, proformaIssued: false, documentsReceived: false },
    createdAt: "2026-02-15",
    completed: false,
  },
  {
    id: "PRT-2026-002",
    clientId: 2,
    clientName: "Bianchi Industriale SpA",
    norms: ["ISO 9001", "ISO 14001"],
    cycle: "Ricertificazione",
    phase: 4,
    contactType: "Audit Integrato",
    assignedTo: TEAM[2],
    auditor: "Dott.ssa Maria Conti",
    auditDate: "2026-04-28",
    auditLocation: "Stabilimento Torino",
    deadline: "2026-04-10",
    documents: { contractReceived: true, auditScheduled: true, proformaIssued: true, documentsReceived: false },
    createdAt: "2026-01-20",
    completed: false,
  },
  {
    id: "PRT-2026-003",
    clientId: 3,
    clientName: "Verde Logistics Srl",
    norms: ["ISO 45001"],
    cycle: "Prima Sorveglianza",
    phase: 2,
    contactType: "Sorveglianza",
    assignedTo: TEAM[3],
    auditor: "Dott. Andrea Bini",
    auditDate: null,
    auditLocation: "Sede Roma",
    deadline: "2026-05-30",
    documents: { contractReceived: true, auditScheduled: false, proformaIssued: false, documentsReceived: false },
    createdAt: "2026-03-01",
    completed: false,
  },
  {
    id: "PRT-2026-004",
    clientId: 4,
    clientName: "Alfa Manufacturing SpA",
    norms: ["SA 8000"],
    cycle: "Certificazione",
    phase: 1,
    contactType: "Nuova Certificazione",
    assignedTo: TEAM[1],
    auditor: null,
    auditDate: null,
    auditLocation: "Sede Firenze",
    deadline: "2026-06-15",
    documents: { contractReceived: true, auditScheduled: false, proformaIssued: false, documentsReceived: false },
    createdAt: "2026-03-10",
    completed: false,
  },
  {
    id: "PRT-2026-005",
    clientId: 5,
    clientName: "Beta Services Srl",
    norms: ["ISO 27001"],
    cycle: "Seconda Sorveglianza",
    phase: 5,
    contactType: "Sorveglianza",
    assignedTo: TEAM[2],
    auditor: "Dott. Carlo Marini",
    auditDate: "2026-04-05",
    auditLocation: "Sede Napoli",
    deadline: "2026-04-15",
    documents: { contractReceived: true, auditScheduled: true, proformaIssued: true, documentsReceived: true },
    createdAt: "2025-12-10",
    completed: false,
  },
  {
    id: "PRT-2026-006",
    clientId: 6,
    clientName: "Gamma Alimentare Srl",
    norms: ["ISO 22000"],
    cycle: "Certificazione",
    phase: 4,
    contactType: "Nuova Certificazione",
    assignedTo: TEAM[3],
    auditor: "Dott.ssa Lucia Fontana",
    auditDate: "2026-05-10",
    auditLocation: "Stabilimento Bologna",
    deadline: "2026-04-25",
    documents: { contractReceived: true, auditScheduled: true, proformaIssued: true, documentsReceived: true },
    createdAt: "2026-01-05",
    completed: false,
  },
];

export const NOTIFICATIONS = [
  { id: 1, type: "deadline", title: "Scadenza critica", message: "PRT-2026-002 — Bianchi Industriale scade tra 9 giorni", time: "2 ore fa", read: false, praticaId: "PRT-2026-002" },
  { id: 2, type: "phase", title: "Avanzamento fase", message: "PRT-2026-005 — Beta Services avanzata a Firme", time: "3 ore fa", read: false, praticaId: "PRT-2026-005" },
  { id: 3, type: "document", title: "Documento caricato", message: "PRT-2026-006 — Gamma Alimentare ha caricato il contratto", time: "5 ore fa", read: false, praticaId: "PRT-2026-006" },
  { id: 4, type: "message", title: "Nuovo commento", message: "Laura Bianchi ha commentato su PRT-2026-001", time: "1 giorno fa", read: true, praticaId: "PRT-2026-001" },
  { id: 5, type: "deadline", title: "Promemoria scadenza", message: "PRT-2026-005 — Beta Services scade tra 14 giorni", time: "1 giorno fa", read: true, praticaId: "PRT-2026-005" },
  { id: 6, type: "phase", title: "Avanzamento fase", message: "PRT-2026-003 — Verde Logistics avanzata a Programmazione Verifica", time: "2 giorni fa", read: true, praticaId: "PRT-2026-003" },
];

export const ACTIVITY_FEED = [
  { id: 1, user: "Laura Bianchi", action: "ha avanzato la pratica alla fase Firme", client: "Beta Services Srl", praticaId: "PRT-2026-005", time: "Oggi, 14:32" },
  { id: 2, user: "Giuseppe Verde", action: "ha caricato il certificato di audit", client: "Gamma Alimentare Srl", praticaId: "PRT-2026-006", time: "Oggi, 11:15" },
  { id: 3, user: "Anna Ferrari", action: "ha aggiornato la data di verifica", client: "Verde Logistics Srl", praticaId: "PRT-2026-003", time: "Oggi, 09:45" },
  { id: 4, user: "Marco Rossi", action: "ha creato una nuova pratica", client: "Alfa Manufacturing SpA", praticaId: "PRT-2026-004", time: "Ieri, 17:20" },
  { id: 5, user: "Laura Bianchi", action: "ha inviato richiesta proforma", client: "Rossi Costruzioni Srl", praticaId: "PRT-2026-001", time: "Ieri, 14:00" },
  { id: 6, user: "Giuseppe Verde", action: "ha confermato ricezione documenti", client: "Bianchi Industriale SpA", praticaId: "PRT-2026-002", time: "2 giorni fa" },
];

export function getDaysRemaining(deadline) {
  const now = new Date("2026-04-01");
  const dl = new Date(deadline);
  return Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
}

export function getUrgencyLevel(days) {
  if (days <= 15) return "critical";
  if (days <= 45) return "warning";
  return "ok";
}