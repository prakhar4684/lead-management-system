import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://lead-management-system-va9u.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use((config) => {
  console.log("Request Data:", config.data);
  console.log("Type:", typeof config.data);

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default apiClient;