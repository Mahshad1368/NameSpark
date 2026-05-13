import { useState } from "react";
import type { NameIdea } from "@/lib/nameGenerator";

type NameCardProps = {
  idea: NameIdea;
  index: number;
  isSaved: boolean;
  onSave: (idea: NameIdea) => void;
};

export function NameCard({ idea, index, isSaved, onSave }: NameCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(idea.name);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <article
      className="flex min-h-48 flex-col justify-between rounded-lg border border-black/10 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-basil/30 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-citron/30"
      style={{ animation: "rise-in 480ms ease-out both", animationDelay: `${index * 35}ms` }}
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="break-words text-xl font-bold text-ink dark:text-white">
            {idea.name}
          </h3>
          <span className="shrink-0 rounded-full bg-citron px-3 py-1 text-xs font-bold text-ink">
            {idea.style}
          </span>
        </div>
        <p className="text-sm leading-6 text-black/62 dark:text-white/62">
          {idea.explanation}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-black/12 px-3 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-basil hover:bg-basil/5 hover:text-basil focus:outline-none focus:ring-2 focus:ring-basil/30 dark:border-white/12 dark:text-white dark:hover:border-citron dark:hover:bg-citron/10 dark:hover:text-citron"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          type="button"
          onClick={() => onSave(idea)}
          disabled={isSaved}
          className="rounded-lg bg-basil px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 disabled:cursor-default disabled:translate-y-0 disabled:bg-black/15 disabled:text-black/45 dark:bg-citron dark:text-ink dark:hover:bg-white dark:focus:ring-offset-ink dark:disabled:bg-white/12 dark:disabled:text-white/45"
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
