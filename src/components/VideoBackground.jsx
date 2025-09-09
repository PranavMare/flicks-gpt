import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieID }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieID);

  if (!trailerVideo?.key) {
    return <div className="w-full h-full aspect-video bg-gradient-to-br from-zinc-900 to-black animate-pulse" />;
  }

  const src =
    `https://www.youtube.com/embed/${trailerVideo.key}` +
    `?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&vq=hd1080&disablekb=1`;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Shift + zoom the video so YT top bar is off-screen */}
      <div className="absolute inset-0 origin-top scale-[1.3] -translate-y-16 sm:-translate-y-20 md:-translate-y-24 lg:-translate-y-28">
        <iframe
          className="h-full w-full pointer-events-none"
          src={src}
          title="Movie trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-28 sm:h-32 md:h-36 bg-black z-10" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
    </div>
  );
};

export default VideoBackground;
