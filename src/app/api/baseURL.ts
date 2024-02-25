import axios from 'axios'

const baseURL = '<backendUrl>'

export const api = axios.create({
    baseURL: baseURL
});
