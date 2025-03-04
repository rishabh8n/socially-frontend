import { Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./layout/AuthLayout";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";

// redirect authenticated users to the home page
import { ReactNode } from "react";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MainLayout from "./layout/MainLayout";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";

const RedirectAuthenticated = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user.isVerified) return <Navigate to="/" />;
  return children;
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated || !user.isVerified)
    return <Navigate to="/auth/signin" />;
  return children;
};

const queryClient = new QueryClient();

function App() {
  const { isChecking, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="auth"
            element={
              <RedirectAuthenticated>
                <AuthLayout />
              </RedirectAuthenticated>
            }
          >
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="verify" element={<EmailVerificationPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="*" element={<Navigate to="/auth/signin" />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:username"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:username/followers"
              element={
                <ProtectedRoute>
                  <FollowersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:username/following"
              element={
                <ProtectedRoute>
                  <FollowingPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<>404</>} />
          </Route>
          <Route
            path="profile/edit"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
