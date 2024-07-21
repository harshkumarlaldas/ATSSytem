import { configureStore } from "@reduxjs/toolkit";

import jobReducer from "./jobSlice.js";
import postReducer from "./postJob/postSlice.js";
import applicationsReducer from "./application/applicationsSlice.js";
import candidatesReducer from "./candidates/candidatesSlice.js";
import stageReducer from "./stage/stageSlice.js";
import feedbacksReducer from "./feedback/feedbacksSlice.js";

const store = configureStore({
  reducer: {
    counter: jobReducer,
    posts: postReducer,
    application: applicationsReducer,
    candidates: candidatesReducer,
    stage: stageReducer,
    feedbacks: feedbacksReducer,
  },
});
export default store;
