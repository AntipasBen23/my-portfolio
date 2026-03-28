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
          Currently, I work as on contract at{" "}
          <a href={siteConfig.experienceLinks[0].href}>
            {siteConfig.experienceLinks[0].label}
          </a>{" "}
          and previously worked at{" "}
          <a href={siteConfig.experienceLinks[1].href}>
            {siteConfig.experienceLinks[1].label}
          </a>
          .
        </p>
        <p>{siteConfig.intro[4]}</p>
      </section>
    </article>
  );
}
