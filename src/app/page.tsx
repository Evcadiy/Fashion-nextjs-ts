import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Hero from "@/components/Hero/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ marginTop: "100px" }}
            variant="body1"
            gutterBottom
          ></Typography>
        </Box>
      </Container>
    </>
  );
}
