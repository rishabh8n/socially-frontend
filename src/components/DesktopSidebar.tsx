import {
  BellIcon,
  CirclePlusIcon,
  HomeIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "search",
    label: "Search",
    icon: SearchIcon,
  },
  {
    href: "messages",
    label: "Messages",
    icon: SendIcon,
  },
  {
    href: "notifications",
    label: "Notifications",
    icon: BellIcon,
  },
  {
    href: "create-post",
    label: "Create Post",
    icon: CirclePlusIcon,
  },
  {
    href: "profile",
    label: "Profile",
    icon: UserIcon,
  },
];

const DesktopSidebar = () => {
  const pathname = useLocation().pathname.split("/")[1];
  const { user } = useUserStore();
  return (
    <div className="hidden relative md:flex flex-col min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 text-muted-foreground border-r-2 border-separate p-4">
      <div className="flex items-center gap-2 mt-1">
        <Logo />
      </div>
      <div className="flex flex-col gap-4 mt-8 flex-grow basis-full">
        {routes.map((route, index) => (
          <Link
            to={
              route.href === "profile"
                ? `/${route.href}/${user?.username}`
                : `/${route.href}`
            }
            className={cn(
              "flex items-center gap-3 hover:bg-accent/10 p-2 rounded-md font-semibold",
              pathname === route.href && "font-bold text-accent"
            )}
            key={index}
          >
            <route.icon
              size={25}
              className={cn(
                pathname === route.href && "font-bold text-accent stroke-[3px]"
              )}
            />
            {route.label}
          </Link>
        ))}
      </div>

      <div className="border-t-2 py-4 border-separate">
        <button className="flex items-center gap-3 hover:bg-accent/10 p-2 rounded-md font-semibold w-full">
          <SettingsIcon size={25} />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
