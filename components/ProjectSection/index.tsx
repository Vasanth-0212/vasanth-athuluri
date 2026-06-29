"use client";

import { useMemo, useState } from "react";
import ProjectCard from "../cards/ProjectCard";

interface Props {
  data: Record<string, unknown>;
}

const INITIAL_COUNT = 6;

export default function ProjectSection({ data }: Props) {
  const [expanded, setExpanded] = useState(false);
  const projects = (data.projectCards as Record<string, unknown>[]) ?? [];

  const visibleProjects = useMemo(() => {
    return expanded ? projects : projects.slice(0, INITIAL_COUNT);
  }, [expanded, projects]);

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Featured Projects
        </h2>

        <p className="mt-4 text-gray-600">
          Some of the projects I've worked on.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={String(project.title ?? index)}
            project={project.fields as Record<string, unknown>}
          />
        ))}
      </div>

      {projects.length > INITIAL_COUNT && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-xl bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
}