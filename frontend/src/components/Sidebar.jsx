import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  ClipboardList,
  BarChart3,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  Plus,
  Settings,
  HelpCircle,
  Calendar,
  Bell,
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    {
      path: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Bảng điều khiển",
    },
    { path: "/goals", icon: <Target size={20} />, label: "Mục tiêu" },
    { path: "/projects", icon: <ClipboardList size={20} />, label: "Dự án" },
    { path: "/calendar", icon: <Calendar size={20} />, label: "Lịch" },
    { path: "/announce", icon: <Bell size={20} />, label: "Thông báo" },
    { path: "/profile", icon: <User size={20} />, label: "Cá nhân" },
  ];

  return (
    <div
      className={`relative ${isCollapsed ? "w-20" : "w-64"} bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Nút đóng mở */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:text-blue-600 transition-all z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div
        className={`p-6 font-bold text-xl text-blue-600 flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white">
          <Zap size={18} fill="currentColor" />
        </div>
        {!isCollapsed && <span>TaskAI</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? "justify-center" : "gap-3"} p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
            title={isCollapsed ? item.label : ""}
          >
            {item.icon}
            {!isCollapsed && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 space-y-2 border-t border-gray-100">
        <NavLink
          to="/create-project"
          className={`w-full bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 
  ${isCollapsed ? "p-3" : "py-2.5 px-4"}`}
          title={isCollapsed ? "Thêm dự án mới" : ""}
        >
          <Plus size={20} />
          {!isCollapsed && (
            <span className="text-sm font-medium">Thêm dự án mới</span>
          )}
        </NavLink>
        <div className="pt-2">
          {[
            {
              icon: <Settings size={20} />,
              label: "Cài đặt",
              path: "/settings",
            },
            {
              icon: <HelpCircle size={20} />,
              label: "Trợ giúp",
              path: "/help",
            },
          ].map((action, index) => (
            <NavLink
              to={action.path}
              key={index}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
              title={isCollapsed ? action.label : ""}
            >
              {action.icon}
              {!isCollapsed && <span className="text-sm">{action.label}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
