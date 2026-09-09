import { Code, Note, PageIntro } from "./ui";

export function LogfireIntegration() {
  return <>
    <PageIntro eyebrow="Pydantic-native observability" title="Logfire integration">Connect production evidence to the full Valcore loop: build Datasets from traces, observe Agent Evaluators, and open Pydantic Experiment Runs with every case attached.</PageIntro>

    <section id="architecture"><h2>Choose a project layout</h2><p>For most teams, use two Logfire projects. This keeps production access separate from evaluation output while still giving Valcore one connected workflow.</p>
      <div className="logfire-flow" aria-label="Recommended Logfire project layout">
        <article><span>Source Agent Project</span><strong>Production traces and source Datasets</strong><p>Valcore reads from this project with the read API key.</p></article>
        <div className="logfire-flow-arrow" aria-hidden="true">→</div>
        <article className="logfire-flow-core"><span>Local Valcore workspace</span><strong>Agent Evaluators, Datasets, Experiment Runs</strong><p>Your authoring and results remain available locally.</p></article>
        <div className="logfire-flow-arrow" aria-hidden="true">→</div>
        <article><span>Valcore Project</span><strong>Evaluation traces, experiments, published Datasets</strong><p>The tracing token and write API key point here.</p></article>
      </div>
      <Note title="One project also works">If source traces and evaluation output belong in the same Logfire project, use one project. The tracing token is still a separate credential, but one API key can serve both read and write access with <code>valcore config set-logfire-key</code>.</Note>
    </section>

    <section id="setup"><h2>Set up Logfire</h2><ol className="docs-steps">
      <li><strong>Create an account and organization.</strong> Sign in at <a href="https://logfire.pydantic.dev/" target="_blank" rel="noreferrer">Logfire</a>, then create the projects you chose above.</li>
      <li><strong>Create the tracing token.</strong> Open the Valcore Project, then <strong>Settings → Write tokens → New write token</strong>. Copy it when it is shown; Logfire only displays the full value once.</li>
      <li><strong>Create the read API key.</strong> In the Source Agent Project, open <strong>Settings → API Keys</strong>. Grant <code>project:read</code> and <code>project:read_datasets</code>.</li>
      <li><strong>Create the write API key.</strong> In the Valcore Project, create an API key with <code>project:read_datasets</code> and <code>project:write_datasets</code>.</li>
      <li><strong>Add the credentials to Valcore.</strong> Open <strong>Settings → Logfire</strong> and paste each value into its matching field, or use the CLI commands below.</li>
    </ol><Code>{`valcore config set-logfire-token
valcore config set-logfire-read-key
valcore config set-logfire-write-key
valcore config get`}</Code><p>Valcore stores secrets in <code>~/.valcore/config.toml</code> with file mode <code>0600</code>. Settings and <code>config get</code> report whether a secret is configured without returning its value.</p>
      <Note title="Environment override"><code>LOGFIRE_TOKEN</code> overrides the stored tracing token. Read and write API keys are read from Valcore&apos;s config file. If you change a stored credential while the app is open, Settings applies the new integration immediately.</Note>
    </section>

    <section id="gateway"><h2>Set up the Pydantic AI Gateway</h2><p>The Gateway is managed from your Logfire organization, but its API key has a different job from Logfire&apos;s tracing token and Dataset API keys: it authorizes hosted model requests.</p><ol className="docs-steps">
      <li><strong>Enable the Gateway.</strong> In Logfire, open your organization and go to <strong>AI Engineering → Gateway</strong>. Activate the Gateway if it is not already enabled.</li>
      <li><strong>Choose how models are funded.</strong> Use Pydantic&apos;s built-in providers with a Gateway balance, or add your own upstream provider credentials under <strong>Providers</strong>. Built-in providers may require a payment method and prepaid balance.</li>
      <li><strong>Create a Gateway key.</strong> Open the Gateway&apos;s <strong>API Keys</strong> tab, create a project-scoped key for Valcore, and apply the spending limits appropriate for evaluation runs.</li>
      <li><strong>Add the key to Valcore.</strong> Open <strong>Settings → Pydantic AI Gateway</strong> and paste the key, or configure it from the terminal:</li>
    </ol><Code>{`valcore config set-key
valcore config get`}</Code><p>Next, open <strong>Settings → Model Selection</strong>, clear the local CLI default, and use a <code>gateway/&lt;provider&gt;:&lt;model&gt;</code> route. One Gateway key can reach models from multiple configured providers.</p><Code>{`gateway/anthropic:claude-sonnet-5
gateway/openai:gpt-5
gateway/google:gemini-2.5-pro`}</Code>
      <div className="touchpoint-grid">
        <article><h3>Dataset generation</h3><p>Generate rows, suggested labels, controlled label distributions, and Dataset contracts with a hosted model.</p></article>
        <article><h3>Agent Evaluator authoring</h3><p>Generate or refine prompts and contracts, then run a pinned hosted model with Pydantic AI tools and harness capabilities.</p></article>
        <article><h3>Experiment Runs</h3><p>Execute the Agent Evaluator across a Dataset without depending on a locally installed and authenticated coding CLI.</p></article>
      </div>
      <Note title="Gateway access is not Logfire tracing">The Gateway key enables model calls and Gateway usage controls. Add the Logfire tracing token separately to send Valcore&apos;s Pydantic AI traces and Pydantic Experiment Runs to the Valcore Project.</Note>
      <Note title="Local agents remain an option">Claude Code, Codex, and Cursor routes do not need a Gateway key. Select a local CLI default in Settings when you want generation and evaluation to reuse an existing coding-agent login.</Note>
      <p>See Pydantic&apos;s official <a href="https://pydantic.dev/docs/logfire/manage/ai-gateway/" target="_blank" rel="noreferrer">AI Gateway setup guide</a> for provider configuration, project and user keys, regions, endpoints, spending limits, and usage telemetry.</p>
    </section>

    <section id="credentials"><h2>Credentials and scopes</h2><div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Credential</th><th>Logfire location and scope</th><th>What it enables</th></tr></thead><tbody>
      <tr><td><strong>Gateway API key</strong><code>gateway_api_key</code></td><td>Organization → AI Engineering → Gateway<br />Project-scoped Gateway key</td><td>Hosted model calls for Dataset generation, Agent Evaluator authoring, and Experiment Runs.</td></tr>
      <tr><td><strong>Tracing token</strong><code>logfire_token</code></td><td>Valcore Project<br />Project write token</td><td>Valcore service telemetry, Pydantic AI traces, and Pydantic Experiment Runs.</td></tr>
      <tr><td><strong>Read API key</strong><code>logfire_read_key</code></td><td>Source Agent Project<br /><code>project:read</code><br /><code>project:read_datasets</code></td><td>SQL trace queries, trace import, and listing or fetching hosted Datasets.</td></tr>
      <tr><td><strong>Write API key</strong><code>logfire_write_key</code></td><td>Valcore Project<br /><code>project:read_datasets</code><br /><code>project:write_datasets</code></td><td>Publishing local Datasets to Logfire&apos;s hosted Dataset store.</td></tr>
    </tbody></table></div><p>The tracing token does not query traces or publish Datasets. The API keys do not enable tracing. Keeping these duties separate gives each integration only the access it needs.</p><p>When both API keys target the same project, configure them together:</p><Code>{`valcore config set-logfire-key`}</Code>
      <Note title="Four credentials, four jobs">The Gateway key authorizes hosted model requests. The tracing token sends telemetry. The read key retrieves traces and hosted Datasets. The write key publishes hosted Datasets. Configure only the touchpoints your workflow uses.</Note>
    </section>

    <section id="evaluators"><h2>Agent Evaluator touchpoints</h2><p>The <strong>tracing token</strong> connects the evaluation runtime to the Valcore Project. Valcore configures its Logfire service as <code>valcore</code> and instruments Pydantic AI globally.</p><div className="touchpoint-grid">
      <article><h3>Agent Evaluator execution</h3><p>Inspect the model request, structured response, timing, errors, and any Pydantic AI tool or capability activity emitted by a Gateway-backed Agent Evaluator.</p></article>
      <article><h3>Generation and refinement</h3><p>Dataset generation, Agent Evaluator generation, and plain-language refinement use the same Pydantic AI instrumentation.</p></article>
      <article><h3>Run hierarchy</h3><p>Each normal run emits a <code>valcore.run</code> parent span and one <code>valcore.score_row</code> child per Dataset row, with Agent Evaluator, version, Dataset, and concurrency context.</p></article>
    </div><Note title="Local model boundary">A local Claude, Codex, or Cursor route still participates in Valcore&apos;s run and row tracing. The coding CLI is a separate process, so its private internal tool activity is not represented as Pydantic AI child spans.</Note></section>

    <section id="datasets"><h2>Dataset touchpoints</h2><h3>Build a Dataset from trace SQL</h3><p>The <strong>read API key</strong> powers <strong>Datasets → New dataset → Logfire query</strong>. Write SQL against the Source Agent Project, choose how many top-level trace trees to sample, map columns to the Dataset contract, and optionally identify a result column to use as the label.</p><Code>{`valcore logfire pull \
  --sql-file support-cases.sql \
  --name support-cases \
  --count 100`}</Code><p>Queries default to the last 24 hours and can cover at most 14 days. Child spans can be nested into a <code>children</code> JSON field. Valcore saves the SQL and pull settings as Dataset provenance.</p>
      <Note title="Capturing new matches">Run the saved query again with a later time window to capture new matching entries. Today, that pull creates a new local Dataset rather than mutating the original, preserving the exact evidence used by an existing Experiment Run.</Note>
      <h3>Import or publish hosted Datasets</h3><p>The read key lists and fetches Datasets hosted in the Source Agent Project. The write key publishes a local Dataset to the Valcore Project.</p><Code>{`# Read from the Source Agent Project
valcore logfire list
valcore logfire fetch support-golden-set

# Publish to the Valcore Project
valcore logfire push support-golden-set`}</Code><p>In the interface, use the corresponding <strong>Import from Logfire</strong> and <strong>Push to Logfire</strong> actions. Pushing does not require the tracing token; importing does not require the write key.</p>
    </section>

    <section id="experiments"><h2>Experiment Run touchpoints</h2><p>The <strong>tracing token</strong> is the only Logfire credential required to sync an Experiment Run. In <strong>Runs → New run</strong>, select the Dataset and Agent Evaluator, choose either <strong>Eval</strong> or <strong>Validation</strong>, and enable <strong>Run as a Logfire experiment</strong>.</p><p>Valcore executes either kind through <code>pydantic_evals.Dataset.evaluate</code>. Both appear in Logfire&apos;s Evals view with experiment, case, task, and evaluator spans, plus inputs, actual judgments, durations, and traces. A Validation run additionally sends confirmed labels as expected outputs and calculates agreement statistics; an Eval run does neither.</p><p>The CLI shortcut below currently creates a Validation run. Use the interface to create an Eval run with the Logfire experiment engine.</p><Code>{`valcore experiment <agent-evaluator> <dataset>`}</Code><p>Valcore keeps its local run record and statistical results. Logfire-backed Experiment Runs cannot be cancelled or retried row by row; start a new Experiment Run when configuration or individual cases need to change.</p>
      <Note title="Validation needs ground truth">Every Dataset row must have a confirmed label before Valcore enables a Validation run. An Eval run accepts labeled or unlabeled rows but does not produce agreement statistics.</Note>
    </section>

    <section id="verify"><h2>Verify the integration</h2><ol className="docs-steps">
      <li>Run <code>valcore config get</code> and confirm the required credential is reported as configured.</li>
      <li>Start <code>valcore serve</code>, open Settings, and check the Logfire status cards. Stored secrets stay masked.</li>
      <li>Run a small labeled Dataset with <strong>Run as a Logfire experiment</strong> enabled.</li>
      <li>Follow the Logfire link from the completed Experiment Run and confirm the experiment and case traces appear in the Valcore Project.</li>
      <li>For Dataset access, run <code>valcore logfire list</code> or preview a trace query to confirm the read key points to the intended Source Agent Project.</li>
    </ol><p>If Valcore cannot resolve a Logfire project link from an API key, configure a fallback SQL Workbench URL:</p><Code>{`valcore config set-logfire-explore-url \
  https://logfire.pydantic.dev/<organization>/<project>/explore`}</Code><p>For Logfire&apos;s credential UI and native concepts, see the official guides for <a href="https://logfire.pydantic.dev/docs/how-to-guides/create-write-tokens/" target="_blank" rel="noreferrer">write tokens</a>, <a href="https://logfire.pydantic.dev/docs/evaluate/datasets/sdk/" target="_blank" rel="noreferrer">hosted Dataset API keys</a>, and <a href="https://logfire.pydantic.dev/docs/guides/web-ui/evals/" target="_blank" rel="noreferrer">Pydantic Evals</a>.</p></section>
  </>;
}
