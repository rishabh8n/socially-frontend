import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface LogoProps {
  fontSize?: string;
  iconSize?: number;
}

const Logo = ({ fontSize = "text-2xl" }: LogoProps) => {
  return (
    <Link
      to="/"
      className={cn("font-extrabold flex items-center gap-2", fontSize)}
    >
      <span className="text-accent">
        Social<span className="text-primary/60">ly</span>
      </span>
    </Link>
  );
};

export default Logo;
