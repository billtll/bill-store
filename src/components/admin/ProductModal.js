import { useEffect, useState, useContext, useRef } from "react";
import Modal from "../UI/Modal";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

const ProductModal = ({
  onCloseProductModal,
  onGetProducts,
  type,
  tempProduct,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState({
    title: "",
    category: "",
    origin_price: "",
    price: "",
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
  });
  const fileRef = useRef(null);
  const [, dispatch] = useContext(MessageContext);

  const handleImageUpload = async () => {
    try {
      const file = fileRef.current.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );
      setTempData({
        ...tempData,
        imageUrl: res.data.imageUrl,
      });
    } catch (error) {
      handleErrorMessage(dispatch, error);
    }
  };

  const changeHandler = (e) => {
    const { name, value, checked } = e.target;
    if (["origin_price", "price"].includes(name)) {
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
        category: "",
        origin_price: "",
        price: "",
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
      });
    } else if (type === "edit") {
      setTempData(tempProduct);
    }
  }, [type, tempProduct]);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      let api = `v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = "post";

      if (type === "edit") {
        api = `v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempData.id}`;
        method = "put";
      }

      const res = await axios[method](api, { data: tempData });
      handleSuccessMessage(dispatch, res);
      onCloseProductModal();
      onGetProducts();
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
        title={type === "create" ? "建立新商品" : `編輯 ${tempData.title}`}
        closeButton="關閉"
        submitButton="儲存"
        onClose={onCloseProductModal}
        onSubmit={submitHandler}
        isLoading={isLoading}
      >
        <div className="md:w-1/3 md:mr-4">
          <div className="mb-3 flex flex-col">
            <label htmlFor="image">輸入圖片網址</label>
            <input
              type="text"
              name="imageUrl"
              id="image"
              placeholder="請輸入圖片連結"
              className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
              onChange={changeHandler}
              value={tempData.imageUrl}
              disabled={isLoading}
            />
            <img
              src={tempData.imageUrl}
              alt={`${tempData.title} 圖片`}
              className="w-[250px] max-w-full h-auto mt-3 border border-gray-500"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="customFile">或 上傳圖片</label>
            <input
              type="file"
              id="customFile"
              className="customFile"
              ref={fileRef}
              onChange={handleImageUpload}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="md:w-2/3">
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
              <label htmlFor="category">分類 (category)</label>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="請輸入分類"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.category}
                disabled={isLoading}
              />
            </div>
            <div className="mb-3 flex flex-col md:w-1/2">
              <label htmlFor="unit">單位 (unit)</label>
              <input
                type="text"
                name="unit"
                id="unit"
                placeholder="請輸入單位"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.unit}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex flex-col md:gap-3 md:mb-0 md:flex-row">
            <div className="mb-3 flex flex-col md:w-1/2">
              <label htmlFor="origin_price">原價 (origin_price)</label>
              <input
                type="number"
                name="origin_price"
                id="origin_price"
                placeholder="請輸入原價"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.origin_price}
                disabled={isLoading}
              />
            </div>
            <div className="mb-3 flex flex-col md:w-1/2">
              <label htmlFor="price">售價 (price)</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="請輸入售價"
                className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
                onChange={changeHandler}
                value={tempData.price}
                disabled={isLoading}
              />
            </div>
          </div>
          <hr className="border my-3" />
          <div className="mb-3 flex flex-col">
            <label htmlFor="description">產品描述 (description)</label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="請輸入產品描述"
              className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
              onChange={changeHandler}
              value={tempData.description}
              disabled={isLoading}
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="content">說明內容 (content)</label>
            <textarea
              type="text"
              name="content"
              id="content"
              placeholder="請輸入產品說明內容"
              className="py-[6px] pl-2 border-2 border-gray-400 text-gray-500 rounded focus:border-[#e9900c] focus:ring-0 md:text-[17px]"
              onChange={changeHandler}
              value={tempData.content}
              disabled={isLoading}
            />
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

export default ProductModal;
