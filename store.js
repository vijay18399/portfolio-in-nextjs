import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "@/features/page/pageSlice";
import uiReducer from "@/features/page/uiSlice";
import wordReducer from "./features/page/wordSlice";

export default configureStore({
    reducer: {
        page: pageReducer,
        ui: uiReducer,
        word:wordReducer
    },
});