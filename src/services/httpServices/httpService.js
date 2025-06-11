import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptors
http.interceptors.response.use(
  response => response,
  error => {
    console.error('HTTP Error:', error);
    return Promise.reject(error);
  }
);

export default http;
