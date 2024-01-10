"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import getCategories from "@/utils/category";
import { useState, useEffect } from "react";
import BlenderIcon from "@mui/icons-material/Blender";
import DiamondIcon from "@mui/icons-material/Diamond";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Badge, Button } from "@mui/material";
import Link from "next/link";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch } from "react-redux";
import { setCategory } from "@/redux/categoriesSlice";
import Cart from "../Cart/Cart";
import { useAppSelector } from "@/redux/store";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
    setOpen(false);
  };

  const handleAllProductsClick = () => {
    dispatch(setCategory(null));
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          boxShadow: "none",
          borderBottom: "1px solid #333",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              "@media (max-width: 788px)": {
                marginRight: 0,
                paddingLeft: "13px",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <CheckroomIcon
            sx={{
              width: "30px",
              height: "30px",
              color: "#FF69B4",
              "@media (max-width: 788px)": {
                display: "none",
              },
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#333",
              fontSize: "24px",
              "@media (max-width: 788px)": {
                display: "none",
              },
            }}
          >
            Fashion
          </Typography>
          <Button
            component={Link}
            href="/"
            sx={{
              fontSize: "16px",
              color: "#333",
              width: "170px",
              "&:hover": {
                backgroundColor: "#fff",
              },
              "@media (max-width: 788px)": {
                width: "80px",
              },
              "@media (max-width: 525px)": {
                fontSize: "14px",
              },
            }}
            disableTouchRipple
          >
            Home
          </Button>
          <Button
            onClick={handleAllProductsClick}
            component={Link}
            href="/products"
            sx={{
              fontSize: "16px",
              color: "#333",
              width: "170px",
              "&:hover": {
                backgroundColor: "#fff",
              },
              "@media (max-width: 788px)": {
                width: "130px",
              },
              "@media (max-width: 525px)": {
                fontSize: "14px",
              },
            }}
            disableTouchRipple
          >
            All products
          </Button>
        </Toolbar>
        <IconButton
          onClick={() => setCartOpen(true)}
          sx={{
            c: "#333",
            marginRight: "20px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#FF69B4",
              transition: "color 0.2s ease",
            },
          }}
        >
          <Badge color="primary" badgeContent={cartItemsQuantity}>
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
        <Cart cartOpen={cartOpen} closeCart={() => setCartOpen(false)} />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontWeight: 500,
            }}
          >
            CATEGORIES
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {categories?.map((text) => (
            <Link
              style={{ textDecoration: "none", color: "#333" }}
              href={"/products"}
              key={text}
              passHref
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => handleCategoryClick(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      textDecoration: "none",
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text === "electronics" ? <BlenderIcon /> : null}
                    {text === "jewelery" ? <DiamondIcon /> : null}
                    {text === "men's clothing" ? <MaleIcon /> : null}
                    {text === "women's clothing" ? <FemaleIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
