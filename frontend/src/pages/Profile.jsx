import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Camera, Check, RefreshCw } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Giả sử ID người dùng hiện tại là 1
  const userId = 1;

  // Lấy dữ liệu từ Backend khi load trang
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setUserData(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch user:", err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      alert("Lỗi khi cập nhật thông tin.");
      console.error("Lỗi update user:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cài đặt cá nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái: Ảnh đại diện */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
              <img
                src={userData.avatar_url || `https://ui-avatars.com/api/?name=${userData.fullname || 'User'}&background=0D8ABC&color=fff&size=128`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="mt-4 font-bold text-lg text-gray-800">{userData.fullname || "Chưa đặt tên"}</h2>
          <p className="text-sm text-gray-500 italic">Thành viên hệ thống</p>
          
          <button 
            onClick={handleUpdate}
            disabled={saving}
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {saving ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>

        {/* Cột phải: Thông tin chi tiết */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-500" /> Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Họ và tên</label>
                <input
                  type="text"
                  value={userData.fullname || ""}
                  onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
                  className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email || ""}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-emerald-500" /> Bảo mật
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Xác thực 2 yếu tố</p>
                  <p className="text-xs text-gray-400">Tăng cường bảo mật tài khoản</p>
                </div>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
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