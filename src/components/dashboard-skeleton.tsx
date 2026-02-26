export function DashboardSkeleton() {
  return (
    <main className="mx-auto max-w-[1600px] px-6 py-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-24 rounded-md bg-white/5 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse border border-white/10" />
        ))}
      </div>
      <div className="space-y-4">
        <div className="h-10 w-96 rounded-md bg-white/5 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-white/5 animate-pulse border border-white/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
