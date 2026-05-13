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
    <main className="flex min-h-screen items-start justify-center bg-[#fbf6ee] px-4 py-12 sm:py-16">
      <div className="w-full max-w-lg rounded-2xl border border-[#eadfce] bg-white p-6 shadow-[0_18px_50px_rgba(120,82,45,0.12)] sm:p-8">
        <h1 className="text-center text-4xl font-semibold tracking-tight text-[#2b2118]">
          Name Generator
        </h1>

        <div className="mt-8 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addKeyword();
              }
            }}
            placeholder="Enter a keyword"
            className="min-w-0 flex-1 rounded-xl border border-[#decfba] bg-[#fffdf9] px-4 py-3 text-base text-[#2b2118] outline-none placeholder:text-[#9d8f7f] focus:border-[#c87943] focus:ring-4 focus:ring-[#c87943]/15"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="rounded-xl bg-[#c87943] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#a95f31] focus:outline-none focus:ring-4 focus:ring-[#c87943]/20"
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
                className="rounded-full border border-[#decfba] bg-[#fffaf2] px-3 py-1.5 text-sm font-medium text-[#6e5b47] hover:border-[#c87943] hover:bg-[#fff1df]"
              >
                {keyword} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={generateIdeas}
          className="mt-7 w-full rounded-xl bg-[#2b2118] px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#493727] focus:outline-none focus:ring-4 focus:ring-[#2b2118]/15"
        >
          Generate
        </button>

        {error && <p className="mt-4 text-sm font-medium text-[#b33b2e]">{error}</p>}

        {ideas.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#2b2118]">Generated names</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {ideas.map((idea) => (
                <li
                  key={idea}
                  className="cursor-pointer rounded-full border border-[#efd9c4] bg-[#fff7ec] px-4 py-2 text-sm font-semibold text-[#6d4328] shadow-sm hover:border-[#c87943] hover:bg-[#ffefd9]"
                >
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
