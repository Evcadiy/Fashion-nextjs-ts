import React from "react";
import HeroImg from "@/assets/img/HeroImg.png";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        marginTop: "65px",
      }}
    >
      <Container
        sx={{
          marginTop: "280px",
          display: "flex",
          "@media (max-width: 1700px)": { marginLeft: "180px" },
          "@media (max-width: 1250px)": {
            marginLeft: "100px",
          },
          "@media (max-width: 1100px)": {
            marginTop: "100px",
            maxWidth: "1000px",
            flexWrap: "wrap",
            flexDirection: "column-reverse",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "220px",
            "@media (max-width: 1100px)": {
              marginRight: "120px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              width: "520px",
              "@media (max-width: 1250px)": {
                fontSize: "40px",
                width: "420px",
              },
              "@media (max-width: 550px)": {
                fontSize: "30px",
                width: "320px",
              },
              "@media (max-width: 450px)": {
                fontSize: "20px",
                width: "220px",
              },
              "@media (max-width: 360px)": {
                fontSize: "16px",
                width: "170px",
              },
            }}
          >
            Fashion Unleashed
          </Typography>
          <Typography
            sx={{
              fontSize: "50px",
              width: "520px",
              fontWeight: "bold",
              "@media (max-width: 1250px)": {
                fontSize: "40px",
                width: "420px",
              },
              "@media (max-width: 550px)": {
                fontSize: "30px",
                width: "320px",
              },
              "@media (max-width: 450px)": {
                fontSize: "20px",
                width: "220px",
              },
              "@media (max-width: 360px)": {
                fontSize: "16px",
                width: "170px",
              },
            }}
          >
            Your Ultimate Style Odyssey Begins Here
          </Typography>
          <Button
            component={Link}
            href="/products"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "18px",
              fontWeight: "700",
              color: "#333",
              width: "100%",
              "&:hover": {
                backgroundColor: "#fff",
                "&::after": {
                  bottom: "8px",
                  transition: "bottom 0.3s ease, color 0.3s ease",
                },
              },
              "&::after": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: "-2px",
                left: 0,
                width: "160px",
                height: "2px",
                backgroundColor: "#333",
              },
              "@media (max-width: 1100px)": {
                width: "430px",
                color: "#FF69B4",
                "&::after": {
                  content: "none",
                },
              },
              "@media (max-width: 550px)": {
                fontSize: "16px",
                width: "330px",
              },
              "@media (max-width: 450px)": {
                fontSize: "14px",
                width: "230px",
              },
              "@media (max-width: 360px)": {
                fontSize: "12px",
                width: "185px",
              },
            }}
            disableTouchRipple
          >
            Discover more
          </Button>
        </Box>

        <Image
          style={{ paddingRight: "150px" }}
          priority
          src={HeroImg}
          alt="Image"
          layout="responsive"
          width={660}
          height={640}
          objectFit="cover"
        />
      </Container>
    </Box>
  );
};

export default Hero;
