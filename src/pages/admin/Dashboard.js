import { useEffect, useReducer, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initialState,
} from "../../store/messageStore";

const Dashboard = () => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const navigate = useNavigate();
  const reducer = useReducer(messageReducer, initialState);

  const links = [
    { name: "產品列表", link: "/admin/products" },
    { name: "優惠券列表", link: "/admin/coupons" },
    { name: "訂單列表", link: "/admin/orders" },
  ];

  const logout = () => {
    document.cookie = "hexToken=;";
    navigate("/login");
  };

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    (async () => {
      try {
        await axios.post("/v2/api/user/check");
      } catch (error) {
        if (!error.response.data.success) {
          navigate("/login");
        }
      }
    })();
  }, [navigate, token]);

  return (
    <MessageContext.Provider value={reducer}>
      <Message />
      <div className="flex items-center px-0 py-2 bg-black">
        <div className="w-full flex items-center justify-between mx-auto px-3">
          <p className="text-white text-lg">鮨漾壽司 後台管理系統</p>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="block mr-3 lg:hidden"
              onClick={() => setOpenNavBar((preState) => !preState)}
            >
              {openNavBar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-white cursor-pointer hover:text-[#c61212]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-white cursor-pointer hover:text-[#c61212]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="bg-white px-2 py-1 rounded hover:bg-slate-100"
              onClick={logout}
            >
              登出
            </button>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:min-h-[calc(100vh-48px)]">
        <div
          className={`absolute left-0 right-0 z-10 bg-gray-100 lg:w-[200px] lg:static lg:z-auto ${
            openNavBar ? "top-[48px]" : "hidden lg:block"
          }`}
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    [
                      "inline-block w-full text-lg p-4 border-b-2 cursor-pointer",
                      isActive
                        ? "bg-[#e23b3b] text-white"
                        : "bg-gray-50 hover:bg-[#cc2a2a] hover:text-white",
                    ].join(" ")
                  }
                  onClick={() => setOpenNavBar((preState) => !preState)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">{token && <Outlet />}</div>
      </div>
    </MessageContext.Provider>
  );
};

export default Dashboard;
