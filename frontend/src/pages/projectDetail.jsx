import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, CheckCircle2, Pencil, Trash2, Paperclip, Image, Link, ChevronLeft } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Đang tải chi tiết...</div>;
  if (!project) return <div className="p-10 text-center">Không tìm thấy dự án!</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 animate-in slide-in-from-right-4 duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 font-medium transition-colors">
        <ChevronLeft size={20} /> Quay lại danh sách
      </button>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* HEADER DỮ LIỆU THẬT */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-black uppercase tracking-wider">
                {project.status === 'in_progress' ? 'Đang thực hiện' : project.status}
              </span>
              <span className="text-xs text-gray-400 font-mono">ID: PROJ-{project.id}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title || project.name}</h1>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-sm transition-all">
                <Pencil size={16} /> Chỉnh sửa
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm shadow-sm transition-all">
                <CheckCircle2 size={16} /> Hoàn thành
              </button>
              <button className="p-2 rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* TIẾN ĐỘ DỮ LIỆU THẬT */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-black">Tiến độ tổng thể</p>
                <p className="text-3xl font-black text-blue-600">
                  {project.progress || 0}%
                  <span className="text-sm font-normal text-gray-400 ml-2">khối lượng công việc</span>
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-gray-500 font-medium">
                  <Calendar size={14} />
                  Hạn: {project.due_date ? new Date(project.due_date).toLocaleDateString("vi-VN") : "N/A"}
                </div>
                <p className="text-orange-500 font-bold mt-1 uppercase text-[10px]">Ưu tiên: {project.priority}</p>
              </div>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${project.progress || 0}%` }} />
            </div>
          </div>

          {/* DAILY REPORT (Giữ nguyên form đẹp của Quynh) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Báo cáo tiến độ hôm nay</h3>
            <textarea
              placeholder="Ghi chú những gì bạn đã hoàn thành..."
              className="w-full h-32 resize-none border border-gray-100 bg-gray-50 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="flex justify-between mt-4">
              <div className="flex gap-2 text-gray-400">
                <button className="p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600"><Paperclip size={18} /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600"><Image size={18} /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600"><Link size={18} /></button>
              </div>
              <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-blue-600 font-bold text-sm transition-all shadow-md">
                Gửi cập nhật
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR (Gợi ý AI & Thành viên) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div> Gợi ý thông minh
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="font-bold text-blue-700 text-xs mb-1 uppercase">Hành động kế tiếp</p>
                <p className="text-sm text-blue-800">Dựa trên deadline, bạn nên ưu tiên phần "Cơ sở lý thuyết".</p>
              </div>
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                <p className="font-bold text-orange-700 text-xs mb-1 uppercase">Cảnh báo</p>
                <p className="text-sm text-orange-800">Bạn đã trễ 2 ngày so với kế hoạch ban đầu.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <h4 className="font-bold mb-2">Trợ lý Nghiên cứu AI</h4>
            <p className="text-blue-100 text-xs mb-4 leading-relaxed">
              Bạn gặp khó khăn trong việc phân tích dữ liệu dự án này? Hãy hỏi AI ngay.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase hover:bg-blue-50 transition-colors shadow-sm">
              Bắt đầu thảo luận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;