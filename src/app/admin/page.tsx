"use client";

import React, { useState } from "react";
import { User, ShieldAlert, Cpu, BarChart3, Clock, CheckCircle2, ChevronRight, Activity, Terminal, Shield } from "lucide-react";

export default function AdminPanel() {
  const [logs, setLogs] = useState([
    { time: "14:10:22", level: "INFO", src: "Consensus-Node-1", msg: "Block #14812 committed containing TX hash 0x8f23...5d48" },
    { time: "14:08:15", level: "INFO", src: "Draft-API", msg: "Successfully translated draft petition (ID: BB-4101) to Hindi." },
    { time: "14:02:40", level: "WARN", src: "Auth-Router", msg: "Failed login attempt from unauthorized host 192.168.1.104" },
    { time: "13:58:12", level: "INFO", src: "Hedera-Client", msg: "Consensus nodes network latency stable: 112ms avg" }
  ]);

  const [usersList, setUsersList] = useState([
    { id: 1, name: "Adv. Swati Gupta", email: "swati@legal.org", role: "Advocate", status: "Approved" },
    { id: 2, name: "Karan Johar", email: "karan@tiharnet.gov.in", role: "Jail Officer", status: "Pending Review" },
    { id: 3, name: "Rahul Verma", email: "rahul@lawschool.edu", role: "Law Student", status: "Approved" }
  ]);

  const approveUser = (id: number) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: "Approved" } : u));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative">
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header info */}
      <div className="space-y-4 max-w-3xl border-b border-white/5 pb-8">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Shield className="w-4.5 h-4.5" /> Administrative control
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Admin Control Panel
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Verify pending system registration access requests, review cryptographic node diagnostic logs, and monitor container performance parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Users Approval List */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">User Registrations Awaiting Action</h3>

          <div className="p-4 rounded-3xl bg-[#010a12]/80 border border-white/10 overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5 text-muted-foreground font-semibold">
                  <th className="pb-3 pl-2">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.01]">
                    <td className="py-4 pl-2 font-semibold text-white">{user.name}</td>
                    <td className="py-4 text-muted-foreground font-mono text-[11px]">{user.email}</td>
                    <td className="py-4 text-slate-300">{user.role}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        user.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      {user.status === "Pending Review" && (
                        <button
                          onClick={() => approveUser(user.id)}
                          className="px-2.5 py-1 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-semibold cursor-pointer text-[10px]"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Logs Terminal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4.5 h-4.5 text-sky-400" />
              Consensus Node Logs
            </h3>

            <div className="bg-[#010e1a] rounded-xl p-4 font-mono text-[9px] text-sky-300 space-y-3 h-64 overflow-y-auto scrollbar-thin">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-muted-foreground mb-1">
                    <span>{log.time} - {log.src}</span>
                    <span className={log.level === "WARN" ? "text-yellow-400" : "text-sky-400"}>
                      [{log.level}]
                    </span>
                  </div>
                  <p className="text-white leading-relaxed">{log.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
