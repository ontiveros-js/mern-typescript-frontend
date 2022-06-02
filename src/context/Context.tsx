import { createContext, useEffect, useState } from "react";
import axios from "axios";

export interface Istate {
  createdAt: string;
  description?: string;
  title: string;
  updatedAt: string;
  url: string;
  _id: string;
}

interface Ichildren {
  children: React.ReactNode;
}

interface Iuser {
  title: string;
  description: string;
  url: string;
  _id?: string;
}

const inputsDefault = {
  title: "",
  description: "",
  url: "",
};

export const Contexto = createContext<{
  data: Istate[];
  inputsValue: Iuser;
  setInputsValue: React.Dispatch<Iuser>;
  fetching: () => Promise<void>;
}>({
  data: [
    {
      createdAt: "",
      description: "",
      title: "",
      updatedAt: "",
      url: "",
      _id: "",
    },
  ],
  inputsValue: inputsDefault,
  setInputsValue: () => {},
  fetching: () => new Promise((resolve, reject) => {}),
});

const Context = ({ children }: Ichildren) => {
  const [data, setData] = useState<Istate[]>([]);
  const [inputsValue, setInputsValue] = useState<Iuser>(inputsDefault);

  const fetching = async () => {
    const datos = await axios("http://localhost:3001/videos");
    setData(datos.data);
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <Contexto.Provider value={{ data, inputsValue, setInputsValue, fetching }}>
      {children}
    </Contexto.Provider>
  );
};

export default Context;
