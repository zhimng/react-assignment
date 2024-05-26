import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      productList: [],
      setProductList: (productList) => set({ productList }),
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      selectedProductId: undefined,
      setSelectedProductId: (id) => set({ selectedProductId: id }),
    }),
    {
      name: "product-storage",
    }
  )
);


export default useStore;
