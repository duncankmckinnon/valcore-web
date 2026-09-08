import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { InstallCommand } from "@/components/install-command";
import { AgentSkillInstall } from "@/components/agent-skill-install";

const routes = {
  datasets: [
    ["Hand-author", "Shape a small golden set row by row"],
    ["Import", "Upload an existing CSV or JSON test set"],
    ["Query Logfire", "Define a dataset in SQL and re-sync new matching traces at any time"],
    ["Generate", "Control columns, characteristics, labels, and distributions"],
    ["From an evaluator", "Create compatible edge cases from its existing contract"],
  ],
} as const;

export default function Home() {
  return (
    <main>
      <SiteHeader active="home" />

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> The workbench for agent judges</div>
          <h1>Agentic<br />experimentation—<br /><em>done the right way.</em></h1>
          <p className="lede">
            Valcore connects flexible datasets, fully harnessed agent evaluators, and statistical
            validation in one workflow. Start with either the judge or the evidence, generate the
            other from the same data contract, then version and compare every result.
          </p>
          <div className="actions">
            <InstallCommand />
            <div className="hero-buttons">
              <Link className="primary-button" href="/docs/getting-started">
                Build your first eval <span aria-hidden="true">→</span>
              </Link>
              <AgentSkillInstall />
            </div>
          </div>
          <p className="supporting">Open source · Apache 2.0 · Python 3.11+ · Local CLIs or Pydantic AI Gateway</p>
        </div>

        <div className="hero-visual" aria-label="A Valcore validation run showing 94.2 percent agreement">
          <div className="logo-stage">
            <div className="halo" />
            <Image className="hero-logo" src="/logo.png" alt="Valcore" width={597} height={640} priority />
          </div>
          <div className="workflow-card">
            <div className="card-head">
              <span className="status-dot" />
              <span>validation run</span>
              <span className="run-id">judge_v4 × support_set</span>
            </div>
            <div className="score-row">
              <div><strong>94.2%</strong><span>label agreement</span></div>
              <div className="spark" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
            <div className="card-foot">
              <span>128 labeled cases</span>
              <span className="passed">✓ threshold passed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof shell" aria-label="Valcore workflow">
        <p>One connected system—not a pile of eval utilities.</p>
        <div className="steps">
          <span><b>01</b> Shape the contract</span>
          <i>→</i>
          <span><b>02</b> Build judge + evidence</span>
          <i>→</i>
          <span><b>03</b> Measure agreement</span>
        </div>
      </section>

      <section className="contract-story shell" id="workflow">
        <header className="section-heading compact-heading">
          <div className="eyebrow"><span /> The connected workflow</div>
          <h2>Start from either side.<br />Keep the contract intact.</h2>
          <p>
            A dataset can generate its evaluator. An evaluator can generate its test set.
            Columns and labels stay compatible, so you spend less time wiring tools together
            and more time improving the judgment.
          </p>
        </header>

        <div className="contract-map" aria-label="Datasets and evaluators share a contract and feed versioned validation runs">
          <article className="contract-node">
            <span className="node-kicker">Evidence</span>
            <h3>Dataset</h3>
            <div className="schema-line"><code>question</code><small>string</small></div>
            <div className="schema-line"><code>response</code><small>string</small></div>
            <div className="schema-line accent-line"><code>label</code><small>pass · fail · review</small></div>
          </article>

          <div className="contract-link" aria-hidden="true">
            <span>shared contract</span>
            <b>⇄</b>
            <small>generate either direction</small>
          </div>

          <article className="contract-node">
            <span className="node-kicker">Agent judge</span>
            <h3>Evaluator</h3>
            <div className="schema-line"><code>inputs</code><small>question · response</small></div>
            <div className="schema-line"><code>output</code><small>reasoning · score</small></div>
            <div className="schema-line accent-line"><code>score</code><small>pass · fail · review</small></div>
          </article>

          <div className="run-link" aria-hidden="true"><span>run + compare</span><b>→</b></div>

          <article className="contract-node result-node">
            <span className="node-kicker">Release evidence</span>
            <h3>Validation</h3>
            <strong>94.2%</strong>
            <p>agreement · κ · F1 · confusion matrix</p>
            <small>traced and synced to Logfire</small>
          </article>
        </div>
      </section>

      <section className="workflow-story shell">
        <header className="section-heading">
          <div className="eyebrow"><span /> Flexible where it matters</div>
          <h2>Bring what you have.<br />Generate what you need.</h2>
          <p>Every entry point lands in the same versioned, portable evaluation workflow.</p>
        </header>

        <div className="workflow-patterns">
          <article className="pattern-card expanded-pattern">
            <div className="pattern-number">01</div>
            <div className="pattern-copy">
              <span>Representative evidence</span>
              <h3>Datasets that fit the work</h3>
              <p>
                Define real input columns, a fixed label set, and the distribution you expect
                in production—or use a refreshable SQL query over your Logfire traces.
              </p>
              <Link href="/docs/datasets">Explore datasets <span aria-hidden="true">→</span></Link>
            </div>
            <div className="route-list">
              {routes.datasets.map(([title, description]) => (
                <div className="route-row" key={title}>
                  <i aria-hidden="true" />
                  <div><strong>{title}</strong><span>{description}</span></div>
                </div>
              ))}
              <div className="portability-row"><span>Export</span><code>Pydantic Logfire</code><code>Python</code></div>
            </div>
          </article>

          <article className="pattern-card expanded-pattern">
            <div className="pattern-number">02</div>
            <div className="pattern-copy">
              <span>More than a prompt</span>
              <h3>Evaluators that run as agents</h3>
              <p>
                Each evaluator is a fully specified agent judge: typed inputs, structured
                outputs, model, prompt, tools, and harness capabilities in one versioned unit.
              </p>
              <Link href="/docs/evaluators">Explore evaluators <span aria-hidden="true">→</span></Link>
            </div>
            <div className="evaluator-editor-preview" aria-label="A compact preview of Valcore's evaluator version editor">
              <div className="editor-toolbar">
                <strong>v1 (frozen)</strong>
                <span className="editor-badge frozen">Frozen</span>
                <span className="editor-badge active">Active</span>
                <span className="editor-action">New version</span>
                <span className="editor-action">Export</span>
                <span className="editor-action">Generate dataset</span>
              </div>
              <div className="editor-card identity-card">
                <strong>Identity</strong>
                <small>MODEL</small>
                <code>gateway/anthropic:claude-sonnet-5</code>
              </div>
              <div className="editor-card judgment-card">
                <strong>Judgment</strong>
                <small>INSTRUCTIONS</small>
                <p>You are a domain reviewer. Judge whether the response is accurate, safe, and complete.</p>
                <small>PROMPT TEMPLATE</small>
                <p>Review the response to <code>{`{customer_request}`}</code></p>
              </div>
              <div className="editor-mini-grid">
                <div className="editor-card">
                  <strong>Inputs</strong>
                  <small>REQUIRED COLUMNS</small>
                  <div className="editor-chips"><code>customer_request</code><code>response</code></div>
                </div>
                <div className="editor-card">
                  <strong>Output contract</strong>
                  <small>OUTPUT FIELDS</small>
                  <div className="field-row"><code>reasoning</code><span>str</span></div>
                  <div className="field-row"><code>judgment</code><span>enum · score</span></div>
                </div>
              </div>
              <div className="editor-capabilities"><span>⌄</span><strong>Capabilities &amp; tools</strong></div>
              <div className="editor-foot">
                <span>Run on</span><code>Claude</code><code>Codex</code><code>Cursor</code><code>Gateway</code>
              </div>
            </div>
          </article>

          <article className="pattern-card expanded-pattern">
            <div className="pattern-number">03</div>
            <div className="pattern-copy">
              <span>Evidence, not vibes</span>
              <h3>Runs that prove performance</h3>
              <p>
                Run an evaluator against human-labeled data, inspect every disagreement, and
                compare prompt, capability, or model changes on the exact same cases.
              </p>
              <Link href="/docs/experiments">Explore runs <span aria-hidden="true">→</span></Link>
            </div>
            <div className="metrics-preview" aria-label="Example validation statistics">
              <div><small>Accuracy</small><strong>94.2%</strong><span className="metric-up">+3.8</span></div>
              <div><small>Cohen&apos;s κ</small><strong>0.91</strong><span className="metric-up">strong</span></div>
              <div><small>Macro F1</small><strong>0.93</strong><span className="metric-up">+0.04</span></div>
              <div className="comparison-strip"><span>evaluator v3</span><b>same dataset</b><span>evaluator v4</span></div>
              <div className="sync-strip"><i /> Full traces and Pydantic experiments synced to Logfire</div>
            </div>
          </article>
        </div>
      </section>

      <section className="home-cta shell">
        <div><span>Your judgment, made repeatable</span><h2>Build the dataset and judge as one system.</h2></div>
        <Link className="primary-button" href="/docs/getting-started">Open the guide <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
