import { FormEvent, useState } from "react";
import { nameTypes, type NameType } from "@/lib/nameGenerator";

type NameFormProps = {
  error: string;
  isLoading: boolean;
  onGenerate: (keywords: string, type: NameType) => void;
};

export function NameForm({ error, isLoading, onGenerate }: NameFormProps) {
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<NameType>("Startup");
  const examples = ["dog training", "AI notes", "fitness app", "coffee brand"];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGenerate(keywords, type);
  }

  return (
    <form
      id="generator"
      onSubmit={handleSubmit}
      className="rounded-lg border border-black/10 bg-white/92 p-4 shadow-soft backdrop-blur-xl transition hover:shadow-glow dark:border-white/10 dark:bg-white/[0.08] sm:p-6"
    >
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil dark:text-citron">
          Try NameSpark
        </p>
        <h2 className="mt-1 text-2xl font-bold text-ink dark:text-white">
          Start with a few words
        </h2>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="keywords"
            className="text-sm font-semibold text-ink dark:text-white"
          >
            Keywords
          </label>
          <input
            id="keywords"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            placeholder="sustainable travel, team finance, cozy pets"
            className="mt-2 w-full rounded-lg border border-black/12 bg-mist px-4 py-3 text-base text-ink outline-none transition placeholder:text-black/35 hover:border-black/25 focus:border-basil focus:ring-4 focus:ring-basil/10 dark:border-white/12 dark:bg-black/20 dark:text-white dark:placeholder:text-white/35 dark:hover:border-white/25 dark:focus:border-citron dark:focus:ring-citron/10"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setKeywords(example)}
                className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black/60 transition hover:-translate-y-0.5 hover:border-basil hover:text-basil hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-basil/25 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/65 dark:hover:border-citron dark:hover:text-citron"
              >
                {example}
              </button>
            ))}
          </div>
          {error && (
            <p className="mt-2 text-sm font-medium text-ember" role="alert">
              {error}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="type"
            className="text-sm font-semibold text-ink dark:text-white"
          >
            Name type
          </label>
          <select
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value as NameType)}
            className="mt-2 w-full rounded-lg border border-black/12 bg-mist px-4 py-3 text-base text-ink outline-none transition hover:border-black/25 focus:border-basil focus:ring-4 focus:ring-basil/10 dark:border-white/12 dark:bg-black/20 dark:text-white dark:hover:border-white/25 dark:focus:border-citron dark:focus:ring-citron/10"
          >
            {nameTypes.map((nameType) => (
              <option key={nameType}>{nameType}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-ink px-5 py-3 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-basil hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70 dark:bg-citron dark:text-ink dark:hover:bg-white dark:focus:ring-offset-ink"
        >
          {isLoading ? "Generating..." : "Generate Names"}
        </button>
      </div>
    </form>
  );
}
