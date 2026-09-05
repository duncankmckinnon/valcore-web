export const docs = [
  {
    slug: "installation",
    title: "Installation",
    description: "Install Valcore with Homebrew, uv, or pip.",
    sections: [
      { id: "homebrew", title: "Homebrew install" },
      { id: "uv", title: "uv tool install" },
      { id: "pip", title: "pip install" },
    ],
  },
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Configure credentials and start using Valcore with your local agent.",
    sections: [
      { id: "keys", title: "Configuring keys", children: ["Valcore project keys", "Agent project keys"] },
      { id: "local-agent", title: "Local agent" },
    ],
  },
  {
    slug: "datasets",
    title: "Datasets",
    description: "Create, label, generate, import, and sync evaluation datasets.",
    sections: [
      { id: "adding", title: "Adding datasets", children: ["Blank entries", "CSV or JSON upload", "Logfire traces query", "Logfire dataset syncing", "Synthetic datasets"] },
      { id: "labeling", title: "Labeling datasets", children: ["Numeric labels", "Categorical labels"] },
      { id: "writing", title: "Writing datasets" },
    ],
  },
  {
    slug: "evaluators",
    title: "Evaluators",
    description: "Author reliable LLM judges and evolve them safely.",
    sections: [
      { id: "creating", title: "Creating evaluators", children: ["Manual creation", "Generating evaluators"] },
      { id: "versioning", title: "Versioning evaluators" },
      { id: "capabilities", title: "Evaluation harness capabilities" },
    ],
  },
  {
    slug: "experiments",
    title: "Experiments",
    description: "Run validations and evaluations, interpret results, and compare versions.",
    sections: [
      { id: "validation", title: "Validation runs", children: ["Interpreting results", "Logfire sync", "Thresholds API"] },
      { id: "evaluation", title: "Evaluation runs" },
      { id: "comparisons", title: "Comparisons" },
    ],
  },
] as const;

export type DocSlug = (typeof docs)[number]["slug"];

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
