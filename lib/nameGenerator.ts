export const nameTypes = [
  "Startup",
  "App",
  "Product",
  "Personal Brand",
  "Pet Business",
  "Tech Tool",
] as const;

export type NameType = (typeof nameTypes)[number];

export type NameIdea = {
  name: string;
  explanation: string;
  style: "Modern" | "Friendly" | "Premium" | "Playful" | "Minimal";
};

const styles: NameIdea["style"][] = [
  "Modern",
  "Friendly",
  "Premium",
  "Playful",
  "Minimal",
];

const typeSuffixes: Record<NameType, string[]> = {
  Startup: ["Labs", "Works", "Base", "Forge"],
  App: ["ly", "Kit", "Flow", "Loop"],
  Product: ["One", "Craft", "Goods", "Studio"],
  "Personal Brand": ["Co", "Notes", "Method", "House"],
  "Pet Business": ["Paws", "Tails", "Nest", "Club"],
  "Tech Tool": ["Stack", "Grid", "Pilot", "Engine"],
};

const typeAngles: Record<NameType, string[]> = {
  Startup: ["scales well", "feels investor-ready", "sounds ambitious"],
  App: ["feels easy to launch", "sounds useful on a phone", "keeps the tone light"],
  Product: ["feels tangible", "suggests a refined offer", "is simple to package"],
  "Personal Brand": ["feels human", "sounds memorable in a bio", "creates a clear point of view"],
  "Pet Business": ["feels warm", "sounds caring", "keeps the personality approachable"],
  "Tech Tool": ["signals utility", "feels precise", "sounds built for workflow"],
};

const prefixes = [
  "Bright",
  "North",
  "Kind",
  "Clear",
  "Nova",
  "Field",
  "Spark",
  "Orbit",
  "True",
  "Mellow",
  "Prime",
  "Tiny",
];

function cleanKeywords(keywords: string) {
  return keywords
    .split(/[\s,]+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
    .filter(Boolean)
    .slice(0, 4);
}

function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateNames(keywords: string, type: NameType): NameIdea[] {
  const words = cleanKeywords(keywords);
  const seedWords = words.length > 0 ? words : ["idea"];

  return Array.from({ length: 12 }, (_, index) => {
    const word = seedWords[index % seedWords.length];
    const nextWord = seedWords[(index + 1) % seedWords.length];
    const suffix = typeSuffixes[type][index % typeSuffixes[type].length];
    const style = styles[index % styles.length];
    const angle = typeAngles[type][index % typeAngles[type].length];

    const patterns = [
      `${titleCase(word)}${suffix}`,
      `${prefixes[index]} ${titleCase(word)}`,
      `${titleCase(word)} & ${titleCase(nextWord)}`,
      `${titleCase(word)}${titleCase(nextWord)} ${suffix}`,
    ];

    const name = patterns[index % patterns.length];

    return {
      name,
      style,
      explanation: `${name} uses your ${word} theme in a way that ${angle} for a ${type.toLowerCase()}.`,
    };
  });
}
