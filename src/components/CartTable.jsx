import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import CheckoutModal from "./CheckoutModal";
const CartTable = ({ reloader, data, setData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [CheckoutData, setCheckoutData] = useState([]);
  let totalAmount = data.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Quantity",
      dataIndex: "purchaseValue",
      key: "id",
    },
    {
      title: "Amount",
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
  const handleCheckout = () => {
    setCheckoutData(prev =>
      data.map(item => {
        let output = {};
        output.id = item.id;
        output.name = item.name;
        output.price = item.price;
        output.purchaseValue = item.purchaseValue;
        output.amount = item.amount;
        output.total = totalAmount;
        return output;
      })
    );
    console.log(CheckoutData);
    console.log(data);
    setModalOpen(true);
  };

  return (
    <div className="cartTable">
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
            <Button
              disabled={!data.length}
              danger
              icon={<DeleteOutlined />}
              onClick={() => setData([])}
            >
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
            <span>₦ {totalAmount}</span>
            <div className="button" style={{ display: "flex", gap: "1em" }}>
              <Button
                disabled={!data.length}
                ghost
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      />

      <CheckoutModal
        reloader={reloader}
        open={modalOpen}
        setOpen={setModalOpen}
        data={CheckoutData}
      />
    </div>
  );
};

export default CartTable;
