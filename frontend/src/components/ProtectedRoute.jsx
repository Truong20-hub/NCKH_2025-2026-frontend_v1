import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin");

  // Kiểm tra nếu không có hoặc giá trị là 'false'
  if (!isLogin || isLogin === "false") {
    return <Navigate to="/login" replace />; 
    // Thêm replace để người dùng không quay lại trang cũ khi nhấn nút Back
  }

  return children;
}