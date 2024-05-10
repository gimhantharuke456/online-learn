import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import "antd/dist/reset.css";
import AdminLogin from "./Views/AdminLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
