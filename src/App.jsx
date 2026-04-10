import VideoLibrary from "./features/library/video-moderation/VideoLibrary";
import VideoModerationManagement from "./features/library/video-moderation/VideoModerationManagement";
import Login from "./features/login/login";
import Dashboard from "./features/dashboard/dashboard";
import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  return (
    <div className="app h-100">
      <Routes>
        {/* 1. Public Route: Login is at the base "/" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* 2. Protected Routes: Wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<VideoLibrary />} />
          <Route path="/library/videomoderation/clip" element={<VideoModerationManagement />} />
        </Route>

        {/* 3. Global Catch-all (Optional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
