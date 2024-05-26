import { useState, useEffect } from "react";

import { Drawer, Box, Typography } from "@mui/material";

import Loading from "./Loading";
import styles from "./Detail.module.css";

import useStore from "../store";

const Detail = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const selectedProductId = useStore((state) => state.selectedProductId);
  const setSelectedProductId = useStore((state) => state.setSelectedProductId);

  useEffect(() => {
    if (!selectedProductId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://fakestoreapi.com/products/${selectedProductId}`
        );
        const data = await response.json();
        setSelectedProduct(data);
      } catch (error) {
        setErrorMessage(error.message);
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedProductId, setSelectedProduct]);

  if (!selectedProductId || !selectedProduct) return null;

  const { image, title, category, price, description } = selectedProduct;

  return (
    <Drawer
      anchor="right"
      open={Boolean(selectedProduct)}
      onClose={() => {
        setSelectedProduct(null);
        setSelectedProductId(null);
      }}
    >
      {/* if spu was deleted, show error message or ui design page. */}
      {errorMessage && <Typography>{errorMessage}</Typography>}
      {isLoading && <Loading />}
      {selectedProduct && (
        <Box p={2} width={300}>
          <>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={image}
                alt={title}
                loading="lazy"
              />
            </div>
          </>
          {/* <Avatar src={image} sx={{ width: 100, height: 100, mb: 2 }} /> */}
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {category}
          </Typography>
          <Typography variant="h5" mt={2}>
            ${price}
          </Typography>
          <Typography variant="body1" mt={2}>
            {description}
          </Typography>
        </Box>
      )}
    </Drawer>
  );
};

export default Detail;
