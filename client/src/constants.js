const BASE_URL = import.meta.env.VITE_LOCAL_HOST || 'https://manjares-server.vercel.app';
const HOST = `${BASE_URL}/api`;

console.log('Environment:', import.meta.env.MODE);
console.log('VITE_LOCAL_HOST:', import.meta.env.VITE_LOCAL_HOST);
console.log('API HOST:', HOST);

export default {
  HOST,
};