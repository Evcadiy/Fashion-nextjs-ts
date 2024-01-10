"use client";

import { Alert, Snackbar } from "@mui/material";
import React, { FC } from "react";

interface SnackBar {
  snackBarOpen: boolean;
  handleSnackBarClose: () => void;
}

const MySnackBar: FC<SnackBar> = ({ snackBarOpen, handleSnackBarClose }) => {
  return (
    <Snackbar
      open={snackBarOpen}
      autoHideDuration={1000}
      onClose={handleSnackBarClose}
    >
      <Alert
        onClose={handleSnackBarClose}
        severity="success"
        sx={{ width: "100%" }}
      >
        Product was added to the cart!
      </Alert>
    </Snackbar>
  );
};

export default MySnackBar;
