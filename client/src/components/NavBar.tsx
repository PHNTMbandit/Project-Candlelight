"use client";

import { useUserContext } from "@/contexts/UserContextProvider";

const NavBar = () => {
  const { user } = useUserContext();

  return <nav>{user?.username}</nav>;
};

export default NavBar;
