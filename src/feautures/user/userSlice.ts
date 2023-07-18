import { addUserLocalStorage, removeUserFromLocalStorage } from './../../utils/localStorage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import getCookies from '../../utils/cookies/getCookies'
import setCookies from '../../utils/cookies/setCookie'
import { toast } from 'react-toastify'

interface IInitialState {
  isLoading: boolean
  isUserLoading: boolean
  userToken: string
  user: IUser
}

const initialState = {
  isLoading: false,
  isUserLoading: false,
  userToken: getCookies('usrin'),
  user: {},
}

export interface IUser {
  name: string
  email: string
  password: string
  lastName: string
  phoneNumber: string
  role: string
  id: number
}

export const registerUser = createAsyncThunk('user/registerUser', async (user: any, thunkApi) => {
  try {
    const resp = await customFetch.post('/auth/register', user)
    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (user: any, thunkApi) => {
  try {
    const resp = await customFetch.post('/auth/login', user)

    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const getUser = createAsyncThunk('/user/getUser', async (id: any, thunkApi) => {
  try {
    const resp = await customFetch.get('/auth/' + id)

    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const getMe = createAsyncThunk('/user/getMe', async (_, thunkApi) => {
  try {
    const resp = await customFetch.get('/users/me')

    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const editUser = createAsyncThunk('user/editUser', async (user: IUser, thunkApi) => {
  try {
    const resp = await customFetch.patch('/auth/edit/' + user.id, user)

    thunkApi.dispatch(getUser(user.id))

    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as IInitialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      const token = JSON.stringify(payload.access_token)
      delete payload.access_token
      setCookies('usrin', JSON.stringify(token))
      addUserLocalStorage(payload)
      state.user = payload
    },
    [registerUser.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [loginUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled.type]: (state: any, { payload }) => {
      state.isLoading = false
      setCookies('usrin', JSON.stringify(payload?.access_token))
      addUserLocalStorage(payload.user)
      state.userToken = getCookies('usrin')
    },
    [loginUser.rejected.type]: (state) => {
      state.isLoading = false
    },
    [getUser.pending.type]: (state) => {
      state.isUserLoading = true
    },
    [getUser.fulfilled.type]: (state, { payload }) => {
      state.isUserLoading = false
      state.user = payload
    },
    [getUser.rejected.type]: (state) => {
      state.isUserLoading = false
    },
    [getMe.pending.type]: (state) => {
      state.isUserLoading = true
    },
    [getMe.fulfilled.type]: (state, { payload }) => {
      state.isUserLoading = false
      state.user = payload
    },
    [getMe.rejected.type]: (state) => {
      state.isUserLoading = false
    },
    [editUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [editUser.fulfilled.type]: (state, { payload }) => {
      removeUserFromLocalStorage()
      state.isLoading = false
      addUserLocalStorage(payload)

      toast.success('User profile updated')
    },
    [editUser.rejected.type]: (state) => {
      state.isLoading = false
    },
  },
})

export default userSlice.reducer
