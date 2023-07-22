import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { ITaskState } from 'views/Tasks/tasksData'

interface IInitialState {
  isLoading: boolean
  jobOffer: any
  totalPages: number
  pageCount: number
  allJobOffers: any
  createdOfferId: number
}

const initialState = {
  isLoading: false,
  jobOffer: {},
  totalPages: null,
  pageCount: null,
  allJobOffers: null,
  createdOfferId: null,
}

export const createJobOffer = createAsyncThunk(
  'jobOffer/createJobOffer',
  async (jobOffer: ITaskState, thunkApi) => {
    try {
      const resp = await customFetch.post('/job-offer', jobOffer)
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

export const getJobOffer = createAsyncThunk('/jobOffer/getJobOffer', async (id: any, thunkApi) => {
  try {
    const resp = await customFetch.get('/job-offer/' + id)
    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const getJobOffers = createAsyncThunk(
  '/jobOffer/getJobOffers',
  async (params: any, thunkApi) => {
    try {
      const resp = await customFetch.get('/job-offer/', { params })
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState as IInitialState,
  reducers: {},
  extraReducers: {
    [createJobOffer.pending.type]: (state) => {
      state.isLoading = true
    },
    [createJobOffer.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.createdOfferId = payload.id
      toast.success('Zadatak uspešno kreiran.')
    },
    [createJobOffer.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [getJobOffer.pending.type]: (state) => {
      state.isLoading = true
    },
    [getJobOffer.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.jobOffer = payload
    },
    [getJobOffer.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [getJobOffers.pending.type]: (state) => {
      state.isLoading = true
    },
    [getJobOffers.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.allJobOffers = payload.data
      state.pageCount = payload.count
      state.totalPages = payload.pageCount
    },
    [getJobOffers.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
  },
})

export default taskSlice.reducer
