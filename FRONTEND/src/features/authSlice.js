import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./api";
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem('token'),
    name: "",
    email: "",
    id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: null,
}


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }, { rejectWithValue }) => {
        console.log(name, email, password)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const token = await axios.post(`${baseUrl}/api/register`,
                { name, email, password },
                config,
            )

            localStorage.setItem('token', token.data)
            return token.data
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.data)
            }
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const token = await axios.post(`${baseUrl}/api/login`,
                { email, password },
                config,
            )

            localStorage.setItem('token', token.data)
            return token.data
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.data)
            }
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token;

            if(token) {
                const user = jwtDecode(token);

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    userLoaded: true,
                }
            }
        },
        logOut(state, action) {
            return {
               ...state,
               token: "",
               name: "",
               email: "",
               id: "",
               userLoaded: false,
            }
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.registerStatus = 'pending'
        },
        [registerUser.fulfilled]: (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);

                return {
                    ...state,
                    token: user.token,
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    registerStatus: "success",
                }
            } else return state
        },
        [registerUser.rejected]: (state, action) => {
            state.registerStatus = 'rejected'
            state.registerError = action.payload
        },

        [loginUser.pending]: (state) => {
            state.loginStatus = 'pending'
        },
        [registerUser.fulfilled]: (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);

                return {
                    ...state,
                    token: user.token,
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    loginStatus: "success",
                    userLoaded: true
                }
            } else return state
        },
        [registerUser.rejected]: (state, action) => {
            state.loginStatus = 'rejected'
            state.loginError = action.payload
        }
    }
})

export const { loadUser, logOut } = authSlice.actions;
export default authSlice.reducer;