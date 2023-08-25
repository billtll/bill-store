import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const CartItem = ({
  imageUrl,
  title,
  price,
  unit,
  qty,
  total,
  onUpdateCartItem,
  onRemoveCartItem,
  isLoading,
  textSetting,
}) => {
  const [cartQuantity, setCartQuantity] = useState(qty);
  const [isTrashClicked, setIsTrashClicked] = useState(false);

  useEffect(() => {
    setCartQuantity(qty);
  }, [qty]);

  return (
    <>
      <div
        className={`flex items-center justify-between py-4 border-b-2 gap-5 ${
          isLoading && isTrashClicked ? "bg-slate-50" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              setIsTrashClicked(true);
              onRemoveCartItem();
            }}
            disabled={isLoading}
            className="text-[#a6aca6] hover:text-[#7d817d] mr-3"
          >
            {isLoading && isTrashClicked ? (
              <ClipLoader size={18} color="#e9900c" className="mr-1" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            )}
          </button>
          <div className="border-2 ring-2 border-[#c61212] ring-[#e9900c]">
            <div className="w-20 h-20">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between w-full">
          <div>
            <p className={`mb-1 ${textSetting}`}>{title}</p>
            <p className={`mb-1 ${textSetting}`}>
              NT${price} / {unit}
            </p>
            <div className="flex items-center mt-[6px] mb-1 border border-[#a6aca6]">
              <button
                type="button"
                className={`text-[#7d817d] px-1 py-[2px] cursor-pointer hover:text-[#3e413e] hover:bg-slate-300 ${
                  qty === 1 && "pointer-events-none"
                }`}
                disabled={isLoading}
                onClick={() => {
                  const updatedQty = Math.max(1, cartQuantity - 1);
                  setCartQuantity(updatedQty);
                  onUpdateCartItem(updatedQty);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12H6"
                  />
                </svg>
              </button>
              <input
                type="button"
                value={cartQuantity}
                readOnly
                className="w-[50px] text-sm border-x-2"
              />
              <button
                type="button"
                className="text-[#7d817d] px-1 py-[2px] cursor-pointer hover:text-[#3e413e] hover:bg-slate-300"
                disabled={isLoading}
                onClick={() => {
                  const updatedQty = cartQuantity + 1;
                  setCartQuantity(updatedQty);
                  onUpdateCartItem(updatedQty);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className={textSetting}>NT${total}</p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
