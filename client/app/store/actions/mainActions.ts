import { api } from "@/shared/utils/api";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { MainState } from "../redusers/mainReduser";
import Cookies from "cookies-ts";
const cookies = new Cookies()

export const fetchLogin = createAsyncThunk('main/fetchLogin', async (data: {
    email: string
    password: string
}) => {
    const res = await api.post('/user/login', data)
    if (res.status >= 400)
        return {
            status: res.status
        };

    return res.data

})


export const fetchLoginHandler = (builder: any) => {
    builder.addCase(fetchLogin.pending, (state: MainState, action: PayloadAction<any>) => {
    })
    builder.addCase(fetchLogin.fulfilled, (state: MainState, action: PayloadAction<any>) => {
        if (action.payload?.status >= 400) {
        } else {
            console.log(action.payload)
            state.accessToken = action.payload.token
            state.isAuth = true
            cookies.set('access_token', action.payload.token)
            const parts = action.payload.token.split('.');
            const payload = parts[1];
            const decodedPayload = JSON.parse(atob(payload));

            state.email = decodedPayload.email
            state.name = decodedPayload.name
            state.userId = decodedPayload.id

        }

    })
}


export const fetchRegister = createAsyncThunk('main/fetchRegister', async (data: {
    email: string
    password: string,
    name: string
}) => {
    const res = await api.post('/user/register', data)
    if (res.status >= 400)
        return {
            status: res.status
        };

    return res.data

})


export const fetchRegisterHandler = (builder: any) => {
    builder.addCase(fetchRegister.pending, (state: MainState, action: PayloadAction<any>) => {
    })
    builder.addCase(fetchRegister.fulfilled, (state: MainState, action: PayloadAction<any>) => {
        if (action.payload?.status >= 400) {
        } else {
            console.log(action.payload)
            state.accessToken = action.payload.token
            state.isAuth = true
            cookies.set('access_token', action.payload.token)
            const parts = action.payload.token.split('.');
            const payload = parts[1];
            const decodedPayload = JSON.parse(atob(payload));

            state.email = decodedPayload.email
            state.name = decodedPayload.name
            state.userId = decodedPayload.id

        }

    })
}




export const fetchCheckAuth = createAsyncThunk('main/fetchCheckAuth', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/user/check')
        console.log(res)
        if (res.status >= 400)
            return {
                status: res.status
            };

        return res.data
    } catch (error) {
        rejectWithValue(error)
    }

})


export const fetchCheckAuthHandler = (builder: any) => {
    builder.addCase(fetchCheckAuth.pending, (state: MainState, action: PayloadAction<any>) => {
    })
    builder.addCase(fetchCheckAuth.fulfilled, (state: MainState, action: PayloadAction<any>) => {
        console.log(action.payload)
        if (action.payload?.status >= 400 || action.payload === undefined) {

            state.isAuth = false
            state.email = ''
            state.name = ''
            state.userId = null
        } else {
            state.accessToken = action.payload?.token
            state.isAuth = true
            cookies.set('access_token', action.payload?.token)
            const parts: any = action.payload?.token.split('.');
            const payload = parts[1];
            const decodedPayload = JSON.parse(atob(payload));

            state.email = decodedPayload.email
            state.name = decodedPayload.name
            state.userId = decodedPayload.id

        }

    })
}
