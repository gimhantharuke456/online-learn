import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { fetchPayments } from "../api/paymentApi";
import { render } from "@testing-library/react";
import StudentDetails from "./StudentDetails";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    try {
      const response = await fetchPayments();
      setPayments(response.data);
    } catch (error) {
      message.error("Failed to fetch payments: " + error.message);
    }
  };

  const columns = [
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Paid By",
      dataIndex: "paidBy",
      key: "paidBy",
      render: (paidBy) => <StudentDetails id={paidBy} />,
    },
    {
      title: "Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Date",
      dataIndex: "paidDate",
      key: "paidDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h2>Payments</h2>
      <Table dataSource={payments} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Payments;
