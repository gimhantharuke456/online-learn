import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
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
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/022/360/493/small_2x/3d-payment-money-dollar-credit-card-png.png"
        alt="success"
      />
      <Button
        onClick={() => {
          navigate("/student-dashboard");
        }}
      >
        Back to home
      </Button>
    </div>
  );
};

export default PaymentSuccess;
