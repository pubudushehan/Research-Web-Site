"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import {
  FileText,
  FileBarChart,
  Presentation,
  Github,
  BookOpen,
  Download,
  ScrollText,
  Database,
} from "lucide-react";

const resources = [
  {
    icon: FileText,
    title: "Research Thesis",
    desc: "Full research thesis document with literature review, methodology, and results.",
    format: "PDF",
    href: "#",
  },
  {
    icon: Database,
    title: "Dataset",
    desc: "Complete dataset containing emotionally expressive Sinhala audio and text.",
    format: "ZIP",
    href: "#",
  },
  {
    icon: Presentation,
    title: "Final Presentation",
    desc: "Final presentation slides with complete results and findings.",
    format: "PPTX",
    href: "#",
  },
  {
    icon: Github,
    title: "GitHub Repository",
    desc: "Source code, models, and implementation details.",
    format: "Code",
    href: "#",
  },
  {
    icon: BookOpen,
    title: "Documentation & Tables",
    desc: "Summary tables, data documentation, and supplementary materials.",
    format: "XLSX",
    href: "#",
  },
  {
    icon: ScrollText,
    title: "Research Paper",
    desc: "Published academic paper detailing the methodology, experiments, and final results.",
    format: "PDF",
    href: "#",
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Resources & Downloads"
          subtitle="Access project documents, presentations, and source code."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resources.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 0.08}>
              <div className="group h-full p-6 rounded-2xl bg-surface-card border border-border hover:border-accent/20 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <r.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-semibold text-foreground-muted px-2 py-0.5 rounded-full bg-surface-secondary border border-border">
                    {r.format}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed mb-4 flex-1">
                  {r.desc}
                </p>
                <a
                  href={r.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                             bg-surface-secondary border border-border text-sm font-medium text-foreground
                             hover:bg-accent hover:text-white hover:border-accent
                             transition-all duration-200 w-fit cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
