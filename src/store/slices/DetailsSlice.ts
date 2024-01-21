import { createAsyncThunk, createSlice, type AsyncThunk } from '@reduxjs/toolkit'

import { type IOompaLoompasDetails } from '../../types/oompaLoompa'
import { type RootState } from '../store'

interface State {
  data: IOompaLoompasDetails | null
  loading: boolean
  error: string | null
}

const initialState: State = {
  data: null,
  loading: false,
  error: null
}

const API_BASE_URL = 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas'

export const fetchDetails: AsyncThunk<string, number, Record<string, unknown>> = createAsyncThunk(
  'FETCH_DETAILS',
  async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Oompa Loompa details')
    }
    const data = await response.json()
    return data
  }
)

export const DetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload as unknown as IOompaLoompasDetails
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }
})

export const selectDetails = (state: RootState): IOompaLoompasDetails | null => state.details.data
export const selectLoading = (state: RootState): boolean => state.details.loading
export const selectError = (state: RootState): string | null => state.details.error
