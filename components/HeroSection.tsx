"use client";

import { motion } from "framer-motion";
import { Play, FileText, Download, Sparkles, Smile, Frown, Angry, Meh } from "lucide-react";

const taglines = [
  "Automatically infers emotion from Sinhala text",
  "Generates emotionally expressive speech without manual labels",
  "Designed for accessibility, education, and conversational AI in Sri Lanka",
];

const buttons = [
  { label: "Try Demo", icon: Play, href: "#", primary: true, disabled: false },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-medium text-accent">Research Project 2025</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Semantic&#8209;Aware Emotional{" "}
              <span className="bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent">
                Text&#8209;to&#8209;Speech
              </span>{" "}
              for Sinhala
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground-secondary mb-8 max-w-xl mx-auto lg:mx-0"
            >
              A Single&#8209;Speaker Deep Learning Approach for Culturally Authentic Emotional Speech
            </motion.p>

            {/* Tagline bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3 mb-10"
            >
              {taglines.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground-muted justify-center lg:justify-start"
                >
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                    ${
                      btn.primary
                        ? "bg-gradient-to-r from-accent to-accent-purple text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                        : "bg-surface-card border border-border text-foreground hover:border-accent/30 hover:shadow-md"
                    }
                    ${btn.disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
                >
                  <btn.icon className="h-4 w-4" />
                  {btn.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Glass card frame */}
              <div className="relative rounded-3xl bg-glass backdrop-blur-xl border border-glass-border p-8 shadow-2xl">
                {/* Waveform visualization */}
                <div className="mb-6">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="h-2 w-2 rounded-full bg-red-400" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>
                  <svg viewBox="0 0 400 80" className="w-full h-20 overflow-visible">
                    {/* Waveform bars */}
                    {Array.from({ length: 50 }).map((_, i) => {
                      const h = 10 + Math.sin(i * 0.4) * 25 + Math.random() * 15;
                      return (
                        <rect
                          key={i}
                          x={i * 8}
                          y={40 - h / 2}
                          width={4}
                          height={h}
                          rx={2}
                          className="fill-accent/60"
                        >
                          <animate
                            attributeName="height"
                            values={`${h};${h * 0.5};${h}`}
                            dur={`${1.5 + Math.random()}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="y"
                            values={`${40 - h / 2};${40 - (h * 0.5) / 2};${40 - h / 2}`}
                            dur={`${1.5 + Math.random()}s`}
                            repeatCount="indefinite"
                          />
                        </rect>
                      );
                    })}
                  </svg>
                </div>

                {/* Sinhala text sample */}
                <div className="mb-6 p-4 rounded-2xl bg-surface-secondary/50 border border-border">
                  <p className="text-xs text-foreground-muted mb-1">Input Text</p>
                  <p className="text-base font-medium text-foreground">
                    &quot;මට ඉතා සතුටුයි&quot;
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">→ &quot;I am very happy&quot;</p>
                </div>

                {/* Emotion indicators */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: Smile, label: "Happy", color: "text-green-500", active: true },
                    { icon: Frown, label: "Sad", color: "text-blue-400", active: false },
                    { icon: Angry, label: "Angry", color: "text-red-400", active: false },
                    { icon: Meh, label: "Neutral", color: "text-gray-400", active: false },
                  ].map((e) => (
                    <div
                      key={e.label}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                        e.active
                          ? "bg-accent/10 border border-accent/30 scale-105"
                          : "bg-surface-secondary/30 border border-transparent opacity-50"
                      }`}
                    >
                      <e.icon className={`h-5 w-5 ${e.color}`} />
                      <span className="text-[10px] font-medium text-foreground-muted">
                        {e.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Output indicator */}
                <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Play className="h-3.5 w-3.5 text-green-500 ml-0.5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Emotional Speech Output</p>
                    <p className="text-[10px] text-foreground-muted">Happy • Confidence: 0.94</p>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-purple/20 blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-tr from-accent-purple/15 to-accent/15 blur-xl animate-float [animation-delay:2s]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
