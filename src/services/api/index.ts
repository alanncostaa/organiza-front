import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'https://organiza-back.vercel.app/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

