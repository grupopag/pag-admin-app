// import TokenUtils from "@/utils/TokenUtils";
// import router from "@/router";

import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API,
});

// axiosApi.interceptors.request.use(
//   async (config) => {
//     const token = TokenUtils.getToken();
//     console.log(token);
//     if (token == undefined || token.length < 25) {
//       router.push("/logout");
//     }
//     config.headers.Authorization = token;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     if (error.status == 401) {
//       router.push("/unauthorized");
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosApi;
