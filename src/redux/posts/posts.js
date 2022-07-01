import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { removePost } from "./postsActions";
import axios from "axios";

export const fetchPosts = createAsyncThunk('posts/posts', async () => {
    const { data } = await axios.get('http://localhost:5000/posts');
    return data
});

export const fetchMyPosts = createAsyncThunk('posts/posts', async (params) => {
    const { data } = await axios.post('http://localhost:5000/my-posts', params);
    return data
});

export const fetchAddPost = createAsyncThunk('add/posts', async (params) => {
    const { data } = await axios.post('http://localhost:5000/posts/create', params);
    return data
});

const initialState = {
    data: null,
    status: 'loading',
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        deletePost: (state, action) => {
            const {data} = state;
            const normalData = current(data)
            state.data = normalData.filter((item) => item._id !== action.payload);
        }
    },
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
        [fetchMyPosts.pending]: (state, action) => {
            state.loading = 'loading';
        },
        [fetchMyPosts.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = 'loaded';
        },
        [fetchMyPosts.pending]: (state, action) => {
            state.data = null;
            state.loading = 'loaded'
        }
    }
});

export const postsReducer = postsSlice.reducer;

export const { deletePost } = postsSlice.actions