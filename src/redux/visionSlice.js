import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const visionSlice = createSlice({
    name: 'vision',
    initialState: {
        visionData: {},
        isRemix: false,
        progress: 1
    },
    reducers: {
        visionData: (state, action) => {
            state.visionData = action.payload.visionData
        },
        changeStatus: (state, action) => {
            state.visionData.processing = action.payload.visionStatus
        },
        changeRemixStatus: (state, action) => {
            state.isRemix = action.payload.isRemix
        },
        changeProgress: (state, action) => {
            state.progress = action.payload.progress
        }
    }
});

export const { visionData, changeStatus, changeRemixStatus, changeProgress } = visionSlice.actions;
export const visionInfo = (state) => state.vision.visionData;
export const isRemix = (state) => state.vision.isRemix;
export const progressTimer = (state) => state.vision.progress;
const { reducer } = visionSlice;
export default reducer;