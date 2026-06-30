"use client";

import ContactForm from "./ContactForm";

interface ContactSectionData {
  title?: string;
}

interface Props {
  section: ContactSectionData;
}

export default function ContactSection({ section }: Props) {
  return (
    <div className="bg-white dark:bg-slate-950 w-full">
      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 py-10"
      >
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {section.title || "Contact Me"}
          </h2>

          <p className="mt-4 text-gray-600 dark:text-slate-400">
            Have a project or opportunity? I'd love to hear from you.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}