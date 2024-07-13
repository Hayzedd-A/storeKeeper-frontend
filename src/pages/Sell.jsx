import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SellingTable from "../components/SellingTable";
import "../styles/sell.css";

function Sell() {
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    // Fetch API data and initialize the state
    const fetchData = async () => {
      // let response = await fetch("http://localhost:8094/products");
      let response = await fetch("http://192.168.196.89:8094/products");
      response = await response.json();
      if (response.status) {
        setApiData(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter the data based on the search keyword
    if (searchKeyword && searchKeyword.length > 2) {
      // Add purchaseValue property to each item and filter based on the search keyword
      const filteredData = apiData
        .filter(
          item =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.description.toLowerCase().includes(searchKeyword.toLowerCase())
        )
        .map(item => {
          item.purchaseValue = 1;
          return item;
        });
      setData(filteredData);
    } else setData([]);
  }, [searchKeyword]);
  return (
    <div>
      <div className="header"></div>
      <div className="main">
        <div className="sell">
          <SearchBar setSearchKeyword={setSearchKeyword} />
          <SellingTable data={data} setData={setData} />
        </div>
        <div className="cart"></div>
      </div>
    </div>
  );
}

export default Sell;
