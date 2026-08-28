"use client";

import React from "react";
import { Compass, Scale, CheckCircle2, ChevronRight, HelpCircle, Eye, ShieldCheck, Database, Calendar } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      title: "Case Information Submission",
      desc: "Advocates or jail volunteers upload the basic parameters of the detainee, including the arrest date, offense sections, and maximum sentence constraints.",
      icon: <Calendar className="w-6 h-6 text-sky-400" />
    },
    {
      step: 2,
      title: "AI Eligibility Analysis",
      desc: "The system computes the fraction of time served relative to the offense maximum, checking for exclusions and applying first-offender 1/3 threshold reductions.",
      icon: <HelpCircle className="w-6 h-6 text-sky-400" />
    },
    {
      step: 3,
      title: "Automatic Bail Application Generation",
      desc: "bilblock formats a verified legal petition in English or regional languages, referencing BNSS 479, pre-filled and ready for advocate signature.",
      icon: <Scale className="w-6 h-6 text-sky-400" />
    },
    {
      step: 4,
      title: "Blockchain Recommendation Logging",
      desc: "The application is timestamped and its cryptographic hash is saved on a distributed consensus network, creating an un-erasable proof of service.",
      icon: <Database className="w-6 h-6 text-sky-400" />
    },
    {
      step: 5,
      title: "Public Verification",
      desc: "Prisons and legal aid supervisors verify the docket history using the public hash or Case ID, tracking review milestones transparently.",
      icon: <ShieldCheck className="w-6 h-6 text-sky-400" />
    },
    {
      step: 6,
      title: "Case Tracking Dashboard",
      desc: "NGO administrators and state authorities track progress metrics globally, identifying delays at specific prisons or courts.",
      icon: <Compass className="w-6 h-6 text-sky-400" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative bg-transparent">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Compass className="w-4.5 h-4.5" /> Platform Mechanics
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          How bilblock Operates
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          From the moment an undertrial is logged by a legal aid clinic, bilblock automates computations, structures documentation, and commits hashes to consensus nodes.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {steps.map((s) => (
          <div key={s.step} className="p-6 rounded-3xl bg-[#010a12]/80 border border-white/10 flex flex-col justify-between h-64">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {s.icon}
                </div>
                <span className="text-2xl font-black text-white/5 font-mono">0{s.step}</span>
              </div>
              <h3 className="text-base font-bold text-white leading-tight">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
