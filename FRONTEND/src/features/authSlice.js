import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./api";
import jwtDecode from "jwt-decode";
// const registerStatus = createAction('registerStatus')
// const registerStatus = createAction('registerStatus')

const initialState = {
    token: localStorage.getItem('token'),
    name: "",
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: "",
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
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
                    _id: user._id,
                    registerStatus: "success",
                }
            } else return state
        },
        [registerUser.rejected]: (state, action) => {
            state.registerStatus = 'rejected'
            state.registerError = action.payload
        }
    }
})

export default authSlice.reducer;