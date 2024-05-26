import { useState, useEffect } from "react";
import { List, Typography } from "@mui/material";
import Loading from "./Loading";

import useStore from "../store";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const productList = useStore((state) => state.productList);

  const setProductList = useStore((state) => state.setProductList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setProductList([]);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        setErrorMessage(error.message);
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setProductList]);

  return (
    <List>
      {isLoading ? (
        <Loading />
      ) : (
        /* if more list, the next feature is record the scroll position and use it to scroll back when reload */
        productList.map((spu) => <ProductItem key={spu.id} info={spu} />)
      )}
      {errorMessage && <Typography>{errorMessage}</Typography>}
    </List>
  );
};

export default ProductList;
