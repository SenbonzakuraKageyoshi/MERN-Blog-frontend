import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk('fetch/posts', async () => {
    const { data } = await axios.get('http://localhost:5000/posts');
    return data
});

const initialState = {
    data: null,
    status: 'loading',
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.loading = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = 'loaded';
        },
        [fetchPosts.pending]: (state, action) => {
            state.data = null;
            state.loading = 'loaded'
        },
    }
});

export const postsReducer = postsSlice.reducer;

export const { } = postsSlice.actions