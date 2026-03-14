import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Semantic-Aware Emotional TTS for Sinhala | Research Project",
  description:
    "A Single-Speaker Deep Learning Approach for Culturally Authentic Emotional Speech Synthesis in Sinhala — University of Sri Jayewardenepura",
  keywords: [
    "Sinhala TTS",
    "Emotional Speech Synthesis",
    "Deep Learning",
    "NLP",
    "Text-to-Speech",
    "Sinhala Language",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
