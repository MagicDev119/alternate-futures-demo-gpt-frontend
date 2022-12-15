// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

const initialUser = () => {
    const item = window.localStorage.getItem('user')
    return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: initialUser()
    },
    reducers: {
        handleLogin: (state, action) => {
            state.user = action.payload
            state['token'] = action.payload['token']

            localStorage.setItem('user', JSON.stringify(action.payload))
            localStorage.setItem('token', action.payload.token)
        },
        handleLogout: state => {
            state.user = {}
            state['token'] = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
        handleUpdateUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        }
    }
})

export const { handleLogin, handleLogout, handleUpdateUser, } = authSlice.actions

export default authSlice.reducer
