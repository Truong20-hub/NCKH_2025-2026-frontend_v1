import React, { useState, useEffect } from "react";
import {
  Paperclip,
  Send,
  Clock,
  CheckCircle2,
  LayoutGrid,
  BarChart3,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [filter, setFilter] = useState("in_progress");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ bảng goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // Thay URL này bằng link API thật của Quynh
        const res = await axios.get("http://localhost:5000/api/goals");
        setGoals(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách goals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  // Filter dựa trên status trong CSDL (planning, in_progress, completed)
  const filteredGoals = goals.filter((g) => g.status === filter);

  const filterButtons = [
    { id: "planning", label: "Đang lập kế hoạch", icon: <Clock size={16} /> },
    { id: "in_progress", label: "Trong tiến độ", icon: <Clock size={16} /> },
    {
      id: "completed",
      label: "Đã hoàn thành",
      icon: <CheckCircle2 size={16} />,
    },
  ];

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu dự án...</div>;

  return (
    <div className="max-w-7xl mx-auto h-full p-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dự án</h2>
          <p className="text-gray-500 font-medium">Quản lý mục tiêu</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-bold ${
                filter === btn.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setFilter(btn.id)}
            >
              {btn.icon} <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-all"
            >
              <div className="p-6 border-b border-gray-50 flex justify-between items-start">
                <div className="flex-1">
                  <span className="px-2 py-1 rounded-full text-[10px] font-black uppercase bg-blue-50 text-blue-600 mb-2 inline-block">
                    {goal.priority} Priority
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {goal.description}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <LayoutGrid size={24} />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700">
                    Tiến độ dự kiến
                  </span>
                  <span className="font-black text-blue-600">65%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `65%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={14} /> Deadline:{" "}
                  {new Date(goal.end_date).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed text-center text-gray-400">
            Chưa có mục tiêu nào trong trạng thái này.
          </div>
        )}

        {/* Thẻ Hiệu suất */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 flex flex-col justify-between items-center text-center space-y-6">
          <BarChart3 size={40} />
          <div>
            <h3 className="text-xl font-bold">Thống kê NCKH</h3>
            <p className="text-blue-100 text-xs mt-1">
              Hệ thống đang theo dõi {goals.length} mục tiêu
            </p>
          </div>
          <NavLink
            to="/config"
            className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-sm"
          >
            Cấu hình Lộ trình mới
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Projects;
