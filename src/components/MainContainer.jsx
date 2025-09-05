import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies?.length) return null;

  const mainMovie = movies[0];
  const { original_title: title, overview, id } = mainMovie;

  return (
    <section className="relative isolate w-full aspect-video bg-black">
      <VideoBackground movieID={id} />
      <VideoTitle title={title} overview={overview} />
    </section>
  );
};

export default MainContainer;
