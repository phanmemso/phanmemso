import ReactDOM from "react-dom/client";
import Login from "./Login";
import HuongDanDangKy from "./HuongDanDangKy";
import "antd/dist/reset.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />} />
      <Route path="/huong-dan-dang-ky" element={<HuongDanDangKy />} />
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>,
);
