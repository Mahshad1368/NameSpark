import { NameForm } from "@/components/NameForm";
import type { NameType } from "@/lib/nameGenerator";

type HeroProps = {
  error: string;
  isLoading: boolean;
  onGenerate: (keywords: string, type: NameType) => void;
};

export function Hero({ error, isLoading, onGenerate }: HeroProps) {
  return (
    <section className="grid gap-8 py-8 lg:grid-cols-[1fr_440px] lg:items-center lg:py-14">
      <div className="max-w-3xl">
        <p className="mb-4 inline-flex rounded-full border border-basil/20 bg-basil/10 px-3 py-1 text-sm font-semibold text-basil dark:border-citron/25 dark:bg-citron/10 dark:text-citron">
          Creative naming studio
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-normal text-ink dark:text-white sm:text-5xl lg:text-6xl">
          Generate better names for your next idea
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/65">
          Enter a few keywords and choose the kind of name you need. NameSpark
          instantly drafts creative options for projects, startups, apps,
          products, and brands.
        </p>
      </div>

      <NameForm error={error} isLoading={isLoading} onGenerate={onGenerate} />
    </section>
  );
}
