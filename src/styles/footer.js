import color from "./color";
import theme from "./theme";

export const footer = {
  backgroundColor: color.colorDeepSeaBlue,
  padding: "30px 0",
  text: {
    color: "#fff",
    fontWeight: 700,
  },
  firstrow: {
    ...theme.responseWidth,
    padding: "20px 30px",
  },
  secondrow: {
    ...theme.responseWidth,
    padding: 10,
    justifyContent: "space-between",
  },
};
