// components/cards/MobileJobCard.tsx

import Image from "next/image";

interface Props {
  job: Record<string, any>;
}

function formatDate(date?: string) {
  if (!date) return "Present";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function getDuration(from?: string, to?: string) {
  if (!from) return "";

  const start = new Date(from);
  const end = to ? new Date(to) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months < 12) return `${months} mo`;

  const years = Math.floor(months / 12);
  const remaining = months % 12;

  return remaining
    ? `${years} yr ${remaining} mo`
    : `${years} yr`;
}

export default function MobileJobCard({ job }: Props) {
  const {
    title,
    company,
    description,
    companyLogo,
    from,
    to,
    techStack,
  } = job;

  const logo = companyLogo?.fields?.file?.url;
  const logoAlt =
    companyLogo?.fields?.title || company || "Company Logo";

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">

      {/* Date */}
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
          {formatDate(from)} - {formatDate(to)}
        </span>

        <span className="text-xs text-gray-500 dark:text-slate-400">
          {getDuration(from, to)}
        </span>
      </div>

      {/* Logo + Title */}
      <div className="flex items-start gap-4">

        {logo ? (
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700">
            <Image
              src={`https:${logo}`}
              alt={logoAlt}
              fill
              className="object-contain p-2"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 text-lg font-bold text-blue-600 dark:text-blue-400">
            {company?.charAt(0)}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
            {company}
          </p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-slate-400">
          {description}
        </p>
      )}

      {/* Tech Stack */}
      {Array.isArray(techStack) && techStack.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {techStack.map((tech: string) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}