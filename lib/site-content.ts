export type PageContent = {
  title: string;
  eyebrow: string;
  description: string;
  sections: Array<{
    title: string;
    description: string;
  }>;
};

export type NavGroup = {
  label: string;
  href: string;
  items: Array<{ label: string; href: string; description: string }>;
};

export const capabilities = [
  {
    slug: "3d-printing-services",
    label: "3D Printing Services",
    description:
      "Reliable 3D printing infrastructure for prototyping, testing, and scaled production workflows.",
    image: "/notion-assets/page-03-image-02.png",
    items: [
      "Fused Deposition Modeling (FDM)",
      "HP Multi Jet Fusion (MJF)",
      "Selective Laser Sintering (SLS)",
      "Stereolithography (SLA)",
      "PolyJet",
      "Direct Metal Laser Sintering (DMLS)",
    ],
    materials: [
      "FDM production polymers",
      "MJF engineering-grade nylon",
      "SLS functional prototyping powders",
      "SLA high-detail resins",
      "PolyJet visual models",
      "DMLS metal alloys",
    ],
  },
  {
    slug: "cnc-machining",
    label: "CNC Machining",
    description: "Precision CNC workflows for complex parts and repeatable production.",
    image: "/notion-assets/page-02-image-01.png",
    items: ["CNC Milling", "CNC Turning", "CNC Routing", "EDM", "Micro Machining"],
  },
  {
    slug: "sheet-tube-fabrication",
    label: "Sheet & Tube Fabrication",
    description: "Sheet cutting, tube cutting, forming, welding, and assembly support.",
    image: "/notion-assets/page-10-image-02.png",
    items: [
      "Sheet Cutting",
      "Laser Cutting",
      "Waterjet Cutting",
      "Laser Tube Cutting",
      "Tube Bending",
      "Welding (TIG/MIG/Arc)",
      "Riveting",
      "Brazing",
      "Forming",
      "Assembly service",
    ],
  },
  {
    slug: "injection-molding",
    label: "Injection Molding",
    description: "Prototype and production molding for plastic parts and complex assemblies.",
    image: "/notion-assets/page-10-image-04.png",
    items: ["Plastic Injection Molding", "Prototype Molding", "Production Molding", "Insert Molding", "Overmolding", "Micro Molding"],
  },
  {
    slug: "casting",
    label: "Casting",
    description: "Casting options for production-ready metal parts.",
    image: "/notion-assets/page-10-image-03.png",
    items: ["Die Casting", "Sand Casting", "Investment Casting"],
  },
  {
    slug: "surface-protection",
    label: "Surface & Protection",
    description: "Finishing and protection services for durable production output.",
    image: "/notion-assets/page-03-image-03.png",
    items: ["Painting", "Anodizing", "Plating", "Polishing", "Powder Coating"],
  },
];

export const industries = [
  ["Semiconductor Equipment", "/notion-assets/page-10-image-04.png"],
  ["Aerospace", "/notion-assets/page-11-image-01.jpg"],
  ["Robotics", "/notion-assets/page-10-image-03.png"],
  ["Defence", "/notion-assets/page-11-image-02.jpg"],
  ["Medical", "/notion-assets/page-10-image-02.png"],
  ["Consumer Appliances", "/notion-assets/page-10-image-05.png"],
].map(([label, image]) => ({
  slug: label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  label,
  image,
  description: "Manufacturing support for teams building the next generation of products.",
}));

export const solutions = [
  {
    slug: "instant-quote",
    label: "Instant Quote",
    description:
      "Upload your parts and get fast, reliable quotes powered by experts and AI, with easy comparison to choose the best price.",
    image: "/notion-assets/page-05-image-01.png",
    sections: [
      {
        title: "Quote with Speed and Clarity",
        description:
          "Our team checks your design and shares useful feedback, so you can decide quickly and move forward without delays.",
      },
      {
        title: "Get Accurate Quotes Easily",
        description:
          "Upload your parts and get fast, reliable quotes powered by experts and AI, with easy comparison to choose the best price.",
      },
      {
        title: "Long-Term Production Planning",
        description: "We plan repeat orders ahead keeping production smooth and predictable.",
      },
      {
        title: "Compare Options Easily",
        description:
          "Find different prices and delivery times in one place, so you can choose the best option from trusted partners without the hassle.",
      },
    ],
  },
  {
    slug: "collaboration",
    label: "Collaboration",
    description:
      "Work closely with our team and suppliers in one place. Get DFM feedback early, make better decisions, and build strong relationships you can rely on.",
    image: "/notion-assets/page-06-image-02.png",
    sections: [
      {
        title: "Work Better on Quotes and Orders",
        description:
          "Work closely with our team and suppliers in one place. Get DFM feedback early, make better decisions, and build strong relationships you can rely on.",
      },
      {
        title: "Work Better with Suppliers",
        description:
          "Share files, updates, and feedback directly on your CAD designs. Keep all communication and changes in one place, with no more confusing email threads.",
      },
      {
        title: "Work Together",
        description:
          "Share quotes, orders, and messages with your team so everyone stays updated. Control who can see or edit things based on their role.",
      },
    ],
  },
  {
    slug: "project-tracking",
    label: "Project Tracking",
    description:
      "Stay organized with simple tools to track, review, and collaborate so everyone stays on the same page.",
    image: "/notion-assets/page-08-image-02.png",
    sections: [
      {
        title: "Handle quotes and orders with ease",
        description:
          "Stay organized with simple tools to track, review, and collaborate so everyone stays on the same page.",
      },
      {
        title: "Track Your Orders in Real Time",
        description:
          "See exactly where your parts are in the process at any moment. Get updates as things move forward, so you're never left guessing or chasing for status.",
      },
      {
        title: "Monitor Supplier Performance",
        description:
          "Easily see how your suppliers are doing. The system automatically tracks key details like delivery reliability, quote speed, and order acceptance so you always know who performs best.",
      },
      {
        title: "Manage updates and spending",
        description:
          "Stay on top of part updates, follow your orders, and clearly see where your money is going.",
      },
    ],
  },
  {
    slug: "quality-management",
    label: "Quality Management",
    description: "Every part meets specifications, with controlled processes and timely delivery.",
    sections: [
      {
        title: "Quality Control & Assurance",
        description: "Ecostel Quality framework covers:",
        items: [
          "Understand requirements.",
          "Continuous QMS improvement.",
          "Controlled processes. Consistent output.",
        ],
      },
    ],
  },
  {
    slug: "tariff-management",
    label: "Tariff Management",
    description: "Clear order, supplier, and spend visibility for manufacturing decisions.",
    image: "/notion-assets/page-08-image-01.jpg",
    sections: [
      {
        title: "Manage updates and spending",
        description:
          "Stay on top of part updates, follow your orders, and clearly see where your money is going.",
      },
    ],
  },
];

export const resources = [
  {
    slug: "case-studies",
    label: "Case Studies",
    description: "Built for teams that can't afford delays.",
  },
  {
    slug: "articles",
    label: "Articles",
    description: "Engineering and manufacturing notes from Ecostel.",
  },
  {
    slug: "webinar",
    label: "Webinar",
    description: "Future sessions for manufacturing teams and product builders.",
  },
];

export const linkedInArticles = [
  {
    title: "Most Tolerance Issues Start Much Earlier Than You Think",
    summary: "Why tolerance stack-ups fail at the design stage — and how catching them early saves time, cost, and rework on the floor.",
    tag: "Design for Manufacturing",
    href: "https://www.linkedin.com/posts/ecostel-engineering_most-tolerance-issues-start-much-earlier-activity-7451924232730595330-DLLx?utm_source=share&utm_medium=member_desktop&rcm=ACoAACdoZn4BegUlAxQQXt58YyzALs9ymzP5dag",
  },
  {
    title: "The Smarter Factory Isn't Just Coming — It's Here",
    summary: "How automation, data, and connected supply chains are reshaping what modern manufacturing actually looks like today.",
    tag: "Industry Insight",
    href: "https://www.linkedin.com/pulse/smarter-factory-isnt-just-coming-ecostel-engineering-issvc/?trackingId=g8tJf%2B%2FdHxuu%2BCULnzlBDg%3D%3D",
  },
  {
    title: "Bridging the Gap Between Engineering and Production",
    summary: "The handoff between design and manufacturing is where quality breaks down. Here's how EcoStel closes that gap.",
    tag: "Production Workflow",
    href: "https://www.linkedin.com/posts/ecostel-engineering_activity-7287687941655605248-kwOj?utm_source=share&utm_medium=member_desktop&rcm=ACoAACdoZn4BegUlAxQQXt58YyzALs9ymzP5dag",
  },
  {
    title: "Building Reliable Supply Chains for Hardware Teams",
    summary: "What hardware startups and NPD teams need from their manufacturing partners — and why predictability beats price every time.",
    tag: "Supply Chain",
    href: "https://www.linkedin.com/article/edit/7282015543467954176/?author=urn%3Ali%3Acompany%3A104792557",
  },
  {
    title: "Are You a Designer or NPD Engineer? Read This First.",
    summary: "Before you send your next file for quoting, make sure your design is production-ready. A practical checklist from the EcoStel team.",
    tag: "NPD & Prototyping",
    href: "https://www.linkedin.com/posts/ecostel-engineering_are-you-a-designer-or-npd-engineer-looking-activity-7272949210415534080-EYSZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAACdoZn4BegUlAxQQXt58YyzALs9ymzP5dag",
  },
];

export const marketplaceFlows = [
  {
    label: "Buyer RFQ",
    title: "Upload a part package and submit an RFQ",
    description:
      "Buyers can capture material, finish, tolerance, quantity, and lead-time priority before Ecostel routes the work to vetted suppliers.",
    details: ["CAD, drawing, and BOM inputs", "Draft and submit states", "Admin routing queue"],
  },
  {
    label: "Vendor Workspace",
    title: "Review assigned RFQs and submit quotes",
    description:
      "Approved vendors receive matched RFQs, review part specs, and submit price, lead time, MOQ, shipping, and clarifying notes.",
    details: ["RFQ queue", "Quote draft and submit", "Order milestone updates"],
  },
  {
    label: "Buyer Decision",
    title: "Compare quotes and issue a PO",
    description:
      "Buyers compare supplier options side by side using price, lead time, MOQ, certifications, and vendor performance signals.",
    details: ["Quote comparison", "Recommended supplier badge", "PO confirmation flow"],
  },
];

export const vendorApplicationSteps = [
  "Business identity and GST details",
  "Capability, material, lot-size, and lead-time declaration",
  "Certification and business document uploads",
  "Admin review within 2 business days",
];

export const aboutContent: PageContent = {
  title: "Built for teams that can't afford delays.",
  eyebrow: "About us",
  description:
    "We work with teams building the next generation of products. Join us in making manufacturing faster, smarter, and more reliable.",
  sections: [
    {
      title: "Ecostel",
      description:
        "We believe building great products shouldn't be limited by manufacturing complexity. Whether it's aerospace, medical, or next-gen technology, turning ideas into reality should be fast and reliable.",
    },
    {
      title: "We fix that",
      description:
        "Our platform brings quoting, communication, and execution into one place. With vetted manufacturing partners and full ownership of delivery, we ensure faster turnaround, complete visibility, and reliable outcomes from prototype to production.",
    },
  ],
};

export const values = [
  ["We Move Fast", "We trust those closest to the work to make the right calls, removing bottlenecks and enabling faster, more effective execution."],
  ["We hire for Attitude", "Skills can be taught attitude cannot. We work with people who take ownership, stay curious, and show the drive to solve problems."],
  ["Performance over Presence", "We focus on outcomes, not hours. You're trusted to manage your time and deliver results. Ownership and accountability matter more than being seen."],
  ["Transparency", "We keep things open and clear. Everyone understands what's happening, what's working, and what needs to improve so we can make better decisions together."],
  ["Ship Fast. Improve Faster.", "We move forward and learn as we go. Instead of waiting for perfect, we launch, gather feedback, and continuously improve."],
  ["Customer First", "We put the customer first in everything we do. We respond quickly, understand their needs, and focus on doing the job right, so they can rely on us every time."],
  ["Technology-Driven", "We leverage technology to simplify, scale, and deliver better outcomes."],
  ["Built for Impact", "We support industries that shape the future like aerospace, space, medical, and advanced engineering."],
  ["Think Independently. Fix What's Broken", "We don't follow things just because that's how it's done. If something isn't working, we speak up and take action."],
];

export const navGroups: NavGroup[] = [
  {
    label: "Capabilities",
    href: "/capabilities",
    items: capabilities.map((item) => ({
      label: item.label,
      href: `/capabilities/${item.slug}`,
      description: item.description,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    items: industries.map((item) => ({
      label: item.label,
      href: `/industries/${item.slug}`,
      description: item.description,
    })),
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: solutions.map((item) => ({
      label: item.label,
      href: `/solutions/${item.slug}`,
      description: item.description,
    })),
  },
  {
    label: "Resource",
    href: "/resources",
    items: resources.map((item) => ({
      label: item.label,
      href: `/resources/${item.slug}`,
      description: item.description,
    })),
  },
  {
    label: "About us",
    href: "/about",
    items: [
      { label: "About Ecostel", href: "/about", description: aboutContent.description },
      { label: "How we work", href: "/about#values", description: "We're not built like a traditional company." },
      { label: "Privacy", href: "/about#privacy", description: "We treat your data with care and respect." },
    ],
  },
];

export function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}
