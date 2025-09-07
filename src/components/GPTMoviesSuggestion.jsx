import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GPTMoviesSuggestion = () => {
  // gptMovies: Array<Array<TMDBMovie>>
  const buckets = useSelector((store) => store.gpt.gptMovies);

  const hasBuckets = Array.isArray(buckets) && buckets.some((b) => Array.isArray(b) && b.length > 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 bg-black">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold text-white">Search Results</h2>
      </header>

      {hasBuckets ? (
        <div className="space-y-8">
          {buckets.map((list, i) => {
            if (!Array.isArray(list) || list.length === 0) return null;
            const title = list[0]?.title || list[0]?.name || `Suggestions #${i + 1}`;
            return (
              <MoviesList
                key={i}
                title={title}
                movies={list} // show each list as-is (no flattening, no parsing)
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">No results yet. Try searching for a movie or genre.</div>
      )}
    </section>
  );
};

export default GPTMoviesSuggestion;
