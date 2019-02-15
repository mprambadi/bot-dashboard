import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL
});

export default api;
export const service = {
   weaklyData: (symbol) => api.get(`/indicator/weekly?symbol=${symbol}`), 
};
