const AboutSection3 = () => {
  const aboutSection3 = [
    {
      id: 1,
      imgTitle: "海鮮市場",
      img: "https://images.unsplash.com/photo-1590437019634-551af5ac2e96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      description:
        "我們秉持著「以新鮮為本，品質第一」的經營理念。我們深知，高品質的壽司源於新鮮的食材。因此，我們每日從可靠且具有良好紀錄的供應商選購最優質的海鮮和食材，確保每一口壽司都帶有原汁原味的美味。我們的廚師們精湛的廚藝，加上對食材的嚴格把關，讓我們的顧客能夠在每一次光臨時都品味到最頂級的壽司美味。",
    },
    {
      id: 2,
      imgTitle: "研磨芥末",
      img: "https://eapi.pcloud.com/getpubthumb?code=XZMxJ2ZDum62NCD7BRPMvw3k9GRTHjApBAV&linkpassword=undefined&size=1287x815&crop=0&type=auto",
      description:
        "我們的使命是「傳承日本文化，創造獨特饗宴」。我們深深珍惜日本壽司的歷史和文化價值，並將其融入我們的每一道壽司之中。我們不僅僅是一家餐廳，更是一個將日本壽司藝術和獨特風味傳遞給世界的橋樑。我們希望每位顧客在享受美食的同時，也能感受到東方的文化魅力，讓用餐成為一場跨越國界的心靈之旅。",
    },
    {
      id: 3,
      imgTitle: "一盤壽司",
      img: "https://eapi.pcloud.com/getpubthumb?code=XZRxJ2ZR1OlglEgOtkscXvr9W7ddpgFdVC7&linkpassword=undefined&size=1920x1280&crop=0&type=auto",
      description:
        "我們追求「融匯創新，綻放多彩」。我們尊重日本壽司的傳統，同時也開放心懷世界各地的美食靈感。我們的壽司融合了東西方的元素，呈現出多元的風味和食材組合。這種多樣性讓我們的餐廳成為一個充滿驚喜的舞台，讓顧客在每一次造訪中都能發現新的美食寶藏。",
    },
  ];

  return (
    <section className="mt-12 lg:mt-20">
      <div className="mx-auto px-6 md:px-8 lg:px-10">
        <h2 className="text-center text-2xl font-extrabold text-[#111111] mb-4 lg:text-[2rem] lg:mb-6">
          我們的經營理念
        </h2>
        <div className="grid grid-cols-1 gap-10 py-6 xl:max-w-[1320px] xl:gap-20 xl:py-12 lg:mx-auto">
          {aboutSection3.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col justify-center items-center lg:flex-row ${
                index % 2 !== 0 && "lg:flex-row-reverse"
              }`}
            >
              <div
                className={`w-full lg:w-1/2 mb-2 lg:mb-0 ${
                  index % 2 === 0 && "lg:mr-10"
                }`}
              >
                <div className="w-full h-[200px] md:h-[480px] lg:h-[350px]">
                  <img
                    src={item.img}
                    alt={item.imgTitle}
                    className="rounded-md w-full h-full object-cover"
                  />
                </div>
              </div>
              <p
                className={`w-full lg:w-1/2 text-[#636363] font-semibold text-justify lg:text-xl ${
                  index % 2 !== 0 && "lg:mr-10"
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection3;
