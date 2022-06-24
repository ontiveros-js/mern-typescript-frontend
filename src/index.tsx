import React from "react";
import ReactDOM from "react-dom/client";
import "bootswatch/dist/minty/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Context from "./context/Context";
import VideoList from "./components/VideoList";
import Form from "./components/Form";
import Nav from "./components/Nav";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Context>
        <div className="container pt-4">
          <Routes>
            <Route path="/" element={<VideoList />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </Context>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
