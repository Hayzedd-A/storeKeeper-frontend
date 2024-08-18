import React, { useRef, useState } from "react";
import { Table, Input, Button, Popover, Card, Tooltip } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const SellingTable = ({ setCartData, data, setData }) => {
  const [open, setOpen] = useState(false);
  const hidePopover = () => {
    setOpen(false);
  };
  const inputRef = useRef([]);
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
            disabled={item.quantity < i}
          >
            {i}
          </Button>
        );
      });
    return (
      <>
        <Card
          style={{
            width: 173,
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
    console.log(amount);
    hidePopover();
    setCartData(prev => {
      console.log(prev);
      let cartItemIndex = prev.findIndex(({ id }) => item.id === id);
      if (cartItemIndex >= 0) {
        console.log(cartItemIndex);
        prev[cartItemIndex].purchaseValue += item.purchaseValue;
        prev[cartItemIndex].amount = parseFloat(
          (prev[cartItemIndex].amount += amount).toFixed(2)
        );
        // cartItem.purchaseValue += item.purchaseValue;
        // cartItem.amount += amount;
        // console.log(cartItem);
        return [...prev];
      }
      return [...prev, { ...item, amount }];
    });
  };
  const handleInputChange = (e, eachData) => {
    hidePopover();
    let newValue = parseInt(e.target.value);
    console.log(newValue);
    if (isNaN(newValue)) {
      newValue = 0;
    }
    setData(prev => {
      return prev.map(item => {
        if (item.id === eachData.id) {
          if (item.purchaseValue === 0) item.purchaseValue += newValue;
          item.purchaseValue = newValue;
        }
        return item;
      });
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
              ref={el => (inputRef.current[eachData.id] = el)}
              addonBefore={
                <span
                  // Decrementing
                  onClick={() => {
                    if (eachData.purchaseValue < 1) {
                      console.log("Cannot decrement further");
                      return;
                    }
                    let newValue = --eachData.purchaseValue;
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
                    if (eachData.purchaseValue >= eachData.quantity) {
                      console.log("Cannot increment further");
                      return;
                    }
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
        const tooltipTitle = () => {
          if (item.quantity < 1) return "Item is out of stock";
          else if (item.purchaseValue < 1) return "Select a quantity";
          else if (item.purchaseValue > item.quantity)
            return "Purchase value is more than stock";
          else return "Add to cart";
        };
        const invalid =
          item.quantity < 1 ||
          item.purchaseValue === 0 ||
          item.purchaseValue > item.quantity;
        return (
          <Tooltip title={tooltipTitle}>
            <Button
              onClick={() => addToCart(item)}
              type="primary"
              disabled={invalid}
            >
              ADD
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Table className="tableData" bordered columns={columns} dataSource={data} />
  );
};
export default SellingTable;
