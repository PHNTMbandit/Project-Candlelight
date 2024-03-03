import { useEffect } from "react";
import * as UserApi from "../api/users-api";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Separator } from "./ui/separator";
import LogOutButton from "./LogOutButton";
import Username from "./Username";
import HorizontalLogo from "./HorizontalLogo";

const NavBar = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UserApi.getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, [setUser]);

  return (
    <nav>
      <div className="flex justify-between items-center p-2 pb-2 pl-2 pr-5 h-16">
        <HorizontalLogo />
        <div className="flex gap-3">
          <Username user={user} />
          <LogOutButton />
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default NavBar;
