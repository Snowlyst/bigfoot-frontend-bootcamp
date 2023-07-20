import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SingleSight from "./SingleSight";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/sightings" element={<App />} />
      <Route path="sightings/:index" element={<SingleSight />} />
    </Routes>
  </BrowserRouter>
);
