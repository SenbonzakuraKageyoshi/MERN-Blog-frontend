import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRegister = createAsyncThunk('auth/Register', async (params) => {
    const { data } = await axios.post('http://localhost:5000/auth/register', params)
    return data;
});

export const fetchLogin = createAsyncThunk('auth/Login', async (params) => {
    const { data } = await axios.post('http://localhost:5000/auth/login', params)
    return data;
});

export const fetchMe = createAsyncThunk('auth/Me', async () => {       
    const token = localStorage.getItem('token');
    const { data } = await axios.post('http://localhost:5000/auth/me', {token})
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRegister.pending]: (state) => {
            state.data = null;
            state.loading = 'loading'
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = 'loaded'
        },
        [fetchRegister.rejected]: (state) => {
            state.data = null;
            state.loading = 'loaded'
        },
        [fetchLogin.pending]: (state) => {
            state.data = null;
            state.loading = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.data = null;
            state.loading = 'loaded'
        },
        [fetchMe.pending]: (state) => {
            state.data = null;
            state.loading = 'loading'
        },
        [fetchMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = 'loaded'
        },
        [fetchMe.rejected]: (state) => {
            state.data = null;
            state.loading = 'loaded'
        },
    }
});

export const authReducer = authSlice.reducer;

export const { } = authSlice.actions