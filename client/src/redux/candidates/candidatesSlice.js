import { createSlice } from "@reduxjs/toolkit";
import { getAllCandidates, getAllCandidatesById, createCandidate, evaluateReport } from "./candidatesOperation"; // Import the async thunk

const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {
    candidates: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCandidates.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(getAllCandidates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidates = action.payload; // Update candidates with fetched data
      })
      .addCase(getAllCandidates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllCandidatesById.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(getAllCandidatesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidates = action.payload; // Update candidates with fetched data
      })
      .addCase(getAllCandidatesById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidates.push(action.payload);
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(evaluateReport.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(evaluateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.report = action.payload; // Update candidates with fetched data
      })
      .addCase(evaluateReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});
export  { getAllCandidates, getAllCandidatesById, createCandidate, evaluateReport };
export default candidatesSlice.reducer;
