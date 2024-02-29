"use client";

import { useLoggedInUserContext } from "@/contexts/LoggedInUserContextProvider";

const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();

  return (
    <nav>
      <p>{loggedInUser?.username}</p>
    </nav>
  );
};

export default NavBar;
