import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Building2, Bot, Settings2 } from "lucide-react";

const tabs = ["Tất cả", "Chưa đọc", "Quan trọng", "Lưu trữ"];

/* BUTTON TAB */
const ButtonTab = forwardRef(({ label, active, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`h-10 w-[100px] transition-colors duration-200
        ${active ? "text-blue-700" : "text-gray-700 hover:text-black"} font-sans`}
    >
      {label}
    </button>
  );
});

/* MAIN */
const Announce = () => {
  const [activeTab, setActiveTab] = useState(0);
  const buttonRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const el = buttonRef.current[activeTab];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className=" w-full h-full flex">
      {/* LEFT */}
      <div className=" w-[70%] flex justify-center items-center">
        <div className="w-[97%] h-[97%]">
          {/* TAB BAR */}
          <div className="relative border-b-[3px] border-gray-300 flex items-center gap-2">
            {tabs.map((tab, index) => (
              <ButtonTab
                key={index}
                label={tab}
                active={index === activeTab}
                onClick={() => setActiveTab(index)}
                ref={(el) => (buttonRef.current[index] = el)}
              />
            ))}

            {/* underline */}
            <span
              className="absolute bottom-[-3px] h-[3px] bg-blue-500 transition-all duration-300"
              style={indicatorStyle}
            />
          </div>
          {/* CONTENT */}
          <div className="mt-4  h-[90%]  overflow-y-auto ">
            <div className="text-gray-600 h-full overflow-y-auto">
              <h1 className="text-[#84A3B8] ">MỚI NHẤT</h1>
              <div className="h-[40%] w-[100%]  translate-y-2 rounded-[20px] flex p-0 m-0 mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <div className=" w-[10%] rounded-tl-[20px] rounded-bl-[20px]">
                  <div className="border-2 border-[#DBEAFE] w-[50px] h-[50px] translate-x-4 translate-y-4 flex items-center justify-center rounded-full bg-[#DBEAFE]">
                    <div className="w-[35px] h-[35px]  rounded-full flex items-center justify-center">
                      <Building2 size={26} className="text-blue-500" />
                    </div>
                  </div>
                </div>
                <div className=" w-[90%] rounded-tr-[20px] rounded-br-[20px] pt-3 flex flex-col gap-2">
                  <div className=" w-[100%] h-[auto] rounded-tr-[20px] flex">
                    <h6 className="font-bold mr-[370px]">
                      Cập nhật tiến độ dự án Alpha
                    </h6>
                    <span className="text-sm  h-[100%] items-center flex">
                      2 phút trước
                    </span>
                    <span className="w-[10px] h-[10px] border-2 border-blue-600 rounded-full bg-blue-600 translate-y-2 translate-x-6"></span>
                  </div>
                  <div className="">
                    <p className="p-2">
                      Nguyễn Văn A đã hoàn thành nhiệm vụ "Thiết kế UI/UX cho
                      màn hình Dashboard". Vui lòng kiểm tra và phê duyệt.
                    </p>
                  </div>
                  <div className=" flex gap-4 w-[100%] h-[40px] items-center justify-end pr-4">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
                      Xem chi tiết
                    </button>
                    <button className="border border-gray-300 px-4 py-1 rounded-md">
                      Bỏ qua
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-[40%] w-[100%]  translate-y-2 rounded-[20px] flex p-0 m-0 mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <div className=" w-[10%] rounded-tl-[20px] rounded-bl-[20px]">
                  <div className="border-2 border-[#F3E8FF] w-[50px] h-[50px] translate-x-4 translate-y-4 flex items-center justify-center rounded-full bg-[#F3E8FF]">
                    <div className="w-[35px] h-[35px]  rounded-full flex items-center justify-center">
                      <Bot size={26} className="text-purple-800" />
                    </div>
                  </div>
                </div>
                <div className=" w-[90%] rounded-tr-[20px] rounded-br-[20px] pt-3 flex flex-col gap-2">
                  <div className=" w-[100%] h-[auto] rounded-tr-[20px] flex  justify-between">
                    <h6 className="font-bold h-[100%] items-center flex">
                      AI phân tích rủi ro
                    </h6>
                    <div className="mr-2  w-[200px] h-[30px] flex  justify-center items-center">
                      <span className="text-sm  h-[100%] items-center flex">
                        15 phút trước
                      </span>
                      <span className="w-[10px] h-[10px] border-2 border-blue-600 rounded-full bg-blue-600 translate-y-0 translate-x-6"></span>
                    </div>
                  </div>
                  <div className="">
                    <p className="p-2">
                      Hệ thống AI nhận thấy sự chậm trễ trong tiến độ cung cấp
                      tài liệu kỹ thuật. Dự báo rủi ro tăng 15%.
                    </p>
                  </div>
                  <div className=" flex gap-4 w-[100%] h-[40px] items-center justify-end pr-4">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
                      Xem báo cáo
                    </button>
                    <button className="border border-gray-300 px-4 py-1 rounded-md">
                      Bỏ qua
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-gray-600 h-full overflow-y-auto">
              <h1 className="text-[#84A3B8] ">Hôm qua</h1>
              <div className="h-[40%] w-[100%]  translate-y-2 rounded-[20px] flex p-0 m-0 mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <div className=" w-[10%] rounded-tl-[20px] rounded-bl-[20px]">
                  <div className="border border-blue-200 w-[50px] h-[50px] translate-x-4 translate-y-4 flex items-center justify-center rounded-full bg-blue-50">
                    <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center">
                      <Settings2 size={26} className="text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className=" w-[90%] rounded-tr-[20px] rounded-br-[20px] pt-3 flex flex-col gap-2">
                  <div className=" w-[100%] h-[auto] rounded-tr-[20px] flex">
                    <h6 className="font-bold mr-[370px]">
                      Cập nhật tiến độ dự án Alpha
                    </h6>
                    <span className="text-sm  h-[100%] items-center flex">
                      2 phút trước
                    </span>
                    <span className="w-[10px] h-[10px] border-2 border-blue-600 rounded-full bg-blue-600 translate-y-2 translate-x-6"></span>
                  </div>
                  <div className="">
                    <p className="p-2">
                      Nguyễn Văn A đã hoàn thành nhiệm vụ "Thiết kế UI/UX cho
                      màn hình Dashboard". Vui lòng kiểm tra và phê duyệt.
                    </p>
                  </div>
                  <div className=" flex gap-4 w-[100%] h-[40px] items-center justify-end pr-4">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
                      Xem chi tiết
                    </button>
                    <button className="border border-gray-300 px-4 py-1 rounded-md">
                      Bỏ qua
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[30%] flex flex-col gap-4 p-10 overflow-y-hidden hover:overflow-y-auto">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Thống kê nhanh
          </h2>

          {/* List */}
          <div className="flex flex-col gap-3">
            {/* Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Dự án
              </div>

              <span className="px-2 py-0.5 text-sm rounded-full bg-blue-500/15 text-blue-600 border border-blue-500/20">
                12
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                AI Insights
              </div>

              <span className="px-2 py-0.5 text-sm rounded-full bg-purple-500/15 text-purple-600 border border-purple-500/20">
                5
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                Hệ thống
              </div>

              <span className="px-2 py-0.5 text-sm rounded-full bg-orange-500/15 text-orange-600 border border-orange-500/20">
                2
              </span>
            </div>
          </div>
        </div>
        {/* PHẦN GIỮA — FILTER TIME */}
        <div className="w-full rounded-2xl border border-gray-200 p-5 bg-white shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 tracking-wide">
            LỌC THEO THỜI GIAN
          </h3>

          <div className="flex flex-col gap-3">
            {/* active option */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-full border border-gray-300 cursor-pointer hover:border-blue-400 transition">
              <span className="w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              </span>
              <span className="font-medium text-gray-800">Hôm nay</span>
            </label>

            {/* option */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer hover:bg-gray-50 transition">
              <span className="w-4 h-4 rounded-full border border-gray-400"></span>
              <span className="text-gray-700">7 ngày qua</span>
            </label>

            {/* option */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer hover:bg-gray-50 transition">
              <span className="w-4 h-4 rounded-full border border-gray-400"></span>
              <span className="text-gray-700">30 ngày qua</span>
            </label>

            {/* custom date */}
            <button className="mt-2 border border-dashed border-blue-400 text-blue-600 rounded-full py-3 font-medium hover:bg-blue-50 transition">
              📅 Chọn khoảng ngày
            </button>
          </div>
        </div>

        {/* PHẦN CUỐI — PRO CARD */}
        <div
          className="w-full rounded-3xl p-6 text-white shadow-md
                bg-gradient-to-br from-blue-600 to-blue-500"
        >
          <h3 className="text-lg font-semibold mb-2">Thông báo ưu tiên?</h3>

          <p className="text-blue-100 text-sm leading-relaxed mb-5">
            Nâng cấp lên gói Pro để nhận thông báo qua SMS và Telegram tức thì.
          </p>

          <button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-900 transition">
            Khám phá ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announce;
