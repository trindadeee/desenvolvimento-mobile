import axios from "axios";

const instance = axios.create({
   baseURL: "http://192.168.0.16:3000",
   timeout: 30000,
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
   },
   maxRedirects: 0,
});

export default instance