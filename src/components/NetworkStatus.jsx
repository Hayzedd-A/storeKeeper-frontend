import { Alert } from "antd";
import React from "react";

function NetworkStatus({ showActionButton, alertMessage, alertType }) {
  return (
    <div className="header">
      <Alert
        message={alertMessage}
        type={alertType}
        // closable
        action={
          showActionButton && (
            <a type="primary" onClick={() => window.location.reload()}>
              Reload
            </a>
          )
        }
      />
    </div>
  );
}

export default NetworkStatus;
