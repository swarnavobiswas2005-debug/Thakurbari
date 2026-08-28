"use client";

import React, { useState } from "react";
import { User, Key, FileCheck, CheckCircle, Award, Database, HelpCircle } from "lucide-react";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Adv. Priya Deshmukh");
  const [profileEmail, setProfileEmail] = useState("priya@humanrightsbail.org");
  const [profileOrg, setProfileOrg] = useState("Human Rights & Legal Aid Foundation");
  const [hederaAccountId, setHederaAccountId] = useState("0.0.3849102");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4 max-w-3xl border-b border-white/5 pb-8">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <User className="w-4.5 h-4.5" /> Identity & settings
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          User Profile Workspace
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Manage your personal information, verify organization affiliations, and inspect associated Hedera Hashgraph cryptographic node parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Settings Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-3xl bg-[#010a12]/80 border border-white/10 space-y-5 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Account Particulars</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold">User Name</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white font-semibold">Affiliated Institution</label>
              <input
                type="text"
                required
                value={profileOrg}
                onChange={(e) => setProfileOrg(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="submit"
                className="liquid-glass rounded-xl px-6 py-3 text-xs font-bold text-white hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Save Profile Parameters
              </button>

              {isSaved && (
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Saved successfully
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Col: Ledger credentials & Credentials metrics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cryptographic keys container */}
          <div className="p-6 rounded-3xl glass-panel border border-white/5 space-y-5 text-xs text-left">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4.5 h-4.5 text-sky-400" />
              Ledger Node Credentials
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Consensus updates logged by this profile carry validation seals linked to this Hedera Hashgraph account credentials.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">
                  Hedera Account ID
                </label>
                <input
                  type="text"
                  readOnly
                  value={hederaAccountId}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sky-300 font-mono text-[10px] focus:outline-none cursor-default"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">
                  Cryptographic Private Key
                </label>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[10px] text-muted-foreground/45 select-none break-all truncate">
                  302e020100300506032b6570042204207f2a8ef68... (Protected)
                </div>
              </div>
            </div>
          </div>

          {/* Dossiers contribution stats */}
          <div className="p-6 rounded-3xl glass-panel border border-white/5 space-y-4 text-xs text-left">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4.5 h-4.5 text-sky-400" />
              Casework Contributions
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-foreground">AI Evaluations Run:</span>
                <span className="font-bold text-white">42 Cases</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-foreground">Bail Petitions Drafted:</span>
                <span className="font-bold text-white">18 Applications</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Consensus Blocks Written:</span>
                <span className="font-bold text-white">18 Blocks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
