import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

function HistoryData({ data }) {
  const items = data.map(item => {
    return {
      label: `${item.quantity} - ${item.name}`,
      key: item.product_id,
    };
  });
  return (
    <Dropdown menu={{ items }}>
      <span>
        {items.length} Products <DownOutlined />
      </span>
    </Dropdown>
  );
}

export default HistoryData;
