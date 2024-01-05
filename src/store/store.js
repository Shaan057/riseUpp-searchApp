import { configureStore } from "@reduxjs/toolkit";
import pictureReducer from '../features/picturesSlice'

export const store = configureStore({
    reducer: pictureReducer
})

