import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "ঠাকুরবাড়ি Cookups",
  description: "A Bengali home, reimagined through modern digital culture. Jorasanko Nostalgia × Bengali Heritage × Pop Culture × Food × Music × Modern Internet Art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@400;500;600&family=Noto+Serif+Bengali:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="relative bg-[#0d0705] text-[#f4efe6] antialiased overflow-x-hidden min-h-screen">
        <div className="noise-overlay" />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
