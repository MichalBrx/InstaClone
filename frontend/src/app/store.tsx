import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authAPI'
import {setupListeners} from '@reduxjs/toolkit/query/react'




export const store:any = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware)
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch)