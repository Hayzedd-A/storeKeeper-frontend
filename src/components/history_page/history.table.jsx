import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Modal, Radio, Space, Table } from "antd";
import HistoryData from "./HistoryData";
import CheckoutTable from "../CheckoutTable";
const History_Table = ({ history_data }) => {
  const [viewHistory, setViewHistory] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const handleViewHistory = history => {
    history.products.forEach(product => {
      product.price = product.amount / product.quantity;
      product.id = product.product_id;
    });
    console.log("this", history);
    setSelectedHistory(history);
    setViewHistory(true);
    console.log("operation invoked");
  };
  const table_data = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "created_at",
        key: "sale_id",
      },
      {
        title: "products",
        dataIndex: "products",
        render: product => <HistoryData data={product} />,
        key: "sale_id",
      },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="completed" />,
      },
      {
        title: "Amount",
        dataIndex: "total_amount",
        key: "sale_id",
      },
      {
        title: "Action",
        key: "operation",
        render: history => (
          <Space onChange={e => console.log(e)}>
            <Button value="large">Refund</Button>
            <Button value="small" onClick={() => handleViewHistory(history)}>
              View
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <>
        <Table columns={columns} dataSource={history_data} pagination={true} />
        {viewHistory && (
          <Modal>
            <CheckoutTable data={selectedHistory} usage="history" />
          </Modal>
        )}
      </>
    );
  };
  return table_data();
};
export default History_Table;
