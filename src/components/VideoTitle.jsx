import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 flex items-center">
      <div className="px-[5%] py-[6%] text-white max-w-2xl md:max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{title}</h1>

        <p
          className="
            mt-4 md:mt-6 text-sm md:text-lg opacity-90
            line-clamp-3 md:line-clamp-4
            [text-wrap:balance]
          "
        >
          {overview}
        </p>

        <div className="mt-5 md:mt-7 flex gap-3">
          <button
            className="
              inline-flex items-center gap-2
              rounded-lg bg-white text-black
              px-5 md:px-7 py-2.5 md:py-3
              text-sm md:text-lg font-semibold
              shadow-lg shadow-black/30
              hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60
            "
            aria-label="Play"
          >
            {/* play icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>

          <button
            className="
              inline-flex items-center gap-2
              rounded-lg bg-white/15 text-white
              px-5 md:px-6 py-2.5 md:py-3
              text-sm md:text-lg font-semibold
              ring-1 ring-white/20 backdrop-blur
              hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40
            "
            aria-label="More information"
          >
            {/* info icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11 7h2v2h-2zM11 11h2v6h-2z" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                       10-4.48 10-10S17.52 2 12 2zm0 18
                       c-4.41 0-8-3.59-8-8s3.59-8 8-8
                       8 3.59 8 8-3.59 8-8 8z"
              />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
