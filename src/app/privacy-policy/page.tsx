"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left">
      <div className="space-y-4 max-w-2xl border-b border-white/5 pb-8">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <Shield className="w-4.5 h-4.5" /> Security & Trust
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground">Last updated: July 30, 2026</p>
      </div>

      <div className="space-y-6 text-xs text-muted-foreground leading-relaxed">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Information We Collect</h3>
        <p>
          bilblock collects information you input directly, such as case details (penal codes, date of arrest, sentence limits) for calculating release eligibility, and profile data when register-ing accounts.
        </p>

        <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Cryptographic Ledger Data</h3>
        <p>
          To maintain transparency and prevent logs from being altered, we write verification transactions to the Hedera Hashgraph consensus network. These logs contain only irreversible hash sums of application documents and case initials to protect user privacy while ensuring verification integrity.
        </p>

        <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. Data Retention and Sharing</h3>
        <p>
          We do not sell case statistics or legal dossiers to third-party databases. Information is shared strictly with authorized jail superintendent boards and legal aid defense councils as designated by your case workflow.
        </p>
      </div>
    </div>
  );
}
