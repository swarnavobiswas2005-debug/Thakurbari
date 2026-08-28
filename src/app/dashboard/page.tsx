"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, Calendar, ShieldAlert, Award, FileText, CheckCircle, Clock, Bell, RefreshCw, UserCheck, MapPin } from "lucide-react";

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-8 text-left relative">
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header and top controls */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Executive Dashboard
          </h1>
          <p className="text-xs text-muted-foreground">
            Real-time insights and monitoring of Section 479 statutory compliance nationwide.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Stats
          </button>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-xl font-mono">
            LIVE NETWORK
          </span>
        </div>
      </div>

      {/* 1. OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Total cases */}
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Checked</span>
            <BarChart3 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">25,480</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +12% this month
          </div>
        </div>

        {/* Eligible cases */}
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-wider">Eligible (479)</span>
            <UserCheck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-sky-300">18,290</div>
          <div className="text-[9px] text-muted-foreground">71.7% of total checked</div>
        </div>

        {/* Applications generated */}
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-wider">Drafts Created</span>
            <FileText className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">12,480</div>
          <div className="text-[9px] text-emerald-400">68.2% draft conversion</div>
        </div>

        {/* Blockchain records */}
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-wider">Mined Ledger Logs</span>
            <Award className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">12,480</div>
          <div className="text-[9px] text-emerald-400">100% cryptographic consensus</div>
        </div>

        {/* Pending Cases */}
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Court</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">5,420</div>
          <div className="text-[9px] text-muted-foreground">Awaiting judicial signs</div>
        </div>

        {/* Released Cases */}
        <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-wider">Confirmed Release</span>
            <CheckCircle className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">3,892</div>
          <div className="text-[9px] text-emerald-400 font-semibold">71.8% success rate</div>
        </div>
      </div>

      {/* 2. ANALYTICS & CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Wave Chart (SVG) */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-panel border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Monthly Case Logging Trends</h3>
            <span className="text-[10px] text-muted-foreground">Jan 2026 - Jul 2026</span>
          </div>

          <div className="relative h-60 w-full flex items-end pt-4">
            {/* SVG Line path representing wave */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Gradient fill underneath line */}
              <path
                d="M 0 200 Q 100 120 200 160 T 400 80 T 600 50 L 600 240 L 0 240 Z"
                fill="url(#chartGrad)"
              />
              {/* Main vector line */}
              <path
                d="M 0 200 Q 100 120 200 160 T 400 80 T 600 50"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data dots */}
              <circle cx="100" cy="155" r="4.5" fill="#38bdf8" stroke="#021324" strokeWidth="1.5" />
              <circle cx="200" cy="160" r="4.5" fill="#38bdf8" stroke="#021324" strokeWidth="1.5" />
              <circle cx="300" cy="115" r="4.5" fill="#38bdf8" stroke="#021324" strokeWidth="1.5" />
              <circle cx="400" cy="80" r="4.5" fill="#38bdf8" stroke="#021324" strokeWidth="1.5" />
              <circle cx="500" cy="65" r="4.5" fill="#38bdf8" stroke="#021324" strokeWidth="1.5" />
              <circle cx="600" cy="50" r="4.5" fill="#38bdf8" stroke="#021324" strokeWidth="1.5" />
            </svg>

            {/* Labels overlay */}
            <div className="absolute bottom-0 w-full flex justify-between text-[8px] text-muted-foreground px-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul (Current)</span>
            </div>
          </div>
        </div>

        {/* Circular progress Success Rate ring */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-white/5 flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Release Success Rate</h3>

          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="72" 
                  cy="72" 
                  r="60" 
                  stroke="#10b981" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={376.8}
                  strokeDashoffset={376.8 * (1 - 0.718)} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-2xl font-black text-white">71.8%</div>
                <div className="text-[8px] uppercase tracking-wide text-muted-foreground mt-0.5">Court Release</div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
            Percentage of filed AI applications logged on the Hedera node network that result in a judicial release order.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State-wise Activity comparison */}
        <div className="lg:col-span-6 p-6 rounded-3xl glass-panel border border-white/5 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">State Activity Comparison</h3>
          
          <div className="space-y-4">
            {/* Delhi */}
            <div className="space-y-1.5 text-xs text-left">
              <div className="flex justify-between font-semibold text-white">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400" /> Delhi</span>
                <span>8,420 Checked / 2,120 Released</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 flex overflow-hidden">
                <div className="bg-sky-400 h-full rounded-l-full" style={{ width: "70%" }} />
                <div className="bg-emerald-400 h-full rounded-r-full" style={{ width: "22%" }} />
              </div>
            </div>

            {/* Maharashtra */}
            <div className="space-y-1.5 text-xs text-left">
              <div className="flex justify-between font-semibold text-white">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400" /> Maharashtra</span>
                <span>6,840 Checked / 1,220 Released</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 flex overflow-hidden">
                <div className="bg-sky-400 h-full rounded-l-full" style={{ width: "62%" }} />
                <div className="bg-emerald-400 h-full rounded-r-full" style={{ width: "18%" }} />
              </div>
            </div>

            {/* Uttar Pradesh */}
            <div className="space-y-1.5 text-xs text-left">
              <div className="flex justify-between font-semibold text-white">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400" /> Uttar Pradesh</span>
                <span>5,120 Checked / 420 Released</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 flex overflow-hidden">
                <div className="bg-sky-400 h-full rounded-l-full" style={{ width: "80%" }} />
                <div className="bg-emerald-400 h-full rounded-r-full" style={{ width: "8%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Case distribution by Offense Duration */}
        <div className="lg:col-span-6 p-6 rounded-3xl glass-panel border border-white/5 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Offense Maximum Sentence Distribution</h3>

          <div className="grid grid-cols-3 gap-4 h-32 items-end text-center">
            <div className="space-y-2">
              <div className="text-[10px] text-muted-foreground font-bold">1-2 Years Max</div>
              <div className="w-full bg-sky-500/10 border border-sky-500/20 rounded-t-lg h-20 flex items-end justify-center font-bold text-white text-[9px] pb-1">
                42%
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-muted-foreground font-bold">3-5 Years Max</div>
              <div className="w-full bg-sky-500/15 border border-sky-500/30 rounded-t-lg h-24 flex items-end justify-center font-bold text-sky-300 text-[9px] pb-1">
                48%
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-muted-foreground font-bold">7+ Years Max</div>
              <div className="w-full bg-sky-500/5 border border-white/5 rounded-t-lg h-8 flex items-end justify-center font-bold text-muted-foreground text-[9px] pb-1">
                10%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT ACTIVITY & NOTIFICATIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Activity Log */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-panel border border-white/5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Recent Logged Activities</h3>
          <div className="space-y-3.5 text-xs text-left">
            <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
              <div>
                <span className="font-semibold text-white">Case BB-9238 listed for review</span>
                <p className="text-[10px] text-muted-foreground">Delhi District Court listed Section 479 petition before Magistrate Swati Gupta.</p>
              </div>
              <span className="text-[9px] text-muted-foreground shrink-0 font-mono">10m ago</span>
            </div>

            <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
              <div>
                <span className="font-semibold text-white">Block Height #14812 mined</span>
                <p className="text-[10px] text-muted-foreground">Consensus verification node #4 completed hash computation for case BB-9238.</p>
              </div>
              <span className="text-[9px] text-muted-foreground shrink-0 font-mono">15m ago</span>
            </div>

            <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
              <div>
                <span className="font-semibold text-white">Bail application generated</span>
                <p className="text-[10px] text-muted-foreground">Advocate Priya Deshmukh generated a Marathi application in Mumbai legal center.</p>
              </div>
              <span className="text-[9px] text-muted-foreground shrink-0 font-mono">1h ago</span>
            </div>
          </div>
        </div>

        {/* Alert/Notifications Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Bell className="w-4 h-4 text-sky-400 animate-swing" />
            System Notifications
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex items-start gap-2.5 text-left text-xs">
              <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Pending Statutory Alerts</span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  14 undertrial cases in Tihar Prison are approaching their 1/3 maximum sentence milestone next week.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-500/5 border border-sky-500/10 flex items-start gap-2.5 text-left text-xs">
              <Calendar className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">DLSA Review Scheduled</span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  General auditing of consensus blocks scheduled with Delhi State Legal Services Authority on 2nd August.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
