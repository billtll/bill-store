import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ClipLoader } from "react-spinners";

const OrderTrackingModal = ({ onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderInput, setOrderInput] = useState("");
  const [orderData, setOrderData] = useState({});

  const closeOrderTrackingModalWithTransition = useCallback(() => {
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
    closeOrderTrackingModalWithTransition();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleEscKeyPress = (e) => {
    if (isLoading) {
      return;
    }
    if (e.key === "Escape") {
      closeOrderTrackingModalWithTransition();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isLoading, closeOrderTrackingModalWithTransition]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsModalVisible(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getOrder = async (orderId) => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      setOrderData(res.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderTracking = async () => {
    setIsLoading(true);
    await getOrder(orderInput.trim());
    setIsLoading(false);
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
          <h3 className="text-xl font-semibold xl:text-[22px]">訂單查詢</h3>
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
          <div className="border-t-2 p-4">
            <div className="mb-4">
              <div className="flex flex-col">
                <label
                  htmlFor="orderId"
                  className="mb-1 text-lg max-[300px]:text-base font-semibold"
                >
                  訂單編號
                </label>
                <div className="flex items-center">
                  <input
                    id="orderId"
                    type="text"
                    placeholder="請輸入訂單編號"
                    value={orderInput}
                    onChange={(e) => {
                      setOrderInput(e.target.value);
                    }}
                    className="w-[70%] max-[300px]:w-[67%] rounded-md rounded-r-none text-lg max-[300px]:text-base font-semibold border-[#dad6ce] focus:border-[#e9900c] focus:ring-0"
                  />
                  <button
                    type="button"
                    disabled={orderInput === ""}
                    onClick={handleOrderTracking}
                    className="w-[30%] max-[300px]:w-[33%] rounded-md rounded-l-none text-lg max-[300px]:text-base font-semibold border-[1px] py-2 border-[#e9900c] text-white bg-[#e9900c] hover:bg-[#eb9b24]"
                  >
                    <div className="flex justify-center items-center">
                      <div className="mr-2 max-[300px]:mr-1">
                        {isLoading ? (
                          <ClipLoader size={18} color="#c61212" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 max-[300px]:w-4 max-[300px]:h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        )}
                      </div>
                      <span>查詢</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-4 text-lg font-semibold text-[#666] max-[300px]:text-base">
              {orderData === null && (
                <p className="text-[#c61212]">查無此訂單號碼，請重新輸入！</p>
              )}
              {orderData !== null && Object.keys(orderData).length > 0 && (
                <>
                  <p className="mb-1 text-[17px]  font-semibold max-[360px]:text-sm">
                    付款狀態:{" "}
                    <span
                      className={`${
                        orderData.is_paid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {orderData.is_paid ? "已付款" : "未付款"}
                    </span>
                  </p>
                  <p className="mb-1 text-[17px]  font-semibold max-[360px]:text-sm">
                    訂購日期:{" "}
                    {new Date(orderData.create_at * 1000).toLocaleDateString()}
                  </p>
                  <p className="mb-1 text-[17px]  font-semibold max-[360px]:text-sm">
                    訂購者: {orderData.user?.name}
                  </p>
                  <p className="mb-1 text-[17px] font-semibold max-[360px]:text-sm">
                    聯絡電話: {orderData.user?.tel}
                  </p>
                  <p className="mb-1 text-[17px] font-semibold max-[360px]:text-sm">
                    餐點備註: {orderData?.message ? orderData?.message : "無"}
                  </p>
                  <p className="mt-4 mb-2 text-xl font-bold max-[360px]:text-sm">
                    餐點列表:
                  </p>
                  {orderData.products && (
                    <div className="w-full text-[17px] text-left">
                      <div className="flex border-b-2 text-[#c61212] font-semibold">
                        <div className="py-1 w-2/3">品項名稱</div>
                        <div className="py-1 w-1/3">
                          數量 (
                          {Object.values(orderData.products).reduce(
                            (acc, cur) => acc + cur.qty,
                            0
                          )}
                          )
                        </div>
                      </div>
                      <div>
                        {Object.values(orderData.products).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center border-b-2 text-[17px] text-[#e9900c] font-semibold"
                          >
                            <div className="w-2/3 py-[6px]">
                              {order.product.title}
                            </div>
                            <div className="w-1/3 py-[6px]">{order.qty}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex text-[17px] text-[#1d020f] font-bold">
                        <div className="w-2/3 mt-1">總金額</div>
                        <div className="w-1/3 mt-1">
                          NT${Math.floor(orderData.total)}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#overlay-root")
  );
};

export default OrderTrackingModal;
