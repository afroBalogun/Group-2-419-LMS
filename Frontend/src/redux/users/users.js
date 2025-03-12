import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseUrl";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/users`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token); // Debugging
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            console.log("Headers:", headers); // Debugging
            return headers;
        },
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => {
                console.log(`Fetching users from: ${getBaseUrl()}/users`);
                return "/";
            },
            providesTags: ["Users"],
        }),
        getUserById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Users", id }],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: "/create-user",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/update-user/${id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/delete-user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }), 
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;

export default usersApi;
