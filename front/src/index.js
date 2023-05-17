import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Messages from "./components/Messages";
import { MessageProvider } from "./contexts/messages";

const authHandler = async () => {
  const user = true;
  if (!user) return redirect("/login");
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: authHandler,
    children: [
      {
        path: "/messages",
        element: <Messages />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </ChakraProvider>
  </React.StrictMode>
);
