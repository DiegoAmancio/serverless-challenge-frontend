import axios from 'axios'

const baseURL = 'http://localhost:3000/dev'

export const api = axios.create({
    baseURL: baseURL
});
