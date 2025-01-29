import DesktopSidebar from "@/components/DesktopSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";
import axios from "@/axios/axios";
import { ArrowLeftIcon, UserIcon } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";

const EditProfilePage = () => {
  const { user, uploadAvatar } = useUserStore();
  const inputFile = useRef<HTMLInputElement | null>(null);
  const handleChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      console.log(formData.get("avatar"));
      await uploadAvatar(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen items-center">
        <div className="flex items-center gap-2 p-2 md:hidden w-full">
          <Link
            replace={true}
            to={`/profile/${user.username}`}
            className="flex items-center p-2"
          >
            <ArrowLeftIcon size={24} />
          </Link>
          <p className="text-xl font-bold">Edit Profile</p>
        </div>
        <div className="w-full md:w-10/12 md:mt-10">
          <p className="hidden md:block mb-4 text-xl font-bold">Edit Profile</p>
          <div className="bg-primary/5 p-4 rounded-lg w-full flex justify-between items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="size-8 text-primary/60" />
              </div>
            )}
            <Input
              type="file"
              onChange={handleChange}
              ref={inputFile}
              className="hidden"
            />
            <Button className="" onClick={() => inputFile.current?.click()}>
              Change Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
