import React from "react";
import { Button, Typography } from "antd";
import { ReactSVG } from "react-svg";
import color from "../../styles/color";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type='default'
      style={{
        width: "100%",
        height: 50,
        display: "flex",
        padding: 10,
        justifyContent: "space-around",
        alignItems: "center",
        gap: 10,
        borderColor: color.colorBlueWhale,
      }}
    >
      <ReactSVG
        src='./icon/google.svg'
        beforeInjection={(svg) => {
          svg.setAttribute("width", "28");
          svg.setAttribute("height", "29");
        }}
      />
      <Typography.Title level={5} style={{ margin: 0 }}>
        Tiếp tục với Google
      </Typography.Title>
      <div></div>
    </Button>
  );
};

export default GoogleLoginButton;
