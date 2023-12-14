import axios from "axios";

const instance = axios.create({
   baseURL: "http://26.142.65.14:3000",
   timeout: 30000,
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
   },
   maxRedirects: 0,
});

export default instance