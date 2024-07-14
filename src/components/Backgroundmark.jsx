import React from "react";
import { Watermark } from "antd";
const Backgroundmark = () => (
  <Watermark
    content="Ant Design"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      height: 500,
    }}
  >
    <div />
  </Watermark>
);
export default Backgroundmark;
