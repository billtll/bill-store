import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import ProductDetailSection2 from "./ProductDetailSection2";

const ProductDetailSection1 = () => {
  const [product, setProduct] = useState({});
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getCartData } = useOutletContext();

  const getDesignatedProduct = async (id) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    setProduct(res.data.product);
  };

  const addProductToCart = async (e) => {
    e.preventDefault();
    const data = {
      data: {
        product_id: product.id,
        qty: +cartQuantity,
      },
    };

    try {
      setIsLoading(true);
      await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
      getCartData();
      setCartQuantity(1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDesignatedProduct(id);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section className="mt-[57px] lg:mt-[70px]">
      <div className="px-3 mx-auto xl:max-w-[1320px]">
        <div className="grid grid-cols-1 pt-3 lg:grid-cols-2 md:pt-5 lg:pt-8">
          <div className="mb-1 lg:mr-4">
            <div className="border-4 ring-4 border-[#c61212] ring-[#e9900c]">
              <div className="w-full h-[250px] md:h-[280px] lg:h-[400px]">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 lg:px-3 lg:mt-0">
            <h1 className="text-2xl font-bold lg:text-3xl">{product.title}</h1>
            <div className="flex items-center my-3 lg:my-4">
              {product.category?.split("-").map((category) => (
                <div
                  key={category}
                  className={`flex items-center text-white px-2 py-[2px] mr-1 rounded-lg lg:text-lg ${
                    category === "握壽司"
                      ? "bg-[#ff6a00]"
                      : category === "軍艦壽司"
                      ? "bg-[#e26d0e]"
                      : category === "海膽"
                      ? "bg-[#f1a238]"
                      : category === "海老"
                      ? "bg-[#d83d2b]"
                      : category === "魚"
                      ? "bg-[#f8664c]"
                      : category === "貝"
                      ? "bg-[#ee4636]"
                      : category === "卵"
                      ? "bg-[#cf330c]"
                      : category === "藻"
                      ? "bg-[#f5a20a]"
                      : "bg-[#f35d06]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h5>{category}</h5>
                </div>
              ))}
            </div>
            <h4 className="text-[22px] text-[#e9900c] font-semibold my-2 lg:text-[26px] lg:my-4">{`NT$${product.price} / ${product.unit}`}</h4>
            <select
              className="w-full rounded-md text-xl mt-3 mb-2 border-2 border-[#cb3535] focus:border-[#cb3535] focus:ring-[#cb3535]"
              value={cartQuantity}
              onChange={(e) => setCartQuantity(e.target.value)}
              disabled={isLoading}
            >
              {[...Array(5).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button
              className="flex items-center justify-center w-full text-lg text-white bg-[#cb3535] font-semibold border-2 border-[#cb3535] py-2 px-4 mt-2 mb-5 rounded-md cursor-pointer hover:text-white hover:bg-[#e23b3b]"
              onClick={addProductToCart}
              disabled={isLoading}
            >
              {isLoading && (
                <ClipLoader size={22} color="#e9900c" className="mr-2" />
              )}
              {isLoading ? "處理中..." : "加入購物車"}
            </button>
            <div className="my-5 lg:my-6">
              <h3 className="text-[#cb3535] text-xl font-bold my-2">內容物</h3>
              <p className="text-lg font-semibold">{product.description}</p>
            </div>
            <div className="my-5 lg:my-6">
              <h3 className="text-[#cb3535] text-xl font-bold my-2">
                魚料介紹
              </h3>
              <p className="text-lg font-semibold">{product.content}</p>
            </div>
            <div className="my-5 lg:my-6">
              <h3 className="text-[#cb3535] text-xl font-bold my-2">
                最佳賞味期
              </h3>
              <p className="text-lg font-semibold">
                餐點皆為現點現做，為保持食物最佳口感及食材鮮度，拿到餐點後請立即食用
              </p>
            </div>
            <div className="my-5 lg:my-6">
              <h3 className="text-[#cb3535] text-xl font-bold my-2">
                點餐說明
              </h3>
              <p className="text-lg font-semibold">
                1. 店內用餐時間為60分鐘，若現場無其他候位客人則不受此限
              </p>
              <p className="text-lg font-semibold">
                2. 單一品項，一次最多可點5份；超過5份，請再次點餐
              </p>
              <p className="text-lg font-semibold">
                3. 為維持餐點品質，可來店自取，但不提供外送服務
              </p>
            </div>
          </div>
        </div>
        <ProductDetailSection2 product={product} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default ProductDetailSection1;
