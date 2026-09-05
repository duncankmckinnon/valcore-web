import type { ReactNode } from "react";

function Marker({ n }: { n: number }) {
  return <span className="panel-marker" aria-hidden="true">{n}</span>;
}

function PanelFigure({ title, children, legend }: { title: string; children: ReactNode; legend: string[] }) {
  return (
    <figure className="panel-figure">
      <div className="panel-caption"><span className="panel-live-dot" /> Valcore interface map <strong>{title}</strong></div>
      <div className="panel-window">{children}</div>
      <figcaption>
        {legend.map((item, index) => <span key={item}><Marker n={index + 1} />{item}</span>)}
      </figcaption>
    </figure>
  );
}

function AppRail({ active }: { active: "datasets" | "evaluators" | "runs" }) {
  return <div className="panel-rail" aria-hidden="true"><b>V</b>{["overview", "datasets", "evaluators", "runs"].map((item) => <i className={item === active ? "active" : ""} key={item}>{item.slice(0, 2)}</i>)}</div>;
}

export function DatasetPanelVisual() {
  return (
    <PanelFigure title="Datasets" legend={["Workspace totals", "Creation paths", "Dataset readiness", "Row-level labeling"]}>
      <AppRail active="datasets" />
      <div className="panel-main">
        <div className="panel-top"><div><small>DATASETS</small><h3>Evaluation cases</h3></div><span className="panel-button"><Marker n={2} />New dataset</span></div>
        <div className="panel-stats"><Marker n={1} /><span><b>4</b> datasets</span><span><b>128</b> total rows</span><span><b>86%</b> labeled</span></div>
        <div className="panel-table">
          <div className="panel-tr panel-th"><span>Name</span><span>Rows</span><span>Labeled</span></div>
          <div className="panel-tr"><span>support-quality</span><span>48</span><span className="panel-good"><Marker n={3} />complete</span></div>
          <div className="panel-tr"><span>edge-cases</span><span>32</span><span>21 / 32</span></div>
        </div>
        <div className="panel-detail">
          <div className="panel-tabs"><b>Blank</b><b>Upload</b><b>Generate</b><b>Logfire</b></div>
          <div className="panel-label-row"><Marker n={4} /><span>Ambiguous refund request</span><span className="panel-pill">pass</span><i>suggested: review</i></div>
        </div>
      </div>
    </PanelFigure>
  );
}

export function EvaluatorPanelVisual() {
  return (
    <PanelFigure title="Evaluator version editor" legend={["Version state", "Judgment and inputs", "Output contract", "Capabilities & tools"]}>
      <AppRail active="evaluators" />
      <div className="panel-main">
        <div className="panel-top"><div><small>EVALUATOR</small><h3>Response quality</h3></div><span className="panel-button muted-button">Run</span></div>
        <div className="panel-version"><Marker n={1} /><span>v4-quality-pass</span><b>ACTIVE</b><i>FROZEN</i><span>New version</span></div>
        <div className="panel-editor-grid">
          <div className="panel-editor-card"><Marker n={2} /><small>JUDGMENT</small><b>Instructions</b><p>Assess accuracy, relevance, and completeness…</p><b>Required columns</b><div className="preview-chips"><i>question</i><i>answer</i></div></div>
          <div className="panel-editor-card"><Marker n={3} /><small>OUTPUT CONTRACT</small><b>Score kind</b><p>categorical</p><b>Score field</b><p>quality</p><div className="preview-chips"><i>pass</i><i>review</i><i>fail</i></div></div>
        </div>
        <div className="panel-capabilities"><Marker n={4} /><b>⌄ Capabilities &amp; tools</b><span>☑ CodeMode</span><span>☑ FileSystem</span><span>☐ Shell</span></div>
      </div>
    </PanelFigure>
  );
}

export function RunsPanelVisual() {
  return (
    <PanelFigure title="Runs" legend={["Run configuration", "Execution mode", "Headline metrics", "Result inspection"]}>
      <AppRail active="runs" />
      <div className="panel-main runs-visual">
        <div className="panel-top"><div><small>RUNS</small><h3>Validation results</h3></div><span className="panel-button">New run</span></div>
        <div className="panel-run-config"><Marker n={1} /><span><small>Evaluator / version</small><b>response-quality / v4</b></span><span><small>Dataset</small><b>support-quality</b></span><span><small>Run kind</small><b>Validation</b></span></div>
        <div className="panel-experiment"><Marker n={2} /><span>☑ Run as a Logfire experiment</span><i>concurrency 8</i></div>
        <div className="panel-metrics"><Marker n={3} /><span><small>Accuracy</small><b>94.2%</b></span><span><small>Cohen&apos;s κ</small><b>0.891</b></span><span><small>n</small><b>128</b></span></div>
        <div className="panel-results"><div><Marker n={4} /><b>Disagreements only</b><i>Errors only</i></div><div className="panel-tr panel-th"><span>Row</span><span>Score</span><span>Label</span><span>Agreement</span></div><div className="panel-tr"><span>Refund after 45 days…</span><span>review</span><span>fail</span><span className="panel-warn">disagree</span></div></div>
      </div>
    </PanelFigure>
  );
}
