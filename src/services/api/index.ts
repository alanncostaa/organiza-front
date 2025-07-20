import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

