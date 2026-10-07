"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, BRAND } from "@/lib/data";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = t.raw("nav") as Record<string, string>;
  const footerT = t.raw("footer") as Record<string, string>;

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer className="bg-[var(--brand-red)] text-white border-t-4 border-[var(--brand-red-dark)]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                {BRAND.emoji}
              </motion.span>
              <span className="text-2xl font-black tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <p className="text-white/80 text-sm font-semibold text-center md:text-left">
              {footerT["tagline"] ?? BRAND.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-3">
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
                          : undefined
                      }
                      className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white font-bold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 hover:scale-105"
                    >
                      {navT[link.key] ?? link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-white/70 text-sm font-semibold">
            {footerT["copyright"] ?? `© ${new Date().getFullYear()} ${BRAND.name}. Made with 💛 for kids everywhere.`}
          </p>
          <p className="text-white/60 text-xs mt-1 font-medium">
            {footerT["safe"] ?? "Safe, fun, and ad-free!"}
          </p>
        </div>
      </div>
    </footer>
  );
}