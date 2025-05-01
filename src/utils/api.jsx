import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Export the api instance for use in other parts of the app
export default api;
