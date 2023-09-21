import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const OrderCheckoutRight = ({ orderData, getOrder }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async (orderId) => {
    try {
      setIsLoading(true);
      const data = {
        order: orderData,
      };
      await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`,
        data
      );
      getOrder(orderId);
      setIsLoading(false);
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full lg:w-[90%] md:px-2">
        <div className="bg-[#fbe3d4] mx-4 p-4 lg:p-5 rounded-md">
          <div className="p-4">
            <div className="flex justify-center text-[#e9900c] mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center mb-4 lg:text-2xl">
              訂單資訊
            </h2>
            <div className="text-justify text-[17px] font-bold mb-4">
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>付款狀態</p>
                <p
                  className={`${
                    orderData.is_paid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {orderData.is_paid ? "已付款" : "未付款"}
                </p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>訂單金額</p>
                <p>NT${Math.floor(orderData.total)}</p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>訂單編號</p>
                <p className="max-[400px]:text-sm">{orderData.id}</p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>訂單成立日期</p>
                <p className="max-[400px]:text-sm">
                  {new Date(orderData.create_at * 1000).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>訂購者</p>
                <p>{orderData.user?.name}</p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>聯絡信箱</p>
                <p>{orderData.user?.email}</p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>聯絡電話</p>
                <p>{orderData.user?.tel}</p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>取餐地址</p>
                <p>宜蘭縣礁溪鄉仁愛路</p>
              </div>
              <div className="flex items-center justify-between mb-4 max-[300px]:flex-col max-[300px]:items-start">
                <p>餐點備註</p>
                <p>{orderData?.message ? orderData?.message : "無"}</p>
              </div>
            </div>
            <button
              type="submit"
              onClick={() => {
                handleCheckout(orderData.id);
              }}
              className="w-full flex items-center justify-center mt-2 py-2 text-lg font-bold text-white rounded-md bg-[#e23b3b] hover:bg-[#cc2a2a]"
            >
              {isLoading && (
                <ClipLoader size={22} color="#e9900c" className="mr-2" />
              )}
              {isLoading ? "處理中..." : "確認付款"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCheckoutRight;
