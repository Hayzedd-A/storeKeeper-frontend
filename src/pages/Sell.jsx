// import("dotenv").config();
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../components/SearchBar";
import SellingTable from "../components/SellingTable";
import { useLocation } from "react-router-dom";
import "../styles/sell.css";
import { Alert } from "antd";
import CartTable from "../components/CartTable";
import CartModal from "../components/CheckoutModal";
import { triggerFocus } from "antd/es/input/Input";

function Sell({ notification, setCurrentPage }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const value = params.get("value");
  setCurrentPage(value);
  console.log(value);
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showActionButton, setShowActionButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Getting data, please Wait..."
  );
  const [showAlert, setShowAlert] = useState(true);
  const [alertType, setAlertType] = useState("info");
  const [cartData, setCartData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(true);
  const BASE_URL = "https://storekeeper-server-76iw.onrender.com";

  const reloader = () => {
    setReload(prev => !prev);
    setSearchKeyword("");
    setCartData([]);
  };

  useEffect(() => {
    let timeOutID;
    const fetchData = async () => {
      try {
        timeOutID = setTimeout(() => {
          setAlertMessage(
            "Connection seams to be lost, click the Reload button           "
          );
          setAlertType("warning");
          setShowActionButton(true);
        }, 30000);
        // get all products as the page loads
        // let response = await fetch("http://192.168.196.89:8094/products");
        console.log("starting fetch");
        let response = await fetch(`${BASE_URL}/products/all`);
        response = await response.json();
        if (response.status) {
          setApiData(response.data);
        }
        clearTimeout(timeOutID);
        setAlertMessage("Data fetched successfully");
        setAlertType("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      } catch (error) {
        console.log("error in fetch: ", error);
        // setApiData([]);
        clearTimeout(timeOutID);
        setShowActionButton(true);
        setAlertMessage(
          "Error fetching data, Reload the page when network connectivity is restored"
        );
        setAlertType("error");
      }
    };
    fetchData();
  }, [reload]);

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
          item.key = `key-${item.id}`;
          return item;
        });
      setData(filteredData);
    } else setData([]);
  }, [searchKeyword]);

  return (
    <div className="sell-page">
      <div className="header">
        {showAlert && (
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
            reloader={reloader}
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
