import { Link } from "react-router-dom";

const OrderSuccessSectionRight = () => {
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
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center mb-4 lg:text-2xl">
              完成訂購
            </h2>
            <div className="text-justify text-[17px] font-bold mb-4">
              <p className="mb-4">親愛的顧客，感謝您透過本平台訂餐。</p>
              <p className="mb-4">
                鮨漾壽司非常感激您的信任和支持，讓我們有機會為您提供美味的餐點和優質的服務。
              </p>
              <p className="mb-4">
                取餐地址：
                <span className="text-[#c61212] font-extrabold">
                  宜蘭縣礁溪鄉仁愛路
                </span>
              </p>
              <p className="mb-4">
                若有任何問題，歡迎來電詢問：
                <span className="text-[#c61212] font-extrabold">
                  03-9876543
                </span>
              </p>
            </div>
            <Link to="/products">
              <button
                type="submit"
                className="w-full inline-block mt-2 py-2 text-lg font-bold text-white rounded-md bg-[#e23b3b] hover:bg-[#cc2a2a]"
              >
                看看其他點餐
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessSectionRight;
