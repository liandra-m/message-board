import { redirect } from "react-router";

import { ME } from "services/auth";

export const loader = async (req) => {
  const url = `/${req?.request?.url?.split("/").pop()}`;
  let user = null;

  if (localStorage.getItem("token")) user = await ME();

  if ((user && (url === "/login" || url === "/register")) || url === "/")
    return redirect("/messages");

  if (!user && url === "/profile") return redirect("/login");

  return null;
};
