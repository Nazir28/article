import { configureStore } from '@reduxjs/toolkit'
import mainReduser from './redusers/mainReduser'
import { articleReducer } from '@/widgets/articles'

export const store = configureStore({
    reducer: {
        main: mainReduser,
        article: articleReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch