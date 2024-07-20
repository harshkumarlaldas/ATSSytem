import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RAPIDHIRE_ENDPOINT } from "../constants";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    // const email = data.email;
    try {
      const response = await axios.post(
        RAPIDHIRE_ENDPOINT+ '/user',
        data
      );
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        RAPIDHIRE_ENDPOINT + `/users`
      );
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

// post a job

export const createJobPost = createAsyncThunk(
  "createJobPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        RAPIDHIRE_ENDPOINT + "/job_post",
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

export const deleteAllJobs = createAsyncThunk(
  "deleteAllJobs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        RAPIDHIRE_ENDPOINT + "/delete-jobCollection"
      );
      return response; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);
