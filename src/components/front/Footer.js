import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <div className="text-base mt-[57px] border-t-2 lg:text-lg lg:mt-[70px]">
        <div className="py-10 xl:max-w-[1320px] lg:mx-auto">
          <div className="flex flex-col justify-between items-center gap-4 lg:flex-row px-4 md:px-8 lg:px-10">
            <div>
              <img
                src="https://eapi.pcloud.com/getpubthumb?code=XZD4mBZVLGxGbMOiBbdNAoIV1sw1Lh3OYXy&linkpassword=undefined&size=300x300&crop=0&type=auto"
                alt="鮨漾logo"
                className="w-20 h-20 lg:w-24 lg:h-24"
              />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-lg font-extrabold lg:text-xl">鮨漾壽司</p>
              <p className="font-semibold">日式壽司 專門店</p>
              <p className="font-semibold">聯絡電話: 03-9876543</p>
              <p className="font-semibold">
                營業時間: 11:00 ~ 20:00 每週一、四公休
              </p>
              <p className="font-semibold">地址: 宜蘭縣礁溪鄉仁愛路</p>
              <p className="font-semibold">
                * 詳細營業情況以粉絲專頁公告為主 *
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="cursor-pointer">
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="2x"
                  className="hover:text-[#1877f2] hover:scale-110"
                />
              </div>
              <div className="cursor-pointer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2x"
                  className="hover:text-[#e4405f] hover:scale-110"
                />
              </div>
              <div className="cursor-pointer">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="2x"
                  className="hover:text-[#ffae00] hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#e8a0a0] text-center font-semibold py-2">
          本網站僅為個人作品使用，無任何商業用途
        </div>
      </div>
    </>
  );
};

export default Footer;
