import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

function HistoryData({ data }) {
  console.log("data", data);

  const items = data.map(item => {
    return {
      label: `${item.quantity} - ${item.name}`,
      key: item.product_id,
    };
  });

  // console.log("productsData", productsData);

  // const items = [
  //   {
  //     key: "1",
  //     label: "Action 1",
  //   },
  //   {
  //     key: "2",
  //     label: "Action 2",
  //   },
  // ];
  return (
    <Dropdown menu={{ items }}>
      <span>
        {items.length} Products <DownOutlined />
      </span>
    </Dropdown>
  );
}

export default HistoryData;
