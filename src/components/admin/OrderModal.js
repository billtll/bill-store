import { useEffect, useState, useContext } from "react";
import Modal from "../UI/Modal";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

const OrderModal = ({ onCloseOrderModal, onGetOrders, tempOrder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState({
    is_paid: "",
    message: "",
    user: { tel: "", email: "", message: "" },
    ...tempOrder,
  });
  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    setTempData({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
      message: tempOrder.message,
      user: {
        name: tempOrder.user.name,
        tel: tempOrder.user.tel,
        email: tempOrder.user.email,
      },
    });
  }, [tempOrder]);

  const changeHandler = (e) => {
    const { name, value, checked } = e.target;
    if (["is_paid"].includes(name)) {
      setTempData((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      const [fieldName, subFieldName] = name.split(".");
      if (fieldName === "user") {
        setTempData((prevState) => ({
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            [subFieldName]: value,
          },
        }));
      } else {
        setTempData((prevState) => ({ ...prevState, [name]: value }));
      }
    }
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempOrder.id}`,
        {
          data: {
            ...tempData,
          },
        }
      );
      handleSuccessMessage(dispatch, res);
      onCloseOrderModal();
      onGetOrders();
      setIsLoading(false);
    } catch (error) {
      handleErrorMessage(dispatch, error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      modalType="form"
      title={`編輯 ${tempOrder.id}`}
      closeButton="關閉"
      submitButton="儲存"
      onClose={onCloseOrderModal}
      onSubmit={submitHandler}
      isLoading={isLoading}
    >
      <div className="flex flex-col w-full">
        <div className="flex mb-3 font-semibold text-[17px]">
          <div className="mr-2">訂單日期:</div>
          <div>{new Date(tempOrder.create_at * 1000).toLocaleString()}</div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:mr-4">
            <div className="mb-3 flex flex-col">
              <label htmlFor="name">訂購者</label>
              <input
                type="text"
                name="user.name"
                id="name"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.user.name}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-3 flex flex-col">
              <label htmlFor="email">信箱</label>
              <input
                type="email"
                name="user.email"
                id="email"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.user.email}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:mr-4">
            <div className="mb-3 flex flex-col">
              <label htmlFor="tel">手機號碼</label>
              <input
                type="tel"
                name="user.tel"
                id="tel"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.user.tel}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-3 flex flex-col">
              <label htmlFor="message">餐點備註</label>
              <textarea
                id="message"
                name="message"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.message}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 mb-3">
          <div className="mb-2 text-xl font-bold">訂單列表:</div>
          {tempOrder.products && (
            <div className="w-full text-[17px] text-left">
              <div className="flex border-b-2 text-[#c61212] font-semibold">
                <div className="py-2 w-2/3">品項名稱</div>
                <div className="py-2 w-1/3">
                  數量 (
                  {Object.values(tempOrder.products).reduce(
                    (acc, cur) => acc + cur.qty,
                    0
                  )}
                  )
                </div>
              </div>
              <div>
                {Object.values(tempOrder.products).map((cart) => (
                  <div
                    key={cart.id}
                    className="flex items-center border-b-2 text-[17px] text-[#e9900c] font-semibold"
                  >
                    <div className="w-2/3 py-[6px]">{cart.product.title}</div>
                    <div className="w-1/3 py-[6px]">{cart.qty}</div>
                  </div>
                ))}
              </div>
              <div className="flex text-[17px] text-[#1d020f] font-bold">
                <div className="w-2/3 mt-1">總金額</div>
                <div className="w-1/3 mt-1">
                  NT${Math.floor(tempData.total)}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 mb-3 flex flex-col">
          <div className="text-lg font-bold">修改付款狀態</div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_paid"
              id="is_paid"
              className="mr-2 py-[6px] pl-2 border-2 border-gray-400 text-[#c61212] rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
              checked={!!tempData.is_paid}
              onChange={changeHandler}
              disabled={isLoading}
            />
            <label htmlFor="is_paid">
              付款狀態 ({tempData.is_paid ? "已付款" : "未付款"})
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
