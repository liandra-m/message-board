import api from './api';

const GET_MESSAGES = async () => {
    const { data } = await api.get('/');
    return data;
}

const CREATE_MESSAGE = async (payload) => {
    const { data } = await api.post('/', payload);
    return data;
}

const EDIT_MESSAGE = async (id, payload) => {
    const { data } = await api.put(`/${id}`, payload);
    return data;
}

const DELETE_MESSAGE = async (id) => {
    const { data } = await api.delete(`/${id}`);
    return data;
}

export {
    GET_MESSAGES,
    CREATE_MESSAGE,
    EDIT_MESSAGE,
    DELETE_MESSAGE
}