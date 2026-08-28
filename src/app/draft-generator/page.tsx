"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FileText, Copy, Check, Download, Globe, Sparkles, MessageSquare, AlertCircle, FileCheck, CheckCircle, Loader2 } from "lucide-react";

// Mock legal templates in different languages
const TEMPLATES = {
  English: `IN THE COURT OF THE METROPOLITAN MAGISTRATE, DISTRICT COURTS, DELHI
IN THE MATTER OF:
STATE   VS.   SURESH SHARMA (UNDER DETENTION)
FIR NO: 234 / 2024
UNDER SECTION: BNS Section 303 (Theft)
POLICE STATION: Okhla, New Delhi

APPLICATION ON BEHALF OF THE ACCUSED / UNDERTRIAL PRISONER UNDER SECTION 479 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS), 2023 FOR RELEASE ON PERSONAL BOND.

MOST RESPECTFULLY SHOWETH:

1. That the applicant/accused Suresh Sharma was arrested in connection with the aforementioned FIR on 15th April, 2024 and has been in judicial custody in Tihar Jail No. 3, Delhi since then.

2. That the applicant has completed a continuous detention period of 16 months as of today, which exceeds one-third (33.3%) of the maximum imprisonment of 3 years (36 months) prescribed for the offense of simple theft under BNS Section 303.

3. That the applicant is a first-time offender with no prior criminal convictions, which entitles them to the statutory release provision under Section 479, paragraph 1 of the BNSS, 2023.

4. That during the period of detention, the applicant's conduct inside Tihar Jail has been exemplary and is certified by the Jail Superintendent.

5. That the applicant is willing to furnish a personal bond as directed by this Hon'ble Court.

PRAYER:
In view of the above, it is most respectfully prayed that this Hon'ble Court may be pleased to direct the release of the applicant on a personal bond without sureties in compliance with Section 479 of the BNSS, 2023.

APPLICANT
Through Counsel:
Adv. Swati Gupta
New Delhi
Date: 30-07-2026`,

  Hindi: `मेट्रोपॉलिटन मजिस्ट्रेट की अदालत, जिला न्यायालय, दिल्ली
मामले में:
राज्य बनाम सुरेश शर्मा (हिरासत में)
प्रथम सूचना रिपोर्ट (FIR) संख्या: 234 / 2024
अंतर्गत धारा: भारतीय न्याय संहिता (BNS) धारा 303 (चोरी)
थाना: ओखला, नई दिल्ली

अभियुक्त/विचाराधीन कैदी की ओर से व्यक्तिगत बांड (Personal Bond) पर रिहाई के लिए भारतीय नागरिक सुरक्षा संहिता (BNSS), 2023 की धारा 479 के तहत आवेदन।

सादर निवेदन है:

1. यह कि आवेदक/अभियुक्त सुरेश शर्मा को उक्त प्राथमिकी के संबंध में 15 अप्रैल 2024 को गिरफ्तार किया गया था और तब से वह तिहाड़ जेल नंबर 3, दिल्ली में न्यायिक हिरासत में है।

2. यह कि आवेदक ने आज तक 16 महीने की निरंतर हिरासत अवधि पूरी कर ली है, जो बीएनएस धारा 303 के तहत साधारण चोरी के अपराध के लिए निर्धारित 3 साल (36 महीने) की अधिकतम सजा के एक-तिहाई (33.3%) से अधिक है।

3. यह कि आवेदक पहली बार का अपराधी है, जिसका कोई पिछला आपराधिक इतिहास नहीं है, जो उसे बीएनएसएस, 2023 की धारा 479, पैराग्राफ 1 के तहत वैधानिक रिहाई प्रावधान का हकदार बनाता है।

4. यह कि हिरासत की अवधि के दौरान, तिहाड़ जेल के भीतर आवेदक का आचरण अनुकरणीय रहा है और जेल अधीक्षक द्वारा प्रमाणित है।

आदरपूर्वक प्रार्थना है:
उपरोक्त तथ्यों को ध्यान में रखते हुए, प्रार्थना की जाती है कि यह माननीय न्यायालय बीएनएसएस, 2023 की धारा 479 के अनुपालन में बिना जमानतदारों के व्यक्तिगत बांड पर आवेदक की रिहाई का निर्देश देने की कृपा करे।

आवेदक
द्वारा अधिवक्ता:
एडवोकेट स्वाति गुप्ता
नई दिल्ली
दिनांक: 30-07-2026`,

  Marathi: `मेट्रोपॉलिटन मॅजिस्ट्रेट न्यायालय, जिल्हा न्यायालय, दिल्ली
च्या प्रकरणात:
राज्य विरुद्ध सुरेश शर्मा (न्यायालयीन कोठडीत)
एफआयआर क्रमांक: 234 / 2024
कलम: भारतीय न्याय संहिता (BNS) कलम 303 (चोरी)
पोलीस ठाणे: ओखला, नवी दिल्ली

आरोपी/अंडरट्रायल कैद्याच्या वतीने वैयक्तिक बंधपत्रावर (Personal Bond) सुटकेसाठी भारतीय नागरिक सुरक्षा संहिता (BNSS), 2023 च्या कलम 479 अंतर्गत अर्ज.

सादर अर्ज खालीलप्रमाणे आहे:

1. अर्जदार सुरेश शर्मा याला 15 एप्रिल 2024 रोजी अटक करण्यात आली असून तेव्हापासून तो तिहार जेल क्रमांक ३, दिल्ली येथे न्यायिक कोठडीत आहे.

2. अर्जदाराने आज अखेर 16 महिन्यांचा कोठडीचा कालावधी पूर्ण केला आहे, जो BNS कलम 303 अंतर्गत चोरीच्या गुन्ह्यासाठी विहित केलेल्या 3 वर्षांच्या (36 महिने) कमाल कारावासाच्या एक-तृतीयांश (33.3%) पेक्षा जास्त आहे.

3. अर्जदार हा पहिल्यांदाच गुन्हा करणारा असून त्याचा कोणताही पूर्व गुन्हेगारी इतिहास नाही, ज्यामुळे तो BNSS, 2023 च्या कलम 479 नुसार वैयक्तिक बंधपत्रावर सुटकेसाठी पात्र ठरतो.

प्रार्थना:
वरील बाबींचा विचार करून, माननीय न्यायालयाने अर्जदाराची जामीनदारांशिवाय वैयक्तिक बंधपत्रावर सुटका करण्याचे आदेश द्यावेत ही नम्र प्रार्थना.

अर्जदार
तर्फे वकील:
ॲड. स्वाती गुप्ता
नवी दिल्ली
दिनांक: 30-07-2026`
};

function DraftWorkspace() {
  const searchParams = useSearchParams();
  const offense = searchParams.get("offense") || "BNS Section 303";
  const sentence = searchParams.get("sentence") || "36";
  const served = searchParams.get("served") || "12";
  const jail = searchParams.get("jail") || "Tihar Jail No. 3";
  
  const [documentContent, setDocumentContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"English" | "Hindi" | "Marathi">("English");
  const [copied, setCopied] = useState(false);
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: "Add Case FIR Number",
      desc: "No FIR number is linked to this session. Click to add a mock FIR number.",
      type: "warning",
      action: "Link FIR #234/2024"
    },
    {
      id: 2,
      title: "Confirm Family Dependency",
      desc: "Adding family dependency clauses raises success likelihood in court reviews.",
      type: "info",
      action: "Insert Clause"
    },
    {
      id: 3,
      title: "Jail Superintendent Certificate",
      desc: "A behavior certificate from jail authority is required to verify the record.",
      type: "tip",
      action: "Attach Request"
    }
  ]);

  // Load language template and customize with params
  useEffect(() => {
    let rawTemplate = TEMPLATES[selectedLanguage];
    
    // Replace placeholders with real query parameters
    let customText = rawTemplate
      .replace(/BNS Section 303/g, offense)
      .replace(/303/g, offense.replace(/\D/g, "") || "303")
      .replace(/3 years \(36 months\)/g, `${Math.round(Number(sentence) / 12)} years (${sentence} months)`)
      .replace(/36/g, sentence)
      .replace(/16 months/g, `${served} months`)
      .replace(/Tihar Jail No. 3/g, jail || "District Jail");

    setDocumentContent(customText);
  }, [selectedLanguage, offense, sentence, served, jail]);

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([documentContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Bail_Application_Section479_${selectedLanguage}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const applySuggestion = (id: number, actionText: string) => {
    if (id === 1) {
      // Just update text
      setDocumentContent(prev => prev.replace("FIR NO: 234 / 2024", "FIR NO: 234 / 2024 (Verified)"));
    } else if (id === 2) {
      setDocumentContent(prev => {
        const insertPos = prev.indexOf("4. That during");
        if (insertPos !== -1) {
          return prev.slice(0, insertPos) + "4. That the applicant has elderly parents dependent on him, and is the sole breadwinner of the family.\n\n" + prev.slice(insertPos);
        }
        return prev;
      });
    }
    // Remove suggestion from list
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left relative">
      {/* Absolute glow background */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Editor Panel */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              AI Legal Draft Generator
            </h1>
            <p className="text-xs text-muted-foreground">
              Review and modify the automatically generated petition under Section 479.
            </p>
          </div>

          {/* Controls toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Language dropdown */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white">
              <Globe className="w-3.5 h-3.5 text-sky-400 mr-2" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                className="bg-transparent border-none focus:outline-none cursor-pointer pr-1"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Marathi">Marathi (मराठी)</option>
              </select>
            </div>

            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        </div>

        {/* Document Editor */}
        <div className="relative rounded-2xl border border-white/10 bg-[#010a12]/75 shadow-2xl p-6 font-mono text-[11px] leading-relaxed text-slate-300">
          <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI Draft Synchronized
          </div>

          <textarea
            value={documentContent}
            onChange={(e) => setDocumentContent(e.target.value)}
            className="w-full h-[500px] bg-transparent border-none text-slate-200 focus:outline-none resize-none overflow-y-auto leading-relaxed whitespace-pre-wrap pr-4"
          />
        </div>
      </div>

      {/* Sidebar - AI Suggestions & Logging */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* AI Suggestions Box */}
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Sparkles className="w-4 h-4 text-sky-400" />
            AI Draft Diagnostics
          </div>

          <div className="space-y-3">
            {suggestions.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-semibold text-white">Draft Fully Optimized</div>
                <div className="text-[10px] text-muted-foreground">All recommended clauses have been inserted successfully.</div>
              </div>
            ) : (
              suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2.5 text-xs text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <AlertCircle className={`w-3.5 h-3.5 ${
                        suggestion.type === "warning" ? "text-yellow-400" : "text-sky-400"
                      }`} />
                      {suggestion.title}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {suggestion.desc}
                  </p>
                  <button
                    onClick={() => applySuggestion(suggestion.id, suggestion.action)}
                    className="self-end px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-[10px] font-bold text-sky-300 transition-colors cursor-pointer"
                  >
                    {suggestion.action}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Blockchain action box */}
        <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <FileCheck className="w-4.5 h-4.5 text-sky-400" />
            Blockchain Verification
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Immutable registration logs this verified bail draft into our Hedera Hashgraph node, giving court representatives audit verification.
          </p>

          <Link
            href={`/bilblock/blockchain?action=log&offense=${encodeURIComponent(offense)}&sentence=${sentence}&served=${served}`}
            className="w-full liquid-glass rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
          >
            Register on Blockchain
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DraftGenerator() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm py-20">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading Draft Workspace...
      </div>
    }>
      <DraftWorkspace />
    </Suspense>
  );
}
