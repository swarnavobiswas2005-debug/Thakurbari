"use client";

import React from "react";
import { Info, Target, Eye, AlertCircle, Cpu, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-12 text-left relative bg-transparent">
      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Info className="w-4.5 h-4.5" /> About the Initiative
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Reforming Judicial Accessibility
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          bilblock is a legal-tech initiative dedicated to ensuring the fair implementation of Section 479 under India's Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, keeping prisoners from being lost in administrative bottlenecks.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="p-8 rounded-3xl bg-[#010a12]/80 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Target className="w-6 h-6 text-sky-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Mission</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            To accelerate the release of eligible, non-convicted undertrial prisoners by placing automated, zero-cost AI diagnostics and public ledger receipts directly in the hands of NGOs, advocates, and civil society.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#010a12]/80 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Eye className="w-6 h-6 text-sky-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Vision</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A transparent and auditable legal ecosystem where statutory detention milestones are tracked autonomously, ensuring that poverty and lack of legal representation do not translate to indefinite imprisonment.
          </p>
        </div>
      </div>

      {/* The Problem details */}
      <div className="py-8 border-y border-white/5 space-y-6">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          The Undertrial Crisis in India
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-muted-foreground leading-relaxed">
          <p>
            India's prison cells are occupied by people who have not been convicted of any crime. According to prison statistics, over <span className="text-white font-bold">75% of prisoners</span> are undertrials awaiting court hearings. Many spend more time in detention than the maximum sentence they would face if found guilty.
          </p>
          <p>
            While statutory provisions like Section 479 of the BNSS mandate release on personal bond, the lack of centralized data, volunteer scarcity, and manual paperwork backlogs cause these opportunities to get lost in administrative files.
          </p>
        </div>
      </div>

      {/* Tech Stack and Team */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3">
          <Cpu className="w-6 h-6 text-sky-400" />
          <h4 className="text-sm font-bold text-white">AI Automation</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Statutory calculators translate offense penal sections and arrest dates to compute served thresholds, converting outcomes into formatted legal petitions.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3">
          <Shield className="w-6 h-6 text-sky-400" />
          <h4 className="text-sm font-bold text-white">Distributed Ledger</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            We write transaction hashes to Hedera Hashgraph to form public, audit-ready receipts, making statutory recommendation dates immutable.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3">
          <Users className="w-6 h-6 text-sky-400" />
          <h4 className="text-sm font-bold text-white">Collaborative Network</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Empowering DLSA clinics, legal aid defense counsels (LADC), and human rights legal networks to work in a unified casework space.
          </p>
        </div>
      </div>
    </div>
  );
}
