"use client";

import { useState } from "react";

const creativeEndings = [
  "ly",
  "io",
  "ai",
  "flow",
  "mind",
  "nest",
  "spark",
  "lab",
  "fox",
  "pulse",
  "vibe",
  "nova",
  "zen",
];

const relatedWords: Record<string, string[]> = {
  ai: ["Mind", "Nova", "Pilot"],
  coffee: ["Bean", "Roast", "Brew"],
  dog: ["Paw", "Wag", "Pack"],
  fitness: ["Fit", "Flex", "Pulse"],
  note: ["Memo", "Mind", "Page"],
  notes: ["Memo", "Mind", "Page"],
  pet: ["Paw", "Nest", "Buddy"],
  smart: ["Bright", "Pilot", "Nova"],
  trainer: ["Train", "Coach", "Pilot"],
  training: ["Train", "Coach", "Pilot"],
};

const stems: Record<string, string> = {
  trainer: "Train",
  training: "Train",
};

function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function cleanKeywords(keywords: string[]) {
  return keywords
    .flatMap((keyword) => keyword.split(/\s+/))
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean)
    .map(titleCase);
}

function blendWords(firstWord: string, secondWord: string) {
  const firstPart = firstWord.slice(0, Math.min(4, firstWord.length));
  const secondPart = secondWord.slice(0, Math.min(4, secondWord.length));

  return `${titleCase(firstPart)}${titleCase(secondPart)}`;
}

function joinName(...parts: string[]) {
  return parts.filter(Boolean).map(titleCase).join("");
}

function withEnding(word: string, ending: string) {
  const compactEnding = ["ly", "io", "ai"].includes(ending) ? ending : titleCase(ending);

  return `${titleCase(word)}${compactEnding}`;
}

function createNameIdeas(keywords: string[]) {
  const words = cleanKeywords(keywords);
  const related = words.flatMap((word) => relatedWords[word.toLowerCase()] ?? []);
  const stemmedWords = words.map((word) => stems[word.toLowerCase()] ?? word);
  const brandWords = [...stemmedWords, ...related];
  const firstWord = brandWords[0] ?? "Name";
  const secondWord = brandWords[1] ?? firstWord;
  const thirdWord = brandWords[2] ?? secondWord;
  const combinedWords = words.map(titleCase).join("") || firstWord;
  const relatedOne = related[0] ?? firstWord;
  const relatedTwo = related[1] ?? secondWord;
  const relatedThree = related[2] ?? thirdWord;
  const shortBlend = blendWords(firstWord, secondWord);
  const ideas = [
    withEnding(firstWord, creativeEndings[4]),
    withEnding(secondWord, creativeEndings[0]),
    joinName(thirdWord, relatedOne),
    joinName(relatedOne, "pilot"),
    withEnding(firstWord, creativeEndings[11]),
    withEnding(secondWord, creativeEndings[6]),
    combinedWords,
    withEnding(relatedOne, creativeEndings[3]),
    withEnding(firstWord, creativeEndings[12]),
    withEnding(secondWord, creativeEndings[9]),
    withEnding(thirdWord, creativeEndings[5]),
    withEnding(relatedOne, creativeEndings[7]),
    withEnding(shortBlend, creativeEndings[10]),
    withEnding(relatedTwo, creativeEndings[8]),
    withEnding(relatedThree, creativeEndings[1]),
  ];
  const uniqueIdeas = Array.from(new Set(ideas.map((idea) => idea.replace(/\s+/g, ""))));

  creativeEndings.forEach((ending, index) => {
    if (uniqueIdeas.length < 12) {
      const word = brandWords[index % brandWords.length] ?? firstWord;
      const fallbackIdea = withEnding(word, ending);

      if (!uniqueIdeas.includes(fallbackIdea)) {
        uniqueIdeas.push(fallbackIdea);
      }
    }
  });

  return uniqueIdeas.slice(0, 12);
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
    <main className="flex min-h-screen items-start justify-center bg-[#050806] px-4 py-12 sm:py-16">
      <div className="w-full max-w-lg rounded-2xl border border-[#1f3528] bg-[#0b0f0d] p-6 shadow-[0_22px_70px_rgba(56,255,145,0.12)] sm:p-8">
        <h1 className="text-center text-4xl font-semibold tracking-tight text-white">
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
            className="min-w-0 flex-1 rounded-xl border border-[#24382d] bg-[#111713] px-4 py-3 text-base text-white outline-none placeholder:text-[#718073] hover:border-[#365643] focus:border-[#5cff9d] focus:ring-4 focus:ring-[#5cff9d]/15"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="rounded-xl bg-[#5cff9d] px-5 py-3 text-sm font-semibold text-[#061008] shadow-[0_8px_24px_rgba(92,255,157,0.18)] hover:bg-[#9affc1] focus:outline-none focus:ring-4 focus:ring-[#5cff9d]/20"
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
                className="rounded-full border border-[#385542] bg-[#101712] px-3 py-1.5 text-sm font-medium text-[#b9f6cc] hover:border-[#5cff9d] hover:bg-[#142218]"
              >
                {keyword} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={generateIdeas}
          className="mt-7 w-full rounded-xl bg-[#5cff9d] px-4 py-3 text-base font-semibold text-[#061008] shadow-[0_10px_30px_rgba(92,255,157,0.2)] hover:bg-[#9affc1] focus:outline-none focus:ring-4 focus:ring-[#5cff9d]/20"
        >
          Generate
        </button>

        {error && <p className="mt-4 text-sm font-medium text-[#ff8c8c]">{error}</p>}

        {ideas.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white">Generated names</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {ideas.map((idea) => (
                <li
                  key={idea}
                  className="cursor-pointer rounded-full border border-[#3d7d55] bg-[#111713] px-4 py-2 text-sm font-semibold text-[#d7ffe4] shadow-[0_0_18px_rgba(92,255,157,0.08)] hover:border-[#5cff9d] hover:bg-[#16231a] hover:text-white"
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
