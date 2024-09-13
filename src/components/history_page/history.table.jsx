import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Radio, Space, Table } from "antd";
import HistoryData from "./HistoryData";
const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];
console.log("items", items);
const History_Table = ({ history_data }) => {
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
        render: () => (
          <Space onChange={e => console.log(e)}>
            <Button value="large">Refund</Button>
            <Button value="default">Modify</Button>
            <Button value="small">View</Button>
          </Space>
        ),
      },
    ];
    return (
      <Table columns={columns} dataSource={history_data} pagination={false} />
    );
  };
  return table_data();
};
export default History_Table;
