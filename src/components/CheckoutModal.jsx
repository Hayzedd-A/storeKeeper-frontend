import React, { useState } from "react";
import { Button, Modal } from "antd";
import CheckoutTable from "./CheckoutTable";
import Notification from "./Notification";
import "../styles/styles.css";
const CheckoutModal = ({ reloader, open, setOpen, data }) => {
  const [loading, setLoading] = useState(false);
  const BASE_URL = "https://storekeeper-server-76iw.onrender.com";
  //   const [open, setOpen] = useState(false);
  //   const showModal = () => {
  //     setOpen(true);
  //   };
  const handleCompletePurchase = async () => {
    try {
      console.log(data);
      let purchaseData = { items: [], totalAmount: 0 };
      purchaseData.items = data.map(ele => {
        let output = {};
        output.id = ele.id;
        output.name = ele.name;
        output.purchaseValue = ele.purchaseValue;
        output.amount = ele.amount;
        return output;
      });

      purchaseData.totalAmount = purchaseData.items.reduce(
        (acc, { amount }) => acc + amount,
        0
      );
      console.log(purchaseData);
      setLoading(true);
      // Make API call to complete purchase
      let apiResult = await fetch(`${BASE_URL}/products/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });
      if (!apiResult.ok) {
        console.log(apiResult);
      }
      apiResult = await apiResult.json();
      if (!apiResult.status) {
        let errorMessage = apiResult.message.split(",");
        if (errorMessage[0] === "validation") throw new Error(errorMessage[1]);
        else throw new Error("Failed to complete purchase");
      }
      if (apiResult.status) {
        console.log("Purchase Successful");
        // Add success message to notification
        Notification("success", {
          title: "Success",
          body: "Purchase successful",
        })();
        setLoading(false);
        setOpen(false);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
        reloader();
      }
    } catch (err) {
      console.error(err);
      Notification("error", {
        title: "Error",
        body: err.message,
      })();
      setLoading(false);
      setOpen(false);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
      reloader();
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="checkoutModal">
      <Modal
        open={open}
        title="Reciept"
        onOk={handleCompletePurchase}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type=""
            loading={loading}
            onClick={handleCompletePurchase}
          >
            Confirm
          </Button>,
        ]}
      >
        <CheckoutTable data={data} />
      </Modal>
    </div>
  );
};
export default CheckoutModal;
