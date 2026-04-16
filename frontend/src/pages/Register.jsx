import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, User, Mail, Lock } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.name,
          username: formData.username,
        }),
      });
      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Kết quả từ server:", result);

      if (response.ok) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        alert("Lỗi từ server: " + (result.message || "Không xác định"));
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert(
        "Không thể kết nối đến máy chủ. Quynh kiểm tra xem Backend đã chạy chưa nhé!",
      );
    }
  };

  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex justify-center items-center">
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-2xl text-gray-900">
            Bắt đầu với TaskAI
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Nâng cao hiệu suất công việc với AI
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">
                Tên đầy đủ
              </label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Nguyen Van A"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">
                Biệt danh
              </label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ví dụ: quynh_it"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">
                Email
              </label>
              <input
                type="email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Tối thiểu 8 ký tự"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4 shadow-lg shadow-blue-200"
          >
            Tạo tài khoản
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-bold cursor-pointer hover:underline"
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}
