import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import useUserToken from './context/userTokenStore';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import MainLayout from './layout/mainLayout/MainLayout';
import ManageTasks from './pages/manageTasks/ManageTasks';
import Settings from './pages/settings/Settings';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const PreAuthRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default function AppRoutes() {
  const { userToken } = useUserToken();
  const isAuthenticated = Boolean(userToken);

  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<ManageTasks />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route element={<PreAuthRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>



      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}
