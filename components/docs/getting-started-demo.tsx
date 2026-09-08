import { AgentSkillInstall } from "@/components/agent-skill-install";
import { VALCORE_SKILL_SOURCE_URL } from "@/lib/links";
import { Code, Note, PageIntro } from "./ui";
import { CopyText } from "./copy-code";

export function GettingStartedDemo() {
  return <>
    <PageIntro eyebrow="A complete first experiment" title="Getting started">Create a real Dataset, generate a compatible Agent Evaluator, and measure it with a validation Experiment Run. You can finish the demo using a local coding agent without creating a model API key.</PageIntro>

    <section id="install-demo"><h2>1. Install Valcore</h2><p>Choose either path. If you already work with a coding agent, hand it the Valcore skill and let it install and operate the tool for you. If you prefer the terminal, install the CLI with Homebrew.</p>
      <h3>Install with your coding agent</h3><p>Copy this prompt into Claude Code, Codex, or Cursor:</p><AgentSkillInstall /><p><a href={VALCORE_SKILL_SOURCE_URL}>Inspect the skill source on GitHub <span aria-hidden="true">→</span></a></p>
      <h3>Or install with Homebrew</h3><Code>{`brew install duncankmckinnon/tap/valcore
valcore --help`}</Code>
      <Note title="What the skill adds">The skill teaches your coding agent how to install and operate Valcore, create compatible resources, start Experiment Runs, and inspect results. Valcore itself remains a normal local CLI and web interface.</Note>
    </section>

    <section id="launch"><h2>2. Launch the workbench</h2><Code>{`valcore serve`}</Code><p>Valcore opens the interface at <code>http://127.0.0.1:8000</code>. The interface, CLI, and installed agent skill all use the same local SQLite workspace.</p>
      <details className="docs-optional">
        <summary><span>Optional</span> Connect Pydantic Logfire</summary>
        <div><p>Create a Logfire account and project, then copy that project&apos;s write token from its settings. In Valcore, open <strong>Settings</strong> and add it under <strong>Logfire tracing token</strong>, or run:</p><Code>{`valcore config set-logfire-token`}</Code><p>The tracing token is sufficient for this demo&apos;s <strong>Run as a Logfire experiment</strong> option. Valcore executes through <code>pydantic-evals</code>, traces the Agent Evaluator through <code>pydantic-ai</code>, and sends the Experiment Run to Logfire.</p><p>Dataset import, SQL queries, and Dataset publishing use separately scoped Logfire API keys. You do not need those for this walkthrough. See <a href="/docs/configuration#logfire">Logfire project boundary</a> when you are ready to connect production traces or hosted Datasets.</p></div>
      </details>
    </section>

    <section id="choosing-a-model"><h2>3. Choose a model route</h2><p>Open <strong>Settings → Model Selection</strong>. Under <strong>Local CLI default</strong>, select the coding agent already installed and authenticated on your machine:</p><div className="capability-cards"><article><h4>Claude Code</h4><p>Selects <code>local/claude</code>.</p></article><article><h4>Codex</h4><p>Selects <code>local/codex</code>.</p></article><article><h4>Cursor</h4><p>Selects <code>local/cursor</code>.</p></article></div><p>This route is used for both generation and Experiment Runs, with no additional model key. The <strong>Default model</strong> card on Overview confirms the effective selection.</p><Note title="Hosted is one setting away">To use hosted models instead, add a Pydantic AI Gateway key in Settings and clear the local default. Gateway routes support pinned provider models, Pydantic AI harness capabilities, tools, and standalone Python export.</Note></section>

    <section id="build-dataset"><h2>4. Generate the Dataset</h2><p>Open <strong>Datasets → New dataset → Generate</strong>. Fill the form with the following values.</p>
      <h3>Name</h3><Code>{`retail-support-demo`}</Code>
      <h3>Description</h3><Code>{`Customer-support conversations about retail orders. Each row contains one customer request and the support response to it. The Dataset should include straightforward resolutions, unresolved cases that need more work, and clearly hostile support responses.`}</Code>
      <h3>Generation instructions</h3><Code>{`Generate realistic customer-support exchanges for an online retailer. Cover order status, late or missing deliveries, damaged items, returns, refunds, cancellations, address changes, and incorrect products. Vary the difficulty and writing style. Some rows should belong to the same multi-turn conversation and therefore repeat the same session value.

Assign labels using these definitions:
- resolved: the response correctly answers the request or provides a clear, sufficient next action.
- unresolved: the response is incomplete, incorrect, irrelevant, or leaves the customer without a workable next step.
- hostile: the response is rude, aggressive, blaming, threatening, mocking, or otherwise antagonistic toward the customer.

Make each generated response consistent with its assigned label.`}</Code>
      <h3>Columns</h3><Code>{`session, request, response`}</Code>
      <div className="demo-contract">
        <CopyText label="session" value="A short conversation identifier. Repeat it when two or more rows are turns from the same customer-support session." />
        <CopyText label="request" value="The customer's latest message about a retail order, including enough context to assess the reply." />
        <CopyText label="response" value="The support chatbot's direct response to the customer's request." />
      </div>
      <h3>Categorical labels</h3><p>Keep <strong>Label kind</strong> set to <strong>Categorical</strong>, then add <code>resolved</code>, <code>unresolved</code>, and <code>hostile</code>. Their definitions are already included in the generation instructions above:</p><div className="demo-contract">
        <CopyText label="resolved" value="The response correctly answers the request or provides a clear, sufficient next action." />
        <CopyText label="unresolved" value="The response is incomplete, incorrect, irrelevant, or leaves the customer without a workable next step." />
        <CopyText label="hostile" value="The response is rude, aggressive, blaming, threatening, mocking, or otherwise antagonistic toward the customer." />
      </div>
      <h3>Size and label distribution</h3><div className="demo-values"><span><strong>Rows</strong>10</span><span><strong>resolved</strong>40% · 4 rows</span><span><strong>unresolved</strong>40% · 4 rows</span><span><strong>hostile</strong>20% · 2 rows</span></div><p>Enable the label mix, enter those percentages, confirm the preview shows <strong>4 / 4 / 2</strong>, then select <strong>Generate</strong>.</p>
    </section>

    <section id="label-dataset"><h2>5. Confirm the labels</h2><p>Generated labels begin as suggestions, not human ground truth. Validation becomes available only after all 10 rows are labeled.</p><ol className="docs-steps"><li>Read each request and response and check the suggested label.</li><li>Select <strong>Accept</strong> when it is correct, or choose a different label.</li><li>Continue until the Dataset summary shows <strong>10 labeled</strong> and <strong>0 unlabeled</strong>.</li></ol><Note title="Keyboard shortcut">Focus a row and press <code>a</code> to accept its suggestion. Use <code>j</code> and <code>k</code> to move between rows.</Note></section>

    <section id="build-evaluator"><h2>6. Generate the Agent Evaluator</h2><p>From the Dataset detail page, select <strong>Generate evaluator</strong>. Keep <strong>Use this dataset&apos;s label space</strong> enabled, include <code>request</code> and <code>response</code>, and deselect <code>session</code>. Paste this into <strong>Criteria</strong>:</p><Code>{`Create an Agent Evaluator for a retail customer-support chatbot. Evaluate the response in the context of the customer's request.

Return exactly one judgment from the Dataset's label space:
- resolved: the response correctly answers the request or gives a clear and sufficient next action.
- unresolved: the response is incomplete, incorrect, irrelevant, or does not give the customer a workable next step.
- hostile: the response is rude, aggressive, blaming, threatening, mocking, or otherwise antagonistic.

Use hostile whenever hostility is present, even if the response also contains useful information. Otherwise distinguish resolved from unresolved based on whether the customer's need was actually addressed. Include concise reasoning before the judgment.`}</Code><p>Select <strong>Generate evaluator</strong>. Review the generated draft, give it a clear name such as <code>retail-support-resolution</code>, then save the first version. The generated Agent Evaluator inherits the Dataset&apos;s categorical labels, so the two are compatible by construction.</p></section>

    <section id="run-experiment"><h2>7. Run the experiment</h2><p>Open <strong>Runs → New run</strong> and configure:</p><div className="demo-values"><span><strong>Agent Evaluator</strong><code>retail-support-resolution</code></span><span><strong>Dataset</strong><code>retail-support-demo</code></span><span><strong>Run kind</strong>Validation</span><span><strong>Logfire</strong>Enable <em>Run as a Logfire experiment</em> if you added the token</span></div><p>Keep the active version and default concurrency, then select <strong>Start</strong>. A validation Experiment Run executes the Agent Evaluator over all 10 rows and compares every judgment with the confirmed human label.</p></section>

    <section id="read-results"><h2>8. Read the results</h2><p>Start with Accuracy and Cohen&apos;s κ, then inspect the per-label precision, recall, F1, and confusion matrix. Open disagreements to compare the Agent Evaluator&apos;s reasoning and judgment with the Dataset label.</p><p>If you enabled Logfire, follow the experiment link to see the native Pydantic Experiment Run and the trace for each case. Back in Valcore, create a new Agent Evaluator version, change one thing, and run it against the same Dataset—the beginning of a repeatable experimentation loop.</p><Note title="You now have a real baseline">This is not a canned result. The rows, labels, generated Agent Evaluator, model responses, metrics, and traces are created in your own Valcore workspace.</Note></section>
  </>;
}
