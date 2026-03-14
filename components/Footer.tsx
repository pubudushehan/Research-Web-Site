"use client";

export function Footer() {
  return (
    <footer className="py-8 bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">ST</span>
            </div>
            <span className="text-sm font-medium text-foreground">Sinhala Emotional TTS</span>
          </div>
          <p className="text-xs text-foreground-muted text-center">
            © {new Date().getFullYear()} Group 26 — University of Sri Jayewardenepura, Faculty of Technology.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
