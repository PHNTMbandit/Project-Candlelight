import * as UserApi from "../api/users-api";
import { LogoutBox } from "@styled-icons/remix-line/LogoutBox";

async function logOut() {
  await UserApi.logOut();
  window.location.href = "/login";
}

const LogOutButton = () => {
  return (
    <button onClick={logOut}>
      <LogoutBox
        size={32}
        className="rounded hover:outline hover:outline-2 hover:outline-offset-4 hover:cursor-pointer"
      />
    </button>
  );
};

export default LogOutButton;
