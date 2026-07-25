import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="bg-glow flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-text">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          to="/"
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent/90"
        >
          <HiArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
