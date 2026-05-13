"use client";

import { useState } from "react";

const creativeEndings = ["ly", "io", "ai", "flow", "mind", "nest", "spark", "lab", "fox", "pulse", "vibe", "nova", "zen", "iq", "rix", "exa", "ora", "tix", "enix", "mora"];
const modernPrefixes = ["Nova", "Velo", "Nexa", "Luma", "Zeno", "Mora", "Astra"];

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
  dog: "Dog",
  smart: "Smart",
  trainer: "Train",
  training: "Train",
};

type NamingStyle = "modern" | "tech" | "premium" | "playful" | "minimal";

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

function splitWord(word: string) {
  const cleanWord = titleCase(word);
  const vowelIndex = cleanWord.slice(1).search(/[aeiouy]/i);
  const naturalMiddle = vowelIndex >= 0 ? vowelIndex + 2 : Math.ceil(cleanWord.length / 2);
  const middle = Math.max(2, Math.min(cleanWord.length - 1, naturalMiddle));

  return {
    start: cleanWord.slice(0, middle),
    shortStart: cleanWord.length <= 6 ? cleanWord : cleanWord.slice(0, 4),
    end: cleanWord.slice(middle),
    shortEnd: cleanWord.slice(Math.max(1, cleanWord.length - 4)),
  };
}

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function blendWords(firstWord: string, secondWord: string) {
  const first = titleCase(firstWord);
  const second = titleCase(secondWord);
  const joined = joinName(first, second);
  const overlapped = first.endsWith(second.charAt(0))
    ? `${first}${second.slice(1)}`
    : joined;
  const blends = [
    joined,
    overlapped,
    withEnding(first, randomItem(["ly", "iq", "rix", "exa", "ora", "tix", "enix"])),
    withEnding(second, randomItem(["flow", "mind", "nest", "spark", "nova", "zen"])),
  ].filter((name) => name.length <= 12);

  return randomItem(blends.length > 0 ? blends : [withEnding(first, "ly")]);
}

function joinName(...parts: string[]) {
  return parts.filter(Boolean).map(titleCase).join("");
}

function withEnding(word: string, ending: string) {
  const compactEnding = ["ly", "io", "ai", "iq", "rix", "exa", "ora", "tix", "enix", "mora"].includes(ending)
    ? ending
    : titleCase(ending);

  return `${titleCase(word)}${compactEnding}`;
}

function hasAwkwardPattern(name: string) {
  const lowerName = name.toLowerCase();
  const half = lowerName.slice(0, lowerName.length / 2);
  const repeatsItself = lowerName.length % 2 === 0 && half === lowerName.slice(lowerName.length / 2);

  return repeatsItself || /([bcdfghjklmnpqrstvwxyz]{5,}|[aeiou]{4,}|(.)\2{3,})/i.test(name);
}

function cleanName(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, "").replace(/\s+/g, "");
}

function normalizeName(name: string) {
  const clean = cleanName(name);

  if (!clean) {
    return "";
  }

  const wordBreaks = clean.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  return wordBreaks.map(titleCase).join("");
}

function isGoodName(name: string) {
  return name.length >= 4 && name.length <= 14 && !hasAwkwardPattern(name);
}

function generateRandomCombination(words: string[], related: string[], style: NamingStyle) {
  const primary = randomItem(words);
  const secondary = randomItem([...words, ...related]);
  const ending = randomItem(creativeEndings);
  const prefix = randomItem(modernPrefixes);
  const primaryRoot = splitWord(primary).shortStart;

  if (style === "modern") {
    return Math.random() > 0.45
      ? withEnding(primaryRoot, randomItem(["nova", "mora", "exa", "ly"]))
      : joinName(prefix, primary);
  }

  if (style === "tech") {
    return Math.random() > 0.45
      ? withEnding(primaryRoot, randomItem(["ai", "io", "iq", "rix", "tix", "pulse"]))
      : joinName(primary, randomItem(["Pilot", "Nexa", "Logic"]));
  }

  if (style === "premium") {
    return Math.random() > 0.4 ? joinName(primary, randomItem(["Nova", "Zen", "Mora", "Luxe"])) : joinName(prefix, primary);
  }

  if (style === "playful") {
    return Math.random() > 0.5
      ? withEnding(randomItem([...related, primary]), randomItem(["ly", "fox", "vibe", "spark"]))
      : joinName(randomItem([...related, primary]), randomItem(["Nest", "Paw", "Flow"]));
  }

  return Math.random() > 0.5
    ? blendWords(primary, randomItem([...related, secondary]))
    : withEnding(primary, ending);
}

function createNameIdeas(keywords: string[]) {
  const words = cleanKeywords(keywords);
  const related = words.flatMap((word) => relatedWords[word.toLowerCase()] ?? []);
  const stemmedWords = words.map((word) => stems[word.toLowerCase()] ?? word);
  const brandWords = [...new Set([...stemmedWords, ...related])];
  const baseWords = brandWords.length > 0 ? brandWords : ["Name"];
  const styles: NamingStyle[] = ["modern", "tech", "premium", "playful", "minimal"];
  const ideas: string[] = [];

  function addIdea(name: string) {
    const cleanIdea = normalizeName(name);

    if (isGoodName(cleanIdea) && !ideas.includes(cleanIdea)) {
      ideas.push(cleanIdea);
    }
  }

  baseWords.forEach((word, index) => {
    const nextWord = baseWords[(index + 1) % baseWords.length] ?? word;

    addIdea(withEnding(word, randomItem(["ly", "nova", "zen", "spark", "mind", "enix"])));
    addIdea(joinName(word, randomItem(related.length > 0 ? related : baseWords)));
    addIdea(blendWords(word, nextWord));
  });

  for (let index = 0; index < 80 && ideas.length < 12; index += 1) {
    addIdea(generateRandomCombination(baseWords, related, randomItem(styles)));
  }

  for (let index = 0; index < creativeEndings.length && ideas.length < 12; index += 1) {
    addIdea(withEnding(baseWords[index % baseWords.length], creativeEndings[index]));
  }

  return ideas.slice(0, 12);
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
