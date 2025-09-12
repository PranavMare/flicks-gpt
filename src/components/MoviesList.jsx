import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const hasMovies = Array.isArray(movies) && movies.length > 0;

  useEffect(() => {
    if (!hasMovies) return;
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanLeft(scrollLeft > 2);
      setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [hasMovies]);

  if (!hasMovies) return null; // render guard comes AFTER Hooks

  const nudge = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="px-4 md:px-8">
      <h2 className="py-3 text-base font-semibold tracking-tight text-white/95 sm:text-lg md:py-4 md:text-2xl lg:text-3xl">
        {title}
      </h2>

      <div className="relative">
        {/* left/right fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />

        {/* free-scroll rail */}
        <div
          ref={scrollerRef}
          className="flex touch-pan-y snap-x snap-mandatory flex-nowrap items-start gap-1 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pr-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1.5 md:gap-2 [&::-webkit-scrollbar]:hidden"
          aria-label={`${title} movies`}
        >
          {movies.map((m) => (
            <div key={m.id} className="shrink-0 p-px sm:p-0.5 md:p-[3px]">
              <MovieCard posterPath={m.poster_path} movieId={m.id} />
            </div>
          ))}
        </div>

        {/* overlay arrows that nudge scroll */}
        {canLeft && (
          <button
            onClick={() => nudge(-1)}
            aria-label="Scroll left"
            className="absolute top-1/2 left-2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20 focus:ring-2 focus:ring-white/40 focus:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              className="mx-auto h-6 w-6"
              fill="currentColor"
            >
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}
        {canRight && (
          <button
            onClick={() => nudge(1)}
            aria-label="Scroll right"
            className="absolute top-1/2 right-2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20 focus:ring-2 focus:ring-white/40 focus:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              className="mx-auto h-6 w-6"
              fill="currentColor"
            >
              <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesList;
