export type SocialLink = {
  label: string;
  href: string;
};

export type ExperienceLink = {
  label: string;
  href: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
  codeSamples?: {
    language: string;
    code: string;
  }[];
};

export type Doodle = {
  slug: string;
  title: string;
  date: string;
  description: string;
  why: string;
  href?: string;
  liveHref?: string;
};

export const siteConfig = {
  name: "Antipas Ben",
  title: "Antipas Ben",
  description:
    "Antipas Ben is a full-stack engineer building scalable systems across frontend, backend, data, and reliability.",
  introTitle: "Hello There!",
  intro: [
    "Hello there! I am Antipas Ben.",
    "I've worn quite a few hats - Frontend Engineering, Backend Engineering, Data Engineering, and Site Reliability Engineering.",
    "My journey in computing has been grounded in building real, scalable systems with clean architecture and strong engineering standards. I've worked across the full stack, designing performant web applications, developing reliable backend services, and handling the infrastructure that keeps everything running smoothly. I build distributed systems, design robust architectures, and focus on software that holds up under real-world conditions.",
    "I enjoy tackling complex problems that require deep thinking, iteration, and careful design - the kind where the first solution is never the final one.",
    "Currently, I am a freelancer on contract at Rhovic and previously worked full-time at Porpop.",
    "Outside of tech, I play the piano and enjoy reading.",
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
    slug: "signalboard",
    title: "signalboard",
    date: "March 2026",
    description:
      "A placeholder for an internal dashboard concept focused on surfacing key engineering signals in one clean interface.",
    why: "I want a space to collect small product experiments and polished engineering ideas as they take shape.",
  },
  {
    slug: "flowcache",
    title: "flowcache",
    date: "February 2026",
    description:
      "A placeholder project for exploring faster data access patterns and caching strategies in full-stack applications.",
    why: "Many good side projects start as scratchpad ideas before they become public tools, and this page will grow with them.",
  },
  {
    slug: "traceview",
    title: "traceview",
    date: "January 2026",
    description:
      "A placeholder observability experiment aimed at making reliability workflows easier to reason about.",
    why: "I like keeping a visible trail of ideas that blend engineering, infrastructure, and product thinking.",
  },
];
