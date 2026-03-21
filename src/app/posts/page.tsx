import type { Metadata } from "next";
import Link from "next/link";

import { ReadMoreLink } from "@/components/site-shell";
import { blogPosts } from "@/data/site";
import { formatLongDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "A collection of write-ups on React, Next.js, debugging, and practical engineering lessons.",
};

export default function PostsPage() {
  return (
    <div id="content">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-500">
          Blog Posts
        </h2>
        <div className="content text-lg text-slate-900 dark:text-zinc-200">
          <p>
            This blog is my space to share lessons from real-world engineering
            work, debugging sessions, and the systems thinking behind reliable
            software.
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-10 py-10">
        {blogPosts.map((post) => (
          <article className="flex flex-col gap-1" key={post.slug}>
            <h3 className="text-xl font-bold text-slate-900 hover:underline dark:text-zinc-100">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className="flex gap-3 text-sm font-semibold text-slate-500 dark:text-zinc-400">
              <time dateTime={post.date}>{formatLongDate(post.date)}</time>
              <span>{post.readTime}</span>
            </div>
            <div className="text-slate-600 dark:text-zinc-300">{post.excerpt}</div>
            <div className="mt-2">
              <ReadMoreLink
                href={`/posts/${post.slug}`}
                label="Read This Article"
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
