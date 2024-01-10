"use client";

import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useAppSelector } from "@/redux/store";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import {
  removeItem,
  updateCartFromStorage,
  updateTotalAmount,
  removeAll,
} from "@/redux/cartSlice";

interface CartProps {
  cartOpen: boolean;
  closeCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cartOpen, closeCart }) => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    loadItemsFromLocalStorage();
  }, []);

  const loadItemsFromLocalStorage = () => {
    const existingItemsString = localStorage.getItem("cartItems");
    const totalAmountString = localStorage.getItem("totalAmount");

    const existingItemsFromStorage: any[] = existingItemsString
      ? JSON.parse(existingItemsString)
      : [];

    const totalAmountFromStorage: any = totalAmountString
      ? JSON.parse(totalAmountString)
      : 0;

    dispatch(updateCartFromStorage(existingItemsFromStorage));
    dispatch(updateTotalAmount(totalAmountFromStorage));
  };

  const removeAllFromCartHandler = () => {
    dispatch(removeAll());
  };

  return (
    <Drawer
      sx={{ zIndex: 9999 }}
      anchor="right"
      open={cartOpen}
      onClose={closeCart}
    >
      <List
        sx={{
          width: "700px",
          "@media (max-width: 788px)": {
            width: "500px",
          },
          "@media (max-width: 500px)": {
            width: "330px",
          },
        }}
      >
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={closeCart}
            sx={{
              "&:hover": {
                backgroundColor: "#fff",
                color: "#FF69B4",
                transition: "color 0.2s ease",
              },
            }}
          >
            <ArrowBackIosIcon />
            <ListItemText primary="Back" />
          </IconButton>
          <ShoppingBasket sx={{ color: "gray" }} />
        </ListItem>
        <Divider />
        {!cartItems.length ? (
          <Typography
            sx={{
              fontSize: "18px",
              color: "#333",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "150px",
            }}
          >
            Nothing there...
          </Typography>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} {...item} />)
        )}
        {cartItems.length ? (
          <Box sx={{ display: "flex" }}>
            <ListItem>
              <Typography
                sx={{
                  fontSize: "16px",
                  width: "160px",
                }}
              >
                Total Price: ${Math.max(0, totalAmount).toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "flex-end" }}>
              <Button
                sx={{
                  color: "gray",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "red",
                    transition: "color 0.2s ease",
                  },
                }}
                onClick={removeAllFromCartHandler}
              >
                Remove All
              </Button>
            </ListItem>
          </Box>
        ) : null}
      </List>
    </Drawer>
  );
};

export default Cart;
