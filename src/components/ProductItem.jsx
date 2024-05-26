import propTypes from "prop-types";

import useStore from "../store";
import {
  ListItem,
  ListItemText,
  Typography,
  ImageListItem,
} from "@mui/material";

import styles from "./ProductItem.module.css";

const ProductItem = ({ info }) => {
  const setSelectedProductId = useStore((state) => state.setSelectedProductId);

  if (!info) return null;

  const { id, image, title, category, price } = info;

  const handleClick = () => {
    setSelectedProductId(id);
  };

  return (
    <ListItem key={id} style={{ cursor: 'pointer' }} onClick={handleClick}>
      <ImageListItem className={styles.imageContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={image}
            alt={title}
            loading="lazy"
          />
        </div>
      </ImageListItem>
      <ListItemText
        primary={title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              {category}
            </Typography>
            {` — $${price}`}
          </>
        }
      />
    </ListItem>
  );
};

ProductItem.propTypes = {
  info: propTypes.object,
};

export default ProductItem;
