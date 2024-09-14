import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Radio, Space, Table } from "antd";
import HistoryData from "./HistoryData";
import HistoryModal from "./HistoryModal";
import CheckoutTable from "../CheckoutTable";
const History_Table = ({ history_data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const handleViewHistory = history => {
    history.products.forEach(product => {
      product.price =
        Math.round((product.amount / product.quantity) * 100) / 100;

      product.id = product.product_id;
      product.purchaseValue = product.quantity;
    });
    console.log("this", history);
    setSelectedHistory(history);

    setModalOpen(true);
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
        <HistoryModal open={modalOpen} setOpen={setModalOpen}>
          <CheckoutTable
            data={selectedHistory.products}
            total_amount={selectedHistory.total_amount}
            usage="history"
          />
        </HistoryModal>
      </>
    );
  };
  return table_data();
};
export default History_Table;
