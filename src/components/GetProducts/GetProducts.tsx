"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { Product } from "@/utils/products";
import getProducts from "@/utils/products";
import { useAddToCart } from "@/hooks/useAddToCart";
import MySnackBar from "../MySnackBar/SnackBar";
import { Item } from "@/redux/cartSlice";

const GetProducts = () => {
  const addToCartHandler = useAddToCart();
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const selectedCategory = useSelector(
    (state: RootState) => state.categories.selectedCategory
  );

  useEffect(() => {
    if (selectedCategory !== null) {
      getProducts(selectedCategory).then((res) => {
        setData(res);
        setLoading(false);
      });
    } else {
      getProducts().then((res) => {
        setData(res);
        setLoading(false);
      });
    }
  }, [selectedCategory]);

  const addSnackBar = (
    id: number,
    title: string,
    image: string,
    price: number,
    quantity: number
  ) => {
    addToCartHandler(id, title, image, price, quantity);
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "300px",
          }}
        >
          <CircularProgress style={{ color: "#FF69B4" }} />
        </div>
      ) : (
        data && (
          <Box
            sx={{
              padding: "150px 100px 100px 100px",
              "@media (max-width: 1200px)": {
                padding: "100px 30px 50px 90px",
              },
            }}
          >
            <Grid container spacing={6}>
              {data.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      boxShadow: "0 4px 8px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={product.title}
                      height="300"
                      image={product.image}
                      sx={{ objectFit: "contain", padding: "30px" }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {product.title}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ fontSize: "18px " }}
                      >
                        ${product.price}
                      </Typography>
                      <Button
                        onClick={() =>
                          addSnackBar(
                            product.id,
                            product.title,
                            product.image,
                            product.price,
                            1
                          )
                        }
                        variant="contained"
                        sx={{
                          p: "5px 25px",
                          backgroundColor: "#FF69B4",
                          border: "1px solid #FF69B4",
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#FF69B4",
                            border: "1px solid #FF69B4",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Buy
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <MySnackBar
              snackBarOpen={snackBarOpen}
              handleSnackBarClose={handleSnackBarClose}
            />
          </Box>
        )
      )}
    </>
  );
};

export default GetProducts;
