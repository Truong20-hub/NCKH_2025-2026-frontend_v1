import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("isLogin", "true");
        // Lưu thông tin thật từ Database trả về
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Chào mừng " + result.user.fullname + " quay trở lại!");
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Lỗi kết nối Server!");
      console.error("Lỗi khi kết nối Backend:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex justify-center items-center">
      <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-4">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="font-extrabold text-2xl text-gray-900">TaskAI</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Chào mừng bạn quay trở lại!
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 mt-2"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-8">
          Mới sử dụng TaskAI?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-bold cursor-pointer hover:underline"
          >
            Tạo tài khoản
          </span>
        </div>
      </div>
    </div>
  );
}
