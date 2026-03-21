import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPosts } from "@/data/site";
import { formatLongDate } from "@/lib/content";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/posts/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostDetailPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="content pb-10">
      <header className="flex flex-col gap-3 pb-8">
        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-zinc-100">
          {post.title}
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500 dark:text-zinc-400">
          <span>Antipas Ben</span>
          <span>{post.readTime}</span>
          <time dateTime={post.date}>{formatLongDate(post.date)}</time>
        </div>
      </header>

      {post.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <h3>Patterns that consistently help</h3>
      <ul>
        <li>Avoid browser APIs directly in component render paths.</li>
        <li>Make sure the first server and client render produce identical markup.</li>
        <li>Move timestamps, random values, and viewport logic behind client-only effects.</li>
        <li>Use framework tools like dynamic imports carefully for DOM-heavy libraries.</li>
        <li>Test production builds locally before deploying.</li>
      </ul>

      <h3>Example fixes</h3>
      {post.codeSamples?.map((sample) => (
        <pre key={sample.code}>
          <code>{sample.code}</code>
        </pre>
      ))}

      <h3>Tags</h3>
      <p>{post.tags.join(" · ")}</p>
    </article>
  );
}
