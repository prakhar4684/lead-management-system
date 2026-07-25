import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineLockClosed,
  HiOutlineEnvelope,
  HiArrowLeft,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { loginUser } from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser(form);

      // Save JWT
      localStorage.setItem("token", data.token);

      // Save Logged-in Admin
      localStorage.setItem(
        "user",
        JSON.stringify(data.admin || data.user)
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-glow flex min-h-screen items-center justify-center bg-bg px-6 text-text">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="glass w-full max-w-sm rounded-xl border border-border p-8 shadow-2xl shadow-black/50"
      >
        

        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-base font-semibold text-white">
            L
          </span>

          <h1 className="text-xl font-semibold tracking-tight">
            Admin Sign In
          </h1>

          <p className="mt-1.5 text-sm text-muted">
            Sign in to manage your leads
          </p>
        </div>

        

        <form onSubmit={handleSubmit} className="space-y-4">
        

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Email
            </label>

            <div className="relative">
              <HiOutlineEnvelope className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="focus-ring w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-3 text-sm text-text"
              />
            </div>
          </div>

     

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Password
            </label>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="focus-ring w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-3 text-sm text-text"
              />
            </div>
          </div>

       

          <button
            type="submit"
            disabled={loading}
            className="focus-ring mt-2 w-full rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        

        <div className="mt-6 border-t border-border pt-5 text-center">
          <p className="text-sm text-muted">
            Don't have an admin account?
          </p>

          <Link
            to="/register"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:underline"
          >
            <HiOutlineUserPlus className="h-4 w-4" />
            Create Admin Account
          </Link>
        </div>

    

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-text"
          >
            <HiArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}