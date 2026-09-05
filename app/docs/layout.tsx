import { SiteHeader } from "@/components/site-header";

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="docs-page"><SiteHeader active="docs" />{children}</main>;
}
