import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function DeleteModal({ open, leadName, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-xl border border-border bg-surface-2 p-6 shadow-2xl shadow-black/60"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-danger/30 bg-danger/10">
              <HiOutlineExclamationTriangle className="h-5 w-5 text-danger" />
            </div>
            <h3 className="text-base font-semibold text-text">Delete lead</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              This will permanently remove{" "}
              <span className="font-medium text-text">{leadName || "this lead"}</span> from
              your pipeline. This can&apos;t be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="focus-ring rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-border-hover hover:text-text"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="focus-ring rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:bg-danger/90"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
