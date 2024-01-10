import { Box, Divider, Typography } from "@mui/material";
import { Card, CardContent, IconButton, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

import { useDispatch } from "react-redux";
import ItemQuantity from "./ItemQuantity";
import { removeFullItem } from "@/redux/cartSlice";

export interface CartItemProps {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const StyledCard = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  margin: "1rem",
  padding: "1rem",
  boxShadow: "none",
  "@media (max-width: 500px)": {
    padding: "1px",
  },
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const ItemDetails = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const CartItem = (props: CartItemProps) => {
  const dispatch = useDispatch();
  const { id, title, image, price, quantity } = props;
  return (
    <>
      <StyledCard>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            maxWidth: "100px",
            objectFit: "contain",
            "@media (max-width: 500px)": {
              maxWidth: "80px",
            },
          }}
        />
        <StyledCardContent>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              width: "250px",
              "@media (max-width: 500px)": {
                width: "180px",
              },
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <ItemQuantity {...props} />

            <Typography variant="body2" color="textSecondary" component="p">
              ${price}
            </Typography>
          </Box>
        </StyledCardContent>
        <ItemDetails>
          <IconButton
            onClick={() => dispatch(removeFullItem(id))}
            aria-label="delete item"
            sx={{
              "@media (max-width: 500px)": {
                marginLeft: "-25px",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ItemDetails>
      </StyledCard>
      <Divider />
    </>
  );
};
export default CartItem;
