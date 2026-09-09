import type { ReactNode } from "react";
import { CopyCode } from "./copy-code";

export function Code({ children }: { children: string }) {
  return <CopyCode value={children} />;
}

export function Note({ title = "Good to know", children }: { title?: string; children: ReactNode }) {
  return <aside className="docs-note"><strong>{title}</strong><div>{children}</div></aside>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <header className="docs-intro"><span>{eyebrow}</span><h1>{title}</h1><p>{children}</p></header>;
}
