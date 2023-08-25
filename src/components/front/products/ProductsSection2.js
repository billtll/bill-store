import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../Pagination";
import ProductCard from "../ProductCard";

const ProductsSection2 = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [noRepeatCategoryList, setNoRepeatCategoryList] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedFirstHierarchy, setSelectedFirstHierarchy] =
    useState("全部品項");
  const [selectedSecondHierarchy, setSelectedSecondHierarchy] = useState("");

  const noRepeatFirstTwoCategory = async () => {
    const tempFirstTwoCategoryList = [];

    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    res.data.products.forEach((product) => {
      tempFirstTwoCategoryList.push(product.category.split("-", 2).join("-"));
    });

    setNoRepeatCategoryList([...new Set(tempFirstTwoCategoryList)]);
  };

  const getCategoryProducts = async (
    firstCategory = "全部品項",
    secondCategory = "",
    page = 1
  ) => {
    let category = firstCategory;
    if (secondCategory) {
      category += "-" + secondCategory;
    }

    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}${
        firstCategory !== "全部品項" ? "&category=" + category : ""
      }`
    );
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  };

  const handleFirstHierarchyClick = (firstHierarchy) => {
    setSelectedFirstHierarchy(firstHierarchy);
    setSelectedSecondHierarchy(
      category.find((item) => item.firstHierarchy === firstHierarchy)
        ?.secondHierarchy[0] || ""
    );
  };

  const handleSecondHierarchyClick = (secondHierarchy) => {
    setSelectedSecondHierarchy(secondHierarchy);
  };

  useEffect(() => {
    noRepeatFirstTwoCategory();
  }, []);

  useEffect(() => {
    getCategoryProducts(selectedFirstHierarchy, selectedSecondHierarchy);
  }, [selectedFirstHierarchy, selectedSecondHierarchy]);

  useEffect(() => {
    const parsedCategories = noRepeatCategoryList.reduce((acc, category) => {
      const [firstHierarchy, secondHierarchy] = category.split("-");
      if (!acc[firstHierarchy]) {
        acc[firstHierarchy] = [];
      }
      if (secondHierarchy) {
        acc[firstHierarchy].push(secondHierarchy);
      }
      return acc;
    }, {});

    const sushiCascading = Object.entries(parsedCategories).map(
      ([firstHierarchy, secondHierarchy], index) => ({
        id: ++index,
        firstHierarchy,
        secondHierarchy,
      })
    );

    setCategory([
      { id: 0, firstHierarchy: "全部品項", secondHierarchy: [] },
      ...sushiCascading,
    ]);
  }, [noRepeatCategoryList]);

  useEffect(() => {
    setSelectedFirstHierarchy("全部品項");
    setSelectedSecondHierarchy(
      category.find((item) => item.firstHierarchy === "全部品項")
        ?.secondHierarchy[0] || ""
    );
  }, [category]);

  const handlePageChange = (page) => {
    getCategoryProducts(selectedFirstHierarchy, selectedSecondHierarchy, page);

    window.scrollTo(0, 0);
  };

  return (
    <section className="mt-8 lg:mt-10 mx-auto xl:max-w-[1320px]">
      <div className="px-6 md:px-8 lg:px-10">
        <div className="sticky bg-white z-50 top-[57px] lg:top-[70px]">
          <ul className="py-2 mb-1 flex items-center flex-wrap gap-y-4 text-lg font-semibold text-[#111111] md:text-xl lg:text-[22px]">
            {[
              "全部品項",
              ...new Set(noRepeatCategoryList.map((nc) => nc.split("-")[0])),
            ].map((firstCategoryHierarchy) => (
              <li key={firstCategoryHierarchy} className="hover:text-[#3a3939]">
                <button
                  className={`cursor-pointer py-1 px-1 mx-1 md:mx-2 hover:text-[#f7761a] ${
                    firstCategoryHierarchy === selectedFirstHierarchy &&
                    "border-b-4 border-[#ff6a00]"
                  }`}
                  onClick={() =>
                    handleFirstHierarchyClick(firstCategoryHierarchy)
                  }
                >
                  {firstCategoryHierarchy}
                </button>
              </li>
            ))}
          </ul>
          {selectedFirstHierarchy && (
            <ul className="ml-3 pb-2 flex flex-wrap text-base font-semibold text-[#313131] md:text-lg lg:text-xl">
              {category.find(
                (item) => item.firstHierarchy === selectedFirstHierarchy
              )?.secondHierarchy.length > 0 && (
                <span className="mr-2">&#187;</span>
              )}
              {category
                .find((item) => item.firstHierarchy === selectedFirstHierarchy)
                ?.secondHierarchy.map((subItem, index) => (
                  <li key={index}>
                    <button
                      className={`cursor-pointer px-1 mx-1 md:mx-2 hover:text-[#dd1313] ${
                        subItem === selectedSecondHierarchy &&
                        "border-b-4 border-[#e23b3b]"
                      }`}
                      onClick={() => handleSecondHierarchyClick(subItem)}
                    >
                      {subItem}
                    </button>
                    <span className="mx-4">|</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border-2 border-solid border-[#e23b3b] rounded-3xl cursor-pointer hover:scale-105 hover:duration-500"
              >
                <Link to={`/product/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-2 md:mt-5">
          <Pagination pagination={pagination} changePage={handlePageChange} />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection2;
