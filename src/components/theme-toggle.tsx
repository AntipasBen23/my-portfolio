"use client";

import { useSyncExternalStore } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";

type Theme = "light" | "dark";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme") as Theme | null;

  if (savedTheme) {
    return savedTheme;
  }

  if (document.documentElement.classList.contains("dark")) {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleThemeChange = () => onStoreChange();

  const handleSystemThemeChange = () => {
    if (window.localStorage.getItem("theme")) {
      return;
    }

    onStoreChange();
  };

  window.addEventListener("themechange", handleThemeChange);
  mediaQuery.addEventListener("change", handleSystemThemeChange);

  return () => {
    window.removeEventListener("themechange", handleThemeChange);
    mediaQuery.removeEventListener("change", handleSystemThemeChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => "light",
  );
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label="Toggle dark mode"
      className="rounded-lg bg-white p-2 text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-700 hover:shadow-md dark:bg-transparent dark:text-zinc-400 dark:ring-transparent dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      onClick={() => {
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        window.localStorage.setItem("theme", nextTheme);
        window.dispatchEvent(new Event("themechange"));
      }}
      title="Toggle dark mode"
      type="button"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
