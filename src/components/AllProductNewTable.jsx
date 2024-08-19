import React, { useState } from "react";
import { updateProduct } from "../functions/Server_request";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { render } from "@testing-library/react";

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const AllProductNewTable = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = record => record.key === editingKey;
  const edit = record => {
    form.setFieldsValue({
      name: "",
      price: "",
      quantity: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async ({ key, quantity: InitialQuantity }) => {
    try {
      setLoading(true);
      // console.log(key);
      const row = await form.validateFields();
      console.log(row);
      const newQuantity = Number(row.quantity);
      console.log(newQuantity);
      const updatedData = {
        ...row,
        quantity: Number(InitialQuantity) + newQuantity,
        id: key.split("-")[1],
      };
      console.log(updatedData);
      let fetchResult = await updateProduct(updatedData);

      if (!fetchResult.status) throw new Error(fetchResult.message);
      console.log("row: ", row);
      row.quantity = updatedData.quantity;
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setLoading(false);
        setData(newData);
        // console.log(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo.message);
    }
  };
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // console.log(
    //   "record: ",
    //   record,
    //   "dataIndex: ",
    //   dataIndex,
    //   "title: ",
    //   title,
    //   "inputType: ",
    //   inputType
    // );
    let inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    inputNode =
      dataIndex === "quantity" ? (
        <Space.Compact>
          <Tooltip title="Initial Quantity">
            <Input
              style={{ width: "50%" }}
              defaultValue={record.quantity}
              // disabled={true}
              // contentEditable={false}
              readOnly={true}
            />
          </Tooltip>
          <Tooltip title="Enter new quantity">
            <Input
              style={{ width: "50%" }}
              defaultValue={0}
              placeholder="Enter new quantity"
            />
            {/* <Spin /> */}
          </Tooltip>
        </Space.Compact>
      ) : (
        inputNode
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            onKeyUp={e => {
              // console.log(e.key);
              e.key === "Enter" && save(editingKey);
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      width: "10%",
      editable: false,
      render: image => <img height="70%" width="100%" src={image} />,
    },
    {
      title: "name",
      dataIndex: "name",
      width: "40%",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
      editable: true,
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "20%",
      editable: true,
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 1,
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          loading ? (
            <Spin indicator={<LoadingOutlined spin />} size="small" />
          ) : (
            <span>
              <Typography.Link
                onClick={() => save(record)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          )
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType:
          col.dataIndex === "price" || col.dataIndex === "quantity"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default AllProductNewTable;
