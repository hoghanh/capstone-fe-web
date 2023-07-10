import React from "react";
import { Menu } from "antd";

function getItem(key, label) {
  return {
    key,
    label,
  };
}

const items = [
  getItem("Programming Tech", "Lập trình & Công nghệ"),
  getItem("Graphics Design", "Thiết kế đồ họa"),
  getItem("Writing Translation", "Dịch thuật"),
  getItem("Video Animation", "Video & Hoạt hình"),
  getItem("Music Audio", "Âm nhạc"),
  getItem("Photography", "Nhiếp ảnh"),
  getItem("Digital Marketing", "Digital Marketing"),
  getItem("Business", "Kinh Doanh"),
];

const Navbar = () => {
  return (
    <Menu
      mode="horizontal"
      items={items}
      style={{
        display: "flex",
        justifyContent: "center",
        borderTop: "0.25px solid #02ADFDE5",
        borderBottom: "0.25px solid #02ADFDE5",
      }}
    ></Menu>
  );
};

export default Navbar;
