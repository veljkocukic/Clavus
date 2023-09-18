import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'

interface IInitialState {
  conversations:any
  messages:any
  isLoading:boolean
}

const initialState = {
 isLoading:false,
 conversations:[],
 messages:[],
}


export const getConversations = createAsyncThunk(
  '/messages/getConversations',
  async (params: any, thunkApi) => {
    try {
      const resp = await customFetch.get('messages/conversations', { params })
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

export const getMessages = createAsyncThunk(
  '/messages/getMessages',
  async (params: any, thunkApi) => {
    try {
      const resp = await customFetch.get('messages', { params })
      return resp.data.messages
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

export const sendMessage = createAsyncThunk(
  '/messages/sendMessage',
  async (message: any, thunkApi) => {
    try {
      const resp = await customFetch.post('messages', message)
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)


const messagesSlice = createSlice({
  name: 'messasges',
  initialState: initialState as IInitialState,
  reducers: {},
  extraReducers: {
   
    [getConversations.pending.type]: (state) => {
      state.isLoading = true
    },
    [getConversations.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.conversations = payload
    },
    [getConversations.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [getMessages.pending.type]: (state) => {
      state.isLoading = true
    },
    [getMessages.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.messages = payload
    },
    [getMessages.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
  },
})

export default messagesSlice.reducer
