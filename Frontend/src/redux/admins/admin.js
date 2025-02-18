import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/baseUrl';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/admin`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token); // Debugging
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json"); // Ensure JSON format
            console.log("Headers:", headers); // Debugging
            return headers;
        }
    }),
    endpoints: (builder) => ({
        registerAdmin: builder.mutation({
            query: (newAdmin) => ({
                url: '/register',
                method: 'POST',
                body: newAdmin,
            }),
            invalidatesTags: ['Admin'],
        }),
        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Admin'],
        }),
    }),
});

export const { useRegisterAdminMutation, useLoginAdminMutation } = adminApi;
export default adminApi;