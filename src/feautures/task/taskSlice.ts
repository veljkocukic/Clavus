import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { ITaskState } from 'views/Tasks/tasksData'
import { IRating } from 'views/Tasks/RateModal'

interface ITaskResponse extends ITaskState {
  jobOffers: {
    price: number
    id: number
    user: {
      name: string
      lastName: string
      ratings: number
    }
  }[]
}

interface IInitialState {
  isLoading: boolean
  task: ITaskResponse
  createdTaskId: number
  totalPages: number
  totalPagesWT: number
  pageCount: number
  pageCountWT: number
  allTasks: any
  allWorkerTasks: any
  jobsOverview:{
    allJobs:number,
    completed:number,
    inProgress:number,
    waitingForWorker:number,
  }
}

const initialState = {
  isLoading: false,
  task: {},
  createdTaskId: null,
  allTasks: null,
  allWorkerTasks: null,
  pageCountWT: null,
  totalPagesWT: null,
  jobsOverview:{
    allJobs:null,
    completed:null,
    inProgress:null,
    waitingForWorker:null,
  }
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

export const rateAndComplete = createAsyncThunk(
  'task/rateAndCompleteTask',
  async (data: { id: number; rating: IRating }, thunkApi) => {
    try {
      const resp = await customFetch.post('/jobs/rate-and-complete/' + data.id, data.rating)
      console.log(resp)
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

export const getTask = createAsyncThunk('/task/getTask', async (id: any, thunkApi) => {
  try {
    const resp = await customFetch.get('/jobs/' + id)
    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const getTasks = createAsyncThunk('/task/getTasks', async (params: any, thunkApi) => {
  try {
    const resp = await customFetch.get('/jobs', { params })
    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const getJobsOverview = createAsyncThunk('/task/getJobsOverview', async (_: any, thunkApi) => {
  try {
    const resp = await customFetch.get('/jobs/overview')
    return resp.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const getWorkerTasks = createAsyncThunk(
  '/task/getWorkerTasks',
  async (params: any, thunkApi) => {
    try {
      const resp = await customFetch.get('jobs/worker-available-jobs', { params })
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  },
)

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
    [createTask.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.createdTaskId = payload.id
      toast.success('Zadatak uspešno kreiran.')
    },
    [createTask.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [createTask.pending.type]: (state) => {
      state.isLoading = true
    },
    [rateAndComplete.fulfilled.type]: (state) => {
      state.isLoading = false
      toast.success('Posao uspešno završen.')
    },
    [rateAndComplete.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [getTask.pending.type]: (state) => {
      state.isLoading = true
    },
    [getTask.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.task = payload
    },
    [getTask.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [getJobsOverview.pending.type]: (state) => {
      state.isLoading = true
    },
    [getJobsOverview.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.jobsOverview = payload
    },
    [getJobsOverview.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [getTasks.pending.type]: (state) => {
      state.isLoading = true
    },
    [getTasks.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.allTasks = payload.data
      state.pageCount = payload.count
      state.totalPages = payload.pageCount
    },
    [getTasks.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
    [getWorkerTasks.pending.type]: (state) => {
      state.isLoading = true
    },
    [getWorkerTasks.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false
      state.allWorkerTasks = payload.data
      state.pageCountWT = payload.count
      state.totalPagesWT = payload.pageCount
    },
    [getWorkerTasks.rejected.type]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload.message)
    },
  },
})

export default taskSlice.reducer
