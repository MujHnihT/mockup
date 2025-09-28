import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Landing from "./Landing.jsx";
import AdminApp from "./AdminApp.jsx";
import UserApp from "./UserApp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/user" element={<UserApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
