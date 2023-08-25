import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../store/messageStore";

const Message = () => {
  const backdrop = useRef(null);
  const [isActive, setIsActive] = useState(false);

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

  const [message, dispatch] = useContext(MessageContext);

  const closeMessage = (dispatch) => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  };

  return (
    <>
      {message.type === "failure" && (
        <div
          ref={backdrop}
          className="block fixed top-0 left-0 z-20 w-full h-full overflow-x-hidden overflow-y-auto bg-[#00000080]"
        ></div>
      )}
      <div
        className={`fixed top-16 right-4 z-20 w-max max-w-full pointer-events-none ${
          isActive && "animate-scaleDraw"
        }`}
      >
        {message.title && (
          <div className="w-[350px] max-full text-base font-bold rounded-md pointer-events-auto shadow-md">
            <div
              className={`flex items-center justify-between px-3 py-1 border-b-2 rounded-t-md text-gray-100 ${
                message.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <strong>{message.title}</strong>

              <button
                type="button"
                className="text-2xl text-gray-200 hover:text-gray-300"
                onClick={() => {
                  closeMessage(dispatch);
                }}
              >
                ×
              </button>
            </div>
            <div className="break-words bg-gray-50 p-3 rounded-b-md">
              {message.text}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
