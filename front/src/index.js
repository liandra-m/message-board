import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Register from "views/Auth/Register";
import Login from "views/Auth/Login";
import Messages from "views/Messages";
import ErrorBoundary from "views/Errors/ErrorBoundary";

import { ChakraProvider } from "@chakra-ui/react";

import { MessageProvider } from "hooks/messages";
import { AuthProvider } from "hooks/auth";
import { ME } from "services/auth";

const authHandler = async (req) => {
  const url = `/${req?.request?.url?.split("/").pop()}`;
  const user = await ME();

  if ((user && (url === "/login" || url === "/register")) || url === "/")
    return redirect("/messages");

  return null;
};

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader: authHandler,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/messages",
        element: (
          <MessageProvider>
            <Messages />
          </MessageProvider>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
