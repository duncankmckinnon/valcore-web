import { Code, Note, PageIntro } from "./ui";
import type { DocSlug } from "@/lib/docs";

function Installation() {
  return <>
    <PageIntro eyebrow="Set up" title="Installation">Choose the package manager that fits your workflow. Homebrew and uv install Valcore as an isolated command-line tool.</PageIntro>
    <section id="homebrew"><h2>Homebrew install</h2><p>Recommended on macOS. The tap provides the <code>valcore</code> command and keeps upgrades simple.</p><Code>{`brew install duncankmckinnon/tap/valcore\nvalcore --help`}</Code></section>
    <section id="uv"><h2>uv tool install</h2><p>Use uv to install Valcore in an isolated environment without adding it to a project&apos;s dependencies.</p><Code>{`uv tool install valcore\nvalcore --help`}</Code><p>To send Valcore&apos;s own traces to Logfire, install the optional integration:</p><Code>{`uv tool install 'valcore[logfire]'`}</Code></section>
    <section id="pip"><h2>pip install</h2><p>Install with pip when you manage Python tools in a dedicated virtual environment.</p><Code>{`python -m venv .venv\nsource .venv/bin/activate\npip install valcore\nvalcore --help`}</Code><Note>Avoid installing command-line tools into your system Python. Homebrew or <code>uv tool</code> usually gives you a cleaner upgrade path.</Note></section>
    <section><h2>Launch the workbench</h2><Code>{`valcore serve`}</Code><p>This starts Valcore locally and opens the visual workbench. Your workspace is stored locally and shared with the CLI.</p></section>
  </>;
}

function GettingStarted() {
  return <>
    <PageIntro eyebrow="First run" title="Getting started">Launch the local workbench, connect Valcore to the Gateway and Logfire, then give your coding agent the Valcore skill.</PageIntro>
    <section id="launch"><h2>Launch Valcore</h2><p>Start here after installing Valcore:</p><Code>{`valcore serve`}</Code><p>Valcore starts at <code>http://127.0.0.1:8000</code> and opens the visual workbench in your browser. The UI and CLI share the same local SQLite workspace, so anything you create in one is available in the other.</p><p>To use another port or start without opening a browser:</p><Code>{`valcore serve --port 8080\nvalcore serve --no-browser`}</Code><Note title="Your first stop in the UI">Open <strong>Settings</strong> before creating an evaluator. Valcore will show which credentials are configured and which workflows each one unlocks.</Note></section>
    <section id="keys"><h2>Configuring keys</h2><p>Open Settings in the workbench or use the CLI. Valcore stores credentials in <code>~/.valcore/config.toml</code> with restricted file permissions and masks them in the UI.</p>
      <h3>Valcore project keys</h3>
      <div className="key-grid">
        <article><h4>Gateway key</h4><p>Required to run or generate with models. Create it in Pydantic AI Gateway, then configure it:</p><Code>{`valcore config set-key`}</Code></article>
        <article><h4>Tracing key</h4><p>Optional Logfire write token for Valcore&apos;s FastAPI, Gateway, and run spans.</p><Code>{`valcore config set-logfire-token`}</Code></article>
        <article><h4>Write datasets key</h4><p>Pushes curated datasets to the Valcore Logfire project. Grant <code>project:read_datasets</code> and <code>project:write_datasets</code>.</p><Code>{`valcore config set-logfire-write-key`}</Code></article>
      </div>
      <h3>Agent project keys</h3><p>The read key belongs to the Logfire project where your agent runs. Grant <code>project:read</code> and <code>project:read_datasets</code> so Valcore can query traces and fetch hosted datasets.</p><Code>{`valcore config set-logfire-read-key`}</Code>
      <Note title="Keep the projects distinct">The agent project is the source of production traces and datasets. The Valcore project receives workbench telemetry and published datasets. Using separate scoped keys makes that boundary explicit.</Note>
    </section>
    <section id="local-agent"><h2>Local agent</h2><h3>Using the CLI agent in Valcore</h3><p>Install Valcore&apos;s bundled skill in the repository where your coding agent works:</p><Code>{`cd your-agent-project\nvalcore skills install`}</Code><p>The default installs to <code>.agents/skills/</code>. Use <code>--claude</code>, <code>--copilot</code>, <code>--all</code>, or <code>--global</code> when you need a different destination.</p><p>The app and CLI use the same local SQLite workspace, so no Valcore server needs to be running for agent-driven CLI work. Resources can be addressed by name or a unique ID prefix.</p><Code>{`valcore datasets list\nvalcore evaluators list\nvalcore runs list`}</Code></section>
  </>;
}

function Datasets() {
  return <>
    <PageIntro eyebrow="Test cases" title="Datasets">Build representative inputs, add trustworthy labels, and move curated test sets between Valcore and Logfire.</PageIntro>
    <section id="adding"><h2>Adding datasets</h2><p>Start from a blank table, upload existing examples, query real traces, sync a hosted dataset, or generate synthetic cases.</p>
      <h3>Blank entries</h3><p>Create a dataset, define its columns, and add rows directly in the table. This is useful for a small golden set or edge cases you want to write by hand.</p>
      <h3>CSV or JSON upload</h3><p>Upload CSV, JSONL, or a Valcore eval-package JSON file. Valcore infers data columns and previews the result before creation. Keep one case per CSV row or JSONL object.</p>
      <h3>Logfire traces query</h3><p>Run SQL against the configured agent project and import the result as cases. When matching child spans exist, Valcore preserves them in a <code>children</code> JSON column for richer evaluation context.</p>
      <h3>Logfire dataset syncing</h3><p>Fetch a hosted dataset from the agent project into your local workspace:</p><Code>{`valcore logfire fetch <dataset-name>`}</Code>
      <h3>Generating synthetic datasets</h3><h4>Creating a dataset from specs</h4><p>Describe the behavior to test, choose the exact columns, and add per-column notes. You can request suggested labels and, for categorical schemas, opt into a target label mix. Review the editable draft before saving.</p><Note title="Suggestions are not ground truth">Generated labels are stored as suggestions. Accept or correct them during human labeling before using the dataset for validation.</Note>
      <h4>Creating datasets from evaluators</h4><p>Generate cases from an evaluator version to guarantee the columns it requires. Add optional context columns and suggested labels when useful. Generation settings and provenance are saved, so you can extend the dataset consistently later.</p>
    </section>
    <section id="labeling"><h2>Labeling datasets</h2><p>Evaluation runs can use unlabeled data. Validation runs require every row to have a ground-truth label compatible with the evaluator.</p>
      <h3>Numeric labels</h3><p>Enter a score within the dataset&apos;s configured minimum and maximum. Validation summarizes error with metrics such as MAE and RMSE.</p>
      <h3>Categorical labels</h3><p>Choose one of the fixed labels defined by the dataset. The labeling view supports keyboard-first review, including number shortcuts, accept suggestion, clear, and next/previous navigation.</p>
    </section>
    <section id="writing"><h2>Writing datasets</h2><h3>Sync to the Logfire Valcore project</h3><p>Once the cases and labels are ready, publish the dataset with the scoped write key:</p><Code>{`valcore logfire push <dataset-name-or-id>`}</Code><p>The local dataset remains the editable source; the Logfire copy makes the curated set available to your wider evaluation workflow.</p></section>
  </>;
}

function Evaluators() {
  return <>
    <PageIntro eyebrow="Agent judges" title="Evaluators">Turn evaluation criteria into repeatable agent judges with explicit inputs, score contracts, harness capabilities, and immutable run history.</PageIntro>
    <section id="creating"><h2>Creating evaluators</h2><h3>Manual creation</h3><p>Each evaluator runs as an agent judge. Name it, write the judging prompt, choose a Gateway model, and list every required dataset column. Ask the agent judge to explain its reasoning before returning a score.</p>
      <h4>Numeric labels</h4><p>Use a bounded numeric score for graded qualities. Set the minimum and maximum explicitly and explain what the ends—and useful points between them—mean.</p>
      <h4>Categorical labels</h4><p>Use a small fixed label set for clear decisions. Define every label in the prompt; three to five well-separated categories is often easier to validate than a large ambiguous set.</p>
      <h3>Generating evaluators</h3><h4>From prompts and data contracts</h4><p>Provide the task, required columns, column notes, and score schema. Valcore generates an editable evaluator draft that conforms to those inputs.</p>
      <h4>From existing datasets</h4><p>Seed generation from a dataset to inherit its columns and label schema. Review the draft prompt carefully before creating the first version.</p>
    </section>
    <section id="versioning"><h2>Versioning evaluators</h2><p>Versions are active while being edited and become frozen once used by a run. Editing a frozen version creates a copy, preserving the exact judge configuration behind historical results.</p><p>Before a run, Valcore checks that evaluator columns are a subset of dataset columns, label kinds match, and categorical label sets match exactly.</p></section>
    <section id="capabilities"><h2>Evaluation harness capabilities</h2><p>Every evaluator runs as an agent judge inside the Pydantic AI harness. Capabilities give that agent more ways to investigate a case than reading the dataset row alone, and are opt-in per evaluator version.</p>
      <h3>Configure capabilities in the UI</h3>
      <ol className="docs-steps"><li>Open <strong>Evaluators</strong> and select the evaluator you want to edit.</li><li>Open an editable version—or create a new version if the current one is frozen.</li><li>Expand <strong>Capabilities &amp; tools</strong> near the bottom of the version editor.</li><li>Enable only the capabilities the agent judge needs, configure any revealed settings, and save the version.</li></ol>
      <div className="capability-cards">
        <article><h4>CodeMode</h4><p>Lets the agent judge solve multi-step work in a code-driven execution loop.</p></article>
        <article><h4>SubAgents</h4><p>Lets the agent judge delegate bounded parts of a complex evaluation to sub-agents.</p></article>
        <article><h4>Planning</h4><p>Gives the agent judge a structured planning workflow for longer evaluation tasks.</p></article>
        <article><h4>FileSystem</h4><p>Lets the agent judge read from a rooted directory. After enabling it, set the <strong>root dir</strong> shown in the UI.</p></article>
        <article><h4>Shell</h4><p>Lets the agent judge run commands from an explicit allow-list. Configure comma-separated <strong>allowed commands</strong> and a default timeout.</p></article>
      </div>
      <Note title="Treat capabilities as part of the contract">A capability changes what the agent judge can see and how it can reach an answer. Grant the narrowest access that answers the evaluation question. The saved capability configuration is versioned with the prompt and model.</Note>
      <h3>CLI reference</h3><p>Capability authoring happens in the UI. Once saved, the CLI uses the same versioned configuration automatically when you run or export the evaluator.</p><Code>{`# Find the evaluator and its active version\nvalcore list evaluators\n\n# Run it with its saved capabilities\nvalcore run <evaluator> <dataset> --watch\n\n# Export a specific version as runnable Python\nvalcore export <evaluator> --version <version> -o evaluator.py\n\n# Move a complete evaluator package between workspaces\nvalcore export <evaluator> --format json -o evaluator.json\nvalcore import evaluator.json`}</Code><p>Names and unique ID prefixes are accepted anywhere an evaluator, version, or dataset is requested.</p>
    </section>
  </>;
}

function Experiments() {
  return <>
    <PageIntro eyebrow="Measure" title="Experiments">Use validation to measure agreement with human labels, evaluation to score new data, and comparisons to see what changed.</PageIntro>
    <section id="validation"><h2>Validation runs</h2><p>A validation run compares evaluator scores with a fully labeled dataset. Use it while developing an agent judge or as a release gate.</p>
      <h3>Interpreting results</h3><p>Categorical runs report agreement accuracy and a confusion matrix, which reveals which labels the agent judge mixes up. Numeric runs report error metrics such as MAE and RMSE; lower is better.</p>
      <h3>Synced to Logfire</h3><p>Run the experiment command to evaluate through <code>pydantic_evals.Dataset.evaluate</code>. The experiment and its spans appear in the configured Logfire project.</p><Code>{`valcore experiment <evaluator> <dataset>`}</Code>
      <h3>Thresholds API</h3><p>For categorical validation, turn minimum accuracy into a CI gate. Valcore exits with status 2 when the result misses the threshold.</p><Code>{`valcore run <evaluator> <dataset> \\\n  --kind validation \\\n  --min-accuracy 0.90`}</Code><p>Use <code>--json</code> when another tool needs the structured run result. Accuracy thresholds do not apply to numeric labels.</p>
    </section>
    <section id="evaluation"><h2>Evaluation runs</h2><p>Evaluation runs record agent judge outputs without comparing them to ground truth, so labels are optional. Use them to score fresh cases, inspect reasoning, and find examples that should join a labeled validation set.</p><h3>Interpreting results</h3><p>Review the output, score, reasoning, usage, and any errors row by row. An evaluation score is a measurement from the configured agent judge—not a human-verified answer.</p></section>
    <section id="comparisons"><h2>Comparisons</h2><p>Compare runs made against the same dataset to understand the effect of a prompt, model, version, or capability change. Keep the dataset fixed so the difference remains meaningful, then inspect both aggregate metrics and individual disagreements.</p></section>
  </>;
}

const content: Record<DocSlug, () => React.JSX.Element> = {
  installation: Installation,
  "getting-started": GettingStarted,
  datasets: Datasets,
  evaluators: Evaluators,
  experiments: Experiments,
};

export function DocContent({ slug }: { slug: DocSlug }) {
  const Content = content[slug];
  return <Content />;
}
