import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import "antd/dist/reset.css";
import AdminLogin from "./Views/AdminLogin";
import StudentLogin from "./Views/StudentLogin";
import StudentDashboard from "./Views/StudentDashboard";
import PaymentSuccess from "./Views/PaymentSuccess";
import PaymentError from "./Views/PaymentError";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
