import { Link } from "react-router-dom";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath, movieId }) => {
  if (!posterPath) return null;

  return (
    <div className="group relative w-28 shrink-0 snap-start sm:w-36 md:w-44 lg:w-52">
      <div className="aspect-[2/3] overflow-hidden rounded-xl bg-zinc-800/40 shadow-lg ring-1 shadow-black/40 ring-white/10 transition-transform duration-200 group-hover:scale-[1.02] motion-reduce:transform-none">
        <Link to={"/browse/" + movieId}>
          <img
            alt="Movie poster"
            src={IMG_CDN + posterPath}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 13rem, (min-width: 768px) 11rem, (min-width: 640px) 9rem, 7rem"
          />
        </Link>
      </div>
    </div>
  );
};
export default MovieCard;
