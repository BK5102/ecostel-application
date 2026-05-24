import { createFileRoute } from "@tanstack/react-router";
import heroPart from "@/assets/hero-part.jpg";
import textureMetal from "@/assets/texture-metal.jpg";
import factoryAerial from "@/assets/factory-aerial.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const ROLES = [
  {
    title: "Founding Full-Stack Intern",
    team: "Platform",
    location: "Chennai · IITM Research Park / Remote",
    type: "Full-time internship",
    stack: "TypeScript · React · Node · Postgres",
    blurb:
      "Own end-to-end features on the quoting & collaboration platform. Ship to real manufacturers in week one.",
  },
  {
    title: "AI / ML Engineering Intern",
    team: "Quoting Intelligence",
    location: "Chennai / Remote",
    type: "Full-time internship",
    stack: "Python · LLMs · Geometry · CAD parsing",
    blurb:
      "Build the instant-quote engine: extract features from STEP/STL/PDFs and price parts in seconds.",
  },
  {
    title: "Design Engineering Intern",
    team: "Product",
    location: "Chennai / Remote",
    type: "Full-time internship",
    stack: "Figma · React · Motion",
    blurb:
      "Design and ship the surfaces engineers use every day — from CAD viewers to supplier dashboards.",
  },
  {
    title: "Manufacturing Software Intern",
    team: "Ops × Engineering",
    location: "Chennai",
    type: "Full-time internship",
    stack: "DFM · CNC · 3DP · Python",
    blurb:
      "Sit between suppliers and software. Translate shop-floor reality into product workflows.",
  },
];

const VALUES = [
  { n: "01", t: "Move Fast", d: "Those closest to the work make the calls. Bottlenecks are bugs." },
  { n: "02", t: "Hire for Attitude", d: "Skills can be taught. Ownership, curiosity, and drive cannot." },
  { n: "03", t: "Performance over Presence", d: "Outcomes, not hours. You manage your time. You ship." },
  { n: "04", t: "Transparency", d: "Defaults are open. Context is shared. No hidden roadmaps." },
  { n: "05", t: "Think Independently", d: "We don't follow things just because that's how it's done." },
  { n: "06", t: "Aim for Mars", d: "Build the infrastructure modern manufacturing has been missing." },
];

const CAPABILITIES = [
  "3D Printing", "CNC Machining", "Sheet & Tube Fab", "Injection Molding", "Casting", "Surface & Protection",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Mission />
      <Platform />
      <Values />
      <Roles />
      <Apply />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 7l8-4 8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4M12 11v10" />
            </svg>
          </span>
          ecostel
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#mission" className="hover:text-foreground">Mission</a>
          <a href="#platform" className="hover:text-foreground">Platform</a>
          <a href="#values" className="hover:text-foreground">Values</a>
          <a href="#roles" className="hover:text-foreground">Open Roles</a>
        </nav>
        <a
          href="#roles"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Apply →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now hiring · Founding Engineering Interns · 2026
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Build the software that <span className="text-gradient">moves atoms.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Ecostel is making custom manufacturing faster, smarter, and more accessible.
              Join the founding engineering team. Ship to real factories. Aim for Mars.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#roles"
                className="glow-primary inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                See open roles
                <span aria-hidden>→</span>
              </a>
              <a
                href="#mission"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-card"
              >
                Why Ecostel
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8 max-w-lg">
              {[
                ["6", "Manufacturing capabilities"],
                ["1", "Platform, end-to-end"],
                ["∞", "Things to build"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="text-3xl font-semibold text-foreground">{k}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative lg:col-span-5">
            <div className="glow-primary relative overflow-hidden rounded-2xl border border-border">
              <img
                src={heroPart}
                alt="Precision CNC-machined aluminum aerospace component"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
                <div className="flex items-end justify-between text-xs">
                  <div>
                    <div className="text-muted-foreground">PART · AL-6061-T6</div>
                    <div className="text-foreground font-medium">CNC · 5-axis · ±0.02mm</div>
                  </div>
                  <div className="rounded-full border border-primary/40 bg-primary/10 px-2 py-1 text-primary">
                    QUOTED · 4h
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span>Backed by IITM Research Park</span>
        <span>Aerospace</span>
        <span>Semiconductor</span>
        <span>Robotics</span>
        <span>Defence</span>
        <span>Medical</span>
        <span>Consumer</span>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="relative">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Mission</div>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Sourcing is broken. We're rebuilding it from first principles.
          </h2>
        </div>
        <div className="space-y-6 text-lg text-muted-foreground lg:col-span-7">
          <p>
            Teams building the next generation of products — aerospace, medical, robotics —
            still spend days chasing quotes, managing vendors, and dealing with delays.
            That time should be spent engineering.
          </p>
          <p className="text-foreground">
            Ecostel brings quoting, communication, and execution into one platform.
            Vetted partners. Full ownership of delivery. Prototype to production, in one place.
          </p>
          <p>
            We're building the infrastructure modern manufacturing has been missing —
            <span className="text-primary"> and we're aiming for Mars.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="border-t border-border bg-card/20">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary">The Platform</div>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
              What you'll actually build.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <FeatureCard
            tag="Instant Quote"
            title="Quote in seconds, not days"
            desc="Upload CAD, drawings, BOMs. AI + experts extract features and return accurate quotes — with side-by-side supplier comparison."
          />
          <FeatureCard
            tag="Collaboration"
            title="DFM feedback on the design itself"
            desc="Comments, file sharing, and decisions live on the part — not buried in email threads. Roles for owners, reviewers, suppliers."
          />
          <FeatureCard
            tag="Project Tracking"
            title="Know exactly where every part is"
            desc="Real-time order status, supplier performance scoring, spend control. No chasing. No guessing."
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 overflow-hidden rounded-2xl border border-border">
            <img
              src={factoryAerial}
              alt="Aerial view of a modern manufacturing facility"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-border bg-background/50 p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-primary">Capabilities</div>
            <ul className="mt-6 divide-y divide-border">
              {CAPABILITIES.map((c) => (
                <li key={c} className="flex items-center justify-between py-3 text-sm">
                  <span className="text-foreground">{c}</span>
                  <span className="text-muted-foreground">↗</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background/40 p-8 transition hover:border-primary/50">
      <div className="text-xs uppercase tracking-[0.18em] text-primary">{tag}</div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
    </div>
  );
}

function Values() {
  return (
    <section id="values" className="relative overflow-hidden">
      <img
        src={textureMetal}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="text-xs uppercase tracking-[0.2em] text-primary">How we work</div>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          We're not built like a traditional company.
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.n} className="bg-background p-8">
              <div className="font-mono text-xs text-primary">{v.n}</div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roles() {
  return (
    <section id="roles" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary">Open Roles</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Founding engineering internships.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Real ownership from day one. We hire for attitude — if you ship and care, we want to talk.
            </p>
          </div>
          <a
            href="mailto:careers@ecostel.com"
            className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm hover:bg-card"
          >
            careers@ecostel.com
          </a>
        </div>

        <div className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {ROLES.map((r) => (
            <a
              key={r.title}
              href="#apply"
              className="group grid items-center gap-4 bg-background px-6 py-6 transition hover:bg-card md:grid-cols-12"
            >
              <div className="md:col-span-5">
                <div className="text-xs uppercase tracking-[0.18em] text-primary">{r.team}</div>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.blurb}</p>
              </div>
              <div className="text-sm text-muted-foreground md:col-span-3">{r.stack}</div>
              <div className="text-sm text-muted-foreground md:col-span-3">
                {r.location}
                <div className="text-xs text-muted-foreground/70">{r.type}</div>
              </div>
              <div className="md:col-span-1 md:text-right">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Apply() {
  return (
    <section id="apply" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Ready to build the <span className="text-gradient">future of manufacturing?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Send us your résumé, GitHub, and one thing you've shipped you're proud of.
          We read every application.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:careers@ecostel.com?subject=Founding%20Engineering%20Intern%20Application"
            className="glow-primary inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Apply now <span aria-hidden>→</span>
          </a>
          <a
            href="#roles"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm"
          >
            Browse roles
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold">E</span>
          <span className="text-foreground font-medium">Ecostel</span>
          <span>· Manufacturing infrastructure for the next generation.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/company/ecostel-engineering" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href="mailto:careers@ecostel.com" className="hover:text-foreground">careers@ecostel.com</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
