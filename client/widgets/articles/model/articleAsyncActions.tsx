import { api } from "@/shared/utils/api";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleState } from "./articleReducer";

export const fetchArticles = createAsyncThunk('main/fetchArticles', async () => {
    const res = await api.get('/article/all')
    if (res.status >= 400)
        return {
            status: res.status
        };

    return res.data

})


export const fetchArticlesHandler = (builder: any) => {
    builder.addCase(fetchArticles.pending, (state: ArticleState, action: PayloadAction<any>) => {
    })
    builder.addCase(fetchArticles.fulfilled, (state: ArticleState, action: PayloadAction<any>) => {
        if (action.payload?.status >= 400) {
            state.articles = []
        } else {
            state.articles = action.payload

        }
    })
}

export const fetchUserArticles = createAsyncThunk('main/fetchUserArticles', async (userId: number) => {
    const res = await api.get('/article/user/' + userId)
    if (res.status >= 400)
        return {
            status: res.status
        };

    return res.data

})


export const fetchUserArticlesHandler = (builder: any) => {
    builder.addCase(fetchUserArticles.pending, (state: ArticleState, action: PayloadAction<any>) => {
    })
    builder.addCase(fetchUserArticles.fulfilled, (state: ArticleState, action: PayloadAction<any>) => {
        if (action.payload?.status >= 400) {
            state.articles = []
        } else {
            state.articles = action.payload

        }
    })
}
