"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, ChevronDown, Menu, X, Landmark, Compass, BarChart2, ShieldAlert, Award, FileText, User } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  if (pathname === "/") {
    return <>{children}</>;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

  // Helper to determine active link
  const isActive = (path: string) => pathname === path;

  return (
    <div className="relative min-h-screen text-foreground flex flex-col bg-transparent">
      {/* Semi-transparent dark overlay for text readability over video */}
      <div className="fixed inset-0 bg-[#021324]/50 pointer-events-none -z-10" />

      {/* Header Navbar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <Scale className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              bilblock<sup className="text-xs font-normal ml-0.5">®</sup>
            </span>
          </Link>

          {/* Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Home */}
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive("/")
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* About */}
            <Link
              href="/about"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive("/about")
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              About
            </Link>

            {/* How it Works */}
            <Link
              href="/how-it-works"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive("/how-it-works")
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              How It Works
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setPortalsDropdownOpen(false);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                  isActive("/eligibility") ||
                  isActive("/draft-generator") ||
                  isActive("/blockchain") ||
                  isActive("/public-verification") ||
                  isActive("/timeline")
                    ? "bg-white/10 text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                AI & Blockchain Tools <ChevronDown className="w-4 h-4" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-12 left-0 w-64 p-2 rounded-2xl glass-panel border border-white/10 shadow-2xl z-50 flex flex-col gap-1">
                  <Link
                    href="/eligibility"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <ShieldAlert className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">AI Eligibility Checker</div>
                      <div className="text-[10px] text-muted-foreground">Verify status under BNSS 479</div>
                    </div>
                  </Link>

                  <Link
                    href="/draft-generator"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <FileText className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">AI Legal Draft Generator</div>
                      <div className="text-[10px] text-muted-foreground">Generate editable applications</div>
                    </div>
                  </Link>

                  <Link
                    href="/blockchain"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <Landmark className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">Blockchain Transparency</div>
                      <div className="text-[10px] text-muted-foreground">Immutable recommendation logs</div>
                    </div>
                  </Link>

                  <Link
                    href="/public-verification"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <Compass className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">Public Verification</div>
                      <div className="text-[10px] text-muted-foreground">Search logs by Hash or Case ID</div>
                    </div>
                  </Link>

                  <Link
                    href="/timeline"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <Compass className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">Case Journey Timeline</div>
                      <div className="text-[10px] text-muted-foreground">Step-by-step case stages</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setPortalsDropdownOpen(!portalsDropdownOpen);
                  setToolsDropdownOpen(false);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                  isActive("/dashboard") ||
                  isActive("/ngo") ||
                  isActive("/law-student") ||
                  isActive("/admin")
                    ? "bg-white/10 text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Portals & Analytics <ChevronDown className="w-4 h-4" />
              </button>

              {portalsDropdownOpen && (
                <div className="absolute top-12 left-0 w-60 p-2 rounded-2xl glass-panel border border-white/10 shadow-2xl z-50 flex flex-col gap-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setPortalsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <BarChart2 className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">Main Dashboard</div>
                      <div className="text-[10px] text-muted-foreground">Executive stats & analytics</div>
                    </div>
                  </Link>

                  <Link
                    href="/ngo"
                    onClick={() => setPortalsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <Landmark className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">NGO Portal</div>
                      <div className="text-[10px] text-muted-foreground">Client & volunteer registry</div>
                    </div>
                  </Link>

                  <Link
                    href="/law-student"
                    onClick={() => setPortalsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <Award className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">Law Student Portal</div>
                      <div className="text-[10px] text-muted-foreground">BNSS courses & certifications</div>
                    </div>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setPortalsDropdownOpen(false)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-colors flex items-start gap-3 text-left"
                  >
                    <User className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white">Admin Control Panel</div>
                      <div className="text-[10px] text-muted-foreground">System logs & configurations</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Impact */}
            <Link
              href="/impact"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive("/impact")
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Impact
            </Link>

            {/* Resources */}
            <Link
              href="/resources"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive("/resources")
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Resources
            </Link>

            {/* FAQ */}
            <Link
              href="/faq"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive("/faq")
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Action Area */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="liquid-glass rounded-full px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              Get Started
            </Link>
            <Link
              href="/profile"
              className="p-2 rounded-full hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-muted-foreground hover:text-white"
              title="User Profile"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full border-t border-white/5 bg-[#021324] px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg"
              >
                About
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg"
              >
                How It Works
              </Link>

              <div className="pt-2 border-t border-white/5">
                <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Tools
                </div>
                <Link
                  href="/eligibility"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  AI Eligibility Checker
                </Link>
                <Link
                  href="/draft-generator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  AI Legal Draft Generator
                </Link>
                <Link
                  href="/blockchain"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Blockchain Ledger
                </Link>
                <Link
                  href="/public-verification"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Public Verification Portal
                </Link>
                <Link
                  href="/timeline"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Case Timeline
                </Link>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Portals & Analytics
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Main Dashboard
                </Link>
                <Link
                  href="/ngo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  NGO Portal
                </Link>
                <Link
                  href="/law-student"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Law Student Portal
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Admin Panel
                </Link>
              </div>

              <div className="pt-2 border-t border-white/5">
                <Link
                  href="/impact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Impact Page
                </Link>
                <Link
                  href="/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Resources & Downloads
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-sm text-white hover:bg-white/5 rounded-lg"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium text-white hover:bg-white/5 rounded-xl border border-white/5"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium bg-white text-black hover:bg-white/90 rounded-xl"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content View */}
      <main className="relative flex-1 w-full z-10 flex flex-col">
        {children}
      </main>

      {/* Footnote Footer */}
      <footer className="relative z-10 w-full bg-[#010e1a]/80 border-t border-white/5 backdrop-blur-md pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="p-1.5 rounded-md bg-white/5 border border-white/10">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                bilblock
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Providing AI eligibility metrics and cryptographically verified logging under Section 479 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) to resolve India's undertrial detention crisis.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/eligibility" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  AI Eligibility Checker
                </Link>
              </li>
              <li>
                <Link href="/draft-generator" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  AI Draft Generator
                </Link>
              </li>
              <li>
                <Link href="/blockchain" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Blockchain Transparency
                </Link>
              </li>
              <li>
                <Link href="/public-verification" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Public Verification Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Portals</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Case Dashboard
                </Link>
              </li>
              <li>
                <Link href="/ngo" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  NGO Portal
                </Link>
              </li>
              <li>
                <Link href="/law-student" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Law Student Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Admin Control Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Resources & Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Legal Documents
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  FAQ Database
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-xs text-muted-foreground hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            © 2026 bilblock. All rights reserved. Secure legal aid transparency initiative.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Hedera Hashgraph Mainnet Connected
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
