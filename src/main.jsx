import React from "react";
import ReactDOM from "react-dom/client";
import AdminApp from "./AdminApp.jsx";
import UserApp from "./UserApp.jsx";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Đổi giữa <AdminApp/> hoặc <UserApp/> để chạy */}
    <AdminApp />
    {/* <UserApp /> */}
  </React.StrictMode>
);
