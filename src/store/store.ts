import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import modalSlice from './slices/modalSlice'
import { getItems } from './services/getItems'
import { setupListeners } from '@reduxjs/toolkit/query'
import noticeSlice from './slices/noticeSlice'
import taskSlice from './slices/taskSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    notice: noticeSlice,
    task: taskSlice,
    [getItems.reducerPath]: getItems.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getItems.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)