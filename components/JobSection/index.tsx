// components/blocks/JobSection.tsx
import { AnyBlock } from '@/lib/contentful';
import JobCard from '../cards/JobCard';

interface Props {
  data: Record<string, unknown>;
}

export default function JobSection({ data }: Props) {
  // blocks field contains the list of job card entries
  const jobs = data.jobCards

  return (
    <section className="mx-auto max-w-3xl px-4 py-4">

      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
          Career
        </p>
        <h2 className="mt-1 text-3xl font-bold text-gray-900">
          Work Experience
        </h2>
        <div className="mt-3 h-1 w-12 rounded-full bg-indigo-500" />
      </div>

      {/* Cards */}
      <div className="relative flex flex-col gap-4">
        <div className="absolute left-[27px] top-0 h-full w-px bg-gray-100" />
        {jobs.map((job : any) => (
          <JobCard
            key={job.sys.id}
            job={job.fields as Record<string, unknown>}
          />
        ))}
      </div>
    </section>
  );
}