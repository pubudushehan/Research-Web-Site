"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { Check, Circle, Clock } from "lucide-react";

type Status = "completed" | "current" | "upcoming";

interface TimelineItem {
  label: string;
  status: Status;
}

const timelineItems: TimelineItem[] = [
  { label: "Project Initiation & Literature Review", status: "completed" },
  { label: "Hardware Setup & Environment Configuration", status: "completed" },
  { label: "Script Development & Speaker Selection", status: "completed" },
  { label: "Emotional Speech Data Collection", status: "completed" },
  { label: "Data Preprocessing & Annotation", status: "completed" },
  { label: "Sinhala Semantic-Emotion Analysis Framework", status: "completed" },
  { label: "Ontology Designing", status: "completed" },
  { label: "Transformer Fine-Tuning", status: "completed" },
  { label: "Fine-Tuning Style-BERT-VITS2", status: "current" },
  { label: "End-to-End System Integration", status: "upcoming" },
  { label: "Model Evaluation & Performance Analysis", status: "upcoming" },
  { label: "User Studies & MOS Testing", status: "upcoming" },
  { label: "Result Analysis & Model Refinement", status: "upcoming" },
  { label: "Documentation & Final Submission", status: "upcoming" },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "completed")
    return (
      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shadow-md shadow-green-500/30">
        <Check className="h-4 w-4 text-white" />
      </div>
    );
  if (status === "current")
    return (
      <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shadow-md shadow-accent/30 animate-pulse-soft">
        <Circle className="h-4 w-4 text-white fill-white" />
      </div>
    );
  return (
    <div className="h-8 w-8 rounded-full bg-surface-secondary border border-border flex items-center justify-center">
      <Clock className="h-3.5 w-3.5 text-foreground-muted" />
    </div>
  );
}

function statusColor(status: Status) {
  if (status === "completed") return "text-green-500";
  if (status === "current") return "text-accent";
  return "text-foreground-muted";
}

function statusLabel(status: Status) {
  if (status === "completed") return "Completed";
  if (status === "current") return "In Progress";
  return "Upcoming";
}

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 md:py-32 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Progress & Timeline"
          subtitle="Tracking milestones from inception to final submission."
        />

        <div className="max-w-3xl mx-auto">
          {timelineItems.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.04}>
              <div className="flex gap-4 relative">
                {/* Vertical line */}
                {i < timelineItems.length - 1 && (
                  <div
                    className={`absolute left-[15px] top-8 w-[2px] h-[calc(100%)] ${
                      item.status === "completed"
                        ? "bg-green-500/30"
                        : item.status === "current"
                        ? "bg-gradient-to-b from-accent/30 to-border"
                        : "bg-border"
                    }`}
                  />
                )}

                {/* Icon */}
                <div className="shrink-0 z-10">
                  <StatusIcon status={item.status} />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pb-8 ${
                    item.status === "current" ? "pb-10" : ""
                  }`}
                >
                  <div
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      item.status === "current"
                        ? "bg-accent/5 border border-accent/20 shadow-sm"
                        : "hover:bg-surface-card"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <p
                        className={`text-sm font-medium ${
                          item.status === "upcoming"
                            ? "text-foreground-muted"
                            : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </p>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                          item.status === "completed"
                            ? "bg-green-500/10 text-green-500"
                            : item.status === "current"
                            ? "bg-accent/10 text-accent"
                            : "bg-surface-secondary text-foreground-muted"
                        }`}
                      >
                        {statusLabel(item.status)}
                      </span>
                    </div>
                    {item.status === "current" && (
                      <p className="text-xs text-accent mt-2 font-medium">
                        ← We are here now
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
