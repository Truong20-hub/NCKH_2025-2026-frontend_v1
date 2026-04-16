import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MoreVertical, Zap, Clock } from "lucide-react";
import AIbotImage from "../assets/aibot.png";
import ChatBox from "./ChatBox";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Khai báo chartOptions để cấu hình biểu đồ tròn
  const chartOptions = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  // Khai báo hàm tạo data cho biểu đồ
  const createChartData = (percent, color) => ({
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: [color, "#F1F5F9"],
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Lỗi lấy tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chào buổi sáng, Quynh</h1>
        <p className="text-gray-500 flex items-center gap-2 mt-2">
          <Clock size={16} /> Hôm nay bạn có {tasks.filter(t => !t.is_completed).length} việc cần làm.
        </p>
      </div>

      {/* Grid Tiến độ - Sử dụng createChartData và chartOptions ở đây để hết lỗi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Dự án NCKH", progress: 75, color: "#3B82F6", status: "Đang tiến triển" },
          { title: "Học Tiếng Anh", progress: 40, color: "#10B981", status: "Đạt mục tiêu" },
          { title: "Tiến độ Frontend", progress: 90, color: "#F59E0B", status: "Sắp hoàn thành" }
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-800">{item.title}</h3>
              <div className="w-12 h-12 relative">
                <Doughnut 
                  data={createChartData(item.progress, item.color)} 
                  options={chartOptions} 
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                  {item.progress}%
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Danh sách Tasks thực tế từ Backend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Công việc ưu tiên</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Đang đồng bộ dữ liệu...</div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={task.is_completed === 1}
                    readOnly 
                    className="w-5 h-5 rounded border-gray-300 text-blue-600" 
                  />
                  <div>
                    <p className={`text-sm font-medium ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString("vi-VN") : "Không có thời hạn"}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                  task.priority === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating AI Bot */}
      <div 
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <img src={AIbotImage} alt="AI Bot" className="rounded-full" />
      </div>
      {chatOpen && <ChatBox onClose={() => setChatOpen(false)} />}
    </div>
  );
};

export default Dashboard;