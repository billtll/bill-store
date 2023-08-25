import Seafood from "../../../svgComponents/Seafood";
import Rice from "../../../svgComponents/Rice";
import Wasabi from "../../../svgComponents/Wasabi";
import Nori from "../../../svgComponents/Nori";

const HomeSection2 = () => {
  const homeSection2 = [
    {
      id: "item-01",
      icon: Seafood,
      title: "魚料",
      subtitle: "堅持每日到漁市場挑選時令魚料",
      description:
        "使用新鮮魚料最能展現壽司的價值，我們挑選每日市場中最好最新鮮的魚料，以活體為優先，絕不挑選冷凍魚料。",
    },
    {
      id: "item-02",
      icon: Rice,
      title: "醋飯",
      subtitle: "堅持選用帶有油脂的小粒米製成醋飯",
      description:
        "醋飯的溫度與人體肌膚溫度維持一致，為保持醋飯溫度的良好狀態，將醋飯放進用麥稈編成的桶子保溫，並在捏製時將醋飯捏製為側看有如扇形的形狀。",
    },
    {
      id: "item-03",
      icon: Wasabi,
      title: "山葵",
      subtitle: "堅持選用日本伊豆半島所生產的山葵",
      description:
        "研磨從山葵的頭部葉柄(莖)開始，並利用磨泥板，以慢慢畫圓的方式將山葵的黏性研磨出來，使細胞破裂，釋放辛辣味和清香。",
    },
    {
      id: "item-04",
      icon: Nori,
      title: "海苔",
      subtitle: "堅持選用日本佐賀所生產的海苔",
      description:
        "為了讓海苔烤過後更能留住香氣和美味，使用'備長炭'烤海苔，烤食不斷將海苔拍打在烤網上，猶如在烤網上跳舞似的，並將海苔烤到至九成五，使其散發出一股海味。",
    },
  ];

  return (
    <section className="mt-8 lg:mt-20">
      <div className="mx-auto px-6 md:px-8 lg:px-10">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-[#111111] mb-4 lg:text-[2rem] lg:mb-6">
            我們的堅持
          </h2>
          <h3 className="text-xl text-[#636363] font-bold mb-4 lg:text-[1.75rem] lg:mb-8">
            壽司可以很簡單同時也很講究，做到講究且吹毛求疵就是我們的堅持
          </h3>
        </div>
        <div className="py-8 xl:max-w-[1320px] lg:mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            {homeSection2.map((item) => (
              <div key={item.id} className="flex">
                <div className="shrink-0 self-center w-12 h-12 lg:w-20 lg:h-20">
                  <item.icon />
                </div>
                <div className="pl-4 lg:pl-6">
                  <h3 className="text-xl font-bold mb-2 lg:text-2xl lg:mb-4">
                    {item.title}
                  </h3>
                  <h4 className="text-[#e9900c] font-bold mb-1 lg:text-xl lg:mb-2">
                    {item.subtitle}
                  </h4>
                  <p className="text-[#636363] font-semibold text-justify lg:text-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection2;
