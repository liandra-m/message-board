import api from "./api";

const BASE_PATH = "/messages";

const GET_MESSAGES = async (filters) => {
  const { data } = await api.get(BASE_PATH, {
    params: filters,
  });
  return data;
};

const GET_LIKED_MESSAGES = async () => {
  const { data } = await api.get(BASE_PATH + "/likedMessages");
  return data;
};

const CREATE_MESSAGE = async (payload) => {
  console.log(payload);
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

const LIKE_MESSAGE = async (id) => {
  const { data } = await api.post(`${BASE_PATH}/like/${id}`);
  return data;
};

export {
  GET_MESSAGES,
  GET_LIKED_MESSAGES,
  CREATE_MESSAGE,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
  LIKE_MESSAGE,
};
