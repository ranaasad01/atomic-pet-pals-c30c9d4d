"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { BRAND } from "@/lib/data";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navT = t.raw("nav") as Record<string, string>;

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[var(--brand-yellow)]/95 backdrop-blur-sm border-b-4 border-[var(--brand-yellow-dark)] shadow-[0_4px_0_0_var(--brand-yellow-dark)]">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-red)] rounded-xl"
        >
          <motion.span
            className="text-3xl"
            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {BRAND.emoji}
          </motion.span>
          <span className="text-2xl font-black text-[var(--brand-red)] tracking-tight leading-none">
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("#");
            const isActive =
              !isAnchor && pathname === link.href;

            return (
              <li key={link.key}>
                <Link
                  href={
                    isAnchor
                      ? pathname === "/"
                        ? link.href
                        : "/" + link.href
                      : link.href
                  }
                  onClick={
                    isAnchor
                      ? (e) => handleAnchorClick(e, link.href)
                      : undefined
                  }
                  className={`px-4 py-2 rounded-full text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-red)] ${
                    isActive
                      ? "bg-[var(--brand-red)] text-white shadow-md"
                      : "text-[var(--brand-red)] hover:bg-[var(--brand-red)]/15 hover:scale-105"
                  }`}
                >
                  {navT[link.key] ?? link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-[var(--brand-red)] hover:bg-[var(--brand-red)]/15 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-red)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--brand-yellow)] border-t-2 border-[var(--brand-yellow-dark)]"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => {
                const isAnchor = link.href.startsWith("#");
                return (
                  <li key={link.key}>
                    <Link
                      href={
                        isAnchor
                          ? pathname === "/"
                            ? link.href
                            : "/" + link.href
                          : link.href
                      }
                      onClick={
                        isAnchor
                          ? (e) => handleAnchorClick(e, link.href)
                          : () => setMobileOpen(false)
                      }
                      className="block px-4 py-3 rounded-2xl text-lg font-bold text-[var(--brand-red)] hover:bg-[var(--brand-red)]/15 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-red)]"
                    >
                      {navT[link.key] ?? link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}