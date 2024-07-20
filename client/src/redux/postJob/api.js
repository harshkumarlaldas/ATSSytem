import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RAPIDHIRE_ENDPOINT } from "../../constants";

export const getAllPost = createAsyncThunk(
  "getAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        RAPIDHIRE_ENDPOINT + "/all-post"
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
