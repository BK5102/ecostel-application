import Image from "next/image";
import type { ReactNode } from "react";

type SideItem = {
  label: string;
  href: string;
};
// SideItem kept for backwards-compat — items prop accepted but not rendered

export function PageHero({
  eyebrow,
  title,
  titleSlot,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  /** When provided, renders instead of the <h1> title */
  titleSlot?: ReactNode;
  description: string;
  className?: string;
}) {
  return (
    <section className={`page-hero${className ? ` ${className}` : ""}`}>
      <div className="eyebrow">{eyebrow}</div>
      {titleSlot ?? <h1>{title}</h1>}
      <p className="lead">{description}</p>
    </section>
  );
}

export function PageLayout({
  children,
}: {
  items?: SideItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout">
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
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
      {image ? (
        <Image className="panel-image" src={image} alt={imageAlt ?? title} width={1200} height={800} />
      ) : null}
    </section>
  );
}
