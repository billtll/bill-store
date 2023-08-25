import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import ProductModal from "../../components/admin/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

const AdminProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  // type: 決定 modal 展開的用途
  const [type, setType] = useState("create"); //create or edit
  const [tempProduct, setTempProduct] = useState({});

  const [, dispatch] = useContext(MessageContext);

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    setProductModalIsOpen((preModalState) => !preModalState);
  };

  const closeProductModal = () => {
    setProductModalIsOpen((preModalState) => !preModalState);
  };

  const openDeleteModal = (product) => {
    setTempProduct(product);
    setDeleteModalIsOpen((preModalState) => !preModalState);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen((preModalState) => !preModalState);
  };

  const getProducts = async (page = 1) => {
    setIsLoading(true);
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    setProducts(res.data.products);
    setPagination(res.data.pagination);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );

      if (res.data.success) {
        closeDeleteModal();
        getProducts();
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
        {productModalIsOpen && (
          <ProductModal
            onCloseProductModal={closeProductModal}
            onGetProducts={getProducts}
            type={type}
            tempProduct={tempProduct}
          />
        )}
        {deleteModalIsOpen && (
          <DeleteModal
            onCloseDeleteModal={closeDeleteModal}
            text={tempProduct.title}
            onDelete={deleteProduct}
            id={tempProduct.id}
            isLoading={isLoading}
          />
        )}
        <h3 className="text-xl lg:text-2xl font-semibold mb-3">產品列表</h3>
        <hr />
        <div className="flex justify-end">
          <button
            type="button"
            className="mt-2 bg-[#e9900c] px-4 py-2 rounded text-lg text-white hover:bg-[#eb9b24]"
            onClick={() => openProductModal("create", {})}
          >
            建立新商品
          </button>
        </div>
        <div className="w-full mt-4 text-[17px] text-gray-800 text-left">
          <div className="hidden lg:flex border-b-2 font-semibold">
            <div className="py-2 w-1/5">分類</div>
            <div className="py-2 w-1/5">名稱</div>
            <div className="py-2 w-1/5">售價</div>
            <div className="py-2 w-1/5">啟用狀態</div>
            <div className="py-2 w-1/5">編輯</div>
          </div>
          {isLoading && (
            <div className="text-xl text-[#c12122] font-bold text-center mt-5">
              產品列表載入中...
            </div>
          )}
          {products.length === 0 && isLoading === false && (
            <div className="text-xl text-[#c12122] font-bold text-center mt-5">
              您尚未建立產品列表
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center mt-5">
              <ClipLoader size={32} color="#e9900c" className="mr-3" />
            </div>
          )}
          <div>
            {products.map((product) => (
              <div
                key={product.id}
                className={`flex flex-col text-lg border-[3px] pl-2 py-2 mb-2 lg:flex-row lg:border-0 lg:pl-0 lg:py-0 lg:mb-0 ${
                  isLoading && "blur-sm"
                }`}
              >
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/5">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    分類:
                  </div>
                  <div className="flex items-center mr-3">
                    {product.category}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/5">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    名稱:
                  </div>
                  <div className="flex items-center mr-3">{product.title}</div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/5">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    售價:
                  </div>
                  <div className="flex items-center mr-3">{product.price}</div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/5">
                  <div className="flex items-center font-bold mr-1 lg:hidden">
                    啟用狀態:
                  </div>
                  <div className="flex items-center mr-3">
                    {product.is_enabled ? "啟用" : "未啟用"}
                  </div>
                </div>
                <div className="flex w-full my-[6px] lg:my-0 lg:py-2 lg:border-b-2 lg:w-1/5">
                  <button
                    type="button"
                    className="border border-[#e9900c] bg-[#e9900c] px-2 py-1 rounded mr-2 text-white hover:bg-[#eb9b24] hover:border-[#eb9b24]"
                    onClick={() => openProductModal("edit", product)}
                    disabled={isLoading}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="border border-red-600 text-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                    onClick={() => openDeleteModal(product)}
                    disabled={isLoading}
                  >
                    刪除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {products.length !== 0 && (
          <Pagination pagination={pagination} changePage={getProducts} />
        )}
      </div>
    </>
  );
};

export default AdminProducts;
