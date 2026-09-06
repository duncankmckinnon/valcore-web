"use client";

import { useCallback, useState } from "react";

type InstallMethod = "brew" | "uv" | "pip";

const COMMANDS: Record<InstallMethod, string> = {
  brew: "brew install duncankmckinnon/tap/valcore",
  uv: "uv tool install valcore",
  pip: "pip install valcore",
};

const LABELS: Record<InstallMethod, string> = {
  brew: "brew",
  uv: "uv",
  pip: "pip",
};

function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20 6-11 11-5-5" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function InstallCommand() {
  const [method, setMethod] = useState<InstallMethod>("brew");
  const [copied, setCopied] = useState(false);
  const command = COMMANDS[method];

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <div className="install-picker">
      <div className="install-tabs" role="tablist" aria-label="Installation method">
        {(Object.keys(COMMANDS) as InstallMethod[]).map((entry) => (
          <button
            key={entry}
            type="button"
            role="tab"
            aria-selected={method === entry}
            className={method === entry ? "active" : undefined}
            onClick={() => {
              setMethod(entry);
              setCopied(false);
            }}
          >
            {LABELS[entry]}
          </button>
        ))}
      </div>
      <div className="install" aria-live="polite">
        <span className="prompt">$</span>
        <code>{command}</code>
        <button className="copy-button" type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy to clipboard"}>
          <CopyIcon copied={copied} />
        </button>
      </div>
    </div>
  );
}
