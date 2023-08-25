import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../ProductCard";
import Faq from "./Faq";
import { scrollToAnchor } from "../../../scrollUtils";

const HomeSection3 = () => {
  const [products, setProducts] = useState([]);
  const [productCardIsLoading, setProductCardIsLoading] = useState(true);
  const faqRef = useRef(null);
  const location = useLocation();

  const getHomePageProducts = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    setProducts(res.data.products);
    setProductCardIsLoading(false);
  };

  useEffect(() => {
    getHomePageProducts();
  }, []);

  useEffect(() => {
    if (!productCardIsLoading && faqRef.current && location.hash === "#faq") {
      scrollToAnchor("faq");
    }
  }, [productCardIsLoading, location.hash]);

  return (
    <section className="mt-8 lg:mt-20">
      <div className="mx-auto px-0 md:px-4 lg:px-10">
        <h2 className="text-center text-2xl font-extrabold text-[#111111] mb-4 lg:text-[2rem] lg:mb-6">
          今日壽司
        </h2>
        <div className="relative pt-2 pb-8 px-3 w-full mx-auto xl:max-w-[1320px] lg:pt-5 lg:pb-10 lg:px-5">
          <Swiper
            slidesPerView={4}
            spaceBetween={25}
            loop={true}
            grabCursor={true}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            speed={1000}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              520: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="slide-content"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="bg-white border-2 border-solid border-[#e23b3b] rounded-3xl cursor-pointer hover:scale-105 hover:duration-500"
              >
                <Link to={`/product/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev hidden"></div>
          <div className="swiper-button-next hidden"></div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="flex justify-center py-5">
          <NavLink
            to="/products"
            className="inline-block px-5 py-3 text-white bg-[#e23b3b] rounded-md lg:px-6 lg:text-xl hover:bg-[#cc2a2a]"
          >
            更多壽司
          </NavLink>
        </div>
      </div>
      <div ref={faqRef}>
        <Faq />
      </div>
    </section>
  );
};

export default HomeSection3;
