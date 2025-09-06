import React from "react";
import GPTMoviesSuggestion from "./GPTMoviesSuggestion";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearchPage = () => {
  return (
    <div className="">
      <img src="\background.jpeg" alt="backgrond image" className="absolute -z-10" />
      <GPTSearchBar />
      <GPTMoviesSuggestion />
    </div>
  );
};

export default GPTSearchPage;
