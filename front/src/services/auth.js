import api from "./api";

const REGISTER = async (payload) => {
  const { data } = await api.post("/register", payload);
  return data;
};

const LOGIN = async (payload) => {
  const { data } = await api.post("/login", payload);
  return data;
};

const ME = async () => {
  const { data } = await api.post("/me");
  return data;
};

export { REGISTER, LOGIN, ME };
