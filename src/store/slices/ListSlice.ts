import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchList } from '../../api/services'
import { type IOompaLoompa } from '../../types/oompaLoompa'
import { type RootState } from '../store'

interface IListState {
  data: IOompaLoompa[]
  currentPage: number
  loading: boolean
  error: string | null
  lastFetchTime?: string
}

const initialState: IListState = {
  data: [],
  currentPage: 7,
  loading: false,
  error: null,
  lastFetchTime: undefined
}

export const fetchListThunk = createAsyncThunk('FETCH_LIST', fetchList)

export const ListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setLastFetchTime: (state) => {
      state.lastFetchTime = new Date().toISOString()
    },
    clearCache: (state) => {
      state.data = []
      state.currentPage = 1
      state.lastFetchTime = undefined
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchListThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchListThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, ...action.payload] as unknown as IOompaLoompa[]
        state.currentPage = state.currentPage + 1
      })
      .addCase(fetchListThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }
})

export const selectList = (state: RootState): IOompaLoompa[] => state.list.data
export const selectCurrentPage = (state: RootState): number => state.list.currentPage
export const selectLastFetchTime = (state: RootState): string | undefined => state.list.lastFetchTime
export const selectLoading = (state: RootState): boolean => state.list.loading
export const selectError = (state: RootState): string | null => state.list.error

export const { setLastFetchTime, clearCache } = ListSlice.actions
