import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: "http://192.168.0.17:8000"
    }),
    tagTypes: ["Login"],
    endpoints: (builder) => ({
        getCurrentUser: builder.query<'User',void>({
            query: () => "/getuser"
        }),
        loginUser:  builder.mutation<'Login',any>({
            query: (body) => ({
                url: "signin",
                method: "POST",
                body
            }),
            invalidatesTags: ["Login"]
        }),
        getAllUsers: builder.query<'Users',any>({
            query: () => "/allusers"
        })

    })
})

export const {
    useLoginUserMutation, 
    useGetCurrentUserQuery, 
    useGetAllUsersQuery
    } = authApi




