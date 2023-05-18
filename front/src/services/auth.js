import api from "./api";

const LOGIN = async (payload) => {
  const { data } = await api.post("/login", payload);
  return data;
};

export { LOGIN };
