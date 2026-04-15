import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLogin", "true");
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
      {/* Card login */}
      <div className="w-[380px] bg-white rounded-2xl shadow-lg p-6">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Zap size={18} fill="currentColor" />
          </div>
          <h1 className="font-bold text-xl text-blue-600">TaskAI</h1>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="text-lg font-bold">Chào mừng bạn đến với TaskAI</div>

          <p className="text-gray-500 text-sm mt-1">
            Vui lòng đăng nhập để tiếp tục quản lý công việc của bạn.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition"
          >
            Đăng nhập
          </button>
        </form>

        {/* Register */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Đăng ký
          </span>
        </div>
      </div>
    </div>
  );
}
