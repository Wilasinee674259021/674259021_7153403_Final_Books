import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // <--- บรรทัดนี้สำคัญมาก! ถ้าไม่มี สไตล์จะเบี้ยวแบบในรูป
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
