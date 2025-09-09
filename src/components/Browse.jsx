// Browse.jsx
import Header from "./Header";
import { useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GPTSearchPage from "./GPTSearchPage";
import BrowseShimmer from "./BrowseShimmer";

import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";

const Browse = () => {
  const showGPTSearch = useSelector((s) => s.gpt.showGPTSearch);
  const { nowPlayingMovies, topRatedMovies, popularMovies, upcomingMovies } = useSelector((s) => s.movies ?? {});

  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();

  const hasAny = [nowPlayingMovies, topRatedMovies, popularMovies, upcomingMovies].some((arr) => Array.isArray(arr) && arr.length > 0);

  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearchPage />
      ) : hasAny ? (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      ) : (
        <BrowseShimmer />
      )}
    </div>
  );
};

export default Browse;
