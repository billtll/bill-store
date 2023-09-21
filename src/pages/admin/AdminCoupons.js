import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import CouponModal from "../../components/admin/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

const AdminCoupons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [couponModalIsOpen, setCouponModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  // type: 決定 modal 展開的用途
  const [type, setType] = useState("create"); //create or edit
  const [tempCoupon, setTempCoupon] = useState({});

  const [, dispatch] = useContext(MessageContext);

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    setCouponModalIsOpen((preModalState) => !preModalState);
  };

  const closeCouponModal = () => {
    setCouponModalIsOpen((preModalState) => !preModalState);
  };

  const openDeleteModal = (coupon) => {
    setTempCoupon(coupon);
    setDeleteModalIsOpen((preModalState) => !preModalState);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen((preModalState) => !preModalState);
  };

  const getCoupons = async (page = 1) => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const deleteCoupon = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );

      if (res.data.success) {
        closeDeleteModal();
        getCoupons();
      }

      handleSuccessMessage(dispatch, res);
      setIsLoading(false);
    } catch (error) {
      handleErrorMessage(dispatch, error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-4">
        {couponModalIsOpen && (
          <CouponModal
            onCloseCouponModal={closeCouponModal}
            onGetCoupons={getCoupons}
            type={type}
            tempCoupon={tempCoupon}
          />
        )}
        {deleteModalIsOpen && (
          <DeleteModal
            onCloseDeleteModal={closeDeleteModal}
            text={tempCoupon.title}
            onDelete={deleteCoupon}
            id={tempCoupon.id}
            isLoading={isLoading}
          />
        )}
        <h3 className="text-xl lg:text-2xl font-semibold mb-3">優惠劵列表</h3>
        <hr />
        <div className="flex justify-end">
          <button
            type="button"
            className="mt-2 bg-[#e9900c] px-4 py-2 rounded text-lg text-white hover:bg-[#eb9b24]"
            onClick={() => openCouponModal("create", {})}
          >
            建立新優惠劵
          </button>
        </div>
        <div className="w-full mt-4 text-[17px] text-gray-800 text-left">
          <div className="hidden lg:flex border-b-2 font-semibold">
            <div className="py-2 w-[16%]">標題</div>
            <div className="py-2 w-1/6">折扣（%）</div>
            <div className="py-2 w-1/6">到期日</div>
            <div className="py-2 w-1/6">優惠碼</div>
            <div className="py-2 w-1/6">啟用狀態</div>
            <div className="py-2 w-1/6">編輯</div>
          </div>
          {isLoading && (
            <div className="text-xl text-[#c12122] font-bold text-center mt-5">
              優惠券列表載入中...
            </div>
          )}
          {coupons.length === 0 && isLoading === false && (
            <div className="text-xl text-[#c12122] font-bold text-center mt-5">
              您尚未建立優惠券列表
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center mt-5">
              <ClipLoader size={32} color="#e9900c" className="mr-3" />
            </div>
          )}
          <div>
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`flex flex-col text-lg border-[3px] pl-2 py-2 mb-2 lg:flex-row lg:border-0 lg:pl-0 lg:py-0 lg:mb-0 ${
                  isLoading && "blur-sm"
                }`}
              >
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/6">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    標題:
                  </div>
                  <div className="flex items-center mr-3">{coupon.title}</div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/6">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    折扣（%）:
                  </div>
                  <div className="flex items-center mr-3">{`${coupon.percent} %`}</div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/6">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    到期日:
                  </div>
                  <div className="flex items-center mr-3">
                    {new Date(coupon.due_date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/6">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    優惠碼:
                  </div>
                  <div className="flex items-center mr-3">{coupon.code}</div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/6">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    啟用狀態:
                  </div>
                  <div className="flex items-center mr-3">
                    {coupon.is_enabled ? "啟用" : "未啟用"}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/6">
                  <button
                    type="button"
                    className="border border-[#e9900c] bg-[#e9900c] px-2 py-1 rounded mr-2 text-white hover:bg-[#eb9b24] hover:border-[#eb9b24]"
                    onClick={() => openCouponModal("edit", coupon)}
                    disabled={isLoading}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="border border-red-600 text-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                    onClick={() => openDeleteModal(coupon)}
                    disabled={isLoading}
                  >
                    刪除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {coupons.length !== 0 && (
          <Pagination pagination={pagination} changePage={getCoupons} />
        )}
      </div>
    </>
  );
};

export default AdminCoupons;
