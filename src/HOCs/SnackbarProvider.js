import React, { createContext, useContext, useState } from "react";
import { message } from "antd";

const SnackbarContext = createContext(() => {});
export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const showSnackbar = (newAlert) => {
    message.success(newAlert.message, 3.5);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
