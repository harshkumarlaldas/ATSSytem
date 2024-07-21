import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RAPIDHIRE_ENDPOINT } from "../../constants.js";

export const createApplicationPost = createAsyncThunk(
  "createApplicationPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        RAPIDHIRE_ENDPOINT + "/application-post",
        data
      );
      // console.log(response.data);
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

// get all application
export const getAllApplications = createAsyncThunk(
  "getAllApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        RAPIDHIRE_ENDPOINT + "/all-applications"
      );
      console.log(response.data);
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);
