import { useState } from "react";
import Accordion from "../../UI/Accordion";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleAccordionToggle = (index) => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    {
      title: "是否有固定菜單及提供套餐選擇",
      content:
        "否。鮨漾壽司每日販售的壽司魚料皆是當日漁市購買，因此並無固定的菜單，也無提供套餐選擇",
    },
    {
      title: "是否有低消限制",
      content: "是。凡店內用餐者，除12歲以下孩童，每位顧客設有低消 800元限制",
    },
    {
      title: "是否有加收服務費",
      content: "否。鮨漾壽司未加收服務費",
    },
    {
      title: "是否有用餐時間限制",
      content: "是。用餐時間原則上為60分鐘，若現場無其他候位客人則不受此限",
    },
    {
      title: "是否提供刷卡服務",
      content: "是。鮨漾壽司主要以現金消費為主，但要刷卡也是可以的",
    },
    {
      title: "是否提供外送服務",
      content:
        "否。鮨漾壽司為維護餐點品質，目前暫無外送服務，您可選擇'店內用餐'或'來店自取'",
    },
    {
      title: "是否可攜帶寵物",
      content: "否。鮨漾壽司為保持每位顧客的用餐環境權益，婉拒攜帶寵物入店",
    },
    {
      title: "附近是否有提供停車場可供停車",
      content:
        "是。鮨漾壽司設有消費者專屬停車場(餐館位置往前100公尺後右轉即可看見)，凡店內用餐者，可免費使用",
    },
  ];

  return (
    <>
      <div id="faq" className="w-full mt-8 py-8 lg:mt-16 bg-[#fefbf8] lg:py-20">
        <div className="mx-auto px-6 md:px-8 lg:px-10">
          <h2 className="text-center text-2xl font-extrabold text-[#111111] mb-4 lg:text-[2rem] lg:mb-6">
            常見問題
          </h2>
          <div className="py-8 md:max-w-[1000px] md:mx-auto">
            {faqData.map((item, index) => (
              <Accordion
                key={index}
                title={item.title}
                content={item.content}
                isOpen={index === openIndex}
                onToggle={() => handleAccordionToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
