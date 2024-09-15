import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
const CheckoutTable = ({ data, heading, usage, total_amount }) => {
  const [loading, setLoading] = useState(false);
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

  const total = usage == "history" ? total_amount : data[0].total;
  // const total = usage == "history" ? data.total_amount : data[0].total;
  if (usage === "history") {
    columns.push({
      title: "Action",
      key: "action",
      render: ({ id }) => (
        <Space size="middle">
          <Button
            danger
            type="text"
            loading={loading}
            onClick={console.log(id, "is clicked")}
          >
            Refund
          </Button>
        </Space>
      ),
    });
  }

  return (
    <Table
      className="cartTable"
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      title={() => (
        <h3 style={{ margin: 0, color: "greenyellow" }}>{heading}</h3>
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
          <span>₦ {total}</span>
        </div>
      )}
    />
  );
};

export default CheckoutTable;
