import React, { useEffect, useState } from "react";
import History_Table from "../components/history_page/history.table";
import Controls from "../components/history_page/Controls";
const historyData = require("../Data");

function History() {
  const BASE_URL = "http://localhost:8094";
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        // const response = await fetch(`${BASE_URL}/products/history`);
        // let history = await response.json();
        const history = historyData;
        if (!history.status) throw new Error("Failed to fetch history data");
        setData(history.data);
        console.log(history);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    })();
  });
  return (
    <div>
      <Controls />
      <History_Table />
      History
    </div>
  );
}

export default History;
