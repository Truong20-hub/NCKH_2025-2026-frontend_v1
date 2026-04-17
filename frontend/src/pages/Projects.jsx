import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, LayoutGrid, BarChart3 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");
  const navigate = useNavigate();

  const filterButtons = [
    { id: "planning", label: "Lập kế hoạch", icon: <Clock size={16} /> },
    { id: "active", label: "Đang chạy", icon: <Clock size={16} /> }, // Sửa in_progress thành active
    { id: "completed", label: "Hoàn thành", icon: <CheckCircle2 size={16} /> },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) return;

      try {
        const res = await axios.get(
          `http://localhost:3000/api/projects/user/${userId}`,
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Lỗi fetch dự án:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => p.status === filter);

  if (loading)
    return (
      <div className="p-10 text-center font-medium">Đang tải dữ liệu...</div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            Dự án
          </h2>
          <p className="text-gray-500 font-medium">
            Theo dõi tiến độ nghiên cứu
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl w-fit border border-gray-200">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-bold ${
                filter === btn.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
              onClick={() => setFilter(btn.id)}
            >
              {btn.icon} <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => navigate(`/projects/${proj.id}`)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
            >
              <div className="p-6 border-b border-gray-50 flex justify-between items-start">
                <div className="flex-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-50 text-blue-600 mb-2 inline-block">
                    {proj.priority || "Medium"} Priority
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {proj.title || proj.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {proj.description || "Không có mô tả cho dự án này."}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                  <LayoutGrid size={24} />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700">
                    Tiến độ hiện tại
                  </span>
                  <span className="font-black text-blue-600">
                    {proj.progress || 0}%
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-1000"
                    style={{ width: `${proj.progress || 0}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={14} /> Hạn chót:{" "}
                  {proj.due_date
                    ? new Date(proj.due_date).toLocaleDateString("vi-VN")
                    : "Chưa xác định"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed text-center text-gray-400">
            Không tìm thấy dự án nào trong mục này.
          </div>
        )}

        {/* Thẻ Thống kê giữ nguyên phong cách cũ nhưng mượt hơn */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 flex flex-col justify-between items-center text-center shadow-lg">
          <BarChart3 size={40} className="mb-4" />
          <div>
            <h3 className="text-xl font-bold">Tổng quan Hiệu suất</h3>
            <p className="text-blue-100 text-xs mt-1">
              Bạn đang quản lý {projects.length} dự án nghiên cứu
            </p>
          </div>
          <NavLink
            to="/config"
            className="w-full mt-6 bg-white text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
          >
            + Tạo lộ trình mới
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Projects;
