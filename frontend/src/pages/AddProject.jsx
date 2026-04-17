import { useState, useEffect } from "react";
import { Sparkles, CalendarDays, ChevronDown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [project, setProject] = useState({
    ten_du_an: "",
    mo_ta: "",
    ngay_bat_dau: "",
    ngay_ket_thuc: "",
    muc_do_uu_tien: "Trung bình",
    idGoal: "",
    newGoalName: "",
  });

  // 1. Lấy danh sách mục tiêu của User khi vào trang
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;
        if (userId) {
          const response = await axios.get(
            `http://localhost:3000/api/goals/user/${userId}`,
          );
          setGoals(response.data);
        }
      } catch (error) {
        console.error("Không thể lấy danh sách mục tiêu:", error);
      }
    };
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!currentUser.id) {
        alert("Bạn cần đăng nhập để tạo dự án!");
        return;
      }

      // Payload khớp với logic Controller đã sửa
      const payload = {
        user_id: currentUser.id,
        name: project.ten_du_an,
        description: project.mo_ta,
        start_date: project.ngay_bat_dau,
        end_date: project.ngay_ket_thuc,
        priority: project.muc_do_uu_tien,
        idGoal: project.idGoal || null,
        newGoalName: project.newGoalName,
        status: "active",
        color_code: "#F59E0B",
      };

      if (!payload.name) {
        alert("Vui lòng nhập tên dự án!");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/projects",
        payload,
      );

      if (response.status === 201 || response.status === 200) {
        alert("Tạo dự án thành công!");
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi tạo dự án:", error);
      alert("Có lỗi xảy ra, vui lòng kiểm tra lại kết nối!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thêm dự án mới</h1>
            <p className="text-gray-500 text-sm">
              Khởi tạo không gian làm việc cho dự án.
            </p>
          </div>
          <div className="px-4 py-2 text-sm rounded-full bg-orange-100 text-orange-600 flex items-center gap-2">
            <Sparkles size={16} /> AI Đang Sẵn Sàng
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
            {/* TÊN DỰ ÁN */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Tên dự án
              </label>
              <input
                name="ten_du_an"
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ví dụ: Thiết kế Website TaskAI 2.0"
              />
            </div>

            {/* MÔ TẢ */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Mô tả
              </label>
              <textarea
                name="mo_ta"
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Mô tả chi tiết về mục tiêu..."
              />
            </div>

            {/* NGÀY THÁNG */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="ngay_bat_dau"
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="ngay_ket_thuc"
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* ƯU TIÊN & MỤC TIÊU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Mức độ ưu tiên
                </label>
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
                <label className="text-sm font-semibold text-gray-700">
                  Gắn mục tiêu có sẵn
                </label>
                <select
                  name="idGoal"
                  value={project.idGoal}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Chọn mục tiêu liên quan...</option>
                  {goals.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title || g.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TẠO MỤC TIÊU MỚI NHANH */}
            <div className="pt-2">
              <label className="text-sm font-semibold text-blue-600">
                Hoặc tạo mục tiêu mới nhanh
              </label>
              <input
                name="newGoalName"
                value={project.newGoalName}
                onChange={handleChange}
                placeholder="Nhập tên mục tiêu mới nếu chưa có trong danh sách..."
                className="mt-2 w-full border-dashed border-2 border-blue-200 rounded-lg px-4 py-2 outline-none focus:border-blue-400 bg-blue-50/30"
              />
            </div>
          </div>

          {/* AI PANEL */}
          <div className="space-y-6">
            <div className="bg-[#fff7f3] border border-orange-200 rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                ✨ Gợi ý từ AI
              </h3>
              <p className="text-sm text-gray-600 italic">
                Hệ thống AI đang phân tích dữ liệu...
              </p>
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                Tối ưu lộ trình dự án
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Hủy
          </button>
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
