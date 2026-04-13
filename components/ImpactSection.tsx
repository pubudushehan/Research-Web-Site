"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import {
  Sparkles,
  Users,
  GraduationCap,
  Eye,
  MessageSquare,
  Globe,
  FlaskConical,
  BarChart3,
  UserCheck,
  RefreshCw,
  FileText,
  Presentation,
  Database,
  Brain,
  Zap,
} from "lucide-react";

const significanceItems = [
  {
    icon: Sparkles,
    text: "Bridges the technological gap for Sinhala language in emotional text-to-speech.",
  },
  {
    icon: Users,
    text: "Benefits approximately 17 million Sinhala speakers, especially visually impaired users.",
  },
  {
    icon: GraduationCap,
    text: "Enables more natural and engaging educational e-learning applications.",
  },
  {
    icon: Eye,
    text: "Improves screen readers and accessibility tools with emotional expressiveness.",
  },
  {
    icon: MessageSquare,
    text: "Powers conversational agents and virtual assistants in Sinhala with authentic emotion.",
  },
  {
    icon: Globe,
    text: "Provides a methodological template for other low-resource languages worldwide.",
  },
];

const futureWork = [
  { icon: Database, title: "Dataset Expansion", desc: "Increase the dataset volume & include other emotions." },
  { icon: Brain, title: "Enhanced Models", desc: "Enhanced Ontology and ML model." },
  { icon: RefreshCw, title: "Model Retraining", desc: "Retrain model with different configurations." },
  { icon: Zap, title: "Pipeline Optimization", desc: "End-to-end pipeline optimization." },
  { icon: Users, title: "Voice Variance", desc: "Increase the variance of voices (Male, Female, Child)." },
  { icon: FileText, title: "Research Paper", desc: "Documentation & Research Paper Writing." },
];

export function ImpactSection() {
  return (
    <section id="impact" className="py-24 md:py-32 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Impact & Future Work"
          subtitle="The significance of this research and the path forward."
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Significance */}
          <AnimatedSection>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Research Significance</h3>
              <div className="space-y-3">
                {significanceItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-border
                               hover:border-accent/20 hover:shadow-md transition-all duration-200"
                  >
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Future Work */}
          <AnimatedSection delay={0.1}>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Future Work</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {futureWork.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-surface-card border border-border
                               hover:border-accent-purple/20 hover:shadow-md transition-all duration-200"
                  >
                    <div className="h-9 w-9 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-3">
                      <item.icon className="h-4 w-4 text-accent-purple" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-foreground-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
