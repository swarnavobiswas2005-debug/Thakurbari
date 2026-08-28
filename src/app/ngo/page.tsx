"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Users, FilePlus2, Upload, FileSpreadsheet, Download, Search, CheckCircle2, AlertCircle, Clock, Trash2, ArrowRight, UserPlus, HelpCircle } from "lucide-react";

interface ClientCase {
  id: string;
  name: string;
  offense: string;
  jail: string;
  daysServed: number;
  maxSentenceDays: number;
  status: "Draft Ready" | "Sent to Jail" | "Released" | "Evaluating";
  volunteer: string;
}

const INITIAL_CLIENTS: ClientCase[] = [
  { id: "BB-4101", name: "Suresh Sharma", offense: "BNS 303 (Theft)", jail: "Tihar Jail No. 3", daysServed: 480, maxSentenceDays: 1095, status: "Draft Ready", volunteer: "Adv. Swati Gupta" },
  { id: "BB-8742", name: "Ramesh Pawar", offense: "BNS 318 (Cheating)", jail: "Arthur Road Jail", daysServed: 900, maxSentenceDays: 2555, status: "Released", volunteer: "Priya Deshmukh" },
  { id: "BB-1109", name: "Amit Yadav", offense: "BNS 115 (Assault)", jail: "Tihar Jail No. 1", daysServed: 365, maxSentenceDays: 2555, status: "Sent to Jail", volunteer: "Rahul Verma" },
  { id: "BB-5012", name: "Vikram Singh", offense: "BNS 303 (Theft)", jail: "Arthur Road Jail", daysServed: 120, maxSentenceDays: 1095, status: "Evaluating", volunteer: "Adv. Swati Gupta" }
];

export default function NgoPortal() {
  const [clients, setClients] = useState<ClientCase[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerRole, setVolunteerRole] = useState("Advocate");
  const [volunteers, setVolunteers] = useState([
    { name: "Adv. Swati Gupta", role: "Legal Counsel", activeCases: 2 },
    { name: "Priya Deshmukh", role: "NGO Director", activeCases: 1 },
    { name: "Rahul Verma", role: "Legal Aid Intern", activeCases: 1 }
  ]);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add a new volunteer
  const handleAddVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName.trim()) return;
    setVolunteers(prev => [
      ...prev,
      { name: volunteerName, role: volunteerRole, activeCases: 0 }
    ]);
    setVolunteerName("");
  };

  // Mock upload parser
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        
        // Attempt JSON parse first
        if (file.name.endsWith(".json")) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            const formatted: ClientCase[] = parsed.map((item, idx) => ({
              id: item.id || `BB-${Math.floor(1000 + Math.random() * 9000)}`,
              name: item.name || "Unknown Accused",
              offense: item.offense || "BNS 303 (Theft)",
              jail: item.jail || "District Jail",
              daysServed: Number(item.daysServed) || 365,
              maxSentenceDays: Number(item.maxSentenceDays) || 1095,
              status: item.status || "Evaluating",
              volunteer: item.volunteer || "Unassigned"
            }));
            setClients(prev => [...formatted, ...prev]);
            setUploadError("");
          } else {
            setUploadError("JSON must be an array of client objects.");
          }
        } 
        // Simple CSV parse
        else if (file.name.endsWith(".csv")) {
          const lines = text.split("\n").filter(l => l.trim());
          const newCases: ClientCase[] = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(",").map(c => c.trim());
            if (cols.length >= 4) {
              newCases.push({
                id: `BB-${Math.floor(1000 + Math.random() * 9000)}`,
                name: cols[0],
                offense: cols[1],
                jail: cols[2],
                daysServed: Number(cols[3]) || 180,
                maxSentenceDays: Number(cols[4]) || 1095,
                status: "Evaluating",
                volunteer: "Unassigned"
              });
            }
          }
          setClients(prev => [...newCases, ...prev]);
          setUploadError("");
        } else {
          setUploadError("Unsupported format. Please upload .json or .csv.");
        }
      } catch (err) {
        setUploadError("Error parsing file. Ensure correct JSON format.");
      }
    };
    reader.readAsText(file);
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.offense.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.jail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative">
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header and top stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-10">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
            <Users className="w-4.5 h-4.5" /> NGO Workspace
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            NGO Portal & Caseworks
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Monitor active undertrial dossiers, assign casework to volunteers, and bulk upload detention rosters to identify Section 479 eligibility automatically.
          </p>
        </div>

        {/* Portlet stats */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Dossiers</span>
            <div className="text-xl font-bold text-white mt-1">{clients.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Volunteers Allocated</span>
            <div className="text-xl font-bold text-sky-400 mt-1">{volunteers.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Client Monitoring Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Case Monitoring Registry</h3>
            
            {/* Search bar */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter dossiers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="p-4 rounded-3xl glass-panel border border-white/5 overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 text-muted-foreground font-semibold">
                  <th className="pb-3 pl-2">Case ID</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Charge</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Time Served</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredClients.map((client) => {
                  const percent = Math.round((client.daysServed / client.maxSentenceDays) * 100);
                  return (
                    <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pl-2 font-mono text-[10px] text-muted-foreground">{client.id}</td>
                      <td className="py-4 font-semibold text-white">{client.name}</td>
                      <td className="py-4 text-slate-300">{client.offense}</td>
                      <td className="py-4 text-muted-foreground">{client.jail}</td>
                      <td className="py-4 text-slate-300">
                        <div>{Math.round(client.daysServed / 30)}m / {Math.round(client.maxSentenceDays / 30)}m</div>
                        <div className="text-[9px] text-muted-foreground">{percent}% served</div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          client.status === "Released" ? "bg-emerald-500/10 text-emerald-400" :
                          client.status === "Draft Ready" ? "bg-sky-500/10 text-sky-400" :
                          client.status === "Sent to Jail" ? "bg-yellow-500/10 text-yellow-400" :
                          "bg-white/5 text-muted-foreground"
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2 space-x-2">
                        {client.status === "Draft Ready" && (
                          <Link
                            href={`/bilblock/draft-generator?offense=${encodeURIComponent(client.offense)}&jail=${encodeURIComponent(client.jail)}&sentence=${Math.round(client.maxSentenceDays/30)}&served=${Math.round(client.daysServed/30)}`}
                            className="text-[10px] text-sky-400 hover:underline font-semibold"
                          >
                            Open Draft
                          </Link>
                        )}
                        <button
                          onClick={() => deleteClient(client.id)}
                          className="text-[10px] text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Bulk Upload & Volunteer Management */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bulk upload block */}
          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4.5 h-4.5 text-sky-400" />
              Bulk Case Upload
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Upload prison inmate spreadsheets (.json or .csv) to auto-extract records and calculate Section 479 eligibility in bulk.
            </p>

            <div className="space-y-3">
              <input
                type="file"
                accept=".json,.csv"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-6 border border-dashed border-white/10 rounded-xl hover:border-sky-400 transition-colors bg-white/[0.01] hover:bg-sky-500/[0.02] flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-8 h-8 text-sky-400" />
                <span className="text-xs font-semibold text-white">Click to Upload Inmates List</span>
                <span className="text-[10px] text-muted-foreground">Supports .json arrays or standard CSVs</span>
              </button>

              {uploadError && (
                <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/10 text-[10px] text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> {uploadError}
                </div>
              )}

              {/* Sample files links for demo verification */}
              <div className="flex justify-between text-[9px] text-muted-foreground">
                <span>Need test data?</span>
                <button
                  onClick={() => {
                    const sampleJSON = [
                      { id: "BB-1090", name: "Karan Johar", offense: "BNS 303 (Theft)", jail: "Arthur Road Jail", daysServed: 400, maxSentenceDays: 1095, status: "Draft Ready" },
                      { id: "BB-1091", name: "Sanjay Dutt", offense: "BNS 115 (Assault)", jail: "Tihar Jail No. 4", daysServed: 800, maxSentenceDays: 2555, status: "Evaluating" }
                    ];
                    const blob = new Blob([JSON.stringify(sampleJSON, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "sample_inmates.json";
                    a.click();
                  }}
                  className="text-sky-400 hover:underline"
                >
                  Download Sample JSON
                </button>
              </div>
            </div>
          </div>

          {/* Volunteer roster */}
          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-sky-400" />
              Volunteer Registry
            </h3>

            <div className="space-y-3.5">
              {volunteers.map((vol, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div>
                    <div className="font-semibold text-white">{vol.name}</div>
                    <div className="text-[10px] text-muted-foreground">{vol.role}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded">
                    {vol.activeCases} active cases
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddVolunteer} className="pt-3 border-t border-white/5 flex gap-2">
              <input
                type="text"
                placeholder="Volunteer Name..."
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
