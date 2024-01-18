"use client";

import { useAddToCart } from "@/hooks/useAddToCart";
import { useProducts } from "@/utils/products";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const { productDetailsId: id } = useParams();
  const { data: products, isLoading, isError } = useProducts();
  const product = products?.find((item) => item.id === Number(id));
  const addToCartHandler = useAddToCart();

  if (isLoading) {
    return (
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
        }}
      >
        <CircularProgress style={{ color: "#FF69B4" }} />
      </div>
    );
  }

  if (isError) {
    return (
      <h1
        style={{
          marginTop: "150px",
          color: "red",
        }}
      >
        Error loading products
      </h1>
    );
  }

  const addToCart = (
    id: number,
    title: string,
    image: string,
    price: number,
    quantity: number
  ) => {
    addToCartHandler(id, title, image, price, quantity);
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  const { title, price, image, description } = product;

  return (
    <section className="pt-40 ml-12 pb-12 pr-[25px] pl-[25px] lg:py-32 h-screen flex items-center">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[150px] lg:max-w-sm" src={image} />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[150] mx-auto">
              {title}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() =>
                addToCart(
                  product.id,
                  product.title,
                  product.image,
                  product.price,
                  1
                )
              }
              className="bg-black py-4 px-8 text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
