"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, User, Mail, Lock, Building, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ngo");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      window.location.href = "/bilblock/dashboard";
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto w-full px-6 py-12 md:py-20 flex-1 flex flex-col justify-center text-left relative">
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Create Account</h2>
          <p className="text-xs text-muted-foreground">
            Sign up to access verified digital legal services
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="text-white font-semibold">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                required
                placeholder="Adv. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="ramesh@legal.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white font-semibold">Account Role</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
              >
                <option value="ngo">NGO Representative / Officer</option>
                <option value="advocate">Licensed Legal Advocate</option>
                <option value="officer">Jail Superintendent Office</option>
                <option value="student">Law Student Academy</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || success}
            className="w-full mt-2 liquid-glass rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Registering...
              </>
            ) : success ? (
              "Redirecting..."
            ) : (
              <>
                Create Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center text-[10px] text-muted-foreground pt-2 border-t border-white/5">
          Already have an account?{" "}
          <Link href="/bilblock/login" className="text-sky-400 hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
