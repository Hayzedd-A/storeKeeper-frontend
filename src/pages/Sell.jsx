import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SellingTable from "../components/SellingTable";
import { useLocation } from "react-router-dom";
import "../styles/sell.css";
import { Alert } from "antd";
import CartTable from "../components/CartTable";
import CartModal from "../components/CheckoutModal";

function Sell({ notification, setCurrentPage }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const value = params.get("value");
  setCurrentPage(value);
  console.log(value);
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch API data and initialize the state
    const fetchData = async () => {
      try {
        let response = await fetch("https://dummyjson.com/products?limit=200");
        response = await response.json();
        if (response.products.length) {
          setApiData(() => {
            return response.products.map(item => {
              item.name = item.title;
              item.quantity = item.stock;
              item.image = item.thumbnail;
              return item;
            });
          });
          console.log(apiData);
        }
      } catch (error) {
        console.log("error in fetch: ", error);
        setError(true);
      }
    };
    fetchData();
    // const fetchData = async () => {
    //   try {
    //     // let response = await fetch("http://localhost:8094/products");
    //     // let response = await fetch("http://192.168.196.89:8094/products");
    //     response = await response.json();
    //     if (response.status) {
    //       setApiData(response.data);
    //     }
    //   } catch (error) {
    //     console.log("error in fetch: ", error);
    //     // setApiData([]);
    //     setError(true);
    //   }
    // };
    // fetchData();
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
    <div className="sell-page">
      <div className="header">
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
      </div>
      <div className="main">
        <div className="sell">
          <SearchBar setSearchKeyword={setSearchKeyword} />
          <SellingTable
            data={data}
            setData={setData}
            setCartData={setCartData}
          />
        </div>
        <div className="cart">
          <CartTable
            data={cartData}
            setData={setCartData}
            setModalOpen={setModalOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default Sell;
