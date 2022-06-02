import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../Hook/useContexto";

const Form = () => {
  const [errorInputT, setErrorInputT] = useState("");
  const [errorInputU, setErrorInputU] = useState("");

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
        const a = await axios.put(
          "http://localhost:3001/videos/" + inputsValue._id,
          {
            title,
            description,
            url,
          }
        );

        console.log(a.data === {});
      } catch (error) {
        console.log("error.request");
      }
    } else {
      await axios.post("http://localhost:3001/videos", inputsValue);
    }
    setInputsValue({
      title: "",
      description: "",
      url: "",
    });
    fetching();
    navigate("/");
  };

  const onBlur = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === "") return;

    if (e.target.name === "title") {
      const verification = await axios(
        "http://localhost:3001/title/" + e.target.value
      );
      if (verification.data !== "continue") setErrorInputT(verification.data);
      else setErrorInputT("");
    }

    if (e.target.name === "url") {
      const verification = await axios(
        "http://localhost:3001/url/" + e.target.value
      );
      if (verification.data !== "continue") setErrorInputU(verification.data);
      else setErrorInputU("");
    }
  };

  const onfocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.name === "title") setErrorInputT("");
    if (e.target.name === "url") setErrorInputU("");
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
            onBlur={onBlur}
            onFocus={onfocus}
            required
            autoFocus
          />
          <small>{errorInputT}</small>
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
            onBlur={onBlur}
            onFocus={onfocus}
            required
          />
          <small>{errorInputU}</small>
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
        <button
          type="submit"
          className="btn btn-primary"
          disabled={errorInputT || errorInputU ? true : false}
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Form;
