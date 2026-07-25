import { HiMagnifyingGlass } from "react-icons/hi2";
import{searchLeads} from "../api/api";
export default function SearchBar({ value, onChange, placeholder = "Search by Name, Email or Company" }) {
  return (
    <div className="relative w-full max-w-sm">
      <HiMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="focus-ring w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-faint transition focus:border-accent/50"
      />
    </div>
  );
}
