import { NameForm } from "@/components/NameForm";
import type { NameType } from "@/lib/nameGenerator";

type HeroProps = {
  error: string;
  isLoading: boolean;
  onGenerate: (keywords: string, type: NameType) => void;
};

export function Hero({ error, isLoading, onGenerate }: HeroProps) {
  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:py-16">
      <div className="max-w-3xl">
        <p className="mb-5 inline-flex rounded-full border border-basil/20 bg-basil/10 px-3 py-1 text-sm font-semibold text-basil shadow-sm dark:border-citron/25 dark:bg-citron/10 dark:text-citron">
          Creative naming studio
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-normal text-ink dark:text-white sm:text-5xl lg:text-6xl">
          Generate better names for your next idea
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/65">
          Enter a few keywords and choose the kind of name you need. NameSpark
          instantly drafts creative options for projects, startups, apps,
          products, and brands.
        </p>
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
          {[
            ["12", "name ideas"],
            ["1 sec", "mock run"],
            ["0", "setup needed"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-lg border border-black/10 bg-white/58 p-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.05]"
            >
              <p className="text-xl font-bold text-ink dark:text-white">{value}</p>
              <p className="mt-1 text-xs font-medium text-black/50 dark:text-white/50">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <NameForm error={error} isLoading={isLoading} onGenerate={onGenerate} />
    </section>
  );
}
