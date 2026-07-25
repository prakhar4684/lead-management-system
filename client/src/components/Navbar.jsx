import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-[13px] font-semibold text-white">
            L
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            LeadDesk <span className="text-muted font-normal">Mini</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted transition hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/login"
            className="focus-ring rounded-lg bg-white/[0.06] border border-border px-4 py-2 text-sm font-medium text-text transition hover:border-border-hover hover:bg-white/[0.09]"
          >
            Admin Login
          </Link>
        </div>

        <button
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="glass border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted transition hover:text-text"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="focus-ring w-fit rounded-lg border border-border bg-white/[0.06] px-4 py-2 text-sm font-medium text-text"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
