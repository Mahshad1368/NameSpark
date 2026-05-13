export function Header() {
  return (
    <header className="flex items-center justify-between rounded-lg border border-black/10 bg-white/76 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] sm:px-5">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-ink text-lg font-black text-citron shadow-sm dark:bg-citron dark:text-ink">
          N
        </div>
        <div>
          <p className="text-lg font-bold leading-none text-ink dark:text-white">
            NameSpark
          </p>
          <p className="mt-1 text-xs text-black/50 dark:text-white/50">
            Names with a little more signal
          </p>
        </div>
      </div>
      <a
        href="#generator"
        className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-basil hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 dark:bg-white dark:text-ink dark:hover:bg-citron dark:focus:ring-offset-ink"
      >
        Start
      </a>
    </header>
  );
}
