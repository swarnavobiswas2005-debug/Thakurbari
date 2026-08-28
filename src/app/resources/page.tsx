"use client";

import React from "react";
import { FileText, Download, Bookmark, Landmark, ExternalLink } from "lucide-react";

export default function ResourcesPage() {
  const documents = [
    {
      title: "BNSS Section 479 Statutory Guide",
      desc: "Complete reference manual detailing maximum sentence calculations, first-time offender clauses, and penal exclusions.",
      size: "1.2 MB",
      format: "PDF"
    },
    {
      title: "Model Personal Bond Template",
      desc: "Standard form for submitting a release request to the Metropolitan Magistrate without requiring private sureties.",
      size: "245 KB",
      format: "DOCX"
    },
    {
      title: "Jail Superintendent Verification Form",
      desc: "Official template used to request the behavior and continuous detention certification from prison authorities.",
      size: "180 KB",
      format: "PDF"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative bg-transparent">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Bookmark className="w-4.5 h-4.5" /> Documentation
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Downloads & Resources
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Access legal manuals, standard petition forms, and official government circulars relating to undertrial release and the Bharatiya Nagarik Suraksha Sanhita.
        </p>
      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {documents.map((doc, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-[#010a12]/80 border border-white/10 flex flex-col justify-between h-56 hover:border-white/10 transition-colors">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <FileText className="w-6 h-6 text-sky-400" />
                <span className="text-[9px] text-muted-foreground font-mono bg-white/5 px-2 py-0.5 rounded uppercase">
                  {doc.format}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-tight">{doc.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {doc.desc}
              </p>
            </div>

            <button
              onClick={() => {
                const blob = new Blob([`Mock contents for: ${doc.title}`], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${doc.title.toLowerCase().replace(/ /g, "_")}.${doc.format.toLowerCase()}`;
                a.click();
              }}
              className="w-full py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Document ({doc.size})
            </button>
          </div>
        ))}
      </div>

      {/* External Links */}
      <div className="p-8 rounded-3xl glass-panel border border-white/5 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Landmark className="w-5 h-5 text-sky-400" />
          Government Resources & Circulars
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <a
            href="https://egazette.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between text-white"
          >
            <span>Ministry of Law and Justice: Official BNSS Act Gazette</span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
          <a
            href="https://nalsa.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between text-white"
          >
            <span>National Legal Services Authority (NALSA) Undertrial Dashboard</span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  );
}
