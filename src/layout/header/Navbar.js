import React from "react";
import { Menu } from "antd";

function Navbar() {
  const menuItems = [
    {
      key: "programming-tech",
      title: "Lập trình & Công nghệ",
    },
    {
      key: "graphics-design",
      title: "Thiết kế đồ họa",
    },
    {
      key: "writing-translation",
      title: "Dịch thuật",
    },
    {
      key: "video-animation",
      title: "Video & Hoạt hình",
    },
    {
      key: "music-audio",
      title: "Âm nhạc",
    },
    {
      key: "photography",
      title: "Nhiếp ảnh",
    },
    {
      key: "digital-marketing",
      title: "Digital Marketing",
    },
    {
      key: "business",
      title: "Kinh Doanh",
    },
  ];

  return (
    <Menu
      mode="horizontal"
      style={{
        display: "flex",
        justifyContent: "center",
        borderTop: "0.25px solid #013042",
        borderBottom: "0.25px solid #013042",
      }}
      items={menuItems}
    />
  );
}

export default Navbar;
