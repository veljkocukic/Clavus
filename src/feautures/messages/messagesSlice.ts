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

export const goToConversation = createAsyncThunk(
  '/messages/goToConversation',
  async (receiverId: any, thunkApi) => {
    try {
      const resp = await customFetch.get('messages/goto-conversation/'+receiverId)
      return resp.data
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
  reducers: {
    removeJobOffer:(state,{payload})=>{
      state.conversations = state.conversations.map(c=>{
        if(c.id !== payload.cId){
          return c
        }else{
          c.jobOffers = c.jobOffers.filter(jo=>jo.id!==payload.oId)
          return c
        }
      })
    }
  },
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
    [goToConversation.pending.type]: (state) => {
      state.isLoading = true
    },
    [goToConversation.fulfilled.type]: (state) => {
      state.isLoading = false
    },
    [goToConversation.rejected.type]: (state, { payload }) => {
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
export const {removeJobOffer} = messagesSlice.actions
export default messagesSlice.reducer
