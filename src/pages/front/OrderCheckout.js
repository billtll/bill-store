import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderProcess from "../../components/front/OrderProcess";
import OrderCheckoutLeft from "../../components/front/order_checkout/OrderCheckoutLeft";
import OrderCheckoutRight from "../../components/front/order_checkout/OrderCheckoutRight";

const OrderCheckout = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mt-[calc(57px+32px)] lg:mt-[calc(70px+40px)]">
        <OrderProcess process1={true} process2={true} process3={false} />
        <div className="flex flex-col-reverse gap-4 mx-auto mb-10 xl:max-w-[1320px] lg:grid lg:grid-cols-2 lg:justify-items-center">
          <OrderCheckoutLeft orderData={orderData} />
          <OrderCheckoutRight orderData={orderData} getOrder={getOrder} />
        </div>
      </div>
    </>
  );
};

export default OrderCheckout;
