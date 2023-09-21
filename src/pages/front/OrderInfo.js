import { NavLink, useOutletContext } from "react-router-dom";
import OrderProcess from "../../components/front/OrderProcess";
import OrderInfoSectionLeft from "../../components/front/order_info/OrderInfoSectionLeft";
import OrderInfoSectionRight from "../../components/front/order_info/OrderInfoSectionRight";
import { useEffect } from "react";

const OrderInfo = () => {
  const { cartData } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mt-[calc(57px+32px)] lg:mt-[calc(70px+40px)]">
        {cartData?.carts?.length === 0 && (
          <div className="h-[calc(100vh-57px-32px-57px-44px)] lg:h-[calc(100vh-70px-40px-70px-44px)]">
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
              <h4 className="text-xl font-semibold mt-6 lg:text-2xl">
                您的購物車未有任何品項
              </h4>
              <button className="mt-6">
                <NavLink
                  to="/products"
                  className="inline-block px-5 py-3 text-white bg-[#e23b3b] rounded-md lg:px-6 lg:text-xl hover:bg-[#cc2a2a]"
                >
                  立即去點餐
                </NavLink>
              </button>
            </div>
          </div>
        )}
        {cartData?.carts?.length > 0 && (
          <>
            <OrderProcess process1={true} process2={false} process3={false} />
            <div className="grid grid-cols-1 gap-4 mx-auto mb-10 xl:max-w-[1320px] lg:grid-cols-2 lg:justify-items-center">
              <OrderInfoSectionLeft />
              <OrderInfoSectionRight />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderInfo;
