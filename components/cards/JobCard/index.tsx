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

export default function JobCard({ job }: Props) {
  const {
    title,
    company,
    description,
    companyLogo,
    from,
    to,
  } = job;

  const logo = companyLogo?.fields?.file?.url;

  return (
    <div className="relative flex justify-between gap-10 pl-14">

      {/* Timeline Dot */}
      <div className="absolute left-0 top-3 z-10 h-5 w-5 rounded-full border-4 border-blue-500 bg-white dark:bg-slate-900" />

      {/* Left Side */}
      <div className="max-w-3xl">

        <div className="flex items-center gap-4">

          {logo ? (
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <Image
                src={`https:${logo}`}
                fill
                alt={company}
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 font-bold text-blue-600 dark:text-blue-400">
              {company?.[0]}
            </div>
          )}

          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>

            <p className="text-lg font-medium text-sky-600 dark:text-sky-400">
              {company}
            </p>
          </div>

        </div>

        <p className="mt-6 text-lg leading-9 text-slate-500 dark:text-slate-400">
          {description}
        </p>

      </div>

      {/* Date Badge */}
      <div className="shrink-0">
        <div className="rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 shadow-sm">
          {formatDate(from)} - {formatDate(to)}
        </div>
      </div>

    </div>
  );
}