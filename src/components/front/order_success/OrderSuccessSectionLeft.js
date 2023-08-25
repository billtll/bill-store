import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderSuccessSectionLeft = () => {
  const [orderData, setOrderData] = useState({});
  const { orderId } = useParams();

  const getOrder = async (orderId) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
    );
    setOrderData(res.data.order);
  };

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  return (
    <>
      <div className="w-full mt-5 px-4 md:px-10 lg:w-[90%] lg:mt-0">
        <h2 className="text-xl font-bold mb-4 lg:text-2xl">訂購餐點明細</h2>
        <div className="border-t-2 mb-5">
          {Object.values(orderData?.products || {}).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b-2 gap-5"
            >
              <div className="flex items-center">
                <div className="border-2 ring-2 border-[#c61212] ring-[#e9900c]">
                  <div className="w-20 h-20">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between w-full">
                <div>
                  <p className="mb-1 text-[17px] text-[#666] font-semibold max-[360px]:text-sm">
                    {item.product.title}
                  </p>
                  <p className="mb-1 text-[17px] text-[#666] font-semibold max-[360px]:text-sm">
                    NT${item.product.price} / {item.product.unit}
                  </p>
                  <p className="mb-1 text-[17px] text-[#666] font-semibold max-[360px]:text-sm">
                    數量: {item.qty}
                  </p>
                </div>
                <p className="text-[17px] text-[#666] font-semibold max-[360px]:text-sm">
                  NT${item.final_total}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-2 flex justify-between text-lg font-bold">
          <p className="text-lg text-[#444] max-[360px]:text-sm">總計</p>
          <p className="text-lg text-[#444] max-[360px]:text-sm">
            NT${orderData?.total}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessSectionLeft;
