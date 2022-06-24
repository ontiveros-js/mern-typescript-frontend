import { useContexto } from "../Hook/useContexto";
import VideoCard from "./VideoCard";

const VideoList = () => {
  const { data } = useContexto();
  return (
    <>
      {data.length ? (
        data.map((video) => <VideoCard video={video} key={video._id} />)
      ) : (
        <h1>No hay videos guardados</h1>
      )}
    </>
  );
};

export default VideoList;
