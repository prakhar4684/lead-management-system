import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUsers,
  HiOutlineSparkles,
  HiOutlinePhoneArrowUpRight,
  HiOutlineCheckCircle,
  HiXMark,
} from "react-icons/hi2";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import LeadTable from "../components/LeadTable.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import Loader from "../components/Loader.jsx";
import { StatusBadge } from "../components/StatusDropdown.jsx";
import { getAllLeads, searchLeads, updateLeadStatus, deleteLead } from "../api/api.js";

const STAT_ICONS = [HiOutlineUsers, HiOutlineSparkles, HiOutlinePhoneArrowUpRight, HiOutlineCheckCircle];

function normalizeLeads(rawLeads) {
  return (rawLeads || []).map((lead) => ({
    ...lead,
    id: lead._id ?? lead.id,
    budget:
      typeof lead.budget === "number"
        ? `$${lead.budget.toLocaleString()}`
        : lead.budget,
  }));
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [viewLead, setViewLead] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;

    async function loadLeads() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllLeads();
        setLeads(normalizeLeads(data.leads));
      } catch (err) {
        console.error("Failed to fetch leads:", err);
        if (isMounted) setError("Couldn't load leads. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLeads();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    let isCancelled = false;

    const t = setTimeout(async () => {
      try {
        const data = await searchLeads(query);
        if (!isCancelled) setSearchResults(normalizeLeads(data));
      } catch (err) {
        console.error("Search failed:", err);
        if (!isCancelled) setError("Search failed. Please try again.");
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  const filteredLeads = query.trim() ? searchResults ?? leads : leads;

  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "New").length;
    const contactedCount = leads.filter((l) => l.status === "Contacted").length;
    const closedCount = leads.filter((l) => l.status === "Closed").length;
    const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

    return [
      { label: "Total Leads", value: total, delta: `${total} in pipeline` },
      { label: "New Leads", value: newCount, delta: `${pct(newCount)}% of total` },
      { label: "Contacted", value: contactedCount, delta: `${pct(contactedCount)}% of total` },
      { label: "Closed", value: closedCount, delta: `${pct(closedCount)}% conversion` },
    ];
  }, [leads]);

  async function handleStatusChange(id, status) {
    const previousLeads = leads;
    const previousResults = searchResults;

    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSearchResults((prev) =>
      prev ? prev.map((l) => (l.id === id ? { ...l, status } : l)) : prev
    );

    try {
      await updateLeadStatus(id, status);
    } catch (err) {
      console.error("Failed to update status:", err);
      setError("Couldn't update status. Please try again.");
      setLeads(previousLeads);
      setSearchResults(previousResults);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    const previousLeads = leads;
    const previousResults = searchResults;

    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSearchResults((prev) => (prev ? prev.filter((l) => l.id !== id) : prev));
    setDeleteTarget(null);

    try {
      await deleteLead(id);
    } catch (err) {
      console.error("Failed to delete lead:", err);
      setError("Couldn't delete lead. Please try again.");
      setLeads(previousLeads);
      setSearchResults(previousResults);
    }
  }

  return (



    <DashboardLayout
      active={activeTab}
      onNavigate={setActiveTab}
      title={activeTab === "dashboard" ? "Dashboard" : "Leads"}
      query={query}
      setQuery={setQuery}
    >
      {loading ? (
        <Loader label="Loading dashboard" fullscreen />
      ) : (
        <>
          {error && (
            <p className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-2.5 text-xs text-danger">
              {error}
            </p>
          )}

          {activeTab === "dashboard" ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-text">Overview</h2>
                <p className="mt-1 text-sm text-muted">A snapshot of your pipeline right now.</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => {
                  const Icon = STAT_ICONS[i];
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      whileHover={{ y: -2 }}
                      className="rounded-xl border border-border bg-surface p-5 transition hover:border-border-hover"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs font-medium text-muted">{stat.label}</p>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/12 text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="text-2xl font-semibold tracking-tight text-text">{stat.value}</p>
                      <p className="mt-1 text-xs text-faint">{stat.delta}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-text">Recent leads</h3>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="focus-ring text-xs font-medium text-accent transition hover:text-accent/80"
                  >
                    View all
                  </button>
                </div>
                <LeadTable
                  leads={filteredLeads.slice(0, 5)}
                  onStatusChange={handleStatusChange}
                  onView={setViewLead}
                  onDelete={setDeleteTarget}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-text">Leads</h2>
                  <p className="mt-1 text-sm text-muted">
                    {filteredLeads.length} of {leads.length} leads
                  </p>
                </div>
                <SearchBar value={query} onChange={setQuery} />
              </div>

              <LeadTable
                leads={filteredLeads}
                onStatusChange={handleStatusChange}
                onView={setViewLead}
                onDelete={setDeleteTarget}
              />
            </div>
          )}
        </>
      )}

      <DeleteModal
        open={!!deleteTarget}
        leadName={deleteTarget?.name}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      <AnimatePresence>
        {viewLead && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setViewLead(null)}
            />
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex h-full w-full max-w-sm flex-col border-l border-border bg-surface-2 p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-base font-semibold text-text">Lead details</h3>
                <button
                  onClick={() => setViewLead(null)}
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-faint transition hover:bg-white/[0.06] hover:text-text"
                >
                  <HiXMark className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 border-b border-border pb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-sm font-medium text-accent">
                  {viewLead.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{viewLead.name}</p>
                  <p className="text-xs text-faint">{viewLead.company}</p>
                </div>
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                {[
                  ["Email", viewLead.email],
                  ["Phone", viewLead.phone],
                  ["Budget", viewLead.budget],
                  ["Created at", viewLead.createdAt],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <dt className="text-faint">{label}</dt>
                    <dd className="font-medium text-text">{value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <dt className="text-faint">Status</dt>
                  <dd><StatusBadge status={viewLead.status} /></dd>
                </div>
                <div className="mt-6 border-t border-border pt-6">
                  <h4 className="mb-3 text-sm font-semibold text-text">
                    Message
                  </h4>

                  <div className="rounded-lg border border-border bg-bg p-4">
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted">
                      {viewLead.message || "No message provided."}
                    </p>
                  </div>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}