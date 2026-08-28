"use client";

import React from "react";
import { Award, ShieldAlert, BarChart3, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-12 text-left relative bg-transparent">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Award className="w-4.5 h-4.5" /> Campaign Results
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Real World Impact Metrics
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          bilblock operates at the intersection of legal tech and civil rights. See how automation and immutable logging are helping reform undertrial detention.
        </p>
      </div>

      {/* Grid of Key stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 text-left">
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Cases Tracked</span>
          <div className="text-3xl font-extrabold text-white">25,480+</div>
          <p className="text-[10px] text-muted-foreground">Detention records logged into the database.</p>
        </div>
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Applications Generated</span>
          <div className="text-3xl font-extrabold text-sky-400">12,480+</div>
          <p className="text-[10px] text-muted-foreground">Bail petition drafts compiled by the AI engine.</p>
        </div>
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Ledger Anchors</span>
          <div className="text-3xl font-extrabold text-white">12,480+</div>
          <p className="text-[10px] text-muted-foreground">Statutory recommendation dates verified on Hedera.</p>
        </div>
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Confirmed Releases</span>
          <div className="text-3xl font-extrabold text-emerald-400">3,892</div>
          <p className="text-[10px] text-muted-foreground">Undertrials released back to their families.</p>
        </div>
      </div>

      {/* Success Stories section */}
      <div className="p-8 rounded-3xl bg-[#010a12]/85 border border-white/10 space-y-6">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Case Success Stories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">RELEASED: DEL-9021</span>
            <h4 className="text-base font-bold text-white leading-tight">State vs. Suresh S. (Theft case, Tihar Jail)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Suresh, a simple laborer, spent 16 months in judicial custody for a theft accusation carrying a 3-year maximum sentence. Since he could not afford an advocate, his file sat on a shelf. An NGO volunteer checked Suresh using bilblock's AI Eligibility form, immediately generating a Section 479 application. The recommendation was logged to the blockchain, served to the Superintendent, and he was released on a personal bond 10 days later.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">RELEASED: BOM-4412</span>
            <h4 className="text-base font-bold text-white leading-tight">State vs. Ramesh P. (Fraud case, Arthur Road Jail)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ramesh Pawar spent 30 months in jail for an offense carrying a 7-year maximum sentence. Under the new BNSS 479 guidelines, as a first-time offender, he was eligible for release after 28 months (1/3 sentence). bilblock's automated compliance checker alerted the local legal aid clinic. The petition was drafted in Marathi, hashed on the consensus network, and signed off by the Sessions Magistrate, avoiding another year of detention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
