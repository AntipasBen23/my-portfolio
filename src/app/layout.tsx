import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

const themeScript = `
  (() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolvedTheme = savedTheme ?? systemTheme;
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 antialiased transition-colors dark:bg-zinc-900 dark:text-zinc-100">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
