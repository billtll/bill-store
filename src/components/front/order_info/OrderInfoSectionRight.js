import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input, Textarea } from "../../FormElements";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const OrderInfoSectionRight = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getCartData } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel, address, message } = data;

    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
        message,
      },
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      getCartData();
      setIsLoading(false);
      navigate(`/order-success/${res.data.orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full mt-5 lg:w-[90%] md:px-2 lg:mt-0">
        <div className="bg-[#fbe3d4] mx-4 p-4 lg:p-5 rounded-md">
          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-[22px] text-center font-bold mb-6">聯絡資訊</h1>
            <div className="mb-4 font-semibold">
              <Input
                id="name"
                labelText="姓名"
                isRequired={true}
                type="text"
                placeholder="請填入真實姓名"
                register={register}
                rules={{
                  required: "姓名為必填",
                  maxLength: { value: 10, message: "姓名長度不超過 10" },
                }}
                errors={errors}
              />
            </div>
            <div className="mb-4 font-semibold">
              <Input
                id="tel"
                labelText="手機號碼"
                isRequired={true}
                type="tel"
                placeholder="0912345678"
                register={register}
                rules={{
                  required: "手機號碼為必填",
                  pattern: {
                    value: /^[09]{2}\d{8}$/,
                    message: "手機號碼須符合臺灣手機格式",
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="mb-4 font-semibold">
              <Input
                id="email"
                labelText="信箱"
                isRequired={true}
                type="email"
                placeholder="example@example.com"
                register={register}
                rules={{
                  required: "信箱為必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "信箱格式錯誤",
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="mb-4 font-semibold">
              <label htmlFor="address" className="inline-block text-lg mb-2">
                取餐地址
              </label>
              <input
                id="address"
                type="text"
                value="宜蘭縣礁溪鄉仁愛路"
                {...register("address")}
                readOnly
                className="inline-block w-full rounded-md text-[#e9900c] font-extrabold bg-[#fafafa] border-[#dad6ce] focus:border-[#e9900c] focus:ring-0"
              ></input>
            </div>
            <div className="mb-4 font-semibold">
              <Textarea
                id="message"
                labelText="餐點備註"
                placeholder="如有需要，請讓我們知道您的其他需求..."
                register={register}
                rules={{
                  maxLength: { value: 50, message: "餐點備註最多為 50 字" },
                }}
                errors={errors}
              />
            </div>
            <div className="mb-4 font-semibold">
              <p className="text-lg">
                註: <span className="text-[#c61212]">*</span>為必填
              </p>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center mt-2 mb-2 w-full py-2 text-lg font-bold text-white rounded-md bg-[#e23b3b] hover:bg-[#cc2a2a]"
            >
              {isLoading && (
                <ClipLoader size={22} color="#e9900c" className="mr-2" />
              )}
              {isLoading ? "處理中..." : "送出訂單"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderInfoSectionRight;
