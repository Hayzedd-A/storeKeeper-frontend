import React, { useState } from "react";
import { MenuFoldOutlined, DingdingOutlined } from "@ant-design/icons";

import {
  AppstoreOutlined,
  FundViewOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    label: <a href="/?value=sell">Sell</a>,
    key: "sell",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: <a href="/allProduct?value=allProduct">All products</a>,
    key: "allProduct",
    icon: <AppstoreOutlined />,
  },
  {
    label: <a href="/history?value=history">History</a>,
    key: "history",
    icon: <FundViewOutlined />,
    // children: [
    //   {
    //     type: "group",
    //     label: "Days",
    //     children: [
    //       {
    //         label: "Today",
    //         key: "setting:1",
    //       },
    //       {
    //         label: "Yesterday",
    //         key: "setting:2",
    //       },
    //     ],
    //   },
    //   {
    //     type: "group",
    //     label: "Weeks",
    //     children: [
    //       {
    //         label: "This Week",
    //         key: "setting:3",
    //       },
    //       {
    //         label: "Last week",
    //         key: "setting:4",
    //       },
    //     ],
    //   },
    // ],
  },
  {
    key: "profile",
    label: <a href="profile?value=profile">Profile</a>,
    icon: <UserOutlined />,
  },
  {
    key: "logout",
    label: <a href="logout?value=logout">Logout</a>,
    icon: <LogoutOutlined />,
  },
];
const NavUL = ({ currentPage }) => {
  const [current, setCurrent] = useState("mail");
  const onClick = e => {
    console.log("click ", e);
    setCurrent(currentPage);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      inlineCollapsed="false"
      items={items}
    />
  );
};

function Nav({ currentPage }) {
  console.log(currentPage);
  return (
    <nav className="navBar">
      <div className="name_logo">
        <div className="logo">
          <DingdingOutlined />
        </div>
        <div className="name">Store Keeper</div>
      </div>
      <div className="links">
        <div className="hambuger">
          <MenuFoldOutlined className="icon" />
        </div>

        <NavUL currentPage={currentPage} />
      </div>
    </nav>
  );
}

export default Nav;
