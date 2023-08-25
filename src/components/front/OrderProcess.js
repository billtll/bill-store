const OrderProcess = ({ process1, process2 }) => {
  return (
    <>
      <div className="px-3 md:px-8 lg:px-10">
        <div className="flex justify-center mx-auto mb-10 xl:max-w-[1320px]">
          <div
            className={`w-[40%] border-b-[5px] ${
              process1 ? "border-[#cc2a2a]" : "border-[#bdbbb8]"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  process1 ? "bg-[#cc2a2a]" : "bg-[#c7c5c3]"
                }  text-white mb-1`}
              >
                1
              </div>
              <h2
                className={`text-base font-extrabold ${
                  process1 ? "text-[#cc2a2a]" : "text-[#c7c5c3]"
                } mb-2 lg:text-xl`}
              >
                填寫資料
              </h2>
            </div>
          </div>
          <div
            className={`w-[40%] border-b-[5px] ${
              process2 ? "border-[#cc2a2a]" : "border-[#bdbbb8]"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  process2 ? "bg-[#cc2a2a]" : "bg-[#c7c5c3]"
                }  text-white mb-1`}
              >
                2
              </div>
              <h2
                className={`text-base font-extrabold ${
                  process2 ? "text-[#cc2a2a]" : "text-[#c7c5c3]"
                } mb-2 lg:text-xl`}
              >
                完成訂購
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderProcess;
