import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import CartItem from "../CartItem";
import axios from "axios";

const OrderInfoSectionLeft = () => {
  const { setActiveLink, getCartData, cartData } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isUseACoupon, setIsUseACoupon] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleUseACoupon = async () => {
    try {
      setIsLoading(true);
      const data = {
        data: {
          code: couponCode.trim(),
        },
      };
      await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        data
      );
      setIsUseACoupon(true);
      getCartData();
      setErrorMessage("");
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
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
              total={item.total}
              onUpdateCartItem={(qty) => updateCartItem(item, qty)}
              onRemoveCartItem={() => removeCartItem(item.id)}
              isLoading={isLoading}
              textSetting="text-[17px] text-[#666] font-semibold max-[360px]:text-sm"
            />
          ))}
        </div>
        <div className="mb-[10px] flex items-center justify-start">
          <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
              />
            </svg>
          </div>
          <div className="font-semibold text-lg text-[#444] max-[360px]:text-sm">
            歡慶五週年，結帳輸入{" "}
            <span className="font-black text-[#c61212]">QiYangIs5Y</span> 就享{" "}
            <span className="font-black text-[#c61212]">95折</span>
          </div>
        </div>
        <div className="mb-[14px]">
          <div className="mb-2 flex items-center justify-center font-semibold max-[360px]:text-sm">
            <input
              type="text"
              placeholder="請輸入優惠碼"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
              }}
              className="w-[85%] rounded-l border-r-0 border-[#dad6ce] py-[6px] focus:border-[#e9900c] focus:ring-0 max-[360px]:w-[80%] max-[360px]:text-sm"
            />
            <button
              onClick={handleUseACoupon}
              className="w-[15%] rounded-r border-[1px] py-[6px] px-2 border-[#e9900c] text-[#e9900c] hover:text-white hover:bg-[#e9900c] max-[360px]:w-[20%]"
            >
              {isLoading ? (
                <ClipLoader size={14} color="#c61212" className="mr-1" />
              ) : (
                "套用"
              )}
            </button>
          </div>
          {errorMessage && (
            <p className="text-[#c61212] font-bold">
              {errorMessage} 請再次輸入
            </p>
          )}
        </div>
        <div className="mb-[6px] flex justify-between text-lg font-bold text-[#444] max-[360px]:text-sm">
          <p>總計</p>
          <p>NT${cartData.total}</p>
        </div>
        {isUseACoupon && (
          <div className="mb-[6px] flex justify-between text-lg font-bold text-[#c61212] max-[360px]:text-sm">
            <p>折扣價</p>
            <p>NT${Math.floor(cartData.final_total)}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderInfoSectionLeft;
