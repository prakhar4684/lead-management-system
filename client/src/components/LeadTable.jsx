import { HiOutlineEye, HiOutlineTrash, HiOutlineInboxStack } from "react-icons/hi2";
import StatusDropdown from "./StatusDropdown.jsx";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function LeadTable({ leads, onStatusChange, onView, onDelete }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-surface py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04] text-faint">
          <HiOutlineInboxStack className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-text">No leads found</p>
          <p className="mt-1 text-xs text-faint">New submissions will show up here.</p>
        </div>
      </div>
    );
  }

  const columns = ["Name", "Email", "Phone", "Budget", "Company", "Status", "Created At", "Actions"];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-faint"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-border/60 last:border-0 transition hover:bg-white/[0.02]"
              >
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-[11px] font-medium text-accent">
                      {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="font-medium text-text">{lead.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-muted">{lead.email}</td>
                <td className="whitespace-nowrap px-5 py-4 text-muted">{lead.phone}</td>
                <td className="whitespace-nowrap px-5 py-4 text-muted">{lead.budget}</td>
                <td className="whitespace-nowrap px-5 py-4 text-muted">{lead.company}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  <StatusDropdown
                    status={lead.status}
                    onChange={(s) => onStatusChange?.(lead.id, s)}
                  />
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-muted">{formatDate(lead.createdAt)}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onView?.(lead)}
                      className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-faint transition hover:bg-white/[0.06] hover:text-text"
                      aria-label="View lead"
                    >
                      <HiOutlineEye className="h-[17px] w-[17px]" />
                    </button>
                    <button
                      onClick={() => onDelete?.(lead)}
                      className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-faint transition hover:bg-danger/10 hover:text-danger"
                      aria-label="Delete lead"
                    >
                      <HiOutlineTrash className="h-[17px] w-[17px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
