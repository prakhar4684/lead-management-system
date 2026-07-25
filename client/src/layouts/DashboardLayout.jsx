import Sidebar from "../components/Sidebar.jsx";
import DashboardNavbar from "../components/DashboardNavbar.jsx";

export default function DashboardLayout({
  active,
  onNavigate,
  title,
  query,
  setQuery,
  children,
}) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Sidebar active={active} onNavigate={onNavigate} />
      <div className="pl-16 md:pl-60">
        <DashboardNavbar title={title} query={query} setQuery={setQuery} />
        <main className="px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}