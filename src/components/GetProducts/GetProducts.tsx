"use client";
import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  CardActions,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import { RootState } from "@/redux/store";
import { useProducts } from "@/utils/products";
import { useAddToCart } from "@/hooks/useAddToCart";
import MySnackBar from "../MySnackBar/SnackBar";
import CustomRedBtn from "../CustomBtn/CustomRedBtn";
import CustomAboutBtn from "../CustomBtn/CustomAboutBtn";
import VisibilityIcon from "@mui/icons-material/Visibility";

const GetProducts = () => {
  const addToCartHandler = useAddToCart();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const selectedCategory = useSelector(
    (state: RootState) => state.categories.selectedCategory
  );
  const categoryToUse = selectedCategory ?? undefined;

  const { data: products, isLoading, isError } = useProducts(categoryToUse);

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

  return (
    <>
      {products && (
        <Box
          sx={{
            padding: "150px 100px 100px 100px",
            "@media (max-width: 1200px)": {
              padding: "100px 30px 50px 90px",
            },
          }}
        >
          <Grid container spacing={6}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    // height: "100%",
                    boxShadow: "0 4px 8px 5px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    "&:hover": {
                      "& .MuiButton-root": {
                        visibility: "visible",
                        opacity: 1,
                      },
                      "& .MuiAboutButton-root": {
                        visibility: "visible",
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CustomRedBtn
                    onClick={() =>
                      addSnackBar(
                        product.id,
                        product.title,
                        product.image,
                        product.price,
                        1
                      )
                    }
                    icon={<AddIcon />}
                    className="MuiButton-root"
                  />
                  <CustomAboutBtn
                    href={`/products/${product.id}`}
                    icon={<VisibilityIcon />}
                    className="MuiAboutButton-root"
                  />

                  <CardMedia
                    component="img"
                    alt={product.title}
                    image={product.image}
                    sx={{
                      objectFit: "contain",
                      padding: "30px",
                      height: "300px",
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "150px",
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
                  <CardActions>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        width: "100%",
                        fontSize: "22px",
                        marginTop: "-15px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      ${product.price}
                    </Typography>
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
      )}
    </>
  );
};

export default GetProducts;
