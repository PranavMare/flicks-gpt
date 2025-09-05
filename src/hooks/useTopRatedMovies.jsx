import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      // hits your Cloud Function
      const res = await fetch("/api/tmdb/movie/top_rated?language=en-US&page=1");
      const json = await res.json();
      dispatch(addTopRatedMovies(json?.results ?? []));
    };
    !topRatedMovies && getTopRatedMovies();
  }, [dispatch]);
};
