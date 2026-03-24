import type { Metadata } from "next";
import Image from "next/image";
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

      {post.blocks ? (
        <>
          {post.blocks.map((block, index) => {
            if (block.type === "paragraph") {
              return <p key={`${block.type}-${index}`}>{block.value}</p>;
            }

            if (block.type === "heading") {
              return <h3 key={`${block.type}-${index}`}>{block.value}</h3>;
            }

            if (block.type === "list") {
              return (
                <ul key={`${block.type}-${index}`}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (block.type === "image") {
              return (
                <figure
                  className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800/60"
                  key={`${block.type}-${index}`}
                >
                  <Image
                    alt={block.alt}
                    className="h-auto w-full object-cover"
                    height={900}
                    src={block.src}
                    width={1600}
                  />
                </figure>
              );
            }

            if (block.type === "code") {
              return (
                <pre key={`${block.type}-${index}`}>
                  <code>{block.code}</code>
                </pre>
              );
            }

            return null;
          })}
        </>
      ) : (
        <>
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h3>Patterns that consistently help</h3>
          <ul>
            <li>Avoid browser APIs directly in component render paths.</li>
            <li>
              Make sure the first server and client render produce identical
              markup.
            </li>
            <li>
              Move timestamps, random values, and viewport logic behind
              client-only effects.
            </li>
            <li>
              Use framework tools like dynamic imports carefully for DOM-heavy
              libraries.
            </li>
            <li>Test production builds locally before deploying.</li>
          </ul>

          <h3>Example fixes</h3>
          {post.codeSamples?.map((sample) => (
            <pre key={sample.code}>
              <code>{sample.code}</code>
            </pre>
          ))}
        </>
      )}

      <h3>Tags</h3>
      <p>{post.tags.join(" · ")}</p>
    </article>
  );
}
