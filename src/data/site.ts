export type SocialLink = {
  label: string;
  href: string;
};

export type ExperienceLink = {
  label: string;
  href: string;
};

export type BlogBlock =
  | {
      type: "paragraph" | "heading";
      value: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "image";
      alt: string;
      src: string;
    }
  | {
      type: "code";
      code: string;
    };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  blocks?: BlogBlock[];
  content: string[];
  codeSamples?: {
    language: string;
    code: string;
  }[];
};

export type Doodle = {
  slug: string;
  title: string;
  date?: string;
  description: string;
  why: string;
  href?: string;
  liveHref?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const siteConfig = {
  name: "Antipas Ben",
  title: "Antipas Ben",
  description:
    "Antipas Ben is a full-stack engineer building scalable systems across frontend, backend, data, and reliability.",
  introTitle: "Hello, I'm Antipas Ben.",
  intro: [
    "I work across the stack, from frontend to backend to infrastructure, building systems that need to perform reliably in real-world conditions.",
    "My experience spans application development, distributed systems, and production infrastructure, with a focus on performance, system reliability, and clean architecture. I've worked on multi-vendor platforms and real-time systems, improving system efficiency and reducing operational friction.",
    "I'm particularly interested in complex engineering problems where correctness, scalability, and system design matter.",
    "Currently, I work on contract at Rhovic and previously worked at Porpop.",
    "Outside of engineering, I play the piano and enjoy reading.",
  ],
  experienceLinks: [
    {
      label: "Rhovic",
      href: "https://berylrhovic.com",
    },
    {
      label: "Porpop",
      href: "https://porpop.com/",
    },
  ] satisfies ExperienceLink[],
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/AntipasBen23",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/antipas-ben-5b228730b/",
    },
    {
      label: "X",
      href: "https://x.com/AntipasBen",
    },
  ] satisfies SocialLink[],
  profileImage: "/Antipas-picture.jpg",
  copyrightYear: "2026",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "design-for-change-not-certainty",
    title:
      "Why most systems fail early, and how to design for change instead of certainty.",
    excerpt:
      "Most systems fail early because they are designed for stable requirements that do not exist yet. This piece is about designing for learning, change, and safe evolution instead.",
    date: "2026-03-24",
    readTime: "3 min read",
    tags: [
      "Architecture",
      "Systems Design",
      "Software Engineering",
      "Scalability",
    ],
    content: [],
    blocks: [
      {
        type: "paragraph",
        value: "Most architecture discussions assume stable requirements.",
      },
      {
        type: "paragraph",
        value: "In real projects, that almost never exists.",
      },
      {
        type: "paragraph",
        value:
          "Early on, requirements are incomplete, shifting, or just wrong, and you still have to define APIs, choose a database, and structure the system.",
      },
      {
        type: "paragraph",
        value: "This is where most systems go wrong.",
      },
      {
        type: "paragraph",
        value: "They're designed as if the future is already known.",
      },
      {
        type: "heading",
        value: "You're Not Designing for Stability",
      },
      {
        type: "paragraph",
        value: "In early-stage systems:",
      },
      {
        type: "list",
        items: [
          "product direction changes",
          "scale assumptions are wrong",
          "edge cases only show up in production",
        ],
      },
      {
        type: "paragraph",
        value: "So the goal isn't to get the architecture right.",
      },
      {
        type: "paragraph",
        value: "The goal is to design a system that can survive being wrong.",
      },
      {
        type: "heading",
        value: "Where Systems Break",
      },
      {
        type: "image",
        alt: "Diagram showing where systems break under premature assumptions",
        src: "/systems-break-placeholder.png",
      },
      {
        type: "paragraph",
        value: "Over-engineering too early",
      },
      {
        type: "paragraph",
        value:
          "Teams reach for microservices, queues, and complex infrastructure before the system actually needs it.",
      },
      {
        type: "paragraph",
        value: "You end up with:",
      },
      {
        type: "list",
        items: [
          "slower development cycles",
          "fragmented logic across services",
          "coordination overhead between teams",
        ],
      },
      {
        type: "paragraph",
        value:
          "I've worked on systems running on Kubernetes with barely any load, or services split before clear boundaries existed.",
      },
      {
        type: "paragraph",
        value: "That's not scalability, it's friction.",
      },
      {
        type: "paragraph",
        value: "Rigid contracts too soon",
      },
      {
        type: "paragraph",
        value: "Early APIs and schemas are often treated as permanent.",
      },
      {
        type: "paragraph",
        value: "They never are.",
      },
      {
        type: "paragraph",
        value: "This leads to:",
      },
      {
        type: "list",
        items: [
          "breaking changes across the system",
          "painful migrations",
          "defensive code everywhere",
        ],
      },
      {
        type: "paragraph",
        value:
          "Instead of enabling iteration, the architecture becomes the bottleneck.",
      },
      {
        type: "paragraph",
        value: "Scaling before anything works",
      },
      {
        type: "paragraph",
        value:
          "Many systems are designed for scale long before they have real usage.",
      },
      {
        type: "paragraph",
        value: "This creates:",
      },
      {
        type: "list",
        items: [
          "unnecessary complexity",
          "wasted infrastructure",
          "slower iteration",
        ],
      },
      {
        type: "paragraph",
        value: "At that stage, the real constraint isn't scale, it's learning speed.",
      },
      {
        type: "heading",
        value: "Designing for Uncertainty",
      },
      {
        type: "image",
        alt: "Illustration about designing systems to absorb change",
        src: "/designing-for-uncertainty-placeholder.png",
      },
      {
        type: "paragraph",
        value: "Start with a modular monolith",
      },
      {
        type: "paragraph",
        value: "Not a mess, a structured system.",
      },
      {
        type: "list",
        items: [
          "clear internal boundaries",
          "shared database (initially)",
          "simple deployment",
        ],
      },
      {
        type: "paragraph",
        value:
          "You get speed, clarity, and room to evolve without committing too early.",
      },
      {
        type: "paragraph",
        value: "Delay irreversible decisions",
      },
      {
        type: "paragraph",
        value: "Some decisions are hard to undo:",
      },
      {
        type: "list",
        items: ["database design", "service boundaries", "public APIs"],
      },
      {
        type: "paragraph",
        value: "If you're not confident they'll hold, keep them flexible.",
      },
      {
        type: "paragraph",
        value:
          "If a decision doesn't need to be permanent, don't make it permanent.",
      },
      {
        type: "paragraph",
        value: "Solve real problems, not hypothetical ones",
      },
      {
        type: "paragraph",
        value:
          'Instead of asking, "What happens when we have 1 million users?" focus on "What is breaking today?"',
      },
      {
        type: "paragraph",
        value: "Scale based on real pressure, not projections.",
      },
      {
        type: "paragraph",
        value: "Introduce complexity only when it pays",
      },
      {
        type: "paragraph",
        value: "Every abstraction comes with a cost:",
      },
      {
        type: "list",
        items: ["cognitive load", "debugging difficulty", "operational overhead"],
      },
      {
        type: "paragraph",
        value:
          "Before adding one, ask what problem this solves right now and what happens if you don't add it yet.",
      },
      {
        type: "paragraph",
        value: "If the answer isn't clear, it's probably too early.",
      },
      {
        type: "paragraph",
        value: "Design for refactoring",
      },
      {
        type: "paragraph",
        value: "You will change things. Plan for it.",
      },
      {
        type: "list",
        items: [
          "keep modules loosely coupled",
          "isolate external dependencies",
          "avoid deep interdependencies",
        ],
      },
      {
        type: "paragraph",
        value:
          "You're not building a permanent structure, you're building something that can evolve safely.",
      },
      {
        type: "heading",
        value: "What This Looks Like in Practice",
      },
      {
        type: "image",
        alt: "Examples of practical architecture decisions evolving over time",
        src: "/what-this-looks-like-in-practice-placeholder.png",
      },
      {
        type: "paragraph",
        value: "In real scenarios, this often means:",
      },
      {
        type: "list",
        items: [
          "mocking backend behavior in the frontend to validate flows early",
          "shipping with simple APIs before introducing heavy abstractions",
          "avoiding complex infrastructure until there's clear pressure",
          "extracting services only when boundaries naturally emerge",
        ],
      },
      {
        type: "paragraph",
        value: "The architecture grows with the product, not ahead of it.",
      },
      {
        type: "heading",
        value: "The Tradeoff",
      },
      {
        type: "paragraph",
        value: "You will rewrite parts of the system.",
      },
      {
        type: "paragraph",
        value: "That's not a failure.",
      },
      {
        type: "paragraph",
        value: "It's how you avoid scaling the wrong decisions.",
      },
      {
        type: "heading",
        value: "Closing",
      },
      {
        type: "paragraph",
        value: "Good architecture isn't about predicting the future.",
      },
      {
        type: "paragraph",
        value: "It's about staying flexible long enough to understand it.",
      },
      {
        type: "paragraph",
        value: "The best systems aren't the most sophisticated.",
      },
      {
        type: "paragraph",
        value:
          "They're the ones that can change, quickly, safely, and without friction.",
      },
    ],
  },
  {
    slug: "debugging-react-hydration-errors",
    title: "Debugging React Hydration Errors: From Production Crashes to Zero Issues",
    excerpt:
      "A practical guide to detecting, fixing, and preventing hydration mismatches in React and Next.js apps.",
    date: "2026-02-03",
    readTime: "4 min read",
    tags: ["React", "Next.js", "SSR", "Debugging", "Web Development"],
    content: [
      "If you've worked with server-side rendering (SSR) in React or Next.js, you've probably encountered the dreaded hydration error. These bugs can slip through development, surface in production, and be much harder to debug than traditional client-only React issues.",
      "Hydration is the process where React attaches event listeners and makes a server-rendered page interactive. When the HTML generated on the server doesn't match what React expects on the client, you get a hydration mismatch.",
      "The most common causes are browser-only APIs running during render, timestamps generated on both server and client, random values created in component bodies, conditionals based on client state, and third-party libraries that mutate the DOM.",
      "My usual fix is simple: move browser-only work into useEffect, make initial server and client output match, and treat every hydration warning like a real bug rather than harmless noise.",
      "In development, I rely on strict checks, browser console warnings, and testing production builds locally with npm run build and npm run start. In production, error logging and session replay tools help catch the cases users actually hit.",
      "The goal isn't just to patch individual hydration errors. It's to internalize patterns that make server and client rendering predictable by default so those bugs stop showing up in the first place.",
      "One of the most memorable examples came from an inventory management system where stock counts flashed from one value to another after hydration. The root cause was localStorage-driven filters affecting render output before the client had fully taken over. Rendering the base count on the server and applying the filter after hydration solved the issue cleanly.",
    ],
    codeSamples: [
      {
        language: "tsx",
        code:
          "function UserGreeting() {\n  const [username, setUsername] = useState('');\n\n  useEffect(() => {\n    setUsername(localStorage.getItem('username') || 'Guest');\n  }, []);\n\n  return <h1>Welcome, {username || 'Guest'}!</h1>;\n}",
      },
      {
        language: "tsx",
        code:
          "import { useId } from 'react';\n\nfunction Card() {\n  const id = useId();\n\n  return <div id={id}>Content</div>;\n}",
      },
      {
        language: "tsx",
        code:
          "import dynamic from 'next/dynamic';\n\nconst Chart = dynamic(() => import('./Chart'), {\n  ssr: false,\n});",
      },
    ],
  },
];

export const devDoodles: Doodle[] = [
  {
    slug: "mater-ai-smart-prioritization-engine",
    title: "Mater-AI Smart Prioritization Engine",
    description:
      "A smart prioritization dashboard for ranking AI-generated thermoelectric material candidates.",
    why: "Mater-AI could generate candidates quickly, but deciding what to synthesize next was still too manual.",
    href: "https://github.com/AntipasBen23/mater-ai-feature-demo",
    liveHref: "https://mater-ai-feature-demo.netlify.app/",
    imageSrc: "/mater.png",
    imageAlt: "Mater-AI Smart Prioritization Engine dashboard screenshot",
  },
  {
    slug: "flowcache",
    title: "flowcache",
    description:
      "A placeholder project for exploring faster data access patterns and caching strategies in full-stack applications.",
    why: "Many good side projects start as scratchpad ideas before they become public tools, and this page will grow with them.",
  },
  {
    slug: "traceview",
    title: "traceview",
    description:
      "A placeholder observability experiment aimed at making reliability workflows easier to reason about.",
    why: "I like keeping a visible trail of ideas that blend engineering, infrastructure, and product thinking.",
  },
];
