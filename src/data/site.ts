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
  personalProjectLink: {
    label: "Furci.ai",
    href: "https://furciai.com/",
  },
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
    slug: "designing-for-disagreement-region-specific-failures",
    title:
      "Designing for Disagreement: Handling Region-Specific Failures in Distributed Infrastructure",
    excerpt:
      "Multi-region systems rarely fail cleanly. This piece looks at how partial failure, stale data, routing lag, and deployment drift create disagreement between regions, and how to design for that reality.",
    date: "2026-04-10",
    readTime: "5 min read",
    tags: [
      "Distributed Systems",
      "Infrastructure",
      "Reliability",
      "Systems Design",
    ],
    content: [],
    blocks: [
      {
        type: "paragraph",
        value:
          "If you've operated systems across multiple regions long enough, you eventually hit the moment that breaks your mental model: everything looks healthy, except in one region.",
      },
      {
        type: "paragraph",
        value:
          "Same code. Same deploy. Same infra definitions. But users in one geography are failing, timing out, or seeing stale data while everything else is green.",
      },
      {
        type: "paragraph",
        value:
          "This isn't an edge case. It's the default reality of distributed systems at scale.",
      },
      {
        type: "paragraph",
        value:
          "Multi-region systems don't fail loudly, they disagree. And if you don't design for that disagreement, you end up debugging ghosts.",
      },
      {
        type: "heading",
        value: 'The Core Problem: "Consistency of Environment" Is a Myth',
      },
      {
        type: "paragraph",
        value: "We like to assume:",
      },
      {
        type: "list",
        items: [
          "Infrastructure is identical across regions",
          "Deployments are synchronized",
          "Dependencies behave the same everywhere",
        ],
      },
      {
        type: "paragraph",
        value: "In practice, none of that holds.",
      },
      {
        type: "paragraph",
        value: "Each region is its own failure domain:",
      },
      {
        type: "list",
        items: [
          "Different network paths",
          "Different cloud capacity pools",
          "Different DNS resolution paths",
          "Different cache states",
          "Different third-party routing",
        ],
      },
      {
        type: "paragraph",
        value:
          "So the real problem isn't just failure. It's partial failure with conflicting signals.",
      },
      {
        type: "heading",
        value: "Scenario 1: One Region Is Slow, But Not Down",
      },
      {
        type: "paragraph",
        value:
          "You get alerts: p95 latency is spiking in eu-west-1, us-east-1 is perfectly fine, and there are no obvious errors, just slow responses.",
      },
      {
        type: "paragraph",
        value:
          "This is usually network or dependency-level degradation, not application failure.",
      },
      {
        type: "paragraph",
        value: "Common causes:",
      },
      {
        type: "list",
        items: [
          "Cross-region DB reads hitting a degraded replica",
          "Increased packet loss or jitter on a specific route",
          "A noisy neighbor problem in one availability zone",
          "Misbehaving load balancer health checks causing uneven traffic",
        ],
      },
      {
        type: "paragraph",
        value:
          "A familiar pattern is European traffic timing out against a shared Redis cluster while US traffic stays healthy because it reaches a different shard or route.",
      },
      {
        type: "paragraph",
        value: "How you fix it:",
      },
      {
        type: "list",
        items: [
          "Compare dependency latency per region",
          "Break down latency by hop: app to LB to service to DB",
          "Look at AZ-level imbalance, not just region-level metrics",
          "Force traffic onto a known-good path or isolate a bad replica or AZ",
        ],
      },
      {
        type: "paragraph",
        value:
          "Design takeaway: always instrument per-region and per-dependency latency. Aggregated global metrics hide regional pain.",
      },
      {
        type: "heading",
        value: "Scenario 2: One Region Returns Incorrect Data",
      },
      {
        type: "paragraph",
        value:
          "This one is worse than downtime. Everything works, but it's wrong.",
      },
      {
        type: "paragraph",
        value:
          "You're dealing with state divergence caused by cache inconsistency, eventual consistency delays, replication lag, or region-local writes without proper synchronization.",
      },
      {
        type: "paragraph",
        value:
          "A user updates their profile in us-east-1, then a request in eu-central-1 still returns the old value because the EU cache hasn't invalidated or replication hasn't caught up.",
      },
      {
        type: "paragraph",
        value:
          "The system is implicitly relying on a dangerous assumption: reads will eventually reflect writes globally.",
      },
      {
        type: "paragraph",
        value: "How you fix it:",
      },
      {
        type: "list",
        items: [
          "Route users to the region where their last write occurred",
          "Use explicit cache invalidation across regions",
          "Version data and reject stale reads when versions mismatch",
          "Guarantee read-after-write where correctness actually matters",
        ],
      },
      {
        type: "paragraph",
        value:
          "Design takeaway: define where inconsistency is acceptable and where it isn't. If correctness matters, don't rely on passive replication.",
      },
      {
        type: "heading",
        value: "Scenario 3: One Region Completely Fails (But Traffic Still Goes There)",
      },
      {
        type: "paragraph",
        value:
          "Classic partial outage: the region is degraded or partially down, but your routing layer keeps sending traffic there.",
      },
      {
        type: "paragraph",
        value:
          "Common causes include DNS TTL that is too high, shallow health checks, or load balancers that report instances as healthy even when they are operationally useless.",
      },
      {
        type: "paragraph",
        value:
          "A typical example is API servers staying up while the database pool is exhausted or Redis is unreachable. Health checks pass. Users fail.",
      },
      {
        type: "paragraph",
        value: "How you fix it:",
      },
      {
        type: "list",
        items: [
          "Make health checks dependency-aware",
          "Use active failover instead of passive hope",
          "Reduce DNS TTL or move to health-based routing",
          "Implement circuit breakers at the edge",
        ],
      },
      {
        type: "paragraph",
        value:
          'Design takeaway: "instance is running" does not mean "service is healthy." Health checks must reflect user experience, not process state.',
      },
      {
        type: "heading",
        value: "Scenario 4: External Dependency Breaks in Only One Region",
      },
      {
        type: "paragraph",
        value:
          "You didn't deploy anything and it's still broken, because third-party services do not behave as globally consistent systems.",
      },
      {
        type: "paragraph",
        value:
          "Payment APIs can fail only in one geography, a CDN edge can return stale content in one region, or an OAuth provider can rate-limit a specific route you don't control.",
      },
      {
        type: "paragraph",
        value: "How you fix it:",
      },
      {
        type: "list",
        items: [
          "Add region-aware fallbacks",
          "Retry through another region when possible",
          "Route traffic through a stable intermediary region",
          "Implement graceful degradation with fallback UX or cached responses",
        ],
      },
      {
        type: "paragraph",
        value:
          "Design takeaway: treat third-party APIs as unreliable per region, not globally reliable.",
      },
      {
        type: "heading",
        value: "Scenario 5: Deployment Drift Between Regions",
      },
      {
        type: "paragraph",
        value:
          "This one is self-inflicted. You think all regions run the same version. They don't.",
      },
      {
        type: "paragraph",
        value:
          "Failed rollouts, manual hotfixes, CI/CD race conditions, or unsynchronized feature flags create divergent environments that look similar until they break.",
      },
      {
        type: "paragraph",
        value:
          "A feature works in the US, but EU users hit errors because that region is still on the previous schema version.",
      },
      {
        type: "paragraph",
        value: "How you fix it:",
      },
      {
        type: "list",
        items: [
          "Enforce deployment parity checks",
          "Track region-to-version mapping explicitly",
          "Use immutable deployments",
          "Fail rollouts if any region diverges",
        ],
      },
      {
        type: "paragraph",
        value:
          'Design takeaway: multi-region without strict deployment discipline becomes chaos very quickly.',
      },
      {
        type: "heading",
        value: "Scenario 6: Autoscaling Behaves Differently Per Region",
      },
      {
        type: "paragraph",
        value:
          "This one is subtle but deadly. The same autoscaling config can produce very different outcomes depending on the region.",
      },
      {
        type: "paragraph",
        value:
          "Traffic patterns differ, metrics lag differs, and cloud capacity is not uniform. One region scales aggressively while another stays under-provisioned.",
      },
      {
        type: "paragraph",
        value:
          "A real pattern is us-east-1 scaling fine while eu-west-1 hits CPU saturation and throttles under the same config because the capacity pools are different.",
      },
      {
        type: "paragraph",
        value: "How you fix it:",
      },
      {
        type: "list",
        items: [
          "Tune autoscaling per region instead of globally",
          "Use leading indicators like queue depth and request rate",
          "Add headroom buffers in smaller or less stable regions",
        ],
      },
      {
        type: "paragraph",
        value:
          "Design takeaway: regions are not symmetric. Stop treating them like they are.",
      },
      {
        type: "heading",
        value: "The Real Strategy: Design for Disagreement",
      },
      {
        type: "paragraph",
        value:
          "You do not solve this with better dashboards alone. You solve it with architecture and mindset.",
      },
      {
        type: "paragraph",
        value: "1. Make regions first-class citizens",
      },
      {
        type: "paragraph",
        value:
          "Every metric, log, and trace should be region-tagged and easy to compare. If you cannot answer what is different between regions right now, you're blind.",
      },
      {
        type: "paragraph",
        value: "2. Assume partial failure is normal",
      },
      {
        type: "paragraph",
        value:
          "Design systems so one region can degrade without killing everything, traffic can shift automatically, and failures stay isolated instead of amplified.",
      },
      {
        type: "paragraph",
        value: "3. Build region-aware routing",
      },
      {
        type: "paragraph",
        value:
          "Not just geo-based routing, but health-aware, latency-aware, and dependency-aware routing.",
      },
      {
        type: "paragraph",
        value: "4. Separate control plane from data plane",
      },
      {
        type: "paragraph",
        value:
          "If deploys, configs, or feature flags fail in one region, they should not corrupt others or block recovery elsewhere.",
      },
      {
        type: "paragraph",
        value: "5. Embrace observability that explains differences",
      },
      {
        type: "paragraph",
        value:
          "Not just whether it is broken, but why this region is different from the others. That means high-cardinality metrics, distributed tracing across regions, and dependency-level visibility.",
      },
      {
        type: "heading",
        value: "Final Thought",
      },
      {
        type: "paragraph",
        value:
          "Multi-region systems don't fail cleanly. They fracture. One region lies, another tells the truth, and your job is to figure out which one is closer to reality.",
      },
      {
        type: "paragraph",
        value:
          "If you design assuming uniformity, you'll chase symptoms forever. If you design for disagreement, you'll actually control the system.",
      },
    ],
  },
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
    slug: "allude-video-recording-poc",
    title: "Allude Video Recording POC",
    description:
      "A browser-based video recording POC with IndexedDB persistence and upload failure handling.",
    why: "It started as an interview task, and I wanted to build something reliable instead of a fragile demo.",
    href: "https://github.com/AntipasBen23/Allude-Task-Feature",
    liveHref: "https://allude-task.netlify.app/",
    imageSrc: "/allude.png",
    imageAlt: "Allude video recording proof-of-concept screenshot",
  },
  {
    slug: "deepidv-case-inspector",
    title: "deepidv Case Inspector",
    description:
      "A flagged-case investigation console for reviewing identity verification signals, evidence, and audit trails.",
    why: "Verification engines can detect risk automatically, but analysts still need a clear workflow to inspect why a case failed.",
    href: "https://github.com/AntipasBen23/deepidv-feature-demo",
    liveHref: "https://deepidv-feature-demo.netlify.app/",
    imageSrc: "/deepdiv.png",
    imageAlt: "deepidv Case Inspector investigation console screenshot",
  },
  {
    slug: "loovi-trajectory-preview-module",
    title: "LOOVI Trajectory Preview Module",
    description:
      "A longitudinal biomarker projection module for previewing trend direction and simple health scenarios.",
    why: "Health dashboards often show history clearly, but they rarely help users see where those biomarker trends are heading.",
    href: "https://github.com/AntipasBen23/loovi-feature-demo",
    liveHref: "https://loovi-feature-demo.netlify.app/",
    imageSrc: "/loovi.png",
    imageAlt: "LOOVI trajectory preview biomarker dashboard screenshot",
  },
];
