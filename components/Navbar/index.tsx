"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface Props {
  resumeUrl: string | null;
}

export default function Navbar({ resumeUrl }: Props) {
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          flex items-center justify-between
          w-full max-w-6xl
          rounded-2xl
          border border-white/30 dark:border-slate-700/50
          bg-white/70 dark:bg-slate-900/80
          backdrop-blur-xl
          shadow-lg
          px-6 py-4
        "
      >
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            A V.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                text-sm font-medium text-slate-600 dark:text-slate-300
                transition-all duration-300
                hover:text-slate-900 dark:hover:text-white
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-xl
                border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800
                px-5 py-2.5
                text-sm font-medium
                text-slate-700 dark:text-slate-200
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              <Download size={15} />
              Resume
            </a>
          )}

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="
              rounded-xl
              border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-800
              p-2.5
              text-slate-700 dark:text-slate-200
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </motion.nav>
    </header>
  );
}