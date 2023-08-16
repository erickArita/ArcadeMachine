import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from 'store'
import { ErrorLoggerMiddleware } from './errorMiddleware'

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware,
      ErrorLoggerMiddleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
