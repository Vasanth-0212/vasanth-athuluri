"use client";

import { motion } from "framer-motion";
import EducationCard from "../cards/EducationCard";

interface EducationEntry {
  fields: {
    title: string;
    schoolCollege: string;
    year: string;
    percentageCgpa: string;
  };
}

interface Props {
  data: Record<string, unknown>;
}

export default function EducationSection({ data }: Props) {
  const { title, educationCards } = data;
  const cards = educationCards as EducationEntry[];

  return (
    <section
      id="education"
      className="relative py-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
            {title as string}
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            My academic journey and achievements.
          </p>
        </motion.div>

        <div className="relative mt-20">
          {/* Timeline */}
          <div
            className="
              absolute
              left-1/2
              top-0
              hidden
              h-full
              w-[2px]
              -translate-x-1/2
              bg-gradient-to-b
              from-blue-400
              via-purple-400
              to-pink-400
              lg:block
            "
          />

          <div className="space-y-10">
            {cards.map((education, index) => (
              <div
                key={index}
                className={`
                  relative
                  grid
                  lg:grid-cols-2
                  gap-8
                  items-center
                  ${
                    index % 2 === 0
                      ? ""
                      : "lg:[&>*:first-child]:order-2"
                  }
                `}
              >
                <div>
                  <EducationCard
                    {...education.fields}
                    index={index}
                  />
                </div>

                <div className="hidden lg:block" />

                {/* Timeline Dot */}
                <div
                  className="
                    hidden
                    lg:block
                    absolute
                    left-1/2
                    top-1/2
                    h-5
                    w-5
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border-4
                    border-white dark:border-slate-900
                    bg-blue-500
                    shadow-lg
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}