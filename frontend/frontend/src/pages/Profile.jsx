import React from "react";
import { User, Mail, Shield, Bell, Camera } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cài đặt cá nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái: Ảnh đại diện */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
              <img
                src="https://ui-avatars.com/api/?name=Alex+Miller&background=0D8ABC&color=fff&size=128"
                alt="Profile"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="mt-4 font-bold text-lg text-gray-800">Alex Miller</h2>
          <p className="text-sm text-gray-500 italic">
            Thành viên từ tháng 10, 2024
          </p>
          <button className="mt-6 w-full py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Nâng cấp lên Pro
          </button>
        </div>

        {/* Cột phải: Thông tin chi tiết (Dạng Grid) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-500" /> Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  defaultValue="Alex Miller"
                  className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="alex.miller@example.com"
                  className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-emerald-500" /> Bảo mật & Thông
              báo
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Xác thực 2 yếu tố
                  </p>
                  <p className="text-xs text-gray-400">
                    Tăng cường bảo mật cho tài khoản của bạn
                  </p>
                </div>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Thông báo qua Email
                  </p>
                  <p className="text-xs text-gray-400">
                    Nhận báo cáo tiến độ công việc hàng tuần
                  </p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
