export const docs = [
  {
    slug: "installation",
    title: "Installation",
    description: "Install Valcore on macOS, Linux, or Windows with Homebrew, uv, or pip.",
    sections: [
      { id: "requirements", title: "Requirements" },
      { id: "homebrew", title: "Homebrew install" },
      { id: "uv", title: "uv tool install" },
      { id: "windows", title: "Windows" },
      { id: "pip", title: "pip install" },
      { id: "upgrading", title: "Upgrading" },
    ],
  },
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Generate a real retail-support Dataset and Agent Evaluator, then run your first validation Experiment Run.",
    sections: [
      { id: "install-demo", title: "1. Install Valcore" },
      { id: "launch", title: "2. Launch the workbench" },
      { id: "choosing-a-model", title: "3. Choose a model route" },
      { id: "build-dataset", title: "4. Generate the Dataset" },
      { id: "label-dataset", title: "5. Confirm the labels" },
      { id: "build-evaluator", title: "6. Generate the Agent Evaluator" },
      { id: "run-experiment", title: "7. Run the experiment" },
      { id: "read-results", title: "8. Read the results" },
    ],
  },
  {
    slug: "configuration",
    title: "Configuration",
    description: "Configure Gateway and local CLI models, credentials, Logfire projects, and defaults.",
    sections: [
      { id: "credentials", title: "Credentials" },
      { id: "models", title: "Models and routes", children: ["Gateway models", "Local CLI models"] },
      { id: "local-models", title: "Running on a local CLI" },
      { id: "precedence", title: "Defaults and precedence" },
      { id: "logfire", title: "Logfire project boundary" },
      { id: "storage", title: "Storage and security" },
    ],
  },
  {
    slug: "logfire",
    title: "Logfire integration",
    description: "Connect Agent Evaluator traces, Logfire-backed Datasets, and Pydantic Experiment Runs.",
    sections: [
      { id: "architecture", title: "Choose a project layout" },
      { id: "setup", title: "Set up Logfire" },
      { id: "gateway", title: "Set up the AI Gateway" },
      { id: "credentials", title: "Credentials and scopes" },
      { id: "evaluators", title: "Agent Evaluator touchpoints" },
      { id: "datasets", title: "Dataset touchpoints" },
      { id: "experiments", title: "Experiment Run touchpoints" },
      { id: "verify", title: "Verify the integration" },
    ],
  },
  {
    slug: "datasets",
    title: "Datasets",
    description: "Create, label, generate, import, and sync evaluation datasets.",
    sections: [
      { id: "dataset-panel", title: "Dataset panel tour" },
      { id: "adding", title: "Adding datasets", children: ["Blank entries", "CSV or JSON upload", "Logfire traces query", "Logfire dataset syncing", "Synthetic datasets"] },
      { id: "labeling", title: "Labeling datasets" },
      { id: "writing", title: "Writing datasets" },
    ],
  },
  {
    slug: "annotations",
    title: "Annotations",
    description: "Define Label Sets and work a Dataset's rows through the keyboard-driven Annotation Queue.",
    sections: [
      { id: "overview", title: "Label Sets and Annotations" },
      { id: "label-sets", title: "Creating and managing Label Sets" },
      { id: "queue", title: "The Annotation Queue", children: ["Keyboard shortcuts", "Suggestions and acceptance"] },
      { id: "row-view", title: "The single-row view" },
      { id: "validation", title: "Feeding Validation runs" },
    ],
  },
  {
    slug: "evaluators",
    title: "Agent Evaluators",
    description: "Author reliable Agent Evaluators and evolve them safely.",
    sections: [
      { id: "evaluator-panel", title: "Agent Evaluator panel" },
      { id: "creating", title: "Creating Agent Evaluators", children: ["Manual creation", "Generating from a Dataset"] },
      { id: "versioning", title: "Versioning Agent Evaluators" },
      { id: "capabilities", title: "Pydantic AI harness capabilities" },
    ],
  },
  {
    slug: "experiments",
    title: "Experiment Runs",
    description: "Run validations and evaluations, interpret results, and compare Agent Evaluator versions.",
    sections: [
      { id: "runs-panel", title: "Experiment Runs panel" },
      { id: "starting", title: "Starting an Experiment Run" },
      { id: "logfire-sync", title: "Logfire Experiment Runs" },
      { id: "validation", title: "Validation Experiment Runs", children: ["Interpreting results", "Thresholds API"] },
      { id: "evaluation", title: "Unlabeled Experiment Runs" },
      { id: "comparisons", title: "Comparisons" },
    ],
  },
  {
    slug: "cli",
    title: "CLI & automation",
    description: "Use Valcore from the terminal, CI, and coding agents.",
    sections: [
      { id: "mental-model", title: "App and CLI" },
      { id: "commands", title: "Command reference" },
      { id: "packages", title: "Portable eval packages" },
      { id: "ci", title: "Using Valcore in CI" },
      { id: "skills", title: "Agent skills" },
      { id: "workspace", title: "Workspace and databases" },
    ],
  },
] as const;

export type DocSlug = (typeof docs)[number]["slug"];

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
