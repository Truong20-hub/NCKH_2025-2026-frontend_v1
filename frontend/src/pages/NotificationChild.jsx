import React, { useEffect, useState } from "react";
import { Bell, X, Calendar, Zap, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationChild = ({ onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy 3 thông báo mới nhất từ Database
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/announcements");
        const data = await res.json();
        // Chỉ lấy 3 cái mới nhất để hiển thị ở popup
        setNotifications(data.slice(0, 3));
      } catch (err) {
        console.error("Lỗi lấy thông báo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  // Hàm chọn Icon dựa trên type từ DB
  const getIcon = (type) => {
    switch (type) {
      case 'project': return <Calendar className="w-7 h-7 text-blue-600" />;
      case 'ai': return <Zap className="w-7 h-7 text-green-600" />;
      case 'alert': return <AlertTriangle className="w-7 h-7 text-red-600" />;
      default: return <Bell className="w-7 h-7 text-gray-600" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'project': return 'bg-blue-50 hover:bg-blue-100';
      case 'ai': return 'bg-green-50 hover:bg-green-100';
      case 'alert': return 'bg-red-50 hover:bg-red-100';
      default: return 'bg-white hover:bg-gray-50';
    }
  };

  return (
    <div className="absolute flex flex-col top-[53px] right-0 w-[350px] h-[500px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-in fade-in zoom-in duration-200">
      {/* Header */}
      <div className="flex items-center gap-2 h-[60px] pl-3 border-b-2 border-gray-200 bg-[#EEF3FF] rounded-t-xl text-black">
        <Bell className="w-6 h-6 text-blue-600" />
        <span className="text-[17px] font-semibold">Thông báo mới nhất</span>
        <X className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer absolute right-3" onClick={onClose} />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="p-4 text-center text-gray-500 text-sm">Đang tải...</p>
        ) : notifications.length > 0 ? (
          notifications.map((item) => (
            <div key={item.id} className={`w-full flex min-h-[110px] border-b border-gray-100 p-3 transition-colors cursor-pointer ${getBgColor(item.type)}`}>
              <div className="w-[20%] flex justify-center pt-1">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-sm">
                  {getIcon(item.type)}
                </div>
              </div>
              <div className="w-[80%] pl-2">
                <p className="text-[14px] font-bold text-gray-800">{item.title}</p>
                <p className="text-[13px] text-gray-600 mt-1 line-clamp-2">{item.message || item.content}</p>
                <p className="text-[11px] text-gray-400 mt-2 italic">
                  {new Date(item.created_at).toLocaleTimeString("vi-VN", {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="p-10 text-center text-gray-400 text-sm">Không có thông báo mới</p>
        )}
      </div>

      {/* Footer */}
      <div className="h-[50px] flex items-center justify-center border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <button 
          className="text-[14px] font-bold text-blue-600 hover:text-blue-800"
          onClick={() => { navigate("/announce"); onClose(); }}
        >
          Xem tất cả thông báo
        </button>
      </div>
    </div>
  );
};
export default NotificationChild;