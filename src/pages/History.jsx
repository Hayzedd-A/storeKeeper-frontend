import React, { useEffect } from "react";
import History_Table from "../components/history_page/history.table";
import Controls from "../components/history_page/Controls";

function History() {
  useEffect(() => {
    const getHistory = () => {
      const response = fetch("");
    };
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
