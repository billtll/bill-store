import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard";

const ProductDetailSection2 = ({ product, isLoading }) => {
  const [products, setProducts] = useState([]);

  const relatedProductsList = async (category) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    const relatedProducts = relatedCategoryProducts(
      res.data.products,
      category
    ).filter((item) => item.title !== product.title);

    const randomFourRelatedProducts = shuffleArray(relatedProducts).slice(0, 4);

    setProducts(randomFourRelatedProducts);
  };

  const relatedCategoryProducts = (products, category) => {
    const filterProducts = products.filter(
      (product) => product.category === category
    );
    const splitCategory = category?.split("-") || "";

    if (filterProducts.length >= 4) {
      return filterProducts;
    } else {
      return products.filter((product) =>
        product.category.startsWith(splitCategory[0])
      );
    }
  };

  const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

  useEffect(() => {
    relatedProductsList(product.category);
  }, [product.category, product.title]);

  return (
    <section className="mt-8 lg:mt-20">
      <h2 className="text-2xl font-extrabold text-[#111111] mb-4 lg:text-[2rem] lg:mb-6">
        相關餐點
      </h2>
      <div className="grid grid-cols-1 gap-6 mt-6 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border-2 border-solid border-[#e23b3b] rounded-3xl cursor-pointer hover:scale-105 hover:duration-500"
          >
            <Link to={`/product/${product.id}`}>
              <ProductCard product={product} isLoading={isLoading} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetailSection2;
