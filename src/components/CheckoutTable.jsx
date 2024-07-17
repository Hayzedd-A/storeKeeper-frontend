import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
const CheckoutTable = ({ data }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "quantity",
      dataIndex: "purchaseValue",
      key: "id",
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "id",
    },
  ];

  return (
    <Table
      className="cartTable"
      columns={columns}
      dataSource={data}
      bordered
      title={() => (
        <h3 style={{ margin: 0, color: "greenyellow" }}>Purchase Successful</h3>
      )}
      footer={() => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.5em",
          }}
        >
          <span>Total</span>
          <span>₦ {data[0].total}</span>
        </div>
      )}
    />
  );
};

export default CheckoutTable;
