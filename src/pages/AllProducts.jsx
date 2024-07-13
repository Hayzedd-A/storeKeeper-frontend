import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategorySelect from "../components/CategorySelect";
import AllProductsTable from "../components/AllProductTable";
import Loading from "../components/Loading";

function AllProducts() {
  const [apiData, setApiData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch API data and initialize the state
    const fetchData = async () => {
      // let response = await fetch("http://localhost:8094/products");
      // let response = await fetch("https://dummyjson.com/products");
      let response = await fetch("http://192.168.196.89:8094/products");
      response = await response.json();
      if (response.status) {
        setApiData(response.data);
        setCategory([...new Set(response.data.map(item => item.category))]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {});

  return (
    <div>
      {loading && <Loading />}
      <div className="header">
        <SearchBar setSearchKeyword={setSearchKeyword} />
        <CategorySelect
          category={category}
          setSelectedCategory={setSelectedCategory}
        />
        <AllProductsTable data={apiData} />
      </div>
    </div>
  );
}

export default AllProducts;
