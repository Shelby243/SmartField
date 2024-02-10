import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://smart-agriculture-api.onrender.com", // Update the IP and port
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default apiClient;
