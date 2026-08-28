"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, MessageSquare, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [msg, setMsg] = useState("");
  const [requestType, setRequestType] = useState("partnership");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setOrg("");
      setMsg("");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left relative bg-transparent">
      {/* Info sidebar */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
            <Mail className="w-4.5 h-4.5" /> Reach Out
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Connect With Us
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Interested in scaling our legal checker platform in your district or volunteering as an advocate? Fill out the portal request form.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/5 text-xs text-muted-foreground">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">General Partnerships</span>
              <p className="text-[10px] mt-0.5">Scale AI compliance diagnostics inside state jails with DLSA.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Technical Support</span>
              <p className="text-[10px] mt-0.5">For active NGO portal users experiencing block validation delays.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input panel */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        {submitted ? (
          <div className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Message Received Successfully</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Thank you for connecting with bilblock. Our district clinic coordinator will review your request and reach out within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-sky-400 hover:underline font-semibold"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">Request Type</label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/20"
              >
                <option value="partnership">State NGO / DLSA Partnership Request</option>
                <option value="volunteer">Volunteer Advocate Roster Registration</option>
                <option value="demo">Demo Booking Request</option>
                <option value="support">General System Support</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-white">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adv. Rajesh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-white">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rajesh@legal.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">Organization / Institution Name</label>
              <input
                type="text"
                placeholder="e.g. Human Rights Clinic Mumbai"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white">Message Description</label>
              <textarea
                rows={4}
                required
                placeholder="Detail your request objectives..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full liquid-glass rounded-xl py-4 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  Submit Inquiry <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
