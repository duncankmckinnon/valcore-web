import { Code, Note, PageIntro } from "./ui";
import type { DocSlug } from "@/lib/docs";
import { DatasetPanelVisual, EvaluatorPanelVisual, RunsPanelVisual } from "./panel-visuals";

function Installation() {
  return <>
    <PageIntro eyebrow="Set up" title="Installation">Choose the package manager that fits your workflow. Homebrew and uv install Valcore as an isolated command-line tool.</PageIntro>
    <section id="requirements"><h2>Requirements</h2><p>Valcore supports Python 3.11 or newer. The visual workbench is bundled with the Python package, so a separate Node.js installation is not required to use it.</p><p>Model-backed generation and runs require a Pydantic AI Gateway key. Logfire support is optional and can be added independently.</p></section>
    <section id="homebrew"><h2>Homebrew install</h2><p>Recommended on macOS. The tap provides the <code>valcore</code> command and keeps upgrades simple.</p><Code>{`brew install duncankmckinnon/tap/valcore\nvalcore --help`}</Code></section>
    <section id="uv"><h2>uv tool install</h2><p>Use uv to install Valcore in an isolated environment without adding it to a project&apos;s dependencies.</p><Code>{`uv tool install valcore\nvalcore --help`}</Code><p>To send Valcore&apos;s own traces to Logfire, install the optional integration:</p><Code>{`uv tool install 'valcore[logfire]'`}</Code></section>
    <section id="pip"><h2>pip install</h2><p>Install with pip when you manage Python tools in a dedicated virtual environment.</p><Code>{`python -m venv .venv\nsource .venv/bin/activate\npip install valcore\nvalcore --help`}</Code><Note>Avoid installing command-line tools into your system Python. Homebrew or <code>uv tool</code> usually gives you a cleaner upgrade path.</Note></section>
    <section id="upgrading"><h2>Upgrading</h2><Code>{`# Homebrew
brew update && brew upgrade valcore

# uv tool
uv tool upgrade valcore

# pip, inside the environment where Valcore is installed
python -m pip install --upgrade valcore`}</Code><p>Upgrading the package does not replace the local workspace under <code>~/.valcore</code>. Valcore applies compatible database migrations when it opens the workspace.</p></section>
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
    <section id="local-agent"><h2>Local agent</h2><h3>Using the CLI agent in Valcore</h3><p>Install Valcore&apos;s bundled skill in the repository where your coding agent works:</p><Code>{`cd your-agent-project\nvalcore skills install`}</Code><p>The default installs to <code>.agents/skills/</code>. Use <code>--claude</code>, <code>--copilot</code>, <code>--all</code>, or <code>--global</code> when you need a different destination.</p><h3>Download without installing Valcore</h3><p>You can also download the current skill package directly, unzip it, and place the <code>use-valcore</code> folder under your agent&apos;s skills directory.</p><p><a className="docs-download" href="/downloads/valcore-skills.zip" download>Download Valcore skills (.zip) <span aria-hidden="true">↓</span></a></p><Note title="Choose one installation path">The CLI installer is best when Valcore is already installed because it handles Codex, Claude, Copilot, global targets, updates, and symlinks. The ZIP is a portable setup path for reviewing or installing the skill manually.</Note><p>The app and CLI use the same local SQLite workspace, so no Valcore server needs to be running for agent-driven CLI work. Resources can be addressed by name or a unique ID prefix.</p><Code>{`valcore list evaluators\nvalcore list datasets\nvalcore list runs`}</Code><p>Continue with the <a href="/docs/cli">CLI &amp; automation reference</a> for commands, portable packages, and CI.</p></section>
  </>;
}

function Configuration() {
  return <>
    <PageIntro eyebrow="Runtime" title="Configuration">Understand which credentials unlock each workflow, how model names are resolved, and where local configuration is stored.</PageIntro>
    <section id="credentials"><h2>Credentials</h2><p>Open <strong>Settings</strong> in the workbench to set or replace credentials. The same values can be written from the CLI. Only the Gateway key is required for core model-backed work; Logfire credentials are optional and scoped by purpose.</p><div className="key-grid">
      <article><h4>Gateway API key</h4><p>Runs evaluators and generates evaluator or dataset drafts.</p><Code>{`valcore config set-key`}</Code></article>
      <article><h4>Logfire tracing token</h4><p>Sends Valcore&apos;s API, run, row, and agent traces to the Valcore project.</p><Code>{`valcore config set-logfire-token`}</Code></article>
      <article><h4>Logfire read key</h4><p>Queries traces and fetches hosted datasets from the source agent project. It needs <code>project:read</code> and <code>project:read_datasets</code>.</p><Code>{`valcore config set-logfire-read-key`}</Code></article>
      <article><h4>Logfire write key</h4><p>Publishes curated datasets to the Valcore project. It needs <code>project:read_datasets</code> and <code>project:write_datasets</code>.</p><Code>{`valcore config set-logfire-write-key`}</Code></article>
    </div><Note title="Manual work remains available">Without a Gateway key you can still author evaluators by hand, upload or edit datasets, label rows, and export resources. Generation and runs are disabled with an explanation.</Note></section>

    <section id="models"><h2>Models and Gateway</h2><p>Valcore routes model traffic through the Pydantic AI Gateway. Model strings use <code>gateway/&lt;provider&gt;:&lt;model&gt;</code>; bare provider model names are rejected before a request is made.</p><Code>{`gateway/anthropic:claude-sonnet-5
gateway/openai:gpt-5
gateway/google:gemini-2.5-pro`}</Code><p>Supported Gateway routes are <code>anthropic</code>, <code>openai</code>, <code>google</code>, <code>google-cloud</code>, <code>bedrock</code>, and <code>groq</code>. Suggestions in the editor come from the version of <code>pydantic-ai</code> installed with Valcore, but any well-formed Gateway model string can be entered.</p><Note title="No direct provider keys">Valcore currently has no direct-to-provider client or OpenAI-compatible endpoint setting. The Gateway is the single model access path.</Note></section>

    <section id="precedence"><h2>Defaults and precedence</h2><p>Runtime settings resolve from highest to lowest priority: an explicit command or API argument, a <code>VALCORE_*</code> environment variable, <code>config.toml</code>, then the built-in default.</p><div className="decision-grid"><article><h3>Model</h3><p><code>VALCORE_DEFAULT_MODEL</code>, config key <code>model</code>, then <code>gateway/anthropic:claude-sonnet-5</code>.</p></article><article><h3>Concurrency</h3><p><code>VALCORE_DEFAULT_CONCURRENCY</code>, config key <code>concurrency</code>, then <code>8</code>.</p></article><article><h3>Database</h3><p><code>--db</code>, <code>VALCORE_DB_PATH</code>, config key <code>db_path</code>, then the workspace database.</p></article></div><p>An exported <code>PYDANTIC_AI_GATEWAY_API_KEY</code> or <code>LOGFIRE_TOKEN</code> takes precedence over its stored value. Logfire read and write API keys are read from the config file rather than exported to the environment.</p></section>

    <section id="logfire"><h2>Logfire project boundary</h2><p>Most teams should use two projects. The <strong>source agent project</strong> contains production traces and any hosted datasets you want to sample; the read key points there. The <strong>Valcore project</strong> receives workbench telemetry, Logfire experiments, and published datasets; the tracing token and write key point there.</p><p>If both roles genuinely use one project, <code>valcore config set-logfire-key</code> stores one API key as both read and write. Otherwise, keep the scopes separate.</p><p>Valcore normally resolves Logfire links from the API key. Configure a fallback SQL Workbench URL only when project lookup is unavailable:</p><Code>{`valcore config set-logfire-explore-url \
  https://logfire-us.pydantic.dev/org/project/explore`}</Code></section>

    <section id="storage"><h2>Storage and security</h2><p>Configuration is stored at <code>~/.valcore/config.toml</code> with mode <code>0600</code>. Settings masks stored credentials, and <code>valcore config get</code> reports Logfire credentials only as present or absent. The Gateway key is also masked unless <code>--show-key</code> is explicitly supplied.</p><Code>{`valcore config get
valcore config get --json
valcore config path
valcore config edit`}</Code><p>Valcore warns if the config file is group- or world-readable. See <a href="/docs/cli#workspace">CLI &amp; automation</a> for relocating the workspace or choosing another database.</p></section>
  </>;
}

function Datasets() {
  return <>
    <PageIntro eyebrow="Test cases" title="Datasets">Build representative inputs, add trustworthy labels, and move curated test sets between Valcore and Logfire.</PageIntro>
    <section id="dataset-panel"><h2>Dataset panel tour</h2><p>The Datasets panel is both a catalog and a readiness check. The list shows how much evaluation material exists and whether it is labeled enough for validation; opening a dataset switches to the row-level authoring and labeling surface.</p><DatasetPanelVisual />
      <ol className="docs-steps"><li><strong>Use the summary before opening anything.</strong> Dataset count and total rows show coverage; the labeled percentage tells you how close the workspace is to supporting validation.</li><li><strong>Choose the creation path that matches your source.</strong> Blank is for hand-authored cases, Upload accepts CSV/JSON, Generate creates synthetic cases, and Logfire imports hosted datasets or queried traces.</li><li><strong>Read labeled status as a run constraint.</strong> “Complete” means every row has ground truth and can be used for validation. Partially labeled datasets remain usable for ordinary evaluation runs.</li><li><strong>Work row by row in the detail view.</strong> Edit case fields inline, apply or correct labels, accept suggestions deliberately, add rows, and delete cases that do not belong.</li></ol>
      <p>Above the labeling grid, the detail panel also shows total/labeled/unlabeled counts and label distribution. Generated and Logfire-sourced datasets retain collapsible provenance panels so you can see the instructions or SQL that created them.</p>
    </section>
    <section id="adding"><h2>Adding datasets</h2><p>Start from a blank table, upload existing examples, query real traces, sync a hosted dataset, or generate synthetic cases.</p>
      <h3>Blank entries</h3><p>Select <strong>New dataset → Blank</strong>, enter a name, add the columns the agent judge will receive, and optionally define a label schema. After creation, use <strong>Add row</strong> in the grid and edit each cell inline. This is the most direct route for a small golden set or a handful of deliberate edge cases.</p>
      <h3>CSV or JSON upload</h3><p>Select <strong>New dataset → Upload</strong>. Valcore accepts CSV, JSONL, or a Valcore eval-package JSON file, infers the data columns, and previews the result before creation. Keep one case per CSV row or JSONL object. If labels are present, identify the label column and provide the matching categorical or numeric schema.</p><Note title="Inspect inferred columns">Upload is intentionally a preview-first flow. Check that identifiers, metadata, and labels were not accidentally inferred as evaluator inputs before creating the dataset.</Note>
      <h3>Logfire traces query</h3><p>Select <strong>New dataset → Logfire</strong> and use the query mode to run SQL against the configured agent project. Choose a sample size, seed, time bounds, and optional label column. When matching child spans exist, Valcore preserves them in a <code>children</code> JSON column for richer evaluation context.</p>
      <h3>Logfire dataset syncing</h3><p>The same Logfire tab can fetch a named hosted dataset from the agent project. From the CLI:</p><Code>{`valcore logfire fetch <dataset-name>`}</Code>
      <h3>Generating synthetic datasets</h3><h4>Creating a dataset from specs</h4><p>Describe the behavior to test, choose the exact columns, and add per-column notes. You can request suggested labels and, for categorical schemas, opt into a target label mix. Review the editable draft before saving.</p><Note title="Suggestions are not ground truth">Generated labels are stored as suggestions. Accept or correct them during human labeling before using the dataset for validation.</Note>
      <h4>Creating datasets from evaluators</h4><p>From an evaluator version, select <strong>Generate dataset</strong>. Valcore locks in the version&apos;s required columns so the resulting cases are compatible, while still allowing optional context columns and suggested labels. Generation settings and evaluator-version provenance are saved, so <strong>Generate more rows</strong> can extend the dataset consistently later.</p>
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
    <section id="evaluator-panel"><h2>Evaluator panel tour</h2><p>The Evaluators list is the catalog of reusable agent judges. Open one to work on its versions; each version is a complete, attributable runtime configuration rather than only a prompt.</p><EvaluatorPanelVisual />
      <ol className="docs-steps"><li><strong>Start with the version bar.</strong> It identifies the selected version, whether it is active, and whether a completed run has frozen it. Use <strong>New version</strong> to branch safely.</li><li><strong>Define the judgment and its inputs.</strong> Instructions describe the standard; the prompt template inserts row values with braces such as <code>{`{answer}`}</code>. Every placeholder must appear in Required columns.</li><li><strong>Make the output machine-checkable.</strong> Add structured output fields, choose categorical or numeric scoring, then select which compatible field is the score.</li><li><strong>Expand capabilities only when needed.</strong> Capabilities and tools are collapsed by default because they widen what the agent judge can do. Their configuration is saved with the version.</li></ol>
      <p>The action bar connects this object to the rest of the workflow: <strong>Generate dataset</strong> creates compatible cases, <strong>Run</strong> moves to the run launcher, and <strong>Export</strong> produces runnable Python or a portable JSON package.</p>
    </section>
    <section id="creating"><h2>Creating evaluators</h2><h3>Manual creation</h3><p>Each evaluator runs as an agent judge. Name it, write the judging prompt, choose a Gateway model, and list every required dataset column. Ask the agent judge to explain its reasoning before returning a score.</p>
      <p>Select <strong>New evaluator → From scratch</strong> to create the container, then complete the first version editor from top to bottom: Identity, Judgment, Inputs, Output contract, and—only when needed—Capabilities &amp; tools. Valcore validates the draft continuously and the footer names the next field blocking Save.</p>
      <h4>Numeric labels</h4><p>Use a bounded numeric score for graded qualities. Set the minimum and maximum explicitly and explain what the ends—and useful points between them—mean.</p>
      <h4>Categorical labels</h4><p>Use a small fixed label set for clear decisions. Define every label in the prompt; three to five well-separated categories is often easier to validate than a large ambiguous set.</p>
      <h3>Generating evaluators</h3><h4>From prompts and data contracts</h4><p>Provide the task, required columns, column notes, and score schema. Valcore generates an editable evaluator draft that conforms to those inputs.</p>
      <h4>From existing datasets</h4><p>Seed generation from a dataset to inherit its columns and label schema. Review the draft prompt carefully before creating the first version.</p>
    </section>
    <section id="versioning"><h2>Versioning evaluators</h2><p>The active version is used whenever a run does not name another. A version becomes frozen after it is used by a run, preserving the prompt, model, output contract, tools, and capabilities behind that result.</p><p>To iterate, select the frozen version and choose <strong>New version</strong>. The editor begins with a copy of the selected configuration, so you can make one deliberate change and compare it against the original. The version diff shows the exact configuration changes rather than relying on names or timestamps.</p><p>Before a run, Valcore checks that evaluator columns are a subset of dataset columns, label kinds match, and categorical label sets match exactly.</p></section>
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
    <PageIntro eyebrow="Measure" title="Runs & experiments">Use validation to measure agreement with human labels, evaluation to score new data, and comparisons to see what changed.</PageIntro>
    <section id="runs-panel"><h2>Runs panel tour</h2><p>The Runs panel is the execution history for every evaluator-version and dataset pairing. The list surfaces kind, status, headline metric, and start time; opening a run reveals progress or the completed metrics and row-level evidence.</p><RunsPanelVisual />
      <ol className="docs-steps"><li><strong>Bind exact inputs.</strong> A run records one evaluator version and one dataset. That immutable pairing makes results attributable later.</li><li><strong>Choose engine behavior deliberately.</strong> Run kind controls whether labels are compared; the Logfire experiment checkbox changes the execution engine and sync destination, not the kind.</li><li><strong>Read the headline before drilling down.</strong> Categorical validation starts with Accuracy and Cohen&apos;s κ; numeric validation starts with MAE, RMSE, and correlations.</li><li><strong>Inspect the evidence.</strong> Filter to disagreements or errors, compare score with label, read structured output, and retry only failed rows when available.</li></ol>
    </section>
    <section id="starting"><h2>Starting a run</h2><p>Select <strong>Runs → New run</strong>, then choose an evaluator. Valcore loads its versions and selects the active one by default. Choose a dataset, run kind, and concurrency between 1 and 64.</p><div className="decision-grid"><article><h3>Eval</h3><p>Scores every row and records agent judge output. Labels are optional and agreement metrics are not required.</p></article><article><h3>Validation</h3><p>Compares every score with human ground truth. The option is disabled when the selected dataset contains any unlabeled rows.</p></article><article><h3>Logfire experiment</h3><p>Runs through <code>pydantic-evals</code> and appears in Logfire&apos;s experiments view. It cannot be cancelled and individual rows cannot be rerun.</p></article></div><Note title="Concurrency changes throughput, not meaning">Begin with the default of 8. Raise it when the model provider and tools can sustain more parallel work; lower it when rate limits or shared resources make results unreliable.</Note></section>
    <section id="validation"><h2>Validation runs</h2><p>A validation run compares evaluator scores with a fully labeled dataset. Use it while developing an agent judge or as a release gate.</p>
      <h3>Interpreting results</h3><p>Categorical runs report Accuracy, Cohen&apos;s κ, sample count, per-label Precision/Recall/F1/Support, and a confusion matrix. Matrix rows are human labels and columns are agent judge scores; off-diagonal cells are the mistakes to investigate.</p><p>Numeric runs report MAE and RMSE, where lower is better, plus Pearson and Spearman correlation. Correlation can be unavailable when either the labels or scores have zero variance.</p>
      <h3>Synced to Logfire</h3><p>Run the experiment command to evaluate through <code>pydantic_evals.Dataset.evaluate</code>. The experiment and its spans appear in the configured Logfire project.</p><Code>{`valcore experiment <evaluator> <dataset>`}</Code>
      <h3>Thresholds API</h3><p>For categorical validation, turn minimum accuracy into a CI gate. Valcore exits with status 2 when the result misses the threshold.</p><Code>{`valcore run <evaluator> <dataset> \\\n  --kind validation \\\n  --min-accuracy 0.90`}</Code><p>Use <code>--json</code> when another tool needs the structured run result. Accuracy thresholds do not apply to numeric labels.</p>
    </section>
    <section id="evaluation"><h2>Evaluation runs</h2><p>Evaluation runs record agent judge outputs without comparing them to ground truth, so labels are optional. Use them to score fresh cases, inspect reasoning, and find examples that should join a labeled validation set.</p><h3>Interpreting results</h3><p>The detail table shows the original row, structured output, score, optional label, and agreement when available. Use <strong>Errors only</strong> to isolate execution failures. A run completed with errors exposes <strong>Retry failed rows</strong>, which preserves successful results and reruns only failures.</p><p>An evaluation score is a measurement from the configured agent judge—not a human-verified answer.</p></section>
    <section id="comparisons"><h2>Comparisons</h2><p>Select <strong>Runs → Compare</strong> and choose Run A and Run B. Valcore requires both runs to use the same dataset so each row has a stable basis for comparison.</p><p>The comparison first shows deltas for shared numeric metrics. Higher is better for agreement metrics; lower is better for MAE and RMSE. The row table places A and B outputs side by side and marks differing scores, with disagreements ordered first so regressions are easy to find.</p><Note title="A useful comparison changes one thing">For the clearest signal, keep the dataset and most evaluator settings fixed. Compare one prompt revision, model change, or capability change at a time.</Note></section>
  </>;
}

function Cli() {
  return <>
    <PageIntro eyebrow="Reference" title="CLI & automation">Use the terminal over the same local workspace as the app, move evaluator packages between environments, and turn validation into a release signal.</PageIntro>
    <section id="mental-model"><h2>App and CLI</h2><p>The visual workbench and the <code>valcore</code> command are two interfaces over the same SQLite workspace. The app is usually fastest for authoring and labeling; the CLI is better for repeatable runs, exports, automation, and agent-driven work.</p><p>The CLI opens the database directly. <code>valcore serve</code> does not need to be running for terminal commands to work.</p><Code>{`# Start the visual workbench
valcore serve

# Address resources by name or a unique ID prefix
valcore run response-quality support-quality --watch`}</Code><Note title="Names resolve safely">If a name or ID prefix matches more than one resource, Valcore lists the candidates instead of choosing one. Add characters until the value is unique.</Note></section>

    <section id="commands"><h2>Command reference</h2><div className="key-grid">
      <article><h4><code>valcore serve</code></h4><p>Starts the API and workbench. Use <code>--host</code>, <code>--port</code>, or <code>--no-browser</code> to control how it launches.</p></article>
      <article><h4><code>valcore list</code></h4><p>Lists <code>evaluators</code>, <code>datasets</code>, or <code>runs</code>. Add <code>--json</code> for structured output.</p></article>
      <article><h4><code>valcore run</code></h4><p>Runs an evaluator version over a dataset. Important options are <code>--version</code>, <code>--kind</code>, <code>--concurrency</code>, <code>--watch</code>, <code>--json</code>, and <code>--min-accuracy</code>.</p></article>
      <article><h4><code>valcore experiment</code></h4><p>Runs a validation through <code>pydantic_evals.Dataset.evaluate</code> and records it in Logfire experiments. It supports <code>--version</code>, <code>--concurrency</code>, and <code>--json</code>, but not watch or cancellation.</p></article>
      <article><h4><code>valcore export</code> / <code>import</code></h4><p>Moves evaluators and datasets as runnable Python or portable JSON eval packages.</p></article>
      <article><h4><code>valcore logfire</code></h4><p><code>pull</code> queries traces, <code>list</code> shows hosted datasets, <code>fetch</code> imports one, and <code>push</code> publishes a local dataset.</p></article>
      <article><h4><code>valcore config</code></h4><p>Sets credentials and defaults, prints the config path, or opens the config in your editor. <code>config get</code> masks stored secrets by default.</p></article>
      <article><h4><code>valcore skills</code></h4><p>Installs, lists, or removes the bundled coding-agent skill. <code>valcore version</code> prints the installed version.</p></article>
    </div><Code>{`valcore list evaluators
valcore list datasets --json
valcore run my-evaluator my-dataset --kind validation --watch
valcore experiment my-evaluator my-dataset
valcore logfire fetch qa-set
valcore version`}</Code></section>

    <section id="packages"><h2>Portable eval packages</h2><p>Evaluator and dataset exports support two formats. Code exports are standalone Python. JSON exports use a <code>pydantic_ai</code> <code>AgentSpec</code> and a <code>pydantic_evals</code> <code>Dataset</code>, with a small Valcore metadata block that preserves the prompt template, required columns, score field, and tool names.</p><Code>{`# Standalone evaluator program
valcore export my-judge -o my-judge.py

# One portable evaluator + dataset bundle
valcore export my-judge --dataset my-data --format json -o package.json

# Separate agent and dataset JSON files
valcore export my-judge --dataset my-data --format json --split -o package.json

# Restore a JSON package to the local workspace
valcore import package.json`}</Code><Note title="Use the Valcore loader for complete behavior">A bare <code>AgentSpec</code> does not include tools, and a dataset bundled with an evaluator references Valcore&apos;s custom judge type. Keep the generated <code>valcore_judge.py</code> companion when running the package outside Valcore.</Note><h3>Running an exported dataset</h3><Code>{`from pydantic_evals import Dataset
from valcore_judge import ValcoreJudge

dataset = Dataset.from_file(
    "my-data.json",
    custom_evaluator_types=[ValcoreJudge],
)
report = dataset.evaluate_sync(task)`}</Code></section>

    <section id="ci"><h2>Using Valcore in CI</h2><p>Use a fully labeled categorical dataset, emit JSON to stdout, and set a minimum accuracy. Progress is written to stderr, so redirecting stdout produces a clean result file.</p><Code>{`valcore run my-evaluator my-dataset \
  --kind validation \
  --min-accuracy 0.90 \
  --json > run.json`}</Code><div className="decision-grid"><article><h3>Exit 0</h3><p>The run completed and met the threshold when one was supplied.</p></article><article><h3>Exit 1</h3><p>The run failed or Valcore reported a domain or configuration error.</p></article><article><h3>Exit 2</h3><p>Categorical accuracy was below <code>--min-accuracy</code>.</p></article></div><Note><code>--min-accuracy</code> requires categorical validation metrics. Numeric or unlabeled runs have no accuracy and fail clearly instead of silently passing.</Note></section>

    <section id="skills"><h2>Agent skills</h2><p>Valcore ships a skill that teaches coding agents its data model, compatibility rules, workflow, and CLI. Install it in the repository the agent works in:</p><Code>{`valcore skills install                    # .agents/skills/
valcore skills install --claude           # .claude/skills/
valcore skills install --copilot          # .github/skills/
valcore skills install --all              # all three
valcore skills install --claude --global  # home-level install`}</Code><p>Destination flags are additive. Existing identical copies are skipped; use <code>--force</code> to replace an edited copy or <code>--symlink</code> to follow upgrades to the packaged skill. Use <code>valcore skills list</code> to inspect installations and <code>valcore skills uninstall</code> to remove them.</p></section>

    <section id="workspace"><h2>Workspace and databases</h2><p>By default, state lives under <code>~/.valcore</code>: the configuration file, SQLite database, and server logs. The directory is created with mode <code>0700</code> and the config file with mode <code>0600</code>.</p><Code>{`~/.valcore/
  config.toml
  valcore.db
  logs/`}</Code><p>Use <code>VALCORE_HOME</code> to relocate the whole workspace, or pass <code>--db</code> before the command group to select another SQLite database for one invocation:</p><Code>{`VALCORE_HOME=./.valcore valcore list runs
valcore --db ./scratch.sqlite list datasets`}</Code><p>See <a href="/docs/configuration">Configuration</a> for credential precedence and the boundary between the source Logfire project and Valcore&apos;s own project.</p></section>
  </>;
}

const content: Record<DocSlug, () => React.JSX.Element> = {
  installation: Installation,
  "getting-started": GettingStarted,
  configuration: Configuration,
  datasets: Datasets,
  evaluators: Evaluators,
  experiments: Experiments,
  cli: Cli,
};

export function DocContent({ slug }: { slug: DocSlug }) {
  const Content = content[slug];
  return <Content />;
}
