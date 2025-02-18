import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/baseUrl';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/users`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token); // Debugging
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            console.log('Headers:', headers); // Debugging
            return headers;
            }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => {
                console.log('Fetching users from:', `${getBaseUrl()}/users`);
                return '/';
            },
            tagTypes: ['Users'],
            providesTags: ["Users"]
        }),
        getUserById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Users", id }]
        }),
    }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
export default usersApi;