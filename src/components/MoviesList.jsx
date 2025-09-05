// MoviesList.jsx
import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  if (!movies?.length) return null;

  return (
    <section className="px-4 md:px-8">
      <h2
        className="
          text-base sm:text-lg md:text-2xl lg:text-3xl
          font-semibold tracking-tight text-white/95
          py-3 md:py-4
        "
      >
        {title}
      </h2>

      <div className="relative">
        {/* left/right fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />

        <div
          className="
            flex gap-3 md:gap-4 pr-4
            overflow-x-auto scroll-smooth snap-x snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
          aria-label={`${title} movies`}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default MoviesList;
