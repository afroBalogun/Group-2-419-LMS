import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/baseUrl';

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/student`,
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
        registerStudent: builder.mutation({
            query: (newStudent) => ({
                url: '/register',
                method: 'POST',
                body: newStudent,
            }),
            invalidatesTags: ['Student'],
        }),
        loginStudent: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Student'],
        }),
    }),
});

export const { useRegisterStudentMutation, useLoginStudentMutation } = studentApi;
export default studentApi;