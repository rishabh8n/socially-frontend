import { useUserStore } from "@/store/userStore";
import { Button } from "./ui/button";
import { UserIcon } from "lucide-react";
import axios from "@/axios/axios";
import { useNavigate } from "react-router";
import { QueryObserverResult } from "@tanstack/react-query";
import { useState } from "react";

const ProfileCard = ({
  userDetails,
  refetch,
}: {
  userDetails: any;
  refetch?: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(userDetails.isFollowing);
  const handleClick = async (e: any) => {
    try {
      e.stopPropagation();
      const response = await axios.post(
        `/profile/${isFollowing ? "unfollow" : "follow"}`,
        { username: userDetails.username }
      );
      if (response.status === 201) {
        setIsFollowing(!isFollowing);
        refetch && refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center space-x-3 w-full p-1"
      onClick={() => navigate(`/profile/${userDetails.username}`)}
    >
      {userDetails?.avatar ? (
        <img
          src={userDetails.avatar}
          alt="avatar"
          className="aspect-square w-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-[48px] h-[48px] aspect-square rounded-full bg-gray-200 flex items-center justify-center">
          <UserIcon className="size-8 text-primary/60" />
        </div>
      )}
      <div className="basis-full pointer-events-none">
        <p className="text-sm">{userDetails.username}</p>
        {userDetails.fullName && <p>{userDetails.fullName}</p>}
      </div>
      {user.username !== userDetails.username && (
        <Button className="py-1 w-32 px-0" onClick={handleClick}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default ProfileCard;
