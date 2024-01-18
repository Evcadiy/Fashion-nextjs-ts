import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GetProducts from "@/components/GetProducts/GetProducts";

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
