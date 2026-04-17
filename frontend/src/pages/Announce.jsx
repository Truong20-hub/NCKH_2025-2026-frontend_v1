import React, { useEffect, useRef, useState, forwardRef } from "react";
import {
  Building2,
  Bot,
  Settings2,
  BellOff,
  CheckCircle2,
  Clock,
} from "lucide-react";

const tabs = ["Tất cả", "Chưa đọc", "Quan trọng", "Lưu trữ"];

const ButtonTab = forwardRef(({ label, active, onClick }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={`h-10 px-4 transition-all duration-200 min-w-[100px] relative
      ${active ? "text-blue-600 font-bold" : "text-gray-500 hover:text-gray-900"} font-sans text-sm`}
  >
    {label}
  </button>
));

const Announce = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const buttonRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        console.log("--- BẮT ĐẦU FETCH DỮ LIỆU ---");

        const userStr = localStorage.getItem("user");
        console.log("Dữ liệu 'user' lấy từ localStorage:", userStr);

        if (!userStr) {
          console.error("LỖI: localStorage không có key 'user'");
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        console.log("ID người dùng sau khi Parse:", user.id);

        if (!user.id) {
          console.error(
            "LỖI: Object 'user' tồn tại nhưng không có thuộc tính 'id'",
          );
          setIsLoading(false);
          return;
        }

        const apiUrl = `http://localhost:3000/api/notifications/user/${user.id}`;
        console.log("Đang gọi API tại:", apiUrl);

        const response = await fetch(apiUrl);
        console.log("Response Status (Mã trạng thái):", response.status);

        const data = await response.json();
        console.log("DỮ LIỆU NHẬN VỀ TỪ BACKEND:", data);

        if (Array.isArray(data)) {
          setAnnouncements(data);
          console.log("Số lượng thông báo tìm thấy:", data.length);
        } else {
          console.warn(
            "CẢNH BÁO: Dữ liệu trả về không phải là một mảng!",
            data,
          );
          setAnnouncements([]);
        }
      } catch (error) {
        console.error("LỖI KẾT NỐI NGHIÊM TRỌNG:", error);
      } finally {
        setIsLoading(false);
        console.log("--- KẾT THÚC QUÁ TRÌNH FETCH ---");
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const el = buttonRef.current[activeTab];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab, announcements]);

  const filteredData = announcements.filter((item) => {
    const currentTab = tabs[activeTab];
    if (currentTab === "Tất cả") return true;
    if (currentTab === "Chưa đọc") return item.is_read === 0;
    if (currentTab === "Quan trọng")
      return item.type === "priority" || item.type === "ai";
    return true;
  });

  return (
    <div className="w-full h-screen flex bg-[#f8fafc]">
      <div className="w-[70%] p-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
          {/* TAB HEADER */}
          <div className="px-6 pt-4 relative border-b border-slate-100 flex items-center">
            {tabs.map((tab, index) => (
              <ButtonTab
                key={index}
                label={tab}
                active={index === activeTab}
                onClick={() => setActiveTab(index)}
                ref={(el) => (buttonRef.current[index] = el)}
              />
            ))}
            <span
              className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out"
              style={indicatorStyle}
            />
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {tabs[activeTab]} ({filteredData.length})
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-10 text-slate-400">
                Đang tải thông báo...
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-slate-100 rounded-2xl flex hover:bg-slate-50 transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${item.type === "ai" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}
                  >
                    {item.type === "ai" ? (
                      <Bot size={24} />
                    ) : (
                      <Building2 size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-slate-800">{item.title}</h4>
                      <span className="text-xs text-slate-400">
                        {new Date(item.created_at).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">{item.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <BellOff size={48} className="text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-700">
                  Hết thông báo rồi!
                </h3>
                <p className="text-slate-400 text-sm">
                  Quynh đã xử lý hết các cập nhật quan trọng.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[30%] p-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Thống kê</h2>
          <div className="bg-blue-50 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-sm font-medium">Tổng thông báo</span>
            <span className="font-bold text-blue-600">
              {announcements.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announce;
