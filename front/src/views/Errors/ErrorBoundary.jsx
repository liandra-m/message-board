import { useRouteError } from "react-router";
import Error from "./ErrorScreen/Error";
import { useEffect, useState } from "react";

export default () => {
  const error = useRouteError();
  const [errorMessage, setErrorMessage] = useState(
    "Seems like something is wrong :C"
  );

  useEffect(() => {
    switch (error?.status) {
      case 404:
        setErrorMessage("Are you lost?");
        break;
      default:
        break;
    }
  }, []);

  return <Error statusCode={error?.status} message={errorMessage} />;
};
