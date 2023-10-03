import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { IJobOffer } from 'views/Tasks/OfferModal'

interface IInitialState {
  isLoading: boolean
  jobOffer: any
  totalPages: number
  pageCount: number
  allJobOffers: any
  createdOfferId: number
}

const initialState = {
  expired:false,
  isLoading: false,
  jobOffer: {},
  totalPages: null,
  pageCount: null,
  allJobOffers: null,
  createdOfferId: null,
}

export const createJobOffer = createAsyncThunk(
  'jobOffer/createJobOffer',
  async (jobOffer: { id: number; jobOffer: IJobOffer }, thunkApi) => {
    try {
      const resp = await customFetch.post('/job-offer/' + jobOffer.id, jobOffer.jobOffer)
      return resp.data
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error)
    }
  },
)

export const acceptJobOffer = createAsyncThunk(
  'jobOffer/createJobOffer',
  async (jobOfferId: number, thunkApi) => {
    try {
      const resp = await customFetch.post('/job-offer/accept/' + jobOfferId)
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
  name: 'jobOffer',
  initialState: initialState as IInitialState,
  reducers: {},
  extraReducers: {
    [createJobOffer.pending.type]: (state) => {
      state.isLoading = true
    },
    [createJobOffer.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.createdOfferId = payload.id
      toast.success('Ponuda uspešno poslata')
    },
    [createJobOffer.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [acceptJobOffer.pending.type]: (state) => {
      state.isLoading = true
    },
    [acceptJobOffer.fulfilled.type]: (state) => {
      state.isLoading = false
      toast.success('Ponuda uspešno prihvaćena.')
    },
    [acceptJobOffer.rejected.type]: (state, { payload }) => {
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
