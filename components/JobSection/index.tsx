import JobCard from "../cards/JobCard";
import MobileJobCard from "../cards/MobileJobCard";
import { motion } from "framer-motion";

interface Props {
  data: Record<string, any>;
}

export default function JobSection({ data }: Props) {
  const jobs = data.jobCards || [];

  return (
    <div className="bg-white dark:bg-slate-950 w-full">
      <section className="relative mx-auto max-w-6xl px-6 py-10">

      <div className="mb-16">
        <h2 className="text-5xl font-black text-slate-900 dark:text-white">
          Work{" "}
          <span className="bg-gradient-to-r from-sky-300 to-sky-600 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
      </div>

      <div className="relative">

        {/* Timeline */}
        <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-blue-500" />

        <div className="hidden md:block space-y-20">
          {jobs.map((job: any) => (
            <JobCard
              key={job.sys.id}
              job={job.fields}
            />
          ))}
        </div>

        <div className="block md:hidden space-y-20">
          {jobs.map((job: any) => (
            <MobileJobCard
              key={job.sys.id}
              job={job.fields}
            />
          ))}
        </div>

      </div>

    </section>
    </div>
  );
}