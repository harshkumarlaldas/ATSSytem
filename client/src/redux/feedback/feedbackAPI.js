import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RAPIDHIRE_ENDPOINT } from "../../constants.js";

export const createFeedback = createAsyncThunk(
  "createFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        RAPIDHIRE_ENDPOINT + `/feedback`,
        data
      );
      console.log(response.data);
      if (response.data) {
        toast.success("Feedback added successfully");
      }
      return response.data;
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedback = createAsyncThunk(
  "getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "RAPIDHIRE_ENDPOINT + `/all-feedbacks"
      );

      console.log(response.data);
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);
