"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import {
  Globe,
  AlertTriangle,
  Eye,
  GraduationCap,
  MessageSquare,
  Mic,
  Brain,
  Layers,
} from "lucide-react";

const gaps = [
  {
    icon: AlertTriangle,
    text: "No automated framework to derive emotional context from Sinhala text without manual annotation.",
  },
  {
    icon: Mic,
    text: "No culturally appropriate prosody modeling for Sinhala (pitch, duration, energy patterns).",
  },
  {
    icon: Layers,
    text: "No end-to-end pipeline linking semantic understanding → emotion inference → prosody modeling → waveform synthesis.",
  },
];

const motivations = [
  {
    icon: Eye,
    title: "Accessibility",
    desc: "Visually impaired users relying on screen readers receive flat, emotionless speech.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Educational technologies cannot convey emotional nuance, reducing learning effectiveness.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    desc: "Culturally relevant conversational agents in Sri Lanka lack emotional expressiveness.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Problem & Motivation"
          subtitle="Understanding the gap in Sinhala speech technology and why emotional TTS matters."
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Context */}
          <AnimatedSection>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-surface-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Context</h3>
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  Text-to-Speech (TTS) technology is critical for accessibility, education, and
                  human-computer interaction. Modern TTS has evolved from robotic concatenative
                  systems to neural models producing near-human speech. However, this progress
                  has not reached all languages equally.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-accent-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">The Sinhala Gap</h3>
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                  Sinhala, spoken by approximately 17 million people, remains severely
                  underrepresented in speech synthesis research. Existing Sinhala TTS systems are
                  mostly concatenative or limited to neutral-prosody deep learning, producing
                  speech that sounds flat and emotionally sterile.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Gaps and Motivation */}
          <div className="space-y-8">
            <AnimatedSection delay={0.1}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Specific Problem Points</h3>
              <div className="space-y-3">
                {gaps.map((g, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-border
                               hover:border-accent/20 hover:shadow-md transition-all duration-200"
                  >
                    <div className="h-9 w-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <g.icon className="h-4 w-4 text-red-500" />
                    </div>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{g.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Why It Matters</h3>
              <div className="grid gap-3">
                {motivations.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-border
                               hover:border-accent/20 hover:shadow-md transition-all duration-200"
                  >
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <m.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{m.title}</p>
                      <p className="text-sm text-foreground-muted leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
