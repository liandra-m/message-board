import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    authorization: "Bearer " + window.localStorage.getItem("token") || null,
  },
});

api.interceptors.request.use(
  function (request) {
    request.headers.authorization =
      "Bearer " + window.localStorage.getItem("token") || null;
    return request;
  },
  function (error) {
    console.log(error);
  }
);

export default api;
