"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { NameCard } from "@/components/NameCard";
import { SavedNames } from "@/components/SavedNames";
import { generateNames, type NameIdea, type NameType } from "@/lib/nameGenerator";

export default function Home() {
  const [ideas, setIdeas] = useState<NameIdea[]>([]);
  const [savedNames, setSavedNames] = useState<NameIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleGenerate(keywords: string, type: NameType) {
    if (!keywords.trim()) {
      setError("Enter a few keywords first.");
      return;
    }

    setError("");
    setIsLoading(true);

    window.setTimeout(() => {
      setIdeas(generateNames(keywords, type));
      setIsLoading(false);
    }, 1000);
  }

  function handleSave(idea: NameIdea) {
    setSavedNames((current) => {
      if (current.some((saved) => saved.name === idea.name)) {
        return current;
      }

      return [idea, ...current];
    });
  }

  function handleRemoveSaved(name: string) {
    setSavedNames((current) => current.filter((saved) => saved.name !== name));
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <Header />
        <Hero onGenerate={handleGenerate} error={error} isLoading={isLoading} />
        <HowItWorks />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-lg border border-black/10 bg-white/82 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] sm:p-6">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil dark:text-citron">
                  Results
                </p>
                <h2 className="text-2xl font-semibold text-ink dark:text-white">
                  Generated names
                </h2>
              </div>
              {ideas.length > 0 && (
                <p className="text-sm text-black/55 dark:text-white/55">
                  {ideas.length} ideas ready
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-48 animate-pulse rounded-lg border border-black/10 bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.06]"
                  />
                ))}
              </div>
            ) : ideas.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {ideas.map((idea, index) => (
                  <NameCard
                    key={idea.name}
                    idea={idea}
                    index={index}
                    isSaved={savedNames.some((saved) => saved.name === idea.name)}
                    onSave={handleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-black/15 bg-black/[0.02] p-8 text-center dark:border-white/15 dark:bg-white/[0.03]">
                <div className="max-w-sm">
                  <div className="mx-auto mb-5 grid size-12 place-items-center rounded-lg bg-citron text-lg font-black text-ink">
                    N
                  </div>
                  <h3 className="text-2xl font-semibold text-ink dark:text-white">
                    Your name ideas will appear here.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                    Add keywords like cozy finance, clean analytics, or pet care and
                    NameSpark will shape them into polished options.
                  </p>
                </div>
              </div>
            )}
          </div>

          <SavedNames names={savedNames} onRemove={handleRemoveSaved} />
        </section>
      </div>
    </main>
  );
}
