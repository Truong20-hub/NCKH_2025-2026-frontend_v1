import React from "react";
import {
  Paperclip,
  Send,
  History,
  Clock,
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  ChevronDown,
  FileText,
    Trash2,
    LayoutGrid,
  Image as ImageIcon,
} from "lucide-react";
const Projects = () => {
  const [filter, setFilter] = React.useState("in-progress");
  const projectData = [
    {
      id: "PRJ-ERP-2023",
      title: "Nâng cấp Hệ thống ERP",
      desc: "Tối ưu hóa quy trình quản lý kho và kế toán cho các chi nhánh miền Nam.",
      status: "in-progress", // Trạng thái thực tế
      statusLabel: "Trong tiến độ",
      statusColor: "bg-blue-100 text-blue-700",
      progress: 65,
      deadline: "25/12/2023",
      history: [
        {
          date: "12/12/2023",
          status: "Đã duyệt",
          content: "Đã xong API ngân hàng.",
        },
      ],
    },
    {
      id: "WEB-UI-2023",
      title: "Tái thiết kế Giao diện Web",
      desc: "Cập nhật ngôn ngữ thiết kế mới cho trang chủ.",
      status: "completed",
      statusLabel: "Đã hoàn thành",
      statusColor: "bg-green-100 text-green-700",
      progress: 100,
      deadline: "10/12/2023",
      history: [],
    },
  ];
  const filteredProjects = projectData.filter((p) => p.status === filter);
  const filterButtons = [
    { id: "in-progress", label: "Trong tiến độ", icon: <Clock size={16} /> },
    {
      id: "completed",
      label: "Đã hoàn thành",
      icon: <CheckCircle2 size={16} />,
    },
    { id: "deleted", label: "Đã xóa", icon: <Trash2 size={16} /> },
  ];
  return (
    <div className="max-w-7xl mx-auto h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Dự án của tôi
          </h2>
          <p className="text-gray-500 font-medium">
            Quản lý và theo dõi hiệu suất làm việc cá nhân
          </p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                filter === btn.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilter(btn.id)}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md"
            >
              {/* Project Header */}
              <div className="p-6 border-b border-gray-50 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${project.statusColor}`}
                    >
                      {project.statusLabel}
                    </span>
                    <p className="text-xs text-gray-400 font-medium">
                      Mã: {project.id}
                    </p>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <LayoutGrid size={24} />
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-gray-700">Tiến độ</p>
                    <p className="text-sm font-black text-blue-600">
                      {project.progress}%
                    </p>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-700"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Form nộp báo cáo - Chỉ hiện nếu đang trong tiến độ */}
                {filter === "in-progress" && (
                  <div className="space-y-4 pt-2">
                    <textarea
                      className="w-full rounded-xl border-gray-100 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all p-3 min-h-[80px] outline-none"
                      placeholder="Cập nhật tiến độ hôm nay..."
                    ></textarea>
                    <div className="flex justify-between">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Paperclip size={20} />
                      </button>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 flex items-center gap-2">
                        <Send size={16} /> Nộp báo cáo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Hiển thị khi không có dự án nào trong tab */
          <div className="col-span-full bg-white rounded-2xl border-2 border-dashed border-gray-100 p-12 flex flex-col items-center text-center">
            <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
              <LayoutGrid size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Không có dự án nào
            </h3>
            <p className="text-gray-400 text-sm">
              Chưa có dữ liệu cho mục "
              {filterButtons.find((b) => b.id === filter).label}"
            </p>
          </div>
        )}

        {/* Thẻ Hiệu suất (Giữ nguyên bên phải) */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 flex flex-col justify-between items-center text-center space-y-6 xl:sticky xl:top-0">
          <div className="size-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <BarChart3 size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Hiệu suất tuần này</h3>
            <p className="text-blue-100 text-xs">
              Bạn đang làm việc rất hiệu quả!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <p className="text-2xl font-black">08</p>
              <p className="text-[10px] font-medium text-blue-100 uppercase">
                Đang chạy
              </p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <p className="text-2xl font-black">12</p>
              <p className="text-[10px] font-medium text-blue-100 uppercase">
                Hoàn thành
              </p>
            </div>
          </div>
          <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};
export default Projects;
