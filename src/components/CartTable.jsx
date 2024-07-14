import React, { useState } from "react";
import { Button, Space, Table } from "antd";
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
  {
    title: "Action",
    key: "id",
    render: item => (
      <Space size="middle">
        <Button type="danger">Delete</Button>
      </Space>
    ),
  },
];
const CartTable = ({ data, setData }) => {
  //   let [total, setTotal] = useState(() => {
  //     return data.reduce((acc, item) => acc + item.amount, 0);
  //   });
  return (
    <Table
      className="cartTable"
      columns={columns}
      dataSource={data}
      bordered
      title={() => "Cart"}
      footer={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Total</span>
          <span>₦ {data.reduce((acc, item) => acc + item.amount, 0)}</span>
        </div>
      )}
    />
  );
};

export default CartTable;
