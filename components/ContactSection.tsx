"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { Mail, Send } from "lucide-react";

const teamEmails = [
  { name: "S.P.A.S Jayasiri", email: "ict21860@fot.sjp.ac.lk" },
  { name: "K.A.P.S Karunarathna", email: "ict21867@fot.sjp.ac.lk" },
  { name: "A.V.N.J Pemarathna", email: "ict21896@fot.sjp.ac.lk" },
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder handler
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact Us"
          subtitle="For collaborations, feedback, or questions about the Sinhala Emotional TTS project, please reach out."
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Team emails */}
          <AnimatedSection>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Team Members</h3>
              <div className="space-y-3">
                {teamEmails.map((t) => (
                  <a
                    key={t.email}
                    href={`mailto:${t.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-card border border-border
                               hover:border-accent/20 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Mail className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-foreground-muted">{t.email}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-6">Send a Message</h3>

              <div>
                <label htmlFor="name" className="block text-xs font-medium text-foreground-muted mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-card border border-border
                             text-sm text-foreground placeholder-foreground-muted
                             focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
                             transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-foreground-muted mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-card border border-border
                             text-sm text-foreground placeholder-foreground-muted
                             focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
                             transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-foreground-muted mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-card border border-border
                             text-sm text-foreground placeholder-foreground-muted
                             focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
                             transition-all resize-none"
                  placeholder="Tell us about your interest in this research..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                           bg-gradient-to-r from-accent to-accent-purple text-white text-sm font-medium
                           shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30
                           hover:scale-[1.02] active:scale-[0.98]
                           transition-all duration-200 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
