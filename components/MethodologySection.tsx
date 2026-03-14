"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import {
  FileText,
  Shuffle,
  Mic,
  Settings,
  Brain,
  Music,
  Globe,
  ArrowRight,
} from "lucide-react";

const pipelineSteps = [
  { label: "Input Sinhala Text", icon: FileText },
  { label: "Semantic & Emotion Analysis", icon: Brain },
  { label: "Prosody Detection", icon: Settings },
  { label: "Acoustic Model", icon: Music },
  { label: "Neural Vocoder", icon: Mic },
  { label: "Emotional Speech", icon: Globe },
];

const stages = [
  {
    number: "01",
    title: "Text Data Collection",
    icon: FileText,
    desc: "Seed dataset creation with emotion-wise organization. Human-created emotional text data collected across four emotion categories.",
  },
  {
    number: "02",
    title: "RAG-Based Data Expansion",
    icon: Shuffle,
    desc: "Synthetic data generation using LLMs and vector database similarity control to expand emotional text coverage for happy, angry, sad, and neutral categories.",
  },
  {
    number: "03",
    title: "Voice Recording",
    icon: Mic,
    desc: "Single professional speaker records each text with four emotions. Standardized at 22,050 Hz, 16-bit PCM, WAV format.",
  },
  {
    number: "04",
    title: "Audio Preprocessing",
    icon: Settings,
    desc: "Noise reduction, normalization, padding, and enhancement using Adobe Audio Enhancer to improve clarity before training.",
  },
  {
    number: "05",
    title: "Semantic-Emotion Analysis",
    icon: Brain,
    desc: "Sinhala Emotion Ontology (SEO) with emotion frames, linguistic modifiers, and semantic roles. Deep learning classifier using LaBSE embeddings with hybrid classification.",
  },
  {
    number: "06",
    title: "Emotional TTS & Deployment",
    icon: Music,
    desc: "Style-BERT-VITS2 fine-tuning integrating emotion vectors and prosody detection. End-to-end system integration with web-hosted emotional TTS deployment.",
  },
];

export function MethodologySection() {
  return (
    <section id="methodology" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Methodology & Architecture"
          subtitle="An end-to-end pipeline from raw Sinhala text to emotionally expressive speech."
        />

        {/* Pipeline diagram */}
        <AnimatedSection className="mb-20">
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center justify-center gap-2 min-w-[700px] px-4">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-2 min-w-[100px]">
                    <div
                      className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm
                        ${
                          i === 0
                            ? "bg-gradient-to-br from-accent to-accent-purple text-white"
                            : i === pipelineSteps.length - 1
                            ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                            : "bg-surface-card border border-border text-accent"
                        }`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-medium text-foreground-muted text-center leading-tight max-w-[100px]">
                      {step.label}
                    </span>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-foreground-muted shrink-0 mt-[-20px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Stage breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage, i) => (
            <AnimatedSection key={stage.number} delay={i * 0.08}>
              <div
                className="group h-full p-6 rounded-2xl bg-surface-card border border-border
                           hover:border-accent/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <stage.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-2xl font-bold text-foreground-muted/30">{stage.number}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">{stage.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{stage.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
