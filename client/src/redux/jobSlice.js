import { createSlice } from "@reduxjs/toolkit";

import { createUser, getUsers,createJobPost, deleteAllJobs} from "./operations.js";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =  action.error.message;
      })
      .addCase(createJobPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.jobs.push(action.payload);
      })
      .addCase(deleteAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
     
  },
});


export  { createUser, getUsers,createJobPost, deleteAllJobs };
export default jobSlice.reducer;
