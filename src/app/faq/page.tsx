"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "general" | "ai" | "blockchain" | "legal";
}

const FAQS: FAQItem[] = [
  {
    category: "general",
    q: "What is bilblock?",
    a: "bilblock is a GovTech initiative mapping legal status datasets to identify and process undertrial release opportunities under Section 479 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023."
  },
  {
    category: "general",
    q: "Who is this platform for?",
    a: "bilblock is designed for legal aid organizations, defense councils, NGOs, state legal service clinics, law school clinics, and prison authorities."
  },
  {
    category: "ai",
    q: "How does the AI Eligibility Checker work?",
    a: "The AI evaluator parses details such as penal sections, date of arrest, previous records, and maximum sentence constraints. It evaluates mathematical ratios against statutory thresholds (e.g. 1/3 for first-time offenders, 1/2 for others) to diagnose eligibility instantly."
  },
  {
    category: "ai",
    q: "Is the AI Legal Draft legally binding?",
    a: "No. The AI Draft Generator compiles standardized templates pre-filled with specific case parameters. These petitions must be reviewed, signed, and presented to the Court by licensed advocates."
  },
  {
    category: "blockchain",
    q: "Why does bilblock use blockchain?",
    a: "Blockchain ensures administrative accountability. When a recommendation is generated, its hash and timestamp are committed to a secure ledger node, creating an immutable consensus trail that cannot be deleted or misplaced."
  },
  {
    category: "blockchain",
    q: "Is case privacy maintained on the public ledger?",
    a: "Yes. bilblock uses Merkle hashing. No sensitive personal identifier (like names or details) is written to the ledger block directly. Only a cryptographic hash, case initials, and timestamp are logged."
  },
  {
    category: "legal",
    q: "What is Section 479 of the BNSS?",
    a: "Section 479 is a statutory release provision in India's criminal code. It mandates that an undertrial who has served 1/3 (if first-time) or 1/2 (otherwise) of the maximum prison sentence for the charged offense is eligible for release on a personal bond."
  },
  {
    category: "legal",
    q: "What offenses are excluded under Section 479?",
    a: "Offenses where death penalty (capital punishment) or life imprisonment are potential outcomes under the law are completely excluded from Section 479 release."
  }
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "general" | "ai" | "blockchain" | "legal">("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const filteredFaqs = FAQS.filter(
    (faq) => activeCategory === "all" || faq.category === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative bg-transparent">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
          <HelpCircle className="w-4.5 h-4.5" /> Support Database
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Find answers to questions regarding legal frameworks, AI draft operations, and consensus ledger accountability mechanisms.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 text-xs font-bold uppercase tracking-wider">
        {["all", "general", "ai", "blockchain", "legal"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat as any);
              setExpandedIndex(null);
            }}
            className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Stack */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl glass-panel border border-white/5 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleExpand(idx)}
              className="w-full p-5 text-left flex justify-between items-center text-xs font-bold text-white transition-colors hover:bg-white/[0.01]"
            >
              <span>{faq.q}</span>
              {expandedIndex === idx ? (
                <ChevronUp className="w-4 h-4 text-sky-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {expandedIndex === idx && (
              <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-white/5 bg-[#010e1a]/30">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
