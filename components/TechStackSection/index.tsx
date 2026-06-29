"use client";

import { motion } from "framer-motion";

interface Props {
  data: Record<string, unknown>;
}

const categories = [
  {
    key: "frontend",
    title: "Frontend",
    accent: {
      label: "text-blue-600 dark:text-blue-300",
      labelBg: "bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20",
      dot: "bg-blue-500 dark:bg-blue-400",
      bloom: "bg-blue-500",
      bloomBottom: "bg-cyan-400",
      hoverBorder: "hover:border-blue-300 dark:hover:border-blue-500/30",
      chipHover:
        "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-500/15 dark:hover:text-blue-300 dark:hover:border-blue-400/30",
    },
  },
  {
    key: "backend",
    title: "Backend",
    accent: {
      label: "text-violet-600 dark:text-violet-300",
      labelBg: "bg-violet-50 border-violet-200 dark:bg-violet-500/10 dark:border-violet-500/20",
      dot: "bg-violet-500 dark:bg-violet-400",
      bloom: "bg-violet-500",
      bloomBottom: "bg-pink-500",
      hoverBorder: "hover:border-violet-300 dark:hover:border-violet-500/30",
      chipHover:
        "hover:bg-violet-50 hover:text-violet-600 hover:border-violet-300 dark:hover:bg-violet-500/15 dark:hover:text-violet-300 dark:hover:border-violet-400/30",
    },
  },
  {
    key: "database",
    title: "Database",
    accent: {
      label: "text-emerald-600 dark:text-emerald-300",
      labelBg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20",
      dot: "bg-emerald-500 dark:bg-emerald-400",
      bloom: "bg-emerald-500",
      bloomBottom: "bg-teal-400",
      hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-500/30",
      chipHover:
        "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-300 dark:hover:border-emerald-400/30",
    },
  },
  {
    key: "cloudDevops",
    title: "Cloud & DevOps",
    accent: {
      label: "text-amber-600 dark:text-amber-300",
      labelBg: "bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20",
      dot: "bg-amber-500 dark:bg-amber-400",
      bloom: "bg-amber-500",
      bloomBottom: "bg-red-500",
      hoverBorder: "hover:border-amber-300 dark:hover:border-amber-500/30",
      chipHover:
        "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 dark:hover:bg-amber-500/15 dark:hover:text-amber-300 dark:hover:border-amber-400/30",
    },
  },
];

const stats = [
  { value: "15+", label: "Technologies" },
  { value: "4", label: "Domains" },
  { value: "2+", label: "Years shipping" },
];

export default function TechStackSection({ data }: Props) {
  const title = (data.title as string) ?? "Tech Stack";
  const description = (data.description as string) ?? "";

  return (
    <section
      id="tech-stack"
      className="relative bg-white dark:bg-slate-950 py-24 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Eyebrow + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {description && (
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </motion.div>       

        {/* Cards grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((cat, index) => {
            const items = (data[cat.key] as string[]) ?? [];
            const a = cat.accent;

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-7 shadow-sm transition-all duration-300 ${a.hoverBorder}`}
              >
                {/* Ambient bloom top-right */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full ${a.bloom} opacity-5 dark:opacity-10 blur-[40px] transition-opacity duration-300 group-hover:opacity-15 dark:group-hover:opacity-20`}
                />
                {/* Ambient bloom bottom-left */}
                <div
                  className={`pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full ${a.bloomBottom} opacity-5 blur-[35px]`}
                />

                {/* Category label */}
                <div
                  className={`mb-5 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest ${a.labelBg} ${a.label}`}
                >
                  <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                  {cat.title}
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`cursor-default rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-slate-600 dark:text-slate-400 transition-all duration-200 ${a.chipHover}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
