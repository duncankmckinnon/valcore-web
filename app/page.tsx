import Image from "next/image";

const GithubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.58-.3-5.29-1.29-5.29-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.99 10.99 0 0 1 12 6.13c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.4-2.72 5.38-5.31 5.67.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Valcore home">
          <Image src="/logo.png" alt="" width={52} height={44} priority />
          <span>valcore</span>
        </a>
        <div className="nav-links">
          <a href="https://github.com/duncankmckinnon/valcore#readme">Docs</a>
          <a className="github-link" href="https://github.com/duncankmckinnon/valcore">
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Local-first agent evaluation</div>
          <h1>Build evaluations<br />you can <em>trust.</em></h1>
          <p className="lede">
            Valcore is a focused workbench for authoring LLM judges, building datasets,
            and running agent evaluations—from a visual UI, your terminal, or CI.
          </p>
          <div className="actions">
            <div className="install" aria-label="Install Valcore with Homebrew">
              <span className="prompt">$</span>
              <code>brew install duncankmckinnon/tap/valcore</code>
            </div>
            <a className="primary-button" href="https://github.com/duncankmckinnon/valcore#quickstart">
              Get started <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="supporting">Open source · Apache 2.0 · Python 3.11+</p>
        </div>

        <div className="hero-visual" aria-label="Valcore evaluation workflow preview">
          <div className="halo" />
          <Image className="hero-logo" src="/logo.png" alt="Valcore" width={597} height={640} priority />
          <div className="workflow-card">
            <div className="card-head">
              <span className="status-dot" />
              <span>validation run</span>
              <span className="run-id">run_029</span>
            </div>
            <div className="score-row">
              <div><strong>94.2%</strong><span>agreement</span></div>
              <div className="spark" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
            <div className="card-foot">
              <span>support-agent-v4</span>
              <span className="passed">✓ threshold passed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof shell" aria-label="Valcore workflow">
        <p>One tight loop for better agents.</p>
        <div className="steps">
          <span><b>01</b> Author the judge</span>
          <i>→</i>
          <span><b>02</b> Build the dataset</span>
          <i>→</i>
          <span><b>03</b> Validate and ship</span>
        </div>
      </section>
    </main>
  );
}
