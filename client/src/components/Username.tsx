import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  );
};

export default Username;
