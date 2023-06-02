import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as mainAsyncActions from '../actions/mainActions'
export interface MainState {
    accessToken: string,
    isAuth: boolean,
    email: string,
    name: string,
    userId: number | null
}

const initialState: MainState = {
    accessToken: '',
    isAuth: true,
    email: '',
    name: '',
    userId: null
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder: any) => {
        mainAsyncActions.fetchLoginHandler(builder)
        mainAsyncActions.fetchRegisterHandler(builder)
        mainAsyncActions.fetchCheckAuthHandler(builder)
    }
})

// Action creators are generated for each case reducer function
export const mainActions = {
    ...mainSlice.actions,
    ...mainAsyncActions
}

export default mainSlice.reducer