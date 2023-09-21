import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReactDOM from "react-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const AddToCartModal = ({ onClose, product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { getCartData } = useOutletContext();

  const closeAddToCartModalWithTransition = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    if (isLoading) {
      return;
    }
    closeAddToCartModalWithTransition();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleEscKeyPress = (e) => {
    if (isLoading) {
      return;
    }
    if (e.key === "Escape") {
      closeAddToCartModalWithTransition();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isLoading, closeAddToCartModalWithTransition]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsModalVisible(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
      setIsLoading(false);
      closeAddToCartModalWithTransition();
      getCartData();
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed top-0 left-0 z-[9999] w-full h-full bg-[#00000080] ${
          isModalVisible ? "opacity-100" : "opacity-0"
        } duration-500 ease-in-out`}
        onClick={handleBackdropClick}
      />
      <div
        className={`w-[600px] max-w-[92%] max-h-[95%] fixed top-1/2 left-1/2 -translate-x-1/2 ${
          isModalVisible
            ? "-translate-y-1/2 opacity-100"
            : "translate-y-[-100%] opacity-0"
        } z-[10000] bg-white rounded-md duration-500 ease-in-out`}
        onClick={handleModalClick}
      >
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold xl:text-[22px]">
            加入餐點-{product.title}
          </h3>
          <button
            type="button"
            className="text-[#727070] hover:text-[#1b1b1b]"
            disabled={isLoading}
            onClick={onClose}
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
        <div className="max-h-[calc(95vh-60px)] h-auto overflow-y-auto">
          <div className="border-y-2">
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
              <div>
                <div className="border-4 ring-4 border-[#c61212] ring-[#e9900c]">
                  <div className="w-full h-[250px]">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{product.title}</h3>
                <div className="flex items-center mb-3 mt-2">
                  {product.category?.split("-").map((category) => (
                    <div
                      key={category}
                      className={`flex items-center text-white px-2 py-[2px] mr-1 rounded-lg text-[17px] ${
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
                <h4 className="text-[22px] text-[#e9900c] font-semibold my-1">
                  {`NT$${product.price} / ${product.unit}`}
                </h4>
                <div className="my-4">
                  <h4 className="text-[#cb3535] text-xl font-bold my-1">
                    內容物
                  </h4>
                  <p className="text-[19px] font-semibold">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between my-3 md:flex-row">
            <select
              className="rounded-md text-xl mx-4 border-2 border-[#cb3535] focus:border-[#cb3535] focus:ring-[#cb3535] md:w-1/2"
              disabled={isLoading}
              value={cartQuantity}
              onChange={(e) => setCartQuantity(e.target.value)}
            >
              {[...Array(5).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addProductToCart}
              disabled={isLoading}
              className="flex items-center justify-center text-lg text-white bg-[#cb3535] font-semibold mx-4 mt-2 py-2 border-2 border-[#cb3535] rounded-md hover:text-white hover:bg-[#e23b3b] md:w-1/2 md:mt-0"
            >
              {isLoading && (
                <ClipLoader size={22} color="#e9900c" className="mr-2" />
              )}
              {isLoading ? "處理中..." : "確定加入"}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#overlay-root")
  );
};

export default AddToCartModal;
