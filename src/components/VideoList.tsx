import { useContexto } from "../Hook/useContexto";
import VideoCard from "./VideoCard";

const Hola = () => {
  const { data } = useContexto();
  return (
    <>
      {data.map((video) => (
        <VideoCard video={video} key={video._id} />
      ))}
    </>
  );
};

export default Hola;
