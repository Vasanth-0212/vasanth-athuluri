"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ContentfulAsset {
  fields?: {
    title?: string;
    file?: {
      url?: string;
      details?: {
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
}

interface Props {
  data: {
    name?: string;
    title?: string;
    description?: string;
    profileImage?: ContentfulAsset;
    experience?: number;
    projects?: number;
  };
}

export default function ProfileSection({ data }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const {
    name = "",
    title = "",
    description = "",
    profileImage,
  } = data;

  const imageUrl = profileImage?.fields?.file?.url;
  const imageWidth =
    profileImage?.fields?.file?.details?.image?.width ?? 500;
  const imageHeight =
    profileImage?.fields?.file?.details?.image?.height ?? 500;

  const imageAlt =
    profileImage?.fields?.title || name || "Profile Image";

  return (
    <div className="bg-white dark:bg-slate-950 w-full">
      <section
        id="home"
        className="relative overflow-hidden pt-[110px] pb-4 md:py-32"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl pl-6 px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 text-center lg:order-1 lg:text-left"
            >
              {title && (
                <span className="inline-block rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                  {title}
                </span>
              )}

              {name && (
                <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
                  {name}
                </h1>
              )}

              {description && (
                <p className="mt-8 text-center md:text-left max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              )}

              <div className="mt-10 flex flex-col items-center gap-8 lg:items-start">
                {/* Stats */}
                <div className="flex gap-10">
                  {/* Experience */}
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {data.experience ?? 0}+
                    </h3>
                    <p className="mt-1 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Years Experience
                    </p>
                  </div>

                  <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />

                  {/* Projects */}
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {data.projects ?? 0}+
                    </h3>
                    <p className="mt-1 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Projects
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="text-[12px] inline-flex items-center rounded-xl bg-slate-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-xl"
                >
                  LET'S TALK →
                </a>
              </div>

            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 flex justify-center lg:order-2 transition-transform duration-500"
            >
              {imageUrl && (
                <motion.div
                  className="relative  hover:cursor-pointer"
                  animate={isDesktop ? { rotate: [0, 6, 0, -6, 0] } : {}}
                  transition={isDesktop ? {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  } : {}}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

                  {/* Floating Image */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div className="rounded-full bg-white dark:bg-slate-800 p-3 shadow-2xl hover:cursor-pointer">
                      <Image
                        src={`https:${imageUrl}`}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        priority
                        className="h-72 w-72 rounded-full object-cover md:h-96 md:w-96"
                      />
                    </div>
                  </motion.div>

                  {/* Decorative Ring */}
                  <div className="absolute inset-0 rounded-full border border-slate-200/50" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}