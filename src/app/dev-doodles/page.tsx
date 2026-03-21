import type { Metadata } from "next";

import {
  ExternalLinkIcon,
  GitHubIcon,
} from "@/components/icons";
import { devDoodles } from "@/data/site";

export const metadata: Metadata = {
  title: "Dev Doodles",
  description:
    "A growing collection of side-project ideas, experiments, and engineering doodles by Antipas Ben.",
};

export default function DevDoodlesPage() {
  return (
    <div id="content">
      <div className="mt-12 flex flex-col gap-1 sm:mt-0">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-500">
          Dev Doodles
        </h2>
        <div className="content text-lg text-slate-900 dark:text-zinc-200">
          <p>
            A collection of my <em>dev doodles</em> and in-progress ideas. These
            are placeholders for now, and I&apos;ll keep expanding this section as
            new experiments turn into public work.
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-12 py-10">
        {devDoodles.map((doodle) => (
          <article className="flex flex-col gap-4" key={doodle.slug}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <h3
                  className="text-2xl font-bold text-slate-900 dark:text-zinc-100"
                  id={doodle.slug}
                >
                  <a
                    aria-label={`Link to ${doodle.slug}`}
                    className="mr-1 text-emerald-600 no-underline hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400"
                    href={`#${doodle.slug}`}
                  >
                    #
                  </a>{" "}
                  {doodle.title}
                </h3>

                {doodle.href ? (
                  <a
                    aria-label="View on GitHub"
                    className="text-slate-500 transition hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    href={doodle.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                ) : null}

                {doodle.liveHref ? (
                  <a
                    aria-label="Visit website"
                    className="text-slate-500 transition hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    href={doodle.liveHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                  </a>
                ) : null}
              </div>

              <div className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
                <time>{doodle.date}</time>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm font-medium text-slate-500 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
              Placeholder preview for {doodle.title}
            </div>

            <ul className="ml-4 list-inside list-disc space-y-2 text-base text-slate-700 dark:text-zinc-300">
              <li>
                <strong>What?</strong> {doodle.description}
              </li>
              <li>
                <strong>Why?</strong> {doodle.why}
              </li>
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
