"use client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { addItem } from "@/redux/cartSlice";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const addToCartHandler = (
    productId: number,
    productName: string,
    productImage: string,
    productPrice: number,
    productQuantity: number
  ) => {
    const newItem = {
      id: productId,
      title: productName,
      image: productImage,
      price: productPrice,
      quantity: productQuantity,
    };

    dispatch(addItem(newItem));

    const updatedItems = [...cartItems, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  return addToCartHandler;
};
