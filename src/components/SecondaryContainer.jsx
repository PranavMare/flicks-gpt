import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Row = ({ title, movies = [] }) => {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanLeft(scrollLeft > 0);
      setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const nudge = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir; // ~one viewport
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (!movies.length) return null;

  return (
    <section className="px-4 md:px-8 group relative">
      <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight text-white/95 py-3 md:py-4">{title}</h2>

      <div className="relative">
        {/* gradient edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />

        {/* horizontal scroller: prevents sideways drift on vertical scroll */}
        <div
          ref={scrollerRef}
          className="
            flex flex-nowrap gap-3 md:gap-4 pr-4
            overflow-x-auto overflow-y-hidden scroll-smooth
            touch-pan-y overscroll-x-contain
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden select-none
          "
        >
          {movies.map((m) => (
            <MovieCard key={m.id} posterPath={m.poster_path} />
          ))}
        </div>

        {/* arrows */}
        {canLeft && (
          <button
            onClick={() => nudge(-1)}
            aria-label="Scroll left"
            className="
              absolute left-2 top-1/2 -translate-y-1/2 z-10
              h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur
              hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40
              opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity
            "
          >
            <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6" fill="currentColor">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}
        {canRight && (
          <button
            onClick={() => nudge(1)}
            aria-label="Scroll right"
            className="
              absolute right-2 top-1/2 -translate-y-1/2 z-10
              h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur
              hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40
              opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity
            "
          >
            <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6" fill="currentColor">
              <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

const SecondaryContainer = () => {
  const { nowPlayingMovies, topRatedMovies, popularMovies, upcomingMovies } = useSelector((s) => s.movies ?? {});

  const rows = [
    { title: "Now Playing", movies: nowPlayingMovies },
    { title: "Top Rated Movies", movies: topRatedMovies },
    { title: "Popular", movies: popularMovies },
    { title: "Upcoming Movies", movies: upcomingMovies },
  ].filter(({ movies }) => Array.isArray(movies) && movies.length);

  if (!rows.length) return null;

  return (
    <section className="bg-black">
      <div className="relative z-20 mt-0 md:-mt-48 lg:-mt-56 bg-gradient-to-b from-transparent via-black/60 to-black">
        <div className="pl-3 sm:pl-6 md:pl-12 pb-8 md:pb-12 space-y-4 md:space-y-6 max-w-[1400px] mx-auto">
          {rows.map(({ title, movies }) => (
            <Row key={title} title={title} movies={movies} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondaryContainer;
