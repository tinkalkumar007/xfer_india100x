import axios from "axios";
const base_url = "https://localhost:3000/";
axios.defaults.withCredentials = true;
const apiClient = axios.create({
  baseURL: `${base_url}`,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Refresh token logic
    }
    return Promise.reject(error);
  }
);

export const setAccessToken = (token) => {
  console.log(token);
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};
export default apiClient;
