import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GPTMoviesSuggestion = () => {
  // Expect: gpt.gptMovies = Array<Array<TMDBMovie>>
  const buckets = useSelector((s) => s?.gpt?.gptMovies) ?? [];

  const groups = useMemo(() => {
    if (!Array.isArray(buckets)) return [];

    return buckets
      .map((raw, idx) => {
        if (!Array.isArray(raw)) return null;

        const seen = new Set();
        const movies = raw
          .filter(Boolean)
          .filter((m) => typeof m === "object")
          .filter((m) => m?.id && !seen.has(m.id))
          .map((m) => ({
            ...m,
            title: m.title || m.name || m.original_title || m.original_name || "Untitled",
            poster_path: m.poster_path || m.backdrop_path || null,
          }))
          .filter((m) => {
            seen.add(m.id);
            return !!m.poster_path;
          });

        if (!movies.length) return null;

        const title = raw?.bucketTitle || movies[0]?.collection?.name || movies[0]?.title || `Suggestions #${idx + 1}`;

        return { key: `${idx}-${movies[0].id}`, title, movies };
      })
      .filter(Boolean);
  }, [buckets]);

  const total = useMemo(() => groups.reduce((sum, g) => sum + g.movies.length, 0), [groups]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 bg-black">
      <header className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">Search Results</h2>
          <p className="text-sm text-white/60" aria-live="polite">
            {total ? `${total} result${total > 1 ? "s" : ""} in ${groups.length} group${groups.length > 1 ? "s" : ""}` : "Nothing yet"}
          </p>
        </div>
      </header>

      {groups.length ? (
        <div className="space-y-8">
          {groups.map(({ key, title, movies }) => (
            <MoviesList key={key} title={title} movies={movies} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          No results yet. Try prompts like:
          <ul className="mt-2 list-disc pl-5 text-white/60">
            <li>
              Heist movies like <span className="italic">Ocean’s Eleven</span>
            </li>
            <li>Rom-coms from the 90s</li>
            <li>Movies where a robot is the main character</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default GPTMoviesSuggestion;
