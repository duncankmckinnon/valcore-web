import Image from "next/image";
import Link from "next/link";

const GithubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.58-.3-5.29-1.29-5.29-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.99 10.99 0 0 1 12 6.13c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.4-2.72 5.38-5.31 5.67.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

export function SiteHeader({ active }: { active?: "home" | "docs" }) {
  return (
    <nav className="nav shell" aria-label="Primary navigation">
      <Link className="brand" href="/" aria-label="Valcore home">
        <Image src="/logo.png" alt="" width={52} height={44} priority />
        <span>valcore</span>
      </Link>
      <div className="nav-links">
        <Link className={active === "docs" ? "active" : undefined} href="/docs/installation">Docs</Link>
        <a className="github-link" href="https://github.com/duncankmckinnon/valcore">
          <GithubIcon />
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  );
}
