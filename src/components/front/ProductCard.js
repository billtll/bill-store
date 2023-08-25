import { useState } from "react";
import AddToCartModal from "./AddToCartModal";

const ProductCard = ({ product, isLoading }) => {
  const [addToCartModalIsOpen, setAddToCartModalIsOpen] = useState(false);

  const openAddProductToCartModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddToCartModalIsOpen(true);
  };

  const closeAddProductToCartModal = () => {
    setAddToCartModalIsOpen(false);
  };

  return (
    <>
      {addToCartModalIsOpen && (
        <AddToCartModal
          onClose={closeAddProductToCartModal}
          product={product}
        />
      )}
      <div className="flex flex-col items-center py-2 gap-y-[5px] rounded-t-3xl bg-center bg-cover bg-no-repeat bg-[url('https://eapi.pcloud.com/getpubthumb?code=XZTbmBZyvpHlI7QHhmXuQmbslwLj8y2og2k&linkpassword=undefined&size=384x256&crop=0&type=auto')]">
        <div className="my-3 w-[160px] h-[160px] rounded-full p-1 bg-white border-[3px] border-solid border-[#e9900c] lg:w-[180px] lg:h-[180px]">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col items-center py-[10px] px-[14px]">
        <div className="flex items-center my-2">
          {product.category?.split("-").map((category) => (
            <div
              key={category}
              className={`flex flex-wrap items-center text-white px-2 py-[2px] mr-1 rounded-lg lg:text-lg ${
                category === "握壽司"
                  ? "bg-[#ff6a00]"
                  : category === "軍艦壽司"
                  ? "bg-[#e26d0e]"
                  : category === "海膽"
                  ? "bg-[#f1a238]"
                  : category === "海老"
                  ? "bg-[#d83d2b]"
                  : category === "魚"
                  ? "bg-[#f8664c]"
                  : category === "貝"
                  ? "bg-[#ee4636]"
                  : category === "卵"
                  ? "bg-[#cf330c]"
                  : category === "藻"
                  ? "bg-[#f5a20a]"
                  : "bg-[#f35d06]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px] mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                  clipRule="evenodd"
                />
              </svg>
              <h5>{category}</h5>
            </div>
          ))}
        </div>
        <h2 className="text-[22px] font-semibold my-1 lg:my-[6px]">
          {product.title}
        </h2>
        <h5 className="text-[22px] text-[#e9900c] font-semibold my-1 lg:my-[6px]">{`NT$${product.price}`}</h5>
        <button
          className="text-lg text-[#cb3535] font-semibold border-2 border-[#cb3535] py-2 px-4 my-2 rounded-md cursor-pointer hover:text-white hover:bg-[#cb3535] lg:my-[10px]"
          onClick={openAddProductToCartModal}
          disabled={isLoading}
        >
          加入購物車
        </button>
      </div>
    </>
  );
};

export default ProductCard;
