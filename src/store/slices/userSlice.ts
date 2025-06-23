// store/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: string
  name: string
  email: string
  isLoggedIn: boolean
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) {
      return {
        ...action.payload,
        isLoggedIn: true,
      }
    },
    logoutUser(state: UserState) {
      return initialState
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer
