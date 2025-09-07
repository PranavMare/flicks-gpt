import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lang } from "./../utils/languageConstants";
import { addGPTMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  // Always return an array of TMDB movie objects
  const searchMovieTMDB = async (movie) => {
    const url = `/api/tmdb/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`;
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.status_message || `TMDB HTTP ${res.status}`);
    }

    return Array.isArray(json.results) ? json.results : [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const prompt = searchText.current?.value?.trim();
    if (!prompt) return;

    setLoading(true);
    setErr("");

    try {
      // 1) Ask your OpenAI endpoint for titles
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      // Either server gives { movies: [...] } or { text: "a, b, c" }
      const titles = Array.isArray(data.movies)
        ? data.movies
        : String(data.text || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

      // 2) Fetch TMDB for each title in parallel (limit to first 10 to be nice)
      const lists = await Promise.all(
        titles.slice(0, 10).map(async (t) => {
          const arr = await searchMovieTMDB(t);
          // If you only want the top hit per title, return arr[0] instead:
          // return arr[0] ?? null;
          return arr;
        })
      );

      // 4) Put movie objects into Redux
      dispatch(addGPTMovieResult(lists));
    } catch (e) {
      setErr(e.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[15%] px-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl flex items-center gap-2 rounded-xl bg-black/70 backdrop-blur-sm p-2 shadow-xl ring-1 ring-white"
      >
        <label htmlFor="gpt-search" className="sr-only">
          Search
        </label>
        <input
          id="gpt-search"
          type="text"
          ref={searchText}
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="flex-1 h-11 bg-transparent text-white placeholder-white/70 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="h-11 rounded-md bg-blue-600 px-5 text-white font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Thinking..." : lang[langKey].search}
        </button>
      </form>

      {err && <p className="mt-3 text-red-400 text-sm">{err}</p>}
    </div>
  );
};

export default GPTSearchBar;
