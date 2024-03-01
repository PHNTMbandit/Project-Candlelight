"use client";

import { User } from "@/models/user";

interface NavBarProps {
  user: User | null;
}

const NavBar = ({ user }: NavBarProps) => {
  console.log(user);
  return (
    <nav>
      <p>{user?.username}</p>
    </nav>
  );
};

export default NavBar;
