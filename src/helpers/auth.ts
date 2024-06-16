import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreatedUser, LoginUser } from "../../types";
import axios from "axios"
import { serverUrl } from "./constants";

export const signUp = createAsyncThunk("signUp", async (user: CreatedUser) => {
    try {
        const { data } = await axios.post(`${serverUrl}/api/users/signup`, user)
        
        return data
    } catch (err) {
        return err
    }
})

export const signIn = createAsyncThunk("signIn", async (user: LoginUser) => {
    try {
        const { data } = await axios.post(`${serverUrl}/api/users/signin`, user)
        
        return data
    } catch (err) {
        return err
    }
})
