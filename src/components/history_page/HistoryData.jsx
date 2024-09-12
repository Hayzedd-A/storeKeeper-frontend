import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

function HistoryData({ data }) {
  return (
    <Dropdown
      menu={{
        data,
      }}
    >
      <a>
        More <DownOutlined />
      </a>
    </Dropdown>
  );
}

export default HistoryData;
