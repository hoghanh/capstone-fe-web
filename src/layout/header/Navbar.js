import React from "react";
import { Menu } from "antd";

function getItem(key, label) {
  return {
    key,
    label,
  };
}

const items = [
  getItem("Programming Tech", "Lập Trình & Công Nghệ"),
  getItem("Graphics Design", "Thiết Kế Đồ Hoạ"),
  getItem("Writing Translation", "Dịch Thuật"),
  getItem("Video Animation", "Video & Hoạt Hình"),
  getItem("Music Audio", "Âm Nhạc"),
  getItem("Photography", "Nhiếp Ảnh"),
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
