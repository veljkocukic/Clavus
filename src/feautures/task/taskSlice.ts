import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { ITaskState } from 'views/Tasks/tasksData'

interface IInitialState {
  isLoading: boolean
  task: ITaskState
  allJobs: any
}

const initialState = {
  isLoading: false,
  task: {},
  allJobs: [],
}

export const createTask = createAsyncThunk(
  'task/createTask',
  async (task: ITaskState, thunkApi) => {
    try {
      const resp = await customFetch.post('/jobs', task)
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

// export const loginUser = createAsyncThunk('user/loginUser', async (user: any, thunkApi) => {
//   try {
//     const resp = await customFetch.post('/auth/login', user)

//     return resp.data
//   } catch (error) {
//     return thunkApi.rejectWithValue(error)
//   }
// })

// export const getUser = createAsyncThunk('/user/getUser', async (id: any, thunkApi) => {
//   try {
//     const resp = await customFetch.get('/auth/' + id)

//     return resp.data
//   } catch (error) {
//     return thunkApi.rejectWithValue(error)
//   }
// })

// export const getMe = createAsyncThunk('/user/getMe', async (_, thunkApi) => {
//   try {
//     const resp = await customFetch.get('/users/me')

//     return resp.data
//   } catch (error) {
//     return thunkApi.rejectWithValue(error)
//   }
// })

// export const editUser = createAsyncThunk('user/editUser', async (user: IUser, thunkApi) => {
//   try {
//     const resp = await customFetch.patch('/auth/edit/' + user.id, user)

//     thunkApi.dispatch(getUser(user.id))

//     return resp.data
//   } catch (error) {
//     return thunkApi.rejectWithValue(error)
//   }
// })

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState as IInitialState,
  reducers: {},
  extraReducers: {
    [createTask.pending.type]: (state) => {
      state.isLoading = true
    },
    [createTask.fulfilled.type]: (state) => {
      state.isLoading = false
      toast.success('Zadatak uspešno kreiran.')
    },
    [createTask.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
  },
})

export default taskSlice.reducer
