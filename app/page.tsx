"use client";

import { useState } from "react";

type Category = "pets" | "productivity" | "coffee" | "health" | "business" | "general";
type NamingStyle = "blend" | "premium" | "minimal" | "future" | "emotional" | "playful" | "startup";

const categorySignals: Record<Category, string[]> = {
  pets: ["dog", "puppy", "pup", "pet", "paw", "bark", "tail", "trainer", "training", "leash"],
  productivity: ["ai", "note", "notes", "focus", "memo", "productivity", "think", "task", "sync"],
  coffee: ["coffee", "bean", "beans", "brew", "roast", "espresso", "cup", "cafe"],
  health: ["fitness", "fit", "gym", "health", "workout", "run", "wellness", "yoga"],
  business: ["finance", "money", "bank", "wealth", "cash", "business", "market", "fund"],
  general: [],
};

const semanticBanks: Record<Category, string[]> = {
  pets: ["paw", "bark", "tail", "pup", "calm", "trust", "guide", "leash", "buddy", "wag", "bond", "pack"],
  productivity: ["mind", "memo", "clarity", "think", "sync", "focus", "flow", "logic", "pulse", "bright", "notion"],
  coffee: ["brew", "roast", "aroma", "bean", "cozy", "cup", "warm", "steam", "crema", "daily", "mellow"],
  health: ["fit", "pulse", "vital", "flex", "core", "lift", "move", "boost", "tone", "stride", "peak"],
  business: ["coin", "capital", "ledger", "wealth", "vault", "trust", "margin", "fund", "bloom", "rise"],
  general: ["nova", "luma", "mora", "zen", "nexa", "vibe", "clear", "spark", "orbit", "kind", "bright"],
};

const styleParts: Record<NamingStyle, string[]> = {
  blend: ["ora", "via", "io", "iq", "ly", "exa", "rix", "tix"],
  premium: ["luxe", "mora", "aura", "alto", "prime", "velvet"],
  minimal: ["one", "co", "go", "up", "now"],
  future: ["nexa", "nova", "zen", "logic", "signal", "matrix"],
  emotional: ["calm", "bond", "kind", "warm", "bright", "true"],
  playful: ["poppy", "buddy", "fox", "wag", "bloom", "vibe"],
  startup: ["ly", "io", "iq", "exa", "ora", "pulse"],
};

const stemMap: Record<string, string> = {
  puppy: "pup",
  trainer: "train",
  training: "train",
  notes: "note",
  fitness: "fit",
  money: "coin",
};

function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function cleanKeywords(keywords: string[]) {
  return keywords
    .flatMap((keyword) => keyword.split(/\s+/))
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

function detectCategory(words: string[]): Category {
  const scores = Object.entries(categorySignals).map(([category, signals]) => ({
    category: category as Category,
    score: words.filter((word) => signals.includes(word)).length,
  }));
  const bestCategory = scores.sort((first, second) => second.score - first.score)[0];

  return bestCategory.score > 0 ? bestCategory.category : "general";
}

function getSemanticWords(category: Category, words: string[]) {
  const directWords = words.map((word) => stemMap[word] ?? word);
  const bankWords = semanticBanks[category];
  const modernFlavor = shuffle(semanticBanks.general).slice(0, 4);

  return Array.from(new Set([...directWords, ...bankWords, ...modernFlavor]));
}

function splitWord(word: string) {
  const cleanWord = word.toLowerCase();
  const vowelIndex = cleanWord.slice(1).search(/[aeiouy]/);
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

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function blendWords(firstWord: string, secondWord: string, style: NamingStyle) {
  const first = splitWord(firstWord);
  const second = splitWord(secondWord);
  const endings = styleParts[style];
  const blends = [
    `${titleCase(first.start)}${titleCase(second.shortEnd)}`,
    `${titleCase(first.shortStart)}${titleCase(second.end)}`,
    `${first.shortStart}${randomItem(endings)}`,
    `${second.shortStart}${randomItem(endings)}`,
    `${firstWord}${secondWord}`.slice(0, 12),
  ];

  return randomItem(blends);
}

function joinName(...parts: string[]) {
  return parts.filter(Boolean).map(titleCase).join("");
}

function pronounceableScore(name: string) {
  const lowerName = name.toLowerCase();
  const vowels = (lowerName.match(/[aeiouy]/g) ?? []).length;
  const consonantClusters = (lowerName.match(/[bcdfghjklmnpqrstvwxyz]{4,}/g) ?? []).length;

  return vowels * 3 - consonantClusters * 12;
}

function hasAwkwardPattern(name: string) {
  const lowerName = name.toLowerCase();
  const half = lowerName.slice(0, lowerName.length / 2);
  const repeatsItself = lowerName.length % 2 === 0 && half === lowerName.slice(lowerName.length / 2);

  return repeatsItself || /([bcdfghjklmnpqrstvwxyz]{5,}|[aeiou]{4,}|(.)\2{2,})/i.test(name);
}

function normalizeName(name: string) {
  const clean = name.replace(/[^a-zA-Z]/g, "");

  if (!clean) {
    return "";
  }

  return clean
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map(titleCase)
    .join("");
}

function scoreName(name: string, categoryWords: string[]) {
  let score = 50;
  const lowerName = name.toLowerCase();
  const genericWords = semanticBanks.general;

  if (name.length >= 5 && name.length <= 10) score += 25;
  if (name.length > 12) score -= 30;
  if (categoryWords.some((word) => lowerName.includes(word.slice(0, 3)))) score += 26;
  if (!categoryWords.some((word) => lowerName.includes(word.slice(0, 3)))) score -= 22;
  if (genericWords.some((word) => lowerName === word || lowerName.startsWith(word))) score -= 10;
  if (styleParts.emotional.some((word) => lowerName.includes(word))) score += 3;
  if (styleParts.future.some((word) => lowerName.includes(word))) score += 6;
  if (/(hub|base|works|company|pilot|spark|flow|lab)$/i.test(name)) score -= 18;
  if (hasAwkwardPattern(name)) score -= 80;

  return score + pronounceableScore(name) + Math.random() * 12;
}

function isGoodName(name: string) {
  return name.length >= 4 && name.length <= 14 && !hasAwkwardPattern(name) && pronounceableScore(name) > -4;
}

function generateCandidates(words: string[], semanticWords: string[]) {
  const styles: NamingStyle[] = ["blend", "premium", "minimal", "future", "emotional", "playful", "startup"];
  const candidates = new Set<string>();

  for (let index = 0; index < 160; index += 1) {
    const style = randomItem(styles);
    const first = randomItem(semanticWords);
    const second = randomItem(shuffle([...words, ...semanticWords]).filter((word) => word !== first));
    const part = randomItem(styleParts[style]);

    if (style === "blend") candidates.add(blendWords(first, second, style));
    if (style === "premium") candidates.add(joinName(first, part));
    if (style === "minimal") candidates.add(joinName(first, second).slice(0, 10));
    if (style === "future") candidates.add(Math.random() > 0.5 ? joinName(first, part) : blendWords(first, part, style));
    if (style === "emotional") candidates.add(joinName(part, first).slice(0, 12));
    if (style === "playful") candidates.add(blendWords(first, part, style));
    if (style === "startup") candidates.add(joinName(splitWord(first).shortStart, part));
  }

  return Array.from(candidates);
}

function filterBestNames(candidates: string[], semanticWords: string[]) {
  const rankedNames = candidates
    .map(normalizeName)
    .filter(isGoodName)
    .filter((name, index, names) => names.indexOf(name) === index)
    .map((name) => ({ name, score: scoreName(name, semanticWords) }))
    .sort((first, second) => second.score - first.score)
    .map(({ name }) => name);
  const chosenNames: string[] = [];
  const rootCounts: Record<string, number> = {};

  rankedNames.forEach((name) => {
    const root = name.slice(0, 4).toLowerCase();

    if (chosenNames.length < 12 && (rootCounts[root] ?? 0) < 2) {
      chosenNames.push(name);
      rootCounts[root] = (rootCounts[root] ?? 0) + 1;
    }
  });

  rankedNames.forEach((name) => {
    if (chosenNames.length < 12 && !chosenNames.includes(name)) {
      chosenNames.push(name);
    }
  });

  return chosenNames.slice(0, 12);
}

function createNameIdeas(keywords: string[]) {
  const words = cleanKeywords(keywords);
  const category = detectCategory(words);
  const categoryWords = Array.from(new Set([...words.map((word) => stemMap[word] ?? word), ...semanticBanks[category]]));
  const semanticWords = getSemanticWords(category, words);
  const candidates = generateCandidates(words, semanticWords);
  const bestNames = filterBestNames(candidates, categoryWords);

  return shuffle(bestNames).slice(0, 12);
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

  function resetSession() {
    setInput("");
    setKeywords([]);
    setIdeas([]);
    setError("");
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

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={generateIdeas}
            className="flex-1 rounded-xl bg-[#5cff9d] px-4 py-3 text-base font-semibold text-[#061008] shadow-[0_10px_30px_rgba(92,255,157,0.2)] hover:bg-[#9affc1] focus:outline-none focus:ring-4 focus:ring-[#5cff9d]/20"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={resetSession}
            className="rounded-xl border border-[#385542] bg-[#101712] px-4 py-3 text-sm font-semibold text-[#b9f6cc] hover:border-[#5cff9d] hover:bg-[#142218] focus:outline-none focus:ring-4 focus:ring-[#5cff9d]/10"
          >
            Reset
          </button>
        </div>

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
