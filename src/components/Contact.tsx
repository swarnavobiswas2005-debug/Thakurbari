"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, CheckCircle2, AlertCircle, Github, Linkedin, 
  Twitter, Mail, MessageSquare, ShieldAlert 
} from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (validationError) setValidationError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Minimal Validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setValidationError("All form fields must be completed.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setValidationError("Please input a valid email address.");
      return;
    }

    setValidationError("");
    setStatus("sending");

    // Simulate API request dispatch
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      
      // Reset status back to idle after 5s
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 2000);
  };

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/swarnavobiswas2005-debug",
      icon: <Github className="w-5 h-5 text-accent-cyan" />,
      tagline: "@swarnavobiswas2005-debug",
      glowClass: "hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] hover:border-accent-cyan/30",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/swarnavo-biswas-53007a305/",
      icon: <Linkedin className="w-5 h-5 text-accent-blue" />,
      tagline: "Swarnavo Biswas",
      glowClass: "hover:shadow-[0_0_30px_rgba(0,82,255,0.15)] hover:border-accent-blue/30",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/Sanubiswas0010",
      icon: <Twitter className="w-5 h-5 text-accent-purple" />,
      tagline: "@Sanubiswas0010",
      glowClass: "hover:shadow-[0_0_30px_rgba(157,78,221,0.15)] hover:border-accent-purple/30",
    },
  ];

  return (
    <section id="contact" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto border-t border-neutral-900/30">
      
      {/* Decorative Blob */}
      <div className="absolute top-[30%] -right-[10%] w-[350px] h-[350px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left column: Narrative & Socials */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-accent-purple animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent-purple">
                CONNECT
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6">
              Let's <span className="text-gradient">Talk</span>
            </h2>
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
              Interested in collaborating, hiring, or discussing frontend pipelines, creative interface concepts, or Web3 projects? Get in touch.
            </p>

            {/* Social Cards mapping */}
            <div className="flex flex-col gap-4">
              {socials.map((social) => (
                <MagneticButton key={social.name} strength={0.15} range={40} className="w-full">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass w-full flex items-center gap-4 p-5 rounded-2xl border border-white/5 transition-all duration-500 shadow-md ${social.glowClass} group`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                    
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        {social.name}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono mt-0.5">
                        {social.tagline}
                      </span>
                    </div>
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          <div className="hidden lg:block text-neutral-600 text-[10px] uppercase font-bold tracking-[0.2em] mt-12 select-none">
            © 2026 Swarnavo Biswas // Coding Aesthetics
          </div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-7">
          <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-4 h-4 text-accent-cyan" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                Send Message
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1.5 relative">
                <input
                  type="text"
                  name="name"
                  id="form-name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full h-12 bg-neutral-950/40 rounded-xl border border-white/5 hover:border-white/10 focus:border-accent-cyan/50 focus:bg-neutral-950/80 transition-all px-4 text-sm text-white placeholder-neutral-600 outline-none"
                  disabled={status === "sending" || status === "success"}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <input
                  type="email"
                  name="email"
                  id="form-email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full h-12 bg-neutral-950/40 rounded-xl border border-white/5 hover:border-white/10 focus:border-accent-cyan/50 focus:bg-neutral-950/80 transition-all px-4 text-sm text-white placeholder-neutral-600 outline-none"
                  disabled={status === "sending" || status === "success"}
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  name="subject"
                  id="form-subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full h-12 bg-neutral-950/40 rounded-xl border border-white/5 hover:border-white/10 focus:border-accent-cyan/50 focus:bg-neutral-950/80 transition-all px-4 text-sm text-white placeholder-neutral-600 outline-none"
                  disabled={status === "sending" || status === "success"}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <textarea
                  name="message"
                  id="form-message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full bg-neutral-950/40 rounded-xl border border-white/5 hover:border-white/10 focus:border-accent-cyan/50 focus:bg-neutral-950/80 transition-all p-4 text-sm text-white placeholder-neutral-600 outline-none resize-none"
                  disabled={status === "sending" || status === "success"}
                />
              </div>

              {/* Validation Alert */}
              <AnimatePresence>
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-xs text-red-400 font-medium px-4 py-2 bg-red-950/20 border border-red-950 rounded-xl"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{validationError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="mt-2 flex justify-start">
                <MagneticButton strength={0.15} range={35}>
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    className={`flex items-center justify-center gap-2 px-8 h-12 rounded-full font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                      status === "success"
                        ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                        : status === "sending"
                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                        : "bg-white text-black hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    }`}
                  >
                    {status === "success" ? (
                      <>
                        <span>Message Sent</span>
                        <CheckCircle2 className="w-4 h-4 animate-bounce" />
                      </>
                    ) : status === "sending" ? (
                      <>
                        <span>Sending...</span>
                        <div className="w-3.5 h-3.5 border-2 border-neutral-600 border-t-white rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Mobile Footer text */}
      <div className="lg:hidden text-center text-neutral-600 text-[10px] uppercase font-bold tracking-[0.2em] mt-16 select-none">
        © 2026 Swarnavo Biswas // Coding Aesthetics
      </div>
    </section>
  );
}
