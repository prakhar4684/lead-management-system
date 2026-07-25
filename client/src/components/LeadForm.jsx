import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { createLead } from "../api/api";

const FIELDS = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Jordan Lee",
    span: 1,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jordan@company.com",
    span: 1,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+1 (555) 000-0000",
    span: 1,
  },
  {
    name: "budget",
    label: "Budget",
    type: "number",
    placeholder: "10000",
    span: 1,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Acme Inc.",
    span: 2,
  },
];

const initialState = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  company: "",
  message: "",
};

export default function LeadForm() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        budget: form.budget ? Number(form.budget) : undefined,
      };

      const res = await createLead(payload);

      console.log(res);

      setSubmitted(true);
      setForm(initialState);

      setTimeout(() => {
        setSubmitted(false);
      }, 2600);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to submit lead."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="lead-form" className="relative py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-accent-2">
            Get started
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Tell us about your lead
          </h2>

          <p className="mt-3 text-sm text-muted">
            Fill this out and our team will follow up within one business day.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative rounded-xl border border-border bg-surface p-6 shadow-xl shadow-black/30 md:p-8"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-3 py-14 text-center"
            >
              <HiOutlineCheckCircle className="h-10 w-10 text-status-closed" />

              <p className="text-base font-medium text-text">
                Lead submitted successfully
              </p>

              <p className="max-w-xs text-sm text-muted">
                Thank you! Our team will contact you soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {FIELDS.map((field) => (
                <div
                  key={field.name}
                  className={field.span === 2 ? "sm:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-xs font-medium text-muted"
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={
                      field.name === "name" ||
                      field.name === "email" ||
                      field.name === "phone"
                    }
                    className="focus-ring w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-faint transition focus:border-accent/50"
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium text-muted"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you looking to solve?"
                  className="focus-ring w-full resize-none rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-faint transition focus:border-accent/50"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="focus-ring w-full rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Submitting..." : "Submit Lead"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}