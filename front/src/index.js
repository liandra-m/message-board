import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Login from "./views/Auth/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Messages from "./views/Messages";
import { MessageProvider } from "./contexts/messages";
import ErrorBoundary from "./views/Errors/ErrorBoundary";
import { AuthProvider } from "./contexts/auth";
import { ME } from "./services/auth";
import Register from "./views/Auth/Register";

const authHandler = async (req) => {
  const url = `/${req?.request?.url?.split("/").pop()}`;
  const user = await ME();

  if ((user && (url === "/login" || url === "/register")) || url === "/")
    return redirect("/messages");

  return null;
};

const router = createBrowserRouter([
  {
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
        element: <Messages />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <MessageProvider>
          <RouterProvider router={router} />
        </MessageProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
