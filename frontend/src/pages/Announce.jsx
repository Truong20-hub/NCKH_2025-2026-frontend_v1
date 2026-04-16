import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Building2, Bot, Settings2 } from "lucide-react";

const tabs = ["Tất cả", "Chưa đọc", "Quan trọng", "Lưu trữ"];

const ButtonTab = forwardRef(({ label, active, onClick }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={`h-10 px-4 transition-colors duration-200 min-w-[100px]
      ${active ? "text-blue-700 font-bold" : "text-gray-500 hover:text-black"} font-sans`}
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

  // 1. Lấy dữ liệu từ Backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/announcements");
        const data = await response.json();
        setAnnouncements(data); 
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
      } finally {
        setIsLoading(false);
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
  }, [activeTab]);

  // 2. Logic lọc dữ liệu dựa trên DB (is_read: 0 là chưa đọc, 1 là đã đọc)
  const filteredData = announcements.filter(item => {
    const currentTab = tabs[activeTab];
    if (currentTab === "Tất cả") return true;
    if (currentTab === "Chưa đọc") return item.is_read === 0;
    if (currentTab === "Quan trọng") return item.type === 'priority' || item.type === 'system';
    return true;
  });

  return (
    <div className="w-full h-screen flex bg-gray-50">
      <div className="w-[70%] p-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col">
          <div className="relative border-b border-gray-200 flex items-center gap-2">
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
              className="absolute bottom-[-1px] h-[2px] bg-blue-500 transition-all duration-300"
              style={indicatorStyle}
            />
          </div>

          <div className="mt-6 flex-1 overflow-y-auto pr-2 space-y-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {isLoading ? "Đang tải dữ liệu..." : "Mới nhất"}
            </h2>
            
            {!isLoading && filteredData.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-2xl flex p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="mr-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.type === 'project' ? 'bg-blue-100 text-blue-600' : 
                    item.type === 'ai' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {item.type === 'project' ? <Building2 size={24}/> : item.type === 'ai' ? <Bot size={24}/> : <Settings2 size={24}/>}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    {/* Hiển thị ngày tháng từ DB (created_at) */}
                    <span className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  {/* Sử dụng trường 'message' thay cho 'content' theo Model của bạn */}
                  <p className="text-gray-600 text-sm mb-3">{item.message}</p>
                  <div className="flex justify-end gap-2">
                    <button className="text-xs font-bold px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Bỏ qua</button>
                    <button className="text-xs font-bold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Xem chi tiết</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR - Thống kê thực tế */}
      <div className="w-[30%] p-6 space-y-6 overflow-y-auto">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Thống kê nhanh</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>Tổng số
              </div>
              <span className="bg-gray-100 px-2 py-0.5 rounded-full font-bold">
                {announcements.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announce;