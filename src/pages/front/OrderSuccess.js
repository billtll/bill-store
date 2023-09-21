import { useEffect } from "react";
import OrderProcess from "../../components/front/OrderProcess";
import OrderSuccessSectionLeft from "../../components/front/order_success/OrderSuccessSectionLeft";
import OrderSuccessSectionRight from "../../components/front/order_success/OrderSuccessSectionRight";

const OrderSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mt-[calc(57px+32px)] lg:mt-[calc(70px+40px)]">
        <OrderProcess process1={true} process2={true} process3={true} />
        <div className="flex flex-col-reverse gap-4 mx-auto mb-10 xl:max-w-[1320px] lg:grid lg:grid-cols-2 lg:justify-items-center">
          <OrderSuccessSectionLeft />
          <OrderSuccessSectionRight />
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
