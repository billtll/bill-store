import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import { scrollToAnchor } from "../../scrollUtils";

const NavBar = ({
  activeLink,
  setActiveLink,
  location,
  cartData,
  getCartData,
}) => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const links = [
    { name: "首頁", link: "/" },
    { name: "關於鮨漾壽司", link: "/about" },
    { name: "立即點餐", link: "/products" },
    { name: "常見問題", link: "/#faq" },
    { name: "門市資訊", link: "/location" },
  ];

  const toggleCart = () => {
    setCartIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (location.hash === "#faq") {
      setActiveLink("/#faq");
    }
  }, [location.hash]);

  return (
    <>
      {cartIsOpen && (
        <Cart
          cartIsOpen={cartIsOpen}
          onToggleCart={toggleCart}
          cartData={cartData}
          getCartData={getCartData}
          setActiveLink={setActiveLink}
        />
      )}
      <div className="bg-[#fbe3d4] fixed w-full top-0 left-0 z-[999]">
        <div className="flex justify-between items-center bg-[#fbe3d4] px-4 py-2 mx-auto lg:max-w-[1320px]">
          <NavLink
            to="/"
            className="w-[123px] lg:w-[162px]"
            onClick={() => {
              setActiveLink("/");
              window.scroll(0, 0);
            }}
          >
            <img
              src="https://eapi.pcloud.com/getpubthumb?code=XZqLmBZ8LzFjQopFc79Hfm3poX0MYad3Wd7&linkpassword=undefined&size=300x100&crop=0&type=auto"
              alt="鮨漾logo"
              className="w-full h-full"
            />
          </NavLink>
          <div
            className={`absolute left-0 right-0 z-[-1] bg-[#fbe3d4] transition-all duration-500 ease-in lg:static lg:z-auto ${
              openNavBar ? "top-[57px]" : "top-[-250px]"
            }`}
          >
            <ul className="font-semibold text-lg lg:flex lg:items-center lg:justify-between lg:text-xl">
              {links.map((link) => (
                <li key={link.name} className="mb-4 lg:mb-0">
                  <NavLink
                    to={link.link}
                    className={`inline-block py-2 mx-4 cursor-pointer ${
                      activeLink === link.link && "text-[#c61212]"
                    } hover:text-[#c61212]`}
                    onClick={() => {
                      setOpenNavBar((preState) => !preState);
                      setActiveLink(link.link);
                      if (link.name !== "常見問題") {
                        window.scrollTo(0, 0);
                      }
                      if (link.name === "常見問題") {
                        scrollToAnchor("faq");
                      }
                    }}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="relative hover:before:absolute hover:before:bottom-[-65%] hover:before:left-[-5%] hover:before:content-['購物車'] hover:before:w-16 hover:before:text-[#c61212] hover:before:text-sm">
              <NavLink to="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="relative w-7 h-7 cursor-pointer hover:text-[#c61212] lg:w-8 lg:h-8"
                  onClick={toggleCart}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {cartData?.carts?.length > 0 && (
                  <span className="pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-[35%] text-white font-semibold text-xs bg-[#c61212] w-[22px] h-[22px] rounded-full flex items-center justify-center lg:w-6 lg:h-6">
                    {cartData?.carts?.reduce((acc, cur) => acc + cur.qty, 0)}
                  </span>
                )}
              </NavLink>
            </div>
            <div className="relative hover:before:absolute hover:before:bottom-[-65%] hover:before:left-[-30%] hover:before:content-['後台系統'] hover:before:w-16 hover:before:text-[#c61212] hover:before:text-sm">
              <NavLink to="login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 cursor-pointer hover:text-[#c61212] lg:w-8 lg:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </NavLink>
            </div>
            <button
              type="button"
              className="block lg:hidden"
              onClick={() => setOpenNavBar((preState) => !preState)}
            >
              {openNavBar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 cursor-pointer hover:text-[#c61212]"
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
                  className="w-7 h-7 cursor-pointer hover:text-[#c61212]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
