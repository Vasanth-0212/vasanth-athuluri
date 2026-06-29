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
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py4"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          {section.title || "Contact Me"}
        </h2>

        <p className="mt-4 text-gray-600">
          Have a project or opportunity? I'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <ContactForm />
      </div>
    </section>
  );
}