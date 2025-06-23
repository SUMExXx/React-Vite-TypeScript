import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/store/slices/userSlice' // Example reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // Add your reducers here
  },
})

// Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

 