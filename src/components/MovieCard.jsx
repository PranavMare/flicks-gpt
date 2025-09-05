// MovieCard.jsx
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div
      className="
        group relative shrink-0 snap-start
        w-28 sm:w-36 md:w-44 lg:w-52
      "
    >
      <div
        className="
          aspect-[2/3] overflow-hidden rounded-xl
          bg-zinc-800/40 ring-1 ring-white/10
          shadow-lg shadow-black/40
          transition-transform duration-200
          group-hover:scale-[1.02]
          motion-reduce:transform-none
        "
      >
        <img
          alt="Movie poster"
          src={IMG_CDN + posterPath}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          sizes="(min-width: 1024px) 13rem, (min-width: 768px) 11rem, (min-width: 640px) 9rem, 7rem"
        />
      </div>
    </div>
  );
};
export default MovieCard;
