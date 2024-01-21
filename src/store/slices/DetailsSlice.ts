import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchDetails } from '../../api/services'
import { type IOompaLoompasDetails } from '../../types/oompaLoompa'
import { type RootState } from '../store'

interface IDetailsState {
  data: IOompaLoompasDetails | null
  loading: boolean
  error: string | null
}

const initialState: IDetailsState = {
  data: null,
  loading: false,
  error: null
}

export const fetchDetailsThunk = createAsyncThunk('FETCH_DETAILS', fetchDetails)

export const DetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDetailsThunk.pending, (state) => {
        state.loading = true
        state.error = null
        state.data = null
      })
      .addCase(fetchDetailsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload as unknown as IOompaLoompasDetails
      })
      .addCase(fetchDetailsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }
})

export const selectDetails = (state: RootState): IOompaLoompasDetails | null => state.details.data
export const selectLoading = (state: RootState): boolean => state.details.loading
export const selectError = (state: RootState): string | null => state.details.error
