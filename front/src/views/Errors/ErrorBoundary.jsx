import { useRouteError } from "react-router";
import Error from "./Error";
import { useEffect, useState } from "react";

export default () => {
  const error = useRouteError();
  let statusCode = error?.statusCode;

  if (error?.name === "AxiosError") statusCode = error?.response?.status;

  console.log(error);
  const [errorMessage, setErrorMessage] = useState(
    "Seems like something is wrong :C"
  );

  const [redirectTo, setRedirectTo] = useState("/messages");

  useEffect(() => {
    switch (statusCode) {
      case 401:
        localStorage.removeItem("token");
        setErrorMessage(
          "Seems like your token expired. Please, sign-in to continue!"
        );
        setRedirectTo("/login");
        break;
      case 404:
        setErrorMessage("Are you lost?");
        break;
      default:
        break;
    }
  }, []);

  return (
    <Error
      statusCode={statusCode}
      message={errorMessage}
      redirectTo={redirectTo}
    />
  );
};
