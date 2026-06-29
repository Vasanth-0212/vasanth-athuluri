// components/blocks/JobCard.tsx
import Image from 'next/image';

interface Props {
  job: Record<string, unknown>;
}

function formatDate(dateStr?: unknown): string {
  if (!dateStr) return 'Present';
  return new Date(dateStr as string).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function getDuration(from?: unknown, to?: unknown): string {
  const start = from ? new Date(from as string) : new Date();
  const end = to ? new Date(to as string) : new Date();
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (months < 12) return `${months}mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years}y ${rem}mo` : `${years}y`;
}

export default function JobCard({ job }: Props) {
  const { title, company, description, companyLogo, from, to, techStack } = job;

  const logo = companyLogo as any;
  const logoUrl = logo?.fields?.file?.url as string | undefined;
  const logoAlt = (logo?.fields?.title as string) ?? (company as string);

  return (
    <div className="group relative flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">

      {/* Logo */}
      <div className="shrink-0">
        {logoUrl ? (
          <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
            <Image
              src={`https:${logoUrl}`}
              alt={logoAlt}
              fill
              className="object-contain p-1.5"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-500">
            {String(company ?? '').charAt(0)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 min-w-0">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-tight">
              {String(title ?? '')}
            </h3>
            <p className="text-sm font-medium text-indigo-600">
              {String(company ?? '')}
            </p>
          </div>

          {/* Dates */}
          <div className="flex flex-col items-start sm:items-end shrink-0">
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatDate(from)} — {formatDate(to)}
            </span>
            <span className="text-xs text-gray-400">
              {getDuration(from, to)}
            </span>
          </div>
        </div>

        {/* Description */}
        {!!description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {String(description)}
          </p>
        )}

        {/* Tech Stack */}
        {Array.isArray(techStack) && techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(techStack as string[]).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}