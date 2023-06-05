import { redirect } from "react-router";

import { ME } from "services/auth";

export const loader = async (req) => {
  const url = `/${req?.request?.url?.split("/").pop()}`;
  const user = await ME();

  if ((user && (url === "/login" || url === "/register")) || url === "/")
    return redirect("/messages");

  return null;
};
