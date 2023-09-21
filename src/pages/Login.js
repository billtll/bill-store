import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/v2/admin/signin`, data);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;

      if (res.data.success) {
        setIsLoading(false);
        navigate("/admin/products");
      }
    } catch (error) {
      setLoginStatus(error.response.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-[#fafafa] w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col md:flex-row justify-center items-stretch max-w-full">
            <div className="grow hidden md:block md:w-[370px] text-[#1d020f] bg-[#fbe3d4]">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="w-[135px] h-[135px] mb-4">
                  <img
                    src="https://eapi.pcloud.com/getpubthumb?code=XZD4mBZVLGxGbMOiBbdNAoIV1sw1Lh3OYXy&linkpassword=undefined&size=300x300&crop=0&type=auto"
                    alt="鮨漾logo"
                    className="w-full h-full"
                  />
                </div>
                <h2 className="text-[26px] font-extrabold mb-6">
                  後台管理系統
                </h2>
                <div className="h-32">
                  <img
                    src="https://eapi.pcloud.com/getpubthumb?code=XZDcIBZSDru7c5ufqpiJeAlj5M3HVBQ1Y1X&linkpassword=undefined&size=512x512&crop=0&type=auto"
                    alt="後台管理圖片"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="grow md:w-[370px] text-[#1d020f] bg-white">
              <div className="flex flex-col justify-center p-10">
                <h2 className="text-3xl font-bold mb-3">登入</h2>
                <h3 className="text-lg font-semibold mb-3">
                  觀迎回來，請登入您的帳號
                </h3>
                <div
                  className={`bg-red-200 text-red-800 font-bold py-3 pl-2 mb-3 ${
                    loginStatus.message ? "block" : "hidden"
                  }`}
                >
                  {loginStatus.message}
                </div>
                <form>
                  <div className="flex flex-col mb-2 w-[250px] md:w-full">
                    <label
                      htmlFor="email"
                      className="text-lg font-semibold mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="username"
                      type="email"
                      placeholder="請輸入Email"
                      className="text-[#363636] text-base md:text-[17px] py-[6px] pl-2 border-2 border-gray-400 focus:border-[#e9900c] focus:ring-0"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-[250px] md:w-full">
                    <label
                      htmlFor="password"
                      className="text-lg font-semibold mb-1"
                    >
                      密碼
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="請輸入密碼"
                      className="text-[#363636] text-base md:text-[17px] py-[6px] pl-2 border-2 border-gray-400 focus:border-[#e9900c] focus:ring-0"
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="flex items-center justify-center w-full bg-[#e9900c] py-2 px-4 text-lg font-semibold text-white rounded hover:bg-[#eb9b24]"
                    onClick={submit}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <ClipLoader size={22} color="#c61212" className="mr-2" />
                    )}
                    {isLoading ? "登入中..." : "登入"}
                  </button>
                </form>
                {!isLoading && (
                  <Link
                    to="/#"
                    className="mt-2 text-center text-[#e9900c] font-extrabold hover:text-[#eda63d]"
                  >
                    回前台首頁
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
