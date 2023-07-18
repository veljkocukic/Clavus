import axios from "axios";
import getCookies from "./cookies/getCookies";



const customFetch = axios.create({
    baseURL: "http://localhost:3333/",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  customFetch.interceptors.request.use(
    async(config:any) => {

      const user = await getCookies('usrin')


    if (user) {
        config.headers.common["Authorization"] = `Bearer ${user}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default customFetch