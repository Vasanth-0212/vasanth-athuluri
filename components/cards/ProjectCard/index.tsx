"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import { motion } from "framer-motion";
import GitHubIcon from "@/components/icons/GitHubIcon";

interface Props {
  project: Record<string, unknown>;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const img = project.image as any;
  const imageUrl = img?.fields?.file?.url as string | undefined;
  const imageAlt = (img?.fields?.title as string) ?? String(project.title ?? "");
  const techStack = project.techStack as string[] | undefined;
  const reversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 shrink-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800 shadow-md">
          {imageUrl ? (
            <Image
              src={`https:${imageUrl}`}
              alt={imageAlt}
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 dark:text-slate-500">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {String(project.title ?? "")}
        </h3>

        {!!project.description && (
          <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
            {documentToPlainTextString(project.description as Document)}
          </p>
        )}

        {Array.isArray(techStack) && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-2">
          {!!project.gitHubLink && (
            <a
              href={String(project.gitHubLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 transition hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <GitHubIcon size={15} />
              GitHub
            </a>
          )}

          {!!project.hostedLink && (
            <a
              href={String(project.hostedLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
