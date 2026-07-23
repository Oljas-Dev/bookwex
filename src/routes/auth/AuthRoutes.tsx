import { Route } from "react-router-dom";
import AuthLayout from "../../components/authentication/AuthLayout";
import AuthCallback from "../../components/authentication/AuthCallback";
import SignIn from "../../components/authentication/login/SignIn";
import ProtectedRoute from "../../components/authentication/protected-route/ProtectedRoute";
import BecomeTeacher from "../../components/authentication/become-teacher/BecomeTeacher";
import SignupTeacher from "../../components/authentication/signup-teacher/SignupTeacher";
import LogOut from "../../components/authentication/logout/LogOut";
import ChangePasswordDialog from "../../components/authentication/change-password/ChangePassword";
import ForgotPassword from "../../components/authentication/forgot-password/ForgotPassword";
import ResetPassword from "../../components/authentication/forgot-password/ResetPassword";
import SignUp from "../../components/authentication/signup/SignUp";
import SignUpSuccess from "../../ui/SignUpSuccess";

export const signUpTeacherRoute = "/auth/signup-teacher";
export const authRoutes = (
  <>
    <Route path="auth" element={<AuthLayout />}>
      <Route path="callback" element={<AuthCallback />} />
      <Route path="login" element={<SignIn />} />
      <Route
        path="become-teacher"
        element={
          <ProtectedRoute>
            <BecomeTeacher />
          </ProtectedRoute>
        }
      />
      <Route path="signup-teacher" element={<SignupTeacher />} />
      <Route path="logout" element={<LogOut />} />
      <Route path="change-password" element={<ChangePasswordDialog />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="success-signup" element={<SignUpSuccess />} />
    </Route>
  </>
);
