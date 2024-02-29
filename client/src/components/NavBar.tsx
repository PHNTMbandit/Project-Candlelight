import { useEffect, useState } from "react";
import { User } from "../models/user";
import * as UserApi from "../api/users-api";

const NavBar = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UserApi.getLoggedInUser();
        console.log(user);
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  });

  return (
    <nav>
      <p>{loggedInUser?.username}</p>
    </nav>
  );
};

export default NavBar;
