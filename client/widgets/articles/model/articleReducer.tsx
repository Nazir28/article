import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as articleAsyncActions from './articleAsyncActions'
import { IArticle } from '../interfaces'
export interface ArticleState {
    articles: IArticle[]
}

const initialState: ArticleState = {
    articles: []
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {

    },
    extraReducers: (builder: any) => {
        articleAsyncActions.fetchArticlesHandler(builder)
        articleAsyncActions.fetchUserArticlesHandler(builder)
    }
})

// Action creators are generated for each case reducer function
export const articleActions = {
    ...articleSlice.actions,
    ...articleAsyncActions
}

export default articleSlice.reducer