import React, { useState } from "react";
import { Table, Input, Button, Popover, Card } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const SellingTable = ({ setCartData, data, setData }) => {
  const [open, setOpen] = useState(false);
  const hidePopover = () => {
    setOpen(false);
  };
  const handleOpenChange = newOpen => {
    console.log(newOpen);
    setOpen(newOpen);
  };

  const numbersButton = item => {
    let i = 0;
    const numbersBtn = Array(9)
      .fill(1)
      .map(e => {
        i++;
        return (
          <Button
            key={i}
            value={i}
            onClick={e => handleInputChange(e, item)}
            disabled={item.quantity < 1}
          >
            {i}
          </Button>
        );
      });
    return (
      <>
        <Card
          style={{
            width: 300,
          }}
        >
          {numbersBtn}
        </Card>
        <a onClick={hidePopover}>Close</a>
      </>
    );
  };

  const addToCart = item => {
    const amount = parseFloat(
      (Math.round(item.purchaseValue * item.price * 100) / 100).toFixed(2)
    );
    // hide tooltip
    hidePopover();
    console.log(amount, typeof amount);
    setCartData(prev => {
      return [...prev, { ...item, amount }];
    });
  };
  const handleInputChange = (e, eachData) => {
    hidePopover();
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue) || newValue < 1) {
      console.log("Invalid input. Please enter a positive integer.");
      return;
    }
    setData(prev => {
      data = prev.map(item => {
        if (item.id === eachData.id) item.purchaseValue = newValue;
        return item;
      });
      return data;
    });
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "id",
      render: image => <img src={image} alt="Product" width="100" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "id",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "id",
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 1,
      },
    },
    {
      title: "Operation",
      key: "id",
      render: eachData => {
        return (
          <Popover
            content={numbersButton(eachData)}
            title="Select a number"
            trigger="click"
            open={eachData.id == open}
            onOpenChange={() => handleOpenChange(eachData.id)}
            style={{ width: "10em" }}
          >
            <Input
              value={eachData.purchaseValue}
              style={{ width: "10em" }}
              onChange={e => handleInputChange(e, eachData)}
              addonBefore={
                <span
                  // Decrementing
                  onClick={() => {
                    let newValue = --eachData.purchaseValue;
                    if (newValue <= 0) {
                      console.log("Cannot decrement further");
                      return;
                    }
                    console.log(newValue);
                    setData(prev => {
                      data = prev.map(item => {
                        if (item.id === eachData.id)
                          item.purchaseValue = newValue;
                        return item;
                      });
                      return data;
                    });
                  }}
                >
                  <MinusOutlined className="actionButton" size={"1em"} />
                </span>
              }
              addonAfter={
                // Incrementing
                <PlusOutlined
                  className="actionButton"
                  size={"1em"}
                  onClick={() => {
                    let newValue = ++eachData.purchaseValue;
                    setData(prev => {
                      data = prev.map(item => {
                        if (item.id === eachData.id)
                          item.purchaseValue = newValue;
                        return item;
                      });
                      return data;
                    });
                  }}
                />
              }
            />
          </Popover>
        );
      },
    },
    {
      title: "action",
      key: "id",
      render: item => {
        return (
          <Button onClick={() => addToCart(item)} type="primary">
            ADD
          </Button>
        );
      },
    },
  ];

  return (
    <Table className="tableData" bordered columns={columns} dataSource={data} />
  );
};
export default SellingTable;
