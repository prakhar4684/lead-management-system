import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiArrowLeft,
} from "react-icons/hi2";
import { registerUser } from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    console.log("Register Form:", form);

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return alert("Please fill all fields.");
    }

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match.");
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      console.log("Register Response:", data);

      // Auto Login after Register
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.admin) {
        localStorage.setItem("user", JSON.stringify(data.admin));
      }

      alert("Admin account created successfully!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Register Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Registration failed."
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
            Create Admin Account
          </h1>

          <p className="mt-1.5 text-sm text-muted">
            Create your admin account to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Full Name
            </label>

            <div className="relative">
              <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="focus-ring w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-3 text-sm text-text"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Email
            </label>

            <div className="relative">
              <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="focus-ring w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-3 text-sm text-text"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Password
            </label>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                className="focus-ring w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-3 text-sm text-text"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Confirm Password
            </label>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="focus-ring w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-3 text-sm text-text"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="focus-ring w-full rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 border-t border-border pt-5 text-center">
          <p className="text-sm text-muted">
            Already have an admin account?
          </p>

          <Link
            to="/login"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text"
          >
            <HiArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}