import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategorySelect from "../components/CategorySelect";
import AllProductsTable from "../components/AllProductTable";
import Loading from "../components/Loading";
import "../styles/styles.css";
import { Alert, Button } from "antd";

function AllProducts({ Notification }) {
  const [apiData, setApiData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch API data and initialize the state
    const fetchData = async () => {
      try {
        let response = await fetch("https://dummyjson.com/products?limit=200");
        let { products } = await response.json();
        let ApiData = products.map(item => {
          item.name = item.title;
          item.quantity = item.stock;
          item.image = item.thumbnail;
          return item;
        });
        setData(ApiData);
        setApiData(ApiData);
        setCategory([...new Set(products.map(item => item.category))]);
        setLoading(false);
      } catch (error) {
        console.log("error in fetch: ", error);
        Notification("error", {
          title: "Error",
          body: "There was an error fetching the data, \n Please check your network connection",
        })();
        setLoading(false);
        setError(true);
      }
    };
    // const fetchData = async () => {
    //   try {
    //     let response = await fetch("http://localhost:8094/products");
    //     // let response = await fetch("https://dummyjson.com/products");
    //     // let response = await fetch("http://192.168.196.89:8094/products");
    //     response = await response.json();
    //     if (response.status) {
    //       setApiData(response.data);
    //       setData(response.data);
    //       setCategory([...new Set(response.data.map(item => item.category))]);
    //       setLoading(false);
    //     }
    //   } catch (error) {
    //     console.log("error in fetch: ", error);
    //     Notification("error", {
    //       title: "Error",
    //       body: "There was an error fetching the data, \n Please check your network connection",
    //     })();
    //     setLoading(false);
    //     setError(true);
    //   }
    // };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("second hook:", selectedCategory, Boolean(searchKeyword));
    let outcome = apiData;
    if (selectedCategory !== "all") {
      outcome = apiData.filter(item => item.category === selectedCategory);
    }
    if (searchKeyword) {
      outcome = outcome.filter(
        item =>
          item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          item.category.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    setData([...outcome]);
    console.log(data);
  }, [searchKeyword, selectedCategory]);

  return (
    <div className="allProducts">
      {error && (
        <Alert
          message="Error fetching data, Reload the page when network connectivity is restored"
          type="error"
          action={
            <a type="primary" onClick={() => window.location.reload()}>
              Reload
            </a>
          }
        />
      )}
      {loading && <Loading />}
      <div className="header">
        <SearchBar setSearchKeyword={setSearchKeyword} />
        <CategorySelect
          category={category}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <AllProductsTable data={data} />
    </div>
  );
}

export default AllProducts;
