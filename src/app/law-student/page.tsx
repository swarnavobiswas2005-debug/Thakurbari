"use client";

import React, { useState } from "react";
import { BookOpen, GraduationCap, Award, Briefcase, FileSignature, CheckCircle, XCircle, AlertCircle, ChevronRight, Check } from "lucide-react";

interface PracticeCase {
  id: number;
  scenario: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const PRACTICE_CASES: PracticeCase[] = [
  {
    id: 1,
    scenario: "Rohan is detained under BNS Section 303 (simple theft, max sentence: 3 years). He has spent 13 months in jail as an undertrial and has no prior criminal records. Is he eligible for release under BNSS 479?",
    options: [
      "Yes. As a first-time offender, he qualifies after serving 1/3 (12 months) of the max sentence.",
      "No. He must serve at least half (18 months) of the maximum sentence under all circumstances.",
      "No. Theft is a capital crime and is excluded from Section 479 benefits."
    ],
    correctAnswerIndex: 0,
    explanation: "Correct! Section 479, paragraph 1 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 grants a special 1/3 threshold for first-time offenders who have no prior convictions."
  },
  {
    id: 2,
    scenario: "An undertrial is accused under a serious section carrying a maximum punishment of life imprisonment. He has served 5 years in detention. Can he claim personal bond release under Section 479?",
    options: [
      "Yes. 5 years is a long detention and warrants automatic release.",
      "No. Offenses carrying life imprisonment or death penalty are explicitly excluded from Section 479 release.",
      "Yes, if he pays a security bond of ₹50,000 to the Magistrate."
    ],
    correctAnswerIndex: 1,
    explanation: "Correct! Serious offenses carrying capital punishment (death) or life imprisonment as a statutory outcome are completely excluded from BNSS 479 benefits."
  }
];

export default function LawStudentPortal() {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz" | "internships">("learn");
  
  // Quiz states
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnsweredCount, setQuizAnsweredCount] = useState(0);

  // Intern applications
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const handleQuizSubmit = () => {
    if (selectedOption === null || quizChecked) return;
    
    const currentCase = PRACTICE_CASES[currentCaseIndex];
    if (selectedOption === currentCase.correctAnswerIndex) {
      setQuizScore(prev => prev + 1);
    }
    setQuizAnsweredCount(prev => prev + 1);
    setQuizChecked(true);
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setQuizChecked(false);
    setCurrentCaseIndex((prev) => (prev + 1) % PRACTICE_CASES.length);
  };

  const applyForJob = (id: number) => {
    if (appliedJobs.includes(id)) return;
    setAppliedJobs(prev => [...prev, id]);
  };

  // Compute certificate progress percent
  const certProgress = Math.round((quizAnsweredCount / PRACTICE_CASES.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col gap-10 text-left relative">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header section with certificate tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-10">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase">
            <GraduationCap className="w-5 h-5" /> Student Academy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Law Student & Intern Portal
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Gain practical legal-tech qualifications by taking BNSS Section 479 courses, practicing eligibility case studies, and applying for judicial aid clinical internships.
          </p>
        </div>

        {/* Certificate card indicator */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#010a12]/80 border border-white/10 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">BNSS compliance certificate</span>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-400" />
              {quizScore === PRACTICE_CASES.length ? "Certified Legal Aid Associate" : "Learning in Progress"}
            </div>
            <div className="w-40 h-1.5 rounded-full bg-white/5 overflow-hidden mt-2">
              <div 
                className="h-full bg-sky-400 transition-all duration-500" 
                style={{ width: `${certProgress}%` }}
              />
            </div>
          </div>
          <span className="text-2xl font-black text-white">{quizScore} / {PRACTICE_CASES.length}</span>
        </div>
      </div>

      {/* Tab controls */}
      <div className="flex border-b border-white/5 gap-6 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("learn")}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === "learn" ? "border-sky-400 text-sky-400" : "border-transparent text-muted-foreground hover:text-white"
          }`}
        >
          1. Learn BNSS 479
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === "quiz" ? "border-sky-400 text-sky-400" : "border-transparent text-muted-foreground hover:text-white"
          }`}
        >
          2. Practice Cases Quiz ({PRACTICE_CASES.length})
        </button>
        <button
          onClick={() => setActiveTab("internships")}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === "internships" ? "border-sky-400 text-sky-400" : "border-transparent text-muted-foreground hover:text-white"
          }`}
        >
          3. Internships Board
        </button>
      </div>

      {/* Tab views */}
      <div className="grid grid-cols-1 gap-8">
        {/* Tab A: Learn BNSS */}
        {activeTab === "learn" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="p-8 rounded-3xl bg-[#010a12]/80 border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  Understanding Bharatiya Nagarik Suraksha Sanhita (BNSS) Section 479
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Section 479 replaces and amends Section 436A of the old Code of Criminal Procedure (CrPC). The statutory amendment was designed to tackle prison congestion directly by creating a clear mandate for release on personal bond for undertrial prisoners who have served specific proportions of their potential sentencing.
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-white pt-2">Key Provisions:</h4>
                <ul className="space-y-3 text-xs text-muted-foreground leading-relaxed pl-4 list-disc">
                  <li>
                    <strong className="text-white">The First-Time Offender Clause:</strong> If the undertrial has no prior convictions, they are entitled to release after serving <strong className="text-white">one-third (1/3)</strong> of the maximum sentence.
                  </li>
                  <li>
                    <strong className="text-white">The Standard Clause:</strong> Other undertrials (with prior record or complex scenarios) are eligible after serving <strong className="text-white">half (1/2)</strong> of the maximum sentence.
                  </li>
                  <li>
                    <strong className="text-white">Penal Exclusions:</strong> Any offense carrying life imprisonment or capital punishment (death penalty) as a potential charge outcome is excluded.
                  </li>
                </ul>
              </div>

              {/* Drafting assistance guidelines */}
              <div className="p-8 rounded-3xl glass-panel border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-sky-400" />
                  AI Assisted Drafting Guidelines
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A successful Section 479 petition needs three key elements:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-semibold text-white mb-1">1. Date Verification</div>
                    <span className="text-[10px] text-muted-foreground">Arrest dates must map exactly to jail logs to prove served ratio.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-semibold text-white mb-1">2. Offense Limits</div>
                    <span className="text-[10px] text-muted-foreground">Statutory maximum imprisonment must be verified under BNS / IPC.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-semibold text-white mb-1">3. UTRC Reference</div>
                    <span className="text-[10px] text-muted-foreground">Direct petition reference to the Under Trial Review Committee.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academy sidebar */}
            <div className="lg:col-span-4 p-6 rounded-2xl glass-panel border border-white/5 space-y-4 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Course Syllabus</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center text-white">
                  <span>Introduction to BNSS 479</span>
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center text-white">
                  <span>IPC vs BNS Sentence Mapping</span>
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center text-white">
                  <span>Surety Exclusions & Bond Forms</span>
                  <ChevronRight className="w-4.5 h-4.5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab B: Practice Cases Quiz */}
        {activeTab === "quiz" && (
          <div className="max-w-3xl mx-auto w-full p-8 rounded-3xl bg-[#010a12]/80 border border-white/10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Case Scenario #{currentCaseIndex + 1}</span>
              <span className="text-xs font-semibold text-white">Score: {quizScore} / {PRACTICE_CASES.length}</span>
            </div>

            <p className="text-xs text-white leading-relaxed font-semibold">
              {PRACTICE_CASES[currentCaseIndex].scenario}
            </p>

            {/* Quiz Options */}
            <div className="flex flex-col gap-3 pt-2">
              {PRACTICE_CASES[currentCaseIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !quizChecked && setSelectedOption(idx)}
                  className={`w-full p-4 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedOption === idx
                      ? "bg-sky-500/10 border-sky-400 text-sky-300 font-medium"
                      : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {/* Feedback log */}
            {quizChecked && (
              <div className={`p-4 rounded-xl text-xs flex gap-3 items-start ${
                selectedOption === PRACTICE_CASES[currentCaseIndex].correctAnswerIndex
                  ? "bg-emerald-500/5 border border-emerald-500/10 text-emerald-400"
                  : "bg-red-500/5 border border-red-500/10 text-red-400"
              }`}>
                {selectedOption === PRACTICE_CASES[currentCaseIndex].correctAnswerIndex ? (
                  <CheckCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 shrink-0" />
                )}
                <div>
                  <span className="font-bold block mb-1">
                    {selectedOption === PRACTICE_CASES[currentCaseIndex].correctAnswerIndex ? "Correct Answer" : "Incorrect Answer"}
                  </span>
                  {PRACTICE_CASES[currentCaseIndex].explanation}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              {!quizChecked ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedOption === null}
                  className="liquid-glass rounded-xl px-6 py-2.5 text-xs font-bold text-white transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuiz}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Next Scenario
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab C: Internships Board */}
        {activeTab === "internships" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Clinical Legal Aid Openings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-left">
              {[
                { id: 1, title: "Tihar Jail Clinic Volunteer", org: "Delhi State Legal Services Authority (DLSA)", loc: "New Delhi", duration: "3 Months" },
                { id: 2, title: "Undertrial Advocate Assistant", org: "Commonwealth Human Rights Initiative", loc: "Mumbai Office", duration: "6 Months" },
                { id: 3, title: "Bail Application Case Checker", org: "Human Rights & Legal Aid Foundation", loc: "Uttar Pradesh", duration: "Part-time" }
              ].map((job) => (
                <div key={job.id} className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between h-56 hover:border-white/10 transition-colors">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1 text-[10px] text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full font-semibold">
                      <Briefcase className="w-3 h-3" /> {job.duration}
                    </div>
                    <h4 className="text-base font-bold text-white leading-tight">{job.title}</h4>
                    <p className="text-muted-foreground text-[11px]">{job.org}</p>
                    <span className="text-muted-foreground text-[10px] block font-mono">{job.loc}</span>
                  </div>

                  <button
                    onClick={() => applyForJob(job.id)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      appliedJobs.includes(job.id)
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center gap-1.5"
                        : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                    }`}
                  >
                    {appliedJobs.includes(job.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Application Submitted
                      </>
                    ) : (
                      "Apply for Internship"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
