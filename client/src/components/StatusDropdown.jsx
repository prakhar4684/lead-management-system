import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const STATUS_CONFIG = {
  New: {
    dot: "bg-status-new",
    text: "text-status-new",
    bg: "bg-status-new/10",
    border: "border-status-new/30",
  },
  Contacted: {
    dot: "bg-status-contacted",
    text: "text-status-contacted",
    bg: "bg-status-contacted/10",
    border: "border-status-contacted/30",
  },
  Closed: {
    dot: "bg-status-closed",
    text: "text-status-closed",
    bg: "bg-status-closed/10",
    border: "border-status-closed/30",
  },
};

const STATUSES = Object.keys(STATUS_CONFIG);

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.New;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${cfg.border} ${cfg.bg} px-2.5 py-1 text-xs font-medium ${cfg.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}

export default function StatusDropdown({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.New;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`focus-ring inline-flex items-center gap-1.5 rounded-full border ${cfg.border} ${cfg.bg} px-2.5 py-1 text-xs font-medium ${cfg.text} transition hover:border-border-hover`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
        {status}
        <HiChevronDown className="h-3 w-3 opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-xl border border-border bg-surface-2 p-1 shadow-2xl shadow-black/50">
          {STATUSES.map((s) => {
            const c = STATUS_CONFIG[s];
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onChange?.(s);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-muted transition hover:bg-white/5 hover:text-text"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                {s}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
