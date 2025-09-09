import React from "react";

const PosterSkeleton = () => (
  <div className="w-28 sm:w-36 md:w-44 lg:w-52 shrink-0">
    <div className="aspect-[2/3] rounded-xl bg-zinc-800/60 ring-1 ring-white/10 animate-pulse" />
  </div>
);

const RowSkeleton = ({ titleWidth = "w-48", count = 10 }) => (
  <section className="px-4 md:px-8">
    <div className={`h-6 md:h-8 rounded ${titleWidth} bg-white/10 animate-pulse mb-3 md:mb-4`} />
    <div className="flex flex-nowrap items-start gap-1 sm:gap-1.5 md:gap-2 pr-6 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-px sm:p-0.5 md:p-[3px]">
          <PosterSkeleton />
        </div>
      ))}
    </div>
  </section>
);

const HeroSkeleton = ({ heightClass = "h-[80vh]" }) => (
  <section className={`relative isolate w-full ${heightClass} bg-black`}>
    <div className="absolute inset-0 -z-10">
      <div className="h-full w-full animate-pulse bg-gradient-to-br from-zinc-800/50 via-zinc-700/40 to-zinc-900/60" />
    </div>

    <div aria-hidden className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

    <div className="absolute inset-0 z-10 flex items-end">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 pb-8 md:pb-12">
        <div className="space-y-3 md:space-y-4 w-full max-w-[min(60ch,90%)]">
          <div className="h-8 md:h-12 w-3/5 rounded bg-white/10 animate-pulse" />
          <div className="h-3 md:h-4 w-full rounded bg-white/10 animate-pulse" />
          <div className="h-3 md:h-4 w-11/12 rounded bg-white/10 animate-pulse" />
          <div className="h-3 md:h-4 w-9/12 rounded bg-white/10 animate-pulse" />
          <div className="mt-3 h-10 w-36 rounded-lg bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  </section>
);

const BrowseShimmer = () => (
  <div role="status" aria-busy="true" className="bg-black text-white">
    <HeroSkeleton heightClass="h-[45vh] md:h-[50vh] lg:h-[80vh]" />

    <section className="bg-black">
      <div className="relative z-10 mt-0 bg-gradient-to-b from-transparent via-black/60 to-black pt-6 md:pt-10">
        <div className="pl-3 sm:pl-6 md:pl-12 pb-8 md:pb-12 space-y-4 md:space-y-6 max-w-[1400px] mx-auto">
          <RowSkeleton titleWidth="w-44" count={8} />
          <RowSkeleton titleWidth="w-56" count={10} />
          <RowSkeleton titleWidth="w-40" count={10} />
          <RowSkeleton titleWidth="w-64" count={10} />
        </div>
      </div>
    </section>
  </div>
);

export default BrowseShimmer;
