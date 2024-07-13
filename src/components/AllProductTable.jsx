import { Table, Input, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const AllProductsTable = ({ data, setData }) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: image => <img src={image} alt="Product" width="100" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      },
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 1,
      },
    },
    {
      title: "action",
      key: "action",
      render: data => {
        return (
          <Button onClick={e => console.log(data)} type="primary">
            Modify
          </Button>
        );
      },
    },
  ];

  return <Table className="tableData" columns={columns} dataSource={data} />;
};
export default AllProductsTable;
