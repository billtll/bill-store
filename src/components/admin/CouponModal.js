import { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

const CouponModal = ({
  onCloseCouponModal,
  onGetCoupons,
  type,
  tempCoupon,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState({
    title: "",
    is_enabled: 1,
    percent: "",
    due_date: "",
    code: "",
  });
  const [date, setDate] = useState(new Date());
  const [, dispatch] = useContext(MessageContext);

  const changeHandler = (e) => {
    const { name, value, checked } = e.target;
    if (["percent"].includes(name)) {
      setTempData({ ...tempData, [name]: +value });
    } else if (name === "is_enabled") {
      setTempData({ ...tempData, [name]: +checked });
    } else {
      setTempData({ ...tempData, [name]: value });
    }
  };

  useEffect(() => {
    if (type === "create") {
      setTempData({
        title: "",
        is_enabled: 1,
        percent: "",
        due_date: "",
        code: "",
      });
      setDate(new Date());
    } else if (type === "edit") {
      setTempData(tempCoupon);
      setDate(new Date(tempCoupon.due_date));
    }
  }, [type, tempCoupon]);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      let api = `v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = "post";

      if (type === "edit") {
        api = `v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempData.id}`;
        method = "put";
      }

      const res = await axios[method](api, {
        data: {
          ...tempData,
          due_date: date.getTime(), // 轉換為 unix timestamp
        },
      });

      handleSuccessMessage(dispatch, res);
      onCloseCouponModal();
      onGetCoupons();
      setIsLoading(false);
    } catch (error) {
      handleErrorMessage(dispatch, error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        modalType="form"
        title={type === "create" ? "建立新優惠劵" : `編輯 ${tempData.title}`}
        closeButton="關閉"
        submitButton="儲存"
        onClose={onCloseCouponModal}
        onSubmit={submitHandler}
        isLoading={isLoading}
      >
        <div className="flex flex-col w-full">
          <div className="mb-3 flex flex-col">
            <label htmlFor="title">標題 (title)</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="請輸入標題"
              className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
              onChange={changeHandler}
              value={tempData.title}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col md:gap-3 md:mb-0 md:flex-row">
            <div className="mb-3 flex flex-col md:w-1/2">
              <label htmlFor="percent">折扣（%） (percent)</label>
              <input
                type="number"
                name="percent"
                id="percent"
                placeholder="請輸入折扣（%）"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.percent}
                disabled={isLoading}
              />
            </div>
            <div className="mb-3 flex flex-col md:w-1/2">
              <label htmlFor="due_date">到期日 (due_date)</label>
              <input
                type="date"
                name="due_date"
                id="due_date"
                placeholder="請輸入到期日"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={(e) => {
                  setDate(new Date(e.target.value));
                }}
                value={`${date.getFullYear().toString()}-${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex flex-col md:mr-3 md:mb-0 md:flex-row">
            <div className="mb-3 flex flex-col md:w-1/2">
              <label htmlFor="code">優惠碼 (code)</label>
              <input
                type="text"
                name="code"
                id="code"
                placeholder="請輸入優惠碼"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.code}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mb-3 flex items-center">
            <input
              type="checkbox"
              name="is_enabled"
              id="is_enabled"
              className="p-2 mr-1 border-2 text-[#e9900c] rounded focus:ring-transparent focus:ring-0 md:text-[17px]"
              onChange={changeHandler}
              checked={!!tempData.is_enabled}
              disabled={isLoading}
            />
            <label htmlFor="is_enabled">是否啟用</label>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CouponModal;
