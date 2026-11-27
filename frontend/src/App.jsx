
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import ResidentDashboard from "./pages/resident/ResidentDashboard";
import Notices from "./pages/resident/Notices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Resident Routes */}
        <Route element={<ProtectedRoute allowedRoles={["resident"]} />}>
          <Route
            path="/resident/dashboard"
            element={<ResidentDashboard />}
          />

          <Route
            path="/resident/notices"
            element={<Notices />}
          />
        </Route>

        {/* Guard Routes */}
        <Route element={<ProtectedRoute allowedRoles={["guard"]} />}>
          <Route
            path="/guard/dashboard"
            element={<h1>Guard Dashboard</h1>}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/admin/dashboard"
            element={<h1>Admin Dashboard</h1>}
          />
        </Route>

        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
