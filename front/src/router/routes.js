import Register from "views/Auth/Register";
import Login from "views/Auth/Login";
import Messages from "views/Messages";
import ErrorBoundary from "views/Errors/ErrorBoundary";

import { MessageProvider } from "hooks/messages";

import { loader } from "./loader";

export const routes = [
  {
    id: "root",
    path: "/",
    loader: loader,
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
];
