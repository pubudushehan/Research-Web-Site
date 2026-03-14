"use client";

import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { Mail } from "lucide-react";

interface Member {
  name: string;
  index: string;
  role: string;
  email: string;
  initials: string;
  color: string;
}

interface Supervisor {
  name: string;
  title: string;
  initials: string;
  color: string;
}

const members: Member[] = [
  {
    name: "S.P.A.S Jayasiri",
    index: "ICT/21/860",
    role: "Software Technology",
    email: "ict21860@fot.sjp.ac.lk",
    initials: "SJ",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "K.A.P.S Karunarathna",
    index: "ICT/21/867",
    role: "Software Technology",
    email: "ict21867@fot.sjp.ac.lk",
    initials: "KK",
    color: "from-accent to-accent-purple",
  },
  {
    name: "A.V.N.J Pemarathna",
    index: "ICT/21/896",
    role: "Multimedia Technology",
    email: "ict21896@fot.sjp.ac.lk",
    initials: "AP",
    color: "from-purple-500 to-pink-500",
  },
];

const supervisors: Supervisor[] = [
  {
    name: "Dr. Prabhani Liyanage",
    title: "Senior Lecturer Grade II, Faculty of Technology, USJ • Main Supervisor",
    initials: "PL",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Akalanka Panapitiya",
    title: "Lecturer, Faculty of Technology, USJ • Co-Supervisor",
    initials: "AP",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Nirasha Kulasooriya",
    title: "Lecturer, Faculty of Technology, USJ • Co-Supervisor",
    initials: "NK",
    color: "from-rose-500 to-red-500",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Team & Supervisors"
          subtitle="The people behind the Sinhala Emotional TTS research project."
        />

        {/* University info */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex flex-col items-center gap-2">
            <p className="text-sm font-semibold text-accent">Group 26</p>
            <p className="text-base font-medium text-foreground">
              University of Sri Jayewardenepura
            </p>
            <p className="text-sm text-foreground-muted">
              Faculty of Technology • Department of Information and Communication Technology
            </p>
          </div>
        </AnimatedSection>

        {/* Group members */}
        <div className="mb-16">
          <AnimatedSection>
            <h3 className="text-lg font-semibold text-foreground text-center mb-8">
              Project Members
            </h3>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {members.map((m, i) => (
              <AnimatedSection key={m.index} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl bg-surface-card border border-border hover:border-accent/20 hover:shadow-lg transition-all duration-300 text-center">
                  {/* Avatar */}
                  <div
                    className={`h-16 w-16 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-lg font-bold text-white">{m.initials}</span>
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-1">{m.name}</h4>
                  <p className="text-xs font-medium text-accent mb-1">{m.index}</p>
                  <p className="text-xs text-foreground-muted mb-3">{m.role}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-accent transition-colors"
                  >
                    <Mail className="h-3 w-3" />
                    {m.email}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Supervisors */}
        <div>
          <AnimatedSection>
            <h3 className="text-lg font-semibold text-foreground text-center mb-8">
              Supervisors
            </h3>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {supervisors.map((s, i) => (
              <AnimatedSection key={s.name} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl bg-surface-card border border-border hover:border-accent/20 hover:shadow-lg transition-all duration-300 text-center">
                  <div
                    className={`h-16 w-16 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-lg font-bold text-white">{s.initials}</span>
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-2">{s.name}</h4>
                  <p className="text-xs text-foreground-muted leading-relaxed">{s.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
