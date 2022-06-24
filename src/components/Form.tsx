import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../Hook/useContexto";
import { toast } from "react-toastify";

const Form = () => {
  let navigate = useNavigate();
  const { setInputsValue, inputsValue, fetching } = useContexto();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputsValue({
      ...inputsValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputsValue._id) {
      try {
        const { title, description, url } = inputsValue;
        const update = await axios.put(
          "https://mern-typescript-doug.herokuapp.com/videos/" +
            inputsValue._id,
          {
            title,
            description,
            url,
          }
        );

        if (update.data.keyValue) {
          if (update.data.keyValue.title)
            return toast.error(
              update.data.keyValue.title + " ya existe como titulo",
              { autoClose: 2000 }
            );
          if (update.data.keyValue.url)
            return toast.error(
              update.data.keyValue.url + " ya existe como URL",
              { autoClose: 2000 }
            );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const create = await axios.post(
          "https://mern-typescript-doug.herokuapp.com/videos",
          inputsValue
        );

        if (create.status === 202)
          return toast.error(create.data, { autoClose: 2000 });
      } catch (error) {
        console.log(error);
      }
    }

    setInputsValue({
      title: "",
      description: "",
      url: "",
    });
    fetching();
    navigate("/");
  };

  return (
    <div className="card card-body">
      <h3 className="card-header mb-1">Añadir video a lista de reproduccion</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Titulo del video
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="title"
            aria-describedby="emailHelp"
            value={inputsValue.title}
            onChange={onChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Url del video
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="url"
            value={inputsValue.url}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Descripcion (Opcional)
          </label>
          <textarea
            className="form-control"
            id="exampleInputPassword1"
            name="description"
            value={inputsValue.description}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Form;
