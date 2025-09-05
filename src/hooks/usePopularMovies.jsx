// hooks/usePopularMovies.js
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((s) => s.movies.popularMovies);

  useEffect(() => {
    if (popularMovies?.length) return;
    (async () => {
      const res = await fetch("/api/tmdb/movie/popular?language=en-US&page=1");
      const json = await res.json();
      dispatch(addPopularMovies(json?.results ?? []));
    })();
  }, [dispatch, popularMovies]);
};
