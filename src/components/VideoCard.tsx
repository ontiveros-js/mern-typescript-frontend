import { Istate } from "../context/Context";
import axios from "axios";
import ReactP from "react-player";
import { useContexto } from "../Hook/useContexto";
import { useNavigate } from "react-router-dom";
import { format, register } from "timeago.js";

interface Props {
  video: Istate;
}

register(
  "es_ES",
  (number, index, total_sec): any =>
    [
      ["justo ahora", "ahora mismo"],
      ["hace %s segundos", "en %s segundos"],
      ["hace 1 minuto", "en 1 minuto"],
      ["hace %s minutos", "en %s minutos"],
      ["hace 1 hora", "en 1 hora"],
      ["hace %s horas", "en %s horas"],
      ["hace 1 dia", "en 1 dia"],
      ["hace %s dias", "en %s dias"],
      ["hace 1 semana", "en 1 semana"],
      ["hace %s semanas", "en %s semanas"],
      ["1 mes", "en 1 mes"],
      ["hace %s meses", "en %s meses"],
      ["hace 1 año", "en 1 año"],
      ["hace %s años", "en %s años"],
    ][index]
);

const timeago = (timestamp: string) => format(timestamp, "es_ES");

const VideoCard = ({ video }: Props) => {
  const { setInputsValue, fetching } = useContexto();
  const navigate = useNavigate();

  const deleteVideo = async () => {
    await axios.delete("http://localhost:3001/videos/" + video._id);
    fetching();
  };

  const updateVideo = async () => {
    const oneVideo = await axios("http://localhost:3001/videos/" + video._id);
    const { title, description, url, _id } = oneVideo.data;
    setInputsValue({ title, description, url, _id });
    navigate("/form");
  };

  return (
    <div className="card mb-3">
      <h3 className="card-header">{video.title}</h3>
      <ReactP url={video.url} width="100%" controls />
      <div className="card-body">
        <p className="card-text">{video.description}</p>
      </div>
      <div className="card-body">
        <button className="btn btn-primary m-1" onClick={updateVideo}>
          Actualizar
        </button>
        <button className="btn btn-danger m-1" onClick={deleteVideo}>
          Eliminar
        </button>
      </div>
      <div className="card-footer text-muted">{timeago(video.createdAt)}</div>
    </div>
  );
};

export default VideoCard;
