import color from "./color";

export const home = {
  banner: {
    height: 350,
    padding: 30,
    maxWidth: 1080,
    margin: "0 auto",
  },
  banner1: {
    subtitle: {
      margin: 0,
      paddingRight: 10,
      color: color.colorBlueWhale,
    },
    button: {
      borderRadius: 25,
      border: "1px solid #013042",
      color: color.colorBlueWhale,
      marginRight: 10,
      background: "none",
      padding: "3px 10px",
      fontSize: 12,
      height: 23,
    },
    bannerImg: {
      backgroundImage: "url('img/Successful-Freelancer.png')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
    },
  },
  jobpopular: {
    swipper: { width: 170, height: 216, padding: 10, margin: "10px 0" },
    card: {
      width: "100%",
      height: "100%",
      backgroundImage: `url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },

  banner2: {
    bannerImg: {
      backgroundImage: "url('img/freelancer-1.png')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
    },
    title: {
      fontSize: 18,
    },
    des: {
      borderBlockEnd: "unset",
      padding: 0,
      margin: 5,
      fontSize: 16,
    },
  },
  banner3: {
    column: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    text: { marginTop: 10 },
  },
};
