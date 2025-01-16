import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import React from "react";

const HomePage = () => {
  const { isAuthenticated, user, signout } = useUserStore();
  const handleSignout = () => {
    signout();
  };
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      {isAuthenticated ? (
        <>
          <h1 className="text-3xl font-bold">Hola, {user.username}</h1>
          <p>{user.email}</p>
          <Button onClick={handleSignout}>Sign out</Button>
        </>
      ) : (
        <h1>Home Page</h1>
      )}
    </div>
  );
};

export default HomePage;
