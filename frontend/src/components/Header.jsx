import React, { useState, useEffect } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import Notification from "../pages/NotificationChild";
import LoginChild from "../pages/LoginChild";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Quản lý đóng mở Profile menu
  const [user, setUser] = useState({ fullname: "Người dùng", avatar: "" });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser({
        fullname: savedUser.fullname,
        avatar: savedUser.avatar_url,
      });
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 relative">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm công việc, mục tiêu..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Nút thông báo */}
        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
          <Bell
            size={20}
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsProfileOpen(false); // Đóng profile khi mở thông báo
            }}
          />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          {isNotificationOpen && (
            <Notification onClose={() => setIsNotificationOpen(false)} />
          )}
        </button>

        {/* Thông tin User */}
        <div
          className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group relative"
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsNotificationOpen(false); // Đóng thông báo khi mở profile
          }}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600">
              {user.fullname}
            </p>
            <p className="text-[10px] text-emerald-500 font-bold">Gói Pro</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user.fullname}&background=0D8ABC&color=fff`
              }
              alt="Avatar"
            />
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
          />

          {/* Component LoginChild */}
          {isProfileOpen && (
            <LoginChild
              className="absolute right-0 top-12"
              onClose={() => setIsProfileOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
