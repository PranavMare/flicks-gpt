import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute pt-[10%] px-[5%] text-white aspect-video bg-gradient-to-r from-black ">
      <h1 className="text-5xl font-semibold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="space-x-2">
        <button className="bg-white/80 text-black font-semibold align-text-center p-4 px-16 text-xl rounded-lg hover:bg-white/70">Play</button>
        <button className="  bg-gray-500/65 text-white align-text-center p-4 px-10 text-xl rounded-lg mx-2 hover:bg-gray-500/40">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
