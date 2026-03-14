"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { FileInput, Brain, Music2, Volume2 } from "lucide-react";

const stages = [
  {
    icon: FileInput,
    title: "Input Layer",
    subtitle: "Text Processing",
    color: "bg-blue-500",
    items: ["Sinhala plain text input", "Text normalization", "Character encoding"],
  },
  {
    icon: Brain,
    title: "Emotion Detection",
    subtitle: "LaBSE + Ontology",
    color: "bg-accent",
    items: [
      "SinBERT / LaBSE embeddings",
      "Centroid-based classification",
      "Contextual disambiguation",
      "Hybrid fallback (Ontology + ML)",
      "Output: 0-Neutral, 1-Happy, 2-Sad, 3-Angry",
    ],
  },
  {
    icon: Music2,
    title: "Prosody Detection",
    subtitle: "BERT-based Analysis",
    color: "bg-accent-purple",
    items: [
      "BERT inside Style-BERT-VITS2",
      "Pause detection & emphasis",
      "Syllable duration for Sinhala",
      "Prosody map generation",
    ],
  },
  {
    icon: Volume2,
    title: "Voice Generation",
    subtitle: "VITS2 Synthesis",
    color: "bg-green-500",
    items: [
      "Phoneme + prosody map input",
      "Style/emotion feature integration",
      "Normalizing flows + Fourier decoder",
      "High-quality emotional waveform output",
    ],
  },
];

export function EmotionDetectionSection() {
  return (
    <section id="emotion" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Emotion Detection & Voice Generation"
          subtitle="A four-stage pipeline from text input to emotionally expressive speech output."
        />

        {/* 4-stage process */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stages.map((stage, i) => (
            <AnimatedSection key={stage.title} delay={i * 0.1}>
              <div className="group h-full p-6 rounded-2xl bg-surface-card border border-border hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {/* Stage number */}
                <div className="absolute top-4 right-4 text-5xl font-bold text-foreground-muted/10">
                  {i + 1}
                </div>

                <div
                  className={`h-12 w-12 rounded-xl ${stage.color} text-white flex items-center justify-center mb-4 shadow-lg`}
                >
                  <stage.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{stage.title}</h3>
                <p className="text-xs font-medium text-foreground-muted mb-4">{stage.subtitle}</p>
                <ul className="space-y-2">
                  {stage.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground-secondary">
                      <div className="h-1 w-1 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Technical detail cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="p-6 rounded-2xl bg-surface-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Emotion Detection (LaBSE-Based)
              </h3>
              <div className="space-y-3 text-sm text-foreground-secondary leading-relaxed">
                <p>
                  Uses Language-Agnostic BERT Sentence Embedding (LaBSE) for generating rich
                  Sinhala text embeddings that capture cross-lingual semantic meaning.
                </p>
                <p>
                  Employs centroid-based classification to map embeddings to emotion classes
                  (happy, sad, angry, neutral). Contextual disambiguation handles ambiguous
                  emotional cues, while a hybrid fallback combines ontology-based and ML-based
                  outputs for robust classification.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="p-6 rounded-2xl bg-surface-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Voice Generation (Style-BERT-VITS2)
              </h3>
              <div className="space-y-3 text-sm text-foreground-secondary leading-relaxed">
                <p>
                  The voice generation stack takes phoneme and prosody maps alongside style/emotion
                  features as input. Processing uses normalizing flows combined with a Fourier
                  transform-based decoder (VITS2 architecture).
                </p>
                <p>
                  The output is a high-quality emotional speech waveform that preserves natural
                  voice characteristics while accurately expressing the detected emotion with
                  culturally appropriate Sinhala prosody.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
