import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "ResumeForge — AI Resume Builder",
    template: "%s | ResumeForge",
  },
  description:
    "Build ATS-friendly resumes with live preview, AI writing tools, multiple templates, and professional PDF export.",
  keywords: ["resume builder", "ATS resume", "AI resume", "PDF resume"],
  openGraph: {
    title: "ResumeForge",
    description: "Modern AI-powered resume builder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
