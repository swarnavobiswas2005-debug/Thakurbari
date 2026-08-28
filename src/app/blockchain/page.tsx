"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Database, Shield, Cpu, RefreshCw, Layers, CheckCircle2, ChevronRight, Play, Square, Loader2 } from "lucide-react";

interface Block {
  height: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  caseId: string;
  offense: string;
  status: "VERIFIED" | "MINED" | "PENDING";
  nodeName: string;
}

const INITIAL_BLOCKS: Block[] = [
  {
    height: 14812,
    hash: "0x8f23c72d54e190ba329b82fd10a304ffde193028cd2a4f91040fa87116e25d48",
    prevHash: "0x12a9bf8c20ad41ee98aa55ef23bc78ff00dd3945cc8211fe90bca2377fa118ee",
    timestamp: "2026-07-30 13:42:15",
    caseId: "BB-9238-DL",
    offense: "BNS Section 303 (Theft)",
    status: "VERIFIED",
    nodeName: "Consensus Node #4 (Delhi-DLSA)",
  },
  {
    height: 14811,
    hash: "0x12a9bf8c20ad41ee98aa55ef23bc78ff00dd3945cc8211fe90bca2377fa118ee",
    prevHash: "0x7d94e2ff10cc38deab7711ab44cd93ff00ee23bbff8399e211ab99fa00bc71ee",
    timestamp: "2026-07-30 13:20:44",
    caseId: "BB-8742-MH",
    offense: "BNS Section 318 (Fraud)",
    status: "VERIFIED",
    nodeName: "Consensus Node #2 (Mumbai-NGO-Net)",
  },
  {
    height: 14810,
    hash: "0x7d94e2ff10cc38deab7711ab44cd93ff00ee23bbff8399e211ab99fa00bc71ee",
    prevHash: "0x9f82c7a6b5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8",
    timestamp: "2026-07-30 12:55:01",
    caseId: "BB-6631-UP",
    offense: "BNS Section 115 (Assault)",
    status: "VERIFIED",
    nodeName: "Consensus Node #7 (UP-Legal-Aid)",
  }
];

function BlockchainLedger() {
  const searchParams = useSearchParams();
  const offenseParam = searchParams.get("offense") || "";
  const actionParam = searchParams.get("action") || "";

  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [isMining, setIsMining] = useState(false);
  const [autoMine, setAutoMine] = useState(true);
  const [mineLog, setMineLog] = useState<string[]>([]);

  // Function to mine a new block
  const mineBlock = (caseName?: string, charge?: string) => {
    setIsMining(true);
    setMineLog(["Initiating mining protocols...", "Fetching latest state block hash..."]);
    
    setTimeout(() => {
      setMineLog(prev => [...prev, "Compiling transaction hash..."]);
      setTimeout(() => {
        setMineLog(prev => [...prev, "Broadcasting to 8 validation consensus nodes..."]);
        setTimeout(() => {
          setBlocks((prev) => {
            const nextHeight = prev[0].height + 1;
            const prevHash = prev[0].hash;
            const randomHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
            const dateStr = new Date().toISOString().replace("T", " ").substring(0, 19);
            const randomState = ["DL", "MH", "UP", "KA", "TN", "WB"][Math.floor(Math.random() * 6)];
            const randomCaseId = `BB-${Math.floor(1000 + Math.random() * 9000)}-${randomState}`;
            const randomOffense = ["BNS Section 303 (Theft)", "BNS Section 318 (Fraud)", "BNS Section 115 (Assault)"][Math.floor(Math.random() * 3)];
            const randomNode = `Consensus Node #${Math.floor(1 + Math.random() * 8)}`;

            const newBlock: Block = {
              height: nextHeight,
              hash: randomHash,
              prevHash: prevHash,
              timestamp: dateStr,
              caseId: caseName || randomCaseId,
              offense: charge || randomOffense,
              status: "VERIFIED",
              nodeName: randomNode
            };
            return [newBlock, ...prev];
          });
          setIsMining(false);
          setMineLog([]);
        }, 600);
      }, 500);
    }, 500);
  };

  // Log from query params on page load
  useEffect(() => {
    if (actionParam === "log" && offenseParam) {
      // Mine the case parameter immediately
      mineBlock("BB-9921-ACTIVE", offenseParam);
    }
  }, [actionParam, offenseParam]);

  // Auto mining effect
  useEffect(() => {
    if (!autoMine) return;
    const interval = setInterval(() => {
      if (!isMining) {
        mineBlock();
      }
    }, 9000);
    return () => clearInterval(interval);
  }, [autoMine, isMining]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-12 text-left relative">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header and Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-12">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
            <Layers className="w-4 h-4" /> Cryptographic Ledger
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Blockchain Transparency Ledger
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            By logging case recommendations on a distributed public ledger, bilblock makes statutory reviews immutable. Jail superintendents, legal aid authorities, and court registers share a single, verifiable source of truth, eliminating lost applications and administrative denial.
          </p>
        </div>

        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">How it works</h3>
          {/* Timeline visualization */}
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[10px]">1</div>
              <div>
                <div className="font-semibold text-white">Case Evaluation</div>
                <div className="text-[10px] text-muted-foreground">AI checker calculates eligibility parameters.</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-bold text-[10px] text-sky-400">2</div>
              <div>
                <div className="font-semibold text-sky-400">Hash Generated</div>
                <div className="text-[10px] text-muted-foreground">Document contents hashed via SHA-256.</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[10px]">3</div>
              <div>
                <div className="font-semibold text-white">Consensus Logging</div>
                <div className="text-[10px] text-muted-foreground">Log stamped on Hedera consensus network node.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Simulation Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 text-sky-400" />
              Consensus Simulator
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              bilblock uses a private-public hybrid network to ledger cases. Watch blocks being minted in real-time by node operators.
            </p>

            <div className="flex gap-2.5">
              <button
                onClick={() => setAutoMine(!autoMine)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  autoMine 
                    ? "bg-sky-500/10 border-sky-500/20 text-sky-400 hover:bg-sky-500/20" 
                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                }`}
              >
                {autoMine ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    Stop Auto-Mine
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Auto-Mine
                  </>
                )}
              </button>

              <button
                onClick={() => mineBlock()}
                disabled={isMining}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isMining ? "animate-spin" : ""}`} />
                Force Block
              </button>
            </div>

            {/* Mining status logger */}
            {isMining && (
              <div className="p-4 rounded-xl bg-[#010e1a] border border-sky-500/15 font-mono text-[9px] text-sky-400 space-y-1">
                {mineLog.map((logStr, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-sky-400 animate-ping" />
                    {logStr}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Active Nodes</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-white font-medium">Node #1: Delhi High Court</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-white font-medium">Node #2: Mumbai Legal Aid</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-white font-medium">Node #3: Tihar Prisons</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Ledger list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Immutable Blockchain Preview</span>
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              {blocks.length} Blocks Registered
            </span>
          </div>

          {/* Ledger Stack container */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {blocks.map((block) => (
              <div
                key={block.height}
                className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col gap-4 font-mono relative overflow-hidden"
              >
                {/* Block header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-extrabold text-white">Block Height #{block.height}</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                      {block.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{block.timestamp}</span>
                </div>

                {/* Block data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] text-left text-muted-foreground">
                  <div className="space-y-1">
                    <div>
                      <span className="text-white font-semibold">Case Identifier:</span> {block.caseId}
                    </div>
                    <div>
                      <span className="text-white font-semibold">Legal Offense:</span> {block.offense}
                    </div>
                    <div>
                      <span className="text-white font-semibold">Logging Node:</span> {block.nodeName}
                    </div>
                  </div>

                  <div className="space-y-1 sm:border-l sm:border-white/5 sm:pl-4">
                    <div className="truncate">
                      <span className="text-white font-semibold block mb-0.5">Merkle Root Hash:</span>
                      <span className="text-sky-300 font-mono text-[9px]">{block.hash}</span>
                    </div>
                    <div className="truncate">
                      <span className="text-white font-semibold block mb-0.5">Parent Block Hash:</span>
                      <span className="text-[9px] font-mono">{block.prevHash}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlockchainPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm py-20">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading Ledger Terminal...
      </div>
    }>
      <BlockchainLedger />
    </Suspense>
  );
}
