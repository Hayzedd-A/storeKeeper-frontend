import { Table, Input, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const SellingTable = ({ setCartData, data, setData }) => {
  const addToCart = item => {
    item.amount = item.purchaseValue * item.price;
    setCartData(prev => {
      return [...prev, item];
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
          <Input
            value={eachData.purchaseValue}
            style={{ width: "10em" }}
            onChange={e => {
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
            }}
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

  return <Table className="tableData" columns={columns} dataSource={data} />;
};
export default SellingTable;
