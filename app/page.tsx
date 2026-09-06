import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { InstallCommand } from "@/components/install-command";
import { VALCORE_SKILLS_DOWNLOAD_URL } from "@/lib/links";

export default function Home() {
  return (
    <main>
      <SiteHeader active="home" />

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Local-first agent evaluation</div>
          <h1>Build evaluations<br />you can <em>trust.</em></h1>
          <p className="lede">
            Valcore is a focused workbench for authoring agent judges, building datasets,
            and running agent evaluations—from a visual UI, your terminal, or CI.
          </p>
          <div className="actions">
            <InstallCommand />
            <div className="hero-buttons">
              <a className="primary-button" href="/docs/getting-started">
                Get started <span aria-hidden="true">→</span>
              </a>
              <a className="secondary-button" href={VALCORE_SKILLS_DOWNLOAD_URL} download>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
                </svg>
                Download skills
              </a>
            </div>
          </div>
          <p className="supporting">Open source · Apache 2.0 · Python 3.11+</p>
        </div>

        <div className="hero-visual" aria-label="Valcore evaluation workflow preview">
          <div className="logo-stage">
            <div className="halo" />
            <Image className="hero-logo" src="/logo.png" alt="Valcore" width={597} height={640} priority />
          </div>
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
          <span><b>01</b> Author the agent judge</span>
          <i>→</i>
          <span><b>02</b> Build the dataset</span>
          <i>→</i>
          <span><b>03</b> Validate and ship</span>
        </div>
      </section>

      <section className="workflow-story shell" id="workflow">
        <header className="section-heading">
          <div className="eyebrow"><span /> The Valcore workflow</div>
          <h2>From a judgment call<br />to a release signal.</h2>
          <p>Valcore keeps the agent judge, the evidence, and every result connected in one local-first workflow.</p>
        </header>

        <div className="workflow-patterns">
          <article className="pattern-card">
            <div className="pattern-number">01</div>
            <div className="pattern-copy">
              <span>Define the standard</span>
              <h3>Author an evaluator</h3>
              <p>Turn the behavior you care about into an agent judge with explicit inputs, a structured score, and versioned harness capabilities.</p>
              <a href="/docs/evaluators">Evaluator guide <span aria-hidden="true">→</span></a>
            </div>
            <div className="pattern-ui evaluator-preview" aria-hidden="true">
              <small>evaluator / response quality</small>
              <div><i /> Instructions</div>
              <p>Judge whether the response is accurate, relevant, and complete.</p>
              <div className="preview-chips"><b>reasoning</b><b>score</b><b>confidence</b></div>
            </div>
          </article>

          <article className="pattern-card">
            <div className="pattern-number">02</div>
            <div className="pattern-copy">
              <span>Build the evidence</span>
              <h3>Shape a dataset</h3>
              <p>Bring in real Logfire traces, upload existing cases, or generate synthetic edge cases—then label the examples that matter.</p>
              <a href="/docs/datasets">Dataset guide <span aria-hidden="true">→</span></a>
            </div>
            <div className="pattern-ui dataset-preview" aria-hidden="true">
              <div className="table-row table-head"><span>input</span><span>expected</span><span>label</span></div>
              <div className="table-row"><span>Refund request</span><span>Policy + next step</span><b>pass</b></div>
              <div className="table-row"><span>Missing context</span><span>Clarifying question</span><b>pass</b></div>
              <div className="table-row"><span>Unsafe request</span><span>Safe refusal</span><b>review</b></div>
            </div>
          </article>

          <article className="pattern-card">
            <div className="pattern-number">03</div>
            <div className="pattern-copy">
              <span>Measure the change</span>
              <h3>Validate, compare, ship</h3>
              <p>Measure agreement with human labels, compare evaluator versions on the same data, and enforce release thresholds in CI.</p>
              <a href="/docs/experiments">Experiment guide <span aria-hidden="true">→</span></a>
            </div>
            <div className="pattern-ui result-preview" aria-hidden="true">
              <small>validation / v4</small>
              <strong>94.2%</strong>
              <span>agreement across 128 cases</span>
              <div className="threshold-line"><i /> threshold 90% <b>passed</b></div>
            </div>
          </article>
        </div>
      </section>

      <section className="home-cta shell">
        <div><span>Run locally. Keep control.</span><h2>Start with your first evaluator.</h2></div>
        <a className="primary-button" href="/docs/getting-started">Open the guide <span aria-hidden="true">→</span></a>
      </section>
    </main>
  );
}
