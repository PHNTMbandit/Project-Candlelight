import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { User } from "@/models/user";

interface UsernameProps {
  user: User | null;
}

const Username = ({ user }: UsernameProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant={"link"}>
          <p className="p">{user?.username}</p>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user?.username}</h4>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Username;
