import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import {
  CirclePlusIcon,
  HomeIcon,
  SearchIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";
const BottomNavigation = () => {
  const pathname = useLocation().pathname.split("/")[1];
  const { user } = useUserStore();
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 h-24 grid grid-rows-[1fr,2.5fr,.5fr] grid-cols-5 place-items-center">
      <div className="h-full bg-white row-start-2 row-span-2 col-start-1 col-span-5 rounded-t-2xl w-full shadow-[0_-1px_5px_0px_#0005]"></div>
      <div className="h-full row-start-2 col-start-1 flex items-center justify-center">
        <Link
          to="/"
          className={cn(
            "p-3 hover:text-accent",
            pathname === "" && "text-accent"
          )}
        >
          <HomeIcon size={28} />
        </Link>
      </div>
      <div className="h-full  row-start-2 col-start-2 flex items-center justify-center">
        <Link
          to="/search"
          className={cn(
            "p-3 hover:text-accent",
            pathname === "search" && "text-accent"
          )}
        >
          <SearchIcon size={28} />
        </Link>
      </div>
      <div className="h-full row-start-1 row-span-2 col-start-3 flex items-center justify-center">
        <Link
          to="/create-post"
          className="bg-black aspect-square w-14 h-14 rounded-[20px] rotate-45 flex items-center justify-center shadow-sm shadow-gray-800"
        >
          <CirclePlusIcon size={28} className="text-white -rotate-45" />
        </Link>
      </div>
      <div className="h-full  row-start-2 col-start-4 flex items-center justify-center">
        <Link
          to="/messages"
          className={cn(
            "p-3 hover:text-accent",
            pathname === "messages" && "text-accent"
          )}
        >
          <SendIcon size={28} />
        </Link>
      </div>
      <div className="h-full row-start-2 col-start-5 flex items-center justify-center">
        <Link
          to={`/profile/${user?.username ? user.username : ""}`}
          className={cn(
            "p-3 hover:text-accent",
            pathname === "profile" && "text-accent"
          )}
        >
          <UserIcon size={28} />
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
