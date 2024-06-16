import { createSlice } from "@reduxjs/toolkit";
import { Notice } from "../../../types";

const initialState = {
    notice: null
} as {
    notice: Notice | null
}

const noticeSlice = createSlice({
    name: "notice",
    initialState,
    reducers: {
        setNotice: (state, action) => {
            state.notice = action.payload
        }
    }
})

export const { setNotice } = noticeSlice.actions

export default noticeSlice.reducer