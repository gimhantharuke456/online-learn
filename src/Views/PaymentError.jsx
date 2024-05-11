import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentError = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Error</h1>
      <Button
        onClick={() => {
          navigate("/student-dashboard");
        }}
      >
        Home
      </Button>
    </div>
  );
};

export default PaymentError;
