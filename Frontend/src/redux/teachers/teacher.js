import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/baseUrl';

export const teacherApi = createApi({
    reducerPath: 'teacherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/teacher`,
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
        registerTeacher: builder.mutation({
            query: (newteacher) => ({
                url: '/register',
                method: 'POST',
                body: newteacher,
            }),
            invalidatesTags: ['Teacher'],
        }),
        loginTeacher: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Teacher'],
        }),
    }),
});

export const { useRegisterTeacherMutation, useLoginTeacherMutation } = teacherApi;
export default teacherApi;