import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-[13px] font-semibold text-white">
                L
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                LeadDesk <span className="font-normal text-muted">Mini</span>
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-faint">
              A lightweight lead management system for small teams who want
              clarity without complexity.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-faint">
                Product
              </p>

              <ul className="mt-3 space-y-2.5 text-sm text-muted">
                <li>
                  <a href="#home" className="transition hover:text-text">
                    Home
                  </a>
                </li>

                <li>
                  <a href="#features" className="transition hover:text-text">
                    Features
                  </a>
                </li>

                <li>
                  <a href="#lead-form" className="transition hover:text-text">
                    Submit a Lead
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-faint">
                Company
              </p>

              <ul className="mt-3 space-y-2.5 text-sm text-muted">
                <li>
                  <a href="#contact" className="transition hover:text-text">
                    Contact
                  </a>
                </li>

                <li>
                  <a href="/login" className="transition hover:text-text">
                    Admin Login
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-faint">
                Contact
              </p>

              <ul className="mt-3 space-y-3 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <HiOutlineEnvelope className="h-4 w-4 text-faint" />
                  <a
                    href="mailto:praakharshukla4004@gmail.com"
                    className="transition hover:text-text"
                  >
                    praakharshukla4004@gmail.com
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/prakhar4684"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition hover:text-text"
                  >
                    <FaGithub className="h-4 w-4" />
                    GitHub
                  </a>
                </li>

                <li>
                  <a
                    href="www.linkedin.com/in/prakhar-shukla-746360319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition hover:text-text"
                  >
                    <FaLinkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-faint sm:flex-row">
          <p>© 2026 LeadDesk Mini. All rights reserved.</p>

          <p>
            Built with ❤️ by{" "}
            <span className="font-medium text-text">
              Prakhar Shukla
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}