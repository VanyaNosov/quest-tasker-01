import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types"
import { signIn, signUp } from "../../helpers/auth";

const initialState = {
    user: localStorage.getItem("userProfile") ?
        JSON.parse(localStorage.getItem("userProfile")!)
        : null,
} as {
    user: User | null,
}

const authSlice = createSlice({
    name: "authSlie",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
            localStorage.removeItem("userProfile")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload
            action.payload?.message
                ? ""
                : localStorage.setItem("userProfile", JSON.stringify(action.payload))
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload
            action.payload?.message
                ? ""
                : localStorage.setItem("userProfile", JSON.stringify(action.payload))
        })
    },
})

export const { logOut } = authSlice.actions

export default authSlice.reducer