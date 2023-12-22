import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../Base_url';
import { getToken, setToken } from './Constants';
export const userSlices = createApi({
    reducerPath: 'userSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders : (headers) => {
            const token = getToken();
            if(token) {
                headers.set('Authorization',token);
            }
            return headers;
        }
    }),
    tagTypes: ['users'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/user/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['users']
        }),
        loginUser: builder.mutation({
            query: (loginUser) => ({
                url: '/user/login',
                method: 'POST',
                body: loginUser
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    const token = await queryFulfilled;
                    if (token) {
                        setToken(token?.data?.userToken);
                        console.log(token.data);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
            ,
            invalidatesTags: ['users']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['users']
        }),
        updateUser: builder.mutation({
            query: ({ id, updateUser }) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body: updateUser
            }),
            invalidatesTags: ['users']
        }),
        getUser: builder.query({
            query: () => {
                return {
                    url: '/user/current',
                    method: 'GET',
                }
            },
            providesTags: ['users']
        })

    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserQuery
} = userSlices;