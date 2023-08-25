import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import CartItem from "../CartItem";
import axios from "axios";

const OrderInfoSectionLeft = () => {
  const { setActiveLink, getCartData, cartData } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    try {
      await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      getCartData();
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCartData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAllCartItem = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/carts`);
      getCartData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full px-4 md:px-10 lg:w-[90%]">
        <div className="flex justify-between items-center mb-3">
          <Link
            to="/products"
            className="items-center text-[#444] font-bold hover:text-[#111]"
            onClick={() => {
              setActiveLink("/products");
            }}
          >
            <span className="text-xl">&laquo;</span> 繼續點餐
          </Link>

          <button
            type="button"
            onClick={removeAllCartItem}
            disabled={isLoading}
            className="text-sm text-[#a6aca6] font-semibold border-2 border-[#a6aca6] rounded px-2 py-1 hover:bg-[#a6aca6] hover:text-[#000]"
          >
            {isLoading && (
              <ClipLoader size={12} color="#e9900c" className="mr-1" />
            )}
            {isLoading ? "處理中..." : "清空購物車"}
          </button>
        </div>
        <div className="border-t-2 mb-5">
          {cartData?.carts?.map((item) => (
            <CartItem
              key={item.id}
              imageUrl={item.product.imageUrl}
              title={item.product.title}
              price={item.product.price}
              unit={item.product.unit}
              qty={item.qty}
              total={item.final_total}
              onUpdateCartItem={(qty) => updateCartItem(item, qty)}
              onRemoveCartItem={() => removeCartItem(item.id)}
              isLoading={isLoading}
              textSetting="text-[17px] text-[#666] font-semibold max-[360px]:text-sm"
            />
          ))}
        </div>
        <div className="mb-2 flex justify-between text-lg font-bold">
          <p className="text-lg text-[#444] max-[360px]:text-sm">總計</p>
          <p className="text-lg text-[#444] max-[360px]:text-sm">
            NT${cartData.final_total}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderInfoSectionLeft;
