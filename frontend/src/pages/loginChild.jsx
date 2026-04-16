import React from "react";
import { User, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginChild({ className, onClose }) {
  const navigate = useNavigate();
  
  // Lấy thông tin user từ localStorage để hiển thị fullname
  const savedUser = JSON.parse(localStorage.getItem("user")) || { fullname: "Người dùng" };

  const handleAction = (path) => {
    navigate(path);
    if (onClose) onClose(); 
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    if (onClose) onClose();
  };

  return (
    <div className={`${className} w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[100] animate-in fade-in zoom-in duration-200`}>
      {/* Header Dropdown */}
      <div className="px-4 py-3 border-b border-gray-50">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Tài khoản</p>
        <p className="text-sm font-bold text-gray-800 truncate">{savedUser.fullname}</p>
      </div>

      {/* Menu Items */}
      <div className="p-1">
        <button 
          onClick={() => handleAction("/profile")}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
        >
          <User size={16} /> Hồ sơ cá nhân
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
          <Shield size={16} /> Bảo mật
        </button>
      </div>

      <div className="p-1 mt-1 border-t border-gray-50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>
    </div>
  );
}