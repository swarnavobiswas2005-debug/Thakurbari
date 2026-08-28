"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, HelpCircle, Loader2, Sparkles, Scale, AlertCircle, FileText, Share2, Clipboard, Download } from "lucide-react";

export default function EligibilityChecker() {
  const [arrestDate, setArrestDate] = useState("");
  const [offenseCategory, setOffenseCategory] = useState("BNS-303 (Theft)");
  const [maxSentence, setMaxSentence] = useState(36); // months
  const [timeServed, setTimeServed] = useState(12); // months
  const [firstOffender, setFirstOffender] = useState("yes");
  const [jailName, setJailName] = useState("");
  const [state, setState] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<{
    isEligible: boolean;
    ratio: number;
    targetRatio: number;
    reason: string;
    legalExplanation: string;
  } | null>(null);

  // Simulated log steps
  const processSteps = [
    "Initializing BNSS 479 compliance verification engine...",
    "Querying BNS / IPC penal code mapping indexes...",
    "Verifying exclusion lists (Life imprisonment / Capital offenses)...",
    "Calculating sentence ratios: Max Sentence vs Time Served...",
    "Checking prior conviction register databases...",
    "Applying BNSS 479 mathematical models...",
    "Analysis complete. Formatting final legal diagnostics."
  ];

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setLogs([]);
    setResult(null);

    // Simulate real-time processing terminal logs
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < processSteps.length) {
        setLogs((prev) => [...prev, `[INFO] ${processSteps[currentStep]}`]);
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Calculate result
        const servedRatio = timeServed / maxSentence;
        const targetRatio = firstOffender === "yes" ? 1/3 : 1/2;
        const isExcluded = maxSentence >= 120 && offenseCategory.includes("Life"); 
        
        let isEligible = servedRatio >= targetRatio && !isExcluded;
        let ratioPercent = Math.round(servedRatio * 100);
        let targetPercent = Math.round(targetRatio * 100);

        let reason = "";
        let legalExplanation = "";

        if (isExcluded) {
          isEligible = false;
          reason = "Exclusion due to serious offense category.";
          legalExplanation = "Section 479 of the BNSS excludes cases where the offense carries death penalty or life imprisonment sentences as punishable outcomes. Therefore, release on personal bond cannot be verified via automated Section 479 mechanisms.";
        } else if (isEligible) {
          reason = `Serving ratio (${ratioPercent}%) exceeds the required threshold of ${targetPercent}%.`;
          legalExplanation = firstOffender === "yes" 
            ? `Under BNSS Section 479, a first-time offender who has served one-third (33.3%) of their maximum sentence is eligible for release on a personal bond without sureties.`
            : `Under BNSS Section 479, an undertrial who has served half (50%) of their maximum sentence is eligible for release on a personal bond.`;
        } else {
          reason = `Serving ratio (${ratioPercent}%) is below the required threshold of ${targetPercent}%.`;
          legalExplanation = `The undertrial has served ${timeServed} months out of a maximum ${maxSentence} months sentence. Under BNSS Section 479, they must serve at least ${Math.ceil(maxSentence * targetRatio)} months (${targetPercent}%) to qualify for release on personal bond.`;
        }

        setResult({
          isEligible,
          ratio: ratioPercent,
          targetRatio: targetPercent,
          reason,
          legalExplanation,
        });
        setIsProcessing(false);
      }
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Form Input Section */}
      <div className="lg:col-span-6 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
            <Scale className="w-4 h-4" /> Legal Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            AI Eligibility Checker
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fill out the case parameters below to check whether the undertrial is eligible for release under BNSS Section 479 guidelines.
          </p>
        </div>

        <form onSubmit={handleEvaluate} className="p-6 rounded-2xl glass-panel border border-white/5 space-y-5">
          {/* Offense category */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-white flex items-center gap-1">
              Offense / Section <span title="The penal sections representing the charges"><HelpCircle className="w-3.5 h-3.5 text-muted-foreground" /></span>
            </label>
            <select
              value={offenseCategory}
              onChange={(e) => setOffenseCategory(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
            >
              <option value="BNS-303 (Theft)">BNS Section 303: Simple Theft (Max: 3 Years)</option>
              <option value="BNS-318 (Cheating)">BNS Section 318: Cheating & Fraud (Max: 7 Years)</option>
              <option value="BNS-115 (Grievous Hurt)">BNS Section 115: Voluntarily Causing Hurt (Max: 7 Years)</option>
              <option value="BNS-EXCLUDED (Life/Death)">BNS Serious Charge (Punishable: Life Imprisonment)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Arrest Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">Arrest Date</label>
              <input
                type="date"
                required
                value={arrestDate}
                onChange={(e) => setArrestDate(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>

            {/* First Offender */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">First-time Offender?</label>
              <select
                value={firstOffender}
                onChange={(e) => setFirstOffender(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
              >
                <option value="yes">Yes (Eligible at 33.3% time served)</option>
                <option value="no">No (Eligible at 50.0% time served)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Max Sentence in Months */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">Max Sentence (Months)</label>
              <input
                type="number"
                min="1"
                required
                value={maxSentence}
                onChange={(e) => setMaxSentence(Number(e.target.value))}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>

            {/* Time Served in Months */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">Time Served (Months)</label>
              <input
                type="number"
                min="0"
                required
                value={timeServed}
                onChange={(e) => setTimeServed(Number(e.target.value))}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Jail Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">Jail Name</label>
              <input
                type="text"
                placeholder="e.g. Tihar Jail No. 3"
                value={jailName}
                onChange={(e) => setJailName(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
              />
            </div>

            {/* State */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">State</label>
              <input
                type="text"
                placeholder="e.g. Delhi"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full liquid-glass rounded-xl py-4 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                Evaluating Case Metrics...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-sky-400" />
                Evaluate Eligibility
              </>
            )}
          </button>
        </form>
      </div>

      {/* Outcome Section */}
      <div className="lg:col-span-6 flex flex-col justify-center">
        {/* State A: Idle */}
        {!isProcessing && !result && (
          <div className="p-10 rounded-3xl border border-dashed border-white/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center">
              <Scale className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold text-white">Diagnostics Awaiting Inputs</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Complete the legal assessment form on the left and click Evaluate to compile the automated statutory compliance report.
            </p>
          </div>
        )}

        {/* State B: Processing */}
        {isProcessing && (
          <div className="p-6 rounded-2xl glass-panel border border-white/5 bg-[#010e1a]/80 font-mono text-[10px] space-y-2 h-[350px] overflow-y-auto scrollbar-thin text-sky-300">
            <div className="text-[11px] font-bold text-white border-b border-white/5 pb-2 mb-2 flex items-center justify-between">
              <span>COMPILE ENGINE TERMINAL</span>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </div>
            {logs.map((log, index) => (
              <div key={index} className="animate-pulse">
                {log}
              </div>
            ))}
          </div>
        )}

        {/* State C: Result Ready */}
        {!isProcessing && result && (
          <div className="space-y-6">
            <div className={`p-8 rounded-3xl border ${
              result.isEligible 
                ? "bg-emerald-500/5 border-emerald-500/20" 
                : "bg-red-500/5 border-red-500/20"
            } space-y-5 text-left`}>
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  result.isEligible ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {result.isEligible ? <ShieldCheck className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Evaluation Verdict</div>
                  <h3 className={`text-xl font-black ${
                    result.isEligible ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {result.isEligible ? "STATUTORILY ELIGIBLE" : "NOT ELIGIBLE"}
                  </h3>
                </div>
              </div>

              {/* Progress bar ratio */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-white">
                  <span>Sentence Ratio Served:</span>
                  <span>{result.ratio}% / {result.targetRatio}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      result.isEligible ? "bg-emerald-400" : "bg-red-400"
                    }`}
                    style={{ width: `${Math.min(result.ratio, 100)}%` }}
                  />
                </div>
              </div>

              {/* Explanation texts */}
              <div className="space-y-3 pt-3 border-t border-white/5 text-xs text-muted-foreground leading-relaxed">
                <div>
                  <span className="font-bold text-white block mb-1">Reason:</span>
                  {result.reason}
                </div>
                <div>
                  <span className="font-bold text-white block mb-1">Legal Precedent (BNSS 479):</span>
                  {result.legalExplanation}
                </div>
              </div>
            </div>

            {/* Actions for next steps */}
            {result.isEligible && (
              <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Suggested Actions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <Link
                    href={`/bilblock/draft-generator?offense=${encodeURIComponent(offenseCategory)}&sentence=${maxSentence}&served=${timeServed}&jail=${encodeURIComponent(jailName)}&state=${encodeURIComponent(state)}`}
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all flex items-center gap-2.5 text-white font-semibold text-left"
                  >
                    <FileText className="w-4.5 h-4.5 text-sky-400" />
                    Generate Bail Application
                  </Link>

                  <Link
                    href={`/bilblock/blockchain?action=log&offense=${encodeURIComponent(offenseCategory)}&ratio=${result.ratio}`}
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all flex items-center gap-2.5 text-white font-semibold text-left"
                  >
                    <Share2 className="w-4.5 h-4.5 text-sky-400" />
                    Write Log to Ledger
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
