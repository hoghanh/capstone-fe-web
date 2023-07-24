import React from "react";
import { Button, Typography } from "antd";
import { ReactSVG } from "react-svg";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <Button
      type="primary"
      onClick={handleGoogleLogin}
      style={{
        width: 350,
        height: 50,
        display: "flex",
        padding: 10,
        justifyContent: "space-around",
        alignItems: "center",
        gap: 10,
      }}
    >
      <ReactSVG
        src="./icon/google.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("width", "28");
          svg.setAttribute("height", "29");
        }}
      />
      <Typography.Title level={5} style={{ margin: 0 }}>
        Continue with Google
      </Typography.Title>
      <div></div>
    </Button>
  );
};

export default GoogleLoginButton;
