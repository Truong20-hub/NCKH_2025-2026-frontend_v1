import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MoreVertical, Zap, CheckCircle2, Clock } from "lucide-react";
import AIbotImage from "../assets/aibot.png";
import ChatBox from "./ChatBox";
import { useState } from "react";

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);
  // Dữ liệu mẫu cho các biểu đồ tròn (Progress)
  const createChartData = (percent, color) => ({
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: [color, "#F1F5F9"],
        borderWidth: 0,
        circumference: 360,
        rotation: 0,
      },
    ],
  });

  const chartOptions = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="max-w-6xl">
      {/* Header Chào buổi sáng */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Chào buổi sáng, Alex
        </h1>
        <p className="text-gray-500 flex items-center gap-2">
          <Clock size={16} /> Thứ Hai, ngày 23 tháng 10 • Bạn có 5 công việc cần
          hoàn thành hôm nay.
        </p>
      </div>

      {/* Banner Thông tin AI */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-200 p-2 rounded-lg text-emerald-700">
            <Zap size={20} fill="currentColor" />
          </div>
          <p className="text-sm text-emerald-800">
            <span className="font-bold">Thông tin AI:</span> Bạn có một khoảng
            trống lúc 2:00 chiều nay. Chúng ta có nên sắp xếp "Phân tích thị
            trường" không?
          </p>
        </div>
        <button className="text-emerald-700 font-semibold text-sm hover:underline">
          Áp dụng
        </button>
      </div>

      {/* Grid Tiến độ mục tiêu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Chiến dịch Marketing",
            progress: 65,
            color: "#3B82F6",
            status: "+5% tuần này",
          },
          {
            title: "Tuyển dụng Kỹ thuật Q4",
            progress: 20,
            color: "#EF4444",
            status: "-2% chậm tiến độ",
          },
          {
            title: "Ra mắt Sản phẩm V2",
            progress: 48,
            color: "#10B981",
            status: "+12% tăng tốc sprint",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-xs text-blue-500 mt-1">Còn 12 ngày</p>
              </div>
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Doughnut
                  data={createChartData(item.progress, item.color)}
                  options={chartOptions}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-gray-800">
                  {item.progress}%
                </span>
              </div>
            </div>
            <div
              className={`inline-block px-2 py-1 rounded text-[10px] font-bold ${
                item.status.includes("+")
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {item.status}
            </div>
          </div>
        ))}
      </div>

      {/* Phần danh sách công việc ưu tiên */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Công việc ưu tiên</h3>
            <button className="text-sm text-blue-600 font-bold">
              Quản lý danh sách
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              {
                task: "Hoàn thiện Hướng dẫn Thương hiệu",
                tag: "ƯU TIÊN CAO",
                tagColor: "text-red-500 bg-red-50",
              },
              {
                task: "Phỏng vấn ứng viên: Sarah J.",
                tag: "TRUNG BÌNH",
                tagColor: "text-orange-500 bg-orange-50",
              },
              {
                task: "Dự thảo Báo cáo Sprint Retro",
                tag: "THẤP",
                tagColor: "text-gray-500 bg-gray-50",
              },
            ].map((task, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {task.task}
                    </p>
                    <p className="text-xs text-gray-400">
                      Chiến dịch Marketing • Dự kiến 2 giờ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded text-center ${task.tagColor}`}
                  >
                    {task.tag}
                  </span>
                  <MoreVertical
                    size={16}
                    className="text-gray-400 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar phải: Xu hướng hoạt động */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Xu hướng hoạt động</h3>
          <div className="h-32 bg-blue-50 rounded-xl mb-4 flex items-end justify-around p-2">
            {/* Giả lập biểu đồ cột đơn giản bằng Tailwind */}
            {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-4 bg-blue-500 rounded-t-sm"
              ></div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center italic">
            "Bạn làm việc năng suất nhất vào khoảng 10h sáng các ngày thứ 5."
          </p>
        </div>
      </div>
      {/* Hình ảnh AI Bot ở góc dưới cùng bên phải */}
      <div
        className=" 
        fixed bottom-6 right-6
        w-20 h-20
        flex items-center justify-center
        rounded-full
        bg-white
        shadow-xl
        border border-gray-200
        hover:shadow-2xl
        hover:scale-105
        transition-all duration-300
        cursor-pointer"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <img
          src={AIbotImage}
          alt="AI Bot"
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>
      {chatOpen && <ChatBox onClose={() => setChatOpen(false)} />}
    </div>
  );
};

export default Dashboard;
