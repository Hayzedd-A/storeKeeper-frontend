import React, { useEffect, useState } from "react";
import History_Table from "../components/history_page/history.table";
import Controls from "../components/history_page/Controls";
import NetworkStatus from "../components/NetworkStatus";
const historyData = require("../Data");

function History() {
  const [showActionButton, setShowActionButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Getting data, please Wait..."
  );
  const [showAlert, setShowAlert] = useState(true);
  const [alertType, setAlertType] = useState("info");
  // const BASE_URL = "http://localhost:8094";
  const BASE_URL = "https://storekeeper-server-76iw.onrender.com";

  const [data, setData] = useState([]);
  useEffect(() => {
    let timeOutID;
    (async () => {
      try {
        timeOutID = setTimeout(() => {
          setAlertMessage(
            "Connection seams to be lost, click the Reload button"
          );
          setAlertType("warning");
          setShowActionButton(true);
        }, 30000);
        const response = await fetch(`${BASE_URL}/products/history`);
        let history = await response.json();
        // const history = historyData;
        if (!history.status) throw new Error("Failed to fetch history data");
        setData(history.data);
        clearTimeout(timeOutID);
        setAlertMessage("Data fetched successfully");
        setAlertType("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    })();
  }, []);
  return (
    <div className="history">
      {showAlert && (
        <NetworkStatus
          showActionButton={showActionButton}
          alertMessage={alertMessage}
          alertType={alertType}
        />
      )}
      <Controls />
      <History_Table history_data={data} />
      History
    </div>
  );
}

export default History;
