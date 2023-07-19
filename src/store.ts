import { configureStore } from '@reduxjs/toolkit'
import userSlice from './feautures/user/userSlice'
import taskSlice from './feautures/task/taskSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: taskSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
