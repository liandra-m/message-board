import api from "./api";

const LOGIN = async (payload) => {
  const { data } = await api.post("/login", payload);
  return data;
};

const ME = async () => {
  const { data } = await api.post("/me");
  return data;
};

export { LOGIN, ME };
