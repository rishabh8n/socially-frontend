import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import axios from "@/axios/axios";
import { AxiosError } from "axios";
import { MenuIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

interface Error {
  message: string;
}

const ProfilePage = () => {
  const { user } = useUserStore();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [requestProcessing, setRequestProcessing] = useState(false);
  const navigate = useNavigate();
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const response = await axios.get(`/profile/${username}`);
      return response.data.data;
    },
    retry: false,
  });

  const follow = async () => {
    try {
      if (requestProcessing) return;
      setRequestProcessing(true);
      const response = await axios.post(`/profile/follow`, {
        username: data.username,
      });
      if (response.status === 201) {
        refetch();
      }
      setRequestProcessing(false);
    } catch (error) {
      setRequestProcessing(false);
      console.log(error);
    }
  };

  const unfollow = async () => {
    try {
      if (requestProcessing) return;
      setRequestProcessing(true);
      const response = await axios.post(`/profile/unfollow`, {
        username: data.username,
      });
      if (response.status === 201) {
        refetch();
      }
      setRequestProcessing(false);
    } catch (error) {
      setRequestProcessing(false);
      console.log(error);
    }
  };

  if (isPending)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  if (error)
    return <div>{(error as AxiosError<Error>)?.response?.data?.message}</div>;
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4">
      <div className="md:hidden w-full flex justify-between items-center pt-4 px-2">
        <Logo fontSize="text-2xl" />
        {data.username === user?.username ? (
          <SettingsIcon size={25} className="text-primary/80" />
        ) : (
          <MenuIcon size={25} className="text-primary/80" />
        )}
      </div>
      <div className="md:mt-16 grid-cols-[auto,2fr,2fr] grid md:grid-cols-[1fr,2fr,2fr] md:gap-x-12 gap-x-2 md:gap-y-4 w-full max-w-[700px]">
        <div className="p-2 md:justify-self-center place-self-start row-span-2 md:row-span-3">
          {data?.avatar ? (
            <img
              src={data.avatar}
              alt="avatar"
              className="md:w-24 md:h-24 w-12 h-12 rounded-full"
            />
          ) : (
            <div className="md:w-24 md:h-24 w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="size-8 md:size-14 text-primary/60" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 col-span-2">
          <p className="text-xl font-semibold">{data.username}</p>
          <div className="hidden md:flex items-center gap-4">
            {data.username === user?.username ? (
              <Button
                className="ml-2 text-sm text-primary bg-primary/10 hover:text-white"
                onClick={() => navigate("/profile/edit")}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                {data.isFollowing ? (
                  <Button
                    onClick={unfollow}
                    className="ml-2 text-sm text-primary bg-primary/10 hover:text-white"
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    onClick={follow}
                    className="ml-2 text-sm text-primary bg-primary/10 hover:text-white"
                  >
                    Follow
                  </Button>
                )}
                <Button className="ml-2 text-sm text-primary bg-primary/10 hover:text-white">
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-5 col-start-2 col-span-2 md:col-span-2">
          <p>
            <span className="font-semibold">0</span> posts
          </p>
          <p>
            <Link to={`/profile/${data.username}/followers`}>
              <span className="font-semibold">{data.followersCount}</span>{" "}
              followers
            </Link>
          </p>
          <p>
            <Link to={`/profile/${data.username}/following`}>
              <span className="font-semibold">{data.followingCount}</span>{" "}
              following
            </Link>
          </p>
        </div>

        {data.fullName && (
          <p className="font-semibold md:col-start-2 md:col-span-2 col-span-3 mt-2 md:mt-0 px-2 md:p-0">
            {data.fullName}
          </p>
        )}
        <p className="md:max-w-[500px] md:col-start-2 md:col-span-2 col-span-3 mt-2 md:mt-0 px-2 md:p-0">
          Nit KKR'27
        </p>
        <div className="md:hidden flex items-center gap-4 col-span-3 justify-self-center mt-4 w-full">
          {data.username === user?.username ? (
            <Button
              className="text-sm text-primary bg-primary/10 hover:text-white basis-full py-4"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              {data.isFollowing ? (
                <Button
                  onClick={unfollow}
                  className="ml-2 text-sm text-primary bg-primary/10 hover:text-white basis-1/2"
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  onClick={follow}
                  className="ml-2 text-sm text-primary bg-primary/10 hover:text-white basis-1/2"
                >
                  Follow
                </Button>
              )}
              <Button className="ml-2 text-sm text-primary bg-primary/10 hover:text-white  basis-1/2">
                Message
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="w-full max-w-[900px] flex flex-col justify-center items-center gap-4">
        <div className="flex gap-10 w-full border-t-2 justify-center items-center mt-3 md:mt-6">
          <Button
            variant="ghost"
            className={cn(
              "relative rounded-none hover:bg-transparent hover:text-primary hover:before:w-full hover:before:bg-primary hover:before:h-[2px] hover:before:absolute hover:before:top-[-2px] hover:before:left-0 hover:before:transition-all hover:before:duration-300",
              activeTab === "posts" &&
                "before:w-full before:bg-primary before:h-[2px] before:absolute before:top-[-2px] before:left-0 before:transition-all before:duration-300"
            )}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "relative rounded-none hover:bg-transparent hover:text-primary hover:before:w-full hover:before:bg-primary hover:before:h-[2px] hover:before:absolute hover:before:top-[-2px] hover:before:left-0 hover:before:transition-all hover:before:duration-300",
              activeTab === "saved" &&
                "before:w-full before:bg-primary before:h-[2px] before:absolute before:top-[-2px] before:left-0 before:transition-all before:duration-300"
            )}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </Button>
        </div>
        <div className="w-full flex justify-center items-center">
          {activeTab === "posts" && (
            <div className="h-12 text-2xl font-bold flex items-center">
              No Posts Yet
            </div>
          )}
          {activeTab === "saved" && (
            <div className="h-12 text-2xl font-bold flex items-center">
              No Saved Posts
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
