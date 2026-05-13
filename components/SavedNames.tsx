import type { NameIdea } from "@/lib/nameGenerator";

type SavedNamesProps = {
  names: NameIdea[];
  onRemove: (name: string) => void;
};

export function SavedNames({ names, onRemove }: SavedNamesProps) {
  return (
    <aside className="rounded-lg border border-black/10 bg-white/78 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/[0.06] sm:p-6 lg:sticky lg:top-4 lg:self-start">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil dark:text-citron">
          Shortlist
        </p>
        <h2 className="text-2xl font-semibold text-ink dark:text-white">
          Saved names
        </h2>
      </div>

      {names.length === 0 ? (
        <div className="rounded-lg border border-dashed border-black/15 bg-black/[0.02] p-5 text-sm leading-6 text-black/58 dark:border-white/15 dark:bg-white/[0.03] dark:text-white/58">
          Save your strongest ideas and compare them here.
        </div>
      ) : (
        <div className="space-y-3">
          {names.map((idea) => (
            <div
              key={idea.name}
              className="rounded-lg border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-black/15"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-ink dark:text-white">{idea.name}</p>
                  <p className="mt-1 text-xs font-semibold text-basil dark:text-citron">
                    {idea.style}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(idea.name)}
                  className="rounded-md px-2 py-1 text-xs font-semibold text-black/45 transition hover:bg-black/5 hover:text-ember focus:outline-none focus:ring-2 focus:ring-ember/30 dark:text-white/45 dark:hover:bg-white/10"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
