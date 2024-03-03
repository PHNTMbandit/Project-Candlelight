import * as UserApi from "../api/users-api";
import { LogOut } from "styled-icons/boxicons-regular";

async function logOut() {
  await UserApi.logOut();
  window.location.href = "/login";
}

const LogOutButton = () => {
  return (
    <button onClick={logOut}>
      <LogOut
        size={23}
        className="rounded hover:outline hover:outline-2 hover:outline-offset-4 hover:cursor-pointer"
      />
    </button>
  );
};

export default LogOutButton;
