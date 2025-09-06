import React from "react";
import { useSelector } from "react-redux";
import { lang } from "./../utils/languageConstants";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[15%] px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto max-w-2xl flex items-center gap-2
                   rounded-xl bg-black/70 backdrop-blur-sm p-2
                   shadow-xl ring-1 ring-white"
      >
        <label htmlFor="gpt-search" className="sr-only">
          Search
        </label>

        <input
          id="gpt-search"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="flex-1 h-11 bg-transparent text-white placeholder-white/70
                     px-3 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="h-11 rounded-md bg-blue-600 px-5 text-white font-medium
                     hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
