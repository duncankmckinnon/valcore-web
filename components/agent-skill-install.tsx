"use client";

import { useCallback, useState } from "react";
import { VALCORE_AGENT_SKILL_PROMPT, VALCORE_SKILLS_DOWNLOAD_URL } from "@/lib/links";

export function AgentSkillInstall() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(VALCORE_AGENT_SKILL_PROMPT);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="agent-skill-actions">
      <button className="secondary-button" type="button" onClick={copy}>
        {copied ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m20 6-11 11-5-5" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
        {copied ? "Prompt copied" : "Copy for agent"}
      </button>
      <a className="skill-zip-link" href={VALCORE_SKILLS_DOWNLOAD_URL} download>
        Download Skills
      </a>
    </div>
  );
}
