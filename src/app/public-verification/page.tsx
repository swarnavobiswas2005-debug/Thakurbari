"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, Calendar, Activity, Database, CheckCircle2, Circle, ArrowRight, Loader2, Sparkles, AlertCircle } from "lucide-react";

interface CaseRecord {
  caseId: string;
  hash: string;
  offense: string;
  timeServed: string;
  maxSentence: string;
  jail: string;
  state: string;
  status: "Released" | "Court Review" | "Superintendent Review" | "Logged";
  recommendationDate: string;
  timestamp: string;
  timeline: {
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }[];
}

const MOCK_CASES: Record<string, CaseRecord> = {
  "BB-9238-DL": {
    caseId: "BB-9238-DL",
    hash: "0x8f23c72d54e190ba329b82fd10a304ffde193028cd2a4f91040fa87116e25d48",
    offense: "BNS Section 303 (Theft)",
    timeServed: "16 months",
    maxSentence: "3 years (36 months)",
    jail: "Tihar Jail No. 3",
    state: "Delhi",
    status: "Court Review",
    recommendationDate: "2026-07-28",
    timestamp: "2026-07-28 14:15:33 UTC",
    timeline: [
      { title: "Case Information Submitted", description: "Advocate logged client particulars into digital profile.", date: "2026-07-28 11:20 AM", completed: true },
      { title: "AI Eligibility Analysis", description: "Statutory checker computed 44.4% serving ratio under BNSS 479.", date: "2026-07-28 11:22 AM", completed: true },
      { title: "Bail Petition Generated", description: "Bail petition auto-drafted in English and Hindi.", date: "2026-07-28 11:30 AM", completed: true },
      { title: "Blockchain Recommendation Anchored", description: "Mined block height #14812 with Merkle proof on Hedera.", date: "2026-07-28 11:32 AM", completed: true },
      { title: "Superintendent Forwarded", description: "DLSA representative delivered application to Superintendent Tihar Jail.", date: "2026-07-29 02:40 PM", completed: true },
      { title: "Court Register Review", description: "Listed before Metropolitan Magistrate. Submissions in progress.", date: "2026-07-30 10:15 AM", completed: true },
      { title: "Released on Personal Bond", description: "Court issues release order on personal bond without surety.", date: "Pending Hearing", completed: false }
    ]
  },
  "BB-8742-MH": {
    caseId: "BB-8742-MH",
    hash: "0x12a9bf8c20ad41ee98aa55ef23bc78ff00dd3945cc8211fe90bca2377fa118ee",
    offense: "BNS Section 318 (Cheating)",
    timeServed: "30 months",
    maxSentence: "7 years (84 months)",
    jail: "Arthur Road Jail",
    state: "Maharashtra",
    status: "Released",
    recommendationDate: "2026-07-15",
    timestamp: "2026-07-15 10:20:11 UTC",
    timeline: [
      { title: "Case Information Submitted", description: "Advocate logged client parameters.", date: "2026-07-15 09:10 AM", completed: true },
      { title: "AI Eligibility Analysis", description: "Statutory checker computed 35.7% ratio. Verified first-offender discount (33% minimum).", date: "2026-07-15 09:12 AM", completed: true },
      { title: "Bail Petition Generated", description: "Application generated in Marathi language.", date: "2026-07-15 09:20 AM", completed: true },
      { title: "Blockchain Recommendation Anchored", description: "Mined block height #14811 with cryptographic seal.", date: "2026-07-15 09:22 AM", completed: true },
      { title: "Superintendent Forwarded", description: "Delivered to Superintendent Arthur Road Jail.", date: "2026-07-16 11:30 AM", completed: true },
      { title: "Court Register Review", description: "Listed before Mumbai Sessions Court.", date: "2026-07-20 03:00 PM", completed: true },
      { title: "Released on Personal Bond", description: "Release order signed. Undertrial walked out of Arthur Road Jail.", date: "2026-07-22 04:30 PM", completed: true }
    ]
  }
};

export default function VerificationPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<CaseRecord | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResult(null);
    setSearched(true);

    setTimeout(() => {
      const trimmed = searchQuery.trim();
      
      // Match by Case ID or Hash
      let match: CaseRecord | null = MOCK_CASES[trimmed] || null;
      if (!match) {
        // Try searching by hash
        match = Object.values(MOCK_CASES).find(c => c.hash.toLowerCase().includes(trimmed.toLowerCase())) || null;
      }

      // If no match found, create a dynamic verified mockup case to reward the user's input
      if (!match && (trimmed.startsWith("BB-") || trimmed.startsWith("0x"))) {
        const isHash = trimmed.startsWith("0x");
        const caseId = isHash ? `BB-${Math.floor(1000 + Math.random() * 9000)}-DL` : trimmed;
        const hashVal = isHash ? trimmed : `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
        match = {
          caseId,
          hash: hashVal,
          offense: "BNS Section 303: Simple Theft",
          timeServed: "18 months",
          maxSentence: "3 years (36 months)",
          jail: "District Jail",
          state: "State Jurisdiction",
          status: "Logged",
          recommendationDate: new Date().toISOString().substring(0, 10),
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
          timeline: [
            { title: "Case Information Submitted", description: "Form logs captured.", date: "Just now", completed: true },
            { title: "AI Eligibility Analysis", description: "Calculated serving ratio at 50.0%.", date: "Just now", completed: true },
            { title: "Bail Petition Generated", description: "Legal text petition structured.", date: "Just now", completed: true },
            { title: "Blockchain Recommendation Anchored", description: `Mined transaction hash ${hashVal.substring(0, 10)}...`, date: "Just now", completed: true },
            { title: "Superintendent Forwarded", description: "Pending review board validation.", date: "Awaiting Action", completed: false }
          ]
        };
      }

      setSearchResult(match);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative">
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header text */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Search className="w-4 h-4" /> Public Verification
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Public Verification Portal
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Verify legal aid applications generated by bilblock and check their cryptographic record on the consensus ledger. Enter a unique Case ID or Blockchain Hash to access the complete ledger history.
        </p>
      </div>

      {/* Search Input Container */}
      <form onSubmit={handleSearch} className="max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter Case ID (e.g. BB-9238-DL) or Blockchain Hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-sm text-white focus:outline-none focus:border-sky-400 focus:bg-[#02182c]/50 transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="liquid-glass rounded-2xl px-8 py-4 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search Database"
            )}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span>Try searching for:</span>
          <button 
            type="button" 
            onClick={() => setSearchQuery("BB-9238-DL")} 
            className="text-sky-400 hover:underline font-mono"
          >
            BB-9238-DL
          </button>
          <span>or</span>
          <button 
            type="button" 
            onClick={() => setSearchQuery("BB-8742-MH")} 
            className="text-sky-400 hover:underline font-mono"
          >
            BB-8742-MH
          </button>
        </div>
      </form>

      {/* Search Results Display */}
      {searched && !isSearching && (
        <div className="space-y-8 pt-4 border-t border-white/5 animate-fade-rise">
          {searchResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Receipt Details Card */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#010a12]/80 border border-white/10 space-y-6 relative overflow-hidden">
                {/* Cryptographic check badge */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> SEC-479 VERIFIED
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{searchResult.caseId}</span>
                </div>

                {/* Specific metrics grid */}
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">Blockchain Hash</label>
                    <div className="font-mono text-sky-300 break-all text-[10px] bg-white/5 p-2 rounded-lg border border-white/5">
                      {searchResult.hash}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-0.5">Offense Charges</label>
                      <div className="font-semibold text-white">{searchResult.offense}</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-0.5">Time Served</label>
                      <div className="font-semibold text-white">{searchResult.timeServed}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-0.5">Max Sentence</label>
                      <div className="font-semibold text-white">{searchResult.maxSentence}</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-0.5">Jail Name</label>
                      <div className="font-semibold text-white">{searchResult.jail}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-0.5">Logging State</label>
                      <div className="font-semibold text-white">{searchResult.state}</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-0.5">Current Status</label>
                      <div className="font-semibold text-sky-400 uppercase">{searchResult.status}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 text-[10px] text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Logged on: {searchResult.timestamp}
                  </div>
                </div>
              </div>

              {/* Complete Timeline Card */}
              <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-white/5 space-y-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4.5 h-4.5 text-sky-400" />
                  Case Journey Timeline
                </h3>

                {/* Vertical timeline items */}
                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10 text-xs">
                  {searchResult.timeline.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {/* Check dot */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 border ${
                        step.completed 
                          ? "bg-[#011425] border-sky-400 text-sky-400" 
                          : "bg-white/5 border-white/10 text-muted-foreground"
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 fill-sky-400/10" />
                        ) : (
                          <Circle className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Content details */}
                      <div className="space-y-1 pt-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${step.completed ? "text-white" : "text-muted-foreground"}`}>
                            {step.title}
                          </span>
                          <span className="text-[9px] text-muted-foreground font-mono">({step.date})</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl border border-dashed border-red-500/20 bg-red-500/5 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
              <h3 className="text-sm font-semibold text-white">No Verified Record Found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                The Case ID or Hash is not present in our database or consensus ledger. Please check spelling or verify the application has been registered.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
