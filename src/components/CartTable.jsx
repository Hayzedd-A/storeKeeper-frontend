import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
const CartTable = ({ data, setData, setModalOpen }) => {
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
      render: ({ id }) => (
        <Space size="middle">
          <Button
            type="danger"
            onClick={() => setData(prev => prev.filter(item => item.id !== id))}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const deleteCartItem = id => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Table
      className="cartTable"
      columns={columns}
      dataSource={data}
      bordered
      title={() => (
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Cart</h3>
          <Button danger icon={<DeleteOutlined />} onClick={() => setData([])}>
            Empty Cart
          </Button>
        </span>
      )}
      footer={() => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Total</span>
          <span>
            ₦ {data.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
          </span>
          <div className="button" style={{ display: "flex", gap: "1em" }}>
            <Button
              ghost
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => setModalOpen(() => Boolean(data.length))}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    />
  );
};

export default CartTable;
