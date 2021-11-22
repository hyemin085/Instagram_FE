import {addPost, getPost} from "./post";
import {createSlice} from "@reduxjs/toolkit";




const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
  },
  reducers: {
    loginCheck: (state, {payload: isLogin}) => {
      state.isLogin = true;
    },
  },
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    }
  },
});


export default postSlice;