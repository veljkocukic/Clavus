import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'

interface IInitialState {
  isLoading: boolean
  isUserLoading: boolean
  user: IUser
  logged: boolean
  areaOfWork:{
    lat:number
    lng:number
  }
  userRatings: {
    data: {
      rating: number
      description: string
      date: string
      ratingGiverUser: {
        name: string
        lastName: string
      }
    }[]
    count: number
    pageCount: number
  }
}

const initialState = {
  isLoading: false,
  isUserLoading: false,
  logged: false,
  user: null,
  userRatings: {
    data: [],
    count: 0,
    pageCount: 0,
  },
}

export interface IUser {
  name: string
  email: string
  address?: string
  categories?: string[]
  password: string
  lastName: string
  phoneNumber: string
  role: string
  totalJobsDone?: number
  totalJobsPosted?: number
  totalRatings?: number
  areaOfWork:{
    lat:number
    lng:number
  }[]
  ratings?: {
    description: string
    rating: number
    date: string
    ratingGiverUser: {
      name: string
      lastName: string
    }
  }[]
  jobs?: {
    id: number
    category: string
    name: string
    date: string
    location: string
  }[]
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
    return thunkApi.rejectWithValue(error.response.data.message)
  }
})

export const getUser = createAsyncThunk('/user/getUser', async (id: any, thunkApi) => {
  try {
    const resp = await customFetch.get('/users/' + id)

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

export const getUserRatings = createAsyncThunk(
  '/user/getUserRatings',
  async (payload: { id: number; params: any }, thunkApi) => {
    try {
      const resp = await customFetch.get('/users/ratings/' + payload.id, { params: payload.params })
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

export const addBioAndCat = createAsyncThunk(
  'user/addBio',
  async (bioCat: { bio: string; categories: string[], areaOfWork:{lat:number,lng:number}[] }, thunkApi) => {
    try {
      const resp = await customFetch.post('/auth/update-bio/', bioCat)
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

export const updateAreaOfWork = createAsyncThunk(
  'user/updateAreaOfWork',
  async (areaOfWork:any, thunkApi) => {
    try {
      const resp = await customFetch.patch('/users/area', areaOfWork)
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)


const userSlice = createSlice({
  name: 'user',
  initialState: initialState as IInitialState,
  reducers: {
    logOut: (state) => {
      state.user = null
    },
    clearRatings: (state) => {
      state.userRatings = {
        data: [],
        pageCount: 0,
        count: 0,
      }
    },
  },
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      localStorage.setItem('token', payload.access_token)
      localStorage.setItem('user', JSON.stringify(payload.user))
      state.logged = true
      state.user = payload.user
      toast.success('Nalog uspešno kreiran.')
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
      localStorage.setItem('token', payload?.access_token)
      localStorage.setItem('user', JSON.stringify(payload.user))
      state.user = payload.user
      state.logged = true
    },
    [loginUser.rejected.type]: (state, { payload }) => {
      toast.error(payload)
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
    [getUserRatings.pending.type]: (state) => {
      state.isUserLoading = true
    },
    [getUserRatings.fulfilled.type]: (state, { payload }) => {
      state.isUserLoading = false
      state.userRatings.data = [...state.userRatings.data, ...payload.data]
      state.userRatings.count = payload.count
      state.userRatings.pageCount = payload.pageCount
    },
    [getUserRatings.rejected.type]: (state) => {
      state.isUserLoading = false
    },
    [editUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [editUser.fulfilled.type]: (state) => {
      state.isLoading = false
      toast.success('User profile updated')
    },
    [editUser.rejected.type]: (state) => {
      state.isLoading = false
    },
    [updateAreaOfWork.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateAreaOfWork.fulfilled.type]: (state,{payload}) => {
      state.isLoading = false
      state.areaOfWork = payload
      toast.success('Oblast rada uspešno sačuvana')
    },
    [updateAreaOfWork.rejected.type]: (state) => {
      state.isLoading = false
    },
    [addBioAndCat.pending.type]: (state) => {
      state.isLoading = true
    },
    [addBioAndCat.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      localStorage.setItem('user', JSON.stringify(payload))
      toast.success('Detalji uspešno snimljeni.')
    },
    [addBioAndCat.rejected.type]: (state) => {
      state.isLoading = false
    },
  },
})
export const { logOut, clearRatings } = userSlice.actions
export default userSlice.reducer
