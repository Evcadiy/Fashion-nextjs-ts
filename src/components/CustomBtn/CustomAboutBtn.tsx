import React, { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface CustomBtnProps {
  icon: ReactNode;
  href: string;
  className: string;
}

const RoundIconButton = styled(Button)(({ theme }) => ({
  minWidth: "48px",
  width: "48px",
  height: "48px",
  color: "white",
  backgroundColor: "gray",
  "&:hover": {
    backgroundColor: "gray",
  },
  position: "absolute",
  right: 16,
  top: "32%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[2],
  visibility: "hidden",
  opacity: 0,
  transition: "visibility 0s, opacity 0.3s linear",
}));

const CustomAboutBtn: FC<CustomBtnProps> = ({ icon, ...props }) => {
  return <RoundIconButton {...props}>{icon}</RoundIconButton>;
};

export default CustomAboutBtn;
