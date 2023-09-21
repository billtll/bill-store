import { useRef, useState } from "react";

const HomeSectionCoupon = () => {
  const [isCopy, setIsCopy] = useState(false);
  const couponRef = useRef(null);

  return (
    <section className="mt-8 lg:mt-20">
      <div className="mx-auto px-6 md:px-8 lg:px-10">
        <h2 className="text-center text-2xl font-extrabold text-[#111111] mb-4 lg:text-[2rem] lg:mb-6">
          歡慶5週年
        </h2>
        <div className="pb-8 xl:max-w-[1320px] lg:mx-auto">
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center border-2 border-[#c61212] bg-gradient-to-br from-[#e95a5a] to-[#e99f5a] rounded shadow-xl py-2 px-6 min-[500px]:py-6 min-[500px]:px-20 md:py-8 md:px-24 lg:py-10 lg:px-32 text-center font-semibold lg:text-xl">
              <img
                src="https://eapi.pcloud.com/getpubthumb?code=XZD4mBZVLGxGbMOiBbdNAoIV1sw1Lh3OYXy&linkpassword=undefined&size=300x300&crop=0&type=auto"
                alt="鮨漾logo"
                className="w-[72px] h-[72px] mb-3 lg:mb-4 lg:w-[100px] lg:h-[100px]"
              />
              <p className="font-extrabold text-lg lg:text-2xl mb-1 lg:mb-4">
                鮨漾壽司5歲囉！
              </p>
              <p className="mb-2 lg:mb-6">
                即日起輸入優惠碼{" "}
                <span className="font-black text-[#c61212]">QiYangIs5Y</span>{" "}
                就享全館品項{" "}
                <span className="font-black text-[#c61212]">95折</span>
              </p>
              <div className="flex items-center justify-center mx-auto">
                <span
                  ref={couponRef}
                  className="border-[1px] border-r-0 border-dashed border-white font-semibold py-3 px-6"
                >
                  QiYangIs5Y
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(couponRef.current.innerText);
                    setIsCopy(true);
                    setTimeout(() => {
                      setIsCopy(false);
                    }, 1000);
                  }}
                  className="border-[1px] border-white py-3 px-6 bg-white text-[#c61212] font-extrabold hover:bg-slate-50 hover:border-slate-50"
                >
                  <div className="flex items-center justify-center">
                    <div className="mr-2">
                      {isCopy ? (
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
                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                          />
                        </svg>
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
                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="max-[300px]:hidden">
                      {isCopy ? "完成" : "複製"}
                    </span>
                  </div>
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-[15px] min-[500px]:-left-[25px] bg-white w-[30px] h-[30px] min-[500px]:w-[50px] min-[500px]:h-[50px] rounded-full border-2 border-[#c61212] max-[300px]:hidden"></div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-[15px] min-[500px]:-right-[25px] bg-white w-[30px] h-[30px] min-[500px]:w-[50px] min-[500px]:h-[50px] rounded-full border-2 border-[#c61212] max-[300px]:hidden"></div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-[calc(15px+2px)] min-[500px]:-left-[calc(25px+2px)] bg-white w-[15px] h-[30px] min-[500px]:w-[25px] min-[500px]:h-[50px] max-[300px]:hidden"></div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-[calc(15px+2px)] min-[500px]:-right-[calc(25px+2px)] bg-white w-[15px] h-[30px] min-[500px]:w-[25px] min-[500px]:h-[50px] max-[300px]:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSectionCoupon;