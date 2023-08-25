import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Pagination from "../../components/Pagination";
import OrderModal from "../../components/admin/OrderModal";

const AdminOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);

  const [tempOrder, setTempOrder] = useState({});

  const openOrderModal = (order) => {
    setTempOrder(order);
    setOrderModalIsOpen((preModalState) => !preModalState);
  };

  const closeOrderModal = () => {
    setOrderModalIsOpen((preModalState) => !preModalState);
  };

  const getOrders = async (page = 1) => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
    );
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="p-4">
        {orderModalIsOpen && (
          <OrderModal
            onCloseOrderModal={closeOrderModal}
            onGetOrders={getOrders}
            tempOrder={tempOrder}
          />
        )}
        <h3 className="text-xl lg:text-2xl font-semibold mb-3">訂單列表</h3>
        <hr />
        <div className="w-full mt-4 text-[17px] text-gray-800 text-left">
          <div className="hidden lg:flex border-b-2 font-semibold">
            <div className="py-2 w-[14.285714%]">訂單日期</div>
            <div className="py-2 w-[14.285714%]">訂單 id</div>
            <div className="py-2 w-[14.285714%]">購買用戶</div>
            <div className="py-2 w-[14.285714%]">訂單金額</div>
            <div className="py-2 w-[14.285714%]">付款狀態</div>
            <div className="py-2 w-[14.285714%]">餐點備註</div>
            <div className="py-2 w-[14.285714%]">詳細訂單資訊</div>
          </div>
          {isLoading && (
            <div className="text-xl text-[#c12122] font-bold text-center mt-5">
              訂單列表載入中...
            </div>
          )}
          {orders.length === 0 && isLoading === false && (
            <div className="text-xl text-[#c12122] font-bold text-center mt-5">
              目前未有任何訂單
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center mt-5">
              <ClipLoader size={32} color="#e9900c" className="mr-3" />
            </div>
          )}
          <div>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`flex flex-col text-lg border-[3px] pl-2 py-2 mb-2 lg:flex-row lg:border-0 lg:pl-0 lg:py-0 lg:mb-0 ${
                  isLoading && "blur-sm"
                }`}
              >
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-[14.285714%]">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    訂單日期:
                  </div>
                  <div className="flex items-center mr-3">
                    {new Date(order.create_at * 1000).toLocaleString()}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-[14.285714%]">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    訂單 id:
                  </div>
                  <div className="flex items-center mr-3 text-ellipsis overflow-hidden">
                    {order.id}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-[14.285714%]">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    購買用戶:
                  </div>
                  <div className="flex items-center mr-3 text-ellipsis overflow-hidden">
                    {order.user?.name} {order.user?.tel}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-[14.285714%]">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    訂單金額:
                  </div>
                  <div className="flex items-center mr-3">NT${order.total}</div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-[14.285714%]">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    付款狀態:
                  </div>
                  <div className="flex items-center mr-3">
                    {order.is_paid ? (
                      <span className="text-green-600">付款完成</span>
                    ) : (
                      <span className="text-red-600">未付款</span>
                    )}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-[14.285714%]">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    餐點備註:
                  </div>
                  <div className="flex items-center">{order.message}</div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-[14.285714%]">
                  <button
                    type="button"
                    className="border border-[#e9900c] bg-[#e9900c] px-2 py-1 rounded mr-2 text-white hover:bg-[#eb9b24] hover:border-[#eb9b24]"
                    onClick={() => openOrderModal(order)}
                    disabled={isLoading}
                  >
                    詳細資訊
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {orders.length !== 0 && (
          <Pagination pagination={pagination} changePage={getOrders} />
        )}
      </div>
    </>
  );
};

export default AdminOrders;
