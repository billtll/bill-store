import { useEffect } from "react";
import ProductsSection1 from "../../components/front/products/ProductsSection1";
import ProductsSection2 from "../../components/front/products/ProductsSection2";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProductsSection1 />
      <ProductsSection2 />
    </>
  );
};

export default Products;
