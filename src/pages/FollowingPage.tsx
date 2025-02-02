import { useQuery } from "@tanstack/react-query";
import axios from "@/axios/axios";
import { Navigate, useParams } from "react-router";
import ProfileCard from "@/components/ProfileCard";

const FollowingPage = () => {
  const { username } = useParams();
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["following", username],
    queryFn: async () => {
      try {
        const response = await axios.get(`/profile/${username}/following`);
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
      <p className="text-2xl p-2 md:mt-8 font-bold">Following</p>
      {isPending && <p>Loading...</p>}
      {data?.length === 0 && (
        <p className="text-2xl p-2 font-semibold mt-4">Not following anyone</p>
      )}
      {data &&
        data.map((follower: any) => {
          return (
            <ProfileCard
              key={follower.followingId}
              userDetails={follower}
              refetch={refetch}
            />
          );
        })}
    </div>
  );
};

export default FollowingPage;
