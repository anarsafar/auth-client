/* eslint-disable import/extensions */
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Authorize from '@/pages/Auth';
import UserProfile from '@/pages/UserProfile/UserProfile';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import ProtectAuth from './ProtectAuth';
import ForgotPassoword from '@/pages/ForgotPassword';
import EditProfile from '@/pages/UserProfile/EditProfile';
import Error from '@/pages/Error';

function MyRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="auth/login"
            element={<ProtectAuth element={<Authorize isLoginView />} />}
          />
          <Route
            path="auth/signup"
            element={
              <ProtectAuth element={<Authorize isLoginView={false} />} />
            }
          />
          <Route
            path="/"
            index
            element={<ProtectedRoute element={<UserProfile />} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute element={<UserProfile />} />}
          />
          <Route
            path="/forgot-password"
            element={<ProtectAuth element={<ForgotPassoword />} />}
          />
          <Route
            path="/edit-profile"
            element={<ProtectedRoute element={<EditProfile />} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default MyRoutes;
