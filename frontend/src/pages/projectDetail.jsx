import React from "react";
import {
  Calendar,
  CheckCircle2,
  Pencil,
  Trash2,
  Paperclip,
  Image,
  Link,
} from "lucide-react";

const ProjectDetail = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT CONTENT */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* HEADER */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-semibold">
                ĐANG THỰC HIỆN
              </span>
              <span className="text-xs text-gray-400">PROJ-2024-001</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Nâng cấp Hệ thống ERP
            </h1>

            <p className="text-gray-500 text-sm mb-5">
              Hiện đại hóa hạ tầng ERP toàn công ty, tích hợp các mô-đun AI cho
              dự báo tồn kho và quản lý nhân sự tập trung.
            </p>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                <Pencil size={16} />
                Chỉnh sửa
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                <CheckCircle2 size={16} />
                Hoàn thành
              </button>

              <button className="p-2 rounded-lg border border-gray-200 text-red-500 hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-xs text-gray-400 uppercase">
                  Tiến độ tổng thể
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  65%
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    công việc đã xong
                  </span>
                </p>
              </div>

              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar size={14} />
                  Hạn chót: 30/12/2024
                </div>
                <p className="text-orange-500 font-semibold mt-1">
                  Còn 45 ngày
                </p>
              </div>
            </div>

            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[65%]" />
            </div>
          </div>

          {/* DAILY REPORT */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Báo cáo hằng ngày</h3>
              <span className="text-sm text-gray-400">15 Tháng 11, 2023</span>
            </div>

            <textarea
              placeholder="Hôm nay bạn đã làm được gì? Những khó khăn gặp phải..."
              className="w-full h-28 resize-none border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between mt-4">
              <div className="flex gap-3 text-gray-500">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Paperclip size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Image size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Link size={16} />
                </button>
              </div>

              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Gửi báo cáo
              </button>
            </div>
          </div>

          {/* HISTORY */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Lịch sử báo cáo</h3>
              <button className="text-sm text-blue-600 font-semibold">
                Xem tất cả
              </button>
            </div>

            <div className="text-sm text-gray-400 italic">
              Chưa có báo cáo nào trước đó
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI SUGGEST */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
            <h3 className="font-semibold text-gray-800">Gợi ý từ AI</h3>

            {[
              {
                title: "Bước tiếp theo",
                text: "Bạn nên bắt đầu kiểm thử tải cho module kế toán.",
                color: "blue",
              },
              {
                title: "Đánh giá rủi ro",
                text: "Phát hiện xung đột tài nguyên giữa team ERP và Cloud.",
                color: "orange",
              },
              {
                title: "Tối ưu nguồn lực",
                text: "Chuyển 2 kỹ sư FE sang dự án này trong 3 ngày.",
                color: "green",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-sm
                ${
                  item.color === "blue"
                    ? "bg-blue-50 border-blue-100 text-blue-700"
                    : item.color === "orange"
                      ? "bg-orange-50 border-orange-100 text-orange-700"
                      : "bg-green-50 border-green-100 text-green-700"
                }`}
              >
                <p className="font-semibold mb-1">{item.title}</p>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          {/* MEMBERS */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">
              Thành viên dự án
            </h3>

            {["Minh Tuấn (PM)", "Lê Văn Nam", "Hoàng Yến"].map((name, i) => (
              <div key={i} className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                  <span className="text-sm text-gray-700">{name}</span>
                </div>
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              </div>
            ))}

            <button className="w-full border border-dashed border-gray-300 rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-50">
              + Thêm thành viên
            </button>
          </div>

          {/* AI SUPPORT */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <h4 className="font-semibold text-blue-700 mb-2">Cần hỗ trợ?</h4>
            <p className="text-sm text-blue-600 mb-4">
              Hỏi AI bất cứ điều gì về dự án này hoặc báo cáo dữ liệu.
            </p>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Chat với AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
