import React from "react";
import { Menu } from "antd";

function Navbar() {
  return (
    <Menu
      mode="horizontal"
      style={{
        display: "flex",
        justifyContent: "center",
        borderTop: "0.25px solid #013042",
        borderBottom: "0.25px solid #013042",
      }}
    >
      <Menu.Item key="Programming Tech">Lập trình & Công nghệ</Menu.Item>
      <Menu.Item key="Graphics Design">Thiết kế đồ họa</Menu.Item>
      <Menu.Item key="Writing Translation">Dịch thuật</Menu.Item>
      <Menu.Item key="Video Animation">Video & Hoạt hình</Menu.Item>
      <Menu.Item key="Music Audio">Âm nhạc</Menu.Item>
      <Menu.Item key="Photography">Nhiếp ảnh</Menu.Item>
      <Menu.Item key="Digital Marketing">Digital Marketing</Menu.Item>
      <Menu.Item key="Business">Kinh Doanh</Menu.Item>
    </Menu>
  );
}

export default Navbar;
