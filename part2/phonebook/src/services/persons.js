import axios from "axios";

const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => {
        const { data } = response;
        return data
    })
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => {
        const { data } = response;
        return data
    })
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => {
        const { data } = response
        return data;
    })
};


const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => {
        const { data } = response;
        return data;
    })
};


export default { getAll, create, update, remove };