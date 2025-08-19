import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import config from "@/config/config";


export const baseApi = createApi({
  reducerPath: "baseApi",
  // credentials : include - is like credential true ( to get data in cookie ) 
  // baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl , credentials: "include" }),
  baseQuery: axiosBaseQuery(),
  tagTypes:['USER'],
  endpoints: () => ({}),
});
