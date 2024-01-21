import { createSlice, createAsyncThunk, type AsyncThunk } from '@reduxjs/toolkit'

import { type RootState } from '../store'
import { type IOompaLoompa } from '../../types/oompaLoompa'

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

const API_BASE_URL = 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas'

export const fetchList: AsyncThunk<string, number, Record<string, unknown>> = createAsyncThunk(
  'FETCH_LIST', async (page: number) => {
    const response = await fetch(`${API_BASE_URL}?page=${page}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Oompa Loompa List')
    }
    const data = await response.json()
    return data.results
  })

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
      .addCase(fetchList.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, ...action.payload] as unknown as IOompaLoompa[]
        state.currentPage = state.currentPage + 1
      })
      .addCase(fetchList.rejected, (state, action) => {
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
