import { motion } from "framer-motion";
import {
  HiOutlineInboxArrowDown,
  HiOutlineSquares2X2,
  HiOutlineMagnifyingGlass,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import LeadForm from "../components/LeadForm.jsx";
import Footer from "../components/Footer.jsx";

const FEATURES = [
  {
    icon: HiOutlineInboxArrowDown,
    title: "Lead collection",
    description: "Capture leads from a single, focused submission form built for conversion.",
  },
  {
    icon: HiOutlineSquares2X2,
    title: "Dashboard",
    description: "See totals, new leads, and conversion at a glance from one clean view.",
  },
  {
    icon: HiOutlineMagnifyingGlass,
    title: "Search leads",
    description: "Find any lead in seconds by name, email, or company — no filters to configure.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Status tracking",
    description: "Move leads through New, Contacted, and Closed with a single click.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <Hero />

      <section id="features" className="relative border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 max-w-lg">
            <p className="text-xs font-medium uppercase tracking-wide text-accent-2">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Everything to run your pipeline, nothing you don&apos;t need.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-border bg-surface p-6 transition hover:border-border-hover"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/12 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-text">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border">
        <LeadForm />
      </div>

      <Footer />
    </div>
  );
}
