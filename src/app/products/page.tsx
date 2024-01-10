import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GetProducts from "@/components/GetProducts/GetProducts";
import MiniDrawer from "@/components/MiniDrawer/MiniDrawer";

export default function Products() {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GetProducts />
        </Box>
      </Container>
    </>
  );
}
