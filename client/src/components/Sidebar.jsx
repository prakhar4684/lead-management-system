import { useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

export default function Sidebar({ active, onNavigate }) {
  const navigate = useNavigate();

  const items = [
    { key: "dashboard", label: "Dashboard", icon: HiOutlineSquares2X2 },
    { key: "leads", label: "Leads", icon: HiOutlineUsers },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-16 flex-col border-r border-border bg-black md:w-60">
      <div className="flex h-16 items-center gap-2 border-b border-border px-4 md:px-5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent text-[13px] font-semibold text-white">
          L
        </span>
        <span className="hidden text-[15px] font-semibold tracking-tight md:inline">
          LeadDesk <span className="font-normal text-muted">Mini</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-2.5 py-5 md:px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate?.(item.key)}
              className={`focus-ring flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition md:justify-start ${
                isActive
                  ? "bg-accent/12 text-accent"
                  : "text-muted hover:bg-white/[0.05] hover:text-text"
              }`}
              title={item.label}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border px-2.5 py-4 md:px-3">
        <button
          onClick={() => navigate("/")}
          className="focus-ring flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-white/[0.05] hover:text-danger md:justify-start"
          title="Logout"
        >
          <HiOutlineArrowLeftOnRectangle className="h-[18px] w-[18px] shrink-0" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  );
}
