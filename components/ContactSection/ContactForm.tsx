"use client";

import { FormEvent, useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus({
      type: null,
      message: "",
    });

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // Replace with your API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      e.currentTarget.reset();

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }

    setLoading(false);
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              name="name"
              required
              placeholder="John Doe"
              className="w-full rounded-xl text-black border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              className="w-full rounded-xl text-black border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Message
          </label>

          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell me about your project..."
            className="w-full resize-none rounded-xl text-black border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {status.type && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 pt-2 text-sm text-gray-500">
          <Mail size={16} />
          I'll get back to you as soon as possible.
        </div>
      </form>
    </div>
  );
}