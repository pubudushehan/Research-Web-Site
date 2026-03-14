"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import {
  Database,
  Mic,
  Settings,
  BookOpen,
  ArrowRightLeft,
  Scale,
  Network,
} from "lucide-react";

const dataCards = [
  {
    icon: Database,
    title: "Text Dataset",
    desc: "Human-created emotional text data organized by emotion category, expanded via RAG-based synthetic data generation for happy, angry, sad, and neutral texts.",
  },
  {
    icon: Mic,
    title: "Speech Recordings",
    desc: "Single-speaker emotional speech recordings at 22,050 Hz, 16-bit PCM, WAV. Recorded with clear emotional expression per sentence across all four emotions.",
  },
  {
    icon: Settings,
    title: "Audio Preprocessing",
    desc: "Normalization, padding, noise reduction, and enhancement (Adobe Audio Enhancer) to improve clarity and consistency before model training.",
  },
];

const ontologyFeatures = [
  {
    icon: BookOpen,
    title: "Emotion Frames",
    desc: "PhysicalHarm, PositiveEmotion, LossExperience — with role-dependent emotion mappings.",
  },
  {
    icon: ArrowRightLeft,
    title: "Linguistic Modifiers",
    desc: "Negation handling (emotion flipping), intensifiers/diminishers (scale strength), contrastive discourse connectives.",
  },
  {
    icon: Scale,
    title: "Semantic Roles",
    desc: 'Agent vs. Patient roles change emotion interpretation. E.g., "I hit" → angry, "I was hit" → sad.',
  },
  {
    icon: Network,
    title: "3-Tier Pipeline",
    desc: "Linguistic analysis → frame matching → semantic inference for robust emotion detection.",
  },
];

export function DatasetSection() {
  return (
    <section id="dataset" className="py-24 md:py-32 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Dataset & Ontology"
          subtitle="The data foundation and semantic framework powering emotion-aware speech synthesis."
        />

        {/* Data cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {dataCards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.08}>
              <div className="h-full p-6 rounded-2xl bg-surface-card border border-border hover:border-accent/20 hover:shadow-lg transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <card.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{card.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Sinhala Emotion Ontology */}
        <AnimatedSection>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
              Sinhala Emotion Ontology (SEO)
            </h3>
            <p className="text-sm text-foreground-muted text-center mb-8 max-w-2xl mx-auto">
              A structured semantic framework for deriving emotional context from Sinhala text.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ontologyFeatures.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 0.06}>
                  <div className="h-full p-5 rounded-2xl bg-surface-card border border-border hover:border-accent-purple/20 hover:shadow-md transition-all duration-300">
                    <div className="h-9 w-9 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-3">
                      <f.icon className="h-4 w-4 text-accent-purple" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">{f.title}</h4>
                    <p className="text-xs text-foreground-muted leading-relaxed">{f.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Example outputs */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            Example Classification Outputs
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Example 1 */}
            <div className="p-6 rounded-2xl bg-surface-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                  ML (LaBSE)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-foreground-muted/10 text-foreground-muted text-xs font-medium">
                  No Ontology Match
                </span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-surface-secondary">
                  <span className="text-foreground-muted">Method</span>
                  <span className="text-foreground font-medium">ML Classification</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-secondary">
                  <span className="text-foreground-muted">Emotion</span>
                  <span className="text-blue-500 font-medium">Sad</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-secondary">
                  <span className="text-foreground-muted">Confidence</span>
                  <span className="text-foreground font-medium">0.63</span>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="p-6 rounded-2xl bg-surface-card border border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  Ontology Match
                </span>
                <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                  6 Matched Words
                </span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-surface-secondary">
                  <span className="text-foreground-muted">Method</span>
                  <span className="text-foreground font-medium">Ontology + Semantic</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-secondary">
                  <span className="text-foreground-muted">Emotion</span>
                  <span className="text-blue-500 font-medium">Sad</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-secondary">
                  <span className="text-foreground-muted">Confidence</span>
                  <span className="text-green-500 font-medium">1.00</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
