import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import * as UserApi from "../api/users-api";
import { LogoutBox } from "@styled-icons/remix-line/LogoutBox";

async function logOut() {
  await UserApi.logOut();
  window.location.href = "/login";
}

const LogOutButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={logOut}>
          <>
            <LogoutBox
              size={32}
              className="rounded hover:outline hover:outline-2 hover:outline-offset-4 hover:cursor-pointer"
            />
          </>
        </TooltipTrigger>
        <TooltipContent>
          <p>Log Out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LogOutButton;
