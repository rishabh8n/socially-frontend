import { useUserStore } from "@/store/userStore";
import { Button } from "./ui/button";
import { UserIcon } from "lucide-react";
import axios from "@/axios/axios";
import { useNavigate } from "react-router";
import { QueryObserverResult } from "@tanstack/react-query";

const ProfileCard = ({
  follower,
  refetch,
}: {
  follower: any;
  refetch: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const handleClick = async (e: any) => {
    try {
      e.stopPropagation();
      const response = await axios.post(
        `/profile/${follower.isFollowing ? "unfollow" : "follow"}`,
        { username: follower.username }
      );
      if (response.status === 201) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center space-x-3 w-full p-1"
      onClick={() => navigate(`/profile/${follower.username}`)}
    >
      {follower?.avatar ? (
        <img
          src={follower.avatar}
          alt="avatar"
          className="aspect-square w-12 rounded-full"
        />
      ) : (
        <div className="w-[48px] h-[48px] aspect-square rounded-full bg-gray-200 flex items-center justify-center">
          <UserIcon className="size-8 text-primary/60" />
        </div>
      )}
      <div className="basis-full pointer-events-none">
        <p className="text-sm">{follower.username}</p>
        {follower.fullName && <p>{follower.fullName}</p>}
      </div>
      {user.username !== follower.username && (
        <Button className="py-1 px-4" onClick={handleClick}>
          {follower.isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default ProfileCard;
