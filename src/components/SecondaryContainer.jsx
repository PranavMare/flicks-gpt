import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

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
            <MoviesList key={title} title={title} movies={movies} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondaryContainer;
