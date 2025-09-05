import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieID }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieID);

  if (!trailerVideo?.key) {
    return <div className="w-full h-full aspect-video bg-gradient-to-br from-zinc-900 to-black animate-pulse" />;
  }

  const src =
    `https://www.youtube.com/embed/${trailerVideo.key}` + `?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&vq=hd1080`;

  return (
    <div className="absolute inset-0 -z-10">
      {/* background video */}
      <iframe
        className="h-full w-full pointer-events-none"
        src={src}
        title="Movie trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      {/* subtle vignettes for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
    </div>
  );
};

export default VideoBackground;
