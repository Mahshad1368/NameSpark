"use client";

import { useState } from "react";

function createNameIdeas(keywords: string[]) {
  const endings = ["ly", "Hub", "Co", "Works", "Nest", "Lab", "Base", "Flow", "Spark", "Point"];

  return Array.from({ length: 10 }, (_, index) => {
    const keyword = keywords[index % keywords.length];
    const cleanKeyword = keyword
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");

    return `${cleanKeyword}${endings[index]}`;
  });
}

export default function Home() {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [error, setError] = useState("");

  function addKeyword() {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    if (!keywords.includes(trimmedInput)) {
      setKeywords((currentKeywords) => [...currentKeywords, trimmedInput]);
    }

    setInput("");
    setError("");
  }

  function removeKeyword(keyword: string) {
    setKeywords((currentKeywords) =>
      currentKeywords.filter((currentKeyword) => currentKeyword !== keyword),
    );
  }

  function generateIdeas() {
    if (keywords.length === 0) {
      setError("Please add at least one keyword.");
      setIdeas([]);
      return;
    }

    setError("");
    setIdeas(createNameIdeas(keywords));
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-white px-4 py-12">
      <div className="w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-6">
        <h1 className="text-center text-3xl font-semibold text-neutral-900">
          Name Generator
        </h1>

        <div className="mt-8 flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addKeyword();
              }
            }}
            placeholder="Enter a keyword"
            className="min-w-0 flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-700"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="rounded-md border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Add
          </button>
        </div>

        {keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                {keyword} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={generateIdeas}
          className="mt-6 w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Generate
        </button>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {ideas.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-neutral-900">Generated names</h2>
            <ul className="mt-3 space-y-2">
              {ideas.map((idea) => (
                <li key={idea} className="rounded-md border border-neutral-200 px-3 py-2 text-sm">
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
