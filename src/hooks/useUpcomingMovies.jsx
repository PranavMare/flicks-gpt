import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((s) => s.movies.upcomingMovies);

  useEffect(() => {
    if (upcomingMovies?.length) return;
    (async () => {
      const res = await fetch("/api/tmdb/movie/upcoming?language=en-US&page=1");
      const json = await res.json();
      dispatch(addUpcomingMovies(json?.results ?? []));
    })();
  }, [dispatch, upcomingMovies]);
};
