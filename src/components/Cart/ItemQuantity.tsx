import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

import { useAddToCart } from "@/hooks/useAddToCart";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { removeItem } from "@/redux/cartSlice";
import { CartItemProps } from "./CartItem";

const QuantityPicker = styled("div")({
  display: "flex",
  alignItems: "center",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "6px",
  "@media (max-width: 500px)": {
    padding: "1px",
  },
});

const StyledIconButton = styled(IconButton)({
  padding: "5px",
});

const ItemQuantity: FC<CartItemProps> = ({
  id,
  title,
  image,
  price,
  quantity,
}) => {
  const dispatch = useDispatch();
  const addToCartHandler = useAddToCart();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);

  const removeFromCartHandler = async (id: number) => {
    await removeFromLocalStorage(id);

    dispatch(removeItem(id));

    const removedItem = cartItems.find((item) => item.id === id);

    if (removedItem) {
      const updatedTotalAmount = totalAmount - removedItem.price;
      localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmount));
    }
  };

  const removeFromLocalStorage = async (id: number) => {
    return new Promise<void>((resolve) => {
      const existingItemsString = localStorage.getItem("cartItems");

      const existingItems: any[] = existingItemsString
        ? JSON.parse(existingItemsString)
        : [];

      const updatedItems = existingItems.filter((item) => item.id !== id);

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      resolve();
    });
  };

  return (
    <QuantityPicker>
      <StyledIconButton
        onClick={() => removeFromCartHandler(id)}
        aria-label="reduce quantity"
      >
        <RemoveIcon />
      </StyledIconButton>
      <Typography sx={{ padding: "0px 5px 0px 5px" }}>{quantity}</Typography>
      <StyledIconButton
        onClick={() => {
          addToCartHandler(id, title, image, price, 1);
        }}
        aria-label="increase quantity"
      >
        <AddIcon />
      </StyledIconButton>
    </QuantityPicker>
  );
};

export default ItemQuantity;
