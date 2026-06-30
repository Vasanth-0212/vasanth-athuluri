"use client";

import { motion } from "framer-motion";

interface EducationCardProps {
  title: string;
  schoolCollege: string;
  year: string;
  percentageCgpa: string;
  index: number;
}

export default function EducationCard({
  title,
  schoolCollege,
  year,
  percentageCgpa,
  index,
}: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        className="
          rounded-3xl
          border border-white/30 dark:border-slate-700/50
          bg-white/70 dark:bg-slate-800/80
          backdrop-blur-lg
          p-6
          shadow-lg
          hover:shadow-xl
          transition-all
          duration-300
          hover:-translate-y-1
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {schoolCollege}
            </p>
          </div>

          <span
            className="
              rounded-full
              bg-blue-100 dark:bg-blue-900/40
              px-3
              py-1
              text-sm
              font-medium
              text-blue-700 dark:text-blue-300
            "
          >
            {year}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            CGPA / Percentage
          </p>

          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {percentageCgpa}
          </p>
        </div>
      </div>
    </motion.div>
  );
}