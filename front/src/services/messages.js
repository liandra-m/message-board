import api from "./api";

const BASE_PATH = "/messages";

const GET_MESSAGES = async () => {
  const { data } = await api.get(BASE_PATH);
  return data;
};

const CREATE_MESSAGE = async (payload) => {
  const { data } = await api.post(BASE_PATH, payload);
  return data;
};

const EDIT_MESSAGE = async (id, payload) => {
  const { data } = await api.put(`${BASE_PATH}/${id}`, payload);
  return data;
};

const DELETE_MESSAGE = async (id) => {
  const { data } = await api.delete(`${BASE_PATH}/${id}`);
  return data;
};

export { GET_MESSAGES, CREATE_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE };
