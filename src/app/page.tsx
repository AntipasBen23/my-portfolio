import Link from "next/link";

import { siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <article className="flex flex-col gap-3">
      <header>
        <h2 className="text-2xl font-extrabold text-slate-950 dark:text-emerald-500">
          {siteConfig.introTitle}
        </h2>
      </header>

      <section className="content text-lg leading-[1.72] text-slate-950 dark:text-zinc-100">
        <p>{siteConfig.intro[0]}</p>
        <p>{siteConfig.intro[1]}</p>
        <p>{siteConfig.intro[2]}</p>
        <p>
          Currently, I work on contract at{" "}
          <a href={siteConfig.experienceLinks[0].href}>
            {siteConfig.experienceLinks[0].label}
          </a>{" "}
          and previously worked at{" "}
          <a href={siteConfig.experienceLinks[1].href}>
            {siteConfig.experienceLinks[1].label}
          </a>
          ,{" "}
          <a href={siteConfig.experienceLinks[2].href}>
            {siteConfig.experienceLinks[2].label}
          </a>
          , and a number of freelance engagements over the years.
        </p>
        <p>
          On the side, I&apos;m building{" "}
          <a href={siteConfig.personalProjectLink.href}>
            {siteConfig.personalProjectLink.label}
          </a>
          , an AI-driven system for automating end-to-end content workflows. It
          treats content as a system, planning, generating, and adapting
          through feedback loops. Early beta. I welcome feedback from builders
          and operators.
        </p>
        <p>{siteConfig.intro[4]}</p>
        <p>
          Check out my <Link href="/posts">blog</Link>.
        </p>
      </section>
    </article>
  );
}
