import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import CartItem from "./CartItem";

const Cart = ({
  cartIsOpen,
  onToggleCart,
  cartData,
  getCartData,
  setActiveLink,
}) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const backdrop = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsCartVisible(cartIsOpen);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cartIsOpen]);

  const closeCartWithTransition = useCallback(() => {
    setIsCartVisible(false);
    setTimeout(() => {
      onToggleCart();
    }, 500); // 延遲 500 毫秒後關閉 Cart 元件
  }, [onToggleCart]);

  const handleOutsideClick = (e) => {
    if (isLoading) {
      return;
    }

    if (e.target === backdrop.current) {
      closeCartWithTransition();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isLoading, closeCartWithTransition]);

  const handleEscKeyPress = (e) => {
    if (isLoading) {
      return;
    }

    if (e.key === "Escape") {
      closeCartWithTransition();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isLoading, closeCartWithTransition]);

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
    setIsLoading(true);
    try {
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/carts`);
      getCartData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        ref={backdrop}
        className={`fixed top-0 left-0 z-[9999] w-full h-full overflow-x-hidden overflow-y-auto bg-[#00000080] ${
          isCartVisible ? "opacity-100" : "opacity-0"
        } duration-500 ease-in-out`}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-[350px] max-w-full bg-white ${
            isCartVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          } duration-500 ease-in-out`}
        >
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold xl:text-[22px]">
              購物車{" "}
              {cartData?.carts?.length > 0 && (
                <span>
                  ({cartData?.carts?.reduce((acc, cur) => acc + cur.qty, 0)})
                </span>
              )}
            </h3>
            <button
              type="button"
              className="text-[#727070] hover:text-[#1b1b1b]"
              disabled={isLoading}
              onClick={closeCartWithTransition}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {cartData?.carts?.length === 0 && (
            <div className="px-4 flex flex-col justify-center items-center">
              <div className="text-[#ff6a00]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mt-6">
                您的購物車未有任何品項
              </h4>
              <Link to="/products" className="mt-6">
                <button
                  type="button"
                  className="px-5 py-3 text-white bg-[#e23b3b] rounded-md lg:px-6 lg:text-xl hover:bg-[#cc2a2a]"
                  onClick={() => {
                    setActiveLink("/products");
                    closeCartWithTransition();
                  }}
                >
                  立即去點餐
                </button>
              </Link>
            </div>
          )}
          {cartData?.carts?.length > 0 && (
            <div className="h-[calc(100vh-60px)] overflow-y-auto mb-4 px-4">
              <div className="flex justify-end mb-3">
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
                    textSetting="text-sm"
                  />
                ))}
              </div>
              <div className="mb-2 flex justify-between text-lg font-bold">
                <p>總計</p>
                <p>NT${cartData.total}</p>
              </div>
              <Link to="/order-info">
                <button
                  type="button"
                  className="mt-2 mb-2 w-full inline-block py-2 text-lg font-bold text-white rounded-md bg-[#e23b3b] hover:bg-[#cc2a2a]"
                  onClick={() => {
                    setActiveLink("/order-info");
                    closeCartWithTransition();
                  }}
                  disabled={isLoading}
                >
                  前往下單
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
