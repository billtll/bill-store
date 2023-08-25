const AboutSection2 = () => {
  const aboutSection2 = [
    {
      id: 1,
      title: "鮨",
      content:
        "「鮨」即壽司的日本發音，代表我們對於傳統壽司文化的尊重和崇敬。我們希望能夠將日本的壽司藝術傳承下去，讓每一道壽司都蘊含著匠人的精湛工藝和對於食材的敬意。",
    },
    {
      id: 2,
      title: "漾",
      content:
        "「漾」寓意著水面泛起的漣漪，象徵我們的食材選擇和創意組合，能夠在味蕾上引起無限的波動和感動。每一口壽司都像是水面上的一個個漣漪，擴散開來的是美味和驚喜。",
    },
    {
      id: 3,
      title: "鮨漾",
      content:
        "「鮨漾」結合了傳統和創新，象徵我們不僅尊重古老的壽司藝術，也積極探索融入不同文化和風味的可能性。我們相信，透過不斷的探索和革新，能夠讓「鮨漾壽司」成為壽司界的一道亮麗風景，綻放出獨特的光彩。",
    },
  ];

  return (
    <section className="mt-8 lg:mt-20">
      <div className="mx-auto px-6 md:px-8 lg:px-10">
        <div className="text-center">
          <h2 className=" text-2xl font-extrabold text-[#111111] mb-4 lg:text-[2rem] lg:mb-6">
            取名鮨漾的由來
          </h2>
          <h3 className="text-xl text-[#636363] font-bold mb-4 lg:text-[1.75rem] lg:mb-8">
            源自我們對於壽司藝術的深刻理解和對於食材的極致追求
          </h3>
        </div>
        <div className="py-8 xl:max-w-[1320px] lg:mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-20">
            {aboutSection2.map((item) => (
              <div key={item.id} className="flex flex-col lg:items-center">
                <div className="flex items-center mb-1 lg:mb-2">
                  <div className="mr-2 text-[#c61212]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 lg:w-7 lg:h-7"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75zM6.157 5.739a.75.75 0 01.21 1.04A6.715 6.715 0 005.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 01-1.27-.8A6.715 6.715 0 003.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 011.04-.211zM12 7.5a3 3 0 00-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 11-1.112-1.008A10.459 10.459 0 007.5 10.5a4.5 4.5 0 119 0c0 .547-.022 1.09-.067 1.626a.75.75 0 01-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 00-3-3zm0 2.25a.75.75 0 01.75.75A15.69 15.69 0 018.97 20.738a.75.75 0 01-1.14-.975A14.19 14.19 0 0011.25 10.5a.75.75 0 01.75-.75zm3.239 5.183a.75.75 0 01.515.927 19.415 19.415 0 01-2.585 5.544.75.75 0 11-1.243-.84 17.912 17.912 0 002.386-5.116.75.75 0 01.927-.515z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-[#e9900c] font-bold text-lg lg:text-[26px]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[#636363] font-semibold text-justify lg:text-xl">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;
