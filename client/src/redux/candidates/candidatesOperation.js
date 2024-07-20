import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RAPIDHIRE_ENDPOINT } from "../../constants";

export const getAllCandidates = createAsyncThunk(
  "getAllCandidates",
  async (email, { rejectWithValue }) => {
    // Pass sortOrder as an argument
    try {
      const response = await axios.get(
        RAPIDHIRE_ENDPOINT + `/all-candidate/${email}`
      );
      // console.log(response.data);
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCandidatesById = createAsyncThunk(
  "getAllCandidatesById",
  async (id, { rejectWithValue }) => {
    // Pass sortOrder as an argument
    try {
      const response = await axios.get(
        RAPIDHIRE_ENDPOINT + `/candidate-stage/${id}`
      );
      // console.log(response.data);
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const evaluateReport = createAsyncThunk(
  "evaluateReport",
  async (data, { rejectWithValue }) => {
    // Pass sortOrder as an argument
    try {
      const params = {
        fullName: decodeURIComponent(data.fullName),
        emailAddress: decodeURIComponent(data.email),
        phoneNumber: data.phoneNumber
      }
      const response = await axios.get(
        RAPIDHIRE_ENDPOINT + `/generatePdf?fullName=${params.fullName}&emailAddress=${params.emailAddress}&phoneNumber=${params.phoneNumber}`
      );
      return response.data; // Return the data received from the server if needed
    } catch (error) {
      // Return the error payload using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCandidate = createAsyncThunk(
  "createCandidate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        // "https://829xb1h8bj.execute-api.us-east-1.amazonaws.com/test/candidate",
        RAPIDHIRE_ENDPOINT + "/candidate",
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
