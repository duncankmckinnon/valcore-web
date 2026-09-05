import Image from "next/image";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main>
      <SiteHeader active="home" />

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
            <a className="primary-button" href="/docs/getting-started">
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
