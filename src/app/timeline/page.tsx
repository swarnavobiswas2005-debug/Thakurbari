"use client";

import React, { useState } from "react";
import { Compass, Scale, CheckCircle2, ChevronRight, BookOpen, Clock, AlertTriangle, ShieldCheck, MapPin } from "lucide-react";

interface TimelineNode {
  step: number;
  title: string;
  shortDesc: string;
  fullDetail: string;
  statLabel: string;
  statVal: string;
  riskPoint: string;
  fixPoint: string;
}

const STAGES: TimelineNode[] = [
  {
    step: 1,
    title: "Case Submission",
    shortDesc: "Detention parameters uploaded.",
    fullDetail: "Advocates, NGOs, or prison volunteers enter fundamental client details: date of arrest, penal code sections, state jurisdiction, and previous convictions.",
    statLabel: "Average Manual Prep",
    statVal: "3-5 Days",
    riskPoint: "Rosters kept in offline paper format; records easily misplaced.",
    fixPoint: "Upload files securely and organize digitally in seconds."
  },
  {
    step: 2,
    title: "Eligibility Check",
    shortDesc: "Statutory parameters computed.",
    fullDetail: "bilblock AI evaluates time served relative to offense limits, automatically accounting for first-offender discounts (1/3 sentence served) or repeat thresholds (1/2 served).",
    statLabel: "Manual Assessment Time",
    statVal: "6-8 Months",
    riskPoint: "Jail superintendents do not run proactive calculations.",
    fixPoint: "Instant compliance math based on BNSS Section 479 rules."
  },
  {
    step: 3,
    title: "Application Generated",
    shortDesc: "Bail petition auto-drafted.",
    fullDetail: "The AI Legal Draft Generator designs a formal release application addressed to the relevant district court, using pre-filled case metrics in local vernacular languages.",
    statLabel: "Advocate Writing Cost",
    statVal: "₹5k-15k/case",
    riskPoint: "Poor undertrials cannot afford advocates to draft petitions.",
    fixPoint: "Generated instantly at zero cost, ready to copy/translate."
  },
  {
    step: 4,
    title: "Blockchain Anchored",
    shortDesc: "Merkle proof written to node.",
    fullDetail: "The recommendation hash, case initials, and timestamp are committed to a secure Hedera Hashgraph node, locking the status into public, immutable consensus records.",
    statLabel: "Consensus Timestamp",
    statVal: "<3 Seconds",
    riskPoint: "Authority boards can ignore recommendations, denying receipt.",
    fixPoint: "Publicly auditable, permanent ledger proof of statutory compliance."
  },
  {
    step: 5,
    title: "Jail Board Forwarded",
    shortDesc: "Application served to Superintendent.",
    fullDetail: "A digital receipt and physical application copy are served to the prison superintendent and Under Trial Review Committee (UTRC) to trigger internal administrative action.",
    statLabel: "Forwarding Delay",
    statVal: "1-2 Weeks",
    riskPoint: "Applications get lost in jail paperwork piles.",
    fixPoint: "Digital notifications and ledger tracking keep the case active."
  },
  {
    step: 6,
    title: "Judicial Court Review",
    shortDesc: "Case listed before District Magistrate.",
    fullDetail: "The Magistrate reviews the Section 479 eligibility metrics during periodic court listings, evaluating the personal bond application without requiring complex surety arguments.",
    statLabel: "Hearing Turnaround",
    statVal: "2-4 Weeks",
    riskPoint: "Bail hearings get repeatedly adjourned over surety disputes.",
    fixPoint: "Pre-verified compliance metrics speed up the judge's sign-off."
  },
  {
    step: 7,
    title: "Personal Bond Release",
    shortDesc: "Undertrial released from detention.",
    fullDetail: "On approval, the court issues a release order. The undertrial furnishes a personal bond (no financial security required) and is allowed to leave jail.",
    statLabel: "Final Processing Time",
    statVal: "24-48 Hours",
    riskPoint: "Release orders take days to transmit from court to jail.",
    fixPoint: "Immediate status updates confirm release, ending detention."
  }
];

export default function TimelinePage() {
  const [activeStep, setActiveStep] = useState<number>(2);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header info */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Compass className="w-4 h-4" /> Case Journey
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          The Undertrial Release Journey
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Follow the progress stages of an undertrial prisoner using bilblock, showing how AI automation and blockchain logging speed up and verify compliance under BNSS 479 compared to the traditional, manual system.
        </p>
      </div>

      {/* Horizontal timeline bar */}
      <div className="p-6 rounded-3xl glass-panel border border-white/5 overflow-x-auto scrollbar-thin">
        <div className="min-w-[800px] flex justify-between items-center relative py-6">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-[42px] h-[2px] bg-white/10 z-0" />
          <div 
            className="absolute left-6 top-[42px] h-[2px] bg-sky-400 transition-all duration-500 z-0"
            style={{ width: `${((activeStep - 1) / (STAGES.length - 1)) * 94}%` }}
          />

          {STAGES.map((node) => (
            <button
              key={node.step}
              onClick={() => setActiveStep(node.step)}
              className="flex flex-col items-center gap-3 relative z-10 focus:outline-none cursor-pointer group"
            >
              {/* Circle indicator */}
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                activeStep === node.step
                  ? "bg-[#011425] border-sky-400 text-sky-400 scale-110 shadow-lg shadow-sky-400/20"
                  : node.step < activeStep
                  ? "bg-sky-500 border-sky-500 text-white"
                  : "bg-[#021324] border-white/10 text-muted-foreground group-hover:border-white/20 group-hover:text-white"
              }`}>
                {node.step < activeStep ? <CheckCircle2 className="w-5 h-5 fill-sky-500 text-white" /> : node.step}
              </div>

              {/* Title short label */}
              <span className={`text-[10px] font-bold uppercase tracking-wider text-center max-w-[90px] transition-colors ${
                activeStep === node.step ? "text-white" : "text-muted-foreground group-hover:text-white"
              }`}>
                {node.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active step details panel */}
      {(() => {
        const activeNode = STAGES.find(s => s.step === activeStep)!;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-rise">
            {/* Left Col: Explanations */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#010a12]/80 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="text-4xl font-black text-sky-400/20 font-mono">0{activeNode.step}</div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-sky-400">Step Detail</div>
                  <h3 className="text-xl font-bold text-white">{activeNode.title}</h3>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeNode.fullDetail}
              </p>

              {/* Risk comparison block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs">
                  <div className="font-bold text-red-400 flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Traditional Risk
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {activeNode.riskPoint}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    bilblock Standard
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {activeNode.fixPoint}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Stat metrics card */}
            <div className="lg:col-span-5 p-8 rounded-3xl glass-panel border border-white/5 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Milestone Parameters</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">{activeNode.statLabel}</div>
                  <div className="text-3xl font-black text-white mt-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {activeNode.statVal}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3 text-xs">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    Recommended Protocol
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Under BNSS regulations, judicial and correctional officers are encouraged to clear eligible cases weekly. Use the checker to maintain compliant records.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className="text-xs text-muted-foreground hover:text-white transition-colors disabled:opacity-30"
                >
                  Previous Step
                </button>
                <button
                  disabled={activeStep === STAGES.length}
                  onClick={() => setActiveStep(prev => Math.min(STAGES.length, prev + 1))}
                  className="text-xs text-sky-400 hover:text-sky-300 font-bold transition-colors disabled:opacity-30"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
