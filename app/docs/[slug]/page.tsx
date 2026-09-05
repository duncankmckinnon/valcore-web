import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocContent } from "@/components/docs/doc-content";
import { DocsSidebar } from "@/components/docs/sidebar";
import { docs, getDoc, type DocSlug } from "@/lib/docs";

export function generateStaticParams() {
  return docs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  if (!doc) return {};
  return { title: `${doc.title} · Valcore docs`, description: doc.description, alternates: { canonical: `/docs/${doc.slug}` } };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  return <div className="docs-shell shell"><DocsSidebar active={slug as DocSlug} /><article className="docs-content"><DocContent slug={slug as DocSlug} /></article></div>;
}
