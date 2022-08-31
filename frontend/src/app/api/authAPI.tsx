import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'

interface User {
    username: string,
    name: string,
    num: number,
    length: number,
    [propName: number]: any
  }

interface Posts {
    user_email: string,
    caption: string,
    file_name: string
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: "http://192.168.0.17:8000"
    }),
    tagTypes: ["Login", "Posts"],
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => "/getuser"
        }),
        loginUser:  builder.mutation<User, any>({
            query: (body) => ({
                url: "signin",
                method: "POST",
                body
            }),
            invalidatesTags: ["Login"]
        }),
        getAllUsers: builder.query<User, void>({
            query: () => "/allusers"
        }),
        signOut: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "DELETE"
            })
        }),
        uploadFile: builder.mutation<Posts, any>({
            query: (body) => ({
                url: "/upload",
                method: "POST",
                body
            })
        }),
        getAllPosts: builder.query<Posts, void>({
            query: () => "/getAllPosts"
        }),
        getSearch: builder.mutation<User[], string>({
            query: (search) => ({
                url: `/search/?search=${search}&skip=0&limit=5`,
                method: 'GET'
            })
        })

    })
})

export const {
    useLoginUserMutation, 
    useGetCurrentUserQuery, 
    useGetAllUsersQuery,
    useSignOutMutation,
    useUploadFileMutation,
    useGetAllPostsQuery,
    useGetSearchMutation
    } = authApi




