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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGenerate(keywords, type);
  }

  return (
    <form
      id="generator"
      onSubmit={handleSubmit}
      className="rounded-lg border border-black/10 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.07] sm:p-6"
    >
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
            className="mt-2 w-full rounded-lg border border-black/12 bg-mist px-4 py-3 text-base text-ink outline-none transition placeholder:text-black/35 focus:border-basil focus:ring-4 focus:ring-basil/10 dark:border-white/12 dark:bg-black/20 dark:text-white dark:placeholder:text-white/35 dark:focus:border-citron dark:focus:ring-citron/10"
          />
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
            className="mt-2 w-full rounded-lg border border-black/12 bg-mist px-4 py-3 text-base text-ink outline-none transition focus:border-basil focus:ring-4 focus:ring-basil/10 dark:border-white/12 dark:bg-black/20 dark:text-white dark:focus:border-citron dark:focus:ring-citron/10"
          >
            {nameTypes.map((nameType) => (
              <option key={nameType}>{nameType}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-ink px-5 py-3 text-base font-bold text-white transition hover:bg-basil focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-citron dark:text-ink dark:hover:bg-white dark:focus:ring-offset-ink"
        >
          {isLoading ? "Generating..." : "Generate Names"}
        </button>
      </div>
    </form>
  );
}
