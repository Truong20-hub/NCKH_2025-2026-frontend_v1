import { useState } from "react"; // Thêm useState
import { Sparkles, CalendarDays, ChevronDown } from "lucide-react";
import axios from "axios"; // Đảm bảo đã cài axios: npm install axios

const CreateProject = () => {
  // 1. Quản lý trạng thái form
  const [project, setProject] = useState({
    ten_du_an: "",
    mo_ta: "",
    ngay_bat_dau: "",
    ngay_ket_thuc: "",
    muc_do_uu_tien: "Trung bình",
    id_muc_tieu: ""
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // 2. Hàm gửi dữ liệu về Backend
  const handleSubmit = async () => {
    try {
      // Gọi đến API do tool C# của bạn gen ra
      const response = await axios.post("http://localhost:3000/api/duan", project);
      alert("Tạo dự án thành công!");
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi tạo dự án:", error);
      alert("Có lỗi xảy ra, vui lòng kiểm tra lại kết nối Database!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thêm dự án mới</h1>
            <p className="text-gray-500 text-sm">Khởi tạo không gian làm việc cho dự án của Quynh.</p>
          </div>
          <div className="px-4 py-2 text-sm rounded-full bg-orange-100 text-orange-600 flex items-center gap-2">
            <Sparkles size={16} /> AI Đang Sẵn Sàng
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FORM LEFT */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">Tên dự án</label>
              <input
                name="ten_du_an"
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ví dụ: Thiết kế Website TaskAI 2.0"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Mô tả</label>
              <textarea
                name="mo_ta"
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Mô tả chi tiết về mục tiêu..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Ngày bắt đầu</label>
                <div className="mt-2 relative">
                  <input
                    type="date"
                    name="ngay_bat_dau"
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Ngày kết thúc</label>
                <div className="mt-2 relative">
                  <input
                    type="date"
                    name="ngay_ket_thuc"
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Mức độ ưu tiên</label>
                <select 
                  name="muc_do_uu_tien"
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="Trung bình">Trung bình</option>
                  <option value="Cao">Cao</option>
                  <option value="Thấp">Thấp</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Gắn mục tiêu</label>
                <select 
                  name="id_muc_tieu"
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Chọn mục tiêu liên quan...</option>
                  <option value="1">Mục tiêu NCKH 2026</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI PANEL (Giữ nguyên giao diện đẹp của bạn) */}
          <div className="space-y-6">
            <div className="bg-[#fff7f3] border border-orange-200 rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">✨ Gợi ý từ AI</h3>
              <p className="text-sm text-gray-600 italic">Hệ thống AI đang phân tích dữ liệu từ TiDB...</p>
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                Tối ưu lộ trình dự án
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600">Hủy</button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-2 rounded-lg bg-orange-500 text-white font-semibold shadow hover:bg-orange-600"
          >
            + Tạo dự án
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;