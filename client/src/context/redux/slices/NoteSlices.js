import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../Base_url';
import { getToken } from './Constants';
export const noteSlices = createApi({
    reducerPath: 'noteSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders : (headers) => {
            const token = getToken();
            if(token) {
                headers.set('Authorization',token)
            }
            return headers;
        }
    }),
    tagTypes: ['notes'],
    endpoints: (builder) => ({
        createNote: builder.mutation({
            query: (newNote) => ({
                url: '/note',
                method: 'POST',
                body: newNote
            }),
            invalidatesTags: ['notes']
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/note/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['notes']
        }),
        updateNote: builder.mutation({
            query: ({ id, updateNote }) => ({
                url: `/note/${id}`,
                method: 'PUT',
                body: updateNote
            }),
            invalidatesTags: ['notes']
        }),
        getNotes: builder.query({
            query: () => {
                return {
                    url: '/notes',
                    method: 'GET',
                }
            },
            providesTags: ['notes']
        }),
        getPendingNotes: builder.query({
            query: () => {
                return {
                    url: '/notes/pending',
                    method: 'GET',
                }
            },
            providesTags: ['notes']
        }),
        getCompletedNotes: builder.query({
            query: () => {
                return {
                    url: '/notes/completed',
                    method: 'GET',
                }
            },
            providesTags: ['notes']
        })

    })
})

export const {
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
    useGetNotesQuery,
    useGetCompletedNotesQuery,
    useGetPendingNotesQuery
} = noteSlices;