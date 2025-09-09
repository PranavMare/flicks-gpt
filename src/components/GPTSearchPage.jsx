import React from "react";
import GPTMoviesSuggestion from "./GPTMoviesSuggestion";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearchPage = () => {
  return (
    <div className="relative min-h-[100svh] bg-black overflow-x-hidden">
      <div aria-hidden className="fixed inset-0 -z-20 bg-black" />

      <img src="/background.jpeg" alt="" className="fixed inset-0  h-full w-full object-cover object-center pointer-events-none" loading="eager" />

      <div aria-hidden className="fixed inset-0 -z-10 bg-black/60" />

      <div className="relative z-0">
        <GPTSearchBar />
        <div className="mt-10">
          <GPTMoviesSuggestion />
        </div>
      </div>
    </div>
  );
};

export default GPTSearchPage;
