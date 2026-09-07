export const docs = [
  {
    slug: "installation",
    title: "Installation",
    description: "Install Valcore with Homebrew, uv, or pip.",
    sections: [
      { id: "requirements", title: "Requirements" },
      { id: "homebrew", title: "Homebrew install" },
      { id: "uv", title: "uv tool install" },
      { id: "pip", title: "pip install" },
      { id: "upgrading", title: "Upgrading" },
    ],
  },
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Configure credentials, pick a model route, and hand Valcore to your coding agent.",
    sections: [
      { id: "launch", title: "Launch Valcore" },
      { id: "keys", title: "Configuring keys", children: ["Valcore project keys", "Agent project keys"] },
      { id: "choosing-a-model", title: "Choosing a model", children: ["Gateway models", "Local CLI models"] },
      { id: "local-agent", title: "Agent skill install" },
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
    slug: "datasets",
    title: "Datasets",
    description: "Create, label, generate, import, and sync evaluation datasets.",
    sections: [
      { id: "dataset-panel", title: "Dataset panel tour" },
      { id: "adding", title: "Adding datasets", children: ["Blank entries", "CSV or JSON upload", "Logfire traces query", "Logfire dataset syncing", "Synthetic datasets"] },
      { id: "labeling", title: "Labeling datasets", children: ["Numeric labels", "Categorical labels"] },
      { id: "writing", title: "Writing datasets" },
    ],
  },
  {
    slug: "evaluators",
    title: "Evaluators",
    description: "Author reliable agent judges and evolve them safely.",
    sections: [
      { id: "evaluator-panel", title: "Evaluator panel tour" },
      { id: "creating", title: "Creating evaluators", children: ["Manual creation", "Generating evaluators"] },
      { id: "versioning", title: "Versioning evaluators" },
      { id: "capabilities", title: "Evaluation harness capabilities" },
    ],
  },
  {
    slug: "experiments",
    title: "Runs & experiments",
    description: "Run validations and evaluations, interpret results, and compare versions.",
    sections: [
      { id: "runs-panel", title: "Runs panel tour" },
      { id: "starting", title: "Starting a run" },
      { id: "validation", title: "Validation runs", children: ["Interpreting results", "Logfire sync", "Thresholds API"] },
      { id: "evaluation", title: "Evaluation runs" },
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
