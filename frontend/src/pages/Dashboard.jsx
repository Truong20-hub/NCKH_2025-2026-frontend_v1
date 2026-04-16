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
  const [projects, setProjects] = useState([]);
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
        backgroundColor: [color || "#3B82F6", "#F1F5F9"],
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = currentUser ? currentUser.id : "";
        
        // Fetch Tasks
        const resTasks = await fetch(`http://localhost:3000/api/tasks${userId ? `?userId=${userId}` : ""}`);
        const dataTasks = await resTasks.json();
        setTasks(Array.isArray(dataTasks) ? dataTasks : []);

        // Fetch Projects
        const resProjects = await fetch(`http://localhost:3000/api/projects${userId ? `/user/${userId}` : ""}`);
        const dataProjects = await resProjects.json();
        setProjects(Array.isArray(dataProjects) ? dataProjects : []);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chào buổi sáng, {JSON.parse(localStorage.getItem("user") || "{}").fullname || "bạn"}</h1>
        <p className="text-gray-500 flex items-center gap-2 mt-2">
          <Clock size={16} /> Hôm nay bạn có {tasks.filter(t => !t.is_completed).length} việc cần làm.
        </p>
      </div>

      {/* Grid Tiến độ - Map dữ liệu Projects động */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {projects.length > 0 ? projects.map((project) => {
          // Tính % tiến độ
          const projectTasks = tasks.filter(t => t.project_id === project.id);
          const totalTasks = projectTasks.length;
          const completedTasks = projectTasks.filter(t => t.is_completed === 1 || t.is_completed === true).length;
          const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
          
          let statusLabel = "Đang tiến triển";
          if (progress === 100) statusLabel = "Hoàn thành";
          else if (progress === 0 && totalTasks > 0) statusLabel = "Chưa tiến triển";
          else if (totalTasks === 0) statusLabel = "Chưa có Task";

          return (
            <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-gray-800 line-clamp-2">{project.name || project.title || "Dự án mới"}</h3>
                </div>
                <div className="w-12 h-12 relative shrink-0">
                  <Doughnut 
                    data={createChartData(progress, project.color_code)} 
                    options={chartOptions} 
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                    {progress}%
                  </span>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                progress === 100 ? "bg-emerald-50 text-emerald-600" 
                : progress === 0 ? "bg-gray-50 text-gray-600" 
                : "bg-blue-50 text-blue-600"
              }`}>
                {statusLabel}
              </span>
            </div>
          );
        }) : (
          <div className="col-span-3 text-center p-8 bg-white border border-dashed border-gray-200 rounded-2xl text-gray-400">
            Bạn chưa có dự án nào. Hãy tạo một dự án mới để theo dõi tiến độ!
          </div>
        )}
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