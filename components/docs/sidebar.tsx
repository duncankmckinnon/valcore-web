import Link from "next/link";
import { docs, type DocSlug } from "@/lib/docs";

export function DocsSidebar({ active }: { active: DocSlug }) {
  return (
    <aside className="docs-sidebar" aria-label="Documentation navigation">
      <div className="docs-sidebar-label">Documentation</div>
      <nav>
        {docs.map((doc) => (
          <div className="sidebar-group" key={doc.slug}>
            <Link className={doc.slug === active ? "current" : undefined} href={`/docs/${doc.slug}`}>
              {doc.title}
            </Link>
            {doc.slug === active && (
              <ul>
                {doc.sections.map((section) => (
                  <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
