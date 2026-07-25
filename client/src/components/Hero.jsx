import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineBolt } from "react-icons/hi2";
import { StatusBadge } from "./StatusDropdown.jsx";

export default function Hero() {
  return (
    <section id="home" className="bg-glow relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
            <HiOutlineBolt className="h-3.5 w-3.5 text-accent-2" />
            Built for lean sales teams
          </div>

          <h1 className="text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-text md:text-6xl">
            Every lead,
            <br />
            organized in <span className="text-accent">one place</span>.
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
            LeadDesk Mini captures inbound leads, tracks their status, and gives
            your team a clean dashboard to follow up — without the CRM bloat.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#lead-form"
              className="focus-ring group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              Submit a lead
              <HiArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/login"
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-muted transition hover:border-border-hover hover:text-text"
            >
              View admin dashboard
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-xs text-faint">
            <div>
              <p className="text-xl font-semibold text-text">2.4k+</p>
              <p className="mt-0.5">Leads captured</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-xl font-semibold text-text">98%</p>
              <p className="mt-0.5">Response rate</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-xl font-semibold text-text">4 min</p>
              <p className="mt-0.5">Avg. setup</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-accent-2/10 blur-2xl" />
          <div className="rounded-xl border border-border bg-surface p-5 shadow-2xl shadow-black/50">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium text-muted">Recent leads</p>
              <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[11px] text-faint">
                Live preview
              </span>
            </div>
            <div className="space-y-2">
              {[
                { name: "Ariana Cole", company: "Nimbus Co.", status: "New" },
                { name: "Rohan Mehta", company: "StackForge", status: "Contacted" },
                { name: "Elena Kovacs", company: "Brightloop", status: "Closed" },
              ].map((lead, i) => (
                <motion.div
                  key={lead.name}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3.5 py-3 transition hover:border-border-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-medium text-accent">
                      {lead.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{lead.name}</p>
                      <p className="text-xs text-faint">{lead.company}</p>
                    </div>
                  </div>
                  <StatusBadge status={lead.status} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
