import { useMemo, useState } from "react";
import {
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar({
  title = "Dashboard",
  query = "",
  setQuery = () => {},
}) {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  const user = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("admin")) ||
        {}
      );
    } catch {
      return {};
    }
  }, []);

  // Try every common field name
  const email =
    user.email ||
    user.adminEmail ||
    "";

  const name =
    user.name ||
    user.fullName ||
    user.username ||
    (email ? email.split("@")[0] : "Admin");

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/login");
  }

  return (
    <header className="glass sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border px-5 md:px-8">
      <h1 className="text-[15px] font-semibold text-text">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick search..."
            className="focus-ring w-52 rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-xs text-text placeholder:text-faint transition focus:border-accent/50 lg:w-64"
          />
        </div>


        {/* User */}
        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
            {initials}
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-text">
              {name}
            </p>

            {email && (
              <p className="text-xs text-faint">
                {email}
              </p>
            )}
          </div>

          <button
            onClick={logout}
            title="Logout"
            className="rounded-lg border border-border p-2 transition hover:border-red-500 hover:text-red-500"
          >
            <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}