"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import {
  ArrowRightIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/data/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Blog" },
  { href: "/dev-doodles", label: "Dev Doodles" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul className="flex items-center gap-4">
      {siteConfig.socialLinks.map((link) => {
        const Icon =
          link.label === "GitHub"
            ? GitHubIcon
            : link.label === "LinkedIn"
              ? LinkedInIcon
              : XIcon;

        return (
          <li key={link.label}>
            <a
              aria-label={link.label}
              className="text-slate-900 transition hover:text-slate-700 dark:text-zinc-100 dark:hover:text-zinc-300"
              href={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {compact ? (
                <Icon className="h-5 w-5" />
              ) : (
                <span className="inline-flex items-center gap-2 hover:underline">
                  <Icon className="h-4 w-4" />
                  {link.label}
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function ReadMoreLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-500 dark:hover:text-emerald-400"
      href={href}
    >
      {label}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col px-6 transition-colors sm:px-10">
      <header className="relative flex flex-col items-center gap-5 py-12 pt-16 sm:flex-row sm:gap-10">
        <div className="absolute right-0 top-4 z-50">
          <ThemeToggle />
        </div>

        <figure className="h-20 w-20 flex-none overflow-hidden rounded-full ring-1 ring-slate-200 dark:ring-zinc-700">
          <Link href="/">
            <Image
              alt={siteConfig.name}
              className="h-full w-full object-cover"
              height={320}
              priority
              src={siteConfig.profileImage}
              width={320}
            />
          </Link>
        </figure>

        <div className="flex w-full flex-1 flex-col gap-5 sm:w-auto">
          <Link href="/">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-800 sm:text-left dark:text-zinc-100">
              {siteConfig.title}
            </h1>
          </Link>

          <div className="flex w-full min-w-0 flex-row items-center justify-between gap-4 sm:justify-start">
            <div className="min-w-0 flex-1">
              <nav className="min-w-0">
                <ul className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">
                  {navItems.map((item) => {
                    const active = isActive(pathname, item.href);

                    return (
                      <li
                        className={`whitespace-nowrap transition ${
                          active
                            ? "text-slate-950 dark:text-zinc-100"
                            : "hover:text-slate-700 dark:hover:text-zinc-200"
                        }`}
                        key={item.href}
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="ml-4 flex-shrink-0 sm:hidden">
              <SocialLinks compact />
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-0 hidden sm:block">
          <SocialLinks compact />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="flex flex-col justify-between gap-4 pb-10 pt-5 text-xs font-semibold text-slate-500 sm:flex-row dark:text-zinc-400">
        <div>
          &copy; {siteConfig.name} {siteConfig.copyrightYear}
        </div>
        <SocialLinks />
      </footer>
    </div>
  );
}
