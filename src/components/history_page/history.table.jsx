import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Descriptions,
  Dropdown,
  Radio,
  Space,
  Table,
} from "antd";
import HistoryData from "./HistoryData";
import HistoryModal from "./HistoryModal";
import CheckoutTable from "../CheckoutTable";
import { render } from "@testing-library/react";
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
    setSelectedHistory(history);

    setModalOpen(true);
  };
  const table_data = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "created_at",
        key: "sale_id",
        render: dateTime => {
          let [date, time] = dateTime.split("T");
          time = time.split(".")[0];
          return (
            <>
              <span>{date}</span>
              <br />
              <span>{time}</span>
            </>
          );
        },
      },
      {
        title: "Products",
        dataIndex: "products",
        render: product => <HistoryData data={product} />,
        key: "sale_id",
      },
      {
        title: "Status",
        key: "sale_id",
        render: () => <Badge status="success" text="completed" />,
      },
      {
        title: "Amount",
        dataIndex: "total_amount",
        key: "sale_id",
      },
      {
        title: "Action",
        key: "sale_id",
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
