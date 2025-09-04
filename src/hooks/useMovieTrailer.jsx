import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieID) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieID) return;

    const ctrl = new AbortController();

    (async () => {
      try {
        const res = await fetch(`/api/tmdb/movie/${movieID}/videos?language=en-US`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const vids = Array.isArray(json?.results) ? json.results : [];

        // Prefer official trailer → any trailer → first video
        const trailer = vids.find((v) => v.type === "Trailer" && v.official) || vids.find((v) => v.type === "Trailer") || vids[0] || null;

        dispatch(addTrailerVideo(trailer));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Trailer fetch failed:", err);
          dispatch(addTrailerVideo(null));
        }
      }
    })();

    return () => ctrl.abort();
  }, [dispatch, movieID]);
};

export default useMovieTrailer;
