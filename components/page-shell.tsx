import Link from "next/link";
import Image from "next/image";

type SideItem = {
  label: string;
  href: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </section>
  );
}

export function PageLayout({
  items,
  children,
}: {
  items: SideItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout">
      <aside className="sidebar">
        {items.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </aside>
      <div className="page-content-stack">{children}</div>
    </div>
  );
}

export function ContentPanel({
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="content-panel">
      {image ? (
        <Image className="panel-image" src={image} alt={imageAlt ?? title} width={1200} height={800} />
      ) : null}
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}
