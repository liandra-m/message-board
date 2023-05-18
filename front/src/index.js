import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./views/Auth/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Messages from "./views/Messages";
import { MessageProvider } from "./contexts/messages";
import ErrorBoundary from "./views/Errors/ErrorBoundary";
import { AuthProvider } from "./contexts/auth";

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
    errorElement: <ErrorBoundary />,
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
      <AuthProvider>
        <MessageProvider>
          <RouterProvider router={router} />
        </MessageProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
