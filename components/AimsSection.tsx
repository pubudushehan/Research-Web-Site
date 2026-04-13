"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { Database, Search, Cpu, Volume2, ClipboardCheck } from "lucide-react";

const objectives = [
  {
    icon: Database,
    number: "01",
    title: "Data Collection & Curation",
    desc: "Create and validate a specialized Sinhala emotional speech corpus with a single professional speaker (~10–20 hours, four emotions: happy, sad, angry, neutral) with precise text-emotion alignment.",
  },
  {
    icon: Search,
    number: "02",
    title: "Semantic-Emotion Analysis",
    desc: "Develop a Sinhala-specific NLP pipeline that automatically derives emotional context through semantic analysis, sentiment detection, and contextual emotion inference, without manual annotation.",
  },
  {
    icon: Cpu,
    number: "03",
    title: "Intelligent Acoustic Modeling",
    desc: "Design and train an enhanced acoustic model (FastSpeech2-style) with semantic-aware emotion embeddings, dynamic prosody prediction, and mappings tuned to Sinhala phonetic characteristics.",
  },
  {
    icon: Volume2,
    number: "04",
    title: "High-Fidelity Waveform Synthesis",
    desc: "Implement and fine-tune a HiFi-GAN-like neural vocoder for Sinhala emotional speech, preserving emotional nuance and natural voice characteristics.",
  },
  {
    icon: ClipboardCheck,
    number: "05",
    title: "Comprehensive Validation",
    desc: "Evaluate using objective metrics (Mel-Cepstral Distortion, pitch RMSE) and subjective tests (MOS: intelligibility, naturalness, emotional accuracy, semantic-prosody alignment).",
  },
];

export function AimsSection() {
  return (
    <section id="aims" className="py-24 md:py-32 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Research Aim & Objectives"
          subtitle="A structured approach to building intelligent emotional speech synthesis for Sinhala."
        />

        {/* Main Aim Card */}
        <AnimatedSection className="mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/5 via-surface-card to-accent-purple/5 border border-border p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                Main Research Aim
              </span>
              <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-4xl">
                To design, develop, and comprehensively evaluate an intelligent single-speaker
                emotional TTS system for Sinhala that automatically generates contextually
                appropriate emotional prosody based on semantic content analysis using advanced
                deep learning architectures.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Objectives grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, i) => (
            <AnimatedSection key={obj.number} delay={i * 0.08}>
              <div
                className="group h-full p-6 rounded-2xl bg-surface-card border border-border
                           hover:border-accent/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <obj.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-xs font-bold text-foreground-muted">{obj.number}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">{obj.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{obj.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
