"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="relative h-9 w-9 rounded-full bg-surface-secondary border border-border
                   flex items-center justify-center transition-all"
        aria-label="Toggle theme"
      >
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 rounded-full bg-surface-secondary border border-border
                 flex items-center justify-center transition-all duration-300
                 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300" />
      ) : (
        <Moon className="h-4 w-4 text-foreground-secondary transition-transform duration-300" />
      )}
    </button>
  );
}
