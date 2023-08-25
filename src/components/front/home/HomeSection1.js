import { NavLink } from "react-router-dom";

const HomeSection1 = () => {
  return (
    <section className="mt-[57px] lg:mt-[70px]">
      <div className="h-[642px] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center px-6 lg:px-0 bg-[url('https://eapi.pcloud.com/getpubthumb?code=XZVmmBZFQVDx8fmzTBgJ6AsxUG7r5utRsgV&linkpassword=undefined&size=1920x1280&crop=0&type=auto')]">
        <div className="flex flex-col justify-center items-center px-6 py-10 rounded-3xl bg-[#ffffffb3] backdrop-blur lg:px-10">
          <img
            src="https://eapi.pcloud.com/getpubthumb?code=XZD4mBZVLGxGbMOiBbdNAoIV1sw1Lh3OYXy&linkpassword=undefined&size=300x300&crop=0&type=auto"
            alt="鮨漾logo"
            className="w-40 h-40 mb-6 lg:w-[200px] lg:h-[200px]"
          />
          <h3 className="text-2xl text-center text-[#e9900c] font-bold mb-4 lg:text-4xl">
            Sushi Made With Fresh Ingredients
          </h3>
          <h1 className="text-xl text-center text-[#636363] font-bold mb-8 lg:text-3xl">
            僅挑選最新鮮的食材，是鮨漾壽司給予每位賓客的承諾!
          </h1>
          <NavLink
            to="/products"
            className="inline-block px-5 py-3 text-white bg-[#e23b3b] rounded-md lg:px-6 lg:text-xl hover:bg-[#cc2a2a]"
          >
            立即點餐
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HomeSection1;
