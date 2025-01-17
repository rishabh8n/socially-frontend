import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized");
      try {
        const response = await instance.post("/auth/refresh-token");
        if (response.status === 200) {
          return instance.request(error.config);
        }
      } catch (error) {}
    }
    return Promise.reject(error);
  }
);
export default instance;
