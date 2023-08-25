const LocationSection2 = () => {
  return (
    <section className="mt-8 lg:mt-20">
      <div className="mx-auto px-6 md:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:max-w-[1320px] lg:mx-auto">
          <div className="h-[250px] lg:h-[400px]">
            <img
              src="https://eapi.pcloud.com/getpubthumb?code=XZPJk2ZCfiAUv4OFsh1hXkDoQIAXujNX8lV&linkpassword=undefined&size=1920x1280&crop=0&type=auto"
              alt="鮨漾壽司店面"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-3 text-lg font-semibold lg:text-xl">
            <p>宜蘭縣礁溪鄉仁愛路</p>
            <p>週二 ~ 週三 / 週五 ~ 週六 11:00~20:00</p>
            <p>03-9876543</p>
            <p>最晚供餐時段 19:00</p>
            <p>每週一、週四公休</p>
            <p>除12歲以下孩童，每位顧客低消 800元</p>
            <p>店內禁止攜帶寵物及外食，造成不便敬請見諒</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection2;
