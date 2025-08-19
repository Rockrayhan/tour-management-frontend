import { baseApi } from "@/redux/baseApi";
import type { IOtpVerify, IResponse, ISendOtp } from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        //  use body : userInfo if use fetchBaseQuery()
        // body: userInfo,
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        // body: userInfo,
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags:["USER"]
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        // body: userInfo,
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IOtpVerify>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
