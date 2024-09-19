import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Space, Spin } from "antd";
import React from "react";
import Marquee from "react-fast-marquee";
function NetworkStatus({ showActionButton, alertMessage, alertType }) {
  console.log(alertType);
  const actionButton = () => {
    if (alertType === "info") {
      console.log("if is running");
      return <Spin indicator={<LoadingOutlined spin />} size="small" />;
    } else if (alertType === "success") return false;
    else {
      console.log("else is running");
      return (
        <a type="primary" onClick={() => window.location.reload()}>
          Reload
        </a>
      );
    }
  };
  return (
    <div id="network-alert" className="header">
      <Alert
        message={alertMessage}
        type={alertType}
        // closable
        action={
          <span
            style={{
              display: "flex",
            }}
          >
            <Marquee gradient={false} pauseOnHover>
              " ------------ It could take a while to get data from the server.
              The backend server is hosted on a free server which shuts down
              after some while of inactivity. Please take some patient"
            </Marquee>
            {actionButton()}
          </span>
        }
      />
    </div>
  );
}

export default NetworkStatus;
