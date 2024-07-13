import React from "react";
import { Flex, Spin, Alert } from "antd";
const Loading = () => (
  <Flex
    align="center"
    gap="middle"
    style={{
      position: "absolute",
      display: "grid",
      placeContent: "center",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 4,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <Spin size="large" style={{ scale: 3 }} />
    <Alert
      style={{ zIndex: 5 }}
      message="Fetching data... Please wait"
      type="info"
    />
  </Flex>
);
export default Loading;
