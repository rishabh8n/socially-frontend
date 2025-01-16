import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "./layout/AuthLayout";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";

// redirect authenticated users to the home page
import { ReactNode } from "react";

const RedirectAuthenticated = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  console.log(user);
  if (isAuthenticated && user.isVerified) return <Navigate to="/" />;
  return children;
};

function App() {
  const { isChecking, checkAuth, isAuthenticated, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking) return <div>Checking...</div>;

  return (
    <>
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
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
