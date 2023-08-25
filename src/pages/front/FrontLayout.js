import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/front/NavBar";
import Footer from "../../components/front/Footer";

const FrontLayout = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [cartData, setCartData] = useState();

  const getCartData = async () => {
    try {
      const res = await axios.get(
        `v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="text-[#1d020f]">
      <NavBar
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        location={location}
        cartData={cartData}
        getCartData={getCartData}
      />
      <Outlet context={{ setActiveLink, getCartData, cartData }} />
      <Footer />
    </div>
  );
};

export default FrontLayout;
