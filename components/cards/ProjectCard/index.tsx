import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";

interface Props {
  project: Record<string, unknown>;
}

export default function ProjectCard({ project }: Props) {
  const img = project.image as any;
  const imageUrl = img?.fields?.file?.url as string | undefined;
  const imageAlt = (img?.fields?.title as string) ?? String(project.title ?? "");

  const techStack = project.techStack as string[] | undefined;

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-slate-700">
        {imageUrl ? (
          <Image
            src={`https:${imageUrl}`}
            alt={imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 dark:text-slate-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {String(project.title ?? "")}
        </h3>

        {!!project.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-slate-400">
            {documentToPlainTextString(project.description as Document)}
          </p>
        )}

        {Array.isArray(techStack) && techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {!!project.gitHubLink && (
            <a
              href={String(project.gitHubLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-slate-300 transition hover:bg-gray-50 dark:hover:bg-slate-600"
            >
              GitHub
            </a>
          )}

          {!!project.hostedLink && (
            <a
              href={String(project.hostedLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
