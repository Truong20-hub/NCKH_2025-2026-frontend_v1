// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";

import GoalsConfig from "./pages/GoalsConfig.jsx";
import Projects from "./pages/Projects.jsx";
import CalendarView from "./pages/CalendarView.jsx";
import Announce from "./pages/Announce.jsx";
import CreateProject from "./pages/AddProject.jsx";
import ProjectDetail from "./pages/projectDetail.jsx";
import SettingsPage from "./pages/setting.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cha là Layout */}
        <Route path="/" element={<Layout />}>
          {/* Các Route con sẽ hiển thị tại vị trí <Outlet /> trong Layout */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          {/* Ví dụ các trang tiếp theo */}
          <Route path="goals" element={<GoalsConfig />} />
          <Route path="projects" element={<Projects />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="announce" element={<Announce />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="project-detail" element={<ProjectDetail />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Chuyển hướng nếu vào link lạ */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
