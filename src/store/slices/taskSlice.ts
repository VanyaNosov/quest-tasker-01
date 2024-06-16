import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../../types";

const initialState = {
    task: null
} as {
    task: TaskType | null
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTask: (state, action) => {
            state.task = action.payload
        }
    }
})

export const { setTask } = taskSlice.actions

export default taskSlice.reducer