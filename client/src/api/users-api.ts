import { User } from "../models/user";
import { fetchData } from "./api";

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LogInCredentials {
  username: string;
  password: string;
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", {
    method: "GET",
  });

  return response.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function logIn(credentials: LogInCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  console.log(response.status);
  return response.json();
}

export async function logOut() {
  await fetchData("/api/users/logout", {
    method: "POST",
  });
}
