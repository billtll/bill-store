import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

const Modal = ({
  modalType,
  title,
  closeButton,
  submitButton,
  onClose,
  onSubmit,
  children,
  isLoading,
}) => {
  const [isActive, setIsActive] = useState(false);
  const backdrop = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target === backdrop.current) {
        setIsActive(true);
      }
    });

    window.addEventListener("mousedown", (e) => {
      if (e.target === backdrop.current) {
        setIsActive(false);
      }
    });
  }, []);

  return (
    <>
      <div
        ref={backdrop}
        className={`block fixed top-0 left-0 z-10 w-full h-full overflow-x-hidden overflow-y-auto bg-[#00000080] ${
          isActive && "animate-scaleDraw"
        }`}
      >
        <div
          className={`relative w-auto ${
            modalType === "delete" ? "max-w-[500px]" : "max-w-[800px]"
          } m-3 pointer-events-none sm:mx-auto md:mt-[70px]`}
        >
          <div className="relative flex flex-col w-full bg-white text-gray-600 pointer-events-auto rounded-lg outline-0">
            <div
              className={`flex items-center justify-between p-4 ${
                modalType === "delete"
                  ? "bg-[#c91d06] text-white py-2 rounded-t-lg"
                  : "text-gray-600"
              }`}
            >
              <h2 className="text-xl">{title}</h2>
              <button
                type="button"
                className={`${
                  modalType === "delete"
                    ? "text-white hover:text-[#555454]"
                    : "text-[#727070] hover:text-[#1b1b1b]"
                }`}
                onClick={onClose}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col w-full p-4 border-y-2 md:flex-row md:text-[17px]">
              {children}
            </div>
            <div
              className={`text-[17px] flex items-center justify-end gap-2 ${
                modalType === "delete" ? "py-2.5 px-4" : "p-4"
              }`}
            >
              <button
                type="button"
                className="border px-2 py-1 rounded text-white border-gray-500 bg-gray-500  hover:bg-gray-600 hover:border-gray-600"
                onClick={onClose}
              >
                {closeButton}
              </button>
              <button
                type="button"
                className={`flex items-center border px-2 py-1 rounded text-white ${
                  modalType === "delete"
                    ? " border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700"
                    : " border-[#e9900c] bg-[#e9900c] hover:bg-[#eb9b24] hover:border-[#eb9b24]"
                }`}
                onClick={onSubmit}
              >
                {isLoading && (
                  <ClipLoader
                    size={18}
                    color={`${modalType === "delete" ? "#e9900c" : "#c61212"}`}
                    className="mr-2"
                  />
                )}
                {isLoading ? "處理中..." : submitButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
