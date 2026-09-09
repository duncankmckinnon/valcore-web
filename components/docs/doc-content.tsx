import { Code, Note, PageIntro } from "./ui";
import type { DocSlug } from "@/lib/docs";
import { DatasetPanelVisual, EvaluatorPanelVisual, RunsPanelVisual } from "./panel-visuals";
import { AgentSkillInstall } from "@/components/agent-skill-install";
import { VALCORE_SKILL_SOURCE_URL } from "@/lib/links";
import { GettingStartedDemo } from "./getting-started-demo";
import { LogfireIntegration } from "./logfire-integration";

function Installation() {
  return <>
    <PageIntro eyebrow="Set up" title="Installation">Choose the package manager that fits your workflow. Valcore runs on macOS, Linux, and Windows; Homebrew and uv install it as an isolated command-line tool.</PageIntro>
    <section id="requirements"><h2>Requirements</h2><p>Valcore supports Python 3.11 or newer and is tested natively on Windows as well as Unix systems. The visual workbench is bundled with the Python package, so a separate Node.js installation is not required to use it.</p><p>Model-backed generation and runs need a model route: either a Pydantic AI Gateway key, or an already-installed and logged-in <code>claude</code>, <code>codex</code>, or <code>cursor-agent</code> CLI on your <code>PATH</code>. Logfire support is optional and can be added independently.</p></section>
    <section id="homebrew"><h2>Homebrew install</h2><p>Recommended on macOS and available on Linux. The tap provides the <code>valcore</code> command and keeps upgrades simple.</p><Code>{`brew install duncankmckinnon/tap/valcore\nvalcore --help`}</Code></section>
    <section id="uv"><h2>uv tool install</h2><p>Use uv on macOS, Linux, or Windows to install Valcore in an isolated environment without adding it to a project&apos;s dependencies.</p><Code>{`uv tool install valcore\nvalcore --help`}</Code><p>To send Valcore&apos;s own traces to Logfire, install the optional integration:</p><Code>{`uv tool install 'valcore[logfire]'`}</Code></section>
    <section id="windows"><h2>Windows</h2><p>Run the uv commands above in PowerShell, then launch the same bundled workbench:</p><Code>{`uv tool install valcore\nvalcore serve`}</Code><p>Valcore stores its workspace at <code>$HOME\.valcore</code>, normally <code>C:\Users\&lt;name&gt;\.valcore</code>. Set <code>VALCORE_HOME</code> if you want it elsewhere. Windows protects the workspace through the current user&apos;s filesystem ACLs.</p><Note title="Agent skills on Windows"><code>valcore skills install</code> copies the bundled skill and needs no special privileges. The optional <code>--symlink</code> form may require Developer Mode or an elevated terminal.</Note></section>
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
    <PageIntro eyebrow="First run" title="Getting started">Launch the local workbench, point Valcore at a model—hosted or an already-installed coding CLI—then give your coding agent the Valcore skill.</PageIntro>
    <section id="launch"><h2>Launch Valcore</h2><p>Start here after installing Valcore:</p><Code>{`valcore serve`}</Code><p>Valcore starts at <code>http://127.0.0.1:8000</code> and opens the visual workbench in your browser. The UI and CLI share the same local SQLite workspace, so anything you create in one is available in the other.</p><p>To use another port or start without opening a browser:</p><Code>{`valcore serve --port 8080\nvalcore serve --no-browser`}</Code><Note title="Your first stop in the UI">Open <strong>Settings</strong> before creating an evaluator. Valcore will show which credentials are configured and which workflows each one unlocks.</Note></section>
    <section id="keys"><h2>Configuring keys</h2><p>Open Settings in the workbench or use the CLI. Valcore stores credentials in <code>~/.valcore/config.toml</code> with restricted file permissions and masks them in the UI.</p>
      <h3>Valcore project keys</h3>
      <div className="key-grid">
        <article><h4>Gateway key</h4><p>Required to run or generate with a hosted model. Create it in Pydantic AI Gateway, then configure it. Skip it if you plan to run on a <a href="#choosing-a-model">local CLI</a>.</p><Code>{`valcore config set-key`}</Code></article>
        <article><h4>Tracing key</h4><p>Optional Logfire write token for Valcore&apos;s FastAPI, Gateway, and run spans.</p><Code>{`valcore config set-logfire-token`}</Code></article>
        <article><h4>Write datasets key</h4><p>Pushes curated datasets to the Valcore Logfire project. Grant <code>project:read_datasets</code> and <code>project:write_datasets</code>.</p><Code>{`valcore config set-logfire-write-key`}</Code></article>
      </div>
      <h3>Agent project keys</h3><p>The read key belongs to the Logfire project where your agent runs. Grant <code>project:read</code> and <code>project:read_datasets</code> so Valcore can query traces and fetch hosted datasets.</p><Code>{`valcore config set-logfire-read-key`}</Code>
      <Note title="Keep the projects distinct">The agent project is the source of production traces and datasets. The Valcore project receives workbench telemetry and published datasets. Using separate scoped keys makes that boundary explicit.</Note>
    </section>
    <section id="choosing-a-model"><h2>Choosing a model</h2><p>Every run and every generation call needs a model. Valcore offers two routes, and the choice decides whether you need a credential at all.</p>
      <h3>Gateway models</h3><p>A hosted model reached through the Pydantic AI Gateway, written as <code>gateway/&lt;provider&gt;:&lt;model&gt;</code>. This is the default route and requires the Gateway key above.</p><Code>{`gateway/anthropic:claude-sonnet-5`}</Code>
      <h3>Local CLI models</h3><p>Valcore can instead drive a coding-agent CLI that is already installed and logged in on your machine. No Gateway key, no second subscription—the CLI answers with whichever model it is already configured to use.</p><Code>{`local/claude    # the claude binary (Claude Code)
local/codex     # the codex binary (Codex CLI)
local/cursor    # the cursor-agent binary (Cursor CLI)`}</Code>
      <p>Open <strong>Settings → Model Selection</strong> and pick one from the <strong>Local CLI default</strong> dropdown. It becomes the default for new evaluator versions and generation calls, and the <strong>Default model</strong> card on Overview confirms what actually resolves. Any individual evaluator version can still name a different model.</p>
      <Note title="The fastest way to a first run">If you already use Claude Code, Codex, or Cursor, select it here and you can author, generate, and run an evaluator without configuring a single key. See <a href="/docs/configuration#local-models">Running on a local CLI</a> for what a local model gives up—tools, harness capabilities, and standalone Python export.</Note>
    </section>
    <section id="local-agent"><h2>Agent skill install</h2><p>This is the other half of local work: teaching a coding agent to <em>drive</em> Valcore, which is independent of whether Valcore itself runs on a local CLI model.</p><h3>Using the CLI agent in Valcore</h3><p>Install Valcore&apos;s bundled skill in the repository where your coding agent works:</p><Code>{`cd your-agent-project\nvalcore skills install`}</Code><p>The default installs to <code>.agents/skills/</code>. Use <code>--claude</code>, <code>--copilot</code>, <code>--all</code>, or <code>--global</code> when you need a different destination.</p><h3>Install directly from GitHub</h3><p>Copy the installation prompt and paste it into an agent such as Codex. The prompt points to the exact <code>use-valcore</code> skill directory, asks the agent to use its native skill installer, and verifies the result.</p><AgentSkillInstall /><p><a href={VALCORE_SKILL_SOURCE_URL}>Inspect the skill source on GitHub <span aria-hidden="true">→</span></a></p><Note title="Choose one installation path">The agent prompt works before Valcore is installed. The CLI installer offers explicit destination, update, and symlink controls once the package is available. The ZIP remains available for manual installation or review.</Note><p>The app and CLI use the same local SQLite workspace, so no Valcore server needs to be running for agent-driven CLI work. Resources can be addressed by name or a unique ID prefix.</p><Code>{`valcore list evaluators\nvalcore list datasets\nvalcore list runs`}</Code><p>Continue with the <a href="/docs/cli">CLI &amp; automation reference</a> for commands, portable packages, and CI.</p></section>
  </>;
}

function Configuration() {
  return <>
    <PageIntro eyebrow="Runtime" title="Configuration">Understand which credentials unlock each workflow, how a model string resolves to the Gateway or a local CLI, and where local configuration is stored.</PageIntro>
    <section id="credentials"><h2>Credentials</h2><p>Open <strong>Settings</strong> in the workbench to set or replace credentials. The same values can be written from the CLI. The Gateway key is required for hosted models only—a local CLI model needs no credential at all. Logfire credentials are optional and scoped by purpose.</p><div className="key-grid">
      <article><h4>Gateway API key</h4><p>Runs evaluators and generates evaluator or dataset drafts on a hosted model. Not needed when a <a href="#local-models">local CLI model</a> is selected.</p><Code>{`valcore config set-key`}</Code></article>
      <article><h4>Logfire tracing token</h4><p>Sends Valcore&apos;s API, run, row, and agent traces to the Valcore project.</p><Code>{`valcore config set-logfire-token`}</Code></article>
      <article><h4>Logfire read key</h4><p>Queries traces and fetches hosted datasets from the source agent project. It needs <code>project:read</code> and <code>project:read_datasets</code>.</p><Code>{`valcore config set-logfire-read-key`}</Code></article>
      <article><h4>Logfire write key</h4><p>Publishes curated datasets to the Valcore project. It needs <code>project:read_datasets</code> and <code>project:write_datasets</code>.</p><Code>{`valcore config set-logfire-write-key`}</Code></article>
    </div><Note title="Manual work remains available">Without a Gateway key you can still author evaluators by hand, upload or edit datasets, label rows, and export resources. Generation and runs against a <em>hosted</em> model are disabled with an explanation—selecting a local CLI model in Settings re-enables both without a key.</Note></section>

    <section id="models"><h2>Models and routes</h2><p>A model string names one of two routes. <strong>Gateway</strong> routes reach a hosted model through the Pydantic AI Gateway and need a Gateway key. <strong>Local CLI</strong> routes reuse a coding-agent CLI already installed and logged in on this machine, and need no key at all. Anything that matches neither shape is rejected before a request is made.</p>
      <h3>Gateway models</h3><p>Hosted model strings use <code>gateway/&lt;provider&gt;:&lt;model&gt;</code>. A bare provider model name such as <code>claude-sonnet-5</code> fails fast with a configuration error rather than at call time.</p><Code>{`gateway/anthropic:claude-sonnet-5   # the built-in default
gateway/openai:gpt-5
gateway/google:gemini-2.5-pro`}</Code><p>Supported Gateway routes are <code>anthropic</code>, <code>openai</code>, <code>google</code>, <code>google-cloud</code>, <code>bedrock</code>, and <code>groq</code>. Suggestions in the editor come from the version of <code>pydantic-ai</code> installed with Valcore, but any well-formed Gateway model string can be entered.</p>
      <h3>Local CLI models</h3><p>Local model strings name a CLI and nothing else. There is no model name after the CLI: each route shells out to that tool&apos;s own binary, which answers with whichever model it is already configured to use.</p><Code>{`local/claude    # the claude binary (Claude Code)
local/codex     # the codex binary (Codex CLI)
local/cursor    # the cursor-agent binary (Cursor CLI)`}</Code><p>See <a href="#local-models">Running on a local CLI</a> for requirements and the trade-offs against a Gateway model.</p>
      <Note title="No direct provider keys">Valcore has no direct-to-provider client and no OpenAI-compatible endpoint setting. Hosted traffic goes through the Gateway; the local CLI routes are the one way around that, and they borrow an existing CLI login rather than adding a provider credential.</Note></section>

    <section id="local-models"><h2>Running on a local CLI</h2><p>A local CLI route lets Valcore evaluate without a Gateway key by driving a coding-agent CLI you have already installed and authenticated. This is the fastest way to try Valcore, and it keeps model spend on an existing subscription instead of a second credential.</p>
      <h3>Requirements</h3><p>Each route requires that CLI&apos;s binary on your <code>PATH</code> and already logged in. Valcore does not manage the login.</p><div className="key-grid">
        <article><h4><code>local/claude</code></h4><p>Requires the <code>claude</code> binary from Claude Code, already authenticated.</p></article>
        <article><h4><code>local/codex</code></h4><p>Requires the <code>codex</code> binary from the Codex CLI, already authenticated.</p></article>
        <article><h4><code>local/cursor</code></h4><p>Requires the <code>cursor-agent</code> binary from the Cursor CLI, already authenticated.</p></article>
      </div>
      <h3>Selecting one</h3><p>Open <strong>Settings → Model Selection</strong> and pick a CLI from the <strong>Local CLI default</strong> dropdown. Valcore stores it as <code>local_cli_default</code> in <code>~/.valcore/config.toml</code> and it becomes the default model for new evaluator versions and every generation call. Choose <strong>None (use the gateway)</strong> to clear it.</p><p>There is no dedicated <code>config set-</code> command for this. Outside the UI, edit the config file or set the environment variable:</p><Code>{`# Open ~/.valcore/config.toml and add: local_cli_default = "claude"
valcore config edit

# Or override without touching the file, for one shell or a CI job
export VALCORE_DEFAULT_MODEL=local/claude`}</Code><p>The <strong>Default model</strong> card on Overview shows the model that actually resolves, which is not always the stored <code>local_cli_default</code>—<code>VALCORE_DEFAULT_MODEL</code> outranks it. An individual evaluator version can still name a local or Gateway model explicitly, whatever the default is.</p>
      <h3>What a local model gives up</h3><p>A local CLI is a different execution surface from a Gateway model, and Valcore enforces the difference rather than failing at run time.</p><div className="capability-cards">
        <article><h4>No tools</h4><p>An evaluator version that sets registry tools <em>and</em> a local model is rejected when the version is saved. Drop the tools or use a Gateway model.</p></article>
        <article><h4>No harness capabilities</h4><p>CodeMode, SubAgents, Planning, FileSystem, and Shell are not attached for a local model. The CLI brings its own tooling.</p></article>
        <article><h4>No standalone export</h4><p><code>valcore export</code> to Python refuses a local model. A rendered script has no Valcore dependency, so it cannot reach a local CLI.</p></article>
      </div>
      <Note title="Validate the judge on the model you will ship">A local CLI answers with whatever model it is configured to use, which can change under you when the tool updates its default. When a validation number is a release gate, pin an explicit Gateway model on that evaluator version so the result stays attributable.</Note></section>

    <section id="precedence"><h2>Defaults and precedence</h2><p>Runtime settings resolve from highest to lowest priority: an explicit command or API argument, a <code>VALCORE_*</code> environment variable, <code>config.toml</code>, then the built-in default.</p><div className="decision-grid"><article><h3>Model</h3><p><code>VALCORE_DEFAULT_MODEL</code>, config key <code>local_cli_default</code>, config key <code>model</code>, then <code>gateway/anthropic:claude-sonnet-5</code>.</p></article><article><h3>Concurrency</h3><p><code>VALCORE_DEFAULT_CONCURRENCY</code>, config key <code>concurrency</code>, then <code>8</code>.</p></article><article><h3>Database</h3><p><code>--db</code>, <code>VALCORE_DB_PATH</code>, config key <code>db_path</code>, then the workspace database.</p></article></div><p><code>local_cli_default</code> outranks <code>model</code> within <code>config.toml</code>: a CLI selected in <strong>Settings → Model Selection</strong> wins over a stored Gateway model string, and clearing the selection falls back to <code>model</code>. Both are outranked by <code>VALCORE_DEFAULT_MODEL</code>.</p><p>An exported <code>PYDANTIC_AI_GATEWAY_API_KEY</code> or <code>LOGFIRE_TOKEN</code> takes precedence over its stored value. Logfire read and write API keys are read from the config file rather than exported to the environment.</p></section>

    <section id="logfire"><h2>Logfire project boundary</h2><p>Most teams should use two projects. The <strong>source agent project</strong> contains production traces and any hosted Datasets you want to sample; the read key points there. The <strong>Valcore project</strong> receives workbench telemetry, Pydantic Experiment Runs, and published Datasets; the tracing token and write key point there.</p><p>If both roles genuinely use one project, <code>valcore config set-logfire-key</code> stores one API key as both read and write. Otherwise, keep the scopes separate.</p><p>See the <a href="/docs/logfire">Logfire integration guide</a> for credential creation, exact scopes, setup, verification, and every Agent Evaluator, Dataset, and Experiment Run touchpoint.</p></section>

    <section id="storage"><h2>Storage and security</h2><p>Configuration is stored at <code>~/.valcore/config.toml</code>. On macOS and Linux it is written with mode <code>0600</code>; on Windows, access is controlled by the current user&apos;s filesystem ACLs. Settings masks stored credentials, and <code>valcore config get</code> reports Logfire credentials only as present or absent. The Gateway key is also masked unless <code>--show-key</code> is explicitly supplied.</p><Code>{`valcore config get
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
      <h3>Blank entries</h3><p>Select <strong>New dataset → Blank</strong>, enter a name, add the columns the Agent Evaluator will receive, and optionally define a label schema. After creation, use <strong>Add row</strong> in the grid and edit each cell inline. This is the most direct route for a small golden set or a handful of deliberate edge cases.</p>
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
    <PageIntro eyebrow="Agent programs" title="Agent Evaluators">Turn evaluation criteria into repeatable Agent Evaluators with explicit inputs, score contracts, harness capabilities, and immutable Experiment Run history.</PageIntro>
    <section id="evaluator-panel"><h2>Agent Evaluator panel tour</h2><p>The Agent Evaluators list is the catalog of reusable evaluation agents. Open one to work on its versions; each version is a complete, attributable runtime configuration rather than only a prompt.</p><EvaluatorPanelVisual />
      <ol className="docs-steps"><li><strong>Start with the version bar.</strong> It identifies the selected version, whether it is active, and whether a completed Experiment Run has frozen it. Use <strong>New version</strong> to branch safely.</li><li><strong>Define the judgment and its inputs.</strong> Instructions describe the standard; the prompt template inserts row values with braces such as <code>{`{answer}`}</code>. Every placeholder must appear in Required columns.</li><li><strong>Make the output machine-checkable.</strong> Add structured output fields, choose categorical or numeric scoring, then select which compatible field is the score.</li><li><strong>Expand capabilities only when needed.</strong> Capabilities and tools are collapsed by default because they widen what the Agent Evaluator can do. Their configuration is saved with the version.</li></ol>
      <p>The action bar connects this object to the rest of the workflow: <strong>Generate dataset</strong> creates compatible cases, <strong>Run</strong> moves to the run launcher, and <strong>Export</strong> produces runnable Python or a portable JSON package.</p>
    </section>
    <section id="creating"><h2>Creating Agent Evaluators</h2><h3>Manual creation</h3><p>Each Agent Evaluator runs as a fully specified agent. Name it, write the judging prompt, choose a model—a Gateway model or a <a href="/docs/configuration#local-models">local CLI</a>—and list every required Dataset column. Ask the Agent Evaluator to explain its reasoning before returning a score.</p>
      <p>Select <strong>New evaluator → From scratch</strong> to create the container, then complete the first version editor from top to bottom: Identity, Judgment, Inputs, Output contract, and—only when needed—Capabilities &amp; tools. Valcore validates the draft continuously and the footer names the next field blocking Save.</p>
      <h4>Numeric labels</h4><p>Use a bounded numeric score for graded qualities. Set the minimum and maximum explicitly and explain what the ends—and useful points between them—mean.</p>
      <h4>Categorical labels</h4><p>Use a small fixed label set for clear decisions. Define every label in the prompt; three to five well-separated categories is often easier to validate than a large ambiguous set.</p>
      <h3>Generating evaluators</h3><h4>From prompts and data contracts</h4><p>Provide the task, required columns, column notes, and score schema. Valcore generates an editable evaluator draft that conforms to those inputs.</p>
      <h4>From existing datasets</h4><p>Seed generation from a dataset to inherit its columns and label schema. Review the draft prompt carefully before creating the first version.</p>
    </section>
    <section id="versioning"><h2>Versioning evaluators</h2><p>The active version is used whenever a run does not name another. A version becomes frozen after it is used by a run, preserving the prompt, model, output contract, tools, and capabilities behind that result.</p><p>To iterate, select the frozen version and choose <strong>New version</strong>. The editor begins with a copy of the selected configuration, so you can make one deliberate change and compare it against the original. The version diff shows the exact configuration changes rather than relying on names or timestamps.</p><p>Before a run, Valcore checks that evaluator columns are a subset of dataset columns, label kinds match, and categorical label sets match exactly.</p></section>
    <section id="capabilities"><h2>Pydantic AI harness capabilities</h2><p>Every Agent Evaluator runs as an agent inside the Pydantic AI harness. Capabilities give it more ways to investigate a case than reading the Dataset row alone, and are opt-in per Agent Evaluator version.</p>
      <h3>Configure capabilities in the UI</h3>
      <ol className="docs-steps"><li>Open <strong>Agent Evaluators</strong> and select the one you want to edit.</li><li>Open an editable version—or create a new version if the current one is frozen.</li><li>Expand <strong>Capabilities &amp; tools</strong> near the bottom of the version editor.</li><li>Enable only the capabilities the Agent Evaluator needs, configure any revealed settings, and save the version.</li></ol>
      <div className="capability-cards">
        <article><h4>CodeMode</h4><p>Lets the Agent Evaluator solve multi-step work in a code-driven execution loop.</p></article>
        <article><h4>SubAgents</h4><p>Lets the Agent Evaluator delegate bounded parts of a complex evaluation to sub-agents.</p></article>
        <article><h4>Planning</h4><p>Gives the Agent Evaluator a structured planning workflow for longer evaluation tasks.</p></article>
        <article><h4>FileSystem</h4><p>Lets the Agent Evaluator read from a rooted directory. After enabling it, set the <strong>root dir</strong> shown in the UI.</p></article>
        <article><h4>Shell</h4><p>Lets the Agent Evaluator run commands from an explicit allow-list. Configure comma-separated <strong>allowed commands</strong> and a default timeout.</p></article>
      </div>
      <Note title="Treat capabilities as part of the contract">A capability changes what the Agent Evaluator can see and how it can reach an answer. Grant the narrowest access that answers the evaluation question. The saved capability configuration is versioned with the prompt and model.</Note>
      <Note title="Capabilities and tools need a Gateway model">A version that pairs registry tools with a <a href="/docs/configuration#local-models">local CLI model</a> is rejected on save, and harness capabilities are not attached for one—the CLI brings its own tooling. Use a Gateway model when the rubric depends on tools or a configured capability.</Note>
      <h3>CLI reference</h3><p>Capability authoring happens in the UI. Once saved, the CLI uses the same versioned configuration automatically when you run or export the evaluator.</p><Code>{`# Find the evaluator and its active version\nvalcore list evaluators\n\n# Run it with its saved capabilities\nvalcore run <evaluator> <dataset> --watch\n\n# Export a specific version as runnable Python\nvalcore export <evaluator> --version <version> -o evaluator.py\n\n# Move a complete evaluator package between workspaces\nvalcore export <evaluator> --format json -o evaluator.json\nvalcore import evaluator.json`}</Code><p>Names and unique ID prefixes are accepted anywhere an evaluator, version, or dataset is requested.</p>
    </section>
  </>;
}

function Experiments() {
  return <>
    <PageIntro eyebrow="Measure" title="Experiment Runs">Use validation to measure agreement with human labels, evaluation to score new data, and comparisons to see what changed.</PageIntro>
    <section id="runs-panel"><h2>Experiment Runs panel tour</h2><p>The Experiment Runs panel is the execution history for every Agent Evaluator version and Dataset pairing. The list surfaces kind, status, headline metric, and start time; opening an Experiment Run reveals progress or the completed metrics and row-level evidence.</p><RunsPanelVisual />
      <ol className="docs-steps"><li><strong>Bind exact inputs.</strong> A run records one evaluator version and one dataset. That immutable pairing makes results attributable later.</li><li><strong>Choose engine behavior deliberately.</strong> Run kind controls whether labels are compared; the Logfire experiment checkbox changes the execution engine and sync destination, not the kind.</li><li><strong>Read the headline before drilling down.</strong> Categorical validation starts with Accuracy and Cohen&apos;s κ; numeric validation starts with MAE, RMSE, and correlations.</li><li><strong>Inspect the evidence.</strong> Filter to disagreements or errors, compare score with label, read structured output, and retry only failed rows when available.</li></ol>
    </section>
    <section id="starting"><h2>Starting an Experiment Run</h2><p>Select <strong>Runs → New run</strong>, then choose an Agent Evaluator. Valcore loads its versions and selects the active one by default. Choose a Dataset, run kind, and concurrency between 1 and 64.</p><div className="decision-grid"><article><h3>Eval</h3><p>Scores every row and records Agent Evaluator output. Labels are optional and agreement metrics are not required.</p></article><article><h3>Validation</h3><p>Compares every score with human ground truth. The option is disabled when the selected Dataset contains any unlabeled rows.</p></article><article><h3>Logfire experiment</h3><p>An execution option for either run kind. It runs through <code>pydantic-evals</code> and appears in Logfire&apos;s experiments view.</p></article></div><Note title="Concurrency changes throughput, not meaning">Begin with the default of 8. Raise it when the model provider and tools can sustain more parallel work; lower it when rate limits or shared resources make results unreliable.</Note></section>
    <section id="logfire-sync"><h2>Logfire Experiment Runs</h2><p><strong>Run kind</strong> and <strong>Run as a Logfire experiment</strong> are independent choices. Select either <strong>Eval</strong> or <strong>Validation</strong>, then enable the Logfire option to execute that run through <code>pydantic_evals.Dataset.evaluate</code> and send it to the configured Logfire project.</p><div className="decision-grid"><article><h3>Eval + Logfire</h3><p>Scores labeled or unlabeled rows and records each case in Logfire. It does not compare judgments with labels or calculate agreement metrics.</p></article><article><h3>Validation + Logfire</h3><p>Requires every row to have a confirmed label, sends labels as expected outputs, and calculates Valcore&apos;s agreement statistics.</p></article><article><h3>Same experiment surface</h3><p>Both kinds appear in Logfire with experiment, case, task, and evaluator spans. Neither can be cancelled or retried row by row.</p></article></div><p>The CLI&apos;s <code>experiment</code> shortcut currently creates a <strong>Validation</strong> run. Use <strong>Runs → New run</strong> in the interface when you want an <strong>Eval</strong> run backed by the Logfire experiment engine.</p><Code>{`# Validation through the Logfire experiment engine
valcore experiment <evaluator> <dataset>`}</Code><p>See the <a href="/docs/logfire#experiments">Logfire integration guide</a> for the required tracing token and the data attached to each experiment case.</p></section>
    <section id="validation"><h2>Validation Experiment Runs</h2><p>A validation Experiment Run compares Agent Evaluator scores with a fully labeled Dataset. Use it while developing an Agent Evaluator or as a release gate.</p>
      <h3>Interpreting results</h3><p>Categorical Experiment Runs report Accuracy, Cohen&apos;s κ, sample count, per-label Precision/Recall/F1/Support, and a confusion matrix. Matrix rows are human labels and columns are Agent Evaluator scores; off-diagonal cells are the mistakes to investigate.</p><p>Numeric Experiment Runs report MAE and RMSE, where lower is better, plus Pearson and Spearman correlation. Correlation can be unavailable when either the labels or scores have zero variance.</p>
      <h3>Thresholds API</h3><p>For categorical validation, turn minimum accuracy into a CI gate. Valcore exits with status 2 when the result misses the threshold.</p><Code>{`valcore run <evaluator> <dataset> \\\n  --kind validation \\\n  --min-accuracy 0.90`}</Code><p>Use <code>--json</code> when another tool needs the structured run result. Accuracy thresholds do not apply to numeric labels.</p>
    </section>
    <section id="evaluation"><h2>Unlabeled Experiment Runs</h2><p>These Experiment Runs record Agent Evaluator outputs without comparing them to ground truth, so labels are optional. Use them to score fresh cases, inspect reasoning, and find examples that should join a labeled validation Dataset.</p><h3>Interpreting results</h3><p>The detail table shows the original row, structured output, score, optional label, and agreement when available. Use <strong>Errors only</strong> to isolate execution failures. An Experiment Run completed with errors exposes <strong>Retry failed rows</strong>, which preserves successful results and reruns only failures.</p><p>An evaluation score is a measurement from the configured Agent Evaluator—not a human-verified answer.</p></section>
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
      <article><h4><code>valcore experiment</code></h4><p>Runs a validation through <code>pydantic_evals.Dataset.evaluate</code> and records it in Logfire experiments. The interface also supports Eval with the same engine. The command supports <code>--version</code>, <code>--concurrency</code>, and <code>--json</code>, but not watch or cancellation.</p></article>
      <article><h4><code>valcore export</code> / <code>import</code></h4><p>Moves evaluators and datasets as runnable Python or portable JSON eval packages.</p></article>
      <article><h4><code>valcore logfire</code></h4><p><code>pull</code> queries traces, <code>list</code> shows hosted datasets, <code>fetch</code> imports one, and <code>push</code> publishes a local dataset.</p></article>
      <article><h4><code>valcore config</code></h4><p>Sets credentials and defaults, prints the config path, or opens the config in your editor. <code>config get</code> masks stored secrets by default. The local CLI default is set in Settings or by editing <code>local_cli_default</code> with <code>config edit</code>.</p></article>
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
valcore import package.json`}</Code><Note title="Use the Valcore loader for complete behavior">A bare <code>AgentSpec</code> does not include tools, and a dataset bundled with an evaluator references Valcore&apos;s custom judge type. Keep the generated <code>valcore_judge.py</code> companion when running the package outside Valcore.</Note><Note title="Local CLI models cannot be exported to Python">Standalone export refuses a version whose model is <code>local/claude</code>, <code>local/codex</code>, or <code>local/cursor</code>. The rendered script is deliberately Valcore-free, so it has no way to reach a local CLI. Re-point the version at a Gateway model before exporting.</Note><h3>Running an exported dataset</h3><Code>{`from pydantic_evals import Dataset
from valcore_judge import ValcoreJudge

dataset = Dataset.from_file(
    "my-data.json",
    custom_evaluator_types=[ValcoreJudge],
)
report = dataset.evaluate_sync(task)`}</Code></section>

    <section id="ci"><h2>Using Valcore in CI</h2><p>Use a fully labeled categorical dataset, emit JSON to stdout, and set a minimum accuracy. Progress is written to stderr, so redirecting stdout produces a clean result file.</p><Code>{`valcore run my-evaluator my-dataset \
  --kind validation \
  --min-accuracy 0.90 \
  --json > run.json`}</Code><div className="decision-grid"><article><h3>Exit 0</h3><p>The run completed and met the threshold when one was supplied.</p></article><article><h3>Exit 1</h3><p>The run failed or Valcore reported a domain or configuration error.</p></article><article><h3>Exit 2</h3><p>Categorical accuracy was below <code>--min-accuracy</code>.</p></article></div><Note><code>--min-accuracy</code> requires categorical validation metrics. Numeric or unlabeled runs have no accuracy and fail clearly instead of silently passing.</Note><Note title="Prefer a Gateway model in CI">Export <code>PYDANTIC_AI_GATEWAY_API_KEY</code> and pin an explicit <code>gateway/...</code> model for gating runs. A local CLI model depends on a binary being installed and logged in on the runner, and answers with whatever model that tool currently defaults to—fine locally, unreliable as a release signal.</Note></section>

    <section id="skills"><h2>Agent skills</h2><p>Valcore ships a skill that teaches coding agents its data model, compatibility rules, workflow, and CLI. Install it in the repository the agent works in:</p><Code>{`valcore skills install                    # .agents/skills/
valcore skills install --claude           # .claude/skills/
valcore skills install --copilot          # .github/skills/
valcore skills install --all              # all three
valcore skills install --claude --global  # home-level install`}</Code><p>Destination flags are additive. Existing identical copies are skipped; use <code>--force</code> to replace an edited copy or <code>--symlink</code> to follow upgrades to the packaged skill. Use <code>valcore skills list</code> to inspect installations and <code>valcore skills uninstall</code> to remove them.</p></section>

    <section id="workspace"><h2>Workspace and databases</h2><p>By default, state lives under <code>~/.valcore</code>: the configuration file, SQLite database, and server logs. In PowerShell that is <code>$HOME\.valcore</code>, normally <code>C:\Users\&lt;name&gt;\.valcore</code>. On macOS and Linux the directory is created with mode <code>0700</code> and the config file with mode <code>0600</code>; Windows uses the current user&apos;s filesystem ACLs.</p><Code>{`~/.valcore/
  config.toml
  valcore.db
  logs/`}</Code><p>Use <code>VALCORE_HOME</code> to relocate the whole workspace, or pass <code>--db</code> before the command group to select another SQLite database for one invocation:</p><Code>{`VALCORE_HOME=./.valcore valcore list runs
valcore --db ./scratch.sqlite list datasets`}</Code><p>PowerShell uses the same environment variable as <code>$env:VALCORE_HOME</code>. See <a href="/docs/configuration">Configuration</a> for credential precedence and the boundary between the source Logfire project and Valcore&apos;s own project.</p></section>
  </>;
}

const content: Record<DocSlug, () => React.JSX.Element> = {
  installation: Installation,
  "getting-started": GettingStartedDemo,
  configuration: Configuration,
  logfire: LogfireIntegration,
  datasets: Datasets,
  evaluators: Evaluators,
  experiments: Experiments,
  cli: Cli,
};

export function DocContent({ slug }: { slug: DocSlug }) {
  const Content = content[slug];
  return <Content />;
}
