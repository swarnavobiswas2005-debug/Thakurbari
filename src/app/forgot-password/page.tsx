"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto w-full px-6 py-16 md:py-24 flex-1 flex flex-col justify-center text-left relative">
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Reset Password</h2>
          <p className="text-xs text-muted-foreground">
            We will send a secure link to recover your account
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Reset Link Sent</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If an account matches <span className="text-white font-semibold">{email}</span>, a recovery link has been dispatched.
            </p>
            <Link
              href="/bilblock/login"
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-bold mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="text-white font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="name@legal.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 liquid-glass rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending Link...
                </>
              ) : (
                "Send Recovery Link"
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/bilblock/login"
                className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
