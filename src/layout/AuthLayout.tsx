import { Outlet } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthLayout = () => {
  return (
    <div className="grid lg:grid-cols-2 h-screen overflow-auto">
      <div className="hidden lg:flex justify-center items-center p-5">
        <div className="w-10/12 max-w-[500px] grid grid-cols-4 grid-rows-8 gap-6">
          <div className="row-span-2 col-span-1 bg-[#9b5de5] rounded-l-full"></div>
          <div className="row-span-2 col-span-1 bg-[#f15bb5] rounded-l-full"></div>
          <div className="row-span-4 col-span-2 bg-[#fee440] rounded-full w-full aspect-square"></div>
          <div className="row-span-3 col-span-2 bg-[#00bbf9] rounded-r-full"></div>
          <div className="row-span-2 col-span-2 bg-[#00f5d4] rounded-l-full"></div>
          <div className="row-span-2 col-span-4 rounded-full bg-slate-300"></div>
        </div>
      </div>
      <div className="flex justify-center items-center p-5">
        <Outlet />
      </div>
    </div>
  );
};

const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthLayout />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
