function getItem(key, label) {
  return {
    key,
    label,
  };
}

const navbar = {
  items: [
    getItem("Programming Tech", "Lập Trình & Công Nghệ"),
    getItem("Graphics Design", "Thiết Kế Đồ Hoạ"),
    getItem("Writing Translation", "Dịch Thuật"),
    getItem("Video Animation", "Video & Hoạt Hình"),
    getItem("Music Audio", "Âm Nhạc"),
    getItem("Photography", "Nhiếp Ảnh"),
    getItem("Digital Marketing", "Digital Marketing"),
    getItem("Business", "Kinh Doanh"),
  ],
  menu: {
    display: "flex",
    justifyContent: "center",
    borderTop: "0.25px solid #02ADFDE5",
    borderBottom: "0.25px solid #02ADFDE5",
  },
};

export default navbar;
