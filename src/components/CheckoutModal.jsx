import React, { useState } from "react";
import { Button, Modal } from "antd";
import CheckoutTable from "./CheckoutTable";
import "../styles/styles.css";
const CheckoutModal = ({ open, setOpen, data }) => {
  const [loading, setLoading] = useState(false);
  //   const [open, setOpen] = useState(false);
  //   const showModal = () => {
  //     setOpen(true);
  //   };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      // Reload page after checkout
      window.location.reload();
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="checkoutModal">
      <Modal
        open={open}
        title="Reciept"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="" loading={loading} onClick={handleOk}>
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
