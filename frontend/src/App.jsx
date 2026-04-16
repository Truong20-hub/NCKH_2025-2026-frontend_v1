// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import GoalsConfig from "./pages/GoalsConfig.jsx";
import Projects from "./pages/Projects.jsx";
import CalendarView from "./pages/CalendarView.jsx";
import Announce from "./pages/Announce.jsx";
import CreateProject from "./pages/AddProject.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import SettingsPage from "./pages/setting.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTE */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="goals" element={<GoalsConfig />} />
          <Route path="projects" element={<Projects />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="announce" element={<Announce />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Route lạ */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
