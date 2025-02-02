import { useQuery } from "@tanstack/react-query";
import axios from "@/axios/axios";
import { Navigate, useParams } from "react-router";
import ProfileCard from "@/components/ProfileCard";

const FollowersPage = () => {
  const { username } = useParams();
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["followers", username],
    queryFn: async () => {
      try {
        const response = await axios.get(`/profile/${username}/followers`);
        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    retry: false,
  });
  if (error) {
    return <Navigate to="/404" />;
  }
  return (
    <div className="p-2 flex flex-col gap-3 max-w-[500px] w-full mx-auto">
      <p className="text-2xl font-bold p-2 md:mt-8">All Followers</p>
      {isPending && <p>Loading...</p>}
      {data?.length === 0 && (
        <p className="text-2xl font-semibold p-2 mt-4">No followers</p>
      )}
      {data &&
        data.map((follower: any) => {
          return (
            <ProfileCard
              key={follower.followerId}
              userDetails={follower}
              refetch={refetch}
            />
          );
        })}
    </div>
  );
};

export default FollowersPage;
