const steps = [
  {
    number: "01",
    title: "Add keywords",
    description: "Start with a few words that describe the audience, mood, or idea.",
  },
  {
    number: "02",
    title: "Pick a direction",
    description: "Choose whether the name is for a startup, app, product, or brand.",
  },
  {
    number: "03",
    title: "Shortlist fast",
    description: "Copy favorites, save the strongest ideas, and compare them in one place.",
  },
];

export function HowItWorks() {
  return (
    <section className="rounded-lg border border-black/10 bg-white/66 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil dark:text-citron">
            How it works
          </p>
          <h2 className="text-2xl font-semibold text-ink dark:text-white">
            From rough idea to usable names
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-black/55 dark:text-white/55">
          A lightweight workflow for early-stage naming, built for quick exploration.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.number}
            className="rounded-lg border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-basil/30 hover:shadow-soft dark:border-white/10 dark:bg-black/15 dark:hover:border-citron/30"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
              {step.number}
            </p>
            <h3 className="mt-3 text-lg font-bold text-ink dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
