import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const RoundIconButton = styled(Button)(({ theme }) => ({
  minWidth: "48px",
  width: "48px",
  height: "48px",
  color: "white",
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "red",
  },
  position: "absolute",
  right: 16,
  top: "20%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[2],
  visibility: "hidden",
  opacity: 0,
  transition: "visibility 0s, opacity 0.3s linear",
}));

const CustomRedBtn = ({ icon, ...props }) => {
  return <RoundIconButton {...props}>{icon}</RoundIconButton>;
};

export default CustomRedBtn;
