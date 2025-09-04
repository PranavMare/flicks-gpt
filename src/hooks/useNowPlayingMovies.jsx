import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      // hits your Cloud Function
      const res = await fetch("/api/tmdb/movie/now_playing?language=en-US&page=1");
      const json = await res.json();
      dispatch(addNowPlayingMovies(json?.results ?? []));
    };
    getNowPlayingMovies();
  }, [dispatch]);
};
